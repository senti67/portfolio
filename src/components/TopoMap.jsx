import { useEffect, useRef } from 'react';

export default function TopoMap() {
  const canvasRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const noise = (x, y, seed = 0) => {
      const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.3) * 43758.5453;
      return (s - Math.floor(s)) * 2 - 1;
    };
    const smoothNoise = (x, y, seed = 0) => {
      const ix = Math.floor(x), iy = Math.floor(y);
      const fx = x - ix, fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return (
        noise(ix,   iy,   seed) * (1-ux) * (1-uy) +
        noise(ix+1, iy,   seed) * ux     * (1-uy) +
        noise(ix,   iy+1, seed) * (1-ux) * uy     +
        noise(ix+1, iy+1, seed) * ux     * uy
      );
    };
    const fbm = (x, y, seed = 0) => {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < 5; i++) {
        v += amp * smoothNoise(x * freq, y * freq, seed + i * 13);
        amp *= 0.5; freq *= 2.1;
      }
      return v;
    };

    // height as a pure continuous function — no grid lookup, no snapping
    const getHeight = (wx, wy) => {
      const nx = wx * 4 - 2;
      const ny = wy * 4 - 2;
      const peak1 = Math.exp(-(nx*nx*0.9  + ny*ny*1.6)) * 1.4;
      const peak2 = Math.exp(-((nx-1.2)*(nx-1.2)*2   + (ny+0.6)*(ny+0.6)*2.5)) * 0.7;
      const peak3 = Math.exp(-((nx+1.1)*(nx+1.1)*2   + (ny-0.5)*(ny-0.5)*3))   * 0.6;
      const peak4 = Math.exp(-((nx+0.4)*(nx+0.4)*3   + (ny+1.2)*(ny+1.2)*2))   * 0.5;
      const peak5 = Math.exp(-((nx-0.8)*(nx-0.8)*4   + (ny-1.0)*(ny-1.0)*3))   * 0.4;
      return peak1 + peak2 + peak3 + peak4 + peak5 + fbm(nx * 1.1, ny * 1.1) * 0.4;
    };

    const isMobile = window.innerWidth < 768;
    const GRID_W = isMobile ? 50 : 80, GRID_H = isMobile ? 35 : 56;

    const project = (gx, gy, h, sub) => {
      const wx = gx / GRID_W - 0.5;
      const wy = gy / GRID_H - 0.5;

      // yaw
      const cosH = Math.cos(sub.heading), sinH = Math.sin(sub.heading);
      const rx =  wx * cosH - wy * sinH;
      const ry =  wx * sinH + wy * cosH;

      const z3 = h * 0.38;

      // pitch
      const tilt  = 0.65 + sub.pitch;
      const cosP  = Math.cos(tilt), sinP = Math.sin(tilt);
      const y3r   = ry * cosP - z3 * sinP;
      const z3r   = ry * sinP + z3 * cosP;

      // roll
      const cosR  = Math.cos(sub.roll), sinR = Math.sin(sub.roll);
      const x3r   =  rx * cosR - y3r * sinR;
      const y3rr  =  rx * sinR + y3r * cosR;

      const fov  = 2.8;
      const dist = 2.0 + z3r;
      return {
        x: W * 0.5  + (x3r / dist) * fov * W * 0.65,
        y: H * 0.44 + (y3rr / dist) * fov * H * 0.85,
        h,
      };
    };

    // submarine state — all continuous floats
    const sub = { heading: 0, pitch: 0, roll: 0, ox: 0, oy: 0 };
    let t = 0;

    const draw = () => {
      t++;

      // very slow, smooth sinusoidal motion — no sudden jumps
      sub.heading = Math.sin(t * 0.0005)  * 0.10 + Math.sin(t * 0.00083) * 0.04;
      sub.pitch   = Math.sin(t * 0.00041) * 0.028;
      sub.roll    = Math.sin(t * 0.00062) * 0.018 + Math.sin(t * 0.00097) * 0.008;

      // smooth forward drift — tiny float increment, no floor/mod
      sub.ox += 0.00022;
      sub.oy += 0.00009;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // draw horizontal lines
      for (let gy = 0; gy <= GRID_H; gy++) {
        const pts = [];
        for (let gx = 0; gx <= GRID_W; gx++) {
          // continuous world coordinate — no snapping
          const wx = (gx / GRID_W) + sub.ox;
          const wy = (gy / GRID_H) + sub.oy;
          const h  = getHeight(((wx % 1) + 1) % 1, ((wy % 1) + 1) % 1);
          pts.push(project(gx, gy, h, sub));
        }

        const ny          = gy / GRID_H;
        const sampleH     = pts[Math.floor(GRID_W * 0.5)].h;
        const glowFactor  = Math.max(0, sampleH * 1.3);
        const opacity     = Math.min(0.75, 0.04 + ny * 0.1 + glowFactor * 0.3);

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);

        ctx.strokeStyle  = `rgba(255,176,0,${opacity})`;
        ctx.lineWidth    = 0.5 + glowFactor * 0.8;
        ctx.shadowColor  = glowFactor > 0.35 ? 'rgba(255,176,0,0.65)' : 'transparent';
        ctx.shadowBlur   = glowFactor > 0.35 ? glowFactor * 9 : 0;
        ctx.stroke();
        ctx.shadowBlur   = 0;
      }

      // vertical lines
      for (let gx = 0; gx <= GRID_W; gx += 3) {
        const pts = [];
        for (let gy = 0; gy <= GRID_H; gy++) {
          const wx = (gx / GRID_W) + sub.ox;
          const wy = (gy / GRID_H) + sub.oy;
          const h  = getHeight(((wx % 1) + 1) % 1, ((wy % 1) + 1) % 1);
          pts.push(project(gx, gy, h, sub));
        }
        const nx = gx / GRID_W;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(255,176,0,${0.02 + nx*(1-nx)*0.06})`;
        ctx.lineWidth   = 0.3;
        ctx.shadowBlur  = 0;
        ctx.stroke();
      }

      // peak glow dots
      for (let gy = 0; gy <= GRID_H; gy += 7) {
        for (let gx = 0; gx <= GRID_W; gx += 7) {
          const wx = (gx / GRID_W) + sub.ox;
          const wy = (gy / GRID_H) + sub.oy;
          const h  = getHeight(((wx % 1) + 1) % 1, ((wy % 1) + 1) % 1);
          if (h > 0.55) {
            const p     = project(gx, gy, h, sub);
            const pulse = 0.5 + 0.5 * Math.sin(t * 0.04 + gx * 0.5 + gy * 0.4);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2 + pulse * 1.3, 0, Math.PI * 2);
            ctx.fillStyle   = `rgba(255,176,0,${0.4 + pulse * 0.5})`;
            ctx.shadowColor = '#ffb000';
            ctx.shadowBlur  = 6 + pulse * 7;
            ctx.fill();
            ctx.shadowBlur  = 0;
          }
        }
      }

      // ambient glow
      const cx   = W * 0.58, cy = H * 0.38;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.32);
      grad.addColorStop(0,   'rgba(255,140,0,0.10)');
      grad.addColorStop(0.5, 'rgba(255,100,0,0.03)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // left fade
      const fadeL = ctx.createLinearGradient(0, 0, W * 0.38, 0);
      fadeL.addColorStop(0, 'rgba(0,0,0,0.95)');
      fadeL.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fadeL;
      ctx.fillRect(0, 0, W, H);

      // bottom fade
      const fadeB = ctx.createLinearGradient(0, H * 0.62, 0, H);
      fadeB.addColorStop(0, 'rgba(0,0,0,0)');
      fadeB.addColorStop(1, 'rgba(0,0,0,0.9)');
      ctx.fillStyle = fadeB;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

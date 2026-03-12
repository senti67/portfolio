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
      const a = noise(ix,     iy,     seed);
      const b = noise(ix + 1, iy,     seed);
      const c = noise(ix,     iy + 1, seed);
      const d = noise(ix + 1, iy + 1, seed);
      return a*(1-ux)*(1-uy) + b*ux*(1-uy) + c*(1-ux)*uy + d*ux*uy;
    };
    const fbm = (x, y, seed = 0) => {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < 5; i++) {
        v += amp * smoothNoise(x * freq, y * freq, seed + i * 13);
        amp *= 0.5; freq *= 2.1;
      }
      return v;
    };

    const GRID_W = 140, GRID_H = 90;
    const heightMap = [];
    for (let gy = 0; gy <= GRID_H; gy++) {
      heightMap[gy] = [];
      for (let gx = 0; gx <= GRID_W; gx++) {
        const nx = (gx / GRID_W) * 4 - 2;
        const ny = (gy / GRID_H) * 4 - 2;
        const peak1 = Math.exp(-(nx*nx*1.2 + ny*ny*2.2)) * 1.4;
        const peak2 = Math.exp(-((nx-0.8)*(nx-0.8)*3 + (ny+0.4)*(ny+0.4)*3)) * 0.6;
        const peak3 = Math.exp(-((nx+0.9)*(nx+0.9)*2.5 + (ny-0.3)*(ny-0.3)*4)) * 0.5;
        const peak4 = Math.exp(-((nx+0.3)*(nx+0.3)*4 + (ny+0.8)*(ny+0.8)*3)) * 0.4;
        const n = fbm(nx * 1.2, ny * 1.2) * 0.35;
        heightMap[gy][gx] = peak1 + peak2 + peak3 + peak4 + n;
      }
    }

    const project = (gx, gy, h, time) => {
      const nx = (gx / GRID_W) - 0.5;
      const ny = (gy / GRID_H) - 0.5;
      const z3 = h * 0.4;

      // tilt angle — more aggressive for full coverage
      const tiltAngle = 0.65;
      const cosT = Math.cos(tiltAngle), sinT = Math.sin(tiltAngle);
      const y3r = ny * cosT - z3 * sinT;
      const z3r = ny * sinT + z3 * cosT;

      // very slow sway
      const rotY = Math.sin(time * 0.00006) * 0.06;
      const cosR = Math.cos(rotY), sinR = Math.sin(rotY);
      const x3r = nx * cosR + z3r * sinR;
      const z3rr = -nx * sinR + z3r * cosR;

      const fov = 2.6;
      const dist = 2.2 + z3rr;
      const px = (x3r / dist) * fov;
      const py = (y3r / dist) * fov;

      return {
        x: W * 0.5 + px * W * 0.62,
        y: H * 0.45 + py * H * 0.82,
        z: z3rr,
        h,
      };
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // horizontal lines
      for (let gy = 0; gy <= GRID_H; gy++) {
        const pts = [];
        for (let gx = 0; gx <= GRID_W; gx++) {
          pts.push(project(gx, gy, heightMap[gy][gx], time));
        }

        const ny = gy / GRID_H;
        const maxH = Math.max(...pts.map(p => p.h));
        const glowFactor = Math.max(0, maxH * 1.5);
        const baseOp = 0.05 + ny * 0.12;
        const opacity = Math.min(0.75, baseOp + glowFactor * 0.35);

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.strokeStyle = `rgba(255,176,0,${opacity})`;
        ctx.lineWidth = 0.5 + glowFactor * 0.9;
        if (glowFactor > 0.4) {
          ctx.shadowColor = 'rgba(255,176,0,0.7)';
          ctx.shadowBlur = glowFactor * 10;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // vertical lines (sparser)
      for (let gx = 0; gx <= GRID_W; gx += 3) {
        const pts = [];
        for (let gy = 0; gy <= GRID_H; gy++) {
          pts.push(project(gx, gy, heightMap[gy][gx], time));
        }
        const nx = gx / GRID_W;
        const op = 0.02 + nx * (1 - nx) * 0.08;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(255,176,0,${op})`;
        ctx.lineWidth = 0.35;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }

      // glowing peak dots
      for (let gy = 0; gy <= GRID_H; gy += 6) {
        for (let gx = 0; gx <= GRID_W; gx += 6) {
          const h = heightMap[gy][gx];
          if (h > 0.55) {
            const p = project(gx, gy, h, time);
            const pulse = 0.5 + 0.5 * Math.sin(time * 0.002 + gx * 0.4 + gy * 0.3);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.2 + pulse * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,176,0,${0.5 + pulse * 0.5})`;
            ctx.shadowColor = '#ffb000';
            ctx.shadowBlur = 8 + pulse * 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // central glow
      const peakPt = project(GRID_W/2, GRID_H * 0.4, heightMap[Math.floor(GRID_H*0.4)][Math.floor(GRID_W/2)], time);
      const grad = ctx.createRadialGradient(peakPt.x, peakPt.y, 0, peakPt.x, peakPt.y, W * 0.3);
      grad.addColorStop(0, 'rgba(255,140,0,0.14)');
      grad.addColorStop(0.5, 'rgba(255,100,0,0.04)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // left fade so name is readable
      const fadeL = ctx.createLinearGradient(0, 0, W * 0.42, 0);
      fadeL.addColorStop(0, 'rgba(0,0,0,0.92)');
      fadeL.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fadeL;
      ctx.fillRect(0, 0, W, H);

      // bottom fade
      const fadeB = ctx.createLinearGradient(0, H * 0.7, 0, H);
      fadeB.addColorStop(0, 'rgba(0,0,0,0)');
      fadeB.addColorStop(1, 'rgba(0,0,0,0.85)');
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

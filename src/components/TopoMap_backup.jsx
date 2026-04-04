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

    // proper perlin noise
    const perm = new Uint8Array(512);
    const p = Array.from({length: 256}, (_, i) => i);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const lrp  = (a, b, t) => a + (b - a) * t;
    const grd  = (h, x, y) => {
      switch (h & 3) {
        case 0: return  x + y;
        case 1: return -x + y;
        case 2: return  x - y;
        case 3: return -x - y;
      }
    };
    const noise2 = (x, y) => {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = fade(x), v = fade(y);
      const a = perm[X] + Y, b = perm[X+1] + Y;
      return lrp(
        lrp(grd(perm[a],   x,   y), grd(perm[b],   x-1, y),   u),
        lrp(grd(perm[a+1], x,   y-1), grd(perm[b+1], x-1, y-1), u),
        v
      );
    };
    const fbm = (x, y, oct = 6) => {
      let v = 0, a = 0.5, f = 1;
      for (let i = 0; i < oct; i++) {
        v += a * noise2(x * f, y * f);
        a *= 0.5; f *= 2.0;
      }
      return v;
    };

    // height field — multiple peaks like a real ocean floor
    const heightAt = (x, y) => {
      // x, y in 0..1
      const nx = x * 2.5 - 1.25;
      const ny = y * 2.5 - 1.25;
      const p1 = Math.exp(-(nx*nx*0.8  + ny*ny*1.1 )) * 2.0;
      const p2 = Math.exp(-((nx+1.1)*(nx+1.1)*1.2 + (ny-0.6)*(ny-0.6)*1.8)) * 1.1;
      const p3 = Math.exp(-((nx-1.0)*(nx-1.0)*1.4 + (ny+0.8)*(ny+0.8)*1.6)) * 0.9;
      const p4 = Math.exp(-((nx+0.3)*(nx+0.3)*2.5 + (ny+1.3)*(ny+1.3)*2.0)) * 0.7;
      const noise = fbm(nx * 0.8 + 3.1, ny * 0.8 + 1.7) * 0.6;
      return p1 + p2 + p3 + p4 + noise;
    };

    // marching squares — find contour lines at given height levels
    const RES = 3; // pixel resolution of grid
    let cols, rows, field;

    const buildField = () => {
      cols = Math.ceil(W / RES) + 2;
      rows = Math.ceil(H / RES) + 2;
      field = new Float32Array(cols * rows);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = (c * RES) / W;
          const wy = (r * RES) / H;
          field[r * cols + c] = heightAt(wx, wy);
        }
      }
    };

    // linear interpolate position along edge
    const interp = (v0, v1, level, p0, p1) => {
      const t = Math.abs(v1 - v0) < 1e-10 ? 0.5 : (level - v0) / (v1 - v0);
      return { x: p0.x + t * (p1.x - p0.x), y: p0.y + t * (p1.y - p0.y) };
    };

    const drawContour = (level, color, lineWidth, glowWidth, glowAlpha) => {
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;

      if (glowWidth > 0) {
        ctx.save();
        ctx.strokeStyle = `rgba(255,140,0,${glowAlpha})`;
        ctx.lineWidth   = glowWidth;
        ctx.filter      = 'none';
        drawContourLines(level);
        ctx.restore();
      }
      drawContourLines(level);
    };

    const drawContourLines = (level) => {
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const x0 = c * RES, y0 = r * RES;
          const x1 = x0 + RES, y1 = y0 + RES;
          const v0 = field[r       * cols + c];
          const v1 = field[r       * cols + c + 1];
          const v2 = field[(r + 1) * cols + c + 1];
          const v3 = field[(r + 1) * cols + c];

          const idx =
            (v0 > level ? 8 : 0) |
            (v1 > level ? 4 : 0) |
            (v2 > level ? 2 : 0) |
            (v3 > level ? 1 : 0);

          if (idx === 0 || idx === 15) continue;

          const tl = {x: x0,  y: y0};
          const tr = {x: x1,  y: y0};
          const br = {x: x1,  y: y1};
          const bl = {x: x0,  y: y1};

          const top   = interp(v0, v1, level, tl, tr);
          const right = interp(v1, v2, level, tr, br);
          const bot   = interp(v3, v2, level, bl, br);
          const left  = interp(v0, v3, level, tl, bl);

          const segs = [];
          switch (idx) {
            case 1:  case 14: segs.push([bot,  left]);  break;
            case 2:  case 13: segs.push([right, bot]);  break;
            case 3:  case 12: segs.push([right, left]); break;
            case 4:  case 11: segs.push([top,   right]);break;
            case 5:
              segs.push([top, left]);
              segs.push([right, bot]); break;
            case 6:  case 9:  segs.push([top,   bot]);  break;
            case 7:  case 8:  segs.push([top,   left]); break;
            case 10:
              segs.push([top, right]);
              segs.push([bot, left]);  break;
          }

          for (const [a, b] of segs) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    // animated offset for slow drift
    let ox = 0, oy = 0, tox = 0, toy = 0;
    let baseX = 0, baseY = 0;
    let t = 0;

    const draw = () => {
      t++;

      // slowly shift the field center for movement feel
      baseX += 0.00012;
      baseY += 0.000055;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // rebuild field with animated offset
      cols = Math.ceil(W / RES) + 2;
      rows = Math.ceil(H / RES) + 2;
      if (!field || field.length !== cols * rows) {
        field = new Float32Array(cols * rows);
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = (c * RES) / W + baseX;
          const wy = (r * RES) / H + baseY;
          field[r * cols + c] = heightAt(((wx % 1) + 1) % 1, ((wy % 1) + 1) % 1);
        }
      }

      // find min/max for dynamic level placement
      let mn = Infinity, mx = -Infinity;
      for (let i = 0; i < field.length; i++) {
        if (field[i] < mn) mn = field[i];
        if (field[i] > mx) mx = field[i];
      }

      const range  = mx - mn;
      const LEVELS = 28;

      for (let i = 0; i < LEVELS; i++) {
        const t01    = i / (LEVELS - 1);
        const level  = mn + t01 * range;

        // lines near peaks are brighter and thicker
        const nearPeak = Math.pow(t01, 1.4);
        const alpha    = 0.06 + nearPeak * 0.55;
        const lw       = 0.3  + nearPeak * 0.9;

        // glow only on upper contours
        const glowW = nearPeak > 0.7 ? 6 : 0;
        const glowA = nearPeak > 0.7 ? (nearPeak - 0.7) * 0.25 : 0;

        ctx.strokeStyle = `rgba(255,${Math.floor(150 + nearPeak * 30)},0,${alpha})`;
        ctx.lineWidth   = lw;

        if (glowW > 0) {
          ctx.save();
          ctx.strokeStyle = `rgba(255,140,0,${glowA})`;
          ctx.lineWidth   = glowW;
          ctx.filter      = 'none';
          drawContourLines(level);
          ctx.restore();

          ctx.strokeStyle = `rgba(255,${Math.floor(160 + nearPeak * 40)},0,${alpha})`;
          ctx.lineWidth   = lw;
        }
        drawContourLines(level);
      }

      // right side fade so it doesn't look cut off
      const fr = ctx.createLinearGradient(W * 0.78, 0, W, 0);
      fr.addColorStop(0, 'rgba(0,0,0,0)');
      fr.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = fr; ctx.fillRect(0, 0, W, H);

      // left text fade
      const fl = ctx.createLinearGradient(0, 0, W * 0.32, 0);
      fl.addColorStop(0, 'rgba(0,0,0,0.97)');
      fl.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fl; ctx.fillRect(0, 0, W, H);

      // bottom fade
      const fb = ctx.createLinearGradient(0, H * 0.6, 0, H);
      fb.addColorStop(0, 'rgba(0,0,0,0)');
      fb.addColorStop(1, 'rgba(0,0,0,0.95)');
      ctx.fillStyle = fb; ctx.fillRect(0, 0, W, H);

      // top fade
      const ft = ctx.createLinearGradient(0, 0, 0, H * 0.15);
      ft.addColorStop(0, 'rgba(0,0,0,0.8)');
      ft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ft; ctx.fillRect(0, 0, W, H);

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

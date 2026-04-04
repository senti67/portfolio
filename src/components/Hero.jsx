import { useEffect, useState } from 'react';
import './Hero.css';

/* ── CRO (Oscilloscope) Background ─────────────────────────────
   Pure SVG — grid + a few static waveform traces.
   Zero JS, zero canvas, no performance cost.
──────────────────────────────────────────────────────────────── */
function CROBackground() {
  // Generate a sine-ish SVG path across the full width
  const wave = (amplitude, frequency, yOffset, points = 300) => {
    const w = 1440, h = 500;
    let d = '';
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * w;
      const y = yOffset + Math.sin((i / points) * Math.PI * 2 * frequency) * amplitude
                        + Math.sin((i / points) * Math.PI * 2 * frequency * 0.5) * (amplitude * 0.3);
      d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
    }
    return d;
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: '#05060a', zIndex: 0, pointerEvents: 'none',
    }}>
      <svg
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Radial vignette — sides */}
          <radialGradient id="vign" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#05060a" stopOpacity="0" />
            <stop offset="100%" stopColor="#05060a" stopOpacity="0.92" />
          </radialGradient>
          {/* Linear gradient — fade bottom into next section */}
          <linearGradient id="bottomfade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="55%" stopColor="#05060a" stopOpacity="0" />
            <stop offset="100%" stopColor="#05060a" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* ── Grid lines ── */}
        {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
          <line key={`h${i}`}
            x1="0" y1={i * 50} x2="1440" y2={i * 50}
            stroke="#c8860a" strokeWidth="0.4" strokeOpacity="0.09"
          />
        ))}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
          <line key={`v${i}`}
            x1={i * 103} y1="0" x2={i * 103} y2="500"
            stroke="#c8860a" strokeWidth="0.4" strokeOpacity="0.09"
          />
        ))}
        {Array.from({length: 50}, (_,i) => i).map(i => (
          <line key={`hm${i}`}
            x1="0" y1={i * 10} x2="1440" y2={i * 10}
            stroke="#c8860a" strokeWidth="0.2" strokeOpacity="0.03"
          />
        ))}
        {Array.from({length: 70}, (_,i) => i).map(i => (
          <line key={`vm${i}`}
            x1={i * 20.6} y1="0" x2={i * 20.6} y2="500"
            stroke="#c8860a" strokeWidth="0.2" strokeOpacity="0.03"
          />
        ))}

        {/* ── Centre crosshair axes ── */}
        <line x1="0" y1="250" x2="1440" y2="250" stroke="#c8860a" strokeWidth="0.6" strokeOpacity="0.18" />
        <line x1="720" y1="0" x2="720" y2="500" stroke="#c8860a" strokeWidth="0.6" strokeOpacity="0.18" />

        {/* ── Waveform traces ── */}
        <path d={wave(70, 2.5, 250)} fill="none" stroke="#f0a020" strokeWidth="1.6" strokeOpacity="0.7" filter="url(#glow)" />
        <path d={wave(35, 4, 250)}   fill="none" stroke="#c8860a" strokeWidth="0.8" strokeOpacity="0.3" filter="url(#glow-soft)" />
        <path d={wave(12, 1.2, 180)} fill="none" stroke="#c8860a" strokeWidth="0.5" strokeOpacity="0.14" />

        {/* ── Vignette ── */}
        <rect width="1440" height="500" fill="url(#vign)" />
        {/* ── Bottom fade — blends into #05060a of next section ── */}
        <rect width="1440" height="500" fill="url(#bottomfade)" />

        {/* ── Tick marks ── */}
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <line key={`xt${i}`} x1={i*180} y1="247" x2={i*180} y2="253" stroke="#c8860a" strokeWidth="1" strokeOpacity="0.3"/>
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={`yt${i}`} x1="718" y1={i*100} x2="722" y2={i*100} stroke="#c8860a" strokeWidth="1" strokeOpacity="0.3"/>
        ))}
      </svg>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [firstDone, setFirstDone] = useState(false);
  const [bearing, setBearing] = useState('032');
  const [depth, setDepth] = useState('0118');
  const [signal, setSignal] = useState('94');

  useEffect(() => {
    const iv = setInterval(() => {
      setBearing(String(Math.floor(28 + Math.random() * 8)).padStart(3, '0'));
      setDepth(String(Math.floor(115 + Math.random() * 8)).padStart(4, '0'));
      setSignal(String(Math.floor(91 + Math.random() * 7)));
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const fn = 'Rajdweep', ln = 'Borah'; let i = 0;
    const t1 = setTimeout(() => {
      const iv1 = setInterval(() => {
        i++; setFirstText(fn.slice(0, i));
        if (i >= fn.length) {
          clearInterval(iv1); setFirstDone(true); let j = 0;
          setTimeout(() => {
            const iv2 = setInterval(() => {
              j++; setSecondText(ln.slice(0, j));
              if (j >= ln.length) clearInterval(iv2);
            }, 110);
          }, 180);
        }
      }, 110);
    }, 400);
    return () => clearTimeout(t1);
  }, []);

  return (
    <header className="hero">
      <CROBackground />

      <div className="hero-tl crt-flicker">
        <div>SYSTEM: <span className="hl">ONLINE</span></div>
        <div>MODE: <span className="hl">DEPTH SCAN</span></div>
        <div>VESSEL: <span className="hl">RB-01</span></div>
        <div>CLASS: <span className="hl">ENGINEER</span></div>
      </div>
      <div className="hero-tr crt-flicker">
        <div>LAT: 26°08'N</div>
        <div>LON: 091°44'E</div>
        <div>ALT: 55m ASL</div>
        <div>BEARING: {bearing}°</div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">Embedded Systems · Drone Engineering · IoT</div>
        <h1 className="hero-name">
          <div>{firstText}{!firstDone && <span className="caret" />}</div>
          <div className="line2">{secondText}{firstDone && <span className="caret" />}</div>
        </h1>

        <div className="hero-hud-bottom">
          <div>
            <p className="hero-desc">
              I build stuff that runs on real hardware.<br />
              Based in Guwahati. Currently obsessed with making a drone
              that knows where it is without being told.
            </p>
            <div className="hero-actions">
              <a href="#work" className="crt-btn primary">[ VIEW WORK ]</a>
              <a href="#contact" className="crt-btn">[ CONTACT ]</a>
            </div>
          </div>

          <div className="hud-readout-bar">
            {[
              { label: 'DEPTH',   val: `${depth}m`,  pct: 72 },
              { label: 'SIGNAL',  val: `${signal}%`, pct: parseInt(signal) },
              { label: 'BEARING', val: `${bearing}°`,pct: (parseInt(bearing) / 360) * 100 },
              { label: 'STATUS',  val: 'NOMINAL',    pct: 100 },
            ].map(r => (
              <div className="hud-readout" key={r.label}>
                <div className="hud-readout-label">{r.label}</div>
                <div className="hud-readout-val">{r.val}</div>
                <div className="hud-readout-bar-inner">
                  <div className="hud-readout-fill" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
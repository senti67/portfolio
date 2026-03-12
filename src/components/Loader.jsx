import { useEffect, useRef, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  // refs for animating
  const bodyRef = useRef();
  const armRefs = useRef([]);
  const motorRefs = useRef([]);
  const propRefs = useRef([]);
  const glowRef = useRef();
  const camRef = useRef();

  const easeInOut = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
  const easeOut   = t => 1 - Math.pow(1 - t, 3);

  const animateProp = (el, duration, startTime) => {
    if (!el) return;
    const tick = (now) => {
      const t = (now - startTime) / duration;
      el.style.transform = `rotate(${t * 1440}deg)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const fadeIn = (el, duration, delay, fromOpacity = 0, toOpacity = 1, onDoneCb) => {
    if (!el) return;
    setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const e = easeOut(t);
        el.style.opacity = fromOpacity + (toOpacity - fromOpacity) * e;
        if (t < 1) requestAnimationFrame(tick);
        else if (onDoneCb) onDoneCb();
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  const animateGlow = (el, duration, delay) => {
    if (!el) return;
    setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const e = easeInOut(t);
        const r = 40 + e * 80;
        const opacity = 0.1 + e * 0.5;
        el.setAttribute('r', r);
        el.setAttribute('opacity', opacity);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  const animateStroke = (el, duration, delay, fromColor, toColor) => {
    if (!el) return;
    setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const e = easeOut(t);
        // interpolate from dark to gold
        const r = Math.round(60 + e * 180);
        const g = Math.round(60 + e * 132);
        const b = Math.round(60 + e * 36);
        el.style.stroke = `rgb(${r},${g},${b})`;
        el.style.filter = e > 0.5
          ? `drop-shadow(0 0 ${e * 12}px rgba(240,192,96,${e * 0.9}))`
          : 'none';
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
  };

  useEffect(() => {
    // Phase 1 (0–600ms): drone silhouette fades in dark
    fadeIn(bodyRef.current, 600, 200, 0, 0.15);
    armRefs.current.forEach((el, i) => fadeIn(el, 600, 200 + i * 80, 0, 0.15));
    motorRefs.current.forEach((el, i) => fadeIn(el, 600, 200 + i * 80, 0, 0.15));

    // Phase 2 (800ms): power up — glow expands from center
    animateGlow(glowRef.current, 1000, 800);

    // Phase 3 (900ms): body lights up gold
    animateStroke(bodyRef.current, 800, 900);
    armRefs.current.forEach((el, i) => animateStroke(el, 800, 1000 + i * 100));
    motorRefs.current.forEach((el, i) => animateStroke(el, 800, 1000 + i * 100));

    // Phase 4 (1400ms): props spin up from 0
    propRefs.current.forEach((el, i) => {
      if (!el) return;
      fadeIn(el, 400, 1400 + i * 60, 0, 0.85);
      setTimeout(() => animateProp(el, 600, performance.now()), 1400 + i * 60);
    });

    // Phase 5 (1600ms): camera dot appears
    fadeIn(camRef.current, 400, 1700, 0, 1);

    // Label
    setTimeout(() => setShowLabel(true), 1800);

    // Exit
    setTimeout(() => setExiting(true), 2800);
    setTimeout(() => onDone(), 3600);
  }, []);

  // Drone geometry — centered at 160,160 in a 320x320 viewBox
  const cx = 160, cy = 160;
  const armLen = 72;
  const motorR = 14;
  const propW = 28, propH = 5;

  const motors = [
    { x: cx - armLen, y: cy - armLen },
    { x: cx + armLen, y: cy - armLen },
    { x: cx - armLen, y: cy + armLen },
    { x: cx + armLen, y: cy + armLen },
  ];

  return (
    <div className={`loader ${exiting ? 'loader-exit' : ''}`}>
      <svg className="loader-svg" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0c060" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#f0c060" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* central glow */}
        <circle ref={glowRef} cx={cx} cy={cy} r="40" fill="url(#glowGrad)" opacity="0" />

        {/* arms */}
        {motors.map((m, i) => (
          <line
            key={i}
            ref={el => armRefs.current[i] = el}
            x1={cx} y1={cy} x2={m.x} y2={m.y}
            stroke="#3c3c3c"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ opacity: 0 }}
          />
        ))}

        {/* body */}
        <rect
          ref={bodyRef}
          x={cx - 18} y={cy - 18} width="36" height="36" rx="6"
          fill="#1a1a1a" stroke="#3c3c3c" strokeWidth="1.5"
          style={{ opacity: 0 }}
        />
        <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="rgba(240,192,96,0.15)" strokeWidth="1"/>
        <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="rgba(240,192,96,0.15)" strokeWidth="1"/>

        {/* motors + props */}
        {motors.map((m, i) => (
          <g key={i}>
            <circle
              ref={el => motorRefs.current[i] = el}
              cx={m.x} cy={m.y} r={motorR}
              fill="#161616" stroke="#3c3c3c" strokeWidth="1.5"
              style={{ opacity: 0 }}
            />
            {/* prop — rotates around motor center */}
            <g
              ref={el => propRefs.current[i] = el}
              style={{
                opacity: 0,
                transformOrigin: `${m.x}px ${m.y}px`,
              }}
            >
              <rect
                x={m.x - propW} y={m.y - propH / 2}
                width={propW * 2} height={propH}
                rx={propH / 2}
                fill="rgba(240,192,96,0.5)"
              />
              <rect
                x={m.x - propH / 2} y={m.y - propW}
                width={propH} height={propW * 2}
                rx={propH / 2}
                fill="rgba(240,192,96,0.5)"
              />
            </g>
          </g>
        ))}

        {/* camera */}
        <circle
          ref={camRef}
          cx={cx} cy={cy + 26} r="4"
          fill="rgba(240,192,96,0.2)" stroke="#f0c060" strokeWidth="1"
          style={{ opacity: 0, filter: 'drop-shadow(0 0 6px rgba(240,192,96,0.9))' }}
        />

      </svg>

      <div className={`loader-label ${showLabel ? 'visible' : ''}`}>
        Initializing Systems
      </div>
    </div>
  );
}

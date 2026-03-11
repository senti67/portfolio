import { useEffect, useRef, useState } from 'react';
import './Loader.css';

const TRACES = [
  // TOP
  "M 210 183 L 210 110",
  "M 200 183 L 200 130",
  "M 220 183 L 220 130",
  "M 190 183 L 190 150",
  "M 230 183 L 230 150",
  // BOTTOM
  "M 210 237 L 210 310",
  "M 200 237 L 200 290",
  "M 220 237 L 220 290",
  "M 190 237 L 190 270",
  "M 230 237 L 230 270",
  // LEFT
  "M 183 210 L 110 210",
  "M 183 200 L 130 200",
  "M 183 220 L 130 220",
  "M 183 190 L 150 190",
  "M 183 230 L 150 230",
  // RIGHT
  "M 237 210 L 310 210",
  "M 237 200 L 290 200",
  "M 237 220 L 290 220",
  "M 237 190 L 270 190",
  "M 237 230 L 270 230",
];

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export default function Loader({ onDone }) {
  const traceRefs = useRef([]);
  const [showLabel, setShowLabel] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const DURATION = 800;
    const STAGGER = 60;

    const animateTrace = (el, delay) => {
      if (!el) return;
      setTimeout(() => {
        const len = el.getTotalLength();
        el.setAttribute('stroke-dasharray', len);
        el.setAttribute('stroke-dashoffset', len);
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / DURATION, 1);
          el.setAttribute('stroke-dashoffset', len * (1 - easeOut(t)));
          if (t < 1) {
            requestAnimationFrame(tick);
          } else {
            el.setAttribute('stroke-dashoffset', 0);
          }
        };
        requestAnimationFrame(tick);
      }, delay);
    };

    traceRefs.current.forEach((el, i) => {
      animateTrace(el, i * STAGGER);
    });

    const total = TRACES.length * STAGGER + DURATION;
    setTimeout(() => setShowLabel(true), total - 300);
    setTimeout(() => setExiting(true), total + 800);
    setTimeout(() => onDone(), total + 1500);
  }, []);

  return (
    <div className={`loader ${exiting ? 'loader-exit' : ''}`}>
      <svg className="loader-svg" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">

        {TRACES.map((d, i) => (
          <path
            key={i}
            ref={el => traceRefs.current[i] = el}
            d={d}
            fill="none"
            stroke="#f0c060"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={i % 5 === 0 ? 1 : i % 5 === 1 ? 0.7 : i % 5 === 2 ? 0.7 : i % 5 === 3 ? 0.4 : 0.4}
            style={{ filter: 'drop-shadow(0 0 3px rgba(240,192,96,0.8))' }}
          />
        ))}

        {/* Chip */}
        <rect x="183" y="183" width="54" height="54" rx="5"
          fill="#161616" stroke="#f0c060" strokeWidth="1.5"
          style={{ filter: 'drop-shadow(0 0 12px rgba(240,192,96,0.7))' }} />
        <rect x="196" y="196" width="28" height="28" rx="2"
          fill="none" stroke="rgba(240,192,96,0.2)" strokeWidth="1" />
        <circle cx="210" cy="210" r="5"
          fill="rgba(240,192,96,0.15)" stroke="rgba(240,192,96,0.5)" strokeWidth="1" />

        <text x="210" y="375" textAnchor="middle"
          className={`loader-label ${showLabel ? 'visible' : ''}`}>
          Initializing Systems
        </text>
      </svg>
    </div>
  );
}

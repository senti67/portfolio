import { useEffect, useState, useRef } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [showLabel, setShowLabel] = useState(false);
  const traceRefs = useRef([]);

  const traces = [
    "M 210 185 L 210 150 L 170 150 L 170 110",
    "M 210 185 L 250 185 L 250 150 L 290 150",
    "M 210 235 L 210 270 L 250 270 L 250 310",
    "M 210 235 L 170 235 L 170 270 L 130 270",
    "M 185 210 L 150 210 L 150 170 L 110 170",
    "M 235 210 L 270 210 L 270 170 L 310 170",
    "M 170 110 L 210 110",
    "M 290 150 L 290 190",
    "M 250 310 L 210 310",
    "M 130 270 L 130 230",
    "M 110 170 L 110 210",
    "M 310 170 L 310 210",
  ];

  const nodePoints = [
    [170,110],[210,110],
    [290,150],[290,190],
    [310,170],[310,210],
    [250,310],[210,310],
    [130,270],[130,230],
    [110,170],[110,210],
  ];

  useEffect(() => {
    traceRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength?.() || 200;
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.transition = `stroke-dashoffset ${0.5 + i * 0.1}s ease ${i * 0.15}s`;
      setTimeout(() => { el.style.strokeDashoffset = 0; }, 50);
    });

    nodePoints.forEach((_, i) => {
      setTimeout(() => setNodes(prev => [...prev, i]), 300 + i * 130);
    });

    setTimeout(() => setShowLabel(true), 1000);

    const total = 300 + nodePoints.length * 130 + 700;
    setTimeout(() => setExiting(true), total);
    setTimeout(() => onDone(), total + 700);
  }, []);

  return (
    <div className={`loader ${exiting ? 'loader-exit' : ''}`}>
      <svg className="loader-svg" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">

        {/* Traces */}
        {traces.map((d, i) => (
          <path key={i} ref={el => traceRefs.current[i] = el} className="trace" d={d} />
        ))}

        {/* Nodes */}
        {nodePoints.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" className={`node ${nodes.includes(i) ? 'visible' : ''}`} />
            <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(240,192,96,0.25)" strokeWidth="1" className={`node ${nodes.includes(i) ? 'visible' : ''}`} />
          </g>
        ))}

        {/* Clean center chip */}
        <rect x="183" y="183" width="54" height="54" rx="5"
          fill="#161616" stroke="#f0c060" strokeWidth="1.5"
          style={{filter:'drop-shadow(0 0 10px rgba(240,192,96,0.6))'}} />
        {/* chip pin lines */}
        <line x1="197" y1="183" x2="197" y2="175" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="210" y1="183" x2="210" y2="175" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="223" y1="183" x2="223" y2="175" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="197" y1="237" x2="197" y2="245" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="210" y1="237" x2="210" y2="245" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="223" y1="237" x2="223" y2="245" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="183" y1="197" x2="175" y2="197" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="183" y1="210" x2="175" y2="210" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="183" y1="223" x2="175" y2="223" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="237" y1="197" x2="245" y2="197" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="237" y1="210" x2="245" y2="210" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        <line x1="237" y1="223" x2="245" y2="223" stroke="#f0c060" strokeWidth="1" opacity="0.5"/>
        {/* inner chip detail */}
        <rect x="196" y="196" width="28" height="28" rx="2"
          fill="none" stroke="rgba(240,192,96,0.2)" strokeWidth="1"/>
        <circle cx="210" cy="210" r="6"
          fill="rgba(240,192,96,0.1)" stroke="rgba(240,192,96,0.4)" strokeWidth="1"/>

        {/* Label */}
        <text x="210" y="375" textAnchor="middle" className={`loader-label ${showLabel ? 'visible' : ''}`}>
          Initializing Systems
        </text>
      </svg>
    </div>
  );
}

import { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader({ onDone }) {
  const [parts, setParts] = useState([]);
  const [exiting, setExiting] = useState(false);

  const sequence = ['body', 'arm-tl', 'arm-tr', 'arm-bl', 'arm-br', 'rotor-tl', 'rotor-tr', 'rotor-bl', 'rotor-br', 'camera'];

  useEffect(() => {
    sequence.forEach((part, i) => {
      setTimeout(() => {
        setParts(prev => [...prev, part]);
      }, 300 + i * 180);
    });
    const totalTime = 300 + sequence.length * 180 + 600;
    setTimeout(() => setExiting(true), totalTime);
    setTimeout(() => onDone(), totalTime + 700);
  }, []);

  const has = (p) => parts.includes(p);

  return (
    <div className={`loader ${exiting ? 'loader-exit' : ''}`}>
      <svg className="loader-drone" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">

        {/* ARMS */}
        <g className={`drone-part arm-tl ${has('arm-tl') ? 'visible' : ''}`}>
          <line x1="85" y1="85" x2="58" y2="58" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g className={`drone-part arm-tr ${has('arm-tr') ? 'visible' : ''}`}>
          <line x1="115" y1="85" x2="142" y2="58" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g className={`drone-part arm-bl ${has('arm-bl') ? 'visible' : ''}`}>
          <line x1="85" y1="115" x2="58" y2="142" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        <g className={`drone-part arm-br ${has('arm-br') ? 'visible' : ''}`}>
          <line x1="115" y1="115" x2="142" y2="142" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round"/>
        </g>

        {/* BODY */}
        <g className={`drone-part ${has('body') ? 'visible' : ''}`}>
          <rect x="82" y="82" width="36" height="36" rx="6" fill="#1a1a1a" stroke="#f0c060" strokeWidth="1.5"/>
          <rect x="91" y="91" width="18" height="18" rx="3" fill="#f0c060" opacity="0.15"/>
          <line x1="100" y1="82" x2="100" y2="118" stroke="#f0c060" strokeWidth="0.5" opacity="0.4"/>
          <line x1="82" y1="100" x2="118" y2="100" stroke="#f0c060" strokeWidth="0.5" opacity="0.4"/>
        </g>

        {/* ROTORS */}
        <g className={`drone-part rotor rotor-tl ${has('rotor-tl') ? 'visible' : ''}`}>
          <ellipse cx="52" cy="52" rx="18" ry="4" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <ellipse cx="52" cy="52" rx="4" ry="18" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="52" cy="52" r="3" fill="#f0c060" opacity="0.6"/>
        </g>
        <g className={`drone-part rotor rotor-tr ${has('rotor-tr') ? 'visible' : ''}`}>
          <ellipse cx="148" cy="52" rx="18" ry="4" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <ellipse cx="148" cy="52" rx="4" ry="18" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="52" r="3" fill="#f0c060" opacity="0.6"/>
        </g>
        <g className={`drone-part rotor rotor-bl ${has('rotor-bl') ? 'visible' : ''}`}>
          <ellipse cx="52" cy="148" rx="18" ry="4" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <ellipse cx="52" cy="148" rx="4" ry="18" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="52" cy="148" r="3" fill="#f0c060" opacity="0.6"/>
        </g>
        <g className={`drone-part rotor rotor-br ${has('rotor-br') ? 'visible' : ''}`}>
          <ellipse cx="148" cy="148" rx="18" ry="4" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <ellipse cx="148" cy="148" rx="4" ry="18" fill="none" stroke="#f0c060" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="148" r="3" fill="#f0c060" opacity="0.6"/>
        </g>

        {/* CAMERA */}
        <g className={`drone-part ${has('camera') ? 'visible' : ''}`}>
          <circle cx="100" cy="100" r="5" fill="#f0c060" opacity="0.9"/>
          <circle cx="100" cy="100" r="8" fill="none" stroke="#f0c060" strokeWidth="1" opacity="0.4"/>
        </g>

        {/* GLOW filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>

      <div className="loader-line" />
      <div className="loader-sub">Initializing systems...</div>
    </div>
  );
}

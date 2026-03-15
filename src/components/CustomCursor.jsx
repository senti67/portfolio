import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef();

  useEffect(() => {
    const el = cursorRef.current;
    const move = (e) => {
      // direct DOM manipulation — no React state, zero lag
      el.style.transform = `translate(${e.clientX - 11}px, ${e.clientY - 11}px)`;
    };
    const down = () => el.style.opacity = '0.6';
    const up   = () => el.style.opacity = '1';
    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousedown', down, { passive: true });
    window.addEventListener('mouseup',   up,   { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: 22, height: 22,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22">
        <line x1="11" y1="0"  x2="11" y2="7"  stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="11" y1="15" x2="11" y2="22" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="0"  y1="11" x2="7"  y2="11" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="15" y1="11" x2="22" y2="11" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <circle cx="11" cy="11" r="2.5" fill="none" stroke="#ffb000" strokeWidth="1" opacity="0.7"/>
      </svg>
    </div>
  );
}

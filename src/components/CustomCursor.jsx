import { useEffect, useState } from 'react';
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);
  return (
    <div style={{
      position:'fixed', left:pos.x, top:pos.y,
      width: clicking?18:22, height: clicking?18:22,
      transform:'translate(-50%,-50%)',
      pointerEvents:'none', zIndex:99999,
      transition:'width 0.1s,height 0.1s',
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22">
        <line x1="11" y1="0" x2="11" y2="7" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="11" y1="15" x2="11" y2="22" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="0" y1="11" x2="7" y2="11" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <line x1="15" y1="11" x2="22" y2="11" stroke="#ffb000" strokeWidth="1.5" opacity="0.9"/>
        <circle cx="11" cy="11" r="2.5" fill="none" stroke="#ffb000" strokeWidth="1" opacity="0.7"/>
      </svg>
    </div>
  );
}

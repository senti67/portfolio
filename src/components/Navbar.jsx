import { useEffect, useState } from 'react';
import './Navbar.css';
export default function Navbar() {
  const [active, setActive] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`);
    };
    tick(); const iv = setInterval(tick,1000); return () => clearInterval(iv);
  },[]);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id); });
    },{ threshold:0.4 });
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  },[]);
  return (
    <nav className="navbar">
      <div className="nav-logo">RB</div>
      <ul className="nav-links">
        {['about','work','contact'].map(s => (
          <li key={s}><a href={`#${s}`} className={active===s?'active':''}>{s}</a></li>
        ))}
      </ul>
      <div className="nav-coords">
        <span><span className="nav-status-dot"/>ONLINE</span>
        <span>SYS_TIME: {time}</span>
        <span>N26°08' E091°44'</span>
      </div>
    </nav>
  );
}

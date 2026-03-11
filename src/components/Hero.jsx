import { useEffect, useState } from 'react';
import './Hero.css';

function useTypewriter(text, speed = 150, delay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const first = useTypewriter('Rajdweep', 150, 600);
  const last  = useTypewriter('Borah',    150, first.done ? 200 : 999999);

  return (
    <header className="hero">
      <div className="hero-grid-bg" />
      <p className="hero-eyebrow fade-in d1">Embedded Systems · Drone Engineering · IoT</p>
      <h1 className="hero-name">
        <span className="filled">
          {first.displayed}
          {!first.done && <span className="caret">|</span>}
        </span>
        <span>
          {last.displayed}
          {first.done && <span className="caret">|</span>}
        </span>
      </h1>
      <div className="hero-bottom fade-in d3">
        <p className="hero-desc">
          I build systems that operate in the physical world — from flight controllers and sensor
          networks to custom firmware and autonomous platforms. Clean code. Real hardware.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn primary">View Work</a>
          <a href="#contact" className="btn">Contact</a>
        </div>
      </div>
    </header>
  );
}
import { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);

  useEffect(() => {
    const firstName = 'Rajdweep';
    const lastName = 'Borah';
    let i = 0;

    // Type first name
    const t1 = setTimeout(() => {
      const iv1 = setInterval(() => {
        i++;
        setFirstText(firstName.slice(0, i));
        if (i >= firstName.length) {
          clearInterval(iv1);
          setFirstDone(true);

          // Type last name after first is done
          let j = 0;
          const t2 = setTimeout(() => {
            const iv2 = setInterval(() => {
              j++;
              setSecondText(lastName.slice(0, j));
              if (j >= lastName.length) {
                clearInterval(iv2);
                setSecondDone(true);
              }
            }, 120);
          }, 200);
        }
      }, 120);
    }, 500);

    return () => clearTimeout(t1);
  }, []);

  return (
    <header className="hero">
      <div className="hero-grid-bg" />
      <p className="hero-eyebrow fade-in d1">Embedded Systems · Drone Engineering · IoT</p>
      <h1 className="hero-name">
        <div className="filled">
          {firstText}
          {!firstDone && <span className="caret" />}
        </div>
        <div className="last-line">
          {secondText}
          {firstDone && <span className="caret" />}
        </div>
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

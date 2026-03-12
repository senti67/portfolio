import { useEffect, useState } from 'react';
import TopoMap from './TopoMap';
import './Hero.css';

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
      <TopoMap />

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
              I build stuff that runs on real hardware.<br/>
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

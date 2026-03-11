import { useEffect, useRef } from 'react';
import './About.css';

const SKILLS = [
  { name: 'Embedded C / C++',    pct: 92 },
  { name: 'Drone Systems & UAV', pct: 88 },
  { name: 'PCB Design (KiCad)',  pct: 78 },
  { name: 'IoT & MQTT',          pct: 82 },
  { name: 'Python / OpenCV',     pct: 74 },
  { name: 'RTOS / FreeRTOS',     pct: 70 },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.skill-fill').forEach(bar => {
            setTimeout(() => { bar.style.width = bar.dataset.pct + '%'; }, 100);
          });
        }
      });
    }, { threshold: 0.1 });

    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">About</span>
        <span className="section-index">01 / 03</span>
      </div>
      <div className="about-grid">
        <div className="about-left reveal">
          <h2>Engineering at the edge of software and hardware.</h2>
          <p>I'm Rajdweep — an embedded systems and drone engineer who likes to work close to the metal. My work lives in the space where firmware meets physics: designing control systems, writing low-level drivers, and building things that actually fly.</p>
          <p>Currently pursuing my engineering degree, I focus on autonomous platforms, state estimation, and IoT infrastructure that scales down to a single chip.</p>
        </div>
        <div className="about-right reveal">
          <div className="skills-heading">Core Skills</div>
          {SKILLS.map(s => (
            <div className="skill-row" key={s.name}>
              <span className="skill-name">{s.name}</span>
              <div className="skill-track">
                <div className="skill-fill" data-pct={s.pct} style={{ width: 0 }} />
              </div>
              <span className="skill-pct">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

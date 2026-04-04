import { useEffect, useRef } from 'react';
import './About.css';

const SKILLS = [
  { name: 'Embedded C/C++', pct: 70 },
  { name: 'Python / ROS',   pct: 50 },
  { name: 'Drone Systems',  pct: 69 },
  { name: 'React / Vite',   pct: 75 },
  { name: 'PCB Design',     pct: 80 },
  { name: 'MicroPython',    pct: 70 },
  { name: 'MAVLink',        pct: 40 },
  { name: 'Sensor Fusion',  pct: 40 },
];

export default function About() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
          e.target.querySelectorAll('.skill-fill').forEach(el => el.classList.add('animate'));
        }
      });
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={ref}>
      <div className="about-section">
        <div className="about-section-title">
          SYSTEM PROFILE — OPERATOR DATA
          <span className="sect-num">01 / 03</span>
        </div>

        <div className="about-console-grid">
          {/* content remains unchanged */}
        </div>
      </div>
    </section>
  );

}

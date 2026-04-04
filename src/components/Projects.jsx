import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    id: 'MISSION-001', title: 'Digital Twin for Drone', featured: true,
    status: 'active', statusLabel: 'IN PROGRESS',
    desc: 'Building a real-time simulation that mirrors my actual drone — telemetry, IMU, flight state, all synced. The goal is to be able to test things without crashing the real one. again.',
    tags: ['Python','ROS','Telemetry','Simulation','IMU','MAVLink'], year: '2025',
  },
  {
    id: 'MISSION-002', title: 'FPV Drone Build',
    status: 'done', statusLabel: 'COMPLETE',
    desc: 'Built a quad from scratch. Crashed it 11 times before it flew properly. PID tuning is genuinely humbling.',
    tags: ['Hardware','Flight Controller','FPV','PID'], year: '2024',
  },
  {
    id: 'MISSION-003', title: 'UI/UX Web Platform',
    status: 'done', statusLabel: 'COMPLETE',
    desc: 'Designed and built the frontend. Argued with myself about spacing for 3 days.',
    tags: ['React','Figma','CSS','UI/UX'], year: '2024',
  },
  {
    id: 'MISSION-004', title: 'This Portfolio',
    status: 'active', statusLabel: 'LIVE',
    desc: 'Yes the submarine HUD theme was my idea. No I will not explain further.',
    tags: ['React','Vite','Canvas','CSS'], year: '2025',
  },
  {
    id: 'MISSION-005', title: 'Video Wall Interface',
    status: 'done', statusLabel: 'COMPLETE',
    desc: 'RPi Pico driving a TFT matrix over SPI. Worked first try which was suspicious.',
    tags: ['RPi Pico','MicroPython','SPI','Embedded'], year: '2025',
  },
];

export default function Projects() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      });
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="work" ref={ref}>
      <div className="work-section">
        <div className="work-section-title">
          MISSION LOG — COMPLETED &amp; ACTIVE OPS
          <span className="sect-num">02 / 03</span>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className={`project-card reveal ${p.featured ? 'featured' : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="bracket tl"/><div className="bracket br"/>
              <div className="project-card-header">
                <span className="project-card-id">{p.id}</span>
                <span className={`project-card-status ${p.status}`}>{p.statusLabel}</span>
              </div>
              <div className="project-body">
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-chips">
                  {p.tags.map(t => <span key={t} className="pchip">{t}</span>)}
                </div>
              </div>
              <div className="project-card-footer">
                <span>YEAR: {p.year}</span>
                <span>→ VIEW</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

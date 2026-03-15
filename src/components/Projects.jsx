import { useEffect, useRef } from 'react';
import './Projects.css';

const FEATURED = {
  title: 'Digital Twin for Drone',
  desc: 'Building a real-time simulation that mirrors my actual drone — telemetry, IMU, flight state, all synced. The goal is to be able to test things without crashing the real one. again.',
  tags: ['Python', 'ROS', 'Telemetry', 'Simulation', 'IMU', 'MAVLink'],
  meta: [
    { k: 'Status',   v: 'In Progress' },
    { k: 'Year',     v: '2025' },
    { k: 'Stack',    v: 'ROS / Python' },
    { k: 'Hardware', v: 'Custom FC' },
  ],
};

const PROJECTS = [
  { num: '02', title: 'FPV Drone Build', desc: 'Crashed it 11 times before it flew properly. PID tuning is genuinely humbling.', tags: ['Hardware','FPV','PID'], year: '2024', status: 'done' },
  { num: '03', title: 'UI/UX Web Platform', desc: 'Designed and built the frontend. Argued with myself about spacing for 3 days.', tags: ['React','Figma','CSS'], year: '2024', status: 'done' },
  { num: '04', title: 'This Portfolio', desc: 'Yes the submarine HUD theme was my idea. No I will not explain further.', tags: ['React','Vite','Canvas'], year: '2025', status: 'active' },
  { num: '05', title: 'Video Wall Interface', desc: 'RPi Pico driving a TFT matrix over SPI. Worked first try which was suspicious.', tags: ['RPi Pico','MicroPython','SPI'], year: '2025', status: 'done' },
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

        {/* featured — big asymmetric layout */}
        <div className="project-featured reveal">
          <div className="project-featured-left">
            <div className="bracket tl"/>
            <div className="featured-eyebrow">◆ ACTIVE MISSION</div>
            <div className="featured-title-big">{FEATURED.title}</div>
            <p className="featured-desc">{FEATURED.desc}</p>
            <div className="featured-chips">
              {FEATURED.tags.map(t => <span key={t} className="pchip">{t}</span>)}
            </div>
          </div>
          <div className="project-featured-right">
            {FEATURED.meta.map(m => (
              <div className="feat-meta-row" key={m.k}>
                <div className="feat-meta-k">{m.k}</div>
                <div className="feat-meta-v">{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* rest — horizontal list rows, not cards */}
        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <div className="project-row reveal" key={p.num} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="project-row-num">{p.num}</div>
              <div className="project-row-body">
                <div className="project-row-title">{p.title}</div>
                <div className="project-row-desc">{p.desc}</div>
              </div>
              <div className="project-row-tags">
                {p.tags.map(t => <span key={t} className="pchip">{t}</span>)}
              </div>
              <div className="project-row-year">{p.year}</div>
              <div className={`project-row-status ${p.status}`}>
                {p.status === 'active' ? 'LIVE' : 'DONE'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import './Projects.css';

const FEATURED = {
  title: 'Digital Twin\nfor Drone',
  desc: 'A real-time digital twin system that mirrors a physical drone\'s state in a virtual environment. Sensor data from the drone is streamed live to simulate flight dynamics, telemetry, and system health — enabling monitoring, testing, and failure prediction without risking the hardware.',
  stack: ['Python', 'ROS', 'Telemetry', 'Simulation', 'IMU', 'MAVLink'],
  meta: [
    { k: 'Category', v: 'Drone Engineering' },
    { k: 'Type',     v: 'Simulation & Monitoring' },
    { k: 'Status',   v: 'In Progress' },
    { k: 'Year',     v: '2025' },
  ],
};

const PROJECTS = [
  {
    idx: '02',
    title: 'FPV Drone',
    desc: 'Built a first-person-view drone from scratch — frame assembly, ESC wiring, flight controller tuning, and camera feed integration for real-time piloting.',
    tags: ['Hardware', 'Flight Controller', 'FPV', 'PID Tuning'],
    year: '2024',
  },
  {
    idx: '03',
    title: 'UI/UX Design — Web Platform',
    desc: 'Designed and developed the full user interface for a web application, focusing on clean layout, intuitive navigation, and a consistent visual language.',
    tags: ['React', 'Figma', 'CSS', 'UI/UX'],
    year: '2024',
  },
  {
    idx: '04',
    title: 'Developer Portfolio',
    desc: 'Designed and built this portfolio from the ground up — dark minimal aesthetic, custom cursor, scroll animations, and a fully responsive layout.',
    tags: ['React', 'Vite', 'Tailwind', 'CSS'],
    year: '2025',
  },
  {
    idx: '05',
    title: 'Video Wall Interface',
    desc: 'Building a modular video wall display system using Raspberry Pi Pico microcontrollers driving TFT screens — coordinated to render a single image or video across multiple panels.',
    tags: ['Raspberry Pi Pico', 'TFT', 'MicroPython', 'Embedded'],
    year: '2025',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="projects" ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">Selected Work</span>
        <span className="section-index">02 / 03</span>
      </div>

      {/* Featured */}
      <div className="featured-wrap reveal">
        <div>
          <div className="featured-badge">Featured Project</div>
          <h2 className="featured-title">
            {FEATURED.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < 1 && <br />}</span>
            ))}
          </h2>
          <p className="featured-body">{FEATURED.desc}</p>
          <div className="featured-stack">
            {FEATURED.stack.map(t => <span className="tag" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="featured-meta-list">
          {FEATURED.meta.map(m => (
            <div className="meta-row" key={m.k}>
              <span className="meta-k">{m.k}</span>
              <span className="meta-v">{m.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="projects-list reveal">
        {PROJECTS.map(p => (
          <div className="project-row" key={p.idx}>
            <span className="project-idx">{p.idx}</span>
            <div className="project-main">
              <div className="project-title-text">{p.title}</div>
              <div className="project-desc-short">{p.desc}</div>
            </div>
            <div className="project-tags">
              {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            <div className="project-year">
              {p.year} <span className="project-arrow-icon">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
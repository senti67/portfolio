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
          <div className="profile-panel reveal">
            <div className="bracket tl"/><div className="bracket br"/>
            <div className="profile-panel-header">
              <span>OPERATOR_RECORD.DAT</span>
              <span>CLEARANCE: LEVEL-3</span>
            </div>
            <div className="profile-body">
              <div className="profile-name">Rajdweep Borah</div>
              <div className="profile-role">EMBEDDED SYSTEMS · DRONE ENGINEER</div>

              <p className="profile-bio">
                I'm from Guwahati. I build things that actually exist in the physical world —
                not just on a screen. Got into this properly after staying up till 4am debugging
                a sensor that turned out to be wired backwards. Still not over it.
              </p>
              <p className="profile-bio">
                There's something about the moment a sensor reading just works —
                or when code you wrote runs on real hardware for the first time —
                that I haven't found anywhere else. That's why I do this.
              </p>
              <p className="profile-bio" style={{ opacity:1
<p className="profile-bio" style={{ opacity: 1 }}>
<p className="profile-bio">
  also yes i can smell when a board has been freshly soldered. it's a gift.
</p>
                {['C++','Python','ROS','MAVLink','React','FPV','IoT','PCB'].map(t => (
                  <span key={t} className="profile-tag">{t}</span>
                ))}
              </div>

              <div className="stats-grid">
                {[
                  ['5+',  'projects shipped'],
                  ['2+',  'years in'],
                  ['3',   'active right now'],
                  ['1',   'wired backwards'],
                ].map(([v, l]) => (
                  <div key={l} className="stat-cell">
                    <div className="stat-val">{v}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="capability-panel reveal">
            <div className="bracket tl"/><div className="bracket br"/>
            <div className="capability-panel-header">
              <span>CAPABILITY_MATRIX.SYS</span>
              <span>honest numbers</span>
            </div>
            <div className="capability-list">
              {SKILLS.map((s, i) => (
                <div className="skill-row" key={s.name}>
                  <div className="skill-id">{String(i + 1).padStart(2, '0')}</div>
                  <div className="skill-name">{s.name}</div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${s.pct}%` }} />
                  </div>
                  <div className="skill-pct">{s.pct}</div>
                </div>
              ))}
              <p style={{
                fontSize: '9px',
                color: 'rgba(255,176,0,0.3)',
                marginTop: '16px',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                * PCB number goes up every time i don't short something
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

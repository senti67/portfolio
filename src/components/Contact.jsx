import { useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      });
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="contact" ref={ref}>
      <div className="contact-section">
        <div className="contact-section-title">
          OPEN CHANNEL — ESTABLISH COMMS
          <span className="sect-num">03 / 03</span>
        </div>
        <div className="contact-grid">
          <div className="contact-left reveal">
            <div className="bracket tl"/><div className="bracket br"/>
            <div className="contact-left-header">
              <span>CONTACT_CHANNELS.DAT</span>
              <span>4 ACTIVE</span>
            </div>
            <div className="contact-left-body">
              <div className="contact-heading">
                if you're building<br/>something real, hi.
              </div>
              <p className="contact-desc">
                open to internships, collabs, interesting problems.
                if it involves hardware talking to software i'm probably already interested.
                if it's a wordpress site, i'm probably not the guy.
              </p>
              {[
                { text: 'rajdweepborah@gmail.com',        label: 'Email',     href: 'mailto:rajdweepborah@gmail.com' },
                { text: 'linkedin.com/in/rajdweep-borah', label: 'LinkedIn',  href: 'https://linkedin.com/in/rajdweep-borah-33839832a/' },
                { text: 'instagram.com/rajdweep._.borah', label: 'Instagram', href: 'https://instagram.com/rajdweep._.borah/' },
                { text: 'github.com/senti67',             label: 'GitHub',    href: 'https://github.com/senti67' },
              ].map(ch => (
                <a key={ch.label} href={ch.href} className="channel-row" target="_blank" rel="noreferrer">
                  <span className="ch-text">{ch.text}</span>
                  <span className="ch-label">{ch.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-right reveal">
            <div className="bracket tl"/><div className="bracket br"/>
            <div className="contact-right-header">
              <span>TRANSMIT_MESSAGE.SYS</span>
              <span>ENCRYPTED</span>
            </div>
            <div className="contact-right-body">
              <form onSubmit={e => e.preventDefault()}>
                <div className="crt-field">
                  <label htmlFor="name">your name</label>
                  <input id="name" name="name" type="text" placeholder="what do i call you" autoComplete="name"/>
                </div>
                <div className="crt-field">
                  <label htmlFor="email">your email</label>
                  <input id="email" name="email" type="email" placeholder="so i can actually reply" autoComplete="email"/>
                </div>
                <div className="crt-field">
                  <label htmlFor="message">what's up</label>
                  <textarea id="message" name="message" placeholder="what are you building, or just say hi"/>
                </div>
                <button type="submit" className="transmit-btn">[ send it ]</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

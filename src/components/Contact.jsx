import { useEffect, useRef } from 'react';
import './Contact.css';

export default function Contact() {
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
    <section className="section" id="contact" ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">Contact</span>
        <span className="section-index">03 / 03</span>
      </div>
      <div className="contact-grid">
        <div className="contact-left reveal">
          <h2>Let's work<br />together.</h2>
          <p>Open to internships, research collaborations, and engineering projects. If you're building something at the intersection of hardware and software, reach out.</p>
          <div>
            <a href="mailto:rajdweepborah@gmail.com" className="contact-link-row">
              <span className="cl-text">rajdweepborah@gmail.com</span>
              <span className="cl-label">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/rajdweep-borah-33839832a/" className="contact-link-row" target="_blank" rel="noreferrer">
              <span className="cl-text">linkedin.com/in/rajdweep-borah</span>
              <span className="cl-label">LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/rajdweep._.borah/" className="contact-link-row" target="_blank" rel="noreferrer">
              <span className="cl-text">instagram.com/rajdweep._.borah</span>
              <span className="cl-label">Instagram</span>
            </a>
            <a href="https://github.com/senti67" className="contact-link-row" target="_blank" rel="noreferrer">
              <span className="cl-text">github.com/senti67</span>
              <span className="cl-label">GitHub</span>
            </a>
          </div>
        </div>
        <div className="contact-right reveal">
          <div className="form-label-top">Send a Message</div>
          <form onSubmit={e => e.preventDefault()}>
            <div className="field">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="What are you building?" />
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

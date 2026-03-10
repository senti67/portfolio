const customStyles = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

:root {
  --green-light: #C6CEC5;
  --green-mid: #A4B4A4;
  --green-muted: #83958B;
  --green-dark: #627160;
  --bg-fern: #30463D;
  --bg-base: #0D2625;
  --bg-panel: rgba(13, 38, 37, 0.85);
  --text-primary: #C6CEC5;
  --text-muted: #83958B;
  --accent: #A4B4A4;
  --accent-glow: rgba(196, 206, 197, 0.25);
}

body {
  font-family: 'Rajdhani', sans-serif;
  background: var(--bg-base);
  color: var(--text-primary);
  overflow-x: hidden;
  scroll-behavior: smooth;
  cursor: none;
}

h1, h2, h3, .mono { font-family: 'Space Mono', monospace; }

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-base); }
::-webkit-scrollbar-thumb { background: var(--green-muted); border-radius: 10px; }

.cursor-dot, .cursor-outline { position: fixed; top: 0; left: 0; transform: translate(-50%, -50%); border-radius: 50%; z-index: 9999; pointer-events: none; }
.cursor-dot { width: 6px; height: 6px; background-color: var(--green-light); box-shadow: 0 0 10px var(--accent-glow); }
.cursor-outline { width: 40px; height: 40px; border: 1px solid rgba(196, 206, 197, 0.4); transition: width 0.2s, height 0.2s, background-color 0.2s; }
.cursor-outline.hovering { width: 60px; height: 60px; background-color: rgba(196, 206, 197, 0.06); border-color: var(--green-light); }

.glass-panel { background: rgba(48, 70, 61, 0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(131, 149, 139, 0.2); border-radius: 8px; position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.glass-panel::before { content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(196, 206, 197, 0.05), transparent); transform: skewX(-20deg); transition: 0.5s; }
.glass-panel:hover { border-color: rgba(196, 206, 197, 0.4); box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(131, 149, 139, 0.08) inset; transform: translateY(-5px); }
.glass-panel:hover::before { left: 200%; }

.cyber-corners { position: relative; }
.cyber-corners::before, .cyber-corners::after { content: ''; position: absolute; width: 10px; height: 10px; border-color: var(--green-light); border-style: solid; transition: 0.3s; }
.cyber-corners::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.cyber-corners::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
.glass-panel:hover .cyber-corners::before, .glass-panel:hover .cyber-corners::after { width: 20px; height: 20px; }

.scanlines { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.08) 50%), linear-gradient(90deg, rgba(196,206,197,0.01), rgba(164,180,164,0.01), rgba(131,149,139,0.01)); background-size: 100% 4px, 3px 100%; pointer-events: none; z-index: 50; opacity: 0.3; }

.crt-flicker { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(196, 206, 197, 0.01); pointer-events: none; z-index: 49; animation: flicker 0.15s infinite; }
@keyframes flicker { 0% { opacity: 0.9; } 50% { opacity: 1; } 100% { opacity: 0.9; } }

.glitch-text { position: relative; display: inline-block; color: var(--text-primary); text-shadow: 0 0 12px var(--accent-glow); }
.glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-base); }
.glitch-text::before { left: 2px; text-shadow: -2px 0 var(--green-muted); clip: rect(44px, 450px, 56px, 0); animation: glitch-anim 3s infinite linear alternate-reverse; }
.glitch-text::after { left: -2px; text-shadow: -2px 0 var(--green-light); clip: rect(44px, 450px, 56px, 0); animation: glitch-anim2 2.5s infinite linear alternate-reverse; }
@keyframes glitch-anim { 0% { clip: rect(15px, 9999px, 86px, 0); } 20% { clip: rect(61px, 9999px, 12px, 0); } 40% { clip: rect(31px, 9999px, 98px, 0); } 60% { clip: rect(82px, 9999px, 34px, 0); } 80% { clip: rect(15px, 9999px, 55px, 0); } 100% { clip: rect(72px, 9999px, 20px, 0); } }
@keyframes glitch-anim2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(5px, 9999px, 74px, 0); } 40% { clip: rect(80px, 9999px, 2px, 0); } 60% { clip: rect(30px, 9999px, 50px, 0); } 80% { clip: rect(90px, 9999px, 12px, 0); } 100% { clip: rect(20px, 9999px, 85px, 0); } }

.blink-cursor { display: inline-block; width: 10px; height: 1.2em; background-color: var(--green-light); vertical-align: bottom; margin-left: 4px; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.reveal { opacity: 0; transform: translateY(40px) scale(0.95); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.reveal.active { opacity: 1; transform: translateY(0) scale(1); }

.delay-100 { transition-delay: 300ms; }
.delay-200 { transition-delay: 300ms; }
.delay-300 { transition-delay: 300ms; }

.cyber-link { position: relative; color: var(--green-light); text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 0.85rem; }
.cyber-link::after { content: ''; position: absolute; width: 100%; transform: scaleX(0); height: 2px; bottom: -4px; left: 0; background-color: var(--green-light); transform-origin: bottom right; transition: transform 0.25s ease-out; }
.cyber-link:hover::after { transform: scaleX(1); transform-origin: bottom left; }
`;

export default customStyles;
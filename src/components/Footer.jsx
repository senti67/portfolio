import './Footer.css';
export default function Footer(){
  return(
    <footer className="footer">
      <div className="footer-copy">© 2025 <span>RAJDWEEP BORAH</span> — ALL SYSTEMS NOMINAL</div>
      <ul className="footer-links">
        {[['GitHub','https://github.com/senti67'],['LinkedIn','https://linkedin.com/in/rajdweep-borah-33839832a/'],['Instagram','https://instagram.com/rajdweep._.borah/']].map(([l,h])=>(
          <li key={l}><a href={h} target="_blank" rel="noreferrer">{l}</a></li>
        ))}
      </ul>
      <div className="footer-sys">SYSTEMS ONLINE</div>
    </footer>
  );
}

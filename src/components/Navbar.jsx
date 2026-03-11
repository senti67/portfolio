import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="nav-logo">RB</a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="nav-status">
        <div className="status-dot" />
        Available for work
      </div>
    </nav>
  );
}

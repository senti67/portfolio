import { useState, useEffect } from "react";
import { Cpu } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-cyan-200/50 py-4 shadow-lg shadow-cyan-900/5"
          : "bg-transparent py-6"
      } px-6 md:px-12 flex justify-between items-center`}
    >
      <div className="flex items-center gap-2">
        <Cpu className="text-cyan-600 animate-pulse" size={24} />
        <span className="mono font-bold tracking-wider text-cyan-600 text-lg">SYS.ADMIN_</span>
      </div>

      <div className="hidden md:flex gap-8 mono">
        <a href="#about" className="cyber-link hover:text-cyan-600 transition-colors">01. About</a>
        <a href="#projects" className="cyber-link hover:text-cyan-600 transition-colors">02. Projects</a>
        <a href="#contact" className="cyber-link hover:text-cyan-600 transition-colors">03. Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
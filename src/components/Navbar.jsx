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
      className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#131313]/95 backdrop-blur-md border-[#EFD395]/20 py-4 shadow-lg shadow-black/50"
          : "bg-[#131313]/60 backdrop-blur-sm border-transparent py-6"
      } px-6 md:px-12 flex justify-between items-center`}
    >
      <div className="flex items-center gap-2">
        <Cpu className="animate-pulse" size={24} style={{ color: '#EFD395' }} />
        <span className="mono font-bold tracking-wider text-lg" style={{ color: '#EFD395' }}>SYS.ADMIN_</span>
      </div>

      <div className="hidden md:flex gap-8 mono">
        <a href="#about" className="cyber-link hover:opacity-80 transition-opacity">01. About</a>
        <a href="#projects" className="cyber-link hover:opacity-80 transition-opacity">02. Projects</a>
        <a href="#contact" className="cyber-link hover:opacity-80 transition-opacity">03. Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
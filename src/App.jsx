import { useEffect } from "react";
import customStyles from "./styles/customStyles";
import CustomCursor from "./components/CustomCursor";
import ParticleNetwork from "./components/ParticleNetwork";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <style>{customStyles}</style>

      {/* Background Layers */}
      <ParticleNetwork />
      <div className="scanlines" />
      <div className="crt-flicker" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Page Content */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
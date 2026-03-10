import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import Typewriter from "./Typewriter";

const Hero = () => (
  <section className="min-h-screen flex flex-col items-center justify-center text-center relative px-4 pt-20">
    <div className="absolute top-1/4 left-10 md:left-20 opacity-40 hidden md:block">
      <div className="mono text-xs text-left mb-2 text-cyan-700">SYSTEM_STATUS:</div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="mono text-sm text-slate-700">CORE_STABLE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="mono text-sm text-slate-700">NET_UPLINK</span>
        </div>
      </div>
    </div>

    <div className="reveal mb-4 inline-block px-4 py-1 rounded-full border border-cyan-400/30 bg-cyan-50 text-cyan-700 mono text-sm font-semibold tracking-widest backdrop-blur-sm">
      ACCESS GRANTED
    </div>

    <h1
      className="text-5xl md:text-7xl font-bold glitch-text mono mb-4 tracking-tighter"
      data-text="RAJDWEEP BORAH"
    >
      RAJDWEEP BORAH
    </h1>

    <div className="mt-4 text-xl md:text-2xl text-slate-600 h-10">
      <Typewriter text="> Embedded Systems & Drone Engineer" delay={80} />
    </div>

    <p className="mt-6 max-w-xl text-slate-500 font-medium text-lg reveal delay-100">
      Bridging the gap between hardware and software. Building robust autonomous systems,
      telemetry dashboards, and intelligent IoT devices.
    </p>

    <div className="flex gap-6 mt-10 reveal delay-200">
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="p-3 rounded-lg border border-slate-300 hover:border-cyan-500 hover:text-cyan-600 hover:shadow-[0_0_15px_rgba(0,136,255,0.2)] transition-all bg-slate-50/50 backdrop-blur-sm text-slate-700"
      >
        <Github size={24} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="p-3 rounded-lg border border-slate-300 hover:border-cyan-500 hover:text-cyan-600 hover:shadow-[0_0_15px_rgba(0,136,255,0.2)] transition-all bg-slate-50/50 backdrop-blur-sm text-slate-700"
      >
        <Linkedin size={24} />
      </a>
      <a
        href="mailto:contact@example.com"
        className="p-3 rounded-lg border border-slate-300 hover:border-cyan-500 hover:text-cyan-600 hover:shadow-[0_0_15px_rgba(0,136,255,0.2)] transition-all bg-slate-50/50 backdrop-blur-sm text-slate-700"
      >
        <Mail size={24} />
      </a>
    </div>

    <div className="absolute bottom-10 animate-bounce text-cyan-600/50 hidden md:block">
      <ChevronDown size={32} />
    </div>
  </section>
);

export default Hero;
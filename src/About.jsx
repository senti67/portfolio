import { Terminal, Database } from "lucide-react";
import { skills } from "../data";

const About = () => (
  <section id="about" className="py-24 px-6 max-w-5xl mx-auto relative">
    <div className="flex items-center gap-4 mb-12 reveal">
      <div className="h-px bg-cyan-200 flex-grow" />
      <h2 className="text-3xl md:text-4xl mono text-slate-900 font-bold tracking-widest">
        <span className="text-cyan-600">01.</span> // ABOUT_ME
      </h2>
      <div className="h-px bg-cyan-200 flex-grow" />
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="glass-panel cyber-corners p-8 reveal delay-100 border-slate-200">
        <div className="flex items-center gap-3 mb-4 text-cyan-700 border-b border-cyan-100 pb-4">
          <Terminal size={20} />
          <span className="mono font-semibold">USER_PROFILE.txt</span>
        </div>
        <p className="text-slate-600 leading-relaxed text-lg mb-6 font-medium">
          I build embedded systems, autonomous drone technologies, and IoT platforms. My work heavily
          focuses on hardware-software integration, telemetry pipelines, and constructing digital twin
          architectures for autonomous UAVs.
        </p>
        <p className="text-slate-500 leading-relaxed">
          Whether it's designing custom PCBs, writing low-level C for microcontrollers, or developing
          high-level ROS nodes for path planning, I thrive at the intersection of bits and atoms.
        </p>
      </div>

      <div className="reveal delay-200">
        <h3 className="mono text-purple-600 mb-6 flex items-center gap-2 font-bold">
          <Database size={20} /> [CORE_COMPETENCIES]
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-md bg-cyan-50 border border-cyan-200 hover:border-cyan-400 hover:bg-cyan-100 transition-colors group cursor-default"
            >
              <span className="text-cyan-600 group-hover:text-cyan-700 transition-colors">{skill.icon}</span>
              <span className="mono text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
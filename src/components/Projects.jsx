import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data";

const Projects = () => (
  <section id="projects" className="py-24 px-6 max-w-6xl mx-auto relative">
    <div className="flex items-center gap-4 mb-16 reveal">
      <div className="h-px bg-purple-200 flex-grow" />
      <h2 className="text-3xl md:text-4xl mono text-slate-900 font-bold tracking-widest">
        <span className="text-cyan-600">02. // INITIATIVES </span>
      </h2>
      <div className="h-px bg-purple-200 flex-grow" />
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p, i) => (
        <div
          key={i}
          className={`glass-panel cyber-corners p-6 flex flex-col h-full reveal delay-${(i % 3 + 1) * 100} group interactive border-slate-200`}
        >
          <div className="flex justify-between items-start mb-4">
            {p.icon}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 border border-green-300 rounded text-[10px] mono text-green-700 font-bold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {p.status}
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
            {p.title}
          </h3>

          <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed font-medium">
            {p.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              {p.tech.map((t, index) => (
                <span
                  key={index}
                  className="text-xs font-bold mono bg-cyan-100 border border-cyan-300 text-cyan-700 px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
              <a
                href={p.github}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-600 transition-colors mono font-bold"
              >
                <Github size={16} /> View Source
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-600 transition-colors">
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
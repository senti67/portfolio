import { Mail, Github, Linkedin, Crosshair } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-32 px-6 max-w-4xl mx-auto text-center relative reveal">
    <div className="glass-panel p-12 md:p-16 border-purple-200 cyber-corners relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(157,0,214,0.05)_0,transparent_70%)] pointer-events-none" />

      <h2 className="text-3xl md:text-5xl mono font-bold text-slate-900 mb-6">
        <span className="text-cyan-600">03.</span> // TRANSMIT_SIGNAL
      </h2>

      <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
        Currently open for new opportunities. Whether you have a question regarding embedded systems
        or just want to establish a secure connection, my inbox is always open.
      </p>

      <a
        href="mailto:contact@example.com"
        className="interactive inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-600 font-bold mono text-lg hover:bg-cyan-50 hover:shadow-[0_0_20px_rgba(0,136,255,0.3)] transition-all rounded"
      >
        <Mail size={20} />
        INITIATE HANDSHAKE
      </a>

      <div className="flex justify-center gap-8 mt-16">
        <a href="#" className="interactive text-slate-500 hover:text-cyan-600 hover:scale-110 transition-all"><Github size={28} /></a>
        <a href="#" className="interactive text-slate-500 hover:text-cyan-600 hover:scale-110 transition-all"><Linkedin size={28} /></a>
        <a href="#" className="interactive text-slate-500 hover:text-cyan-600 hover:scale-110 transition-all"><Crosshair size={28} /></a>
      </div>
    </div>
  </section>
);

export default Contact;
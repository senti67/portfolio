import { useEffect, useRef } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = Math.random() * 2 + 0.5;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.8 ? "#9d00d6" : "#0088ff";
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        if (mouse.x != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const fx = dx / distance;
            const fy = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= fx * force * 3;
            this.y -= fy * force * 3;
          } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 50;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 50;
          }
        }

        this.x += this.dx;
        this.y += this.dy;
        this.baseX += this.dx;
        this.baseY += this.dy;
        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = dx * dx + dy * dy;
          if (dist < 12000) {
            const opacity = 1 - dist / 12000;
            ctx.strokeStyle =
              particles[a].color === "#9d00d6"
                ? `rgba(157, 0, 214, ${opacity * 0.3})`
                : `rgba(0, 136, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

export default ParticleNetwork;
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { Card } from './ui/card';

const Projects = ({ data }) => {
  const projectsRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = projectsRef.current?.querySelectorAll('.fade-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden" ref={projectsRef}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
            <Code2 className="text-[#00ff88]" size={20} />
            <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Portfolio ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-['Orbitron']">
            <span className="text-white">Proyectos </span>
            <span className="bg-gradient-to-r from-[#00ff88] to-[#0080ff] bg-clip-text text-transparent">Destacados</span>
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 md:w-12 h-1 bg-[#00ff88]"></div>
            <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff]"></div>
            <div className="w-2 h-2 bg-[#0080ff] rotate-45"></div>
            <div className="w-8 md:w-12 h-1 bg-[#0080ff]"></div>
          </div>
          <p className="text-gray-400 mt-6 md:mt-8 text-base md:text-lg max-w-2xl mx-auto px-4">
            Soluciones tecnológicas de alto impacto y rendimiento
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((project, index) => (
            <div
              key={project.id}
              className="fade-item opacity-0 group relative"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Glow effect */}
              <div 
                className={`absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`}
                style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)` }}
              ></div>
              
              <Card className="relative bg-[#0a0a0a] border-2 border-[#00ff88]/20 overflow-hidden transition-all duration-500 group-hover:border-[#00ff88] h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent"></div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <ExternalLink className="text-[#00ff88] mx-auto" size={28} />
                      <p className="text-white text-xs md:text-sm uppercase tracking-wider font-['Orbitron']">Ver Detalles</p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 bg-black/80 border border-[#00ff88]/50 backdrop-blur-sm">
                    <span className="text-[#00ff88] text-xs font-medium uppercase tracking-wider font-['Orbitron']">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-['Orbitron'] group-hover:text-[#00ff88] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 md:px-3 py-1 md:py-1.5 bg-black border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88] transition-all duration-300 font-['Rajdhani'] font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech corners */}
                <div className="absolute top-0 left-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-l-2 border-[#00ff88] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-r-2 border-[#0080ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-l-2 border-[#0080ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-r-2 border-[#00ff88] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
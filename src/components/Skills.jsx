import React, { useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';

const Skills = ({ data }) => {
  const skillsRef = useRef(null);

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

    const elements = skillsRef.current?.querySelectorAll('.fade-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="habilidades" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative" ref={skillsRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-[#00ff88] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-56 md:w-80 h-56 md:h-80 bg-[#0080ff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-block mb-4 md:mb-6">
            <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Competencias ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-['Orbitron']">
            <span className="text-white">Habilidades </span>
            <span className="bg-gradient-to-r from-[#00ff88] to-[#0080ff] bg-clip-text text-transparent">Técnicas</span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Technical Skills */}
          <div className="fade-item opacity-0">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-['Orbitron']">
                Habilidades <span className="text-[#00ff88]">Técnicas</span>
              </h3>
              <div className="w-16 h-1 bg-[#00ff88]"></div>
            </div>

            <div className="space-y-6">
              {data.technical.map((skill, index) => {
                const Icon = LucideIcons[skill.icon];
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {Icon && <Icon className="text-[#00ff88]" size={20} />}
                        </div>
                        <span className="text-white font-['Rajdhani'] font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-[#00ff88] font-['Orbitron'] font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative h-2 bg-[#0a0a0a] border border-[#00ff88]/20 overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff88] to-[#00d170] transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div className="fade-item opacity-0">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-['Orbitron']">
                <span className="text-[#00ff88]">Idiomas</span>
              </h3>
              <div className="w-16 h-1 bg-[#00ff88]"></div>
            </div>

            <div className="space-y-8">
              {data.languages.map((language, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative bg-[#0a0a0a] border-2 border-[#00ff88]/20 p-6 group-hover:border-[#00ff88] transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">{language.flag}</span>
                        <span className="text-white font-['Rajdhani'] font-semibold text-xl">{language.name}</span>
                      </div>
                      <span className="text-[#00ff88] font-['Orbitron'] font-bold text-lg">{language.level}%</span>
                    </div>
                    <div className="relative h-3 bg-black border border-[#00ff88]/30 overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff88] via-[#00d170] to-[#0080ff] transition-all duration-1000 ease-out"
                        style={{ width: `${language.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00ff88]/50"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0080ff]/50"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-[#0a0a0a] border border-[#00ff88]/20">
              <h4 className="text-lg font-bold text-[#00ff88] mb-3 font-['Orbitron']">Información Adicional</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
                  <span>Fecha de nacimiento: 03/09/2006</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
                  <span>Ubicación: Madrid, España</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
                  <span>Dispuesto a trabajar en vacaciones y realizar prácticas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

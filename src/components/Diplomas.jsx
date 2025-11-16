import React, { useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Card } from './ui/card';

const Diplomas = ({ data }) => {
  const diplomasRef = useRef(null);

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

    const elements = diplomasRef.current?.querySelectorAll('.fade-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="diplomas" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-[#001a0d] to-black relative" ref={diplomasRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 md:top-40 right-20 md:right-40 w-64 md:w-96 h-64 md:h-96 bg-[#00ff88] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 md:bottom-40 left-20 md:left-40 w-56 md:w-80 h-56 md:h-80 bg-[#0080ff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-block mb-4 md:mb-6">
            <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Certificaciones ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-['Orbitron']">
            <span className="text-white">Credenciales y </span>
            <span className="bg-gradient-to-r from-[#00ff88] to-[#0080ff] bg-clip-text text-transparent">Diplomas</span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto mb-6 md:mb-8"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            Certificaciones profesionales de las principales organizaciones tecnológicas
          </p>
        </div>

        {/* Diplomas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.map((diploma, index) => {
            const Icon = LucideIcons[diploma.icon];
            return (
              <div
                key={diploma.id}
                className="fade-item opacity-0 group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
                
                <Card className="relative bg-[#0a0a0a] border-2 border-[#00ff88]/20 p-6 md:p-8 h-full transition-all duration-500 group-hover:border-[#00ff88] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    {/* Icon */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border-2 border-[#00ff88]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00ff88] transition-all duration-300">
                        {Icon && <Icon className="text-[#00ff88]" size={28} strokeWidth={2} />}
                      </div>
                      <div className="text-right">
                        <span className="text-xl md:text-2xl font-bold text-[#00ff88] font-['Orbitron']">{diploma.year}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-['Orbitron'] leading-tight group-hover:text-[#00ff88] transition-colors">
                        {diploma.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-['Rajdhani'] font-medium">
                        {diploma.institution}
                      </p>
                    </div>
                    
                    {/* Tech line decoration */}
                    <div className="flex items-center space-x-2">
                      <div className="w-6 md:w-8 h-0.5 bg-[#00ff88]"></div>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#00ff88] to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 w-3 md:w-4 h-3 md:h-4 border-t-2 border-r-2 border-[#00ff88]/50 group-hover:border-[#00ff88] transition-colors"></div>
                  <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-3 md:w-4 h-3 md:h-4 border-b-2 border-l-2 border-[#0080ff]/50 group-hover:border-[#0080ff] transition-colors"></div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Diplomas;
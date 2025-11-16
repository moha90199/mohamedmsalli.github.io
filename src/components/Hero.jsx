import React, { useEffect, useRef } from 'react';
import { ChevronDown, Terminal } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const heroRef = useRef(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
      {/* Animated Grid Background */}
      <div className="grid-background"></div>
      <div className="scanline"></div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#001a0d] to-black"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#00ff88]/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#0080ff]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 opacity-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 backdrop-blur-sm mx-auto lg:mx-0">
              <Terminal className="text-[#00ff88]" size={16} />
              <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-wider uppercase font-['Orbitron']">
                {data.title}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-['Orbitron']">
              <span className="text-white">Soy </span>
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00d170] to-[#0080ff] bg-clip-text text-transparent neon-glow gradient-animate">
                {data.name}
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-xl sm:text-2xl md:text-3xl text-[#00ff88] font-semibold font-['Rajdhani']">
                {data.subtitle}
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {data.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              <Button
                onClick={scrollToProjects}
                className="bg-gradient-to-r from-[#00ff88] to-[#00d170] hover:from-[#00d170] hover:to-[#0ade7c] text-black px-6 md:px-8 py-6 md:py-7 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] btn-press font-['Orbitron'] w-full sm:w-auto"
              >
                {data.cta}
              </Button>
              <Button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-2 border-[#0080ff] text-[#0080ff] hover:bg-[#0080ff]/10 hover:border-[#00a3ff] px-6 md:px-8 py-6 md:py-7 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,128,255,0.3)] btn-press font-['Orbitron'] w-full sm:w-auto"
              >
                Contáctame
              </Button>
            </div>
            
            {/* Tech Stats - Solo mostrar si showStats es true */}
            {data.showStats && (
              <div className="grid grid-cols-3 gap-3 md:gap-4 pt-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center p-3 md:p-4 bg-black/50 border border-[#00ff88]/20 backdrop-blur-sm cyber-border">
                  <div className="text-2xl md:text-3xl font-bold text-[#00ff88] font-['Orbitron']">7+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Años</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-black/50 border border-[#0080ff]/20 backdrop-blur-sm cyber-border">
                  <div className="text-2xl md:text-3xl font-bold text-[#0080ff] font-['Orbitron']">50+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Proyectos</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-black/50 border border-[#00d170]/20 backdrop-blur-sm cyber-border">
                  <div className="text-2xl md:text-3xl font-bold text-[#00d170] font-['Orbitron']">30+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Clientes</div>
                </div>
              </div>
            )}
          </div>

          {/* Image with Tech Frame */}
          <div className="relative group order-first lg:order-last">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88] via-[#0080ff] to-[#00d170] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="absolute -top-2 md:-top-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 border-l-4 border-t-4 border-[#00ff88]"></div>
              <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 border-r-4 border-t-4 border-[#0080ff]"></div>
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 border-l-4 border-b-4 border-[#00d170]"></div>
              <div className="absolute -bottom-2 md:-bottom-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 border-r-4 border-b-4 border-[#00ff88]"></div>
              
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden border-2 border-[#00ff88]/30">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-[#00ff88]/10 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce">
          <ChevronDown className="text-[#00ff88]" size={32} />
          <span className="text-xs text-[#00ff88] uppercase tracking-wider mt-2 font-['Orbitron']">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
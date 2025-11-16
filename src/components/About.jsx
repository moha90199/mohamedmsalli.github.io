import React, { useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';

const About = ({ data }) => {
  const aboutRef = useRef(null);

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

    const elements = aboutRef.current?.querySelectorAll('.fade-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre-mi" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative" ref={aboutRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-[#00ff88] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-[#0080ff] rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-block mb-4">
            <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Conoce más ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Orbitron']">
            <span className="bg-gradient-to-r from-white via-[#00ff88] to-white bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
          {/* Image with Tech Frame */}
          <div className="fade-item opacity-0 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative border-2 border-[#00ff88]/30 overflow-hidden cyber-border">
                <img
                  src={data.image}
                  alt="Sobre mí"
                  className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[#00ff88]/5 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-6 fade-item opacity-0 order-1 lg:order-2">
            <div className="border-l-4 border-[#00ff88] pl-4 md:pl-6 py-2 bg-[#00ff88]/5">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-['Rajdhani'] font-semibold">
                {data.description}
              </p>
            </div>
            {data.story.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-gray-400 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.values.map((value, index) => {
            const Icon = LucideIcons[value.icon];
            return (
              <div
                key={index}
                className="fade-item opacity-0 group relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                <div className="relative bg-[#0a0a0a] border border-[#00ff88]/20 p-6 md:p-8 h-full transition-all duration-300 group-hover:border-[#00ff88] cyber-border">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {Icon && <Icon className="text-[#00ff88]" size={24} strokeWidth={2.5} />}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-['Orbitron'] group-hover:text-[#00ff88] transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Tech corner accents */}
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00ff88]/50"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0080ff]/50"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';

// ============================================================================
// COMPONENTES UI BASE (Button, Card, Input, Textarea)
// ============================================================================

const Button = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  };
  return <button ref={ref} className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;
});

const Card = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props} />
));

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => (
  <input type={type} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />
));

const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} />
));

// Hook para toast notifications
const toastState = { toasts: [] };
const listeners = [];

export const useToast = () => {
  const [, forceUpdate] = useState();
  
  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const toast = ({ title, description }) => {
    const id = Date.now();
    toastState.toasts.push({ id, title, description });
    listeners.forEach(listener => listener());
    setTimeout(() => {
      toastState.toasts = toastState.toasts.filter(t => t.id !== id);
      listeners.forEach(listener => listener());
    }, 3000);
  };

  return { toast, toasts: toastState.toasts };
};

export const Toaster = () => {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map(({ id, title, description }) => (
        <div key={id} className="group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-[#00ff88]/30 bg-[#0a0a0a] p-6 pr-8 shadow-lg transition-all mb-4">
          <div className="grid gap-1">
            {title && <div className="text-sm font-semibold text-[#00ff88]">{title}</div>}
            {description && <div className="text-sm text-gray-400">{description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// COMPONENTE: NAVIGATION
// ============================================================================

export const Navigation = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Sobre mí', href: '#sobre-mi' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Diplomas', href: '#diplomas' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-[#00ff88]/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#inicio" onClick={(e) => scrollToSection(e, '#inicio')} className="text-2xl font-bold text-[#00ff88] hover:text-[#00d170] transition-all duration-300 font-['Orbitron'] tracking-wider neon-glow">
            &lt;MMO/&gt;
          </a>

          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="relative px-4 py-2 text-gray-300 hover:text-[#00ff88] transition-all duration-300 text-sm font-medium uppercase tracking-wider group">
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-[#00ff88]/0 group-hover:bg-[#00ff88]/10 transition-all duration-300"></span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#00ff88] hover:text-[#00d170] transition-colors p-2 border border-[#00ff88]/30 hover:border-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]" aria-label="Toggle menu">
            {mobileMenuOpen ? <LucideIcons.X size={24} /> : <LucideIcons.Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00ff88]/20">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="block text-gray-300 hover:text-[#00ff88] transition-all duration-300 py-3 px-4 border-l-2 border-transparent hover:border-[#00ff88] hover:bg-[#00ff88]/5 uppercase tracking-wider">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// ============================================================================
// COMPONENTE: HERO
// ============================================================================

export const Hero = ({ data }) => {
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
      <div className="grid-background"></div>
      <div className="scanline"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#001a0d] to-black"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#00ff88]/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#0080ff]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 opacity-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 backdrop-blur-sm mx-auto lg:mx-0">
              <LucideIcons.Terminal className="text-[#00ff88]" size={16} />
              <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-wider uppercase font-['Orbitron']">
                {data.title}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-['Orbitron']">
              <span className="text-white">Soy</span>
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
              <Button onClick={scrollToProjects} className="bg-gradient-to-r from-[#00ff88] to-[#00d170] hover:from-[#00d170] hover:to-[#0ade7c] text-black px-6 md:px-8 py-6 md:py-7 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] btn-press font-['Orbitron'] w-full sm:w-auto">
                {data.cta}
              </Button>
              <Button onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" className="border-2 border-[#0080ff] text-[#0080ff] hover:bg-[#0080ff]/10 hover:border-[#00a3ff] px-6 md:px-8 py-6 md:py-7 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,128,255,0.3)] btn-press font-['Orbitron'] w-full sm:w-auto">
                Contáctame
              </Button>
            </div>
          </div>

          <div className="relative group order-first lg:order-last">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88] via-[#0080ff] to-[#00d170] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="absolute -top-2 md:-top-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 border-l-4 border-t-4 border-[#00ff88]"></div>
              <div className="absolute -top-2 md:-top-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 border-r-4 border-t-4 border-[#0080ff]"></div>
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-4 md:w-6 h-4 md:h-6 border-l-4 border-b-4 border-[#00d170]"></div>
              <div className="absolute -bottom-2 md:-bottom-3 -right-2 md:-right-3 w-4 md:w-6 h-4 md:h-6 border-r-4 border-b-4 border-[#00ff88]"></div>
              
              <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] overflow-hidden border-2 border-[#00ff88]/30">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-[#00ff88]/10 mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex-col items-center animate-bounce">
          <LucideIcons.ChevronDown className="text-[#00ff88]" size={32} />
          <span className="text-xs text-[#00ff88] uppercase tracking-wider mt-2 font-['Orbitron']">Scroll</span>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENTE: ABOUT
// ============================================================================

export const About = ({ data }) => {
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 md:left-20 w-48 md:w-72 h-48 md:h-72 bg-[#00ff88] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-20 right-10 md:right-20 w-64 md:w-96 h-64 md:h-96 bg-[#0080ff] rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="fade-item opacity-0 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative border-2 border-[#00ff88]/30 overflow-hidden cyber-border">
                <img src={data.image} alt="Sobre mí" className="w-full h-[350px] md:h-[450px] lg:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[#00ff88]/5 mix-blend-overlay"></div>
              </div>
            </div>
          </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.values.map((value, index) => {
            const Icon = LucideIcons[value.icon];
            return (
              <div key={index} className="fade-item opacity-0 group relative" style={{ transitionDelay: `${index * 100}ms` }}>
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

// ============================================================================
// COMPONENTE: PROJECTS
// ============================================================================

export const Projects = ({ data }) => {
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
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
            <LucideIcons.Code2 className="text-[#00ff88]" size={20} />
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
            Experiencia práctica en entornos profesionales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.map((project, index) => (
            <div key={project.id} className="fade-item opacity-0 group relative" style={{ transitionDelay: `${index * 100}ms` }} onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)}>
              <div className={`absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)` }}></div>
              
              <Card className="relative bg-[#0a0a0a] border-2 border-[#00ff88]/20 overflow-hidden transition-all duration-500 group-hover:border-[#00ff88] h-full flex flex-col">
                <div className="relative h-48 md:h-52 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent"></div>
                  
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <LucideIcons.ExternalLink className="text-[#00ff88] mx-auto" size={28} />
                      <p className="text-white text-xs md:text-sm uppercase tracking-wider font-['Orbitron']">Ver Detalles</p>
                    </div>
                  </div>

                  <div className="absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 bg-black/80 border border-[#00ff88]/50 backdrop-blur-sm">
                    <span className="text-[#00ff88] text-xs font-medium uppercase tracking-wider font-['Orbitron']">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-['Orbitron'] group-hover:text-[#00ff88] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-6 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs px-2 md:px-3 py-1 md:py-1.5 bg-black border border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88] transition-all duration-300 font-['Rajdhani'] font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

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

// ============================================================================
// COMPONENTE: SKILLS
// ============================================================================

export const Skills = ({ data }) => {
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-[#00ff88] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-56 md:w-80 h-56 md:h-80 bg-[#0080ff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff88] to-[#00d170] transition-all duration-1000 ease-out" style={{ width: `${skill.level}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

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
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00ff88] via-[#00d170] to-[#0080ff] transition-all duration-1000 ease-out" style={{ width: `${language.level}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00ff88]/50"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#0080ff]/50"></div>
                  </div>
                </div>
              ))}
            </div>

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

// ============================================================================
// COMPONENTE: DIPLOMAS
// ============================================================================

export const Diplomas = ({ data }) => {
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
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 md:top-40 right-20 md:right-40 w-64 md:w-96 h-64 md:h-96 bg-[#00ff88] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 md:bottom-40 left-20 md:left-40 w-56 md:w-80 h-56 md:h-80 bg-[#0080ff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            Formación profesional y experiencia práctica
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.map((diploma, index) => {
            const Icon = LucideIcons[diploma.icon];
            return (
              <div key={diploma.id} className="fade-item opacity-0 group relative" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
                
                <Card className="relative bg-[#0a0a0a] border-2 border-[#00ff88]/20 p-6 md:p-8 h-full transition-all duration-500 group-hover:border-[#00ff88] group-hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border-2 border-[#00ff88]/40 flex items-center justify-center group-hover:scale-110 group-hover:border-[#00ff88] transition-all duration-300">
                        {Icon && <Icon className="text-[#00ff88]" size={28} strokeWidth={2} />}
                      </div>
                      <div className="text-right">
                        <span className="text-xl md:text-2xl font-bold text-[#00ff88] font-['Orbitron']">{diploma.year}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-['Orbitron'] leading-tight group-hover:text-[#00ff88] transition-colors">
                        {diploma.title}
                      </h3>
                      <p className="text-gray-400 text-sm font-['Rajdhani'] font-medium">
                        {diploma.institution}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-6 md:w-8 h-0.5 bg-[#00ff88]"></div>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#00ff88] to-transparent"></div>
                    </div>
                  </div>
                  
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

// ============================================================================
// COMPONENTE: CONTACT
// ============================================================================

export const Contact = ({ data }) => {
  const contactRef = useRef(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

    const elements = contactRef.current?.querySelectorAll('.fade-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "¡Mensaje enviado con éxito!",
      description: "Gracias por contactarme. Te responderé lo antes posible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contacto" className="py-16 md:py-24 lg:py-32 bg-black relative overflow-hidden" ref={contactRef}>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-[#00ff88]/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,128,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 fade-item opacity-0">
          <div className="inline-flex items-center space-x-2 mb-4 md:mb-6">
            <LucideIcons.MessageSquare className="text-[#00ff88]" size={20} />
            <span className="text-[#00ff88] text-xs md:text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Contacto ]</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-['Orbitron']">
            <span className="bg-gradient-to-r from-white via-[#00ff88] to-white bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-6 md:mb-8">
            <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
            <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff]"></div>
            <div className="w-2 h-2 bg-[#0080ff] rotate-45"></div>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto px-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8 fade-item opacity-0">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-3xl font-bold text-white mb-8 font-['Orbitron']">
                Información de <span className="text-[#00ff88]">Contacto</span>
              </h3>
              
              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border border-[#00ff88]/20 group-hover:border-[#00ff88] transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center flex-shrink-0">
                      <LucideIcons.Mail className="text-[#00ff88]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-['Orbitron']">Email</p>
                      <a href={`mailto:${data.email}`} className="text-white hover:text-[#00ff88] transition-colors font-['Rajdhani'] text-lg font-semibold">
                        {data.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border border-[#00ff88]/20 group-hover:border-[#00ff88] transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center flex-shrink-0">
                      <LucideIcons.Phone className="text-[#00ff88]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-['Orbitron']">Teléfono</p>
                      <a href={`tel:${data.phone}`} className="text-white hover:text-[#00ff88] transition-colors font-['Rajdhani'] text-lg font-semibold">
                        {data.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border border-[#00ff88]/20 group-hover:border-[#00ff88] transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center flex-shrink-0">
                      <LucideIcons.MapPin className="text-[#00ff88]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-['Orbitron']">Ubicación</p>
                      <p className="text-white font-['Rajdhani'] text-lg font-semibold">{data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8">
              <h3 className="text-xl font-semibold mb-6 font-['Orbitron'] text-white">
                Redes <span className="text-[#00ff88]">Sociales</span>
              </h3>
              <div className="space-y-4">
                {data.social.map((social, index) => {
                  const Icon = LucideIcons[social.icon];
                  
                  if (social.text) {
                    return (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="group relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border-2 border-[#00ff88]/30 hover:border-[#00ff88] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          {Icon && <Icon className="text-[#00ff88]" size={24} />}
                        </div>
                        <div>
                          <p className="text-white font-['Rajdhani'] font-semibold text-lg">{social.name}</p>
                          <p className="text-[#00ff88] text-sm font-['Orbitron']">{social.text}</p>
                        </div>
                      </a>
                    );
                  }
                  
                  return (
                    <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-block group relative w-14 h-14 bg-[#0a0a0a] border-2 border-[#00ff88]/30 hover:border-[#00ff88] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] mr-4" aria-label={social.name}>
                      <div className="w-full h-full flex items-center justify-center">
                        {Icon && <Icon className="text-gray-400 group-hover:text-[#00ff88] transition-colors" size={22} />}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="fade-item opacity-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00ff88]/10 to-[#0080ff]/10 blur-2xl"></div>
              <form onSubmit={handleSubmit} className="relative space-y-6 bg-[#0a0a0a] border-2 border-[#00ff88]/30 p-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Nombre
                  </label>
                  <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Asunto
                  </label>
                  <Input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleChange} className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']" placeholder="Asunto del mensaje" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Mensaje
                  </label>
                  <Textarea id="message" name="message" rows={6} required value={formData.message} onChange={handleChange} className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] font-['Rajdhani']" placeholder="Escribe tu mensaje aquí..." />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-[#00ff88] to-[#00d170] hover:from-[#00d170] hover:to-[#0ade7c] text-black py-7 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] btn-press font-['Orbitron'] font-bold text-base uppercase tracking-wider">
                  <LucideIcons.Send size={20} className="mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENTE: FOOTER
// ============================================================================

export const Footer = ({ data }) => {
  return (
    <footer className="bg-black border-t-2 border-[#00ff88]/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center">
              <LucideIcons.Terminal className="text-[#00ff88]" size={20} />
            </div>
            <div>
              <div className="text-[#00ff88] text-sm font-['Orbitron'] font-bold">&lt;MMO/&gt;</div>
              <div className="text-gray-500 text-xs font-['Rajdhani']">
                {data.copyright}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {data.legal.map((item, index) => (
              <React.Fragment key={index}>
                <a href={item.link} className="text-gray-500 hover:text-[#00ff88] text-sm transition-all duration-300 px-4 py-2 hover:bg-[#00ff88]/5 font-['Rajdhani']">
                  {item.text}
                </a>
                {index < data.legal.length - 1 && (
                  <span className="text-[#00ff88]/30">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00ff88]"></div>
          <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
          <div className="w-24 h-px bg-[#00ff88]"></div>
          <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#00ff88]"></div>
        </div>
      </div>
    </footer>
  );
};

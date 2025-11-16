import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = ({ scrolled }) => {
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-[#00ff88]/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="text-2xl font-bold text-[#00ff88] hover:text-[#00d170] transition-all duration-300 font-['Orbitron'] tracking-wider neon-glow"
          >
            &lt;MMO/&gt;
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative px-4 py-2 text-gray-300 hover:text-[#00ff88] transition-all duration-300 text-sm font-medium uppercase tracking-wider group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-[#00ff88]/0 group-hover:bg-[#00ff88]/10 transition-all duration-300"></span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#00ff88] hover:text-[#00d170] transition-colors p-2 border border-[#00ff88]/30 hover:border-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00ff88]/20">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block text-gray-300 hover:text-[#00ff88] transition-all duration-300 py-3 px-4 border-l-2 border-transparent hover:border-[#00ff88] hover:bg-[#00ff88]/5 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
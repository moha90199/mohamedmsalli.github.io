import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = ({ data }) => {
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
    <section id="contacto" className="py-32 bg-black relative overflow-hidden" ref={contactRef}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-[#00ff88]/5 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,128,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-20 fade-item opacity-0">
          <div className="inline-flex items-center space-x-2 mb-6">
            <MessageSquare className="text-[#00ff88]" size={24} />
            <span className="text-[#00ff88] text-sm font-medium tracking-[0.3em] uppercase font-['Orbitron']">[ Contacto ]</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-['Orbitron']">
            <span className="bg-gradient-to-r from-white via-[#00ff88] to-white bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-2 h-2 bg-[#00ff88] rotate-45"></div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#00ff88] to-[#0080ff]"></div>
            <div className="w-2 h-2 bg-[#0080ff] rotate-45"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 fade-item opacity-0">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-8 font-['Orbitron']">
                Información de <span className="text-[#00ff88]">Contacto</span>
              </h3>
              
              {/* Contact items */}
              <div className="space-y-4">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88] to-[#0080ff] opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  <div className="relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border border-[#00ff88]/20 group-hover:border-[#00ff88] transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#00ff88]" size={24} />
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
                      <Phone className="text-[#00ff88]" size={24} />
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
                      <MapPin className="text-[#00ff88]" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-['Orbitron']">Ubicación</p>
                      <p className="text-white font-['Rajdhani'] text-lg font-semibold">{data.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h3 className="text-xl font-semibold mb-6 font-['Orbitron'] text-white">
                Redes <span className="text-[#00ff88]">Sociales</span>
              </h3>
              <div className="space-y-4">
                {data.social.map((social, index) => {
                  const Icon = LucideIcons[social.icon];
                  
                  // Si tiene texto personalizado, mostrar como botón con texto
                  if (social.text) {
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center space-x-4 p-4 bg-[#0a0a0a] border-2 border-[#00ff88]/30 hover:border-[#00ff88] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                      >
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
                  
                  // Si no tiene texto, mostrar como icono simple
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group relative w-14 h-14 bg-[#0a0a0a] border-2 border-[#00ff88]/30 hover:border-[#00ff88] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] mr-4"
                      aria-label={social.name}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {Icon && <Icon className="text-gray-400 group-hover:text-[#00ff88] transition-colors" size={22} />}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-item opacity-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00ff88]/10 to-[#0080ff]/10 blur-2xl"></div>
              <form onSubmit={handleSubmit} className="relative space-y-6 bg-[#0a0a0a] border-2 border-[#00ff88]/30 p-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] h-12 font-['Rajdhani']"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#00ff88] mb-2 uppercase tracking-wider font-['Orbitron']">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-black border-[#00ff88]/30 text-white placeholder-gray-600 focus:border-[#00ff88] focus:ring-[#00ff88] font-['Rajdhani']"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00ff88] to-[#00d170] hover:from-[#00d170] hover:to-[#0ade7c] text-black py-7 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] btn-press font-['Orbitron'] font-bold text-base uppercase tracking-wider"
                >
                  <Send size={20} className="mr-2" />
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

export default Contact;
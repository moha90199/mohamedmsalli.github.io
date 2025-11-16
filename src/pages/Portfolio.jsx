import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Diplomas from '../components/Diplomas';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { portfolioData } from '../mock';

const Portfolio = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation scrolled={scrolled} />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Projects data={portfolioData.projects} />
      <Skills data={portfolioData.skills} />
      <Diplomas data={portfolioData.diplomas} />
      <Contact data={portfolioData.contact} />
      <Footer data={portfolioData.footer} />
    </div>
  );
};

export default Portfolio;
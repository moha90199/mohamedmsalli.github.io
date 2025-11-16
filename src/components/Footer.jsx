import React from 'react';
import { Terminal } from 'lucide-react';

const Footer = ({ data }) => {
  return (
    <footer className="bg-black border-t-2 border-[#00ff88]/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo & Copyright */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88]/20 to-[#0080ff]/20 border border-[#00ff88]/40 flex items-center justify-center">
              <Terminal className="text-[#00ff88]" size={20} />
            </div>
            <div>
              <div className="text-[#00ff88] text-sm font-['Orbitron'] font-bold">&lt;MMO/&gt;</div>
              <div className="text-gray-500 text-xs font-['Rajdhani']">
                {data.copyright}
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-1">
            {data.legal.map((item, index) => (
              <React.Fragment key={index}>
                <a
                  href={item.link}
                  className="text-gray-500 hover:text-[#00ff88] text-sm transition-all duration-300 px-4 py-2 hover:bg-[#00ff88]/5 font-['Rajdhani']"
                >
                  {item.text}
                </a>
                {index < data.legal.length - 1 && (
                  <span className="text-[#00ff88]/30">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Tech line */}
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

export default Footer;
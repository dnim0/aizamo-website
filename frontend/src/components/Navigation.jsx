import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'nav-scrolled' 
          : 'nav-transparent'
      }`}
      style={{ 
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.95)' 
          : 'rgba(236, 224, 209, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled 
          ? '1px solid rgba(150, 114, 89, 0.2)' 
          : '1px solid rgba(150, 114, 89, 0.1)'
      }}
    >
      {/* Subtle top accent line */}
      <div 
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, var(--medium-brown) 50%, transparent 100%)' 
        }}
      ></div>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Concept 1: Gradient Typography with Left-to-Right Highlight */}
          <div className="flex-shrink-0 group">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
              <h2 
                className="text-3xl font-bold transition-all duration-500 hover:opacity-90 relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #967259 0%, #634832 50%, #38220f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                AIzamo
                {/* Animated Dots - Flowing dotted pattern with continuous animation */}
                <div className="absolute bottom-0 left-0 w-full">
                  {/* Base dotted line - always visible */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                    style={{ 
                      background: `
                        repeating-linear-gradient(
                          90deg,
                          transparent 0px,
                          transparent 2px,
                          #967259 2px,
                          #967259 4px,
                          transparent 4px,
                          transparent 8px,
                          #634832 8px,
                          #634832 10px,
                          transparent 10px,
                          transparent 14px
                        )
                      `,
                      width: '100%',
                      opacity: '0.5',
                      backgroundSize: '20px 100%'
                    }}
                  ></div>
                  
                  {/* Flowing dots animation - enhanced on hover */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 opacity-30 group-hover:opacity-100"
                    style={{ 
                      background: `
                        repeating-linear-gradient(
                          90deg,
                          transparent 0px,
                          transparent 1px,
                          #967259 1px,
                          #967259 3px,
                          transparent 3px,
                          transparent 5px,
                          #ffd700 5px,
                          #ffd700 7px,
                          transparent 7px,
                          transparent 9px,
                          #634832 9px,
                          #634832 11px,
                          transparent 11px,
                          transparent 15px
                        )
                      `,
                      width: '100%',
                      backgroundSize: '24px 100%',
                      animation: 'flowingDots 2s linear infinite',
                      filter: 'drop-shadow(0 0 2px rgba(150, 114, 89, 0.4))'
                    }}
                  ></div>

                  {/* Additional flowing layer for depth */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 opacity-0 group-hover:opacity-60"
                    style={{ 
                      background: `
                        repeating-linear-gradient(
                          90deg,
                          transparent 0px,
                          transparent 3px,
                          rgba(150, 114, 89, 0.8) 3px,
                          rgba(150, 114, 89, 0.8) 5px,
                          transparent 5px,
                          transparent 10px
                        )
                      `,
                      width: '100%',
                      backgroundSize: '18px 100%',
                      animation: 'flowingDots 3s linear infinite reverse',
                      transform: 'translateY(-1px)'
                    }}
                  ></div>
                </div>
                
                {/* Additional glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(135deg, #967259 0%, #634832 50%, #38220f 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 8px rgba(150, 114, 89, 0.4))'
                  }}
                >
                  AIzamo
                </div>
              </h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Services', id: 'services' },
              { name: 'About', id: 'about' },
              { name: 'Reviews', id: 'testimonials' },
              { name: 'Process', id: 'roadmap' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-50 hover:backdrop-blur-md relative group"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"></div>
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-primary ml-4 relative overflow-hidden"
            >
              Contact Us
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300 transform -skew-x-12 animate-shimmer"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-30"
              style={{ color: 'var(--text-primary)' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden mobile-menu-slide-down"
            style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0 0 16px 16px',
              border: '1px solid rgba(150, 114, 89, 0.2)',
              boxShadow: '0 8px 32px rgba(150, 114, 89, 0.3)'
            }}
          >
            <div className="flex flex-col space-y-1 p-4">
              {[
                { name: 'Services', id: 'services' },
                { name: 'About', id: 'about' },
                { name: 'Reviews', id: 'testimonials' },
                { name: 'Process', id: 'roadmap' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-50 transition-all duration-300"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="btn btn-primary w-full mt-4"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
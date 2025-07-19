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
                {/* Neural Network - AI-themed neural nodes with pulsing connections */}
                <div className="absolute bottom-0 left-0 w-full">
                  {/* Base neural connection line - always visible */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                    style={{ 
                      background: 'linear-gradient(90deg, transparent 0%, rgba(150, 114, 89, 0.3) 10%, rgba(99, 72, 50, 0.6) 30%, rgba(150, 114, 89, 0.8) 50%, rgba(99, 72, 50, 0.6) 70%, rgba(150, 114, 89, 0.3) 90%, transparent 100%)',
                      width: '100%',
                      opacity: '0.6'
                    }}
                  ></div>
                  
                  {/* Neural nodes - always visible, enhanced on hover */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 opacity-50 group-hover:opacity-100"
                    style={{ 
                      background: `
                        radial-gradient(circle at 15% center, #967259 1.5px, rgba(150, 114, 89, 0.3) 2px, transparent 3px),
                        radial-gradient(circle at 35% center, #634832 1px, rgba(99, 72, 50, 0.4) 1.5px, transparent 2.5px),
                        radial-gradient(circle at 55% center, #967259 2px, rgba(150, 114, 89, 0.5) 2.5px, transparent 3.5px),
                        radial-gradient(circle at 75% center, #634832 1px, rgba(99, 72, 50, 0.4) 1.5px, transparent 2.5px),
                        radial-gradient(circle at 90% center, #38220f 1.5px, rgba(56, 34, 15, 0.3) 2px, transparent 3px)
                      `,
                      width: '100%',
                      animation: 'neuralPulse 2s ease-in-out infinite'
                    }}
                  ></div>

                  {/* Pulsing connections between nodes on hover */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 opacity-0 group-hover:opacity-80"
                    style={{ 
                      background: `
                        linear-gradient(90deg, 
                          transparent 0%,
                          transparent 13%,
                          rgba(150, 114, 89, 0.8) 15%,
                          rgba(150, 114, 89, 0.4) 17%,
                          transparent 18%,
                          transparent 33%,
                          rgba(99, 72, 50, 0.8) 35%,
                          rgba(99, 72, 50, 0.4) 37%,
                          transparent 38%,
                          transparent 53%,
                          rgba(150, 114, 89, 1) 55%,
                          rgba(150, 114, 89, 0.5) 57%,
                          transparent 58%,
                          transparent 73%,
                          rgba(99, 72, 50, 0.8) 75%,
                          rgba(99, 72, 50, 0.4) 77%,
                          transparent 78%,
                          transparent 88%,
                          rgba(56, 34, 15, 0.8) 90%,
                          rgba(56, 34, 15, 0.4) 92%,
                          transparent 93%,
                          transparent 100%
                        )
                      `,
                      width: '100%',
                      animation: 'neuralConnections 1.5s ease-in-out infinite alternate',
                      filter: 'drop-shadow(0 0 1px rgba(150, 114, 89, 0.5))'
                    }}
                  ></div>

                  {/* AI network glow on hover */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-500 opacity-0 group-hover:opacity-60 transform -translate-y-0.5"
                    style={{ 
                      background: 'radial-gradient(ellipse at 55% center, rgba(150, 114, 89, 0.4) 20%, rgba(99, 72, 50, 0.3) 40%, transparent 60%)',
                      width: '100%',
                      filter: 'blur(2px)',
                      animation: 'aiGlow 3s ease-in-out infinite alternate'
                    }}
                  ></div>

                  {/* Neural activity signals */}
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 opacity-0 group-hover:opacity-90"
                    style={{ 
                      background: `
                        radial-gradient(circle at 20% center, rgba(255, 215, 0, 0.8) 0.5px, transparent 1px),
                        radial-gradient(circle at 40% center, rgba(255, 215, 0, 0.6) 0.5px, transparent 1px),
                        radial-gradient(circle at 60% center, rgba(255, 215, 0, 1) 0.5px, transparent 1px),
                        radial-gradient(circle at 80% center, rgba(255, 215, 0, 0.7) 0.5px, transparent 1px)
                      `,
                      width: '100%',
                      animation: 'neuralSignals 1.8s linear infinite',
                      filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.4))'
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
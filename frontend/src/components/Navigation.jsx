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
          {/* Logo - Concept 4: Circuit Integration */}
          <div className="flex-shrink-0 group">
            <div className="flex items-center cursor-pointer relative" onClick={() => scrollToSection('hero')}>
              <h2 
                className="text-3xl font-bold transition-all duration-300 hover:opacity-80 relative"
                style={{ color: 'var(--darkest-brown)' }}
              >
                AIzamo
                {/* Circuit dots */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute w-1 h-1 rounded-full circuit-dot opacity-60"
                    style={{ 
                      backgroundColor: '#967259',
                      top: '20%',
                      left: '-15px',
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                  <div 
                    className="absolute w-1 h-1 rounded-full circuit-dot opacity-60"
                    style={{ 
                      backgroundColor: '#967259',
                      top: '70%',
                      left: '25%',
                      animation: 'pulse 2s infinite 0.5s'
                    }}
                  ></div>
                  <div 
                    className="absolute w-1 h-1 rounded-full circuit-dot opacity-60"
                    style={{ 
                      backgroundColor: '#967259',
                      top: '40%',
                      right: '-15px',
                      animation: 'pulse 2s infinite 1s'
                    }}
                  ></div>
                  <div 
                    className="absolute w-1 h-1 rounded-full circuit-dot opacity-60"
                    style={{ 
                      backgroundColor: '#967259',
                      bottom: '25%',
                      right: '30%',
                      animation: 'pulse 2s infinite 1.5s'
                    }}
                  ></div>
                </div>
                {/* Subtle connecting line */}
                <div 
                  className="absolute top-1/2 -left-5 -right-5 h-px opacity-30"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, #967259, transparent)',
                    transform: 'translateY(-50%)'
                  }}
                ></div>
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
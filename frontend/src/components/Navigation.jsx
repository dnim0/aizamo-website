import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
      style={{ backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent' }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 
              className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: 'var(--darkest-brown)' }}
              onClick={() => scrollToSection('hero')}
            >
              AIzamo
            </h2>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="nav-link hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="nav-link hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="nav-link hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="nav-link hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-secondary)' }}
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-primary"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md"
              style={{ color: 'var(--text-primary)' }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left py-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left py-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('roadmap')}
                className="text-left py-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--text-secondary)' }}
              >
                Process
              </button>
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
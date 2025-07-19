import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;

      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration
      particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.3;
      
      particlesRef.current.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    };

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 200);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, var(--cream) 0%, var(--light-brown) 100%)` }}
    >
      {/* Animated Particles Background */}
      <div ref={particlesRef} className="particles-container"></div>
      
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          style={{ background: 'var(--medium-brown)' }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-20 h-20 rotate-45"
          style={{ background: 'var(--dark-brown)' }}
        ></div>
        <div 
          className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full"
          style={{ background: 'var(--medium-brown)' }}
        ></div>
        <div 
          className="absolute bottom-20 right-1/3 w-24 h-24 rotate-12"
          style={{ background: 'var(--dark-brown)' }}
        ></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 fade-in"
            style={{ 
              backgroundColor: 'rgba(150, 114, 89, 0.1)', 
              color: 'var(--medium-brown)',
              border: '1px solid rgba(150, 114, 89, 0.2)'
            }}
          >
            <Sparkles size={16} className="mr-2" />
            AI-Powered Business Solutions
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up">
            <span style={{ color: 'var(--darkest-brown)' }}>Scale Your Business</span>
            <br />
            <span style={{ color: 'var(--medium-brown)' }}>with AI Automation</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto fade-in-up"
            style={{ 
              color: 'var(--text-secondary)',
              animationDelay: '0.2s'
            }}
          >
            Transform your small business with intelligent AI solutions. 
            From automated workflows to lead conversion optimization, 
            we help you save time and increase revenue.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={scrollToContact}
              className="btn btn-primary text-lg px-8 py-4 flex items-center group"
            >
              Get Started Today
              <ArrowRight 
                size={20} 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
              />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-secondary text-lg px-8 py-4"
            >
              View Our Services
            </button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--medium-brown)' }}
              >
                15+
              </div>
              <div style={{ color: 'var(--text-light)' }}>Hours Saved Weekly</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--medium-brown)' }}
              >
                40%
              </div>
              <div style={{ color: 'var(--text-light)' }}>Increase in Conversions</div>
            </div>
            <div className="text-center">
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: 'var(--medium-brown)' }}
              >
                60%
              </div>
              <div style={{ color: 'var(--text-light)' }}>Better ROI on Ads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
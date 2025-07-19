import React, { useState, useEffect } from 'react';

const LogoLoadingScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [phase, setPhase] = useState('particles'); // particles -> formation -> transition -> complete

  useEffect(() => {
    // Create enhanced pixels and start animation
    const container = document.getElementById('pixel-loading-container');
    if (container) {
      createEnhancedWavePixelFormation(container);
    }

    // Phase transitions
    const formationTimer = setTimeout(() => setPhase('formation'), 1000);
    const transitionTimer = setTimeout(() => setPhase('transition'), 4000);
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }, 6000);

    return () => {
      clearTimeout(formationTimer);
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const createEnhancedWavePixelFormation = (container) => {
    const pixelCount = 200;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Clear existing pixels
    container.innerHTML = '';

    // Enhanced logo letter positions for more precise targeting
    const logoLetterPositions = [
      // A
      {x: 35, y: 45, width: 16, height: 25, density: 8}, 
      // I
      {x: 54, y: 45, width: 10, height: 25, density: 6},  
      // z
      {x: 68, y: 45, width: 14, height: 25, density: 7}, 
      // a
      {x: 85, y: 45, width: 14, height: 25, density: 7}, 
      // m
      {x: 102, y: 45, width: 18, height: 25, density: 9}, 
      // o
      {x: 123, y: 45, width: 14, height: 25, density: 7} 
    ];

    // Create particles with enhanced properties
    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'enhanced-wave-pixel';
      
      // Enhanced wave formation with multiple wave patterns
      const wavePhase = (i / pixelCount) * Math.PI * 6;
      const secondaryWave = (i / pixelCount) * Math.PI * 3;
      
      // Starting positions with more variety
      const startRadius = 100 + Math.random() * 150;
      const startAngle = (i / pixelCount) * Math.PI * 2;
      const startX = centerX + Math.cos(startAngle) * startRadius;
      const startY = centerY + Math.sin(startAngle) * startRadius + Math.sin(wavePhase) * 40;

      // Target positions with weighted distribution
      const letterIndex = Math.floor((i / pixelCount) * logoLetterPositions.length);
      const letterPos = logoLetterPositions[letterIndex];
      const densityFactor = Math.random() < (letterPos.density / 10) ? 1 : 0.3;
      
      const offsetX = (Math.random() - 0.5) * letterPos.width * densityFactor;
      const offsetY = (Math.random() - 0.5) * letterPos.height * densityFactor;
      
      const targetX = (letterPos.x / 100) * containerRect.width + offsetX;
      const targetY = (letterPos.y / 100) * containerRect.height + offsetY;

      // Enhanced particle properties
      const particleSize = Math.random() * 2 + 1.5;
      const particleBrightness = 0.7 + Math.random() * 0.3;
      
      // Set initial position and enhanced styling
      pixel.style.left = startX + 'px';
      pixel.style.top = startY + 'px';
      pixel.style.width = particleSize + 'px';
      pixel.style.height = particleSize + 'px';
      pixel.style.filter = `brightness(${particleBrightness}) drop-shadow(0 0 2px rgba(150, 114, 89, 0.6))`;

      // Create enhanced animation with curved paths
      const animationName = `enhancedWavePixel-${i}`;
      createEnhancedPixelAnimation(animationName, startX, startY, targetX, targetY, centerX, centerY);
      
      pixel.style.animation = `${animationName} 3.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
      pixel.style.animationDelay = (i * 12 + Math.random() * 200) + 'ms';

      container.appendChild(pixel);
    }
  };

  const createEnhancedPixelAnimation = (name, startX, startY, targetX, targetY, centerX, centerY) => {
    const existingStyle = document.getElementById('enhanced-wave-pixel-animations');
    let styleSheet = existingStyle;
    
    if (!existingStyle) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'enhanced-wave-pixel-animations';
      document.head.appendChild(styleSheet);
    }

    // Create curved path through center
    const midX = (startX + targetX) / 2 + (Math.random() - 0.5) * 100;
    const midY = (startY + targetY) / 2 + (Math.random() - 0.5) * 50;

    const keyframes = `
      @keyframes ${name} {
        0% {
          left: ${startX}px;
          top: ${startY}px;
          opacity: 0;
          transform: scale(0.3) rotate(${Math.random() * 360}deg);
          filter: brightness(0.5) drop-shadow(0 0 2px rgba(150, 114, 89, 0.6));
        }
        15% {
          opacity: 0.8;
          transform: scale(0.8) rotate(${Math.random() * 180}deg);
          filter: brightness(1.2) drop-shadow(0 0 4px rgba(150, 114, 89, 0.8));
        }
        45% {
          left: ${midX}px;
          top: ${midY}px;
          opacity: 1;
          transform: scale(1.1) rotate(0deg);
          filter: brightness(1.3) drop-shadow(0 0 6px rgba(150, 114, 89, 1));
        }
        80% {
          left: ${targetX}px;
          top: ${targetY}px;
          opacity: 1;
          transform: scale(1);
          filter: brightness(1) drop-shadow(0 0 3px rgba(150, 114, 89, 0.7));
        }
        100% {
          left: ${targetX}px;
          top: ${targetY}px;
          opacity: 1;
          transform: scale(1);
          filter: brightness(1.1) drop-shadow(0 0 4px rgba(150, 114, 89, 0.8));
        }
      }
    `;
    
    styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);
  };

  if (!isAnimating) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000"
      style={{ 
        background: phase === 'transition' 
          ? 'linear-gradient(135deg, rgba(236, 224, 209, 0.95) 0%, rgba(219, 193, 172, 0.95) 100%)'
          : 'linear-gradient(135deg, #ece0d1 0%, #dbc1ac 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Enhanced Pixel Container */}
      <div 
        id="pixel-loading-container"
        className="relative w-full h-full transition-all duration-1000"
        style={{ 
          maxWidth: '900px', 
          maxHeight: '500px',
          opacity: phase === 'transition' ? 0.3 : 1
        }}
      ></div>

      {/* Enhanced Logo with Creative Transition */}
      <div 
        className={`absolute text-6xl font-bold transition-all duration-1000 ${
          phase === 'transition' ? 'transform-gpu' : ''
        }`}
        style={{ 
          color: '#38220f',
          opacity: phase === 'particles' ? 0 : 1,
          transform: phase === 'transition' 
            ? 'scale(0.6) translate(-650px, -280px)' 
            : phase === 'formation' 
              ? 'scale(1) translate(0px, 0px)' 
              : 'scale(0.8) translate(0px, 0px)',
          animation: phase === 'formation' 
            ? 'logoFormation 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 3.2s forwards' 
            : 'none',
          textShadow: '0 0 20px rgba(150, 114, 89, 0.4), 0 0 40px rgba(150, 114, 89, 0.2)',
          zIndex: 100
        }}
      >
        AIzamo
      </div>

      {/* Enhanced Loading Text */}
      <div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-xl font-medium"
        style={{ 
          color: '#634832',
          opacity: phase === 'transition' ? 0 : 1,
          animation: 'enhancedLoadingTextFade 4s ease forwards',
          textShadow: '0 0 10px rgba(99, 72, 50, 0.3)',
          letterSpacing: '0.5px'
        }}
      >
        Powering Up Workflows...
      </div>

      {/* Enhanced Progress Bar */}
      <div 
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80 h-1.5 bg-black bg-opacity-20 rounded-full overflow-hidden"
        style={{ opacity: phase === 'transition' ? 0 : 1 }}
      >
        <div 
          className="h-full rounded-full relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(90deg, #967259, #634832, #967259)',
            backgroundSize: '200% 100%',
            width: '0%',
            animation: 'enhancedProgressFill 5.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, progressShimmer 2s ease-in-out infinite',
            boxShadow: '0 0 10px rgba(150, 114, 89, 0.4)'
          }}
        ></div>
      </div>

      {/* Particle Effect Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, rgba(150, 114, 89, 0.05) 70%, transparent 100%)`,
          opacity: phase === 'formation' ? 0.6 : 0,
          animation: phase === 'formation' ? 'particleGlow 2s ease-in-out infinite alternate' : 'none'
        }}
      ></div>

      <style jsx>{`
        .enhanced-wave-pixel {
          position: absolute;
          background: radial-gradient(circle, #967259 0%, #634832 100%);
          border-radius: 50%;
          opacity: 0;
          box-shadow: 0 0 4px rgba(150, 114, 89, 0.5);
        }
        
        @keyframes logoFormation {
          0% { 
            opacity: 0; 
            transform: scale(0.5) rotate(10deg); 
            filter: blur(2px);
          }
          100% { 
            opacity: 1; 
            transform: scale(1) rotate(0deg); 
            filter: blur(0px);
          }
        }
        
        @keyframes enhancedLoadingTextFade {
          0% { opacity: 0; transform: translateY(10px); }
          25% { opacity: 1; transform: translateY(0px); }
          75% { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes enhancedProgressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes progressShimmer {
          0% { background-position: -200% 0%; }
          100% { background-position: 200% 0%; }
        }

        @keyframes particleGlow {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LogoLoadingScreen;
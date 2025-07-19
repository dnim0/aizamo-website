import React, { useState, useEffect } from 'react';

const LogoLoadingScreen = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Create pixels and start animation
    const container = document.getElementById('pixel-loading-container');
    if (container) {
      createWavePixelFormation(container);
    }

    // Complete loading after animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const createWavePixelFormation = (container) => {
    const pixelCount = 150;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    // Clear existing pixels
    container.innerHTML = '';

    // Logo letter positions for targeting
    const logoLetterPositions = [
      {x: 40, y: 50, width: 12, height: 20}, // A
      {x: 55, y: 50, width: 8, height: 20},  // I
      {x: 67, y: 50, width: 12, height: 20}, // z
      {x: 82, y: 50, width: 12, height: 20}, // a
      {x: 97, y: 50, width: 15, height: 20}, // m
      {x: 115, y: 50, width: 12, height: 20} // o
    ];

    for (let i = 0; i < pixelCount; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'wave-pixel';
      
      // Wave formation - pixels flow from left edge
      const wavePhase = (i / pixelCount) * Math.PI * 4;
      const startX = -20;
      const startY = centerY + Math.sin(wavePhase) * 60;

      // Target positions (logo formation)
      const letterIndex = i % logoLetterPositions.length;
      const letterPos = logoLetterPositions[letterIndex];
      const offsetX = (Math.random() - 0.5) * letterPos.width;
      const offsetY = (Math.random() - 0.5) * letterPos.height;
      
      const targetX = (letterPos.x / 100) * containerRect.width + offsetX;
      const targetY = (letterPos.y / 100) * containerRect.height + offsetY;

      // Set initial position and style
      pixel.style.left = startX + 'px';
      pixel.style.top = startY + 'px';
      pixel.style.width = (Math.random() * 3 + 2) + 'px';
      pixel.style.height = pixel.style.width;

      // Create and apply custom animation
      const animationName = `wavePixel-${i}`;
      createPixelAnimation(animationName, startX, startY, targetX, targetY);
      
      pixel.style.animation = `${animationName} 3.5s ease-out forwards`;
      pixel.style.animationDelay = (i * 15) + 'ms';

      container.appendChild(pixel);
    }
  };

  const createPixelAnimation = (name, startX, startY, targetX, targetY) => {
    const existingStyle = document.getElementById('wave-pixel-animations');
    let styleSheet = existingStyle;
    
    if (!existingStyle) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'wave-pixel-animations';
      document.head.appendChild(styleSheet);
    }

    const keyframes = `
      @keyframes ${name} {
        0% {
          left: ${startX}px;
          top: ${startY}px;
          opacity: 1;
          transform: scale(0.5);
        }
        20% {
          opacity: 1;
          transform: scale(1);
        }
        85% {
          left: ${targetX}px;
          top: ${targetY}px;
          opacity: 1;
          transform: scale(1);
        }
        100% {
          left: ${targetX}px;
          top: ${targetY}px;
          opacity: 0;
          transform: scale(0.8);
        }
      }
    `;
    
    styleSheet.sheet.insertRule(keyframes, styleSheet.sheet.cssRules.length);
  };

  if (!isAnimating) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #ece0d1 0%, #dbc1ac 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Pixel Container */}
      <div 
        id="pixel-loading-container"
        className="relative w-full h-full"
        style={{ maxWidth: '800px', maxHeight: '400px' }}
      ></div>

      {/* Logo that appears after pixels */}
      <div 
        className="absolute text-6xl font-bold"
        style={{ 
          color: '#38220f',
          opacity: 0,
          animation: 'coolLogoEntrance 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 2.5s forwards'
        }}
      >
        AIzamo
      </div>

      {/* Loading Text */}
      <div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-lg"
        style={{ 
          color: '#634832',
          opacity: 0,
          animation: 'loadingTextFade 3.5s ease forwards'
        }}
      >
        Powering Up Workflows...
      </div>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-black bg-opacity-20 rounded-full overflow-hidden"
      >
        <div 
          className="h-full rounded-full"
          style={{ 
            background: 'linear-gradient(90deg, #967259, #634832)',
            width: '0%',
            animation: 'progressFill 5s ease forwards'
          }}
        ></div>
      </div>

      <style jsx>{`
        .wave-pixel {
          position: absolute;
          background: #967259;
          border-radius: 1px;
          opacity: 0;
        }
        
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes loadingTextFade {
          0% { opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LogoLoadingScreen;
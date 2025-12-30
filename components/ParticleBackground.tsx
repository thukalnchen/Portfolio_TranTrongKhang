'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  pulseOffset: number;
  originalRadius: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Aurora Borealis colors
    const auroraColors = [
      'rgba(0, 255, 135, ',    // Mint Green (Primary)
      'rgba(96, 239, 255, ',   // Sky Blue (Secondary)
      'rgba(255, 107, 107, ',  // Coral (Accent)
      'rgba(168, 85, 247, ',   // Purple
    ];

    const particles: Particle[] = [];
    const particleCount = isReducedMotion ? 30 : 60;
    const connectionDistance = 180;

    // Create particles with aurora colors
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * auroraColors.length);
      const baseRadius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: baseRadius,
        originalRadius: baseRadius,
        opacity: Math.random() * 0.6 + 0.2,
        color: auroraColors[colorIndex],
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let animationId: number;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      time += 0.01;

      // Draw aurora glow effect at mouse position
      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
        gradient.addColorStop(0, 'rgba(0, 255, 135, 0.1)');
        gradient.addColorStop(0.5, 'rgba(96, 239, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Gentle floating motion
        const floatX = Math.sin(time + particle.pulseOffset) * 0.2;
        const floatY = Math.cos(time + particle.pulseOffset) * 0.2;
        
        particle.x += particle.vx + floatX;
        particle.y += particle.vy + floatY;

        // Soft wrap around edges
        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        if (particle.y < -50) particle.y = window.innerHeight + 50;
        if (particle.y > window.innerHeight + 50) particle.y = -50;

        // Mouse interaction - attract particles
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && distance > 0) {
          const force = (150 - distance) / 150;
          particle.x += dx * force * 0.02;
          particle.y += dy * force * 0.02;
        }

        // Pulse effect
        const pulse = Math.sin(time * 2 + particle.pulseOffset) * 0.3 + 1;
        particle.radius = particle.originalRadius * pulse;

        // Draw particle with glow
        const glowSize = particle.radius * 3;
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        particleGradient.addColorStop(0, `${particle.color}${particle.opacity})`);
        particleGradient.addColorStop(0.5, `${particle.color}${particle.opacity * 0.5})`);
        particleGradient.addColorStop(1, `${particle.color}0)`);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();

        // Draw core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.opacity + 0.2})`;
        ctx.fill();

        // Draw gradient connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const cdx = particle.x - otherParticle.x;
          const cdy = particle.y - otherParticle.y;
          const cdistance = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdistance < connectionDistance) {
            const lineOpacity = (1 - cdistance / connectionDistance) * 0.4;
            
            // Create gradient line
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            lineGradient.addColorStop(0, `${particle.color}${lineOpacity})`);
            lineGradient.addColorStop(1, `${otherParticle.color}${lineOpacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    if (!isReducedMotion) {
      animate();
    } else {
      // Static render for reduced motion
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.opacity})`;
        ctx.fill();
      });
    }

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;

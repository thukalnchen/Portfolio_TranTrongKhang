'use client';

import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
}

const SnowEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Snowflakes array
    const snowflakes: Snowflake[] = [];
    const snowflakeCount = 100; // Adjusted for performance

    // Create snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        sway: Math.random() * 2 - 1,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update snowflakes
      snowflakes.forEach((flake) => {
        // Update position
        flake.y += flake.speed;
        flake.x += Math.sin(flake.y * flake.swaySpeed) * flake.sway;

        // Reset if out of bounds
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        
        // Gradient for glow effect
        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${flake.opacity * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add sparkle effect for some snowflakes
        if (flake.radius > 2 && Math.random() > 0.98) {
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(139, 92, 246, 0.8)';
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          ctx.fillRect(flake.x - 1, flake.y - 1, 2, 2);
          ctx.restore();
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 5,
        opacity: 0.6,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default SnowEffect;

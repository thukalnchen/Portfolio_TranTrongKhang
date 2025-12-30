'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  // Main cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Follower cursor with more delay (lerp effect)
  const followerX = useMotionValue(0);
  const followerY = useMotionValue(0);
  
  // Main cursor - responsive spring
  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Follower - slower, smoother spring (lerp effect)
  const followerSpringConfig = { damping: 30, stiffness: 150, mass: 1 };
  const followerXSpring = useSpring(followerX, followerSpringConfig);
  const followerYSpring = useSpring(followerY, followerSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.closest('[data-cursor-hover]') !== null;
      
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <div className="hidden md:block">
      {/* Follower Cursor - Large circle with lerp delay */}
      <motion.div
        className="fixed pointer-events-none mix-blend-difference"
        style={{
          x: followerXSpring,
          y: followerYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          opacity: isHidden ? 0 : 1,
        }}
      >
        <motion.div
          className="rounded-full border-2"
          animate={{
            width: isPointer ? '60px' : '40px',
            height: isPointer ? '60px' : '40px',
            borderColor: isPointer ? 'rgba(139, 92, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            animate={{
              background: isPointer 
                ? 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main Cursor - Small dot */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          opacity: isHidden ? 0 : 1,
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isPointer ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Glowing core */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{
                width: '12px',
                height: '12px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.6))',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div
              className="rounded-full relative"
              style={{
                width: '8px',
                height: '8px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                boxShadow: '0 0 12px rgba(139, 92, 246, 0.9)',
              }}
            />
          </div>

          {/* Rotating particles around main cursor */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: [angle, angle + 360],
                x: [
                  Math.cos((angle * Math.PI) / 180) * 15,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 15,
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 15,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 15,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;

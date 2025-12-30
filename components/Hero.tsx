'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowDown, FiCode, FiStar, FiZap } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';

// Dynamically import 3D keyboard
const TechKeyboard3D = dynamic(() => import('./TechKeyboard3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
    </div>
  ),
});

// Typing effect hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsComplete(false);
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Aurora Blob Component
const AuroraBlob = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl animate-morph ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  const { displayText, isComplete } = useTypewriter('Software Engineering Student', 80);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const name = "Tran Trong Khang";

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10"
      style={{ zIndex: 10 }}
    >
      {/* Aurora Animated Background */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {/* Morphing Aurora Blobs */}
        <AuroraBlob 
          className="top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/20 to-cyan-500/20" 
          delay={0}
        />
        <AuroraBlob 
          className="bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/15 to-purple-500/15" 
          delay={2}
        />
        <AuroraBlob 
          className="top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/15 to-pink-500/10" 
          delay={4}
        />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full"
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full"
        animate={{ 
          x: [0, 15, 0],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />

      {/* Main Content - Two Column Layout */}
      <div className="container-custom relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center" style={{ zIndex: 20 }}>
        
        {/* Left Column - Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          {/* Status Badge with Aurora Border */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(0, 255, 135, 0.05)',
                border: '1px solid rgba(0, 255, 135, 0.2)',
              }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0, 255, 135, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <FiStar className="text-emerald-400" />
              </motion.div>
              <span className="text-sm text-emerald-300/90 font-medium">Available for opportunities</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </motion.span>
          </motion.div>

          {/* Main Heading with Letter Animation */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-gray-100">Hi, I'm</span>{' '}
            <br className="hidden sm:block" />
            <span className="inline-flex flex-wrap">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="gradient-text inline-block"
                  style={{ 
                    display: letter === ' ' ? 'inline' : 'inline-block',
                    minWidth: letter === ' ' ? '0.3em' : 'auto'
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: '#00FF87',
                    textShadow: '0 0 20px rgba(0, 255, 135, 0.8)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtitle with Typing Effect */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-3 text-xl md:text-2xl">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <FiCode className="text-cyan-400" />
              </motion.div>
              <span className="text-gray-300">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-emerald-400"
                >
                  {!isComplete && '|'}
                </motion.span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
          >
            Passionate about building{' '}
            <span className="text-emerald-400">innovative solutions</span> and creating{' '}
            <span className="text-cyan-400">amazing user experiences</span>.
            Currently in my 3rd year, actively seeking opportunities to grow and contribute.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary Button - Aurora Style */}
            <motion.a
              href="#projects"
              className="relative px-8 py-4 rounded-full text-black font-semibold overflow-hidden group text-center"
              style={{
                background: 'linear-gradient(135deg, #00FF87, #60EFFF)',
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, #00FF87, #60EFFF)',
                }}
              />
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FiZap className="text-lg" />
                View My Work
              </span>
            </motion.a>

            {/* Secondary Button - Glass Aurora */}
            <motion.a
              href="#contact"
              className="relative px-8 py-4 rounded-full text-white font-semibold overflow-hidden group text-center aurora-border"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              <span className="relative z-10">Get In Touch</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-10"
          >
            <motion.a
              href="#about"
              className="inline-flex flex-col items-center text-gray-500 hover:text-emerald-400 transition-colors group"
            >
              <span className="text-xs uppercase tracking-widest mb-2 group-hover:text-emerald-400">Scroll Down</span>
              <motion.div
                className="w-6 h-10 border-2 border-gray-600 group-hover:border-emerald-400 rounded-full flex justify-center p-1 transition-colors"
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column - 3D Keyboard with Parallax */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full h-[550px] lg:h-[650px] xl:h-[700px] relative"
          style={{
            perspective: 1000,
          }}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="w-full h-full"
          >
            <TechKeyboard3D isCompact scale={1.15} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUser, FiBookOpen, FiTarget, FiAward, FiCoffee, FiCode, FiFolder } from 'react-icons/fi';
import { useRef, useState, useEffect } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="gradient-text font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      {count}{suffix}
    </span>
  );
};

// Tilt Card Component
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    }),
  };

  const cards = [
    {
      icon: FiUser,
      title: 'Who I Am',
      description: 'A passionate software engineering student in my 3rd year, dedicated to learning and building innovative solutions.',
      gradient: 'from-emerald-500 to-cyan-500',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    },
    {
      icon: FiBookOpen,
      title: 'What I Do',
      description: 'I develop web applications, mobile apps, and enjoy exploring new technologies to solve real-world problems.',
      gradient: 'from-cyan-500 to-purple-500',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-purple-500',
    },
    {
      icon: FiTarget,
      title: 'My Goals',
      description: 'Seeking opportunities to contribute to meaningful projects and grow as a software engineer in a dynamic team.',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { icon: FiCode, label: 'Lines of Code', value: 50, suffix: 'K+', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-500/10' },
    { icon: FiFolder, label: 'Projects', value: 15, suffix: '+', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-500/10' },
    { icon: FiCoffee, label: 'Cups of Coffee', value: 500, suffix: '+', color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-500/10' },
    { icon: FiAward, label: 'Certifications', value: 5, suffix: '', color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-500/10' },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-20 lg:py-28" style={{ zIndex: 10 }}>
      {/* Aurora Section Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500" style={{ zIndex: 1 }}></div>
      
      {/* Background Aurora Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(0, 255, 135, 0.1)',
                border: '1px solid rgba(0, 255, 135, 0.2)',
                color: 'rgb(0, 255, 135)',
              }}
            >
              Get to know me
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Get to know more about who I am, what I do, and what I'm passionate about
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative group"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 text-center group-hover:border-emerald-500/30 transition-all duration-300">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.bg} mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </motion.div>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {cards.map((card, index) => (
              <TiltCard key={card.title} className="h-full perspective-1000">
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="relative group h-full"
                  data-cursor-hover
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500`} />
                  
                  {/* Card Content */}
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 h-full group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all duration-300"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Floating Icon */}
                    <motion.div 
                      className="mb-6"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      <motion.div 
                        className={`inline-flex p-4 ${card.iconBg} rounded-xl shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                      >
                        <card.icon size={28} className="text-white" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Text Content */}
                    <div style={{ transform: 'translateZ(20px)' }}>
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">{card.description}</p>
                    </div>
                    
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Journey Section */}
          <motion.div
            variants={itemVariants}
            className="relative group"
            data-cursor-hover
          >
            {/* Aurora Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
            
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 group-hover:border-white/20 transition-all duration-300 overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start relative">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                  <motion.span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    My Story
                  </motion.span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 gradient-text">My Journey</h3>
                  <div className="space-y-3 md:space-y-4 text-gray-400 text-sm md:text-base">
                    <p className="leading-relaxed">
                      I'm currently pursuing a degree in Software Engineering at [Your University]. 
                      My journey in tech started with a curiosity about how things work, which evolved 
                      into a passion for creating solutions that make a difference.
                    </p>
                    <p className="leading-relaxed">
                      Throughout my academic journey, I've worked on various projects ranging from 
                      web applications to mobile apps, constantly learning and improving my skills. 
                      I believe in writing <span className="text-emerald-400">clean, maintainable code</span> and creating <span className="text-cyan-400">user-centric designs</span>.
                    </p>
                    <p className="leading-relaxed">
                      I'm eager to apply my knowledge in a professional setting and contribute to 
                      projects that challenge me to grow both technically and personally.
                    </p>
                  </div>
                </div>
                
                {/* Info Cards */}
                <div className="space-y-3 md:space-y-4 order-1 lg:order-2">
                  {[
                    { label: 'Year', value: '3rd Year', color: 'emerald' },
                    { label: 'Major', value: 'Software Engineering', color: 'cyan' },
                    { label: 'Focus', value: 'Full Stack Development', color: 'purple' },
                    { label: 'Status', value: 'Available', color: 'green', isStatus: true },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="group/item"
                    >
                      <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-black/70">
                        <div className="flex justify-between items-center gap-4">
                          <span className="text-gray-400 text-sm md:text-base">{item.label}</span>
                          <span className={`font-bold text-sm md:text-base ${
                            item.isStatus 
                              ? 'text-emerald-400 flex items-center gap-2' 
                              : 'gradient-text'
                          }`}>
                            {item.isStatus && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                            )}
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

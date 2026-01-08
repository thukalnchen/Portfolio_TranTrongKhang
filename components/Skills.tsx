'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiDocker,
  SiFigma,
  SiTailwindcss,
  SiExpress,
  SiSpring,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiGrid, FiBox, FiLayers, FiDatabase, FiTool } from 'react-icons/fi';

// Dynamically import 3D component with no SSR
const TechKeyboard3D = dynamic(() => import('./TechKeyboard3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <motion.div 
        className="flex flex-col items-center gap-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
        <span className="text-gray-400">Loading 3D Experience...</span>
      </motion.div>
    </div>
  ),
});

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [show3D, setShow3D] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: FiLayers,
      gradient: 'from-emerald-500 to-cyan-500',
      skills: [
        { name: 'React', icon: SiReact, color: '#61DAFB', level: 90 },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', level: 85 },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 80 },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 90 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 95 },
      ],
    },
    {
      title: 'Backend',
      icon: FiBox,
      gradient: 'from-cyan-500 to-purple-500',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 85 },
        { name: 'Express', icon: SiExpress, color: '#ffffff', level: 80 },
        { name: 'Python', icon: SiPython, color: '#3776AB', level: 75 },
        { name: 'Java', icon: FaJava, color: '#007396', level: 70 },
        { name: 'Spring', icon: SiSpring, color: '#6DB33F', level: 65 },
      ],
    },
    {
      title: 'Database',
      icon: FiDatabase,
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 85 },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', level: 75 },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: FiTool,
      gradient: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032', level: 90 },
        { name: 'Docker', icon: SiDocker, color: '#2496ED', level: 70 },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E', level: 80 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  return (
    <section id="skills" className="relative overflow-hidden py-20 lg:py-28" style={{ zIndex: 10 }}>
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-custom relative" style={{ zIndex: 10 }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-10 md:mb-16">
            <motion.span 
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{
                background: 'rgba(96, 239, 255, 0.1)',
                border: '1px solid rgba(96, 239, 255, 0.2)',
                color: 'rgb(96, 239, 255)',
              }}
            >
              What I work with
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
              Technologies and tools I work with to build amazing projects
            </p>
            
            {/* Toggle Button - Aurora Style */}
            <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={() => setShow3D(true)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm sm:text-base ${
                  show3D 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-white bg-white/5 border border-white/10'
                }`}
                style={show3D ? {
                  background: 'linear-gradient(135deg, #00FF87, #60EFFF)',
                } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiBox /> 3D Keyboard
              </motion.button>
              <motion.button
                onClick={() => setShow3D(false)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm sm:text-base ${
                  !show3D 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-white bg-white/5 border border-white/10'
                }`}
                style={!show3D ? {
                  background: 'linear-gradient(135deg, #00FF87, #60EFFF)',
                } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGrid /> Grid View
              </motion.button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* 3D Keyboard View */}
            {show3D && (
              <motion.div
                key="3d"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-10 md:mb-16"
              >
                <TechKeyboard3D />
              </motion.div>
            )}

            {/* Enhanced Grid View */}
            {!show3D && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Category Filter Tabs */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  <motion.button
                    onClick={() => setActiveCategory(null)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                      activeCategory === null
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All Skills
                  </motion.button>
                  {skillCategories.map((cat) => (
                    <motion.button
                      key={cat.title}
                      onClick={() => setActiveCategory(cat.title)}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        activeCategory === cat.title
                          ? `bg-gradient-to-r ${cat.gradient} text-black`
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <cat.icon size={16} />
                      {cat.title}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {skillCategories
                    .filter(cat => activeCategory === null || cat.title === activeCategory)
                    .map((category, categoryIndex) => (
                    <motion.div
                      key={category.title}
                      variants={itemVariants}
                      layout
                      className="relative group/card"
                      data-cursor-hover
                    >
                      {/* Aurora Glow */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover/card:opacity-20 blur-2xl transition-all duration-500`} />
                      
                      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 h-full group-hover/card:border-white/20 group-hover/card:bg-white/[0.08] transition-all duration-300">
                        {/* Category Header */}
                        <div className="flex items-center gap-3 mb-5 sm:mb-6">
                          <motion.div 
                            className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${category.gradient}`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <category.icon size={20} className="text-black sm:w-6 sm:h-6" />
                          </motion.div>
                          <h3 className="text-xl sm:text-2xl font-bold gradient-text">
                            {category.title}
                          </h3>
                        </div>

                        {/* Skills */}
                        <div className="space-y-3 sm:space-y-4">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              custom={skillIndex}
                              variants={skillItemVariants}
                              initial="hidden"
                              animate={inView ? "visible" : "hidden"}
                              className="group relative"
                              data-cursor-hover
                            >
                              <div className="flex items-center gap-3 sm:gap-4 px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all hover:bg-black/30">
                                {/* Icon */}
                                <motion.div 
                                  className="relative flex-shrink-0"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  transition={{ type: 'spring', stiffness: 300 }}
                                >
                                  <skill.icon
                                    size={28}
                                    style={{ color: skill.color }}
                                    className="sm:w-8 sm:h-8"
                                  />
                                  <div
                                    className="absolute inset-0 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                                    style={{ backgroundColor: skill.color }}
                                  />
                                </motion.div>

                                {/* Name & Progress */}
                                <div className="flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-200 font-medium">{skill.name}</span>
                                    <span className="text-sm text-gray-500">{skill.level}%</span>
                                  </div>
                                  {/* Progress Bar */}
                                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      style={{ 
                                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                                      }}
                                      initial={{ width: 0 }}
                                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                      transition={{ duration: 1, delay: skillIndex * 0.1, ease: 'easeOut' }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Learning Section - Aurora Style */}
          <motion.div
            variants={itemVariants}
            className="mt-12 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="relative bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center group-hover:border-white/20 transition-all">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-4"
              >
                <span className="text-4xl">🚀</span>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 gradient-text">Always Learning</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                I'm constantly expanding my skill set and staying up-to-date with the latest technologies
                in the software development ecosystem. Currently exploring <span className="text-emerald-400">AI/ML</span>, 
                <span className="text-cyan-400"> Cloud Architecture</span>, and <span className="text-purple-400">Web3</span>.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

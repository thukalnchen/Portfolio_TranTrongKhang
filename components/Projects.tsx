'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiCode, FiStar, FiGitBranch, FiArrowRight } from 'react-icons/fi';
import { useRef, useState } from 'react';

// Tilt Card for Projects
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-1000"
      data-cursor-hover
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Aurora Glow */}
      <motion.div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"
        style={{
          background: project.gradient,
        }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
        }}
      />
      
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all duration-500">
          {/* Project Image/Gradient Area */}
          <div className="relative h-56 overflow-hidden">
            {/* Gradient Background with Aurora Effect */}
            <div 
              className="absolute inset-0"
              style={{ background: project.gradient }}
            />
            
            {/* Animated Aurora Waves */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.6 }}
                className="p-6 rounded-2xl bg-black/20 backdrop-blur-sm"
              >
                <FiCode size={48} className="text-white/70" />
              </motion.div>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div 
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                  <FiStar size={12} /> Featured
                </span>
              </motion.div>
            )}

            {/* Hover Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%', y: '-100%' }}
              animate={isHovered ? { x: '100%', y: '100%' } : { x: '-100%', y: '-100%' }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Content */}
          <div className="p-6 relative" style={{ transform: 'translateZ(20px)' }}>
            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all duration-300">
              {project.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-400 mb-5 leading-relaxed">{project.description}</p>

            {/* Tags with hover effect */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * tagIndex }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-xs text-gray-300 hover:border-emerald-500/30 hover:text-emerald-300 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mb-5 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <FiStar size={14} className="text-yellow-500" />
                {project.stars}
              </span>
              <span className="flex items-center gap-1">
                <FiGitBranch size={14} className="text-purple-400" />
                {project.forks}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiGithub size={18} />
                <span className="font-medium">Source Code</span>
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-black"
                style={{ background: 'linear-gradient(135deg, #00FF87, #60EFFF)' }}
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 10px 40px rgba(0, 255, 135, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <FiExternalLink size={18} />
                <span>Live Demo</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce platform with payment integration, product management, and user authentication.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    gradient: 'linear-gradient(135deg, #00FF87, #60EFFF)',
    stars: 128,
    forks: 45,
    featured: true,
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    gradient: 'linear-gradient(135deg, #60EFFF, #a855f7)',
    stars: 89,
    forks: 23,
    featured: false,
  },
  {
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard with forecasts, maps, and location-based weather alerts.',
    tags: ['React', 'TypeScript', 'Weather API', 'Charts'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    stars: 67,
    forks: 18,
    featured: false,
  },
  {
    title: 'Social Media App',
    description:
      'A social networking platform with posts, comments, likes, and real-time notifications.',
    tags: ['Next.js', 'MongoDB', 'Redis', 'AWS S3'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
    stars: 156,
    forks: 52,
    featured: true,
  },
];

const Projects = () => {
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
        delayChildren: 0.1,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="projects" className="relative overflow-hidden" style={{ zIndex: 10 }}>
      {/* Aurora Section Divider */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
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
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                color: 'rgb(168, 85, 247)',
              }}
            >
              My Work
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Some of my recent work and personal projects that showcase my skills
            </p>
          </motion.div>

          {/* Projects Grid - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* View More Section */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-block relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group-hover:border-white/20 transition-all">
                <p className="text-gray-400 mb-6">Interested in seeing more of my work?</p>
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-black"
                  style={{ background: 'linear-gradient(135deg, #00FF87, #60EFFF)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 255, 135, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub size={22} />
                  <span>View All Projects on GitHub</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight size={20} />
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

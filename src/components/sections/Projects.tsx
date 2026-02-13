import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import BlurText from '../ui/BlurText';

type Project = {
  id: string;
  title: string;
  brand: string;
  image: string;
  description: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Design System',
    brand: 'TechFlow',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=600&fit=crop',
    description: 'Comprehensive design system for web applications with 200+ components.',
    tags: ['Design', 'Components', 'Frontend']
  },
  {
    id: 'project-2',
    title: 'Mobile App',
    brand: 'MoveFit',
    image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=500&h=600&fit=crop',
    description: 'Fitness tracking app with AI-powered workout recommendations.',
    tags: ['Mobile', 'AI', 'UX']
  },
  {
    id: 'project-3',
    title: 'Brand Identity',
    brand: 'LuminaStudio',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=600&fit=crop',
    description: 'Complete brand identity including logo, colors, and guidelines.',
    tags: ['Branding', 'Identity', 'Strategy']
  },
  {
    id: 'project-4',
    title: 'E-Commerce Platform',
    brand: 'ShopHub',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=600&fit=crop',
    description: 'Full-stack e-commerce solution with payment integration.',
    tags: ['Backend', 'Fullstack', 'Commerce']
  },
  {
    id: 'project-5',
    title: 'Data Visualization',
    brand: 'InsightDash',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=600&fit=crop',
    description: 'Interactive dashboard for real-time data visualization.',
    tags: ['Data', 'Dashboard', 'Analytics']
  },
  {
    id: 'project-6',
    title: 'Social Network',
    brand: 'ConnectHub',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop',
    description: 'Social platform with real-time messaging and notifications.',
    tags: ['Social', 'Backend', 'Realtime']
  }
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse for future magnet effect (optional enhancement)

  // Generate pseudo-random positions but deterministic (based on id)
  const getProjectPosition = (index: number) => {
    const seed = index;
    const x = (seed * 137.508) % 100; // Pseudo-random using golden angle
    const y = (seed * 218.971) % 100;
    return { x, y };
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FFF8E7] text-[#2e1065] py-20 px-6 md:px-12 overflow-hidden">
      <div ref={containerRef} className="relative max-w-7xl mx-auto h-screen">
        
        {/* Section Header */}
        <div className="absolute top-0 left-0 z-20 mb-16">
          <h2 className="font-mono text-sm tracking-[0.3em] uppercase border-b border-[#2e1065] pb-4 inline-block">
            Featured Projects
          </h2>
          <h3 className="font-sans text-[2.5rem] md:text-[3.5rem] leading-[1.1] tracking-[-0.02em] mt-6 max-w-[20ch]">
            Work that
            <span className="block px-3 py-1 w-max bg-[#bef264] inline-block">
              speaks for
            </span>
            itself
          </h3>
        </div>

        {/* Projects Grid - Floating Layout */}
        <div className="relative w-full h-full">
          {/* Blur overlay - applies to all projects not hovered */}
          {hoveredId && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute inset-0 bg-[#FFF8E7] opacity-0 backdrop-blur-sm"></div>
            </div>
          )}

          {PROJECTS.map((project, index) => {
            const pos = getProjectPosition(index);
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                className="absolute w-80 h-96 group cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  zIndex: isHovered ? 50 : 10
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  filter: hoveredId && !isHovered ? 'blur(8px) opacity(0.4)' : 'blur(0px) opacity(1)',
                  y: isHovered ? -20 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Project Card */}
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200 shadow-lg">
                  {/* Image */}
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered ? 1.08 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-end p-6"
                    animate={{
                      backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Brand Badge */}
                    <motion.div
                      className="inline-block mb-3"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <span className="text-[#bef264] font-mono text-xs tracking-[0.2em] uppercase">
                        {project.brand}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h4
                      className="text-white font-sans text-2xl font-bold mb-3 leading-tight"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                    >
                      {project.title}
                    </motion.h4>

                    {/* Animated Description */}
                    {isHovered && (
                      <BlurText
                        text={project.description}
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                        className="text-white text-sm leading-relaxed mb-4 max-w-xs"
                        stepDuration={0.25}
                      />
                    )}

                    {/* Tags */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10
                      }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                    >
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#bef264] text-[#2e1065] text-xs font-mono rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Border accent on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-lg border-2 border-[#bef264]"
                  animate={{
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-6 right-6 text-center">
        <p className="font-mono text-xs opacity-50 uppercase tracking-[0.1em]">
          Hover to explore
        </p>
      </div>
    </section>
  );
}

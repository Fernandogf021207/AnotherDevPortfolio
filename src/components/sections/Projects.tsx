import { useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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

const CARD_HEIGHT = 450; // Height of the card area

const ProjectCard = ({ 
  project, 
  setHoveredId, 
  hoveredId, 
  position 
}: { 
  project: Project; 
  index: number; 
  setHoveredId: (id: string | null) => void; 
  hoveredId: string | null;
  position: { top: number; left: number };
}) => {
  const isHovered = hoveredId === project.id;
  const isBlurred = hoveredId !== null && hoveredId !== project.id;

  // Magnetic Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = { x: clientX - center.x, y: clientY - center.y };
    
    x.set(distance.x * 0.1); // Magnetic strength
    y.set(distance.y * 0.1);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHoveredId(null);
  }

  return (
    <motion.div
      className="absolute w-80 h-[28rem] md:w-96 md:h-[32rem] cursor-pointer"
      style={{
        top: position.top,
        left: `${position.left}%`,
        zIndex: isHovered ? 50 : 10,
        x: mouseX,
        y: mouseY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isHovered ? 1.1 : 1,
        filter: isBlurred ? 'blur(8px) opacity(0.4)' : 'blur(0px) opacity(1)',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Project Card Inner */}
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200 shadow-2xl">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="text-[#bef264] font-mono text-xs tracking-[0.2em] uppercase mb-2 block"
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
          >
            {project.brand}
          </motion.span>
          
          <motion.h4 
            className="text-white font-sans text-3xl font-bold mb-3 leading-none"
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.15 }}
          >
            {project.title}
          </motion.h4>

          {isHovered && (
             <BlurText
               text={project.description}
               delay={50}
               animateBy="words"
               direction="bottom"
               className="text-gray-200 text-sm leading-relaxed mb-4 max-w-[90%]"
             />
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] border border-white/30 text-white px-2 py-1 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Calculate positions once to avoid re-renders shuffling them
  const projectPositions = useMemo(() => {
    return PROJECTS.map((_, index) => {
      // Deterministic randomness based on index
      const seed = index * 123.45;
      const randomX = (Math.sin(seed) * 10000) % 100; // 0-99
      const normalizedX = Math.abs(randomX); // 0-99 positive
      
      // Clamp between 10% and 60% (desktop) to keep it safe from edges
      // This creates the "scattered" look
      const left = 10 + (normalizedX % 50); 

      // Vertical stack with some randomness in gap
      const top = index * (CARD_HEIGHT - 50) + 150; // Start at 150px
      
      return { top, left };
    });
  }, []);

  const totalHeight = PROJECTS.length * (CARD_HEIGHT - 50) + 300;

  return (
    <section className="relative w-full bg-[#FFF8E7] text-[#2e1065] overflow-hidden">
      {/* Background/Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
         <div className="absolute top-0 left-1/4 w-px h-full bg-[#2e1065]"></div>
         <div className="absolute top-0 right-1/4 w-px h-full bg-[#2e1065]"></div>
      </div>

      <div className="relative w-full max-w-[1920px] mx-auto" style={{ height: totalHeight }}>
        
        {/* Sticky Header */}
        <div className="absolute top-20 left-6 md:left-12 z-40 pointer-events-none mix-blend-multiply">
           <h2 className="font-mono text-sm tracking-[0.3em] uppercase border-b border-[#2e1065] pb-4 inline-block mb-4">
            Selected Works
          </h2>
          <h3 className="font-sans text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Recent<br/>Projects
          </h3>
        </div>

        {/* Projects Container */}
        <div className="w-full h-full relative">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              setHoveredId={setHoveredId}
              hoveredId={hoveredId}
              position={projectPositions[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

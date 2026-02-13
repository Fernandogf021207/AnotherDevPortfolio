import { useRef, useState, MouseEvent } from 'react';
import { gsap } from 'gsap';
import BlurText from '../ui/BlurText';

interface Project {
  id: number;
  title: string;
  category: string;
  img: string;
  x: number;
  y: number;
  w: number;
}

const PROJECTS: Project[] = [
  { id: 1, title: "Rio Life", category: "Branding", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600", x: 10, y: 10, w: 25 },
  { id: 2, title: "Eholo Tech", category: "Web Design", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600", x: 60, y: 15, w: 20 },
  { id: 3, title: "Par-Dos", category: "Art Direction", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600", x: 20, y: 50, w: 30 },
  { id: 4, title: "Mindless", category: "Development", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600", x: 65, y: 60, w: 22 }
];

const ProjectItem = ({
  project,
  hoveredId,
  setHoveredId
}: {
  project: Project;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHovered = hoveredId === project.id;
  // If something is hovered, but NOT this one, we blur this one.
  const isBlurred = hoveredId !== null && hoveredId !== project.id;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate distance from center
    const x = (clientX - (rect.left + rect.width / 2)) * 0.2; 
    const y = (clientY - (rect.top + rect.height / 2)) * 0.2;

    gsap.to(imgRef.current, {
      x: x,
      y: y,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    if (imgRef.current) {
      gsap.to(imgRef.current, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`
        group relative flex flex-col
        md:absolute md:[left:var(--x)] md:[top:var(--y)] md:[width:var(--w)]
        w-[80%] mx-auto mb-16 md:mb-0
        transition-all duration-500 ease-in-out
        ${isBlurred ? 'blur-[2px] grayscale opacity-40 scale-95' : 'opacity-100 scale-100'}
        ${isHovered ? 'z-50' : 'z-10'}
      `}
      style={{
        '--x': `${project.x}%`,
        '--y': `${project.y}%`,
        '--w': `${project.w}vw`
      } as React.CSSProperties}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden cursor-none">
         <img
            ref={imgRef}
            src={project.img}
            alt={project.title}
            className={`
              w-full h-auto object-cover aspect-[3/4] md:aspect-[4/5]
              transition-all duration-700 ease-out shadow-lg
              ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100'}
            `}
         />
      </div>

      <div className={`
        absolute left-0 w-full pointer-events-none mix-blend-difference
        flex flex-col items-center justify-center
        top-1/2 -translate-y-1/2
        ${isHovered ? 'opacity-100' : 'opacity-0'} 
        transition-opacity duration-300
      `}>
          {isHovered && (
            <>
               <BlurText
                 text={project.title}
                 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 text-center"
                 delay={50}
                 animateBy="letters"
               />
               <p className="text-sm font-sans uppercase tracking-widest text-white/80 text-center">
                 {project.category}
               </p>
            </>
          )}
      </div>
    </div>
  );
};

const SelectedWorks = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-[150vh] bg-[#FFF8E7] overflow-hidden py-20 md:py-0">
      {/* Decorative Background Elements could go here (noise, gradients) */}
      
      {/* Sticky Section Title */}
      <div className="absolute top-20 left-8 md:top-1/2 md:left-8 md:-translate-y-1/2 md:-rotate-90 md:origin-left z-0 mb-12 md:mb-0 px-8 md:px-0 pointer-events-none">
        <h2 className="text-5xl md:text-8xl font-black text-black tracking-tighter uppercase opacity-10 whitespace-nowrap">
          Selected Works
        </h2>
      </div>

      {/* Projects Container */}
      <div className="relative w-full h-full max-w-[1920px] mx-auto">
        {PROJECTS.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_ICONS = [
  "https://cdn.simpleicons.org/react",
  "https://cdn.simpleicons.org/typescript",
  "https://cdn.simpleicons.org/javascript",
  "https://cdn.simpleicons.org/nextdotjs",
  "https://cdn.simpleicons.org/tailwindcss",
  "https://cdn.simpleicons.org/nodedotjs",
  "https://cdn.simpleicons.org/supabase",
  "https://cdn.simpleicons.org/rust",
  "https://cdn.simpleicons.org/figma",
  "https://cdn.simpleicons.org/docker",
  "https://cdn.simpleicons.org/git",
  "https://cdn.simpleicons.org/github"
];

export default function EditorialHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1, // Smooth scrubbing
          pin: true,
        }
      });

      const icons = gsap.utils.toArray('.tech-icon');
      
      // Initial Setup: Center, invisible
      gsap.set(icons, {
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
        scale: 0, 
        opacity: 0
      });

      // Calculate safe boundaries (Increased for more dispersion)
      const safeX = window.innerWidth * 0.6; // Was 0.4
      const safeY = window.innerHeight * 0.6; // Was 0.4

      // Volumetric Explosion Animation
      icons.forEach((icon: any) => {
        // Random depth: 0 (far) -> 1 (very close)
        const depth = Math.random();

        // Scale based on depth (0.5x far, 3.5x close)
        const scale = gsap.utils.mapRange(0, 1, 0.5, 3.5, depth);
        
        // Blur logic: Close objects blurred (bokeh), far objects slight blur, middle sharp
        const blur = depth > 0.8 ? 6 : (depth < 0.2 ? 2 : 0);

        // Parallax Speed
        const duration = gsap.utils.mapRange(0, 1, 2, 1, depth); 

        // Scatter logic: Ensure icons don't clump in the very center text area
        // We generate a random angle and a minimum distance from center
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 300; // Minimum 150px radius from center
        const xOffset = Math.cos(angle) * radius; 
        const yOffset = Math.sin(angle) * radius;

        tl.to(icon, {
          // Use safe bound + offset to push away from center
          x: () => gsap.utils.clamp(-safeX, safeX, xOffset + gsap.utils.random(-100, 100)),
          y: () => gsap.utils.clamp(-safeY, safeY, yOffset + gsap.utils.random(-100, 100)),
          rotation: () => gsap.utils.random(-180, 180),
          scale: scale,
          opacity: 1,
          filter: `blur(${blur}px)`,
          duration: duration,
          ease: "power3.out" // Fast explosion start
        }, 0);
      });

      // Camera Push Effect on Text (Anchor)
      tl.to(textRef.current, {
          scale: 1.15,
          letterSpacing: "0.05em", // Subtle expansion
          y: -50, // Slight drift up
          duration: 1.5, // Matches general icon movement
          ease: "power1.inOut"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] overflow-hidden flex flex-col items-center justify-center bg-[#FFF8E7] text-[#2e1065]">
      
      {/* TEXT LAYER (Z-50) - The Anchor */}
      <div ref={textRef} className="relative z-50 pointer-events-auto text-center flex flex-col items-center gap-2 select-none">
        <h2 className="font-mono text-xl md:text-2xl tracking-[0.5em] uppercase opacity-80">
          Software
        </h2>
        
        <p className="font-serif italic text-5xl md:text-7xl">
          architect & 
          <span className="relative inline-block mx-2 px-2 md:mx-4 md:px-4 transform -rotate-2 bg-[#e9d5ff]">
            creative
          </span>
        </p>
        
        <div className="relative mt-4">
            {/* Green Highlight */}
            <div className="absolute inset-0 bg-[#bef264] transform rotate-1 scale-110 z-[-1]"></div>
            <h1 className="font-display font-black text-[12vw] leading-[0.8] uppercase mix-blend-multiply">
              DEVELOPER
            </h1>
        </div>
      </div>

      {/* ICON LAYER (Z-40) - The Debris */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {TECH_ICONS.map((icon, i) => (
          <img 
            key={i}
            src={icon}
            alt="tech-icon"
            className="tech-icon absolute object-contain drop-shadow-2xl"
            style={{
              width: '96px',   // w-24
              height: '96px',  // h-24
              // Initial State (Absolute Center)
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(0)',
              opacity: 0,
              willChange: 'transform, filter, opacity' // Optimize performance
            }}
          />
        ))}
      </div>

    </section>
  );
}

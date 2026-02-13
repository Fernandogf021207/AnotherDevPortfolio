import { motion } from 'framer-motion';

export default function AboutEditorial() {
  return (
    <section className="bg-[#FFF8E7] text-[#2e1065] py-16 px-5 sm:px-6 md:px-10 lg:px-12 w-full overflow-hidden">
      
      {/* MAIN GRID CONTAINER */}
      {/* Changed to md:grid-cols-2 for earlier split. Added w-full. */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 min-[700px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 min-[700px]:gap-12 lg:gap-20 items-start">
        
        {/* COLUMNA IZQUIERDA: TITULO + IMAGEN (Visual) */}
        <div className="flex flex-col gap-6 min-[700px]:gap-8 min-w-0">
          {/* Etiqueta Superior */}
          <h3 className="font-mono text-[11px] min-[700px]:text-sm tracking-[0.32em] uppercase border-b border-[#2e1065] pb-3 min-[700px]:pb-4 inline-block w-max">
            The Origin Story
          </h3>

          <h2 className="font-sans text-[2.1rem] min-[700px]:text-[2.4rem] lg:text-[3.2rem] leading-[1.02] tracking-[-0.02em] max-w-[14ch]">
            The code changed
            <span className="block w-max px-2 py-0.5 bg-[#bef264] text-[#2e1065]">
              dramatically
            </span>
            — and so did I.
          </h2>

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] min-[700px]:h-[520px] lg:h-[700px] group min-w-0" // min-w-0 is critical for Grid
          >
              {/* Marco Decorativo Desplazado */}
              <div className="absolute inset-0 border-2 border-[#2e1065] translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              
              {/* Contenedor de Imagen con Overflow Hidden */}
              <div className="relative w-full h-full overflow-hidden bg-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech Origins"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: TEXTO (Narrativa) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col justify-center relative z-10 min-w-0 pt-1 min-[700px]:pt-14" // min-w-0 prevents blowout
        >
              {/* Texto Principal */}
              <div className="prose prose-lg max-w-none text-[#2e1065] border-t border-[#2e1065]/25 pt-5 min-[700px]:pt-7">
              <p className="font-serif text-[1.28rem] min-[700px]:text-[1.55rem] lg:text-[1.9rem] leading-[1.46] mb-5 min-[700px]:mb-6 max-w-[30ch]">
                <span className="float-left text-6xl min-[700px]:text-7xl font-sans font-black mr-3 min-[700px]:mr-4 mt-[-8px] min-[700px]:mt-[-10px] leading-none text-[#bef264] mix-blend-multiply">
                  I
                </span>
                t didn’t start with code. It started with a screwdriver and curiosity. Breaking open old radios, staring at the green phosphor of a CRT monitor, trying to understand the ghost in the machine.
              </p>
              
              <p className="font-serif text-[1rem] min-[700px]:text-[1.12rem] lg:text-[1.22rem] leading-[1.78] opacity-80 mb-6 max-w-[45ch]">
                The realization hit me fast: this black box wasn't magic; it was logic waiting to be written. From my first "Hello World" on a dusty ThinkPad to architecting complex systems today, the thrill remains the same.
              </p>

              <p className="font-sans font-bold text-[1.02rem] min-[700px]:text-[1.15rem] uppercase tracking-[0.06em] border-l-4 border-[#bef264] pl-5 min-[700px]:pl-6 py-2 my-7 min-[700px]:my-8 max-w-[44ch]">
                "I don't just write code; I define structures out of chaos."
              </p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}

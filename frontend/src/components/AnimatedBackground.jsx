import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-base-100">
      
      {/* 1. THE CHECKERED GRID (Architectural Paper) */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `
            linear-gradient(theme(colors.neutral) 1px, transparent 1px),
            linear-gradient(90deg, theme(colors.neutral) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px' // Smaller grid for a drafting feel
        }}
      ></div>

      {/* 2. THE BLUEPRINT DRAWINGS (The 'Appearing' Sketches) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Sketch 1: A Compass/Divider icon */}
        <motion.svg 
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.1, pathLength: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="absolute top-20 right-[10%] w-64 h-64 text-neutral"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"
        >
          <path d="M12 2L5 22M12 2l7 20M5 22h14M12 2v2M12 7v3" />
        </motion.svg>

        {/* Sketch 2: Structural Lines */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '40%' }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-[20%] left-0 h-[1px] bg-neutral/10"
        />
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: '30%' }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-0 left-[20%] w-[1px] bg-neutral/10"
        />
      </div>

      {/* 3. SUBTLE PAPER TEXTURE (The Grain) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
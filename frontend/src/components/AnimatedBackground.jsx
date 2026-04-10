import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AnimatedBackground = () => {
  // 1. Mouse Coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Smooth the movement so the 'warp' feels fluid and heavy
  const springConfig = { damping: 40, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden bg-[#fdfaf6]">
      
      {/* THE WARPING GRID */}
      <motion.div 
        className="absolute inset-[-100px] opacity-20" // Extra margin to prevent edges showing
        style={{
          backgroundImage: `
            linear-gradient(#2d2424 1px, transparent 1px),
            linear-gradient(90deg, #2d2424 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          
          /* The Magic: This mask creates a 'hole' or 'void' around the cursor.
             The 'warp' feel comes from the grid lines 'fading out' as you approach them.
          */
          WebkitMaskImage: `radial-gradient(circle 120px at var(--x) var(--y), transparent 0%, black 100%)`,
          maskImage: `radial-gradient(circle 120px at var(--x) var(--y), transparent 0%, black 100%)`,
        }}
        // We update the CSS variables for the mask position dynamically
        animate={{
          "--x": `${smoothX.get()}px`,
          "--y": `${smoothY.get()}px`,
        }}
      />

      {/* SECONDARY LAYER: Subtle repulsion shift */}
      {/* This layer moves slightly away from the mouse to simulate 'pushing' the paper */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#2d2424 1px, transparent 1px),
            linear-gradient(90deg, #2d2424 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px',
          x: useSpring(useMotionValue(0), springConfig),
          y: useSpring(useMotionValue(0), springConfig),
        }}
      />

      {/* PAPER TEXTURE (Static) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
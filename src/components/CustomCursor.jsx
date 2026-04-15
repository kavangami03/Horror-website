import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('flicker') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="cursor-container" style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 100000 }}>
      {/* Outer Glow / Spectral Aura */}
      <motion.div
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isHovering ? 1.5 : 1,
          opacity: isMouseDown ? 0.8 : 0.4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Crosshair Brackets - Top Left */}
      <motion.div
        animate={{
          x: mousePosition.x - (isHovering ? 30 : 20),
          y: mousePosition.y - (isHovering ? 30 : 20),
          rotate: isMouseDown ? 45 : 0
        }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderTop: '2px solid var(--accent-color)',
          borderLeft: '2px solid var(--accent-color)',
        }}
      />

      {/* Crosshair Brackets - Top Right */}
      <motion.div
        animate={{
          x: mousePosition.x + (isHovering ? 20 : 10),
          y: mousePosition.y - (isHovering ? 30 : 20),
          rotate: isMouseDown ? -45 : 0
        }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderTop: '2px solid var(--accent-color)',
          borderRight: '2px solid var(--accent-color)',
        }}
      />

      {/* Crosshair Brackets - Bottom Left */}
      <motion.div
        animate={{
          x: mousePosition.x - (isHovering ? 30 : 20),
          y: mousePosition.y + (isHovering ? 20 : 10),
          rotate: isMouseDown ? -45 : 0
        }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderBottom: '2px solid var(--accent-color)',
          borderLeft: '2px solid var(--accent-color)',
        }}
      />

      {/* Crosshair Brackets - Bottom Right */}
      <motion.div
        animate={{
          x: mousePosition.x + (isHovering ? 20 : 10),
          y: mousePosition.y + (isHovering ? 20 : 10),
          rotate: isMouseDown ? 45 : 0
        }}
        style={{
          position: 'absolute',
          width: 10,
          height: 10,
          borderBottom: '2px solid var(--accent-color)',
          borderRight: '2px solid var(--accent-color)',
        }}
      />

      {/* The Central Glowing Core */}
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 2 : 1,
          backgroundColor: isMouseDown ? "#fff" : "#ff0000"
        }}
        style={{
          position: 'absolute',
          width: 8,
          height: 8,
          borderRadius: '50%',
          boxShadow: '0 0 15px #ff0000, 0 0 30px #8b0000',
        }}
      />

      {/* Flickering Red Lines (Visual Noise) */}
      <motion.div
        animate={{
          x: mousePosition.x - 50,
          y: mousePosition.y,
          opacity: [0, 0.2, 0, 0.1, 0],
          width: [0, 100, 0, 50, 0]
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          height: '1px',
          backgroundColor: 'red',
        }}
      />
    </div>
  );
};

export default CustomCursor;

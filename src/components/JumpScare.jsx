import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const faces = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThjNHBqMHJ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVun7i6AFXCXBW/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMThjNHBqMHJ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6ZTZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/uoK0LhQnIdH60B1yY6/giphy.gif"
];

const JumpScare = () => {
  const [show, setShow] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);

  useEffect(() => {
    const triggerScare = () => {
      // Random interval between 20 and 45 seconds
      const nextTime = Math.random() * 25000 + 20000;
      
      setTimeout(() => {
        setCurrentFace(Math.floor(Math.random() * faces.length));
        setShow(true);
        setTimeout(() => setShow(false), 150); // Flash for 150ms
        triggerScare();
      }, nextTime);
    };

    triggerScare();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20000,
            backgroundImage: `url(${faces[currentFace]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.5) grayscale(1) brightness(0.8)',
            pointerEvents: 'none'
          }}
        >
           <div style={{
             position: 'absolute',
             inset: 0,
             background: 'linear-gradient(rgba(139, 0, 0, 0.8), rgba(0,0,0,0.9))',
             mixBlendMode: 'multiply'
           }} />
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#8a0000',
              zIndex: 30000
            }}
           />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JumpScare;

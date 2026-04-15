import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="loader-overlay"
          exit={{ y: "-100%", transition: { duration: 1, ease: [0.7, 0, 0.3, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#050505',
            zIndex: 30000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loader-content"
          >
             <h2 style={{ 
               fontFamily: 'var(--heading-font)', 
               letterSpacing: '10px', 
               fontSize: '0.8rem', 
               color: 'var(--accent-color)',
               marginBottom: '20px'
             }}>
               ACCESSING CLASSIFIED ARCHIVE
             </h2>
             <div style={{ 
               width: '300px', 
               height: '2px', 
               background: 'rgba(255,255,255,0.05)', 
               position: 'relative' 
             }}>
                <motion.div 
                  style={{ 
                    position: 'absolute', 
                    height: '100%', 
                    background: 'var(--accent-color)', 
                    width: `${progress}%`,
                    boxShadow: '0 0 20px var(--accent-glow)'
                  }}
                />
             </div>
             <div style={{ 
               marginTop: '15px', 
               fontSize: '0.6rem', 
               fontFamily: 'monospace', 
               opacity: 0.5,
               textAlign: 'right'
             }}>
                {Math.round(progress)}% DECRYPTED
             </div>
          </motion.div>
          
          <div className="vhs-grain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

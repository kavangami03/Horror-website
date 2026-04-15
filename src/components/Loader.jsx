import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const horrorSubliminals = [
  "EYES OPEN", "WATCHING", "BEHIND YOU", "DONT BLINK", "ETERNAL SILENCE", "PROJECT OBSCURA"
];

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [subliminal, setSubliminal] = useState("");

  useEffect(() => {
    // Progress logic
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 1200); // Wait for final impact
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 150);

    // Subliminal logic (violent flicker)
    const subInterval = setInterval(() => {
       if (Math.random() > 0.7) {
          setSubliminal(horrorSubliminals[Math.floor(Math.random() * horrorSubliminals.length)]);
          setTimeout(() => setSubliminal(""), 50);
       }
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(subInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="advanced-loader"
          exit={{ 
            opacity: 0, 
            scale: 2,
            filter: 'blur(40px)',
            transition: { duration: 1.5, ease: [0.7, 0, 0.3, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* THE HEARTBEAT VISUALIZER */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, transparent 70%)',
              filter: 'blur(30px)'
            }}
          />

          <div className="loader-inner" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
             
             {/* SUBLIMINAL FLASH */}
             <div className="subliminal-wrap" style={{ height: '20px', marginBottom: '10px' }}>
                <AnimatePresence>
                   {subliminal && (
                     <motion.span 
                      initial={{ opacity: 1, scale: 1.5 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      style={{ color: '#ff0000', fontSize: '0.6rem', letterSpacing: '8px', fontWeight: 'bold' }}
                     >
                       {subliminal}
                     </motion.span>
                   )}
                </AnimatePresence>
             </div>

             <h2 className="loading-title glitch-text" data-text="CALIBRATING REALITY">
               CALIBRATING REALITY
             </h2>
             
             <div className="blood-bar-container">
                <div className="blood-fill" style={{ width: `${progress}%` }} />
                <div className="drip-point" style={{ left: `${progress}%` }} />
             </div>

             <div className="loader-stats">
                <div className="stat-item">
                   <span>NEURAL SYNC:</span>
                   <span>{Math.round(progress)}%</span>
                </div>
                <div className="stat-item">
                   <span>THREAT PROD:</span>
                   <span>STABLE</span>
                </div>
             </div>
          </div>

          <div className="noise-overlay" />
          
          <style jsx>{`
            .advanced-loader { cursor: none; }

            .loading-title {
              font-family: var(--heading-font);
              color: #fff;
              font-size: 1rem;
              letter-spacing: 12px;
              margin-bottom: 30px;
            }

            .blood-bar-container {
               width: 350px;
               height: 4px;
               background: rgba(255,255,255,0.02);
               position: relative;
               margin: 0 auto;
               border: 1px solid rgba(255,255,255,0.05);
            }

            .blood-fill {
               height: 100%;
               background: linear-gradient(90deg, #330000, #8b0000);
               box-shadow: 0 0 15px #8b0000;
               transition: width 0.3s ease-out;
            }

            .drip-point {
               position: absolute;
               top: -2px;
               width: 8px;
               height: 8px;
               background: #8b0000;
               border-radius: 50%;
               box-shadow: 0 0 10px #ff0000;
               transform: translateX(-50%);
            }

            .loader-stats {
               display: flex;
               justify-content: space-between;
               width: 350px;
               margin: 20px auto 0;
               font-family: monospace;
               font-size: 0.6rem;
               color: #444;
               text-transform: uppercase;
               letter-spacing: 2px;
            }

            .stat-item { display: flex; gap: 10px; }

            .noise-overlay {
               position: absolute;
               inset: 0;
               background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
               mix-blend-mode: overlay;
               opacity: 0.03;
               pointer-events: none;
            }

            @keyframes flicker {
               0% { opacity: 1; }
               50% { opacity: 0.8; }
               100% { opacity: 1; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

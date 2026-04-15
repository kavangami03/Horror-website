import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const horrorMessages = [
  "THE ABYSS IS LOOKING BACK.",
  "THEY ARE STANDING BEHIND YOU.",
  "DO NOT TURN AROUND.",
  "THE SILENCE IS SCREAMING.",
  "LEAVE WHILE YOU STILL CAN.",
  "THE VOID HAS NOTED YOUR ARRIVAL."
];

const WarningModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % horrorMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setConfirmed(true);
    setTimeout(() => setIsOpen(false), 800);
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="warning-overlay" style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#000',
      zIndex: 40000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {!confirmed && (
          <motion.div 
            className="warning-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            style={{
              textAlign: 'center',
              maxWidth: '600px',
              padding: '60px',
              border: '1px solid rgba(139, 0, 0, 0.3)',
              backgroundColor: '#050505',
              position: 'relative',
              zIndex: 10
            }}
          >
             <motion.div 
              animate={{ opacity: [1, 0.5, 1] }} 
              transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
              style={{ color: '#8b0000', fontSize: '0.7rem', letterSpacing: '5px', marginBottom: '30px' }}
             >
                EXTERNAL DATA HAZARD
             </motion.div>
             
             <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
                <AnimatePresence mode="wait">
                  <motion.h1 
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    transition={{ duration: 0.5 }}
                    className="glitch-text"
                    style={{ 
                      fontFamily: 'var(--heading-font)', 
                      fontSize: '2rem', 
                      lineHeight: '1.2', 
                      color: '#fff',
                      margin: 0
                    }}
                  >
                    {horrorMessages[messageIndex]}
                  </motion.h1>
                </AnimatePresence>
             </div>
             
             <p style={{ 
               fontSize: '0.9rem', 
               lineHeight: '1.8', 
               color: '#666', 
               marginBottom: '50px',
               letterSpacing: '1px'
             }}>
               This archive contains localized cognitohazards. Once seen, these events 
               cannot be unseen. By descending, you accept that your biological safety 
               is no longer our priority.
             </p>

             <div className="warning-actions" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button 
                  onClick={handleEnter}
                  style={{
                    background: '#8b0000',
                    color: '#fff',
                    border: 'none',
                    padding: '15px 40px',
                    fontFamily: 'var(--heading-font)',
                    letterSpacing: '3px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: '0.3s'
                  }}
                  className="hover-glow"
                >
                  I WILL WATCH
                </button>
                <button 
                  onClick={handleLeave}
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '1px solid #333',
                    padding: '15px 40px',
                    fontFamily: 'var(--heading-font)',
                    letterSpacing: '3px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  STAY SAFE
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="warning-bg">
         <div className="vhs-distort" />
         <motion.div 
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif")',
            backgroundSize: 'cover',
            mixBlendMode: 'overlay'
          }}
         />
      </div>

      <style jsx>{`
        .hover-glow:hover {
          box-shadow: 0 0 30px #8b0000;
          transform: translateY(-2px);
        }
        .vhs-distort {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%),
                      linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,255,0,0.02), rgba(0,0,255,0.05));
          background-size: 100% 4px, 3px 100%;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default WarningModal;

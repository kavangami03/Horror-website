import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignalModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 40000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}
          onClick={onClose}
        >
          <motion.div 
            className="signal-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '80%',
              maxWidth: '800px',
              border: '1px solid var(--accent-color)',
              background: '#0a0a0a',
              padding: '60px',
              textAlign: 'center'
            }}
          >
             <h2 className="heading red-glimmer">DECODING SIGNAL...</h2>
             <div className="wave-container" style={{ margin: '40px 0' }}>
                {[...Array(50)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      height: [5, Math.random() * 100, 5],
                      opacity: [0.2, 1, 0.2]
                    }}
                    transition={{ 
                      duration: 0.5 + Math.random(), 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      display: 'inline-block',
                      width: '4px',
                      background: 'var(--accent-color)',
                      margin: '0 2px'
                    }}
                  />
                ))}
             </div>
             <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.6 }}>
               SOURCE: UNKNOWN // FREQUENCY: 13.4Hz // STABILITY: 12%
             </p>
             <button 
              className="cta-btn" 
              style={{ marginTop: '40px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 30px', cursor: 'pointer' }}
              onClick={onClose}
             >
               TERMINATE SESSION
             </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignalModal;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const horrorMessages = [
  "BREACH DETECTED: LEVEL 9",
  "NEURAL RECEPTORS AT RISK",
  "DO NOT TURN AROUND.",
  "THEY ARE RECORDING YOU.",
  "LEAVE WHILE YOU STILL CAN.",
  "BIOLOGY IS AN ERROR."
];

const WarningModal = ({ onConfirm }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const modalRef = useRef(null);
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % horrorMessages.length);
    }, 4000);

    const handleMouseMove = (e) => {
      if (modalRef.current) {
        const rect = modalRef.current.getBoundingClientRect();
        setTargetPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleEnter = () => {
    setConfirmed(true);
    // Violent exit shake
    gsap.to(modalRef.current, {
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.5) * 50,
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      onComplete: () => {
        setIsOpen(false);
        if (onConfirm) onConfirm();
      }
    });
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="warning-overlay">
      <div className="crude-vignette" />
      
      <AnimatePresence mode="wait">
        {!confirmed && (
          <motion.div 
            ref={modalRef}
            className="breach-monitor"
            initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 2, filter: 'blur(50px)' }}
            transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
          >
            {/* MONITOR FRAME INTERFACE */}
            <div className="monitor-bezel">
               <div className="corner tl" />
               <div className="corner tr" />
               <div className="corner bl" />
               <div className="corner br" />
               
               <div className="top-status">
                  <div className="rec-group">
                     <div className="rec-dot" />
                     <span className="rec-label">LIVE FEED // SUBJECT: USER_01</span>
                  </div>
                  <div className="hazard-tag">EXT-DATA: HAZARD</div>
               </div>

               <div className="scanner-line" />
               
               {/* TARGETING BOX */}
               <motion.div 
                className="targeting-reticle"
                animate={{ x: targetPos.x - 40, y: targetPos.y - 40 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
               >
                  <div className="reticle-line l1" />
                  <div className="reticle-line l2" />
                  <div className="reticle-data">ACQUIRING...</div>
               </motion.div>

               <div className="monitor-content">
                  <div className="horror-title-wrap">
                    <AnimatePresence mode="wait">
                      <motion.h1 
                        key={messageIndex}
                        initial={{ opacity: 0, x: -20, skewX: 20 }}
                        animate={{ opacity: 1, x: 0, skewX: 0 }}
                        exit={{ opacity: 0, x: 20, skewX: -20, filter: 'blur(10px)' }}
                        className="monitor-title"
                      >
                        {horrorMessages[messageIndex]}
                      </motion.h1>
                    </AnimatePresence>
                  </div>

                  <p className="monitor-body">
                    <span className="bracket">[!]</span> WARNING: This archive contains localized cognitohazards. Once seen, these events cannot be unseen. 
                    Your safety is no longer guaranteed by the OBSCURA Protocol.
                  </p>

                  <div className="monitor-actions">
                     <button className="btn-monitor primary" onClick={handleEnter}>
                        <div className="btn-glitch" />
                        <span className="btn-text">I WILL WATCH</span>
                        <div className="btn-sub">PROCEED AT RISK</div>
                     </button>
                     <button className="btn-monitor secondary" onClick={handleLeave}>
                        <span className="btn-text">STAY SAFE</span>
                        <div className="btn-sub">RETURN TO SAFETY</div>
                     </button>
                  </div>
               </div>

               {/* TECHNICAL METADATA */}
               <div className="bottom-meta">
                  <div className="meta-col">
                     <div>ENCRYPTION: CRACKED</div>
                     <div>SIGNAL: UNSTABLE</div>
                  </div>
                  <div className="meta-col right">
                     <div>00:04:15:22</div>
                     <div>LOC: UNKNOWN</div>
                  </div>
               </div>
            </div>

            <div className="screen-reflection" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="background-interference">
         <div className="static-noise" />
         <div className="void-shadows" />
      </div>

      <style jsx>{`
        .warning-overlay {
          position: fixed;
          inset: 0;
          background: #000;
          z-index: 50000;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          overflow: hidden;
        }

        .crude-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 20%, #000 90%);
          z-index: 5;
          pointer-events: none;
        }

        .breach-monitor {
          position: relative;
          width: 850px;
          height: 600px;
          background: #050505;
          border: 2px solid #111;
          box-shadow: 0 0 100px rgba(0,0,0,1), 
                      inset 0 0 80px rgba(122, 0, 0, 0.1);
          z-index: 10;
          overflow: hidden;
        }

        .monitor-bezel {
          position: absolute;
          inset: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          padding: 40px;
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: #7a0000;
          border-style: solid;
          opacity: 0.6;
        }
        .tl { top: -5px; left: -5px; border-width: 2px 0 0 2px; }
        .tr { top: -5px; right: -5px; border-width: 2px 2px 0 0; }
        .bl { bottom: -5px; left: -5px; border-width: 0 0 2px 2px; }
        .br { bottom: -5px; right: -5px; border-width: 0 2px 2px 0; }

        .top-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
        }

        .rec-group { display: flex; align-items: center; gap: 10px; }
        .rec-dot {
          width: 8px;
          height: 8px;
          background: #ff0000;
          border-radius: 50%;
          box-shadow: 0 0 10px #ff0000;
          animation: blink 1s infinite step-end;
        }
        @keyframes blink { 50% { opacity: 0; } }
        
        .rec-label, .hazard-tag {
          font-family: monospace;
          font-size: 0.7rem;
          color: #444;
          letter-spacing: 2px;
        }
        .hazard-tag { color: #7a0000; border: 1px solid #7a0000; padding: 2px 10px; }

        .scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(122, 0, 0, 0.3);
          box-shadow: 0 0 10px #7a0000;
          z-index: 20;
          animation: scan 4s infinite linear;
          pointer-events: none;
        }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        .targeting-reticle {
          position: absolute;
          width: 80px;
          height: 80px;
          pointer-events: none;
          z-index: 15;
          opacity: 0.4;
        }
        .reticle-line { position: absolute; background: #7a0000; }
        .l1 { top: 0; left: 0; width: 100%; height: 1px; }
        .l2 { top: 0; left: 0; width: 1px; height: 100%; }
        .reticle-data { font-family: monospace; font-size: 0.5rem; color: #7a0000; position: absolute; bottom: -15px; }

        .monitor-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 10;
        }

        .monitor-title {
          font-family: var(--heading-font);
          font-size: 3.5rem;
          line-height: 1;
          color: #fff;
          margin-bottom: 30px;
          letter-spacing: -2px;
          text-transform: uppercase;
        }

        .monitor-body {
          font-family: monospace;
          color: #888;
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 50px;
          letter-spacing: 1px;
        }
        .bracket { color: #7a0000; margin-right: 5px; }

        .monitor-actions { display: flex; gap: 30px; }

        .btn-monitor {
          background: transparent;
          border: 1px solid #333;
          padding: 20px 40px;
          cursor: pointer;
          position: relative;
          min-width: 250px;
          transition: all 0.3s cubic-bezier(0.7, 0, 0.3, 1);
          overflow: hidden;
        }

        .btn-monitor.primary { background: #7a0000; border-color: #7a0000; }
        .btn-monitor.primary:hover { 
          background: #8b0000;
          box-shadow: 0 0 40px rgba(139, 0, 0, 0.4);
          transform: scale(1.05);
        }

        .btn-monitor.secondary:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.05);
        }

        .btn-text {
          display: block;
          font-family: var(--heading-font);
          color: #fff;
          font-size: 0.9rem;
          letter-spacing: 5px;
          margin-bottom: 5px;
        }

        .btn-sub {
          font-family: monospace;
          color: rgba(255,255,255,0.3);
          font-size: 0.6rem;
          letter-spacing: 2px;
        }

        .bottom-meta {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
          font-family: monospace;
          font-size: 0.6rem;
          color: #333;
          letter-spacing: 2px;
        }

        .screen-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%);
          pointer-events: none;
        }

        .background-interference { position: absolute; inset: 0; pointer-events: none; }
        .static-noise { 
          position: absolute; 
          inset: 0; 
          background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif"); 
          opacity: 0.05; 
          mix-blend-mode: overlay; 
        }

        @media (max-width: 900px) {
          .breach-monitor { width: 95vw; height: 80vh; }
          .monitor-title { font-size: 2rem; }
          .monitor-actions { flex-direction: column; width: 100%; align-items: center; }
          .btn-monitor { width: 100%; min-width: unset; }
        }
      `}</style>
    </div>
  );
};

export default WarningModal;


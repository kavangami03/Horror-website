import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const horrorSubliminals = [
  "IT SEES YOU", "BREATHING", "DO NOT LOOK BACK", "THEY ARE HERE", "BLOOD IS DEBT", "CLOSE YOUR EYES", "WAKE UP", "FOREVER"
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [subliminal, setSubliminal] = useState("");
  const loaderRef = useRef(null);
  const ritualRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Progress logic with "stuttering" effect for tension
    let currentProgress = 0;
    const updateProgress = () => {
      const increment = Math.random() * 5;
      currentProgress += increment;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setTimeout(() => {
          setComplete(true);
          if (onComplete) onComplete();
        }, 1500);
      } else {
        setProgress(currentProgress);
        // Random stutter delays
        const delay = Math.random() > 0.8 ? 500 : 50;
        setTimeout(updateProgress, delay);
      }
    };
    updateProgress();

    // Violent subliminal flashes
    const subInterval = setInterval(() => {
      if (Math.random() > 0.75) {
        setSubliminal(horrorSubliminals[Math.floor(Math.random() * horrorSubliminals.length)]);
        setTimeout(() => setSubliminal(""), 40);
        
        // Shake the whole screen on flash
        if (loaderRef.current) {
          gsap.to(loaderRef.current, {
            x: (Math.random() - 0.5) * 15,
            y: (Math.random() - 0.5) * 15,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
            onComplete: () => gsap.set(loaderRef.current, { x: 0, y: 0 })
          });
        }
      }
    }, 450);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(subInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate circular stroke
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          ref={loaderRef}
          className="horror-ritual-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.5,
            filter: 'blur(100px) brightness(0)',
            transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] }
          }}
        >
          {/* VISCERAL BACKGROUND LAYERS */}
          <div className="vignette-heavy" />
          <div className="atmospheric-flicker" />
          <div className="signal-noise" />
          <div className="film-grain" />
          
          <div className="ritual-wrapper">
             <div className="ritual-container">
                {/* THE EYE / CORE */}
                <div className="eye-wrapper">
                   <motion.div 
                    className="eye-outer"
                    animate={{ 
                      scale: [1, 1.05, 0.95, 1],
                      rotateX: [0, 5, -5, 0],
                      rotateY: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                   >
                     <div className="eye-iris">
                        <div 
                          className="eye-pupil"
                          style={{
                            transform: `translate(${(mousePos.x - window.innerWidth/2) * 0.03}px, ${(mousePos.y - window.innerHeight/2) * 0.03}px)`
                          }}
                        />
                     </div>
                     <div className="eye-veins" />
                   </motion.div>
                </div>

                {/* RITUAL CIRCLE LOADER */}
                <svg className="ritual-svg" viewBox="0 0 200 200">
                  <defs>
                    <filter id="horrorBlur">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
                    </filter>
                  </defs>
                  <circle
                    className="ritual-track"
                    cx="100"
                    cy="100"
                    r={radius}
                  />
                  <motion.circle
                    className="ritual-progress"
                    cx="100"
                    cy="100"
                    r={radius}
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ type: "spring", damping: 15, stiffness: 40 }}
                    filter="url(#horrorBlur)"
                  />
                  
                  {/* Occult symbols appearing around the ring */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <motion.text
                      key={i}
                      x={100 + (radius + 22) * Math.cos((angle * Math.PI) / 180)}
                      y={100 + (radius + 22) * Math.sin((angle * Math.PI) / 180)}
                      className="occult-symbol"
                      animate={{ 
                        opacity: progress > (i * 12.5) ? [0.2, 0.7, 0.4] : 0,
                        scale: progress > (i * 12.5) ? [1, 1.1, 1] : 0
                      }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() }}
                    >
                      {["ᚦ", "ᚧ", "ᚨ", "ᚩ", "ᚪ", "ᚫ", "ᚬ", "ᚭ"][i]}
                    </motion.text>
                  ))}
                </svg>
             </div>

             {/* PROGRESS TEXT - POSITIONED BELOW RITUAL */}
             <div className="loading-meta">
                <h2 className="glitch-title" data-text="SYMPATHETIC RESONANCE">
                  SYMPATHETIC RESONANCE
                </h2>
                <div className="percentage-wrap">
                   <span className="current-pct">{Math.round(progress)}</span>
                   <span className="pct-label">%</span>
                </div>
                <div className="status-msg">
                   {progress < 30 && ">> SCANNING DIMENSIONAL RIFT..."}
                   {progress >= 30 && progress < 60 && ">> CONNECTING TO THE VOID..."}
                   {progress >= 60 && progress < 90 && ">> FEEDING THE ENTITY..."}
                   {progress >= 90 && ">> ACCESS GRANTED. RUN."}
                </div>
             </div>
          </div>

          {/* SUBLIMINAL OVERLAY */}
          <AnimatePresence>
            {subliminal && (
              <motion.div 
                className="subliminal-impact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
              >
                {subliminal}
              </motion.div>
            )}
          </AnimatePresence>

          <style jsx>{`
            .horror-ritual-loader {
              position: fixed;
              inset: 0;
              background: #000;
              z-index: 1000000;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              cursor: none;
            }

            .vignette-heavy {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 40%, #000 85%);
              z-index: 1;
              animation: breathe-bg 8s infinite ease-in-out;
            }

            @keyframes breathe-bg {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 1; }
            }

            .atmospheric-flicker {
              position: absolute;
              inset: 0;
              background: #7a0000;
              z-index: 2;
              opacity: 0;
              mix-blend-mode: multiply;
              pointer-events: none;
              animation: violent-flicker 4s infinite step-end;
            }

            @keyframes violent-flicker {
              0% { opacity: 0; }
              2% { opacity: 0.1; }
              3% { opacity: 0; }
              10% { opacity: 0.05; }
              11% { opacity: 0; }
              50% { opacity: 0.08; }
              51% { opacity: 0; }
              98% { opacity: 0.15; }
              99% { opacity: 0; }
            }

            .signal-noise {
              position: absolute;
              inset: 0;
              background: repeating-linear-gradient(
                0deg,
                transparent,
                rgba(255, 255, 255, 0.03) 1px,
                transparent 2px
              );
              background-size: 100% 3px;
              z-index: 3;
              pointer-events: none;
              animation: scanlines 0.2s infinite linear;
            }

            @keyframes scanlines {
              from { background-position: 0 0; }
              to { background-position: 0 100%; }
            }

            .film-grain {
              position: absolute;
              inset: 0;
              background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
              opacity: 0.15;
              z-index: 4;
              pointer-events: none;
              mix-blend-mode: overlay;
            }

            .ritual-wrapper {
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              transform: translateY(-20px); /* Visual balance */
            }

            .ritual-container {
              position: relative;
              width: 400px;
              height: 400px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .eye-wrapper {
              position: absolute;
              width: 120px;
              height: 120px;
              z-index: 5;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .eye-outer {
              width: 100px;
              height: 100px;
              background: #fdfdfd;
              border-radius: 60% 5% 60% 5%;
              transform: rotate(45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              box-shadow: 0 0 50px rgba(139, 0, 0, 0.4), inset 0 0 25px rgba(0,0,0,0.8);
              border: 3px solid #300;
              position: relative;
            }

            .eye-iris {
              width: 55px;
              height: 55px;
              background: radial-gradient(circle, #000 15%, #5a0000 40%, #8b0000 70%, #200 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              filter: contrast(1.8) brightness(0.8);
              box-shadow: 0 0 15px rgba(255,0,0,0.3);
            }

            .eye-pupil {
              width: 18px;
              height: 30px;
              background: #000;
              border-radius: 50%;
              box-shadow: 0 0 12px #000;
              transition: transform 0.1s ease-out;
            }

            .ritual-svg {
              width: 100%;
              height: 100%;
              transform: rotate(-90deg);
              position: absolute;
              inset: 0;
            }

            .ritual-track {
              fill: none;
              stroke: rgba(255, 255, 255, 0.05);
              stroke-width: 1;
            }

            .ritual-progress {
              fill: none;
              stroke: #8b0000;
              stroke-width: 3;
              stroke-linecap: round;
              filter: drop-shadow(0 0 8px #ff0000);
            }

            .occult-symbol {
              fill: #8b0000;
              font-family: serif;
              font-size: 18px;
              text-anchor: middle;
              dominant-baseline: middle;
              text-shadow: 0 0 10px rgba(255,0,0,0.5);
            }

            .loading-meta {
              margin-top: 40px;
              text-align: center;
              width: 100%;
            }

            .glitch-title {
              font-family: var(--heading-font);
              color: #ff0000;
              font-size: 0.9rem;
              letter-spacing: 12px;
              margin-bottom: 25px;
              text-transform: uppercase;
              opacity: 0.8;
              text-shadow: 0 0 15px rgba(139,0,0,0.5);
            }

            .percentage-wrap {
              font-family: var(--heading-font);
              color: #eee;
              font-size: 3.5rem;
              line-height: 0.8;
              margin-bottom: 15px;
              font-weight: 700;
            }

            .pct-label {
              font-size: 1rem;
              letter-spacing: 2px;
              color: #555;
              margin-left: 5px;
            }

            .status-msg {
              font-family: monospace;
              font-size: 0.65rem;
              color: #8b0000;
              letter-spacing: 3px;
              text-transform: uppercase;
              height: 20px;
              opacity: 0.6;
            }

            .subliminal-impact {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 100;
              color: #fff;
              font-family: var(--heading-font);
              font-size: 10rem;
              font-weight: 900;
              letter-spacing: -5px;
              text-shadow: 0 0 50px #ff0000;
              pointer-events: none;
              mix-blend-mode: color-dodge;
              text-align: center;
              background: rgba(122, 0, 0, 0.4);
            }

            @media (max-width: 600px) {
              .ritual-container { width: 300px; height: 300px; }
              .percentage-wrap { font-size: 2.5rem; }
              .subliminal-impact { font-size: 3rem; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;



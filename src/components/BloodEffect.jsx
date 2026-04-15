import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BloodEffect = ({ intensity = 3, speed = 15 }) => {
  const [drips, setDrips] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (drips.length >= intensity) {
        setDrips(prev => prev.slice(1));
      }
      
      const newDrip = {
        id: Date.now() + Math.random(),
        left: (Math.random() * 90 + 5) + '%',
        size: Math.random() * 25 + 15,
        duration: Math.random() * speed + speed
      };
      setDrips(prev => [...prev, newDrip]);
    }, 5000);

    return () => clearInterval(interval);
  }, [drips, intensity, speed]);

  return (
    <div className="viscous-blood-layer" style={{ 
      position: 'absolute', 
      inset: 0, 
      pointerEvents: 'none', 
      overflow: 'hidden',
      zIndex: 0
    }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="viscous-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#viscous-liquid)', width: '100%', height: '100%' }}>
        {/* Top Pool */}
        <div style={{
          position: 'absolute',
          top: -30,
          left: 0,
          width: '100%',
          height: '60px',
          background: '#300000',
          boxShadow: '0 0 40px #1a0000'
        }} />

        {drips.map(drip => (
          <motion.div
            key={drip.id}
            initial={{ y: -50, height: drip.size }}
            animate={{ 
              y: '100%', 
              height: [drip.size, drip.size * 10, drip.size],
              scaleX: [1, 0.7, 1.3, 1]
            }}
            transition={{ duration: drip.duration, ease: "linear" }}
            style={{
              position: 'absolute',
              left: drip.left,
              width: drip.size,
              background: 'linear-gradient(to bottom, #300000, #5a0000 80%, #7a0000)',
              borderRadius: '0 0 100% 100%',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.8), inset -2px -2px 5px rgba(255,255,255,0.1)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BloodEffect;

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const moveButton = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const resetButton = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mousemove', moveButton);
    button.addEventListener('mouseleave', resetButton);

    return () => {
      button.removeEventListener('mousemove', moveButton);
      button.removeEventListener('mouseleave', resetButton);
    };
  }, []);

  return (
    <button ref={buttonRef} className={className}>
      {children}
    </button>
  );
};

export default MagneticButton;

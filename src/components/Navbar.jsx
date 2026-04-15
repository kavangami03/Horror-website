import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Investigations', path: '/investigations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
        className="main-nav"
      >
        <Link to="/" className="nav-logo flicker">
          OBSCURA
        </Link>

        {/* Desktop Nav */}
        <ul className="desktop-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path} 
                className={`nav-link flicker ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X color="white" /> : <Menu color="white" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="mobile-menu-container">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                >
                  <Link 
                    to={link.path} 
                    className="mobile-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .main-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 30px 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          mix-blend-mode: difference;
        }

        .nav-blood {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 80px;
           background: linear-gradient(to bottom, rgba(122, 0, 0, 0.4) 0%, transparent 100%);
           pointer-events: none;
           animation: pulse-drip 3s infinite ease-in-out;
        }

        @keyframes pulse-drip {
          0%, 100% { height: 80px; opacity: 0.5; transform: scaleY(1); }
          50% { height: 200px; opacity: 0.8; transform: scaleY(1.2); }
        }

        .nav-logo {
          font-family: var(--heading-font);
          font-size: 1.5rem;
          font-weight: bold;
          color: #fff;
          letter-spacing: 0.3em;
        }

        .desktop-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-link {
          font-family: var(--body-font);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #fff;
          opacity: 0.6;
          transition: 0.3s;
        }

        .nav-link.active {
          opacity: 1;
          color: var(--accent-color);
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 2000;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #050505;
          z-index: 1500;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
          text-align: center;
        }

        .mobile-link {
          font-family: var(--heading-font);
          font-size: 2.5rem;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        @media (max-width: 900px) {
          .main-nav {
            padding: 20px 30px;
          }
          .desktop-links {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

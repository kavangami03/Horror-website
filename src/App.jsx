import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import BloodEffect from './components/BloodEffect';
import JumpScare from './components/JumpScare';
import Loader from './components/Loader';
import WarningModal from './components/WarningModal';
import Home from './pages/Home';
import About from './pages/About';
import Investigations from './pages/Investigations';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  const handleFinishIntro = () => {
    setShowIntro(false);
  };

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {showIntro && (
          <div className="intro-sequence" key="intro">
            {!isLoaded ? (
              <Loader key="loader" onComplete={() => setIsLoaded(true)} />
            ) : (
              <WarningModal key="modal" onConfirm={handleFinishIntro} />
            )}
          </div>
        )}
      </AnimatePresence>
      <ScrollToTop />
      <CustomCursor />
      <JumpScare />
      <div className="grain" />
      <div className="vignette" />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
}

export default App;

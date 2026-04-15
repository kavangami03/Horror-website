import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '../components/Transition';
import MagneticButton from '../components/MagneticButton';
import BloodEffect from '../components/BloodEffect';

// Images
import homeHero from '/C:/Users/softqube/.gemini/antigravity/brain/be6ffcca-4c3b-4674-8441-e8749a322839/cinematic_horror_location_1_1776254658454.png';
import glassHands from '../assets/images/glass-hands.png';
import cursedDoll from '../assets/images/cursed-doll.png';
import investigation1 from '../assets/images/investigation-1.png';
import investigation2 from '../assets/images/investigation-2.png';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [flashlightPos, setFlashlightPos] = useState({ x: 50, y: 50 });
  const [thermalMode, setThermalMode] = useState(false);
  const [glitchText, setGlitchText] = useState("OBSCURA");
  const [isDescending, setIsDescending] = useState(false);

  const handleDescend = () => {
    setIsDescending(true);
    setGlitchText("LEAVE NOW");
    
    // Violent shake and glitch
    gsap.to(heroRef.current, { 
      x: () => (Math.random() - 0.5) * 20, 
      y: () => (Math.random() - 0.5) * 20, 
      duration: 0.1, 
      repeat: 5, 
      yoyo: true,
      onComplete: () => {
        gsap.to(heroRef.current, { x: 0, y: 0, duration: 0.1 });
        setGlitchText("OBSCURA");
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => setIsDescending(false), 1000);
      }
    });

    // Flash screen red
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed;inset:0;background:#7a0000;z-index:50000;pointer-events:none;opacity:0.8;mix-blend-mode:multiply;';
    document.body.appendChild(flash);
    gsap.to(flash, { opacity: 0, duration: 0.5, onComplete: () => flash.remove() });
  };

  useEffect(() => {
    // Torch movement
    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setFlashlightPos({ x, y });
    };

    // Glitch Text logic
    const glitchInterval = setInterval(() => {
       const phrases = ["OBSCURA", "THEY WATCH", "YOU ARE NEXT", "RUN", "OBSCURA"];
       if (Math.random() > 0.8) {
          setGlitchText(phrases[Math.floor(Math.random() * phrases.length)]);
          setTimeout(() => setGlitchText("OBSCURA"), 150);
       }
    }, 4000);

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Responsive Media
    let mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => {
      // Horizontal scroll
      const sections = gsap.utils.toArray('.horizontal-section');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal-wrapper",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + document.querySelector(".horizontal-wrapper").offsetWidth
        }
      });
    });

    return () => {
       window.removeEventListener('mousemove', handleMouseMove);
       mm.revert();
       clearInterval(glitchInterval);
    };
  }, []);

  return (
    <PageWrapper>
      <div className="home-container" ref={containerRef}>
        
        {/* SECTION: HERO with Thermal & Torch */}
        <section 
          className="hero-section" 
          ref={heroRef}
          style={{
            cursor: 'none',
            background: thermalMode ? '#1a3300' : '#050505',
            transition: 'background 0.5s ease'
          }}
        >
          {/* Main Background Image */}
          <div className="hero-bg">
             <img 
               src={homeHero} 
               alt="Void" 
               style={{ 
                 filter: thermalMode ? 'invert(1) hue-rotate(90deg) brightness(1.5) contrast(2)' : 'brightness(0.5)' 
               }}
             />
             <div className="shadow-entity" style={{ 
               left: flashlightPos.x + '%', 
               top: flashlightPos.y + '%',
               opacity: thermalMode ? 1 : 0
             }} />
          </div>

          <div 
            className="torch-mask"
            style={{
              background: `radial-gradient(circle at ${flashlightPos.x}% ${flashlightPos.y}%, transparent 100px, rgba(0,0,0,0.95) 250px)`
            }}
          />

          <div className="hero-content">
            <motion.div 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: [0.7, 0, 0.3, 1] }}
              className="title-wrap"
            >
               <span className="thermal-label">{thermalMode ? "SENSOR BRIGHTNESS: MAX" : "IR SENSOR: ENGAGED"}</span>
               <h1 className="glitch-text main-title" data-text={glitchText}>{glitchText}</h1>
            </motion.div>
            <p className="cinematic-text reveal-item">A Journey Into The Unexplained</p>
            
            <div className="hero-actions">
              <MagneticButton 
                className={`enter-btn primary ${isDescending ? 'active' : ''}`}
                onClick={handleDescend}
                style={{ scale: isDescending ? 0.9 : 1 }}
              >
                {isDescending ? "DECODING..." : "DESCEND"}
              </MagneticButton>
              <button 
                className={`thermal-toggle ${thermalMode ? 'active' : ''}`}
                onClick={() => setThermalMode(!thermalMode)}
              >
                {thermalMode ? "[ NIGHT VISION OFF ]" : "[ NIGHT VISION ON ]"}
              </button>
            </div>
          </div>
          
          <div className="vhs-scanlines" />
        </section>

        {/* SECTION 1: The Intro */}
        <section id="intro" className="section-padding intro-section">
          <div className="container">
             <div className="split-layout">
                <div className="left-content">
                   <h2 className="heading reveal-title">Reality is a <br/><span className="red-glimmer">Thin Veil</span></h2>
                   <p className="reveal-item">
                     Most people go their entire lives without seeing the cracks. 
                     We live in the gaps. We document the shadows that move when 
                     the world isn't looking.
                   </p>
                   <div className="accent-bar" onClick={() => window.location.href = '/about'} style={{cursor: 'none'}} />
                </div>
                <div className="right-content parallax-wrap" onClick={() => window.location.href = '/investigations'}>
                   <img src={glassHands} alt="Unseen" />
                   <div className="overlay-text">[ SUBJECT 88 ]</div>
                </div>
             </div>
          </div>
        </section>

        {/* SECTION 2: Horizontal Scroll Archive */}
        <div className="horizontal-wrapper">
          <div className="horizontal-section">
             <div className="section-inner container">
                <div className="scroll-content">
                   <span className="label">THE VOID ARCHIVE</span>
                   <h2 className="heading large">UNSOLVED <br /> FILES</h2>
                   <p>A collection of sightings dating back to the first breach.</p>
                </div>
                <div className="scroll-img-wrap">
                   <img src={investigation1} alt="Archive" />
                </div>
             </div>
          </div>

          <div className="horizontal-section bg-red">
             <div className="section-inner container">
                <div className="scroll-content">
                   <span className="label">COGNITIVE HAZARD</span>
                   <h2 className="heading large">THE RED <br /> SIGNAL</h2>
                   <p>Do not attempt to decrypt the residual frequencies.</p>
                </div>
                <div className="scroll-img-wrap">
                   <img src={investigation2} alt="Danger" />
                </div>
             </div>
          </div>
          
          <div className="horizontal-section">
             <div className="section-inner container">
                <div className="scroll-content">
                   <span className="label">LOCALIZED BREACH</span>
                   <h2 className="heading large">SHADOW <br /> PERSONS</h2>
                   <p>They are not reflections. They are not ghosts. They are here.</p>
                </div>
                <div className="scroll-img-wrap">
                   <img src={glassHands} alt="Shadows" />
                </div>
             </div>
          </div>
        </div>

        {/* SECTION 3: Discovery Grid */}
        <section className="section-padding evidence-section">
           <div className="container">
              <h2 className="heading centered reveal-title">The Evidence Room</h2>
              <div className="discovery-grid">
                 <div className="grid-item tall reveal-item" onClick={() => window.location.href = '/investigations'}>
                    <img src={cursedDoll} alt="Doll" />
                    <div className="info"><h3>Cursed Relics</h3></div>
                 </div>
                 <div className="grid-item reveal-item" onClick={() => window.location.href = '/gallery'}>
                    <img src={investigation1} alt="Chair" />
                    <div className="info"><h3>Anomalies</h3></div>
                 </div>
                 <div className="grid-item reveal-item" onClick={() => window.location.href = '/investigations'}>
                    <img src={investigation1} alt="Attic" />
                    <div className="info"><h3>Locations</h3></div>
                 </div>
                 <div className="grid-item wide reveal-item" onClick={() => window.location.href = '/investigations'}>
                    <img src={investigation2} alt="Shadow" />
                    <div className="info"><h3>Entity Sighting</h3></div>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: Final Warning */}
        <section className="final-section">
           <div className="horror-gradient" />
           <BloodEffect intensity={3} speed={15} />
           <div className="container centered">
              <motion.h2 
                className="heading giant flicker"
                whileInView={{ opacity: [0, 1, 0.5, 1], scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                YOU WERE <br /> NOT INVITED.
              </motion.h2>
              <p className="reveal-item">But now that you're here, why leave?</p>
              <div className="footer-links">
                 <MagneticButton 
                  className="cta-secondary"
                  onClick={() => window.location.href = '/investigations'}
                 >
                   Explore The Archive
                 </MagneticButton>
              </div>
           </div>
        </section>

        <style jsx>{`
          .home-container {
            background-color: #050505;
          }

          /* HERO SECTION */
          .hero-section {
            height: 100vh;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .hero-bg {
            position: absolute;
            inset: 0;
            z-index: 1;
          }

          .hero-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: filter 0.5s ease;
          }

          .shadow-entity {
            position: absolute;
            width: 150px;
            height: 250px;
            background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
            filter: grayscale(1) brightness(0.5) blur(15px);
            mix-blend-mode: color-dodge;
            transform: translate(-50%, -50%);
            transition: opacity 0.5s;
            pointer-events: none;
          }

          .torch-mask {
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
          }

          .hero-content {
            position: relative;
            z-index: 10;
            text-align: center;
          }

          .main-title {
            font-size: clamp(4rem, 15vw, 12rem);
            line-height: 0.8;
            margin-bottom: 20px;
          }

          .thermal-label {
            display: block;
            font-family: monospace;
            color: #00ff00;
            font-size: 0.7rem;
            letter-spacing: 4px;
            margin-bottom: 15px;
            opacity: 0.6;
          }

          .hero-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            margin-top: 50px;
          }

          .enter-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            padding: 22px 60px;
            font-family: var(--heading-font);
            letter-spacing: 6px;
            font-size: 0.7rem;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.6s cubic-bezier(0.7, 0, 0.3, 1);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          .enter-btn:hover {
            background: rgba(139, 0, 0, 0.1);
            border-color: #7a0000;
            box-shadow: 0 0 40px rgba(122, 0, 0, 0.3);
            letter-spacing: 10px;
          }

          .thermal-toggle {
            background: transparent;
            border: 1px solid rgba(0, 255, 0, 0.3);
            color: #00ff00;
            font-family: monospace;
            padding: 12px 25px;
            font-size: 0.6rem;
            letter-spacing: 3px;
            cursor: pointer;
            transition: 0.3s;
          }

          .thermal-toggle.active {
            background: #00ff00;
            color: #000;
            box-shadow: 0 0 20px #00ff00;
          }

          .vhs-scanlines {
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 50%);
            background-size: 100% 4px;
            z-index: 5;
            pointer-events: none;
          }

          /* INTRO SECTION */
          .intro-section {
            background: #050505;
          }

          .split-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 100px;
            align-items: center;
          }

          @media (max-width: 900px) {
            .split-layout { grid-template-columns: 1fr; gap: 50px; }
          }

          .reveal-title { font-size: 4rem; margin-bottom: 30px; }
          .left-content p { 
            font-size: 1.4rem; 
            color: #ffffff; 
            line-height: 1.8; 
            opacity: 0.9;
          }
          .accent-bar { width: 100px; height: 1px; background: #8b0000; margin-top: 50px; }

          .parallax-wrap {
            position: relative;
            height: 600px;
            overflow: hidden;
            cursor: pointer;
          }

          .parallax-wrap img { width: 100%; height: 100%; object-fit: cover; }
          .overlay-text { position: absolute; bottom: 30px; right: 30px; font-family: monospace; font-size: 0.7rem; color: var(--accent-color); }

          /* HORIZONTAL SCROLL */
          .horizontal-wrapper {
            display: flex;
            width: 300%;
            height: 100vh;
          }

          .horizontal-section {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            background: #000;
          }

          .bg-red { background: #1a0000; }

          .section-inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 100px;
            align-items: center;
          }

          .scroll-content .label { color: #8b0000; letter-spacing: 5px; font-size: 0.7rem; margin-bottom: 20px; display: block; }
          .scroll-content h2 { font-size: 6.5rem; line-height: 0.9; margin-bottom: 30px; }
          .scroll-content p { font-size: 1.3rem; color: #ffffff; line-height: 1.6; max-width: 500px; }
          .scroll-img-wrap { height: 70vh; overflow: hidden; }
          .scroll-img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); }

          /* FINAL SECTION */
          .final-section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #000;
          }

          .horror-gradient {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, transparent 80%);
          }

          .giant { font-size: clamp(4rem, 15vw, 15rem); line-height: 0.8; text-align: center; }

          .centered { text-align: center; position: relative; z-index: 10; }
        `}</style>
      </div>
    </PageWrapper>
  );
};

export default Home;

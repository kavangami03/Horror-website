import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/Transition';
import aboutHero from '../assets/images/about-hero.png';
import hands from '../assets/images/glass-hands.png';
import { Shield, Skull, Eye, Activity, Database, AlertTriangle } from 'lucide-react';
import BloodEffect from '../components/BloodEffect';

const About = () => {
  const [flicker, setFlicker] = useState(false);

  const protocols = [
    { icon: <Shield size={32} />, title: "CONTAINMENT", desc: "Non-corporeal entities must be localized using spectral anchors." },
    { icon: <Activity size={32} />, title: "RESONANCE", desc: "Always monitor the 13.4Hz fear-frequency during field operations." },
    { icon: <Skull size={32} />, title: "MORTALITY", desc: "Biological observers are expendable. Data integrity is absolute." },
    { icon: <Database size={32} />, title: "ARCHIVING", desc: "Every shadow must be assigned a case number and a containment cell." },
  ];

  const timeline = [
    { year: "1894", event: "The First Breach. Sovereign Hill Asylum ceases to exist in this dimension." },
    { year: "1942", event: "Project Obscura is funded as a classified military research initiative." },
    { year: "1988", event: "Discovery of 'The Veil'—a thin membrane separating us from the silent ones." },
    { year: "2024", event: "Localized breaches increasing. The silence is becoming audible." },
  ];

  return (
    <PageWrapper>
      <div className="about-page">
        {/* HERO */}
        <section className="about-hero" onMouseEnter={() => setFlicker(true)} onMouseLeave={() => setFlicker(false)}>
           <div className="hero-overlay" />
           <div className="hero-img-container">
              <img src={aboutHero} alt="Foundation" className={flicker ? 'flicker-heavy' : ''} />
           </div>
           <div className="container">
              <div className="hero-text-wrap">
                 <motion.span 
                  initial={{ opacity:0, y: 20 }}
                  animate={{ opacity:1, y: 0 }}
                  className="sub-label"
                 >
                   EST. 1942 // DECLASSIFIED FILES
                 </motion.span>
                 <motion.h1 
                  className="heading large-text glitch-text" 
                  data-text="THE OBSCURA FOUNDATION"
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  transition={{ delay: 0.5 }}
                 >
                   THE OBSCURA FOUNDATION
                 </motion.h1>
                 <p className="hero-desc">Monitoring the shadows since the first breach.</p>
              </div>
           </div>
           <div className="vhs-scanlines" />
        </section>

        {/* MISSION SECTION */}
        <section className="mission-section section-padding">
           <div className="container">
              <div className=" mission-grid">
                 <div className="mission-left">
                    <h2 className="heading reveal-title">The Foundation was built on <br/><span className="red-glimmer">Lies and Blood.</span></h2>
                    <p className="description">
                      They tell you we are researchers. They tell you we are safe. 
                      But the Foundation's true mission is not observation—it is containment. 
                      Every brick of this vault was laid by someone who no longer exists.
                    </p>
                    <p className="description">
                       We seek the truth, even if that truth consumes us. The silence 
                       has a voice, and it has been calling our names for decades.
                    </p>
                    <div className="accent-line" />
                 </div>
                 <div className="mission-right">
                    <div className="redacted-box">
                       <h3>[ INTERNAL MEMO #001 - HIGH SECURITY ]</h3>
                       <p>
                        Subject 401 is <span className="redacted">STILL WATCHING US</span> through the camera feed. 
                        Do not <span className="redacted">BLINK</span> when entering the chamber. 
                        The Foundation is <span className="redacted">CONNECTED TO THE ABYSS</span>.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* PROTOCOLS SECTION */}
        <section className="protocols-section section-padding bg-darker">
           <div className="container">
              <h2 className="heading centered reveal-title">Containment Protocols</h2>
              <div className="protocol-grid">
                 {protocols.map((p, i) => (
                   <motion.div 
                    key={i}
                    className="protocol-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                   >
                     <div className="icon-wrap">{p.icon}</div>
                     <h3>{p.title}</h3>
                     <p>{p.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* PERSONNEL SECTION (NEW) */}
        <section className="personnel-section section-padding">
           <div className="container">
              <span className="label">REDACTED PERSONNEL</span>
              <h2 className="heading">The Lost Ones</h2>
              <div className="personnel-grid">
                 <div className="person-card">
                    <div className="avatar-wrap"><div className="static-avatar" /></div>
                    <h3>DR. ARIS THORNE</h3>
                    <p>STATUS: MIA [VOID DISPLACEMENT]</p>
                 </div>
                 <div className="person-card">
                    <div className="avatar-wrap"><div className="static-avatar" /></div>
                    <h3>AGENT K. VANCE</h3>
                    <p>STATUS: TERMINATED [PSYCHOLOGICAL COLLAPSE]</p>
                 </div>
                 <div className="person-card">
                    <div className="avatar-wrap"><div className="static-avatar" /></div>
                    <h3>DIR. ELIAS VANE</h3>
                    <p>STATUS: UNKNOWN [LAST SEEN IN SECTOR 13]</p>
                 </div>
              </div>
           </div>
        </section>

        {/* PSYCHOLOGICAL MIRROR (NEW) */}
        <section className="mirror-section section-padding bg-darker">
           <div className="container split-layout">
              <div className="left">
                 <span className="label">REFLECTIVE ANOMALY</span>
                 <h2 className="heading">The Mirror <br/> Effect</h2>
                 <p className="description">
                   They don't just watch you. They reflect you. The entities in the gaps 
                   are biological mirrors, amplifying your deepest cognitive fears until 
                   reality begins to tear.
                 </p>
                 <div className="flicker-data">[ DATA SENSITIVITY: 98% ]</div>
              </div>
              <motion.div 
                className="mirror-box"
                whileHover={{ filter: 'hue-rotate(90deg) contrast(2)' }}
              >
                 <div className="static-layer" />
                 <div className="mirror-text">YOU ARE NOT ALONE</div>
              </motion.div>
           </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="timeline-section section-padding">
           <div className="container">
              <div className="timeline-layout">
                 <div className="timeline-img">
                    <img src={hands} alt="The Breach" />
                    <div className="thermal-overlay" />
                    <div className="timestamp">[ DATE ERROR: 00/00/0000 ]</div>
                 </div>
                 <div className="timeline-content">
                    <h2 className="heading">The Timeline <br/>of Extinction</h2>
                    <div className="timeline-items">
                       {timeline.map((t, i) => (
                         <div key={i} className="timeline-item">
                            <span className="year">{t.year}</span>
                            <p>{t.event}</p>
                         </div>
                       ))}
                    </div>
                    <button className="cta-secondary" onClick={() => window.location.href = '/investigations'}>Access Blackbox</button>
                 </div>
              </div>
           </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="closing-section section-padding bg-accent" style={{ position: 'relative' }}>
           <BloodEffect intensity={4} speed={10} />
           <div className="container centered">
              <AlertTriangle size={64} className="warning-icon flicker" />
              <h2 className="heading giant">WE SEE YOU.</h2>
              <p>The Foundation is not just an organization. It is an invitation to be forgotten.</p>
              <button className="contact-btn" onClick={() => window.location.href = '/contact'}>Report a Sighting</button>
           </div>
        </section>

        <style jsx>{`
          .about-hero {
            height: 90vh;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          .flicker-heavy { animation: flicker 0.1s infinite; filter: brightness(2) contrast(2) grayscale(1) !important; }

          .hero-img-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }

          .hero-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(1) brightness(0.4) contrast(1.2);
            transition: 0.3s;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, #050505 0%, transparent 60%),
                        linear-gradient(to top, #050505 0%, transparent 40%);
            z-index: 2;
          }

          .hero-text-wrap {
            position: relative;
            z-index: 10;
            max-width: 800px;
          }

          .vhs-scanlines {
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 50%);
            background-size: 100% 4px;
            z-index: 5;
            pointer-events: none;
          }

          .large-text {
            font-size: clamp(3rem, 10vw, 8rem);
            line-height: 0.9;
            margin: 20px 0;
          }

          /* Protocol Grid - Restored & Enhanced */
          .protocol-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 30px;
            margin-top: 80px;
          }

          @media (max-width: 1100px) { .protocol-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 650px) { .protocol-grid { grid-template-columns: 1fr; } }

          .protocol-card {
            background: rgba(255, 255, 255, 0.02);
            padding: 50px 30px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            text-align: center;
            transition: all 0.5s cubic-bezier(0.7, 0, 0.3, 1);
            position: relative;
          }

          .protocol-card:hover {
            background: rgba(139, 0, 0, 0.05);
            border-color: var(--accent-color);
            transform: translateY(-10px);
            box-shadow: 0 10px 40px rgba(122, 0, 0, 0.2);
          }

          .icon-wrap {
            color: var(--accent-color);
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            transition: 0.3s;
          }

          .protocol-card:hover .icon-wrap {
            animation: flicker 0.2s infinite;
            transform: scale(1.2);
          }

          .protocol-card h3 {
            font-size: 1.1rem;
            letter-spacing: 3px;
            margin-bottom: 20px;
            color: #fff;
          }

          .protocol-card p {
            font-size: 0.9rem;
            color: #888;
            line-height: 1.6;
          }

          .protocol-card:hover p { color: #fff; }

          /* Personnel Section */
          .personnel-grid {
             display: grid;
             grid-template-columns: repeat(3, 1fr);
             gap: 40px;
             margin-top: 60px;
          }

          @media (max-width: 900px) { .personnel-grid { grid-template-columns: 1fr; } }

          .person-card {
             background: rgba(255,255,255,0.02);
             padding: 40px;
             border: 1px solid rgba(255,255,255,0.05);
             text-align: center;
          }

          .avatar-wrap {
             width: 100px;
             height: 120px;
             background: #111;
             margin: 0 auto 30px;
             position: relative;
             overflow: hidden;
          }

          .static-avatar {
             width: 100%;
             height: 100%;
             background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
             mix-blend-mode: overlay;
             opacity: 0.3;
          }

          .person-card h3 { font-size: 0.9rem; letter-spacing: 3px; margin-bottom: 10px; }
          .person-card p { font-size: 0.6rem; color: var(--accent-color); font-family: monospace; }

          .timestamp { position: absolute; top: 30px; left: 30px; font-family: monospace; font-size: 0.7rem; color: var(--accent-color); z-index: 10; }

          /* Timeline section */
          .timeline-layout {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 100px;
            align-items: center;
          }

          @media (max-width: 900px) { .timeline-layout { grid-template-columns: 1fr; gap: 50px; } }

          .year { font-size: 2rem; color: var(--accent-color); }

          .giant { font-size: 10vw; line-height: 0.8; }

          .cta-secondary {
            background: transparent;
            border: 1px solid #fff;
            color: #fff;
            padding: 15px 40px;
            font-family: var(--heading-font);
            letter-spacing: 3px;
            cursor: pointer;
          }

          .contact-btn {
            background: #fff; color: #000; border: none; padding: 20px 60px;
            font-family: var(--heading-font); letter-spacing: 4px; margin-top: 50px;
            cursor: pointer;
            transition: 0.3s;
          }

          .contact-btn:hover {
             background: var(--accent-color);
             color: #fff;
             box-shadow: 0 0 40px var(--accent-color);
          }

          .red-glimmer { text-shadow: 0 0 10px var(--accent-color); }
          .bg-darker { background: #020202; }
          .centered { text-align: center; }
          .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
          @media (max-width: 900px) { .split-layout { grid-template-columns: 1fr; } }

          .mirror-box {
             height: 400px;
             background: #111;
             border: 1px solid rgba(255,255,255,0.05);
             position: relative;
             display: flex;
             align-items: center;
             justify-content: center;
             overflow: hidden;
             cursor: none;
          }

          .static-layer {
             position: absolute;
             inset: 0;
             background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
             mix-blend-mode: overlay;
             opacity: 0.1;
          }

          .mirror-text {
             font-family: var(--heading-font);
             font-size: 1.5rem;
             letter-spacing: 10px;
             color: #222;
             transition: 0.5s;
          }

          .mirror-box:hover .mirror-text {
             color: var(--accent-color);
             text-shadow: 0 0 20px var(--accent-color);
             transform: scale(1.1);
          }

          .flicker-data { font-family: monospace; font-size: 0.7rem; color: #444; margin-top: 30px; animation: flicker 0.5s infinite; }
        `}</style>
      </div>
    </PageWrapper>
  );
};

export default About;

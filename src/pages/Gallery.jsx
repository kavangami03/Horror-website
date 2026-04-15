import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/Transition';
import { Camera, Eye, Zap, Search } from 'lucide-react';

// Images
import gallery1 from '../assets/images/gallery-1.png';
import gallery2 from '../assets/images/gallery-2.png';
import homeHero from '../assets/images/home-hero.png';
import aboutHero from '../assets/images/about-hero.png';
import inv1 from '../assets/images/investigation-1.png';
import inv2 from '../assets/images/investigation-2.png';
import doll from '../assets/images/cursed-doll.png';
import hands from '../assets/images/glass-hands.png';

const galleryItems = [
  { id: 1, url: gallery1, title: 'THE SILENT CHAIR', type: 'Static Observation', desc: 'Object moved 4cm during the 8-hour exposure.' },
  { id: 2, url: gallery2, title: 'VOID REFLECTION', type: 'Mirror Anomaly', desc: 'Subject does not appear in the reflection.' },
  { id: 3, url: homeHero, title: 'THE MIST GATES', type: 'Ethereal Fog', desc: 'Temperature dropped to -20°C in the center of the frame.' },
  { id: 4, url: hands, title: 'FROST CONTACT', type: 'Physical Manifestation', desc: 'Prints appeared while the room was locked from outside.' },
  { id: 5, url: doll, title: 'MOURNING BRIDE', type: 'Cursed Object', desc: 'Audible weeping recorded during development.' },
  { id: 6, url: inv1, title: 'ATTIC RESIDUE', type: 'Residual Aura', desc: 'Light streaks following a 1924 tragedy.' },
  { id: 7, url: inv2, title: 'ST. JUDE SHADOW', type: 'Shadow Person', desc: 'Silhouette absorbed all IR illumination.' },
  { id: 8, url: aboutHero, title: 'FOUNDATION VAULT', type: 'Secure Archive', desc: 'Deep storage for objects too dangerous for observation.' },
  { id: 9, url: gallery1, title: 'THE SECOND SEAT', type: 'Doppelganger', desc: 'Identical chair appeared in the negative.' },
  { id: 10, url: hands, title: 'VEIL BREACH', type: 'Structural Anomaly', desc: 'Glass integrity compromised by non-corporeal pressure.' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('ALL');

  const filteredItems = filter === 'ALL' 
    ? galleryItems 
    : galleryItems.filter(item => item.type.toUpperCase().includes(filter));

  return (
    <PageWrapper>
      <div className="gallery-page">
        {/* Header with Visual Noise */}
        <header className="gallery-header section-padding">
          <div className="static-overlay" />
          <div className="container">
            <motion.div
              initial={{ opacity: 0, letterSpacing: '2em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 2 }}
            >
              <h1 className="heading glitch-text" data-text="THE SPECTRAL GALLERY">THE SPECTRAL GALLERY</h1>
            </motion.div>
            <p className="cinematic-text red-glimmer">Developed in the absence of light.</p>
            
            {/* Visual Filter Bar */}
            <div className="filter-bar">
               {['ALL', 'STATIC', 'ANOMALY', 'CONTACT', 'CURSED'].map((f) => (
                 <button 
                  key={f} 
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                 >
                   {f}
                 </button>
               ))}
            </div>
          </div>
        </header>

        {/* Masonry Grid with Hover Static */}
        <section className="gallery-grid-section">
          <div className="container">
            <div className="grid-container">
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="gallery-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="img-wrap">
                    <img src={item.url} alt={item.title} />
                    <div className="card-static" />
                    <div className="card-overlay">
                       <div className="card-info">
                          <span className="type">{item.type}</span>
                          <h3 className="heading">{item.title}</h3>
                          <p>{item.desc}</p>
                          <div className="view-link">
                             <Search size={14} /> EXAMINE NEGATIVE
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="card-frame" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox / Detail View */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
               <div className="lightbox-bg" onClick={() => setSelectedImage(null)} />
               <motion.div 
                className="lightbox-content"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
               >
                 <button className="close-btn" onClick={() => setSelectedImage(null)}><Zap size={24} /></button>
                 <div className="lightbox-grid">
                    <div className="lightbox-img">
                       <img src={selectedImage.url} alt="Detail" />
                       <div className="grid-lines" />
                    </div>
                    <div className="lightbox-text">
                       <span className="label">ANALYSIS REPORT</span>
                       <h2 className="heading red-glimmer">{selectedImage.title}</h2>
                       <div className="meta-info">
                          <div className="meta-item"><span>TYPE</span> {selectedImage.type}</div>
                          <div className="meta-item"><span>SENSOR</span> IR-800 MODIFIED</div>
                          <div className="meta-item"><span>EXPOSURE</span> 0.003s</div>
                       </div>
                       <p className="description">
                          Analysis of the digital negative reveals a displacement of light particles 
                          that does not match ambient conditions. Physical evidence suggests a 
                          momentary localized breach of the veil at the point of capture.
                       </p>
                       <div className="tags">
                          <span>#UNSTABLE</span> <span>#CLASS-C</span> <span>#VISUAL-STATIC</span>
                       </div>
                       <button className="cta-btn" onClick={() => window.location.href = '/contact'}>Report sighting</button>
                    </div>
                 </div>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .gallery-page {
            padding-top: 100px;
            background: #050505;
          }

          .gallery-header {
            text-align: center;
            position: relative;
            overflow: hidden;
            min-height: 40vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .static-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
            opacity: 0.05;
            pointer-events: none;
          }

          .filter-bar {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 50px;
            flex-wrap: wrap;
          }

          .filter-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.1);
            color: #666;
            padding: 10px 25px;
            font-family: var(--body-font);
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: 0.4s;
          }

          .filter-btn.active, .filter-btn:hover {
            color: var(--accent-color);
            border-color: var(--accent-color);
            box-shadow: 0 0 15px var(--accent-glow);
          }

          /* Grid Container */
          .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            padding-bottom: 100px;
          }

          @media (max-width: 1100px) { .grid-container { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 700px) { .grid-container { grid-template-columns: 1fr; } }

          .gallery-card {
            position: relative;
            background: #0a0a0a;
            cursor: none;
            overflow: hidden;
          }

          .img-wrap {
            position: relative;
            height: 450px;
            overflow: hidden;
          }

          .img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(1) brightness(0.6);
            transition: 1s cubic-bezier(0.2, 1, 0.3, 1);
          }

          .gallery-card:hover img {
            filter: grayscale(0.2) brightness(1);
            scale: 1.1;
          }

          .card-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 40px;
            background: linear-gradient(transparent, rgba(0,0,0,0.9));
            transform: translateY(20px);
            opacity: 0;
            transition: 0.4s ease;
          }

          .gallery-card:hover .card-overlay {
            transform: translateY(0);
            opacity: 1;
          }

          .type {
            font-size: 0.6rem;
            color: var(--accent-color);
            letter-spacing: 3px;
            text-transform: uppercase;
          }

          .card-info p {
            font-size: 0.9rem;
            color: #888;
            margin: 15px 0 25px;
            line-height: 1.6;
          }

          .view-link {
            font-family: var(--heading-font);
            font-size: 0.7rem;
            display: flex;
            align-items: center;
            gap: 8px;
            letter-spacing: 2px;
            color: #fff;
          }

          .card-static {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
            opacity: 0;
            mix-blend-mode: overlay;
            pointer-events: none;
            transition: 0.3s;
          }

          .gallery-card:hover .card-static {
            opacity: 0.1;
          }

          /* Lightbox */
          .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
          }

          .lightbox-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(15px);
          }

          .lightbox-content {
            position: relative;
            background: #0a0a0a;
            width: 100%;
            max-width: 1200px;
            border: 1px solid rgba(255,255,255,0.1);
            z-index: 10;
          }

          .close-btn {
            position: absolute;
            top: 30px;
            right: 30px;
            background: transparent;
            border: none;
            color: #fff;
            cursor: pointer;
            z-index: 20;
          }

          .lightbox-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          @media (max-width: 900px) {
            .lightbox-grid { grid-template-columns: 1fr; }
            .lightbox { padding: 0; }
          }

          .lightbox-img {
            position: relative;
            height: 600px;
            overflow: hidden;
          }

          .lightbox-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .grid-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              linear-gradient(rgba(139,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,0,0,0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
          }

          .lightbox-text {
            padding: 80px;
          }

          @media (max-width: 600px) { .lightbox-text { padding: 40px 20px; } .lightbox-img { height: 350px; } }

          .label {
            font-size: 0.7rem;
            color: var(--accent-color);
            letter-spacing: 5px;
            display: block;
            margin-bottom: 20px;
          }

          .meta-info {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            margin: 40px 0;
            border-top: 1px solid rgba(255,255,255,0.05);
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding: 20px 0;
          }

          .meta-item span {
            display: block;
            font-size: 0.5rem;
            color: #555;
            letter-spacing: 2px;
            margin-bottom: 5px;
          }

          .meta-item {
            font-size: 0.8rem;
          }

          .description {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #888;
            margin-bottom: 40px;
          }

          .tags {
            display: flex;
            gap: 15px;
            margin-bottom: 50px;
          }

          .tags span {
            font-size: 0.6rem;
            color: var(--accent-color);
            border: 1px solid rgba(139,0,0,0.3);
            padding: 5px 12px;
          }

          .cta-btn {
            background: var(--accent-color);
            color: #fff;
            border: none;
            padding: 15px 40px;
            font-family: var(--heading-font);
            letter-spacing: 4px;
            text-transform: uppercase;
            cursor: pointer;
            width: 100%;
          }
        `}</style>
      </div>
    </PageWrapper>
  );
};

export default Gallery;

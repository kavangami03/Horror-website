import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/Transition';
import { Shield, AlertCircle, Eye, Radio, ExternalLink, Filter } from 'lucide-react';
import SignalModal from '../components/SignalModal';

// Images
import inv1 from '../assets/images/investigation-1.png';
import inv2 from '../assets/images/investigation-2.png';
import doll from '../assets/images/cursed-doll.png';
import hands from '../assets/images/glass-hands.png';
import gallery2 from '../assets/images/gallery-2.png';

const cases = [
  {
    id: 'CASE-[#2-401]',
    title: 'THE WEAPONIZED ECHO',
    location: 'Sovereign Hill Asylum',
    date: 'February 12, 1984',
    description: 'A sound frequency that causes spontaneous internal bleeding. The source is a music box that plays a melody not composed on this earth.',
    image: inv1,
    status: 'CONTAINED',
    level: 'LEVEL-4',
    threat: 'HIGH'
  },
  {
    id: 'CASE-[#8-112]',
    title: 'THE FROST WITNESS',
    location: 'Lake Placid, NY',
    date: 'January 23, 2004',
    description: 'Thermal anomalies manifesting as handprints on every window within a 2-mile radius. The prints originate from the outside, but the entity appears to be underwater.',
    image: hands,
    status: 'ACTIVE',
    level: 'LEVEL-5',
    threat: 'CRITICAL'
  },
  {
    id: 'CASE-[#4-009]',
    title: 'THE MOURNING BRIDE',
    location: 'Thorne Estate',
    date: 'March 03, 1912',
    description: 'A porcelain doll that alters its location when not observed. Recording devices fail consistently in its presence, showing only static.',
    image: doll,
    status: 'UNSTABLE',
    level: 'LEVEL-3',
    threat: 'MODERATE'
  },
  {
    id: 'CASE-[#1-332]',
    title: 'THE SHADOW DISPLACEMENT',
    location: 'Greater London Area',
    date: 'Continuous since 1958',
    description: 'A manifest silhouette that absorbs 100% of incoming light. Subject is non-corporeal but exhibits heavy territorial behavior.',
    image: inv2,
    status: 'MONITORED',
    level: 'LEVEL-2',
    threat: 'LOW'
  },
  {
    id: 'CASE-[#9-555]',
    title: 'THE VOID MIRROR',
    location: 'Paris Catacombs',
    date: 'October 31, 2018',
    description: 'A mirror that reflects the room as it appeared 400 years ago. Individuals entered the mirror and have not been recovered.',
    image: gallery2,
    status: 'LOST',
    level: 'LEVEL-5',
    threat: 'EXTREME'
  },
];

const Investigations = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredCases = activeTab === 'ALL' 
    ? cases 
    : cases.filter(c => c.status === activeTab);

  return (
    <PageWrapper>
      <div className="investigations-page">
        <SignalModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        
        {/* TOP TICKER */}
        <div className="ticker-wrap">
           <div className="ticker">
              {[...Array(10)].map((_, i) => (
                <span key={i}>ALERT: BREACH IN SECTOR 7 // LEVEL-5 ENTITY DETECTED // </span>
              ))}
           </div>
        </div>

        <header className="page-header section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <h1 className="heading extra-large glitch-text" data-text="FIELD INVESTIGATIONS">FIELD INVESTIGATIONS</h1>
              <p className="cinematic-text red-glimmer">Real-time data from localized breaches.</p>
            </motion.div>

            {/* STATUS FILTER */}
            <div className="status-filter">
               <div className="filter-label"><Filter size={16} /> Filter by Status:</div>
               <div className="filter-btns">
                  {['ALL', 'ACTIVE', 'CONTAINED', 'UNSTABLE', 'LOST'].map(status => (
                    <button 
                      key={status}
                      className={activeTab === status ? 'active' : ''}
                      onClick={() => setActiveTab(status)}
                    >
                      {status}
                    </button>
                  ))}
               </div>
            </div>
          </div>
        </header>

        {/* INVESTIGATION LIST */}
        <section className="case-list-section container">
           {filteredCases.map((item, index) => (
             <motion.div 
              key={item.id}
              className="case-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
             >
                <div className="case-image">
                   <img src={item.image} alt={item.title} />
                   <div className="image-overlay">
                      <div className="thermal-grain" />
                      <span className="rec-dot">● REC</span>
                   </div>
                   <div className="case-status-tag">{item.status}</div>
                </div>

                <div className="case-content">
                   <div className="case-header">
                      <span className="case-id">{item.id}</span>
                      <div className="threat-level">
                         THREAT: <span className={item.threat}>{item.threat}</span>
                      </div>
                   </div>
                   <h2 className="heading">{item.title}</h2>
                   <div className="case-meta">
                      <div className="meta-row"><span>LOCATION:</span> {item.location}</div>
                      <div className="meta-row"><span>DATE:</span> {item.date}</div>
                      <div className="meta-row"><span>AUTH:</span> {item.level}</div>
                   </div>
                   <p className="case-desc">{item.description}</p>
                   <div className="case-actions">
                      <button className="action-btn primary" onClick={() => window.location.href = '/contact?case=' + item.id}>
                         OPEN DOSSIER <ExternalLink size={14} />
                      </button>
                      <button className="action-btn secondary" onClick={() => setModalOpen(true)}>VIEW SIGNAL</button>
                   </div>
                </div>
             </motion.div>
           ))}
        </section>

        {/* BOTTOM CTA */}
        <section className="investigation-footer section-padding centered">
           <div className="container">
              <Radio size={48} className="flicker" />
              <h2 className="heading">Do you have evidence?</h2>
              <p>We pay for verified high-resolution captures of unknown entities.</p>
              <button className="submit-evidence-btn" onClick={() => window.location.href = '/contact'}>SUBMIT DATA</button>
           </div>
        </section>

        <style jsx>{`
          .investigations-page {
            padding-top: 100px;
            background: #050505;
          }

          .ticker-wrap {
            width: 100%;
            overflow: hidden;
            background: var(--accent-color);
            padding: 10px 0;
          }

          .ticker {
            white-space: nowrap;
            display: inline-block;
            animation: ticker 30s linear infinite;
            font-family: var(--body-font);
            font-size: 0.7rem;
            font-weight: bold;
            color: #fff;
            letter-spacing: 2px;
          }

          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .extra-large { font-size: clamp(3rem, 12vw, 8rem); line-height: 1; margin-bottom: 20px; }

          /* Status Filter */
          .status-filter {
            margin-top: 60px;
            display: flex;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap;
          }

          .filter-label { font-size: 0.8rem; display: flex; align-items: center; gap: 10px; color: #555; }

          .filter-btns { display: flex; gap: 10px; flex-wrap: wrap; }

          .filter-btns button {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            color: #777;
            padding: 8px 15px;
            font-size: 0.7rem;
            font-family: var(--body-font);
            cursor: pointer;
            transition: 0.3s;
          }

          .filter-btns button.active, .filter-btns button:hover {
            background: var(--accent-color);
            color: #fff;
            border-color: var(--accent-color);
          }

          /* Case List */
          .case-list-section { margin-top: 100px; padding-bottom: 200px; }

          .case-item {
            display: grid;
            grid-template-columns: 0.8fr 1fr;
            gap: 80px;
            margin-bottom: 150px;
            background: rgba(255,255,255,0.01);
            border: 1px solid rgba(255,255,255,0.03);
            padding: 40px;
          }

          @media (max-width: 900px) { .case-item { grid-template-columns: 1fr; gap: 40px; padding: 20px; } }

          .case-image {
            position: relative;
            height: 500px;
            overflow: hidden;
          }

          .case-image img {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(1) brightness(0.6);
          }

          .image-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
          }

          .thermal-grain {
            width: 100%; height: 100%;
            background: url("https://media.giphy.com/media/oEI9uWUicKgL0kL8L3/giphy.gif");
            mix-blend-mode: overlay; opacity: 0.05;
          }

          .rec-dot {
            position: absolute;
            top: 20px; left: 20px;
            color: var(--accent-color);
            font-family: var(--heading-font);
            font-size: 0.7rem;
            animation: pulse-red 1s infinite;
          }

          @keyframes pulse-red {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }

          .case-status-tag {
            position: absolute;
            bottom: 20px; right: 20px;
            background: var(--accent-color);
            color: #fff;
            padding: 5px 15px;
            font-size: 0.6rem;
            letter-spacing: 2px;
            font-weight: bold;
          }

          /* Case Content */
          .case-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            align-items: center;
          }

          .case-id { font-size: 0.8rem; color: var(--accent-color); letter-spacing: 4px; }
          .threat-level { font-size: 0.7rem; letter-spacing: 2px; color: #555; }
          .CRITICAL, .EXTREME { color: #ff0000; font-weight: bold; }
          .HIGH { color: #ff6600; }

          .case-item h2 { font-size: 2.5rem; margin-bottom: 30px; }

          .case-meta { 
            margin-bottom: 40px; 
            display: flex; flex-direction: column; gap: 10px;
            font-size: 0.8rem; letter-spacing: 2px; opacity: 0.6;
          }

          .meta-row span { color: var(--accent-color); }

          .case-desc { font-size: 1.1rem; line-height: 1.7; color: #888; margin-bottom: 50px; }

          .case-actions { display: flex; gap: 20px; }

          .action-btn {
            background: transparent; border: 1px solid rgba(255,255,255,0.1);
            color: #fff; padding: 15px 30px; 
            font-family: var(--heading-font); letter-spacing: 2px;
            cursor: pointer; display: flex; align-items: center; gap: 10px;
            transition: 0.3s;
          }

          .action-btn.primary:hover { background: #fff; color: #000; border-color: #fff; }
          .action-btn.secondary:hover { border-color: var(--accent-color); color: var(--accent-color); }

          /* Footer */
          .submit-evidence-btn {
            background: var(--accent-color); border: none; color: #fff;
            padding: 20px 60px; font-family: var(--heading-font);
            letter-spacing: 4px; margin-top: 50px; cursor: pointer;
          }

          .centered { text-align: center; }
          .flicker { color: var(--accent-color); margin-bottom: 40px; animation: flicker 2s infinite; }
        `}</style>
      </div>
    </PageWrapper>
  );
};

export default Investigations;

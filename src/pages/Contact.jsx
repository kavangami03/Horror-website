import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageWrapper from '../components/Transition';
import { Check, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <div className="contact-page">
        {/* BACKGROUND PLOT LAYER */}
        <div className={`scanning-overlay ${isTyping ? 'active' : ''}`}>
           <div className="scanner-line" />
           <div className="eye-bg"><Eye size={300} /></div>
        </div>

        <section className="contact-hero section-padding">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-info">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="terminal-header"
                >
                   <span className="status-dot">● CONNECTED TO NODE-7</span>
                   <h1 className="heading">Breach Reporting</h1>
                </motion.div>
                
                <p className="cinematic-text">Every sighting is a localized puncture in reality. Report your findings before they find you.</p>
                
                <div className="warning-box">
                   <AlertTriangle size={20} />
                   <p>WARNING: This channel is monitored by trans-dimensional intelligence. 13.4Hz encryption active.</p>
                </div>

                <div className="details">
                  <div className="detail-item">
                    <span className="label">The Vault (Physical Node)</span>
                    <p>REDACTED // Blackwood Lane <br /> Shadow Glen, OR</p>
                  </div>
                  <div className="detail-item">
                    <span className="label">Digital Echo</span>
                    <p>echo@obscura.terminal</p>
                  </div>
                </div>
              </div>

              <motion.div 
                className="contact-form-wrapper"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form 
                      key="form"
                      className="contact-form"
                      onSubmit={handleSubmit}
                      exit={{ opacity: 0, y: -20 }}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setIsTyping(false)}
                    >
                      <div className="form-group">
                        <label>Witness Identification</label>
                        <input type="text" placeholder="Subject Name / Alias" required />
                      </div>
                      <div className="form-group">
                        <label>Response Channel</label>
                        <input type="email" placeholder="Secure Email / IP" required />
                      </div>
                      <div className="form-group">
                        <label>Anomalous Incident Report</label>
                        <textarea rows="5" placeholder="Describe the visual or auditory breach..." required></textarea>
                      </div>
                      <div className="disclaimer">
                         By clicking below, you acknowledge that we already know your GPS coordinates.
                      </div>
                      <button type="submit" className="submit-btn glitch-hover">TRANSMIT DATA</button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      className="success-msg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ShieldCheck size={64} color="var(--accent-color)" />
                      <h2 className="heading large">SIGNAL LOCKED</h2>
                      <div className="success-plot">
                         <p>Data successfully decrypted. We are analyzing the residue.</p>
                         <p className="red-glimmer">Remain where you are. We are sending an extraction team to your current location.</p>
                         <div className="geo-tag">[ COORDINATES: 45.523062, -122.676482 ]</div>
                      </div>
                      <button className="reset-btn" onClick={() => setSubmitted(false)}>ABORT SESSION</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        <style jsx>{`
          .contact-page {
            padding-top: 100px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: #050505;
            position: relative;
            overflow: hidden;
          }

          /* SCANNIG EFFECT */
          .scanning-overlay {
             position: absolute;
             inset: 0;
             opacity: 0;
             pointer-events: none;
             transition: 0.5s;
             z-index: 1;
          }

          .scanning-overlay.active { opacity: 0.1; }

          .scanner-line {
             position: absolute;
             top: 0; left: 0; width: 100%; height: 2px;
             background: var(--accent-color);
             box-shadow: 0 0 20px var(--accent-color);
             animation: scan 4s linear infinite;
          }

          @keyframes scan {
             0% { top: 0; }
             100% { top: 100%; }
          }

          .eye-bg {
             position: absolute;
             top: 50%; left: 50%;
             transform: translate(-50%, -50%);
             opacity: 0.2;
             color: #fff;
          }

          .contact-layout {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 100px;
            align-items: center;
            position: relative;
            z-index: 10;
          }

          @media (max-width: 900px) {
            .contact-layout {
              grid-template-columns: 1fr;
              gap: 60px;
            }
          }

          .status-dot {
             font-family: monospace;
             font-size: 0.7rem;
             color: #00ff00;
             letter-spacing: 2px;
             margin-bottom: 20px;
             display: block;
          }

          .warning-box {
             background: rgba(139, 0, 0, 0.1);
             border: 1px solid rgba(139, 0, 0, 0.3);
             padding: 20px;
             margin: 40px 0;
             display: flex;
             gap: 15px;
             color: #8b0000;
             font-size: 0.75rem;
             letter-spacing: 1px;
             font-family: monospace;
          }

          .contact-form {
            background: rgba(255, 255, 255, 0.01);
            padding: 60px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
          }

          .form-group { margin-bottom: 30px; }
          .form-group label { display: block; text-transform: uppercase; font-size: 0.6rem; letter-spacing: 2px; color: #555; margin-bottom: 10px; }
          .form-group input, .form-group textarea {
             width: 100%; background: transparent; border: none; border-bottom: 1px solid #222;
             padding: 15px 0; color: #fff; font-family: var(--body-font);
             transition: 0.4s;
          }
          .form-group input:focus, .form-group textarea:focus { border-bottom-color: var(--accent-color); outline: none; }

          .disclaimer { font-size: 0.6rem; color: #444; margin-bottom: 30px; }

          .submit-btn {
             width: 100%; padding: 20px; background: transparent; border: 1px solid var(--accent-color);
             color: #fff; font-family: var(--heading-font); letter-spacing: 4px; cursor: pointer; transition: 0.4s;
          }
          .submit-btn:hover { background: var(--accent-color); box-shadow: 0 0 30px var(--accent-color); }

          /* Success Plot */
          .success-msg {
             background: rgba(255,255,255,0.02);
             padding: 80px 40px;
             border: 1px solid var(--accent-color);
             text-align: center;
          }

          .success-plot { margin-top: 40px; }
          .success-plot p { margin-bottom: 20px; font-size: 1.1rem; line-height: 1.6; }
          .red-glimmer { color: var(--accent-color); font-weight: bold; }
          .geo-tag { font-family: monospace; font-size: 0.8rem; opacity: 0.5; margin-top: 30px; }

          .reset-btn {
             margin-top: 50px; background: transparent; border: 1px solid #333;
             color: #666; padding: 10px 30px; font-family: var(--heading-font);
             cursor: pointer; font-size: 0.7rem;
          }

          .details { margin-top: 60px; }
          .label { color: var(--accent-color); letter-spacing: 4px; font-size: 0.6rem; display: block; margin-bottom: 10px; }
          .detail-item p { font-size: 1.1rem; color: #777; }
        `}</style>
      </div>
    </PageWrapper>
  );
};

export default Contact;

'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DesignExplanationModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // SVG Data for WhatsApp & Instagram
  const whatsappSvg = (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#25D366' }}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );

  const instagramSvg = (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E1306C' }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 5, 5, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '20px'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              height: 'calc(100vh - 40px)', // Fixed safe height
              background: 'var(--cream)',
              borderRadius: '32px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.05)',
              color: 'var(--black)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden' // Trap the inner scroll
            }}
          >
            {/* Header Area (Fixed) */}
            <div style={{ padding: '30px', background: '#fff', flexShrink: 0, zIndex: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <button 
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  zIndex: 20
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              >
                <X size={20} />
              </button>

              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '5px', lineHeight: 1, paddingRight: '40px' }}>HouseZrl Headquarters</h2>
              <p style={{ color: 'rgba(5,5,5,0.6)', fontSize: '1rem' }}>Global Command for God Layout Architecture.</p>
            </div>

            {/* Content Area (Scrollable) */}
            <div className="modal-scroll-info" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', background: 'rgba(0,0,0,0.02)' }}>
              
              {/* Left Side: Information & Location */}
              <div style={{ background: '#fff', padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Secure Facility</h3>
                  <p style={{ color: 'rgba(5,5,5,0.7)', lineHeight: 1.6 }}>
                    HouseZrl headquarters operates on a closed-circuit architectural loop. All prototype God Layout implementations are finalized in our underground bunker facility before worldwide deployment.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <MapPin style={{ color: 'var(--neon-yellow)', background: 'var(--black)', padding: '8px', borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 4px 0' }}>Beverly Hills, CA</h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)', margin: 0 }}>Coordinates: 34.0736° N, 118.4004° W</p>
                  </div>
                </div>

                {/* Mock Google Maps UI */}
                <div style={{ 
                  width: '100%', 
                  height: '200px', 
                  borderRadius: '16px', 
                  background: '#f0f0f0',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}>
                  {/* Decorative map lines */}
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M 0 100 Q 150 50 300 150 T 600 100" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="8"/>
                    <path d="M 0 150 Q 200 200 350 100" fill="none" stroke="var(--neon-yellow)" strokeWidth="4"/>
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'var(--black)', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                  }}>
                    HouseZrl HQ
                  </div>
                </div>
              </div>

              {/* Right Side: Buy & Contact */}
              <div style={{ background: '#fff', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck color="var(--black)" /> Secure Acquisition
                  </h3>
                  <p style={{ color: 'rgba(5,5,5,0.6)', lineHeight: 1.5, marginBottom: '24px' }}>
                    Speak directly with our elite brokers to secure your God Layout property. Transactions are strictly confidential.
                  </p>
                  
                  <Link href="/contact" onClick={onClose} style={{ display: 'block' }}>
                    <button className="pill-btn" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginBottom: '16px' }}>
                      <Mail size={18} style={{ marginRight: '10px' }} /> Buy Property / Inquire
                    </button>
                  </Link>
                </div>

                <div>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '24px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'rgba(5,5,5,0.5)', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase' }}>Direct Digital Channels</p>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '12px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'}>
                      {whatsappSvg}
                      WhatsApp
                    </a>
                    
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(225, 48, 108, 0.1)', color: '#E1306C', padding: '12px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.1)'}>
                      {instagramSvg}
                      Instagram
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

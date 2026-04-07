'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, ShieldCheck, Mail } from 'lucide-react';
import Image from 'next/image';

export interface PropertyData {
  title: string;
  price: string;
  loc: string;
  sqft?: string;
  desc?: string;
  img?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData | null;
}

export default function PropertyModal({ isOpen, onClose, property }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!property) return null;

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

  // Encode location for Dummy Google Maps Embed
  const encodedLoc = encodeURIComponent(property.loc + " architecture");

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
            alignItems: 'center', // on mobile this can clip, but we use calc(100vh - 40px) 
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
            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              height: 'calc(100vh - 40px)', // Takes up maximum safe screen space
              background: 'var(--cream)',
              borderRadius: '32px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              color: 'var(--black)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden' // Hard clip for the border radius
            }}
          >
            {/* Header Area (Fixed) */}
            <div style={{ position: 'relative', minHeight: '250px', flexShrink: 0, padding: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              
              {/* Dynamic Image Background */}
              {property.img ? (
                <Image src={property.img} alt={property.title} fill style={{ objectFit: 'cover', zIndex: 0 }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, background: 'var(--black)', zIndex: 0 }} />
              )}
              {/* Dark Gradient Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />

              <button 
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  color: 'white',
                  zIndex: 10
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <X size={20} />
              </button>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap', paddingRight: '40px' }}>
                   <div style={{ background: 'var(--neon-yellow)', color: 'var(--black)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>Exclusive Listing</div>
                   {property.sqft && <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500 }}>{property.sqft}</div>}
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '5px', lineHeight: 1.1 }}>{property.title}</h2>
                <div style={{ fontSize: '1.5rem', color: 'var(--neon-yellow)', fontWeight: 'bold' }}>{property.price}</div>
              </div>
            </div>

            {/* Information Content Area (Scrollable) */}
            <div className="modal-scroll-info" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', background: 'white' }}>
              
              {/* Left Side: Information & Location */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>God Layout Intelligence</h3>
                  <p style={{ color: 'rgba(5,5,5,0.7)', lineHeight: 1.6, fontSize: '1rem' }}>
                    {property.desc || "A spatial masterpiece engineered for ultimate comfort and absolute performance. Designed utilizing biometric algorithms and integrated sustainable architecture."}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <MapPin style={{ color: 'var(--neon-yellow)', background: 'var(--black)', padding: '8px', borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{property.loc}</h3>
                </div>

                {/* Dummy Google Maps Embed */}
                <div style={{ 
                  width: '100%', 
                  height: '250px', 
                  borderRadius: '16px', 
                  background: '#e0e0e0',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade" 
                    src={`https://maps.google.com/maps?q=${encodedLoc}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
              </div>

              {/* Right Side: Buy & Contact */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck color="var(--black)" /> Secure Target
                  </h3>
                  <p style={{ color: 'rgba(5,5,5,0.6)', lineHeight: 1.5, marginBottom: '24px' }}>
                    This property is secured under a private network. Speak directly with a master broker to initiate the acquisition process immediately.
                  </p>
                  
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=exec@housezrl.com&su=Formal Inquiry: ${property.title}&body=I am interested in acquiring the property: ${property.title}. Please provide more information about the acquisition process.`}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-btn neon" 
                    style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', justifyContent: 'center', textDecoration: 'none', alignItems: 'center' }}
                  >
                    <Mail size={18} style={{ marginRight: '10px' }} /> Submit Formal Inquiry
                  </a>
                </div>

                <div>
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '24px' }} />
                  <p style={{ fontSize: '0.9rem', color: 'rgba(5,5,5,0.5)', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase' }}>Instant Buying Channels</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '16px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'}>
                      {whatsappSvg} Buy via WhatsApp
                    </a>
                    
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(225, 48, 108, 0.1)', color: '#E1306C', padding: '16px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.1)'}>
                      {instagramSvg} DM on Instagram
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

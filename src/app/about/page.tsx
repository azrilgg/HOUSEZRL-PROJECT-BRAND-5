'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { PenTool, Triangle, Hexagon, Circle, Square, Command, Anchor, Layers, Cpu, Globe, Boxes, Mail, Phone, MapPin, X } from 'lucide-react';

export default function AboutPage() {
  const founderRef = useRef(null);
  const isFounderInView = useInView(founderRef, { margin: "-30% 0px -30% 0px" });
  const [activeJourney, setActiveJourney] = useState<any>(null);

  const journeyRef = useRef(null);
  const isJourneyInView = useInView(journeyRef, { margin: "-30% 0px -30% 0px" });

  const techLogos = [
    // Apple
    <svg viewBox="0 0 384 512" fill="currentColor" width="36" height="36"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.8 8 273.5q-9 50.6 11.7 106.9c12.5 35 39.1 82.5 75.3 81 33.1-1.5 45-21 82.5-21 37.3 0 46.9 21 82.5 21 38.4-1.5 61.4-44.4 75.3-78.7 16.6-40.4 20-41.2 20.5-41.5-1.5-1-37-14.4-37-52.5zM263.1 89.8c18.4-23.2 30-52.7 25.5-81.8-23.7 1-54.6 16.4-73.5 38.6-15.3 17.5-29.4 47.7-24 76.5 26.8 2 54.8-10.4 72-33.3z"/></svg>,
    // Microsoft
    <svg viewBox="0 0 23 23" fill="currentColor" width="36" height="36"><path d="M0 0h11.066v11.066H0V0zm11.934 0h11.066v11.066H11.934V0zM0 11.934h11.066v11.066H0v-11.066zm11.934 0h11.066v11.066H11.934v-11.066z"/></svg>,
    // Google
    <svg viewBox="0 0 48 48" width="36" height="36"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>,
    // Meta / Facebook
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M15.117 0H8.883C3.977 0 0 3.977 0 8.883v6.234C0 20.023 3.977 24 8.883 24h6.234C20.023 24 24 20.023 24 15.117V8.883C24 3.977 20.023 0 15.117 0zm.45 17.514a.75.75 0 0 1-1.06 0l-1.957-1.957a.75.75 0 0 1 0-1.061l1.957-1.957a.75.75 0 0 1 1.06 1.061l-.926.926H16.5a.75.75 0 0 1 0 1.5h-2.859l.926.926a.75.75 0 0 1 0 1.062zM9.45 11.026a.75.75 0 0 1-1.06 0L6.433 9.069a.75.75 0 0 1 0-1.061l1.957-1.957a.75.75 0 0 1 1.06 1.061l-.926.926H11.5a.75.75 0 0 1 0 1.5H8.641l.926.926a.75.75 0 0 1 0 1.062z"/></svg>,
    // Amazon
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M18.8 19.34s-2.73 2.16-6.62 2.16c-4.43 0-7.74-2.5-7.74-2.5s2.4.92 6 1c3.78.08 7.22-1.25 8.36-1.66zm.3-2c1.78.34 2.65.65 2.65.65s-.62-2.3-1-3.66c0 0-.25.5-1.12 1-.85.48-2 .9-2.6 1L19.1 17.34z"/><path d="M14.67 15.65c-1.34.82-3.23 1.26-5.23 1.26-2.5 0-4.1-.73-4.1-.73V14s1.65.7 3.96.7c3.1 0 4.67-1.15 4.67-3.4v-.88a4.93 4.93 0 0 1-3.9 1.57c-2.8 0-5.32-1.95-5.32-5.4C4.75 2.53 7.37.5 10.37.5c1.6 0 3 .7 3.86 1.7V.74h4.15v9A6.77 6.77 0 0 1 14.67 15.65zm-.6-9c-.1-1.42-1-2.45-2.6-2.45-1.78 0-3.1 1.25-3.1 3.2 0 1.95 1.25 3.1 3.1 3.1 1.62 0 2.5-1.05 2.6-2.52z"/></svg>,
    // Nvidia
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M23.003 14.868s0-.001 0 0c-.004-.038-.009-.077-.015-.116l-.004-.029-.011-.06s0-.002-.001-.002-.016-.084-.016-.084l-.014-.065-.008-.031c-.001-.004-.002-.008-.003-.012l-.019-.071c-.001-.005-.002-.01-.003-.014l-.025-.078c-.001-.002-.001-.005-.002-.007l-.029-.08c-.002-.006-.005-.011-.007-.017l-.037-.087c-.002-.005-.005-.011-.007-.015l-.042-.084c-.003-.005-.005-.009-.008-.014l-.05-.084c-.003-.005-.007-.01-.01-.015l-.055-.078-.012-.016-.062-.075c-.005-.005-.009-.01-.014-.015l-.066-.067c-.006-.006-.011-.011-.017-.017l-.071-.06-.019-.015-.08-.052c-.007-.005-.014-.009-.022-.014l-.078-.042c-.008-.004-.016-.007-.024-.01l-.092-.036c-.009-.003-.018-.006-.027-.008l-.089-.027c-.012-.003-.024-.006-.036-.008l-.1-.02c-.012-.002-.025-.003-.037-.005l-.101-.012-.047-.003-.105-.005H2.433v10.42h6.815V14.8h11.967l1.788.068zM5.556 12.066H3.344v6.86h2.212v-6.86zm3.486 0H6.83v6.86h2.212v-6.86zm10.603 6.86h-2.316l-1.921-3.21-.006.01-1.928 3.2h-2.313l3.141-5.01-2.92-4.66h2.315l1.705 2.89L16.74 9.466h2.315l-2.92 4.66 3.11 4.8zm3.033 0h-2.212v-6.86h2.212v-6.86z"/></svg>,
    // Tesla
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.611 11.233c.319.467.532.909.638 1.325.106.417.159.816.159 1.198V17h-1.319v-1.244c0-.285-.043-.604-.129-.958a4.135 4.135 0 0 0-.486-1.127 4.136 4.136 0 0 0-1.047-1.127 4.135 4.135 0 0 0-1.127-.486c-.354-.086-.673-.129-.958-.129H8.09v-1.319h1.244c.382 0 .781.053 1.198.159.416.106.858.319 1.325.638s.909.532 1.325.638c.417.106.816.159 1.198.159h1.244v1.319h-1.244c-.285 0-.604-.043-.958-.129a4.135 4.135 0 0 0-1.127-.486zm3.323-5.323c-.106-.417-.319-.859-.638-1.325s-.532-.909-.638-1.325c-.106-.417-.159-.816-.159-1.198V4h1.319v1.244c0 .285.043.604.129.958.086.354.248.73.486 1.127.238.397.587.773 1.047 1.127.46.354.836.516 1.127.486.291-.03.564-.073.818-.129H21v1.319h-1.244c-.382 0-.781-.053-1.198-.159a5.15 5.15 0 0 1-1.325-.638z"/></svg>,
    // SpaceX
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36"><path d="M21.1 2.3L12 11.4 2.9 2.3 1.5 3.7l9.1 9.1-9.1 9.1 1.4 1.4 9.1-9.1 9.1 9.1 1.4-1.4-9.1-9.1 9.1-9.1z"/></svg>,
    // Netflix
    <svg viewBox="0 0 24 24" fill="#E50914" width="36" height="36"><path d="M19.141 1.706h-3.957l-4.52 11.458-4.542-11.458H2.15v20.588h3.967V9.736l4.542 11.458h.007v.006h3.993v-.006H14.66l4.524-11.458v12.558h3.957V1.706z"/></svg>,
    // Spotify
    <svg viewBox="0 0 24 24" fill="#1ED760" width="36" height="36"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.781s.18-1.2.78-1.381c4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.619.36z"/></svg>,
  ];
  const combinedLogos = [...techLogos, ...techLogos, ...techLogos];

  return (
    <motion.main 
      animate={{ 
        backgroundColor: isJourneyInView ? "#0b2612" : (isFounderInView ? "var(--black)" : "var(--cream)"),
        color: isJourneyInView ? "rgba(255,255,255,0.9)" : (isFounderInView ? "rgba(255,255,255,0.9)" : "var(--black)")
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ minHeight: '100vh', paddingBottom: '100px' }}
    >
      <Navbar />
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee {
          display: flex;
          width: 200%;
          gap: 4rem;
        }
        .marquee-left {
          animation: scrollLeft 20s linear infinite;
        }
        .marquee-right {
          animation: scrollRight 20s linear infinite;
        }
        .logo-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 3rem;
          background: rgba(0,0,0,0.03);
          border-radius: 100px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .logo-item:hover {
          background: var(--neon-yellow);
          transform: translateY(-5px);
        }
        .founder-gradient {
          background: linear-gradient(to right, var(--black) 0%, transparent 100%);
        }
        @media (max-width: 900px) {
          .founder-gradient {
            background: linear-gradient(to bottom, var(--black) 0%, transparent 100%);
          }
        }
      `}</style>
      
      <section style={{ paddingTop: '150px', paddingLeft: '5%', paddingRight: '5%', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <h1 style={{ fontSize: 'clamp(1.5rem, 12vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.04em', fontFamily: 'Syne, sans-serif', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
            BEYOND <br /> ARCHITECTURE.
          </h1>
          
          <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', lineHeight: 1.6, color: isFounderInView ? 'rgba(255,255,255,0.7)' : 'rgba(5,5,5,0.7)', transition: 'color 0.8s ease' }}>
                HouseZrl represents the absolute pinnacle of modern spatial design. We don't just build homes; we engineer living experiences that seamlessly blend with nature and ultra-advanced technology.
              </p>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.6, color: isFounderInView ? 'rgba(255,255,255,0.6)' : 'rgba(5,5,5,0.6)', transition: 'color 0.8s ease' }}>
                Founded by a collective of aerospace engineers, conceptual artists, and master builders, our proprietary <em>God Layout</em> methodology ensures that every line, shadow, and material interaction is perfectly calculated for human psychology and environmental harmony. 
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ width: '100%', minHeight: '400px', background: 'var(--cool-grey)', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}
            >
               <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://i.pinimg.com/1200x/6f/f0/d6/6ff0d6088d67c1d7e979922e2f6e2859.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.9 }}></div>
               
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: '#fff', width: '80%' }}>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>50+</h3>
                  <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)' }}>Global Masterpieces Built</p>
               </div>

               <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'var(--neon-yellow)', padding: '10px 20px', borderRadius: '100px', fontWeight: 'bold' }}>Est. 2026</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Deep Dive Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '140px' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '60px', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '20px' }}>Our Core Philosophy</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
             {[
               { title: 'Spatial Fluidity', desc: 'Walls are replaced with dynamic boundaries. Light becomes a physical material that moves through the house as the day progresses.' },
               { title: 'Cognitive Comfort', desc: 'Proportions are generated using neuro-architectural algorithms to lower cortisol levels and induce absolute relaxation.' },
               { title: 'Zero Friction', desc: 'From biometric security to invisible climate controls, technology is entirely hidden, functioning silently in the background.' },
             ].map((val, i) => (
                <div key={i} className="glass" style={{ padding: '40px', borderRadius: '32px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.5)' }}>
                  <div style={{ width: '40px', height: '40px', background: 'var(--black)', color: 'var(--neon-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '20px' }}>0{i+1}</div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', color: isFounderInView ? 'white' : 'var(--black)' }}>{val.title}</h3>
                  <p style={{ color: isFounderInView ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)', lineHeight: 1.6, fontSize: '1.1rem', transition: 'color 0.8s ease' }}>{val.desc}</p>
                </div>
             ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            OUR BUSINESS JOURNEY
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={journeyRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          style={{ marginTop: '140px', position: 'relative' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 15 }}
              style={{ display: 'inline-block', background: 'rgba(127,255,0,0.1)', border: '1px solid rgba(127,255,0,0.3)', padding: '8px 24px', borderRadius: '100px', marginBottom: '20px' }}
            >
              <span style={{ color: '#7fff00', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' }}>Legacy & Evolution</span>
            </motion.div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: isJourneyInView ? '#fff' : 'var(--black)', lineHeight: 1.1, marginBottom: '20px', fontWeight: 800, transition: 'color 0.8s ease' }}>
              OUR BUSINESS JOURNEY
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: isJourneyInView ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', maxWidth: '700px', margin: '0 auto', transition: 'color 0.8s ease' }}>
              From a radical architectural concept to a global paradigm shift. Building the future of luxury living, step by step.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '30px' }}>
            {[
              { year: '2024', title: 'The Genesis Protocol', desc: 'HouseZrl was founded. We drafted the first neural-architecture blueprints, challenging 20th-century building constraints and static boundaries.', img: 'https://i.pinimg.com/1200x/9d/fc/61/9dfc61258cd6884a5006a8381f2554df.jpg' },
              { year: '2025', title: 'Smart-Glass', desc: 'Patented our dynamic opacity glass and invisible climate grids. The first prototype residence was completed, achieving 100% off-grid status.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
              { year: '2026', title: 'Global Expansion', desc: 'HouseZrl initiates 14 concurrent ultra-luxury projects globally, seamlessly integrating biome-responsive technology into every new property.', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800' }
            ].map((milestone, i) => (
              <div key={i} style={{ perspective: '1200px' }}>
                <motion.div
                  onClick={() => setActiveJourney(milestone)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, rotateY: i % 2 === 0 ? 4 : -4, rotateX: 3, z: 30, boxShadow: '0 30px 60px rgba(127,255,0,0.15)' }}
                  whileTap={{ scale: 0.97, rotateY: 0, rotateX: 0, z: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  style={{
                    background: isJourneyInView ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    border: isJourneyInView ? '1px solid rgba(127,255,0,0.2)' : '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                    transition: 'background 0.8s ease, border 0.8s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div style={{ width: '100%', height: '240px', position: 'relative', willChange: 'transform' }}>
                    <Image src={milestone.img} alt={milestone.title} fill style={{ objectFit: 'cover', willChange: 'transform' }} />
                    <div style={{ position: 'absolute', inset: 0, background: isJourneyInView ? 'linear-gradient(to top, #0b2612 -10%, transparent 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.7) -10%, transparent 100%)', transition: 'background 0.8s ease' }} />
                    <div style={{ position: 'absolute', bottom: '15px', right: '20px', fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>{milestone.year}</div>
                  </div>
                  <div style={{ padding: '30px' }}>
                    <div style={{ display: 'inline-block', color: isJourneyInView ? '#7fff00' : 'var(--black)', background: isJourneyInView ? 'rgba(127,255,0,0.1)' : 'rgba(0,0,0,0.05)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '15px', transition: 'all 0.8s ease' }}>{milestone.year} PHASE</div>
                    <h3 style={{ fontSize: '1.6rem', color: isJourneyInView ? '#fff' : 'var(--black)', marginBottom: '15px', fontWeight: 'normal', transition: 'color 0.8s ease' }}>{milestone.title}</h3>
                    <p style={{ color: isJourneyInView ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.6, fontSize: '1rem', transition: 'color 0.8s ease', overflow: 'visible' }}>
                      <span style={{ 
                        display: 'inline-block',
                        float: 'left', 
                        fontSize: '3.8rem', 
                        lineHeight: '1', 
                        padding: '0 8px 0 0',
                        marginTop: '-4px',
                        fontWeight: 900, 
                        color: isJourneyInView ? '#7fff00' : 'var(--black)',
                        textShadow: isJourneyInView ? '0 0 15px rgba(127,255,0,0.4)' : 'none',
                        transition: 'all 0.8s ease'
                      }}>
                        {milestone.desc.charAt(0)}
                      </span>
                      {milestone.desc.slice(1)}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════════
            JOURNEY SUPER MODAL
            ═══════════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {activeJourney && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJourney(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--black)',
                  border: '1px solid rgba(127,255,0,0.3)',
                  borderRadius: '32px',
                  width: '100%',
                  maxWidth: '1000px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
                }}
              >
                <button
                  onClick={() => setActiveJourney(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(10px)' }}
                >
                  <X size={20} />
                </button>
                
                <div style={{ position: 'relative', width: '100%', minHeight: 'clamp(250px, 40vh, 450px)' }}>
                  <Image src={activeJourney.img} alt={activeJourney.title} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)' }} />
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                    style={{ position: 'absolute', bottom: '30px', left: 'clamp(20px, 5vw, 60px)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                      <div style={{ color: '#7fff00', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1 }}>{activeJourney.year}</div>
                      <div style={{ height: '3px', width: '100px', background: 'rgba(127,255,0,0.5)', borderRadius: '2px' }} />
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#fff', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.1 }}>{activeJourney.title}</h2>
                  </motion.div>
                </div>

                <div style={{ padding: 'clamp(30px, 5vw, 60px)' }}>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.8 }}>
                    <span style={{ float: 'left', fontSize: '4.5rem', lineHeight: '0.8', paddingTop: '8px', marginRight: '16px', fontWeight: 900, color: '#7fff00', textShadow: '0 0 30px rgba(127,255,0,0.6)' }}>
                       {activeJourney.desc.charAt(0)}
                    </span>
                    {activeJourney.desc.slice(1)}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.8, marginTop: '20px' }}>
                    We engineered solutions that surpassed standard expectations. The paradigm shifted, forcing modern architectural norms to bend to a completely holistic approach where the building breathes, learns, and optimizes itself independently. This specific milestone marked a fundamental turning point in the execution of the HouseZrl vision — bridging the gap between theoretical radicalism and tangible luxury.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
                    {[
                      { l: 'PHASE STATUS', v: 'COMPLETED' },
                      { l: 'INNOVATION YIELD', v: 'MAXIMUM' },
                      { l: 'GLOBAL IMPACT', v: 'PARADIGM SHIFT' }
                    ].map((stat, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '16px' }}>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>{stat.l}</div>
                        <div style={{ color: '#7fff00', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'monospace' }}>{stat.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════════════
            TRUST LAND CERTIFICATE & BENEFITS
            ═══════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 'clamp(80px, 15vw, 160px)', padding: '0 2.5%' }}
        >
          <div style={{
            background: 'linear-gradient(165deg, rgba(5,15,5,0.95) 0%, rgba(0,0,0,0.98) 100%)',
            backdropFilter: 'blur(30px)',
            borderRadius: 'clamp(24px, 5vw, 48px)',
            border: '1px solid rgba(127,255,0,0.2)',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7), 0 0 30px rgba(127,255,0,0.05)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Left Content Column */}
            <div style={{ padding: 'clamp(24px, 6vw, 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(127,255,0,0.1)', padding: '10px 24px', borderRadius: '100px', border: '1px solid rgba(127,255,0,0.2)', marginBottom: '36px', width: 'fit-content' }}
              >
                <div style={{ width: '10px', height: '10px', background: '#7fff00', borderRadius: '50%', boxShadow: '0 0 15px #7fff00' }} />
                <span style={{ color: '#7fff00', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase' }}>OFFICIAL VERIFICATION</span>
              </motion.div>

              <h2 style={{ 
                color: '#fff', 
                fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', 
                lineHeight: 1.1, 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                marginBottom: '24px', 
                letterSpacing: '-0.01em',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                maxWidth: '100%'
              }}>
                TRUST LAND <span style={{ color: '#7fff00', textShadow: '0 0 30px rgba(127,255,0,0.3)', display: 'inline-block' }}>CERTIFICATE</span>
              </h2>

              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', lineHeight: 1.7, marginBottom: '40px', fontWeight: 400 }}>
                Every HouseZrl property is backed by an unassailable digital ledger. This certificate guarantees absolute legal immunity, perpetual ownership rights, and elite environmental tax status globally.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {[
                  { title: 'Tax Immunity', desc: 'Class-Zero footprint classification.' },
                  { title: 'Sovereign Asset', desc: 'Protected by Layer-1 legal encryption.' },
                  { title: 'Global Mobility', desc: 'Instant borderless asset transfer.' },
                  { title: 'Legacy Shield', desc: 'Generational wealth preservation.' }
                ].map((bf, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    style={{ borderLeft: '2px solid #7fff00', background: 'rgba(255,255,255,0.02)', padding: '15px 20px', borderRadius: '0 16px 16px 0', borderLeftWidth: '3px' }}
                  >
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>{bf.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.4 }}>{bf.desc}</div>
                  </motion.div>
                ))}
              </div>

              <motion.a 
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(37,211,102,0.4)', y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '18px',
                  background: '#25D366', color: '#fff', padding: '20px 35px', 
                  borderRadius: '100px', textDecoration: 'none', fontWeight: 900, 
                  letterSpacing: '1.5px', textTransform: 'uppercase', width: 'fit-content',
                  boxShadow: '0 15px 30px rgba(37,211,102,0.3)', fontSize: '0.9rem'
                }}
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Secure Exclusive Access
              </motion.a>
            </div>

            {/* Right Visual Column (SUPER PERFECT NO CUT DESIGN) */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: 'clamp(520px, 85vw, 850px)', padding: 'clamp(10px, 3vw, 40px)' }}>
              {/* Complex Background Layers */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <Image 
                  src="https://i.pinimg.com/736x/90/86/7b/90867b32a247f63ae776b658c43b3929.jpg" 
                  alt="Architecture Background" 
                  fill 
                  style={{ objectFit: 'cover', transform: 'scale(1.1)', filter: 'brightness(0.35) contrast(1.2)' }} 
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,15,5,1) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(127,255,0,0.1) 0%, transparent 70%)' }} />
              </div>

              {/* Central Certificate Card (The "No Cut" Perfection) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'relative',
                  width: '96%',
                  aspectRatio: '0.66',
                  maxWidth: '430px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(50px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(12px, 5vw, 40px)',
                  boxShadow: '0 60px 120px -30px rgba(0,0,0,0.8), inset 0 0 50px rgba(127,255,0,0.1)',
                  zIndex: 2,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Certificate Content Elements */}
                <div style={{ border: '1px solid rgba(127,255,0,0.3)', height: '100%', padding: 'clamp(12px, 3vw, 25px)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'clamp(15px, 4vw, 30px)' }}>
                    <div style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', fontWeight: 900, color: '#7fff00' }}>HZR / 001</div>
                    <div style={{ fontSize: 'clamp(0.5rem, 2vw, 0.7rem)', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '2px' }}>NEW YORK, UNITED STATES</div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                     <h4 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', fontWeight: 800, textAlign: 'center', marginBottom: '8px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>TRUST LAND</h4>
                     <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(127,255,0,0.5), transparent)', width: '100%', marginBottom: '15px' }} />
                     <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 'clamp(0.55rem, 2vw, 0.7rem)', textAlign: 'center', letterSpacing: '0.8px', lineHeight: 1.5 }}>
                       This document serves as primary proof of unassailable property rights within the HouseZrl ecosystem. Authenticated via quantum encryption and global maritime law frameworks.
                     </p>
                  </div>

                  {/* Handsign & Seal Section */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                          fontFamily: 'var(--font-caveat)',
                          fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                          color: '#fff',
                          lineHeight: 0.8,
                          transform: 'rotate(-3deg)',
                          marginBottom: '4px',
                          textShadow: '0 0 15px rgba(255,255,255,0.3)',
                          userSelect: 'none'
                        }}
                      >
                        Julian Azriel
                      </motion.div>
                      <div style={{ height: '0.5px', width: 'clamp(80px, 15vw, 150px)', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 'clamp(100px, 15vw, 150px)', marginTop: '4px' }}>
                        <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Authorized Sign
                        </div>
                        <div style={{ fontSize: '0.45rem', color: 'rgba(127,255,0,0.5)', fontWeight: 700, fontFamily: 'monospace' }}>
                          {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    {/* Shimmering Digital Seal */}
                    <div style={{ width: '70px', height: '70px', position: 'relative' }}>
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 90, 180, 270, 360],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ 
                          position: 'absolute', inset: -8, 
                          background: 'radial-gradient(circle, rgba(127,255,0,0.2) 0%, transparent 70%)',
                          borderRadius: '50%', filter: 'blur(5px)'
                        }} 
                      />
                      <div style={{ width: '100%', height: '100%', background: 'rgba(127,255,0,0.1)', border: '1px solid #7fff00', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                         <div style={{ position: 'absolute', inset: 4, border: '1px solid rgba(127,255,0,0.5)', borderRadius: '50%' }} />
                         <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7fff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating "LAW COMPLIANT" Badge - REPOSITIONED FOR MOBILE NO CUT */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', top: '-15px', right: '-15px', zIndex: 10,
                    background: '#7fff00', padding: '10px 20px',
                    borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px',
                    boxShadow: '0 15px 30px rgba(127,255,0,0.4)', color: '#000'
                  }}
                >
                  <Anchor size={16} />
                  <div style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1.5px' }}>LEGAL GRADE A</div>
                </motion.div>
              </motion.div>

              {/* Background Glows */}
              <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(127,255,0,0.2)', filter: 'blur(100px)', borderRadius: '50%' }} />
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(127,255,0,0.1)', filter: 'blur(100px)', borderRadius: '50%' }} />
            </div>
          </div>
        </motion.div>

        {/* Global Partners Marquee */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '140px' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 0 }}>Trusted By Industry Titans</h2>
            <p style={{ color: isFounderInView ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', marginTop: '10px', fontSize: '1.2rem', transition: 'color 0.8s ease' }}>Our network of global partners and engineering firms.</p>
          </div>

          <div style={{ width: '100%', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="marquee marquee-left">
              {combinedLogos.map((logo, index) => (
                <div key={`left-${index}`} className="logo-item">{logo}</div>
              ))}
            </div>
          </div>
          
          <div style={{ width: '100%', overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', marginTop: '30px' }}>
            <div className="marquee marquee-right">
              {[...combinedLogos].reverse().map((logo, index) => (
                <div key={`right-${index}`} className="logo-item">{logo}</div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* The Founder / Owner Section */}
        <motion.div 
          ref={founderRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '140px', background: isFounderInView ? 'transparent' : 'var(--black)', border: isFounderInView ? '1px solid rgba(255,255,255,0.1)' : 'none', color: 'white', borderRadius: '32px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', transition: 'background 0.8s ease, border 0.8s ease' }}
        >
          <div style={{ flex: '1 1 min(100%, 500px)', padding: 'clamp(30px, 6vw, 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ background: 'var(--neon-yellow)', color: 'var(--black)', padding: '8px 16px', borderRadius: '100px', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 'bold', width: 'fit-content', marginBottom: '20px' }}>
              Lead Architect & Founder
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '20px', wordBreak: 'break-word' }}>Julian <br/> Azriel</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1rem, 3vw, 1.2rem)', lineHeight: 1.6, marginBottom: '40px' }}>
              "We don't design rooms; we architect human potential. Every project we touch is an obsessive pursuit of perfection, engineered to elevate the state of being."
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', flexShrink: 0 }}><Phone size={20} color="var(--neon-yellow)" /></div>
                <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 500, wordBreak: 'break-all' }}>+1 (800) 555-GODL</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', flexShrink: 0 }}><Mail size={20} color="var(--neon-yellow)" /></div>
                <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 500, wordBreak: 'break-all' }}>exclusive@housezrl.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', flexShrink: 0 }}><MapPin size={20} color="var(--neon-yellow)" /></div>
                <span style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', fontWeight: 500 }}>One God Layout Ave, NY 10001</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap' }}>
              {[
                <svg key="1" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
                <svg key="2" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
                <svg key="3" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              ].map((icon, i) => (
                <a key={i} href="#" style={{ width: '50px', height: '50px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'all 0.3s ease', flexShrink: 0 }} onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--neon-yellow)'; e.currentTarget.style.color = 'var(--black)'; e.currentTarget.style.borderColor = 'var(--neon-yellow)'}} onMouseLeave={(e) => {e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ flex: '1 1 min(100%, 400px)', minHeight: 'clamp(300px, 50vw, 500px)', position: 'relative' }}>
             <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=1200')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%) contrast(1.2)' }}></div>
             <div className="founder-gradient" style={{ position: 'absolute', inset: 0 }}></div>
          </div>
        </motion.div>

      </section>
    </motion.main>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const pages = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'EXCLUSIVE PROPERTIES', href: '/exclusive-properties' },
  { label: 'FAQ', href: '/faqs' },
  { label: 'CONTACT US', href: '/contact' },
];

const socials = [
  { label: 'WHATSAPP', href: 'https://wa.me/' },
  { label: 'INSTAGRAM', href: 'https://instagram.com' },
  { label: 'TIKTOK', href: 'https://tiktok.com' },
];



export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', color: '#fff', position: 'relative', overflow: 'hidden' }}>

      {/* ═══════ FOOTER HERO TITLE ═══════ */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 5% 0', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1,
            letterSpacing: '-0.04em', margin: 0, textTransform: 'uppercase'
          }}
        >
          BUILD YOUR <br />
          <span style={{ color: 'var(--neon-yellow)', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DREAM HOME</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.4)', maxWidth: '500px', margin: '20px auto 0', lineHeight: 1.6, letterSpacing: '0.02em' }}
        >
          The world&apos;s most exclusive portfolio of God Layout architecture. Every residence is a masterpiece engineered for those who demand perfection.
        </motion.p>
      </div>

      {/* ═══════ MAIN FOOTER GRID ═══════ */}
      <div className="footer-grid" style={{
        maxWidth: '1400px', margin: '0 auto', padding: '60px 5% 60px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px',
        alignItems: 'center'
      }}>

        {/* LEFT — PAGES */}
        <div className="footer-nav-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 className="footer-h4" style={{
            fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em',
            color: 'var(--neon-yellow)', marginBottom: '28px', textTransform: 'uppercase',
            borderBottom: '2px solid rgba(197,160,89,0.2)', paddingBottom: '12px'
          }}>
            Pages
          </h4>
          <ul className="footer-ul" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            {pages.map(p => (
              <li key={p.href}>
                <Link href={p.href} style={{
                  textDecoration: 'none', color: 'white', fontSize: '1.05rem',
                  fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'all 0.2s', display: 'inline-block'
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — HOUSE IMAGE + BUTTON */}
        <div className="footer-center-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <motion.div
            className="footer-house"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'relative', width: '100%', maxWidth: '600px', height: 'clamp(200px, 40vw, 300px)',
              filter: 'drop-shadow(0 25px 50px rgba(197, 160, 89, 0.25))', margin: '0 auto'
            }}
          >
            <Image
              src="/images/housezrl.png"
              alt="HouseZrl Luxury Architecture"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
            {/* Glow ring behind */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '80%', height: '80%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197,160,89,0.15) 0%, transparent 70%)',
              zIndex: -1
            }} />
          </motion.div>
          <Link href="/exclusive-properties" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.08, boxShadow: '0 10px 40px rgba(197, 160, 89, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--neon-yellow)', color: '#111',
                padding: '16px 36px', borderRadius: '100px',
                fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em',
                textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(197, 160, 89, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              EXCLUSIVE PROPERTIES
            </motion.div>
          </Link>
        </div>

        {/* RIGHT — FOLLOW ON */}
        <div className="footer-nav-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
          <h4 className="footer-h4" style={{
            fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em',
            color: 'var(--neon-yellow)', marginBottom: '28px', textTransform: 'uppercase',
            borderBottom: '2px solid rgba(197,160,89,0.2)', paddingBottom: '12px'
          }}>
            Follow On
          </h4>
          <ul className="footer-ul" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
            {socials.map(s => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" style={{
                  textDecoration: 'none', color: 'white', fontSize: '1.05rem',
                  fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'all 0.2s', display: 'inline-block'
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--neon-yellow)'; e.currentTarget.style.transform = 'translateX(-6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ═══════ PARTNER LOGOS MARQUEE ═══════ */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: 'linear-gradient(to right, rgba(197,160,89,0.05) 0%, rgba(0,0,0,0) 50%, rgba(197,160,89,0.05) 100%)',
        padding: '28px 0', overflow: 'hidden', position: 'relative'
      }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2 }} />
        
        <div className="footer-marquee-track" style={{ display: 'flex', alignItems: 'center', gap: '60px', width: 'max-content' }}>
          {[0, 1].map((setIdx) => (
            <div key={setIdx} style={{ display: 'flex', alignItems: 'center', gap: '60px', animation: 'footerMarquee 30s linear infinite' }}>
              {[
                { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
                { name: 'Apple', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
                { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
                { name: 'Tesla', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
                { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png' },
                { name: 'Spotify', url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' },
                { name: 'Uber', url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' },
                { name: 'Airbnb', url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
                { name: 'Samsung', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
                { name: 'Adobe', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png' },
              ].map(logo => (
                <img
                  key={logo.name}
                  src={logo.url}
                  alt={logo.name}
                  height={28}
                  style={{ opacity: 0.5, filter: 'brightness(0) invert(1)', transition: 'all 0.3s', flexShrink: 0, maxWidth: '90px', objectFit: 'contain' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(197,160,89,0.5))'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.filter = 'brightness(0) invert(1)'; }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ COPYRIGHT BAR ═══════ */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '20px 5%', textAlign: 'center'
      }}>
        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', margin: 0 }}>
          © 2026 HouseZrl. All rights reserved. Designed for God Layout Architecture.
        </p>
      </div>

      {/* Marquee and Responsive animations */}
      <style>{`
        @keyframes footerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          .footer-nav-col, .footer-center-col, .footer-ul {
            align-items: center !important;
            text-align: center !important;
          }
          .footer-h4 {
            align-self: center !important;
            margin-bottom: 20px !important;
          }
          .footer-nav-col li a {
            display: block !important;
            text-align: center !important;
            transform: none !important;
          }
        }
      `}</style>
    </footer>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import DesignExplanationModal from './DesignExplanationModal';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Exclusive Properties', href: '/exclusive-properties' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' }
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (hoveredIndex !== null && indicatorRef.current && itemsRef.current[hoveredIndex]) {
      const el = itemsRef.current[hoveredIndex]!;
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();

      gsap.to(indicatorRef.current, {
        x: rect.left - parentRect.left,
        width: rect.width,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        width: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [hoveredIndex]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <DesignExplanationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <motion.nav
        initial={{ y: -100, x: "-50%" }}
        animate={{ y: 0, x: "-50%" }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          width: '90%',
          maxWidth: '1200px',
          height: '90px',
          borderRadius: '45px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
        }}
        className="glass"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.08, y: -2, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.25))' }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: 'relative',
            width: 'clamp(240px, 35vw, 350px)',
            height: '75px',
            cursor: 'pointer',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
            transformOrigin: 'left center',
          }}
          onClick={() => setModalOpen(true)}
        >
          <Image
            src="/images/housezrl.png"
            alt="HouseZrl Logo"
            fill
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
            sizes="(max-width 1024px) 130px, 180px"
            priority
          />
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="desktop-nav" style={{ display: 'none', listStyle: 'none', gap: '24px', position: 'relative', alignItems: 'center', margin: 0, padding: 0 }}>
          {navItems.map((item, i) => (
            <li
              key={i}
              ref={el => { itemsRef.current[i] = el; }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer', fontFamily: 'var(--font-cinzel), serif', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--black)' }}
            >
              <Link href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.label}
              </Link>
            </li>
          ))}
          {/* Underline Follower */}
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              bottom: '-4px',
              height: '2px',
              background: 'var(--black)',
              opacity: 0,
              pointerEvents: 'none',
            }}
          />
        </ul>

        <div className="desktop-nav" style={{ display: 'none' }}>
          <MagneticButton>
            <Link href="/contact" style={{ display: 'inline-block' }}>
              <button className="pill-btn">Contact Us</button>
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(true)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'block' // Overridden by media query below
          }}
        >
          <Menu size={28} color="var(--black)" />
        </button>

        <style>{`
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
          @media (max-width: 1024px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-nav-toggle {
              display: flex !important;
            }
          }
        `}</style>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              background: 'var(--cream)',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={28} color="var(--black)" />
              </button>
            </div>

            <ul style={{
              listStyle: 'none',
              padding: '40px 0',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}>
              {navItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ fontSize: '10vw', fontWeight: 700, fontFamily: 'var(--font-cinzel), serif' }}
                >
                  <Link href={item.href} onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--black)' }}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ marginTop: 'auto' }}
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', textDecoration: 'none' }}>
                <button className="pill-btn neon" style={{ width: '100%', padding: '20px', fontSize: '1.2rem' }}>
                  Contact Us Now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

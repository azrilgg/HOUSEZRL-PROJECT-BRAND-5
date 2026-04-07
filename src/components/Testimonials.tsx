'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alexander Vance",
    role: "Lead Visionary",
    quote: "The God Layout practically reinvented how we perceive spatial harmony in digital spaces. It features super god design and god animation that is incredibly flawless."
  },
  {
    name: "Sarah Jenkins",
    role: "Chief Architect",
    quote: "Integrating these concepts into real-world structures felt like touching the future. Super information and real super god layout at its finest."
  },
  {
    name: "Marcus Aurelius",
    role: "Emperor of Design",
    quote: "Such structure and form. The true definition of a 'super god layout' with a super design logo that makes it feel extremely premium."
  }
];

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(60px, 10vw, 120px) 0', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--cream)' }}>
      <div style={{ paddingLeft: 'clamp(24px, 10vw, 60px)', paddingRight: 'clamp(24px, 10vw, 60px)', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(1.2rem, 9vw, 4.5rem)', textAlign: 'center', marginBottom: '16px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--black)', lineHeight: 1.1, letterSpacing: '-0.02em', wordWrap: 'break-word' }}
        >
          Testimonials
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', marginBottom: 'clamp(30px, 8vw, 60px)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)' }}
        >
          Source: Global Architectural Survey 2026
        </motion.p>
      </div>

      {/* Marquee Wrapper for Perfect Mobile/iOS/Tablet Responsive Loop */}
      <div style={{ display: 'flex', width: 'max-content' }}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
        >
          {/* We create two identical halves. Moving by -50% shifts exactly one full half, creating a flawless loop on any screen size. */}
          {[0, 1].map((halfIndex) => (
            <div key={halfIndex} style={{ display: 'flex', gap: 'clamp(15px, 4vw, 30px)', paddingRight: 'clamp(15px, 4vw, 30px)' }}>
              {[...testimonials, ...testimonials].map((test, i) => (
                <div key={`${halfIndex}-${i}`} style={{ perspective: '1000px' }}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5, z: 50, boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.95, rotateY: 0, rotateX: 0, z: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      background: '#fff',
                      padding: 'clamp(20px, 6vw, 40px)',
                      borderRadius: 'clamp(16px, 4vw, 24px)',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'clamp(15px, 4vw, 20px)',
                      width: 'clamp(270px, 85vw, 400px)',
                      height: '100%',
                      transformStyle: 'preserve-3d',
                      cursor: 'grab'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '5px', color: '#FFD700' }}>
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} fill="#FFD700" size={20} strokeWidth={1} style={{ filter: 'drop-shadow(0 2px 4px rgba(255,215,0,0.4))' }} />
                      ))}
                    </div>
                    <p style={{ fontSize: 'clamp(1rem, 3vw, 1.1rem)', fontStyle: 'italic', color: 'rgba(0,0,0,0.8)', lineHeight: 1.6, flexGrow: 1, transform: 'translateZ(20px)' }}>
                      "{test.quote}"
                    </p>
                    <div style={{ transform: 'translateZ(30px)' }}>
                      <h4 style={{ margin: 0, fontSize: 'clamp(1.1rem, 3.5vw, 1.2rem)', fontWeight: 700, color: 'var(--black)' }}>{test.name}</h4>
                      <span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', color: 'rgba(0,0,0,0.5)' }}>{test.role}</span>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Compass } from 'lucide-react';
import PropertyModal, { PropertyData } from './PropertyModal';

gsap.registerPlugin(ScrollTrigger);

// Upgraded properties array to map exactly to the PropertyData needed by Modal
const properties: (PropertyData & { id: number, size: string, img: string })[] = [
  { id: 1, title: 'Lumina Penthouse', price: '$2.5M', size: 'large', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200', loc: "New York, NY", sqft: "4,000 sqft", desc: "Towering glass architecture featuring panoramic cityscapes." },
  { id: 2, title: 'Eco Villa', price: '$1.8M', size: 'normal', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', loc: "Costa Rica", sqft: "6,200 sqft", desc: "100% off-grid luxury residence integrated safely into the jungle canopy." },
  { id: 3, title: 'Sky Loft', price: '$900K', size: 'normal', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800', loc: "Toronto, CA", sqft: "1,800 sqft", desc: "High altitude minimalist loft with advanced biometrics." },
  { id: 4, title: 'Glass Mansion', price: '$4.2M', size: 'normal', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', loc: "Sydney, AU", sqft: "9,500 sqft", desc: "Oceanfront property entirely enclosed in smart-tinting glass." },
  { id: 5, title: 'Urban Retreat', price: '$1.2M', size: 'normal', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800', loc: "London, UK", sqft: "2,500 sqft", desc: "Victorian aesthetic fused dynamically with ultra-modern smart living cores." },
];

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(itemsRef.current, 
      {
        y: 100,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  return (
    <>
      <PropertyModal isOpen={!!selectedProperty} property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      
      <section style={{ width: '100%', backgroundColor: 'var(--cream)' }}>
        <div ref={containerRef} style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '100px 0' }}>
          <div style={{ padding: '0 20px', marginBottom: '60px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 'clamp(2.5rem, 5vw, 48px)', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--black)', margin: '0 auto 16px', textAlign: 'center' }}>
              HIGHLIGHT<br/>PROPERTIES
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.6)', maxWidth: '650px', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 auto', textAlign: 'center' }}>
              A meticulously curated selection of the most architecturally significant residences on the planet. Click any property to view God Layout metrics.
            </p>
          </div>

          <div className="bento-grid">
            {properties.map((prop, i) => (
              <div 
                key={prop.id} 
                ref={el => { itemsRef.current[i] = el; }}
                className={`bento-item ${prop.size === 'large' ? 'large' : ''}`}
                onClick={() => setSelectedProperty(prop)}
                style={{ 
                  height: prop.size === 'large' ? '600px' : '290px',
                  cursor: 'pointer'
                }}
              >
                <div className="bento-image-container pointer-events-none">
                  <Image 
                    src={prop.img} 
                    alt={prop.title} 
                    fill 
                    className="bento-image pointer-events-none"
                    sizes={prop.size === 'large' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
                
                <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' }}>
                  <h3 style={{ fontSize: prop.size === 'large' ? '32px' : '20px', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)', margin: 0 }}>
                    {prop.title}
                  </h3>
                  <div style={{ background: 'var(--neon-yellow)', display: 'inline-block', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, width: 'fit-content' }}>
                    {prop.loc}
                  </div>
                </div>

                <div className="price-tag pointer-events-none" style={{ pointerEvents: 'none' }}>
                  {prop.price}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', perspective: '1000px' }}>
            <Link href="/exclusive-properties" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5, rotateX: 10, boxShadow: '0 20px 40px rgba(197, 160, 89, 0.4)' }}
                whileTap={{ scale: 0.95, rotateX: -10, boxShadow: '0 10px 20px rgba(197, 160, 89, 0.2)' }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  background: 'linear-gradient(135deg, var(--neon-yellow) 0%, #C5A059 100%)',
                  color: 'var(--black)',
                  padding: '20px 50px',
                  borderRadius: '100px',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  border: '1px solid rgba(255,255,255,0.4)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
              >
                Let's Find It <Compass size={24} strokeWidth={2.5} />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

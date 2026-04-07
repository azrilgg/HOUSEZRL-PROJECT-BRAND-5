'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Observer } from 'gsap/dist/Observer';

gsap.registerPlugin(Observer);

const images = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800'
];

export default function ArchitectureVision() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current || !containerRef.current) return;

    let rotation = 0;
    const cards = gsap.utils.toArray(carouselRef.current.children) as HTMLElement[];
    const radius = window.innerWidth < 768 ? 150 : 250; // Shrink radius on mobile

    // Position cards in a circle
    cards.forEach((card, i) => {
      const angle = (i / cards.length) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      gsap.set(card, {
        x: x,
        z: z,
        rotationY: (angle * 180) / Math.PI,
      });
    });

    Observer.create({
      target: containerRef.current,
      type: 'wheel,touch,pointer',
      wheelSpeed: -1,
      onChangeY: (self) => {
        rotation += self.deltaY * 0.1;
        gsap.to(carouselRef.current, {
          rotationY: rotation,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });

  }, []);

  return (
    <section ref={containerRef} style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '100px 5%', backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="vision-container" style={{ display: 'flex', width: '100%', maxWidth: '1400px', flexDirection: 'row', flexWrap: 'wrap', gap: 'clamp(40px, 8vw, 80px)' }}>

        {/* Left: 3D Carousel */}
        <div style={{ flex: '1 1 min(100%, 400px)', minHeight: 'clamp(300px, 50vh, 500px)', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px' }}>
          <div
            ref={carouselRef}
            style={{
              width: 'clamp(200px, 40vw, 300px)',
              height: 'clamp(300px, 50vw, 400px)',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <Image src={img} alt="Architecture" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 250px, 300px" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Typography */}
        <div style={{ flex: '1 1 min(100%, 400px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 20px', textAlign: 'center', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '-0.03em', color: '#ffffff', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
            Architectural<br />Vision
          </h2>

          <div style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', marginBottom: '12px', fontWeight: 700, color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>IoT Integration</h3>
            <p style={{ color: '#cccccc', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: 1.6, maxWidth: '500px' }}>
              Seamlessly integrated neural systems allow your home to anticipate needs before you articulate them. Every surface becomes an interface.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', marginBottom: '12px', fontWeight: 700, color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>Smart Home Solutions</h3>
            <p style={{ color: '#cccccc', fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: 1.6, maxWidth: '500px' }}>
              Climate, lighting, and security harmonize through a centralized God-tier layout AI, establishing a perfect environment tuned to your biometrics.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

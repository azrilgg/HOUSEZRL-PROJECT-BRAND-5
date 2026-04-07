'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  { img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1920", title: "Spatial Dominance", desc: "Monolithic boundaries engineered for ultimate privacy." },
  { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920", title: "Absolute Symbiosis", desc: "Fusing raw concrete forms with untamed nature." },
  { img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1920", title: "Kinetic Light", desc: "Automated facades that breathe with the shifting sun." },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920", title: "Zen Scale", desc: "Proportions computed specifically for cognitive comfort." }
];

export default function AnimationGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;

    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.gallery-item') as HTMLElement[];
      const totalItems = sections.length;

      // Ensure absolutely flawless horizontal movement bounded by pure percentages (no `vw` math bugs)
      const xTravel = -100 * (totalItems - 1) / totalItems;

      const tween = gsap.to(scrollWrapperRef.current, {
        xPercent: xTravel, 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${window.innerHeight * 3}`, // Flawless responsive length calculation
          invalidateOnRefresh: true,
        }
      });

      sections.forEach((section) => {
        const img = section.querySelector('.gallery-img');
        if (!img) return;

        gsap.fromTo(img, {
          x: '-5%' // Safe bound for parallax width
        }, {
          x: '5%',
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
            invalidateOnRefresh: true
          }
        });
      });

      // Force refresh for safe Footer rendering after DOM calculates the pin wrapper
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

    }, containerRef); // Scoped closely for safety

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden', backgroundColor: '#000', zIndex: 10, position: 'relative' }}>
      <section 
        ref={sectionRef} 
        style={{
          width: '100%',
          height: '100vh',
          color: 'white',
          position: 'relative',
          margin: 0,
          padding: 0
        }}
      >
        {/* Intro Text Overlay - Hard locked to top left and placed over everything */}
        <div style={{ position: 'absolute', top: 'clamp(20px, 5vh, 40px)', left: 'clamp(20px, 5vw, 40px)', zIndex: 50, pointerEvents: 'none' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: 'white', textTransform: 'uppercase', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Home <span style={{ color: 'var(--neon-yellow)' }}>Highlight</span>
          </h2>
        </div>

        <div 
          ref={scrollWrapperRef}
          style={{
            display: 'flex',
            height: '100vh',
            width: `${galleryData.length * 100}%`, // Strict percentage width (400%)
            flexWrap: 'nowrap',
            willChange: 'transform'
          }}
        >
          {galleryData.map((item, i) => (
            <div 
              key={i}
              className="gallery-item"
              style={{
                flex: `0 0 ${100 / galleryData.length}%`, // Each item is strictly 25% of the 400% parent (aka 100% of viewport)
                height: '100vh', 
                position: 'relative',
                overflow: 'hidden', 
              }}
            >
              <div style={{ width: '110%', height: '100%', position: 'absolute', top: 0, left: '-5%' }}>
                <Image 
                  className="gallery-img"
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
                 
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(30px, 5vw, 60px) clamp(20px, 5vw, 40px)', 
                background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)',
                zIndex: 10
              }}>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', marginBottom: '10px', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

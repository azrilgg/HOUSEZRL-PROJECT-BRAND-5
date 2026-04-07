'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Layers, Zap, Shield } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { Oswald } from 'next/font/google';
import { motion } from 'framer-motion';
import HeroBackground from './HeroBackground';

const superBoldFont = Oswald({
  weight: '700',
  subsets: ['latin'],
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textBgRef = useRef<HTMLHeadingElement>(null);
  const textFgRef = useRef<HTMLHeadingElement>(null);
  const houseMainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isDesktop } = context.conditions as any;

      if (textBgRef.current && textFgRef.current && houseMainRef.current && containerRef.current) {
        
        // Desktop-only centering
        if (isDesktop) {
          gsap.set([textBgRef.current, textFgRef.current], { xPercent: -50, yPercent: -50 });
        } else {
          gsap.set([textBgRef.current, textFgRef.current], { xPercent: 0, yPercent: 0 });
        }

        // Staggered House Entrance Animations
        const timeline = gsap.timeline({ delay: 0.4 });
        
        timeline.fromTo(houseMainRef.current,
          { scale: 0.8, opacity: 0, y: isDesktop ? 150 : 50 },
          { scale: 1, opacity: 1, y: 0, duration: 2, ease: 'expo.out' }
        );

        // Scroll Parallax for God Text
        gsap.to([textBgRef.current, textFgRef.current], {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          scale: isDesktop ? 1.3 : 1.1,
          y: isDesktop ? -150 : -30,
          opacity: 0,
          ease: 'none',
        });

        // Individual Parallax for Main House
        gsap.to(houseMainRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
          scale: isDesktop ? 0.9 : 1,
          y: isDesktop ? 120 : 40,
          ease: 'none',
        });
      }
    });

    // 3D Tilt Effect - Desktop Only
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 768) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 15;
      const yPos = (clientY / innerHeight - 0.5) * -15;

      if (houseMainRef.current) {
        gsap.to(houseMainRef.current, { rotationY: xPos, rotationX: yPos, duration: 1, ease: 'power3.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mm.revert(); // clean up gsap matchMedia
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-section" style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--black)' }}>
      {/* Background Particles Layer */}
      <HeroBackground />
      
      {/* Background Typography */}
      <h1 ref={textBgRef} className={`${superBoldFont.className} hero-text title-bg`}>HOUSEZRL</h1>

      {/* 3D Main House */}
      <div className="hero-house-cluster" style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 30, perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <div 
          ref={houseMainRef}
          className="hero-house main-house"
          style={{
            position: 'absolute',
            left: '50%',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 60vw, 900px)',
            height: 'clamp(200px, 60vh, 700px)',
            zIndex: 35,
            filter: 'drop-shadow(0px 40px 80px rgba(0,0,0,0.3))'
          }}
        >
          <Image src="/images/housebg.png" alt="Main Modern Villa" fill style={{ objectFit: 'contain' }} priority sizes="100vw" />
        </div>
      </div>

      {/* Foreground Typography */}
      <h1 ref={textFgRef} className={`${superBoldFont.className} hero-text title-fg`}>HOUSEZRL</h1>

      {/* Foreground UI Widgets */}
      <div className="hero-foreground">
        
        {/* Left Container */}
        <div className="glass hero-left" style={{ padding: '32px', borderRadius: '24px', pointerEvents: 'auto' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '16px', lineHeight: 1.1 }}>Transforming the future of living</h1>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '24px', lineHeight: 1.5 }}>
            Experience spatial harmony where premium architecture meets futuristic smart-living solutions.
          </p>
          <MagneticButton>
            <Link href="/contact" style={{ display: 'inline-block' }}>
              <button className="pill-btn neon">Get Started</button>
            </Link>
          </MagneticButton>
        </div>

        {/* Right Container */}
        <div className="hero-right" style={{ pointerEvents: 'auto', perspective: '1000px' }}>
          {[
            { icon: <Layers size={20} />, text: 'Modern Home' },
            { icon: <Zap size={20} />, text: 'Eco-Friendly' },
            { icon: <Shield size={20} />, text: 'Secure Living' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, rotateX: 15, rotateY: -15, z: 20, boxShadow: '0 20px 40px rgba(226,255,49,0.3)', borderColor: 'var(--neon-yellow)' }}
              whileTap={{ scale: 0.95 }}
              className="glass flex items-center" 
              style={{ padding: '12px 20px', borderRadius: '99px', gap: '12px', marginLeft: i > 0 ? `-${i * 20}px` : 0, cursor: 'pointer', transformStyle: 'preserve-3d', transition: 'border-color 0.3s ease' }}
            >
              {item.icon}
              <span style={{ fontSize: '14px', fontWeight: 600 }}>{item.text}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

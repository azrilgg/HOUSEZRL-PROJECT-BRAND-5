'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HouseStyles from '@/components/HouseStyles';
import BentoGrid from '@/components/BentoGrid';
import ArchitectureVision from '@/components/ArchitectureVision';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import AnimationGallery from '@/components/AnimationGallery';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Global morph removed - background effects are now locally scoped to specific sections (like BentoGrid)
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <HouseStyles />
      <BentoGrid />
      <Testimonials />
      <ArchitectureVision />
      <AnimationGallery />
      
      <Footer />
    </main>
  );
}

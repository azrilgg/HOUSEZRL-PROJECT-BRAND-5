'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';

const faqs = [
  { q: "What is God Layout Architecture?", a: "It is our proprietary design philosophy that ensures flawless visual aesthetics, spatial harmony, and absolute responsiveness across all possible screen dimensions without sacrificing performance." },
  { q: "How long does a conceptual design take?", a: "Using our advanced algorithmic approach, initial blueprints are generated within 14 days, followed by a 30-day refinement period with our master architects." },
  { q: "Are the properties actually carbon negative?", a: "Yes. Through advanced material science and sustainable integration, our homes produce surplus clean energy that can be routed back into the local grid." },
  { q: "Do you design for iOS tablets and mobile?", a: "Every digital and physical interface we design is rigorously tested to ensure a zero-cut, absolutely fluid experience on any device geometry." },
  { q: "What constitutes a 'Super Design' logo?", a: "Our logos are engineered for mathematical symmetry and psychological impact, using golden ratios and negative space to establish instant prestige." },
  { q: "Can I customize the particle effects in my residence?", a: "Through the 'God Controller' app, owners can adjust the density, color, and behavior of spatial light particles to match their current mood or circadian rhythm." },
  { q: "How does the infinite-scrolling marquee impact structural integrity?", a: "While the 'marquee' is a digital concept, we apply similar fluid motion principles to our kinetic facades, allowing buildings to breathe and shift in response to light and wind." },
  { q: "What is the 'God Tier' property detail system?", a: "A comprehensive analytical overlay that provides real-time data on every atom of your home, from structural stress to ambient oxygen levels, all accessible via a spatial 3D interface." }
];



export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', color: 'var(--black)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 0' }}>
      <Navbar />
      
      {/* Super FAQs Section */}
      <section style={{ paddingLeft: '5%', paddingRight: '5%', maxWidth: '850px', width: '100%', margin: '0 auto' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textAlign: 'center', marginBottom: '60px' }}
        >
          SUPER FAQS
        </motion.h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               style={{
                 background: '#fff',
                 borderRadius: '24px',
                 overflow: 'hidden',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
               }}
             >
               <button 
                 onClick={() => toggle(i)}
                 style={{
                   width: '100%',
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   padding: '30px',
                   background: 'transparent',
                   border: 'none',
                   cursor: 'pointer',
                   fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                   fontWeight: 600,
                   textAlign: 'left',
                   color: 'var(--black)'
                 }}
               >
                 {faq.q}
                 <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                    {openIndex === i ? <Minus /> : <Plus />}
                 </motion.div>
               </button>
               
               <AnimatePresence>
                 {openIndex === i && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div style={{ padding: '0 30px 30px 30px', color: 'rgba(5,5,5,0.7)', lineHeight: 1.6, fontSize: '1.1rem' }}>
                       {faq.a}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

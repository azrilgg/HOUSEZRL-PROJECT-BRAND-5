'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import BlogModal, { BlogPost } from '@/components/BlogModal';
import { Search, Filter, ArrowRight, Share2 } from 'lucide-react';
import gsap from 'gsap';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "THEORY",
    title: "The Mathematics of Shadow",
    excerpt: "Architectural lighting is not about bulbs; it's about the deliberate absence of light. Explore the psychology behind high-contrast spatial design.",
    date: "Oct 12, 2026",
    author: "Julian Azriel",
    authorRole: "Lead Visionary",
    img: "https://i.pinimg.com/736x/28/d2/2c/28d22c61f0f381f165b9a51f855ebca7.jpg",
    readingTime: "8 MIN",
    content: `
      <h2>The Philosophy of Dark Space</h2>
      <p>In modern architecture, we are obsessed with transparency and lightness. But at HouseZrl, we believe that the true essence of a <strong>God Layout</strong> lies in the shadows. We use mathematical algorithms to calculate exact shadow fall-off points, creating an atmosphere that induces cognitive relaxation.</p>
      <div style="height: 300px; position: relative; margin: 40px 0; border-radius: 20px; overflow: hidden; background: #eee;">
        <img src="https://i.pinimg.com/1200x/7e/e5/b3/7ee5b3d976db936d63e78be202083962.jpg" alt="Shadow Pattern" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <h3>The Cortisol Connection</h3>
      <p>Research indicates that flat, omni-directional lighting increases stress levels. By creating "light islands" within a home, we mimic natural forest-floor lighting, which has been shown to reduce cortisol production by up to 22%.</p>
      <p>Every corner of a HouseZrl residence is a calculated intersection of geometry and darkness. We don't just build walls; we architect the silence between the photons.</p>
    `
  },
  {
    id: 2,
    category: "TECHNOLOGY",
    title: "God Layout 3.0: Neural Integration",
    excerpt: "Moving beyond 'Smart Home' into 'Neural Architecture'. Learn how our structures now learn and adapt to your biometric rhythm.",
    date: "Sep 28, 2026",
    author: "Marcus Aurelius",
    authorRole: "Chief AI Architect",
    img: "https://i.pinimg.com/1200x/17/8b/6b/178b6b0e10bfa32c4af6973b61eecee5.jpg",
    readingTime: "12 MIN",
    content: `
      <h2>The Sentient Structure</h2>
      <p>The home of the future isn't just connected; it's conscious. Version 3.0 of our <strong>God Layout</strong> protocol integrates low-latency neural processing directly into the structural concrete and glass.</p>
      <h3>Circadian Synchronization</h3>
      <p>Your home should know you're tired before you do. Through invisible biometric sensors, the environment adjusts oxygen concentration, lighting temperature, and sonic damping to meet your exact biological needs in real-time.</p>
      <p>We are no longer building containers for life; we are building life-support systems that enhance human performance and well-being through sheer architectural intelligence.</p>
    `
  },
  {
    id: 3,
    category: "SUSTAINABILITY",
    title: "Carbon Zero, Aesthetic One",
    excerpt: "Luxury no longer requires sacrifice. Our new graphene-integrated facades generate enough surplus power to run an entire city block.",
    date: "Nov 05, 2026",
    author: "Sarah Jenkins",
    authorRole: "Sustainability Lead",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    readingTime: "6 MIN",
    content: `
      <h2>The Tesla-Grade Residence</h2>
      <p>True luxury is the ability to exist without footprint. Our latest projects use <strong>God-tier graphene solar skin</strong>, which is 400% more efficient than traditional silicon panels while remaining entirely transparent.</p>
      <h3>Total Autonomy</h3>
      <p>A HouseZrl home is its own grid. We have developed closed-loop water purification and energy storage systems that allow our clients to exist in total comfort, even in the most remote environments on Earth.</p>
      <p>Sustainability is not a feature; it is the fundamental foundation of our architectural integrity. We build for the next century, not just next year.</p>
    `
  },
  {
    id: 4,
    category: "PHILOSOPHY",
    title: "The Physics of Ambient Perfection",
    excerpt: "Inside the pursuit of the 'Invisible House'. Why the best technology is that which disappears entirely into the background.",
    date: "Dec 12, 2026",
    author: "Alexander Vance",
    authorRole: "Design Theorist",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    readingTime: "10 MIN",
    content: `
      <h2>Invisible Engineering</h2>
      <p>The ultimate goal of design is invisibility. If you can see the technology, we have failed. In the <strong>God Layout</strong>, every hardware component is hidden behind a veil of aesthetic perfection.</p>
      <h3>Total Immersive Ease</h3>
      <p>Interaction should be as natural as breathing. We replace buttons with intention-tracking AI. We replace vents with breathable walls. We replace clutter with spatial clarity.</p>
      <p>When the house understands your intent, the boundary between the self and the environment begins to dissolve. That is the moment of architectural transcendence.</p>
    `
  },
  {
    id: 5,
    category: "MATERIALS",
    title: "Quantum Materiality: Reactive Facades",
    excerpt: "Discover the future of building skins that breathe, heal, and shift opacity based on the sun's trajectory and your inner mood.",
    date: "Jan 15, 2027",
    author: "Dr. Elena Vance",
    authorRole: "Materials Scientist",
    img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&q=80&w=1200",
    readingTime: "9 MIN",
    content: `
      <h2>The Living Skin</h2>
      <p>We are moving away from static materials. At HouseZrl, we are pioneering <strong>Quantum Facades</strong>—building envelopes integrated with micro-fluidic channels that move heat and light with the efficiency of a biological organism.</p>
      <div style="height: 300px; position: relative; margin: 40px 0; border-radius: 20px; overflow: hidden;">
        <img src="https://i.pinimg.com/736x/b0/c1/e4/b0c1e41e3b707af975fe2ea4cc83384d.jpg" alt="Quantum Tech" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <h3>Shape-Shifting Geometry</h3>
      <p>Imagine a window that becomes a wall when you need privacy, or a facade that opens its 'pores' to harvest humidity for your internal garden. This isn't science fiction; it's the next iteration of the <strong>God Layout</strong>.</p>
      <p>By using piezo-electric materials, your home's exterior now generates power from the very wind that hits it, turning a structural necessity into an energetic asset.</p>
    `
  },
  {
    id: 6,
    category: "DESIGN",
    title: "The Sacred Geometry of Flow",
    excerpt: "Why the Golden Ratio is just the beginning. How mathematical harmonic resonance creates spaces that heal the human nervous system.",
    date: "Feb 02, 2027",
    author: "Julian Azriel",
    authorRole: "Lead Visionary",
    img: "https://i.pinimg.com/originals/60/9b/32/609b322d4e30de78b86d93800a4e298e.jpg",
    readingTime: "14 MIN",
    content: `
      <h2>Beyond the Golden Ratio</h2>
      <p>While most architects stop at the 1.618 ratio, we delve into <strong>Spatial Resonance Theory</strong>. Every room in a HouseZrl project is tuned like a musical instrument to vibrate at frequencies that promote alpha-wave production in the brain.</p>
      <h3>The Fibonacci Sequence in 3D</h3>
      <p>By arranging structural pillars and void spaces according to specific mathematical sequences, we create a 'Flow State' that is felt the moment you cross the threshold. This is design as a biological corrective measure.</p>
      <p>We don't just design for the eye; we design for the central nervous system. When your environment is in perfect harmonic alignment, your potential for creativity and rest is mathematically maximized.</p>
    `
  }
];

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; color: string;
      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 0.5;
        this.color = Math.random() > 0.5 ? '#e2ff31' : 'rgba(255,255,255,0.3)';
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (mouse.current.active) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            this.x += dx * 0.02;
            this.y += dy * 0.02;
          }
        }
        if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
      }
      draw(c: CanvasRenderingContext2D) {
        c.beginPath(); c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color; c.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 80 }, () => new Particle(canvas.width, canvas.height));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(canvas.width, canvas.height); p.draw(ctx); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init(); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      }}
      onMouseLeave={() => mouse.current.active = false}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 1 }} 
    />
  );
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const lastSignup = localStorage.getItem('elite_signup_timestamp');
    if (lastSignup) {
      const timeElapsed = Date.now() - parseInt(lastSignup);
      if (timeElapsed < 24 * 60 * 60 * 1000) {
        setIsJoined(true);
        const savedEmail = localStorage.getItem('elite_email') || "";
        setEmail(savedEmail);
      }
    }
  }, []);

  const handleJoinElite = (e: React.FormEvent) => {
    e.preventDefault();
    const lastSignup = localStorage.getItem('elite_signup_timestamp');
    
    if (lastSignup) {
      const timeElapsed = Date.now() - parseInt(lastSignup);
      if (timeElapsed < 24 * 60 * 60 * 1000) {
        const remainingHours = Math.ceil((24 * 60 * 60 * 1000 - timeElapsed) / (60 * 60 * 1000));
        setError(`ACCESS RESTRICTED: YOUR IDENTITY HAS ALREADY JOINED. NEXT WINDOW IN ${remainingHours}H.`);
        return;
      }
    }

    if (email) {
      localStorage.setItem('elite_signup_timestamp', Date.now().toString());
      localStorage.setItem('elite_email', email);
      setIsJoined(true);
      setError("");
    }
  };

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', color: 'var(--black)', paddingBottom: '120px' }}>
      <Navbar />
      <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} post={selectedPost} />

      {/* Hero Section */}
      <section style={{ paddingTop: 'clamp(100px, 15vh, 150px)', paddingLeft: '5%', paddingRight: '5%', maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           style={{ textAlign: 'center', marginBottom: 'clamp(60px, 10vw, 100px)' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.05)', padding: '8px 18px', borderRadius: '100px', marginBottom: 'clamp(20px, 4vw, 30px)' }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--black)', borderRadius: '50%', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }} />
            <span style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>THE ARCHITECTURAL LEDGER</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', marginBottom: 'clamp(20px, 5vw, 40px)' }}>
            SUPER GOD <br/> <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--black)' }}>INSIGHTS</span>
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6, paddingBottom: '20px' }}>
            Exclusive thought leadership from the pioneers of the God Layout. Exploring the intersection of human psychology, advanced material science, and neural architecture.
          </p>
        </motion.div>

        {/* Filter & Search */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: 'clamp(40px, 8vw, 80px)', flexWrap: 'wrap' }}>
           <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
              <input 
                type="text" 
                placeholder="Search articles / categories..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', 
                  background: 'white', 
                  border: '1px solid rgba(0,0,0,0.1)', 
                  padding: 'clamp(16px, 3vw, 20px) clamp(50px, 8vw, 60px)', 
                  borderRadius: '100px', 
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', 
                  color: 'var(--black)', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  outline: 'none'
                }} 
              />
              <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3, width: 'clamp(18px, 4vw, 22px)' }} />
           </div>
        </div>

        {/* Bento Grid Listing */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
           {filteredPosts.map((post, i) => (
             <motion.div
               key={post.id}
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               whileInView={{ opacity: 1, scale: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.6 }}
               whileHover={{ y: -15, boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}
               onClick={() => handleOpenPost(post)}
               style={{
                 background: 'white',
                 borderRadius: '32px',
                 overflow: 'hidden',
                 cursor: 'pointer',
                 display: 'flex',
                 flexDirection: 'column',
                 position: 'relative',
                 transition: 'all 0.4s ease',
                 height: '100%'
               }}
             >
               <div style={{ position: 'relative', width: '100%', height: '240px', overflow: 'hidden' }}>
                 <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} />
                 <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--neon-yellow)', color: 'var(--black)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800 }}>{post.category}</div>
               </div>
               
               <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{post.date}</span>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{post.readingTime} READ</span>
                 </div>
                 <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px', lineHeight: 1.2 }}>{post.title}</h3>
                 <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: 1.5, fontSize: '1rem', flex: 1 }}>{post.excerpt}</p>
                 
                 <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <div style={{ width: '32px', height: '32px', background: 'var(--black)', color: 'var(--neon-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>{post.author.charAt(0)}</div>
                       <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{post.author}</span>
                    </div>
                    <ArrowRight size={20} />
                 </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Big CTA: JOIN THE ELITE */}
        <motion.div
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{ 
             marginTop: '140px', 
             background: 'var(--black)', 
             padding: 'clamp(60px, 12vw, 120px) 20px', 
             borderRadius: '64px', 
             color: 'white', 
             textAlign: 'center', 
             position: 'relative', 
             overflow: 'hidden',
             boxShadow: '0 60px 120px rgba(0,0,0,0.4)',
             border: '1px solid rgba(255,255,255,0.05)'
           }}
        >
           {/* Interactive Particles Background */}
           <ParticleCanvas />

           {/* Animated God-Tier Backdrop Orbs */}
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               x: [0, 50, 0],
               y: [0, -30, 0],
               opacity: [0.15, 0.25, 0.15]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
             style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--neon-yellow) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} 
           />
           <motion.div 
             animate={{ 
               scale: [1, 1.1, 1],
               x: [0, -40, 0],
               y: [0, 60, 0],
               opacity: [0.1, 0.2, 0.1]
             }}
             transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
             style={{ position: 'absolute', bottom: '-150px', left: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} 
           />

           <AnimatePresence mode="wait">
             {!isJoined ? (
               <motion.div
                 key="form"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 style={{ position: 'relative', zIndex: 10 }}
               >
                 <div style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '10px 24px', borderRadius: '100px', marginBottom: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                   <div style={{ width: '8px', height: '8px', background: 'var(--neon-yellow)', borderRadius: '50%', boxShadow: '0 0 15px var(--neon-yellow)' }} />
                   <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase' }}>LIMITED ENROLLMENT OPEN</span>
                 </div>
                 
                 <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 900, marginBottom: '25px', lineHeight: 1 }}>JOIN THE <span style={{ color: 'var(--neon-yellow)' }}>ELITE</span></h2>
                 <p style={{ maxWidth: '650px', margin: '0 auto 50px', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                   Gain the structural paradigm shift. Get the exclusive 'God Layout' Whitepaper and private ecosystem updates directly to your high-perf sequence.
                 </p>
                 
                 {error && (
                   <motion.p 
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     style={{ color: '#ff4b4b', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}
                   >
                     {error}
                   </motion.p>
                 )}
                 <form onSubmit={handleJoinElite} style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{ position: 'relative', flex: '1 1 300px' }}>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your professional email" 
                        style={{ width: '100%', padding: '24px 40px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', outline: 'none', transition: 'all 0.4s', fontSize: '1.2rem' }}
                        onFocus={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'var(--neon-yellow)'; }}
                        onBlur={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                      />
                    </div>
                    <button type="submit" className="pill-btn neon" style={{ padding: '24px 50px', fontSize: '1.1rem', boxShadow: '0 20px 40px rgba(226, 255, 49, 0.2)' }}>
                      Request Access
                    </button>
                 </form>
               </motion.div>
             ) : (
               <motion.div
                 key="done"
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                 style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
               >
                 <div style={{ width: '100px', height: '100px', background: 'var(--neon-yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '40px', boxShadow: '0 0 50px rgba(226, 255, 49, 0.4)' }}>
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--black)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 </div>
                 <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, marginBottom: '20px', color: 'var(--neon-yellow)' }}>ACCESS GRANTED</h2>
                 <p style={{ maxWidth: '500px', fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, lineHeight: 1.4 }}>
                    Welcome to the Inner Circle. An Elite Artifact (Master Package) has been dispatched to your sequence: <br/> 
                    <span style={{ color: 'white', fontWeight: 800 }}>{email}</span>
                 </p>
                 <div style={{ marginTop: '40px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase' }}>IDENTITY LOCKED FOR 24H</div>
               </motion.div>
             )}
           </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Send, MapPin, Mail, Phone, CheckCircle2, Fingerprint, Lock } from 'lucide-react';

const NeuralBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (mouse.current.active) {
          const dx = mouse.current.x - this.x;
          const dy = mouse.current.y - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 200) { this.x += dx * 0.01; this.y += dy * 0.01; }
        }
        if (this.x < 0) this.x = canvas.width; if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height; if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(226, 255, 49, 0.4)'; ctx!.fill();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: 100 }, () => new Particle());
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(226, 255, 49, ${0.15 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
        if (mouse.current.active) {
          const dx = particles[i].x - mouse.current.x;
          const dy = particles[i].y - mouse.current.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 180) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(226, 255, 49, ${0.3 * (1 - dist / 180)})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(mouse.current.x, mouse.current.y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    init(); animate();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      onMouseMove={(e) => mouse.current = { x: e.clientX, y: e.clientY, active: true }}
      onMouseLeave={() => mouse.current.active = false}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'auto' }} 
    />
  );
};

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [messagesSent, setMessagesSent] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('hz_inquiry_date');
    if (storedDate === today) {
      setMessagesSent(parseInt(localStorage.getItem('hz_inquiry_count') || '0', 10));
    } else {
      localStorage.setItem('hz_inquiry_date', today);
      localStorage.setItem('hz_inquiry_count', '0');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle' || messagesSent >= 5) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      const newCount = messagesSent + 1;
      setMessagesSent(newCount);
      localStorage.setItem('hz_inquiry_count', newCount.toString());
      setTimeout(() => setStatus('idle'), 4000);
    }, 2500);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: 'var(--cream)', paddingBottom: '120px', overflow: 'hidden', position: 'relative' }}>
      <Navbar />
      
      {/* Neural Interaction Layer */}
      <NeuralBackground />

      {/* Atmospheric Glow Orbs */}
      <div style={{ position: 'fixed', top: '10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(226, 255, 49, 0.05) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: [0, 0.2, 0], scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at center, var(--neon-yellow) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 9999 }}
          />
        )}
      </AnimatePresence>

      <section style={{ paddingTop: 'clamp(100px, 12vh, 180px)', paddingLeft: '5%', paddingRight: '5%', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%', marginBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(226, 255, 49, 0.1)', border: '1px solid rgba(226, 255, 49, 0.2)', padding: 'clamp(6px, 1.5vw, 10px) clamp(16px, 3vw, 24px)', borderRadius: '100px', marginBottom: 'clamp(20px, 4vw, 30px)' }}>
             <div style={{ width: 'clamp(4px, 1vw, 6px)', height: 'clamp(4px, 1vw, 6px)', background: 'var(--neon-yellow)', borderRadius: '50%', boxShadow: '0 0 10px var(--neon-yellow)' }} />
             <span style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', fontWeight: 800, letterSpacing: 'clamp(2px, 0.5vw, 4px)', textTransform: 'uppercase', color: 'var(--neon-yellow)' }}>ACQUISITION PROTOCOL</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.8rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
            CONTACT <br /> <span style={{ color: 'transparent', WebkitTextStroke: 'clamp(1px, 0.3vw, 2px) var(--neon-yellow)' }}>US NOW</span>
          </h1>
          <p style={{ marginTop: 'clamp(15px, 3vw, 25px)', fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.6)', maxWidth: '700px', lineHeight: 1.6, padding: '0 10px' }}>
            Initiate your journey into Architectural Perfection. Our representatives will guide you through the structural paradigm shift.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', gap: '80px', alignItems: 'start' }}>
          
          {/* Form Side */}
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', padding: 'clamp(30px, 8vw, 60px)', borderRadius: '48px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '40px' }} onSubmit={handleSubmit}>
              <div style={{ position: 'relative' }}>
                <label style={{ position: 'absolute', top: '-12px', left: '20px', fontSize: '0.7rem', color: 'var(--neon-yellow)', background: '#0c0c0c', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, letterSpacing: '1px' }}>FULL IDENTITY</label>
                <input type="text" required placeholder="Julian Azriel" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', padding: '22px 25px', fontSize: '1.1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'var(--neon-yellow)'; e.target.style.background = 'rgba(255,255,255,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }} disabled={status !== 'idle' || messagesSent >= 5} />
              </div>
              <div style={{ position: 'relative' }}>
                <label style={{ position: 'absolute', top: '-12px', left: '20px', fontSize: '0.7rem', color: 'var(--neon-yellow)', background: '#0c0c0c', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, letterSpacing: '1px' }}>EMAIL FREQUENCY</label>
                <input type="email" required placeholder="exec@housezrl.com" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', padding: '22px 25px', fontSize: '1.1rem', outline: 'none', transition: 'all 0.3s' }} onFocus={(e) => { e.target.style.borderColor = 'var(--neon-yellow)'; e.target.style.background = 'rgba(255,255,255,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }} disabled={status !== 'idle' || messagesSent >= 5} />
              </div>
              <div style={{ position: 'relative' }}>
                <label style={{ position: 'absolute', top: '-12px', left: '20px', fontSize: '0.7rem', color: 'var(--neon-yellow)', background: '#0c0c0c', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, letterSpacing: '1px' }}>INQUIRY DATA</label>
                <textarea required placeholder="Briefly describe your vision for acquisition..." rows={4} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', padding: '22px 25px', fontSize: '1.1rem', outline: 'none', transition: 'all 0.3s', resize: 'none' }} onFocus={(e) => { e.target.style.borderColor = 'var(--neon-yellow)'; e.target.style.background = 'rgba(255,255,255,0.08)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }} disabled={status !== 'idle' || messagesSent >= 5} />
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <motion.button 
                  type="submit" 
                  disabled={status !== 'idle' || messagesSent >= 5}
                  style={{ width: '100%', height: '70px', borderRadius: '100px', border: 'none', background: status === 'success' ? '#C5A059' : 'var(--neon-yellow)', color: 'var(--black)', fontSize: '1.2rem', fontWeight: 800, cursor: (status !== 'idle' || messagesSent >= 5) ? 'default' : 'pointer', letterSpacing: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: messagesSent >= 5 ? 0.3 : 1, transition: 'all 0.4s' }}
                  whileHover={(status === 'idle' && messagesSent < 5) ? { scale: 1.02, boxShadow: '0 20px 40px rgba(226, 255, 49, 0.2)' } : {}}
                  whileTap={(status === 'idle' && messagesSent < 5) ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {messagesSent >= 5 ? (
                      <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>IDENTITY LOCKED <Lock size={20} /></motion.div>
                    ) : status === 'idle' ? (
                      <motion.div key="idle" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>AUTHORIZE INQUIRY <Send size={22} /></motion.div>
                    ) : status === 'sending' ? (
                      <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} style={{ display: 'flex' }}><Fingerprint size={28} /></motion.div>
                        CONNECTING...
                      </motion.div>
                    ) : (
                      <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>DATA LOGGED <CheckCircle2 size={26} /></motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div style={{ marginTop: '20px', fontSize: '0.7rem', color: messagesSent >= 5 ? '#ff4b4b' : 'rgba(255,255,255,0.3)', textAlign: 'center', fontWeight: 800, letterSpacing: '2px' }}>
                   SECURITY PROTOCOL: {5 - messagesSent} SEQUENCES REMAINING TODAY
                </div>
              </div>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
          >
             <div style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', padding: 'clamp(24px, 5vw, 50px)', borderRadius: 'clamp(24px, 4vw, 48px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: 'clamp(20px, 4vw, 40px)', letterSpacing: '-0.02em' }}>GLOBAL ACCESS</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 35px)' }}>
                   <div style={{ display: 'flex', gap: 'clamp(15px, 3vw, 20px)' }}>
                      <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)', borderRadius: '12px', background: 'rgba(226, 255, 49, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-yellow)', flexShrink: 0 }}><MapPin size={22} /></div>
                      <div>
                         <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, marginBottom: '6px' }}>BEVERLY HILLS</h4>
                         <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>1000 Premium Avenue<br/>Los Angeles, CA 90210</p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', gap: 'clamp(15px, 3vw, 20px)' }}>
                      <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)', borderRadius: '12px', background: 'rgba(226, 255, 49, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-yellow)', flexShrink: 0 }}><Mail size={22} /></div>
                      <div>
                         <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, marginBottom: '6px' }}>ELITE DESK</h4>
                         <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>exec@housezrl.com</p>
                      </div>
                   </div>
                   <div style={{ display: 'flex', gap: 'clamp(15px, 3vw, 20px)' }}>
                      <div style={{ width: 'clamp(40px, 8vw, 50px)', height: 'clamp(40px, 8vw, 50px)', borderRadius: '12px', background: 'rgba(226, 255, 49, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-yellow)', flexShrink: 0 }}><Phone size={22} /></div>
                      <div>
                         <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, marginBottom: '6px' }}>DIRECT LINE</h4>
                         <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)' }}>+1 (800) HOUSE-ZRL</p>
                      </div>
                   </div>
                </div>

                <div style={{ marginTop: 'clamp(30px, 6vw, 50px)', paddingTop: 'clamp(20px, 5vw, 40px)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '12px' }}>
                   <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: 'clamp(12px, 3vw, 20px)', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 900, color: 'var(--neon-yellow)' }}>24/7</div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '5px' }}>Response Matrix</div>
                   </div>
                   <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: 'clamp(12px, 3vw, 20px)', borderRadius: '16px', textAlign: 'center' }}>
                      <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 900, color: 'var(--neon-yellow)' }}>100%</div>
                      <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginTop: '5px' }}>Secure Uplink</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

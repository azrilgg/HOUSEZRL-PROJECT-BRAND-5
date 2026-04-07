'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, User, ArrowLeft, Share2, Link as LinkIcon, Check } from 'lucide-react';
import Lenis from 'lenis';

// Official-Spec Brand SVGs
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
);

import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  category: string;
  img: string;
  readingTime: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

export default function BlogModal({ isOpen, onClose, post }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      document.body.style.overflow = 'hidden';
      
      // Initialize Local Lenis for Modal Content
      const lenis = new Lenis({
        wrapper: contentRef.current, // Container that overflows
        content: contentRef.current.firstElementChild as HTMLElement, // The actual inner scrolling content
        lerp: 0.08,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Reading Progress Bar Animation aligned with Lenis
      const ctx = gsap.context(() => {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            scroller: contentRef.current // Track scroll of the modal
          }
        });
      });

      return () => {
        lenis.destroy();
        ctx.revert();
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!post) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: currentUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(30px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(10px, 4vw, 40px)'
          }}
          onClick={onClose}
        >
          {/* Progress Bar (Global Position) */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 10002 }}>
             <div ref={progressBarRef} style={{ width: '100%', height: '100%', background: 'var(--neon-yellow)', transform: 'scaleX(0)', transformOrigin: '0% 50%' }} />
          </div>

          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '100%',
              background: 'var(--cream)',
              borderRadius: '40px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
              position: 'relative'
            }}
          >
            {/* Header Controls (Absolute) */}
            <div style={{ position: 'absolute', top: '24px', left: '30px', zIndex: 20, display: 'flex', gap: '15px' }}>
               <button onClick={onClose} className="magnetic-target" style={{ background: 'var(--black)', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                  <ArrowLeft size={18} />
               </button>
            </div>

            <div style={{ position: 'absolute', top: '24px', right: '30px', zIndex: 20 }}>
               <button onClick={onClose} style={{ background: 'rgba(5,5,5,0.05)', color: 'var(--black)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                  <X size={20} />
               </button>
            </div>

            {/* Main Content Area (Lenis Wrapper) */}
            <div 
              ref={contentRef}
              className="blog-modal-content"
              style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
            >
              {/* Inner Content (Lenis Content) */}
              <div>
                {/* Hero */}
                <div style={{ position: 'relative', width: '100%', height: 'clamp(350px, 50vh, 600px)', overflow: 'hidden' }}>
                  <Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} priority />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--cream) 0%, transparent 100%)' }} />
                  
                  <div style={{ position: 'absolute', bottom: '40px', left: 'clamp(20px, 8vw, 100px)', right: 'clamp(20px, 8vw, 100px)' }}>
                     <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <span style={{ background: 'var(--black)', color: 'var(--neon-yellow)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800 }}>{post.category}</span>
                        <span style={{ background: 'rgba(0,0,0,0.1)', color: 'var(--black)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={12} /> {post.readingTime} READ
                        </span>
                     </div>
                     <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--black)' }}>
                       {post.title}
                     </h1>
                  </div>
                </div>

                {/* Article Body */}
                <div style={{ padding: 'clamp(40px, 10vw, 120px) 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '90%', maxWidth: '750px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px', padding: '20px', background: 'rgba(0,0,0,0.03)', borderRadius: '24px' }}>
                       <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-yellow)', fontWeight: 900, fontSize: '1.2rem' }}>
                         {post.author.charAt(0)}
                       </div>
                       <div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{post.author}</div>
                          <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', fontWeight: 600 }}>{post.authorRole}</div>
                          <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', marginTop: '2px' }}>Published on {post.date}</div>
                       </div>
                    </div>

                    <div 
                      style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', lineHeight: 1.8, color: 'rgba(0,0,0,0.85)', letterSpacing: '-0.01em' }}
                      dangerouslySetInnerHTML={{ __html: post.content }} 
                    />

                    {/* Functional Share Logic */}
                    <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                          <div style={{ display: 'flex', gap: '15px' }}>
                             {[
                               { Icon: Share2, action: shareNative, label: "Share to all Apps", isHighlight: true },
                               { Icon: FacebookIcon, action: shareToFacebook, label: "Share on Facebook" },
                               { Icon: TwitterIcon, action: shareToTwitter, label: "Share on X" },
                               { Icon: copied ? Check : LinkIcon, action: copyToClipboard, label: copied ? "Copied!" : "Copy Link", isHighlight: copied }
                             ].map((item, idx) => (
                               <button 
                                 key={idx} 
                                 onClick={item.action}
                                 title={item.label}
                                 style={{ 
                                   background: item.isHighlight ? 'var(--neon-yellow)' : 'white', 
                                   border: '1px solid rgba(0,0,0,0.1)', 
                                   width: '45px', 
                                   height: '45px', 
                                   borderRadius: '50%', 
                                   display: 'flex', 
                                   alignItems: 'center', 
                                   justifyContent: 'center', 
                                   cursor: 'pointer', 
                                   transition: 'all 0.3s ease',
                                   color: item.isHighlight ? 'var(--black)' : 'inherit'
                                 }}
                                 onMouseEnter={e => { if(!item.isHighlight) e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)'; }}
                                 onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
                               >
                                 <item.Icon size={18} />
                               </button>
                             ))}
                          </div>
                          <div style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                            Ref HZR-BLOG-ID{post.id} v1.1 Interactive
                          </div>
                       </div>

                       <div style={{ background: 'var(--black)', color: 'white', padding: '40px', borderRadius: '32px', textAlign: 'center' }}>
                          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Ready to architect your own future?</h3>
                          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '25px' }}>Join our exclusive mailing list for 'God Layout' design updates.</p>
                          <button className="pill-btn neon" style={{ width: 'fit-content', margin: '0 auto' }}>Subscribe Now</button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

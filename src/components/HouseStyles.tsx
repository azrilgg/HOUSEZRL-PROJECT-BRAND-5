'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import {
  X, MapPin, ShieldCheck, Mail, Search,
  Building2, Home, TreePine, Waves, Mountain, Warehouse, Castle, Landmark, Gem
} from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });

// ─── CATEGORIES ───────────────────────────────────────────────────────────
const styleCategories = [
  { id: 'all', label: 'All Styles', icon: Gem },
  { id: 'modern', label: 'Modern', icon: Building2 },
  { id: 'traditional', label: 'Traditional', icon: Home },
  { id: 'eco', label: 'Eco / Nature', icon: TreePine },
  { id: 'coastal', label: 'Coastal', icon: Waves },
  { id: 'mountain', label: 'Mountain', icon: Mountain },
  { id: 'industrial', label: 'Industrial', icon: Warehouse },
  { id: 'luxury', label: 'Luxury Estate', icon: Castle },
  { id: 'urban', label: 'Urban', icon: Landmark },
];

// ─── 14 HOUSE STYLES ──────────────────────────────────────────────────────
const houseStylesList = [
  {
    id: 'hs1', category: 'modern',
    name: 'Modern Minimalist',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    description: 'Clean lines, expansive glass windows, and a stark monochromatic palette. Minimizes clutter to maximize space and natural light connection.',
    materials: 'Concrete, Steel, Floor-to-ceiling Glass',
  },
  {
    id: 'hs2', category: 'modern',
    name: 'Mid-Century Modern',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Characterized by flat planes, large glass windows, and open space. Integrates perfectly with nature, emphasizing geometric balance.',
    materials: 'Natural Wood, Slate, Expansive Windows',
  },
  {
    id: 'hs3', category: 'traditional',
    name: 'Modern Farmhouse',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    description: 'A contemporary take on traditional agrarian architecture. Blends warm rustic elements with sleek modern lines and high ceilings.',
    materials: 'Reclaimed Wood, White Siding, Black Metal Accents',
  },
  {
    id: 'hs4', category: 'traditional',
    name: 'Traditional Craftsman',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    description: 'Prioritizes handmade architecture with low-pitched rooflines, overhanging eaves, and heavy, tapered columns on the front porch.',
    materials: 'Stucco, River Rock, Handcrafted Timber',
  },
  {
    id: 'hs5', category: 'coastal',
    name: 'Coastal Contemporary',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
    description: 'Designed to capture sea breezes and ocean views. Features bright, airy interiors and seamless transitions to expansive outdoor living spaces.',
    materials: 'Weathered Wood, Glass Railings, Crisp White Stucco',
  },
  {
    id: 'hs6', category: 'industrial',
    name: 'Industrial Loft',
    image: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=800&q=80',
    description: 'Raw and unfinished aesthetic inspired by converted warehouses. High ceilings, exposed ductwork, and massive gridded windows.',
    materials: 'Exposed Brick, Corrugated Metal, Raw Concrete',
  },
  {
    id: 'hs7', category: 'luxury',
    name: 'Mediterranean Villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    description: 'Evokes the warmth of the European coast. Features red-tiled roofs, graceful arches, and enclosed private courtyards built for luxury.',
    materials: 'Terracotta, Wrought Iron, Textured Plaster',
  },
  {
    id: 'hs8', category: 'eco',
    name: 'Biophilic Sanctuary',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Architecture designed around living organisms. Green roofs, interior gardens, and walls constructed from living moss and fern systems.',
    materials: 'Living Walls, Reclaimed Timber, Recycled Steel',
  },
  {
    id: 'hs9', category: 'mountain',
    name: 'Alpine Chalet',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    description: 'Heavy timber framing with stone foundations built to withstand extreme alpine conditions while maintaining absolute interior warmth.',
    materials: 'Aged Pine, Natural Stone, Iron Hardware',
  },
  {
    id: 'hs10', category: 'urban',
    name: 'Urban Townhouse',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    description: 'Vertically optimized living in dense metropolitan zones. Smart spatial design maximizes every square foot with style.',
    materials: 'Brick, Dark Metal, Engineered Hardwood',
  },
  {
    id: 'hs11', category: 'luxury',
    name: 'French Château',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    description: 'Grand 18th-century European aristocratic architecture with symmetrical facades, mansard roofs, and ornate interior moldings.',
    materials: 'Limestone, Marble, Gold Leaf Accents',
  },
  {
    id: 'hs12', category: 'coastal',
    name: 'Tropical Pavilion',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
    description: 'Open-air architecture designed for equatorial climates. Thatched roofs meet contemporary glass to blur the line between indoors and out.',
    materials: 'Bamboo, Teak, Volcanic Stone',
  },
  {
    id: 'hs13', category: 'eco',
    name: 'Earth-Sheltered Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'Partially or fully embedded into the earth. Near-zero energy consumption with natural insulation and self-sustaining water systems.',
    materials: 'Rammed Earth, Turf Roof, Recycled Glass',
  },
  {
    id: 'hs14', category: 'modern',
    name: 'Brutalist Monument',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    description: 'Unapologetic raw concrete forms celebrating material honesty. Monumental scale with sculptural geometry and dramatic shadow play.',
    materials: 'Raw Béton Brut, Board-Formed Concrete, Steel',
  },
];


export default function HouseStyles() {
  const [selectedStyle, setSelectedStyle] = useState<typeof houseStylesList[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── FILTERING ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return houseStylesList.filter(s => {
      if (activeCategory !== 'all' && s.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !s.name.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q) &&
          !s.materials.toLowerCase().includes(q) &&
          !s.category.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Fan layout helper — dynamically adjusts based on filtered count
  const getCardLayout = (index: number, total: number) => {
    const center = Math.floor(total / 2);
    const offset = index - center;
    const maxRotate = 15;
    const maxY = 120;
    const rotate = (offset / Math.max(center, 1)) * maxRotate;
    const absOffset = Math.abs(offset);
    const scale = 1.1 - absOffset * 0.05;
    const y = absOffset * absOffset * (maxY / (center * center || 1));
    const zIndex = 10 - absOffset;
    return { rotate, scale: Math.max(scale, 0.8), y, zIndex: Math.max(zIndex, 1) };
  };

  return (
    <section style={{ 
      backgroundColor: '#F8F8F8', 
      padding: '120px 0 80px', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        style={{ textAlign: 'center', marginBottom: '40px', zIndex: 20, padding: '0 20px' }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', color: '#C5A059', textTransform: 'uppercase' }}>
          Explore Our Portfolio
        </span>
        <h2 className={playfair.className} style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          color: '#222222', 
          marginTop: '16px',
          textTransform: 'uppercase'
        }}>
          Choose Your House Style
        </h2>
      </motion.div>

      {/* ═══════ SEARCH BAR ═══════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ width: '100%', maxWidth: '500px', padding: '0 20px', marginBottom: '24px', zIndex: 20 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'white', borderRadius: '100px', padding: '12px 20px',
          border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
        }}>
          <Search size={18} color="rgba(34,34,34,0.4)" />
          <input
            type="text"
            placeholder="Search styles, materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: '0.95rem', color: '#222', fontWeight: 500
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              <X size={16} color="rgba(34,34,34,0.4)" />
            </button>
          )}
        </div>
      </motion.div>

      {/* ═══════ CATEGORY PILLS ═══════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex', gap: '8px', marginBottom: '50px', overflowX: 'auto',
          padding: '0 20px 10px', maxWidth: '100%', WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none', zIndex: 20
        }}
      >
        {styleCategories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          const count = cat.id === 'all' ? houseStylesList.length : houseStylesList.filter(s => s.category === cat.id).length;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600,
                background: isActive ? '#222' : 'white',
                color: isActive ? '#C5A059' : '#222',
                border: isActive ? '1px solid #222' : '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <Icon size={14} strokeWidth={2.5} />
              {cat.label}
              <span style={{
                background: isActive ? 'rgba(197,160,89,0.2)' : 'rgba(0,0,0,0.06)',
                padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700
              }}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Fan Carousel */}
      {filtered.length > 0 ? (
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '1200px', 
          height: '450px',
          display: 'flex',
          justifyContent: 'center',
          perspective: '1200px'
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((style, index) => {
              const layout = getCardLayout(index, filtered.length);
              const spread = isMobile ? 8 : 12;
              const centerIdx = Math.floor(filtered.length / 2);
              return (
                <motion.div
                  key={style.id}
                  layout
                  onClick={() => setSelectedStyle(style)}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: layout.y, rotate: layout.rotate, scale: isMobile ? layout.scale * 0.8 : layout.scale }}
                  exit={{ opacity: 0, y: 80, scale: 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05, 
                    type: 'spring', 
                    bounce: 0.2 
                  }}
                  whileHover={{
                    y: layout.y - 30,
                    scale: (isMobile ? layout.scale * 0.8 : layout.scale) * 1.05,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    filter: 'brightness(1.1)',
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  whileTap={{ scale: (isMobile ? layout.scale * 0.8 : layout.scale) * 0.95 }}
                  style={{
                    position: 'absolute',
                    width: 'clamp(200px, 18vw, 260px)',
                    height: '400px',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    zIndex: layout.zIndex,
                    transformOrigin: 'bottom center',
                    left: `calc(50% + ${(index - centerIdx) * spread}vw)`,
                    x: '-50%',
                  }}
                  className="group"
                >
                  <Image 
                    src={style.image}
                    alt={style.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  }} />

                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: '#C5A059', color: '#111', padding: '4px 10px',
                    borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {style.category}
                  </div>

                  {/* Title */}
                  <div style={{
                    position: 'absolute', bottom: '24px', left: '16px', right: '16px', color: 'white',
                  }}>
                    <h3 style={{ 
                      fontSize: '16px', fontWeight: 700, marginBottom: '4px', lineHeight: 1.2
                    }}>
                      {style.name}
                    </h3>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.3 }}>
                      {style.materials}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center', padding: '80px 20px' }}
        >
          <Search size={48} color="rgba(34,34,34,0.15)" style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'rgba(34,34,34,0.3)', marginBottom: '10px' }}>No styles match your search</h3>
          <p style={{ color: 'rgba(34,34,34,0.4)', fontSize: '0.95rem' }}>Try a different keyword or category.</p>
        </motion.div>
      )}

      {/* Results Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: '40px', textAlign: 'center', zIndex: 20 }}
      >
        <p style={{ fontSize: '0.85rem', color: 'rgba(34,34,34,0.4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {filtered.length} of {houseStylesList.length} styles displayed
        </p>
      </motion.div>

      {/* Information Modal Overlay */}
      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(5, 5, 5, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '20px'
            }} onClick={() => setSelectedStyle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }} onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: '900px', height: 'calc(100vh - 40px)', background: 'var(--cream)',
                borderRadius: '32px', boxShadow: '0 40px 100px rgba(0,0,0,0.5)', color: 'var(--black)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
              }}
            >
              {/* Header Area (Fixed) */}
              <div style={{ position: 'relative', minHeight: '250px', flexShrink: 0, padding: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <Image src={selectedStyle.image} alt={selectedStyle.name} fill style={{ objectFit: 'cover', zIndex: 0 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />

                <button 
                  onClick={() => setSelectedStyle(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s ease', color: 'white', zIndex: 10 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  <X size={20} />
                </button>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap', paddingRight: '40px' }}>
                    <div style={{ background: 'var(--neon-yellow)', color: 'var(--black)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>Architecture Profile</div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500, textTransform: 'capitalize' }}>{selectedStyle.category}</div>
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '5px', lineHeight: 1.1 }}>{selectedStyle.name}</h2>
                  <div style={{ fontSize: '1.2rem', color: 'var(--neon-yellow)', fontWeight: 'bold' }}>{selectedStyle.materials}</div>
                </div>
              </div>

              {/* Information Content Area (Scrollable) */}
              <div className="modal-scroll-info" style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', background: 'white' }}>
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Design Philosophy</h3>
                    <p style={{ color: 'rgba(5,5,5,0.7)', lineHeight: 1.6, fontSize: '1rem' }}>{selectedStyle.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <MapPin style={{ color: 'var(--neon-yellow)', background: 'var(--black)', padding: '8px', borderRadius: '50%', width: '40px', height: '40px', flexShrink: 0 }} />
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Global Inspirations</h3>
                  </div>
                  <div style={{ width: '100%', height: '250px', borderRadius: '16px', background: '#e0e0e0', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                    <iframe width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedStyle.name + " architecture")}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
                  </div>
                </div>

                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck color="var(--black)" /> Secure Target
                    </h3>
                    <p style={{ color: 'rgba(5,5,5,0.6)', lineHeight: 1.5, marginBottom: '24px' }}>
                      This style is secured under a private network. Speak directly with a master architect to initiate the planning process immediately.
                    </p>
                    <a 
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=exec@housezrl.com&su=Style Inquiry: ${selectedStyle.name}&body=I am interested in planning a residence in the style of: ${selectedStyle.name}. Please provide more information about the design and consultation process.`}
                      target="_blank"
                      rel="noreferrer"
                      className="pill-btn neon" 
                      style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', justifyContent: 'center', textDecoration: 'none', alignItems: 'center' }}
                    >
                      <Mail size={18} style={{ marginRight: '10px' }} /> Submit Formal Inquiry
                    </a>
                  </div>

                  <div>
                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.1)', marginBottom: '24px' }} />
                    <p style={{ fontSize: '0.9rem', color: 'rgba(5,5,5,0.5)', marginBottom: '16px', fontWeight: 600, textTransform: 'uppercase' }}>Instant Consultation Channels</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <a href="https://wa.me/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '16px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#25D366' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> Connect via WhatsApp
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(225, 48, 108, 0.1)', color: '#E1306C', padding: '16px', borderRadius: '12px', fontWeight: 600, transition: 'background 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(225, 48, 108, 0.1)'}>
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#E1306C' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> DM on Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        div[style*="overflowX: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

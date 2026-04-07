'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PropertyModal, { PropertyData } from '@/components/PropertyModal';
import {
  Search, SlidersHorizontal, Home, Building2, TreePine, Waves,
  Mountain, Landmark, Warehouse, Castle, Tent, Gem, Sparkles,
  Bot, Send, X, ChevronDown, ArrowUpRight, DollarSign,
  ShoppingBag, Headphones, MessageCircle
} from 'lucide-react';

// ─── CATEGORIES ──────────────────────────────────────────────────────────
const categories = [
  { id: 'all', label: 'All Properties', icon: Gem },
  { id: 'modern', label: 'Modern', icon: Building2 },
  { id: 'villa', label: 'Villa', icon: Home },
  { id: 'penthouse', label: 'Penthouse', icon: Landmark },
  { id: 'eco', label: 'Eco Retreat', icon: TreePine },
  { id: 'coastal', label: 'Coastal', icon: Waves },
  { id: 'mountain', label: 'Mountain', icon: Mountain },
  { id: 'loft', label: 'Loft', icon: Warehouse },
  { id: 'estate', label: 'Estate', icon: Castle },
  { id: 'resort', label: 'Resort', icon: Tent },
];

// ─── 14 PROPERTIES ───────────────────────────────────────────────────────
const properties: (PropertyData & { id: number; category: string })[] = [
  { id: 1, category: 'penthouse', title: "Skyline Apex", loc: "Singapore", price: "$55.0M", sqft: "10,200 sqft", desc: "The highest residential unit in Southeast Asia. Full-floor penthouse with 360-degree holographic projection walls.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, category: 'coastal', title: "Glass Horizon", loc: "Malibu, CA", price: "$28.0M", sqft: "8,200 sqft", desc: "Cantilevered infinity pools extending into the Pacific Ocean. Operates on 100% solar capture.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, category: 'modern', title: "Neon Oasis", loc: "Dubai, UAE", price: "$45.2M", sqft: "22,000 sqft", desc: "A kinetic smart-mansion in the desert. The facade shifts dynamically to block harsh sun and channel cool evening wind.", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, category: 'eco', title: "Concrete Silence", loc: "Kyoto, JP", price: "$8.9M", sqft: "4,500 sqft", desc: "Minimalist concrete forms blended natively into a protected bamboo forest. Absolute Zen.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" },
  { id: 5, category: 'penthouse', title: "The Atrium", loc: "New York, NY", price: "$32.5M", sqft: "6,000 sqft", desc: "A 3-story penthouse featuring a central biosphere with living trees generating hyper-oxygenated air.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" },
  { id: 6, category: 'villa', title: "Villa Serenata", loc: "Amalfi Coast, IT", price: "$14.7M", sqft: "9,000 sqft", desc: "A clifftop Mediterranean masterpiece with hand-painted frescoes, private vineyard, and a 200-year-old olive grove.", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" },
  { id: 7, category: 'loft', title: "The Foundry", loc: "Brooklyn, NY", price: "$5.8M", sqft: "3,400 sqft", desc: "A converted 1920s ironworks with 30-ft ceilings, exposed riveted steel beams, and floor-to-ceiling industrial glass.", img: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80&w=1200" },
  { id: 8, category: 'estate', title: "Château Lumière", loc: "Loire Valley, FR", price: "$22.0M", sqft: "18,000 sqft", desc: "A fully restored 17th-century château with AI-controlled climate, hidden cinema, and a championship-grade equestrian ring.", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200" },
  { id: 9, category: 'resort', title: "Aqua Pavilion", loc: "Maldives", price: "$19.9M", sqft: "7,500 sqft", desc: "An over-water sanctuary with retractable glass floors, underwater bedroom suite, and a private marine biologist on call.", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200" },
  { id: 10, category: 'modern', title: "Monolith One", loc: "Tokyo, JP", price: "$38.0M", sqft: "5,200 sqft", desc: "A vertical micro-city. Each floor is a self-sufficient biome with its own climate, lighting, and soundscape.", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200" },
  { id: 11, category: 'eco', title: "Canopy Ark", loc: "Costa Rica", price: "$6.2M", sqft: "4,800 sqft", desc: "100% off-grid luxury treehouse compound powered by bio-fuel cells. Integrated rainwater harvesting and living walls.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
  { id: 12, category: 'coastal', title: "Tidal Forge", loc: "Cape Town, ZA", price: "$11.3M", sqft: "6,800 sqft", desc: "Perched on volcanic rock, this home channels tidal energy to power its entire neural smart system.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800" },
  { id: 13, category: 'mountain', title: "The Obsidian Retreat", loc: "Swiss Alps", price: "$18.5M", sqft: "12,500 sqft", desc: "A monolithic glass structure suspended over a private glacier. Features a subterranean geothermal spa and heli-pad.", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200" },
  { id: 14, category: 'mountain', title: "Alpine Sanctum", loc: "Aspen, CO", price: "$24.0M", sqft: "14,000 sqft", desc: "A fortress of glass and stone, featuring an indoor ski simulator, geothermal heating, and a Michelin-star private kitchen.", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800" },
];

// ─── PRICE FILTER ────────────────────────────────────────────────────────
const priceRanges = [
  { id: 'any', label: 'Any Price' },
  { id: 'under10', label: 'Under $10M' },
  { id: '10to25', label: '$10M – $25M' },
  { id: '25to50', label: '$25M – $50M' },
  { id: 'over50', label: '$50M+' },
];

// Parse price string to number
function parsePrice(p: string): number {
  const cleaned = p.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

// ─── CHAT RECOMMENDATIONS ────────────────────────────────────────────────
interface ChatMsg { role: 'bot' | 'user'; text: string; propertyIds?: number[] }

const chatCategories = ['modern','villa','penthouse','eco','coastal','mountain','loft','estate','resort'];

const botResponses: Record<string, { text: string; ids: number[] }> = {
  // Styles & Categories
  'modern': { text: "Excellent choice. Our Modern portfolio represents the apex of kinetic architecture. I highly recommend the Neon Oasis for its desert-adaptive smart-skin.", ids: [3, 10] },
  'villa': { text: "Villas are the soul of Mediterranean luxury. Villa Serenata is our crown jewel, offering a private 200-year-old olive grove for absolute tranquility.", ids: [6] },
  'penthouse': { text: "For the absolute high-performer, our Penthouses offer full-floor biospheric engineering. The Skyline Apex is currently our most requested unit.", ids: [1, 5] },
  'eco': { text: "Sustainability is the new gold. Our Eco Retreats like the Concrete Silence are 100% off-grid without compromising one bit of God-tier comfort.", ids: [4, 11] },
  'coastal': { text: "The ocean is the ultimate healer. Our coastal masterpieces like Glass Horizon are cantilevered directly over the Pacific.", ids: [2, 12] },
  'mountain': { text: "Altitude luxury at its peak. The Obsidian Retreat Switzerland is a monolithic glass suspended over a private glacier.", ids: [13, 14] },
  'loft': { text: "Raw industrial power. The Foundry in Brooklyn features 30-ft ceilings and pure creative energy for the visionary mind.", ids: [7] },
  'estate': { text: "True generational wealth. Château Lumière fuses 17th-century French grandeur with God-tier neural AI.", ids: [8] },
  'resort': { text: "Our most exclusive over-water sanctuary in the Maldives. Retractable glass floors and a private marine biologist.", ids: [9] },
  
  // Specific Property Commands / Names
  'skyline': { text: "As your senior advisor, I consider the **Skyline Apex** a masterwork. Its 360-degree holographic projection walls are perfect for multi-context work/life flows.", ids: [1] },
  'horizon': { text: "The **Glass Horizon** in Malibu is pure cinematic living. Its solar-capture skin makes it not just a home, but a continuous energy asset.", ids: [2] },
  'oasis': { text: "The **Neon Oasis** is a marvel of desert engineering. Its facade shifts dynamically—it's architecture that thinks.", ids: [3] },
  'silence': { text: "The **Concrete Silence** in Kyoto is for those who seek absolute Zen. It blends natively into the bamboo forest, providing a neuro-calming spatial aura.", ids: [4] },
  'atrium': { text: "The **Atrium** in NY is unique for its central biosphere. It generates hyper-oxygenated air—essential for urban cognitive performance.", ids: [5] },
  'foundry': { text: "The **Foundry** is pure industrial energy. For a creator, there is no better space than this cantilevered steel masterpiece.", ids: [7] },
  'chateau': { text: "The **Château Lumière** is where history meets the future. AI-controlled climate meets 17th-century frescoes.", ids: [8] },
  'monolith': { text: "The **Monolith One** in Tokyo is a vertical micro-city. Each floor is its own self-sufficient biome. Radical and efficient.", ids: [10] },
  'obsidian': { text: "Suspended over a glacier, the **Obsidian Retreat**瑞士 is for those who live on the edge of perfection. Includes a subterranean geothermal spa.", ids: [13] },
  'alpine': { text: "The **Alpine Sanctum** in Aspen is a fortress of glass and stone. Includes a Michelin-star private kitchen and geothermal mastery.", ids: [14] },

  // General Commands
  'buy': { text: "To initiate an acquisition, tap 'Buy Now' on any property card, or let me know your preferred location and I will begin the pre-qualification sequence.", ids: [] },
  'consult': { text: "Our senior property advisors are available 24/7 for a deep-dive session. Would you like me to book your private briefing now?", ids: [] },
  'ceo': { text: "HouseZrl was founded by the legendary Azriel/Aurelius consortium with a single vision: **Architectural Perfection**. I can provide their full whitepaper if you wish.", ids: [] },
};

function getBotResponse(input: string): { text: string; ids: number[] } {
  const lower = input.toLowerCase().replace('/', ''); // Support /command style
  
  // Direct Property name match
  for (const key of Object.keys(botResponses)) {
    if (lower.includes(key)) {
      const resp = botResponses[key];
      return { 
        text: `Consultant Insight: ${resp.text}`, 
        ids: resp.ids 
      };
    }
  }

  // Value-based recommendations
  if (lower.includes('family') || lower.includes('kids') || lower.includes('multigenerational')) {
    return { text: "For an elite family identity, I highly recommend the Château Lumière or Alpine Sanctum. They offer the necessary spatial hierarchy for generational growth.", ids: [8, 14] };
  }
  if (lower.includes('invest') || lower.includes('roi') || lower.includes('portfolio')) {
    return { text: "Based on current market growth, the Obsidian Retreat and Monolith One are projected for a 22% appreciation over the next 60 months. A blue-chip acquisition.", ids: [13, 10] };
  }
  if (lower.includes('tech') || lower.includes('smart') || lower.includes('ai')) {
    return { text: "Technology is invisible at HouseZrl. Every property is neural-integrated, but the Neon Oasis and Monolith One are our most 'sentient' structures.", ids: [3, 10] };
  }

  return { text: "Greetings. I am the **ZRL Oracle**, your senior architectural consultant. Ask me specifically about styles like 'Modern' or 'Eco', or use commands like '/skyline' for direct property critiques.", ids: [] };
}


export default function ExclusivePropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState('any');
  const [showFilters, setShowFilters] = useState(false);
  // Chat
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { role: 'bot', text: "Welcome to HouseZrl Intelligence. I can recommend the perfect property for your vision. What style are you looking for?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setChatMessages(prev => [...prev, { role: 'bot', text: response.text, propertyIds: response.ids.length > 0 ? response.ids : undefined }]);
    }, 800);
  };

  const handleChatCategory = (cat: string) => {
    setChatMessages(prev => [...prev, { role: 'user', text: cat.charAt(0).toUpperCase() + cat.slice(1) }]);
    setTimeout(() => {
      const response = getBotResponse(cat);
      setChatMessages(prev => [...prev, { role: 'bot', text: response.text, propertyIds: response.ids.length > 0 ? response.ids : undefined }]);
    }, 600);
  };

  const handleChatBuy = (prop: typeof properties[0]) => {
    setSelectedProperty(prop);
    setChatOpen(false);
  };

  // ── FILTERING LOGIC ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return properties.filter(p => {
      // Category
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.loc.toLowerCase().includes(q) && !p.desc?.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      }
      // Price
      if (activePriceRange !== 'any') {
        const price = parsePrice(p.price);
        if (activePriceRange === 'under10' && price >= 10) return false;
        if (activePriceRange === '10to25' && (price < 10 || price >= 25)) return false;
        if (activePriceRange === '25to50' && (price < 25 || price >= 50)) return false;
        if (activePriceRange === 'over50' && price < 50) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery, activePriceRange]);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', color: 'var(--black)', paddingBottom: '100px' }}>
      <Navbar />
      <PropertyModal isOpen={!!selectedProperty} property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      
      <section style={{ paddingTop: '150px', paddingLeft: '5%', paddingRight: '5%', maxWidth: '1400px', margin: '0 auto' }}>

        {/* ═══════ HEADER ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}
        >
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em', textAlign: 'center', margin: 0, width: '100%' }}>
            EXCLUSIVE <br /> <span style={{ color: 'var(--neon-yellow)', WebkitTextStroke: '1.5px var(--black)' }}>PROPERTIES</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(5,5,5,0.6)', maxWidth: '600px', textAlign: 'center', margin: '20px auto 0' }}>
            A meticulously curated selection of the most architecturally significant residences on the planet. Click any property to view God Layout metrics.
          </p>
        </motion.div>

        {/* ═══════ SEARCH & FILTERS BAR ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {/* Search + Filter Toggle Row */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              flex: '1 1 300px', display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(0,0,0,0.04)', borderRadius: '16px', padding: '14px 20px',
              border: '1px solid rgba(0,0,0,0.08)', transition: 'border-color 0.3s'
            }}>
              <Search size={20} color="rgba(5,5,5,0.4)" />
              <input
                type="text"
                placeholder="Search by name, location, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontSize: '1rem', color: 'var(--black)', fontWeight: 500
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <X size={18} color="rgba(5,5,5,0.4)" />
                </button>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: showFilters ? 'var(--black)' : 'rgba(0,0,0,0.04)',
                color: showFilters ? 'var(--cream)' : 'var(--black)',
                border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px',
                padding: '14px 20px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
                transition: 'all 0.3s'
              }}
            >
              <SlidersHorizontal size={18} />
              Filters
              <ChevronDown size={16} style={{ transform: showFilters ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
            </motion.button>
          </div>

          {/* Price Filter Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px',
                  background: 'rgba(0,0,0,0.03)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '12px', color: 'rgba(5,5,5,0.5)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <DollarSign size={16} /> Price Range
                  </div>
                  {priceRanges.map(pr => (
                    <motion.button
                      key={pr.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActivePriceRange(pr.id)}
                      style={{
                        padding: '8px 18px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600,
                        background: activePriceRange === pr.id ? 'var(--black)' : 'white',
                        color: activePriceRange === pr.id ? 'var(--neon-yellow)' : 'var(--black)',
                        border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.25s'
                      }}
                    >
                      {pr.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ═══════ CATEGORY PILLS ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            display: 'flex', gap: '10px', marginBottom: '50px', overflowX: 'auto',
            paddingBottom: '10px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none'
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 22px', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 600,
                  background: isActive ? 'var(--black)' : 'white',
                  color: isActive ? 'var(--neon-yellow)' : 'var(--black)',
                  border: isActive ? '1px solid var(--black)' : '1px solid rgba(0,0,0,0.1)',
                  cursor: 'pointer', transition: 'all 0.25s', whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <Icon size={16} strokeWidth={2.5} /> {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ═══════ RESULTS COUNT ═══════ */}
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontSize: '0.95rem', color: 'rgba(5,5,5,0.5)', fontWeight: 600 }}>
            <Sparkles size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </p>
          {(activeCategory !== 'all' || activePriceRange !== 'any' || searchQuery) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory('all'); setActivePriceRange('any'); setSearchQuery(''); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(200,0,0,0.08)', color: '#c00', border: 'none',
                padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600
              }}
            >
              <X size={14} /> Clear All Filters
            </motion.button>
          )}
        </div>

        {/* ═══════ PROPERTIES GRID ═══════ */}
        <div className="bento-grid" style={{ padding: 0 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((prop, i) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedProperty(prop)}
                className={`bento-item ${i === 0 ? 'large' : ''}`}
                style={{ minHeight: i === 0 ? '600px' : '400px', background: 'var(--black)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
              >
                {/* Most Expensive Banner */}
                {prop.id === 1 && (
                  <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 5, pointerEvents: 'none', display: 'flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #FFD700 0%, #C5A059 100%)', color: '#111', padding: '8px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 20px rgba(197, 160, 89, 0.5)' }}>
                    <Gem size={14} strokeWidth={3} /> #1 Most Expensive
                  </div>
                )}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
                
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                  <Image 
                    src={prop.img || '/images/housezrl.png'} 
                    alt={prop.title} 
                    fill 
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease-out' }} 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                    priority={i < 2} 
                  />
                </div>
                
                <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px', zIndex: 2, color: 'white', pointerEvents: 'none' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <div style={{ background: 'var(--neon-yellow)', color: 'var(--black)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>
                      {prop.loc}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 500 }}>
                      {prop.sqft}
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'var(--neon-yellow)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {prop.category}
                    </div>
                    <div style={{ background: 'var(--cream)', color: 'var(--black)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      View Data <ArrowUpRight size={12} />
                    </div>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', margin: '0 0 16px 0', lineHeight: 1.1 }}>{prop.title}</h2>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: '20px', maxWidth: '400px' }}>
                    {prop.desc}
                  </p>

                  <div className="price-tag" style={{ position: 'static', display: 'inline-block', fontSize: '1.2rem', backdropFilter: 'blur(12px)' }}>{prop.price}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '80px 20px' }}
          >
            <Search size={48} color="rgba(5,5,5,0.15)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', color: 'rgba(5,5,5,0.3)', marginBottom: '10px' }}>No properties match your criteria</h3>
            <p style={{ color: 'rgba(5,5,5,0.4)' }}>Try adjusting your filters or search query.</p>
          </motion.div>
        )}

      </section>

      {/* ═══════ CHAT RECOMMENDATION BOT ═══════ */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999 }}>
        {/* Chat Toggle Button */}
        <AnimatePresence>
          {!chatOpen && (
            <motion.button
              key="chat-toggle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(197, 160, 89, 0.5)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setChatOpen(true)}
              style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon-yellow) 0%, #C5A059 100%)',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)', color: 'var(--black)'
              }}
            >
              <Bot size={28} strokeWidth={2.5} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Panel */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: 'min(400px, calc(100vw - 40px))', height: '580px',
                background: 'var(--black)', borderRadius: '28px',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Chat Header */}
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--neon-yellow) 0%, #C5A059 100%)', color: 'var(--black)' }}>
                    <Bot size={22} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>HouseZrl AI</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--neon-yellow)', fontWeight: 600 }}>Property Concierge • Online</div>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Chat Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', WebkitOverflowScrolling: 'touch' }}>
                {chatMessages.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    style={{ maxWidth: '90%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                  >
                    <div style={{
                      background: msg.role === 'user' ? 'linear-gradient(135deg, var(--neon-yellow) 0%, #C5A059 100%)' : 'rgba(255,255,255,0.08)',
                      color: msg.role === 'user' ? 'var(--black)' : 'white',
                      padding: '12px 16px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: '0.85rem', lineHeight: 1.5, fontWeight: msg.role === 'user' ? 600 : 400
                    }}>
                      {msg.text}
                    </div>
                    {/* Property Cards in Bot Messages */}
                    {msg.propertyIds && msg.propertyIds.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                        {msg.propertyIds.map(pid => {
                          const prop = properties.find(p => p.id === pid);
                          if (!prop) return null;
                          return (
                            <motion.div key={pid} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                              style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                            >
                              <div style={{ position: 'relative', height: '100px' }}>
                                <Image src={prop.img || ''} alt={prop.title} fill style={{ objectFit: 'cover' }} sizes="350px" />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#C5A059', color: '#111', padding: '3px 8px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase' }}>{prop.category}</div>
                                <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: 'white' }}>
                                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{prop.title}</div>
                                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>{prop.loc} • {prop.sqft}</div>
                                </div>
                                <div style={{ position: 'absolute', bottom: '8px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: 'var(--neon-yellow)', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>{prop.price}</div>
                              </div>
                              <div style={{ padding: '10px 12px', display: 'flex', gap: '6px' }}>
                                <button onClick={() => handleChatBuy(prop)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'linear-gradient(135deg, var(--neon-yellow), #C5A059)', color: '#111', border: 'none', borderRadius: '10px', padding: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                                  <ShoppingBag size={13} /> Buy Now
                                </button>
                                <button onClick={() => handleChatBuy(prop)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                                  <ArrowUpRight size={13} /> View Details
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Category Quick Actions */}
              <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '6px', overflowX: 'auto', flexShrink: 0, WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                {chatCategories.map(cat => (
                  <button key={cat} onClick={() => handleChatCategory(cat)}
                    style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'capitalize', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.2)'; e.currentTarget.style.color = '#C5A059'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >{cat}</button>
                ))}
              </div>

              {/* Chat Input + Consult Button */}
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                    placeholder="Ask about a style..."
                    style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '12px 16px', color: 'white', fontSize: '0.85rem', outline: 'none' }}
                  />
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleChatSend}
                    style={{ width: '46px', height: '46px', borderRadius: '14px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, var(--neon-yellow) 0%, #C5A059 100%)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Send size={18} strokeWidth={2.5} />
                  </motion.button>
                </div>
                <a href="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '10px', color: 'var(--neon-yellow)', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(197,160,89,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                  <Headphones size={16} /> Book a Consultation with Senior Advisor
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .bento-grid::-webkit-scrollbar,
        div[style*="overflowX: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';

// --- Particle Config & Interface ---
interface Particle {
  x: number;
  y: number;
  px: number; // Previous X for trails
  py: number; // Previous Y for trails
  vx: number; // Velocity X
  vy: number; // Velocity Y
  size: number;
  opacity: number;
  color: string;
  depth: number; // 0 (bg) to 1 (fg)
}

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    
    // Configs
    const PARTICLE_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 400;
    const FLOW_STRENGTH = 0.05;
    const MOUSE_REPULSE_RADIUS = 250;
    const MOUSE_REPULSE_STRENGTH = 1.2;
    const FRICTION = 0.96;
    
    const COLORS = [
      'rgba(226, 255, 49, ', // Neon Yellow
      'rgba(255, 255, 255, ', // White
      'rgba(212, 175, 55, ',  // Goldish
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const depth = Math.random();
        particles.push({
          x,
          y,
          px: x,
          py: y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: depth * 1.5 + 0.5,
          opacity: depth * 0.5 + 0.1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          depth
        });
      }
    };

    // Simple Noise-like Flow Field Function
    const getFlowAngle = (x: number, y: number, time: number) => {
      // Using sin/cos combinations for organic-feeling movement without external libs
      return (
        Math.sin(x * 0.002 + time * 0.0002) * 2 +
        Math.cos(y * 0.002 + time * 0.0001) * 2 +
        Math.sin((x + y) * 0.001) * 1.5
      );
    };

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      // Draw Background (fading for trails)
      ctx.fillStyle = '#050505'; // Dark background
      ctx.fillRect(0, 0, width, height);
      
      // Use "screen" for god-tier glowing overlaps
      ctx.globalCompositeOperation = 'screen';

      particles.forEach(p => {
        // 1. Flow Field Influence
        const angle = getFlowAngle(p.x, p.y, time);
        p.vx += Math.cos(angle) * FLOW_STRENGTH * (p.depth + 0.5);
        p.vy += Math.sin(angle) * FLOW_STRENGTH * (p.depth + 0.5);

        // 2. Mouse Repulsion (as requested: don't pull them together)
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < MOUSE_REPULSE_RADIUS) {
          const force = (1 - dist / MOUSE_REPULSE_RADIUS) * MOUSE_REPULSE_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // 3. Physics
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        
        p.px = p.x;
        p.py = p.y;
        p.x += p.vx;
        p.y += p.vy;

        // 4. Edge Checking (Wraparound with smooth reset)
        if (p.x < -20) { p.x = width + 20; p.px = p.x; }
        if (p.x > width + 20) { p.x = -20; p.px = p.x; }
        if (p.y < -20) { p.y = height + 20; p.py = p.y; }
        if (p.y > height + 20) { p.y = -20; p.py = p.y; }

        // 5. Draw
        ctx.beginPath();
        ctx.lineWidth = p.size;
        ctx.strokeStyle = `${p.color}${p.opacity})`;
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Optional: Head Glow
        if (p.depth > 0.8) {
          ctx.fillStyle = `${p.color}${p.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Reset composite for other UI elements if any
      ctx.globalCompositeOperation = 'source-over';
      
      requestRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    resize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default HeroBackground;

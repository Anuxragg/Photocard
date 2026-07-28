import React, { useEffect, useRef } from 'react';

function DotGridCanvas() {
  const canvasRef = useRef(null);
  const trailRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const DOT_SPACING = 16;
    const BASE_RADIUS = 1.2;
    const HIGHLIGHT_RADIUS = 2.8;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };

      // Add point to trail
      trailRef.current.push({
        x,
        y,
        life: 1.0, // decreases over time
      });

      // Keep trail limited to max points
      if (trailRef.current.length > 40) {
        trailRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Fade trail points
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].life -= dt * 2.2; // ~450ms decay trail
        if (trailRef.current[i].life <= 0) {
          trailRef.current.splice(i, 1);
        }
      }

      ctx.clearRect(0, 0, width, height);

      const trail = trailRef.current;
      const mouse = mouseRef.current;

      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const dotX = c * DOT_SPACING;
          const dotY = r * DOT_SPACING;

          let maxIntensity = 0;

          // Direct mouse proximity highlight
          if (mouse.active) {
            const dx = dotX - mouse.x;
            const dy = dotY - mouse.y;
            const distSq = dx * dx + dy * dy;
            const maxDist = 75; // 75px radius
            if (distSq < maxDist * maxDist) {
              const dist = Math.sqrt(distSq);
              const factor = 1 - dist / maxDist;
              maxIntensity = Math.max(maxIntensity, factor);
            }
          }

          // Trail points proximity highlight
          for (let i = 0; i < trail.length; i++) {
            const pt = trail[i];
            const dx = dotX - pt.x;
            const dy = dotY - pt.y;
            const distSq = dx * dx + dy * dy;
            const maxDist = 60;
            if (distSq < maxDist * maxDist) {
              const dist = Math.sqrt(distSq);
              const factor = (1 - dist / maxDist) * pt.life;
              maxIntensity = Math.max(maxIntensity, factor);
            }
          }

          // Compute dot radius and color based on intensity
          const radius = BASE_RADIUS + maxIntensity * (HIGHLIGHT_RADIUS - BASE_RADIUS);
          
          ctx.beginPath();
          ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);

          if (maxIntensity > 0.05) {
            // Dark retro charcoal dot with proportional opacity
            const alpha = 0.2 + maxIntensity * 0.75;
            ctx.fillStyle = `rgba(24, 24, 27, ${alpha})`;
          } else {
            // Subtle ambient dot
            ctx.fillStyle = 'rgba(180, 172, 155, 0.45)';
          }

          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 size-full pointer-events-none z-0"
    />
  );
}

export default DotGridCanvas;

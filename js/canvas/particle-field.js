/**
 * PARTICLE FIELD ENGINE
 * High-performance 3D-depth interactive canvas particle system.
 * Features:
 * - Multi-layer depth simulation (Z-axis scale & velocity)
 * - Fluid cursor wave repulsion with soft spring damping
 * - Subtle proximity network connections
 * - Theme-reactive color transitions
 * - Battery-friendly mobile & reduced-motion optimizations
 */

export class ParticleField {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.particles = [];
    this.animationFrameId = null;
    this.isVisible = true;

    // Viewport & Scaling
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Interaction State
    this.mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 140,
      isActive: false
    };

    // Reduced motion flag
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768;

    // Theme configuration
    this.isDark = document.documentElement.classList.contains('dark') || 
                  document.documentElement.getAttribute('data-theme') !== 'light';

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.start();
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    }, { passive: true });

    // Track mouse with smooth interpolation
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.isActive = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.isActive = false;
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
    });

    // Theme sync listener
    window.addEventListener('themeChanged', (e) => {
      this.isDark = e.detail.theme === 'dark';
    });

    // Page visibility to save GPU/CPU cycles
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.start();
      } else {
        this.stop();
      }
    });

    // Reduced motion listener
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      this.createParticles();
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width < 768;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);

    this.mouse.radius = this.isMobile ? 90 : 160;
  }

  createParticles() {
    this.particles = [];
    const baseCount = this.isMobile ? 35 : (this.width > 1600 ? 110 : 85);
    const particleCount = this.reducedMotion ? Math.floor(baseCount * 0.5) : baseCount;

    for (let i = 0; i < particleCount; i++) {
      // 3 Depth layers: 0 (background), 1 (midground), 2 (foreground)
      const layer = Math.random() < 0.25 ? 2 : (Math.random() < 0.65 ? 1 : 0);
      
      let baseSize, speed, mass;
      if (layer === 2) {
        // Foreground: bigger, moves slightly faster with mouse
        baseSize = Math.random() * 1.5 + 2.0;
        speed = 0.35;
        mass = 1.6;
      } else if (layer === 1) {
        // Midground
        baseSize = Math.random() * 1.2 + 1.2;
        speed = 0.22;
        mass = 1.0;
      } else {
        // Background: smaller, subtle
        baseSize = Math.random() * 0.8 + 0.8;
        speed = 0.12;
        mass = 0.6;
      }

      const x = Math.random() * this.width;
      const y = Math.random() * this.height;

      this.particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * speed * (this.reducedMotion ? 0.3 : 1),
        vy: (Math.random() - 0.5) * speed * (this.reducedMotion ? 0.3 : 1),
        size: baseSize,
        layer,
        mass,
        // Fluid spring state
        displacementX: 0,
        displacementY: 0,
        forceX: 0,
        forceY: 0,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }
  }

  start() {
    if (!this.animationFrameId) {
      const render = () => {
        this.update();
        this.draw();
        if (this.isVisible) {
          this.animationFrameId = requestAnimationFrame(render);
        }
      };
      this.animationFrameId = requestAnimationFrame(render);
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  update() {
    // Smooth mouse position damping
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12;

    const mouseActive = this.mouse.isActive && !this.reducedMotion;
    const maxRadius = this.mouse.radius;
    const maxRadiusSq = maxRadius * maxRadius;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Subtle natural organic drift
      p.originX += p.vx;
      p.originY += p.vy;

      // Wrap around bounds with gentle padding
      if (p.originX < -30) p.originX = this.width + 30;
      if (p.originX > this.width + 30) p.originX = -30;
      if (p.originY < -30) p.originY = this.height + 30;
      if (p.originY > this.height + 30) p.originY = -30;

      // Cursor interaction: elastic wave displacement
      if (mouseActive) {
        const dx = (p.originX + p.displacementX) - this.mouse.x;
        const dy = (p.originY + p.displacementY) - this.mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / maxRadius) * 22 * (p.layer + 0.8) / p.mass;
          const angle = Math.atan2(dy, dx);
          
          p.forceX += Math.cos(angle) * force;
          p.forceY += Math.sin(angle) * force;
        }
      }

      // Spring physics back toward origin (quiet/calm behavior)
      const springK = 0.045;
      const damping = 0.88;

      p.forceX += -p.displacementX * springK;
      p.forceY += -p.displacementY * springK;

      p.displacementX += p.forceX;
      p.displacementY += p.forceY;

      p.forceX *= damping;
      p.forceY *= damping;

      p.x = p.originX + p.displacementX;
      p.y = p.originY + p.displacementY;

      p.pulseAngle += p.pulseSpeed;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = this.isDark;
    const maxConnectionDist = this.isMobile ? 70 : 100;
    const maxConnDistSq = maxConnectionDist * maxConnectionDist;

    // 1. Draw subtle proximity connections (sparse, subtle)
    this.ctx.lineWidth = 0.75;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      // Only connect if on same or adjacent layer to preserve depth
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        if (Math.abs(p1.layer - p2.layer) > 1) continue;

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxConnDistSq) {
          const dist = Math.sqrt(distSq);
          const alphaFactor = (1 - dist / maxConnectionDist);
          const baseAlpha = isDark ? 0.09 : 0.07;
          const alpha = alphaFactor * baseAlpha * (p1.layer === 2 || p2.layer === 2 ? 1.4 : 0.8);

          if (alpha > 0.005) {
            this.ctx.strokeStyle = isDark 
              ? `rgba(56, 189, 248, ${alpha})` 
              : `rgba(71, 85, 105, ${alpha * 0.9})`;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }

    // 2. Draw Particles with depth shading
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const pulse = Math.sin(p.pulseAngle) * 0.15 + 0.85;
      const currentRadius = p.size * pulse;

      let fillStyle;
      let alpha;

      if (isDark) {
        if (p.layer === 2) {
          alpha = 0.75 * pulse;
          fillStyle = `rgba(56, 189, 248, ${alpha})`; // Cyan/Blue
        } else if (p.layer === 1) {
          alpha = 0.55 * pulse;
          fillStyle = `rgba(129, 140, 248, ${alpha})`; // Violet/Indigo
        } else {
          alpha = 0.35 * pulse;
          fillStyle = `rgba(148, 163, 184, ${alpha})`; // Slate
        }
      } else {
        // Light mode
        if (p.layer === 2) {
          alpha = 0.65 * pulse;
          fillStyle = `rgba(37, 99, 235, ${alpha})`; // Vibrant Slate Blue
        } else if (p.layer === 1) {
          alpha = 0.45 * pulse;
          fillStyle = `rgba(71, 85, 105, ${alpha})`; // Slate
        } else {
          alpha = 0.25 * pulse;
          fillStyle = `rgba(148, 163, 184, ${alpha})`; // Muted Gray
        }
      }

      this.ctx.fillStyle = fillStyle;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Subtle glow for foreground particles in dark mode
      if (isDark && p.layer === 2 && !this.isMobile) {
        this.ctx.fillStyle = `rgba(56, 189, 248, 0.08)`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, currentRadius * 2.5, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }
}

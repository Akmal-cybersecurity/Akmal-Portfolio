/**
 * 3D NETWORK TOPOLOGY VISUALIZER
 * Lightweight, high-performance 3D mathematical projection engine.
 * Renders interactive 3D cybersecurity network graphs, geometric nodes,
 * and security perimeters that rotate in 3D space and respond to cursor tilt.
 */

export class NetworkVisual3D {
  constructor(canvasId, type = 'network') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    if (!this.ctx) return;

    this.type = type; // 'network', 'cloud-mesh', 'contact-node'
    this.nodes = [];
    this.edges = [];
    this.animationFrameId = null;
    this.isVisible = true;

    this.width = this.canvas.clientWidth || 300;
    this.height = this.canvas.clientHeight || 300;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 3D Angles and rotation
    this.angleX = 0.2;
    this.angleY = 0.4;
    this.targetAngleX = 0.2;
    this.targetAngleY = 0.4;
    this.rotSpeedY = 0.003;
    this.rotSpeedX = 0.001;

    this.mouse = {
      x: 0,
      y: 0,
      isHovered: false
    };

    this.isDark = document.documentElement.classList.contains('dark') || 
                  document.documentElement.getAttribute('data-theme') !== 'light';

    this.init();
  }

  init() {
    this.resize();
    this.generateGeometry();
    this.bindEvents();
    this.start();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 300;
    this.height = rect.height || 300;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
    }, { passive: true });

    // Track mouse over canvas container for interactive 3D rotation
    const parent = this.canvas.parentElement || this.canvas;
    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      this.targetAngleY = nx * 0.8;
      this.targetAngleX = -ny * 0.6;
      this.mouse.isHovered = true;
    }, { passive: true });

    parent.addEventListener('mouseleave', () => {
      this.mouse.isHovered = false;
    });

    window.addEventListener('themeChanged', (e) => {
      this.isDark = e.detail.theme === 'dark';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible) this.start();
        else this.stop();
      });
    }, { threshold: 0.1 });
    observer.observe(this.canvas);
  }

  generateGeometry() {
    this.nodes = [];
    this.edges = [];
    const radius = Math.min(this.width, this.height) * 0.36;

    if (this.type === 'cloud-mesh') {
      // 3D Double ring / Torus structure representing distributed perimeter
      const rings = 2;
      const nodesPerRing = 8;
      for (let r = 0; r < rings; r++) {
        const ringRadius = radius * (0.6 + r * 0.45);
        const yOffset = (r === 0 ? -1 : 1) * radius * 0.25;
        for (let i = 0; i < nodesPerRing; i++) {
          const theta = (i / nodesPerRing) * Math.PI * 2 + (r * Math.PI / nodesPerRing);
          const x = Math.cos(theta) * ringRadius;
          const z = Math.sin(theta) * ringRadius;
          this.nodes.push({ x, y: yOffset, z, size: r === 0 ? 3.5 : 2.8, primary: i % 2 === 0 });
        }
      }
      // Center gateway node
      this.nodes.push({ x: 0, y: 0, z: 0, size: 5, primary: true });
      const centerIdx = this.nodes.length - 1;

      // Connect ring nodes
      for (let i = 0; i < nodesPerRing; i++) {
        const next = (i + 1) % nodesPerRing;
        this.edges.push([i, next]);
        this.edges.push([i + nodesPerRing, next + nodesPerRing]);
        this.edges.push([i, i + nodesPerRing]);
        if (i % 2 === 0) {
          this.edges.push([i, centerIdx]);
          this.edges.push([i + nodesPerRing, centerIdx]);
        }
      }
    } else if (this.type === 'contact-node') {
      // 3D Icosahedron-inspired data communication sphere
      const count = 14;
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        this.nodes.push({ x, y, z, size: 3.2, primary: i % 3 === 0 });
      }
      // Connect nearby nodes
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const p1 = this.nodes[i];
          const p2 = this.nodes[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
          if (dist < radius * 1.05) {
            this.edges.push([i, j]);
          }
        }
      }
    } else {
      // Default: Interconnected Security Network Mesh (Octahedron with internal security nodes)
      const r = radius * 0.95;
      const vertices = [
        { x: 0, y: -r, z: 0, size: 4.5, primary: true }, // Top
        { x: 0, y: r, z: 0, size: 4.5, primary: true },  // Bottom
        { x: -r, y: 0, z: 0, size: 3.5, primary: false },
        { x: r, y: 0, z: 0, size: 3.5, primary: false },
        { x: 0, y: 0, z: -r, size: 3.5, primary: false },
        { x: 0, y: 0, z: r, size: 3.5, primary: false },
        // Mid-plane satellites
        { x: -r * 0.6, y: -r * 0.4, z: r * 0.6, size: 2.8, primary: false },
        { x: r * 0.6, y: r * 0.4, z: -r * 0.6, size: 2.8, primary: false },
        { x: 0, y: 0, z: 0, size: 5.5, primary: true }   // Core
      ];
      this.nodes = vertices;
      this.edges = [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2],
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
        [6, 0], [6, 2], [6, 5],
        [7, 1], [7, 3], [7, 4]
      ];
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
    // Gentle continuous spin + cursor tilt lerp
    if (!this.mouse.isHovered) {
      this.targetAngleY += this.rotSpeedY;
      this.targetAngleX = Math.sin(Date.now() * 0.001) * 0.15;
    }

    this.angleY += (this.targetAngleY - this.angleY) * 0.06;
    this.angleX += (this.targetAngleX - this.angleX) * 0.06;
  }

  project(node) {
    // 3D Rotation matrices (Y-axis and X-axis)
    const cosY = Math.cos(this.angleY);
    const sinY = Math.sin(this.angleY);
    const cosX = Math.cos(this.angleX);
    const sinX = Math.sin(this.angleX);

    // Rotate Y
    const x1 = node.x * cosY + node.z * sinY;
    const z1 = -node.x * sinY + node.z * cosY;

    // Rotate X
    const y2 = node.y * cosX - z1 * sinX;
    const z2 = node.y * sinX + z1 * cosX;

    // Perspective projection
    const fov = 400;
    const scale = fov / (fov + z2);
    const projX = x1 * scale + this.width / 2;
    const projY = y2 * scale + this.height / 2;

    return {
      x: projX,
      y: projY,
      z: z2,
      scale,
      size: node.size * scale,
      primary: node.primary
    };
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const projected = this.nodes.map(n => this.project(n));
    const isDark = this.isDark;

    // Draw Edges
    this.ctx.lineWidth = 1.0;
    for (let i = 0; i < this.edges.length; i++) {
      const [idxA, idxB] = this.edges[i];
      const pA = projected[idxA];
      const pB = projected[idxB];
      if (!pA || !pB) continue;

      const avgZ = (pA.z + pB.z) / 2;
      const depthAlpha = Math.max(0.1, Math.min(0.85, (1 - avgZ / 250)));
      
      const strokeAlpha = isDark ? depthAlpha * 0.35 : depthAlpha * 0.28;
      this.ctx.strokeStyle = isDark 
        ? `rgba(56, 189, 248, ${strokeAlpha})` 
        : `rgba(37, 99, 235, ${strokeAlpha})`;

      this.ctx.beginPath();
      this.ctx.moveTo(pA.x, pA.y);
      this.ctx.lineTo(pB.x, pB.y);
      this.ctx.stroke();
    }

    // Sort nodes by Z for depth rendering
    const sorted = [...projected].sort((a, b) => a.z - b.z);

    // Draw Nodes
    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      const alpha = Math.max(0.2, Math.min(1.0, (1 - p.z / 250)));

      if (isDark) {
        if (p.primary) {
          this.ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
          // Subtle node glow
          this.ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
          this.ctx.shadowBlur = 8 * p.scale;
        } else {
          this.ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 0.8})`;
          this.ctx.shadowBlur = 0;
        }
      } else {
        if (p.primary) {
          this.ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
          this.ctx.shadowColor = 'rgba(37, 99, 235, 0.25)';
          this.ctx.shadowBlur = 4 * p.scale;
        } else {
          this.ctx.fillStyle = `rgba(71, 85, 105, ${alpha * 0.75})`;
          this.ctx.shadowBlur = 0;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0; // Reset
  }
}

/**
 * CUSTOM MINIMAL CURSOR
 * Precision dot with trailing outer ring and magnetic feedback.
 * Disabled automatically on touch devices.
 */

export class CustomCursor {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    this.mouse = { x: -100, y: -100 };
    this.dotPos = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    
    this.isHovered = false;
    this.isVisible = false;
    this.animationFrameId = null;

    if (!this.isTouch) {
      this.init();
    }
  }

  init() {
    this.createDOM();
    this.bindEvents();
    this.render();
  }

  createDOM() {
    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'custom-cursor-ring';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (!this.isVisible) {
        this.isVisible = true;
        this.dot.style.opacity = '1';
        this.ring.style.opacity = '1';
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      this.isVisible = false;
      this.dot.style.opacity = '0';
      this.ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.isVisible = true;
      this.dot.style.opacity = '1';
      this.ring.style.opacity = '1';
    });

    // Delegate hover detection for interactive elements
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, input, textarea, .interactive-card, .tilt-card, .theme-toggle-btn, [role="button"]');
      if (target) {
        this.setHoverState(true);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, input, textarea, .interactive-card, .tilt-card, .theme-toggle-btn, [role="button"]');
      if (target) {
        this.setHoverState(false);
      }
    });

    // Mousedown click feedback
    window.addEventListener('mousedown', () => {
      this.ring.classList.add('cursor-clicked');
    });

    window.addEventListener('mouseup', () => {
      this.ring.classList.remove('cursor-clicked');
    });
  }

  setHoverState(isHovered) {
    this.isHovered = isHovered;
    if (isHovered) {
      this.ring.classList.add('cursor-hover');
      this.dot.classList.add('cursor-hover-dot');
    } else {
      this.ring.classList.remove('cursor-hover');
      this.dot.classList.remove('cursor-hover-dot');
    }
  }

  render() {
    // Dot moves instantly
    this.dotPos.x = this.mouse.x;
    this.dotPos.y = this.mouse.y;

    // Ring lags with smooth spring interpolation
    const ease = 0.18;
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * ease;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * ease;

    if (this.dot && this.ring) {
      this.dot.style.transform = `translate3d(${this.dotPos.x}px, ${this.dotPos.y}px, 0) translate(-50%, -50%)`;
      this.ring.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0) translate(-50%, -50%)`;
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }
}

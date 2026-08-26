/**
 * 3D TILT & PARALLAX CONTROLLER
 * Applies micro 3D perspective tilt and dynamic lighting glare to cards.
 */

export class TiltController {
  constructor() {
    this.cards = [];
    this.init();
  }

  init() {
    this.bindCards();
  }

  bindCards() {
    const elements = document.querySelectorAll('[data-tilt]');
    elements.forEach(el => this.setupTilt(el));
  }

  setupTilt(element) {
    const maxTilt = parseFloat(element.getAttribute('data-tilt-max')) || 5;
    const perspective = parseFloat(element.getAttribute('data-tilt-perspective')) || 1000;
    const hasGlare = element.getAttribute('data-tilt-glare') !== 'false';

    let glareElement = null;
    if (hasGlare && !element.querySelector('.tilt-glare')) {
      glareElement = document.createElement('div');
      glareElement.className = 'tilt-glare';
      element.appendChild(glareElement);
    } else {
      glareElement = element.querySelector('.tilt-glare');
    }

    let isHovering = false;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let animId = null;

    const updateTransform = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;

      element.style.transform = `perspective(${perspective}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

      if (isHovering || Math.abs(currentRotateX) > 0.05 || Math.abs(currentRotateY) > 0.05) {
        animId = requestAnimationFrame(updateTransform);
      } else {
        element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
        animId = null;
      }
    };

    element.addEventListener('mousemove', (e) => {
      isHovering = true;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1; // -1 to 1

      targetRotateY = px * maxTilt;
      targetRotateX = -py * maxTilt;

      if (glareElement) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glareElement.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
        glareElement.style.opacity = '1';
      }

      if (!animId) {
        animId = requestAnimationFrame(updateTransform);
      }
    }, { passive: true });

    element.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotateX = 0;
      targetRotateY = 0;

      if (glareElement) {
        glareElement.style.opacity = '0';
      }

      if (!animId) {
        animId = requestAnimationFrame(updateTransform);
      }
    });
  }
}

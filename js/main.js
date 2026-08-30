/**
 * AKMAL B — PORTFOLIO MAIN CONTROLLER
 * Orchestrates dynamic component rendering, 3D Canvas visualizers,
 * interactions, scroll navigation spy, and accessibility.
 */

import { PORTFOLIO_DATA } from './data/portfolio-data.js';
import { themeManager } from './theme.js';
import { ParticleField } from './canvas/particle-field.js';
import { CustomCursor } from './interactions/cursor.js';
import { TiltController } from './interactions/tilt.js';

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.renderAllData();
      this.initVisualEngines();
      this.initNavigation();
      this.initContactForm();
      this.initBackToTop();
      this.initFooterYear();
      this.initScrollReveal();
    });
  }

  initVisualEngines() {
    // 1. Background Particle Field (Kept active)
    try {
      this.particleField = new ParticleField('particle-canvas');
    } catch (e) {
      console.warn('Particle canvas fallback active:', e);
    }

    // 2. Custom Precision Cursor
    try {
      this.customCursor = new CustomCursor();
    } catch (e) {
      console.warn('Cursor fallback:', e);
    }

    // 3. 3D Tilt Micro-interactions
    try {
      this.tiltController = new TiltController();
    } catch (e) {
      console.warn('Tilt controller fallback:', e);
    }
  }

  renderAllData() {
    this.renderTechnicalFoundation();
    this.renderSkills();
    this.renderLearningJourney();
    this.renderAreasOfExploration();
    this.renderProjects();
    this.renderExperience();
    this.renderEducation();
    this.renderCertifications();
    this.renderAchievements();
  }

  renderTechnicalFoundation() {
    const container = document.getElementById('foundation-pills');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.technicalFoundation.map(item => `
      <div class="foundation-pill" title="${item.name} (${item.status})">
        <span class="status-indicator"></span>
        <span class="font-mono text-xs tracking-wider uppercase">${item.name}</span>
        <span class="pill-category">${item.category}</span>
      </div>
    `).join('');
  }

  renderSkills() {
    const container = document.getElementById('skills-grid');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.skillCategories.map(cat => `
      <div class="skill-category-card" data-tilt data-tilt-max="4">
        <div class="skill-cat-header">
          <div class="skill-cat-title-group">
            <span class="skill-cat-id font-mono">0${cat.id === 'programming' ? '1' : cat.id === 'systems' ? '2' : cat.id === 'networking' ? '3' : cat.id === 'cybersecurity' ? '4' : '5'}</span>
            <h3 class="skill-cat-name">${cat.name}</h3>
          </div>
          <p class="skill-cat-desc">${cat.description}</p>
        </div>
        <div class="skills-list">
          ${cat.skills.map(s => `
            <div class="skill-item">
              <div class="skill-item-top">
                <span class="skill-item-name font-medium">${s.name}</span>
                <span class="skill-status-tag font-mono">${s.status}</span>
              </div>
              <p class="skill-item-desc">${s.description}</p>
              <div class="skill-tags">
                ${s.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderLearningJourney() {
    const container = document.getElementById('journey-nodes');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.learningJourney.map((node, index) => {
      const isCurrent = node.isCurrent;
      return `
        <div class="journey-node-wrapper ${isCurrent ? 'is-active-step' : ''}">
          <div class="journey-node-card" data-tilt data-tilt-max="3">
            <div class="journey-step-badge font-mono">${node.step}</div>
            <div class="journey-node-content">
              <div class="journey-node-header">
                <h3 class="journey-node-title">${node.title}</h3>
                <span class="journey-status font-mono">${node.status}</span>
              </div>
              <p class="journey-subtitle">${node.subtitle}</p>
              <p class="journey-node-desc">${node.description}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderAreasOfExploration() {
    const container = document.getElementById('areas-grid');
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.areasOfExploration.map(area => `
      <div class="area-card ${area.isPrimary ? 'is-primary-area' : ''}" data-tilt data-tilt-max="4">
        <div class="area-card-header">
          <div class="area-title-wrap">
            <h3 class="area-title">${area.title}</h3>
            <span class="area-badge font-mono">${area.badge}</span>
          </div>
        </div>
        <p class="area-desc">${area.description}</p>
        <div class="area-topics">
          ${area.topics.map(topic => `
            <span class="area-topic-pill">
              <svg class="topic-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              ${topic}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    const hasRealProjects = PORTFOLIO_DATA.projects && PORTFOLIO_DATA.projects.length > 0;

    if (!hasRealProjects) {
      // Intentional, beautifully crafted empty state per requirements (Rules #28, #78, #144)
      container.innerHTML = `
        <div class="empty-state-card projects-empty-state" data-tilt data-tilt-max="3">
          <div class="empty-state-glow"></div>
          <div class="empty-state-badge font-mono">
            <span class="status-pulse-dot"></span>
            Building the first chapter
          </div>
          <h3 class="empty-state-title">Practical Projects in Development</h3>
          <p class="empty-state-desc">
            Practical projects, security experiments, and code repositories will appear here as I build, test, and document hands-on work throughout my learning journey.
          </p>
          <div class="empty-placeholders-grid">
            <div class="placeholder-box">
              <div class="placeholder-header">
                <span class="placeholder-num font-mono">PROJECT 01</span>
                <span class="placeholder-tag font-mono">Upcoming</span>
              </div>
              <div class="placeholder-line w-3/4"></div>
              <div class="placeholder-line w-1/2"></div>
              <div class="placeholder-footer font-mono">Linux & Automation</div>
            </div>
            <div class="placeholder-box">
              <div class="placeholder-header">
                <span class="placeholder-num font-mono">PROJECT 02</span>
                <span class="placeholder-tag font-mono">Upcoming</span>
              </div>
              <div class="placeholder-line w-4/5"></div>
              <div class="placeholder-line w-3/5"></div>
              <div class="placeholder-footer font-mono">Network Analysis</div>
            </div>
            <div class="placeholder-box">
              <div class="placeholder-header">
                <span class="placeholder-num font-mono">PROJECT 03</span>
                <span class="placeholder-tag font-mono">Upcoming</span>
              </div>
              <div class="placeholder-line w-2/3"></div>
              <div class="placeholder-line w-1/2"></div>
              <div class="placeholder-footer font-mono">Cloud Security Lab</div>
            </div>
          </div>
          <div class="empty-state-action">
            <a href="https://github.com/Akmal-cybersecurity" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>Follow Progress on GitHub</span>
            </a>
          </div>
        </div>
      `;
    } else {
      // Dynamic rendering when real projects are provided
      container.innerHTML = `
        <div class="projects-grid">
          ${PORTFOLIO_DATA.projects.map(p => `
            <div class="project-card ${p.featured ? 'is-featured' : ''}" data-tilt>
              <div class="project-content">
                <span class="project-cat font-mono">${p.category}</span>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.description}</p>
                <div class="project-tags">
                  ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                  ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="link-btn font-mono text-xs">GitHub →</a>` : ''}
                  ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="link-btn font-mono text-xs">Live Demo →</a>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    const hasRealExperience = PORTFOLIO_DATA.experience && PORTFOLIO_DATA.experience.length > 0;

    if (!hasRealExperience) {
      container.innerHTML = `
        <div class="empty-state-card" data-tilt data-tilt-max="2">
          <div class="empty-state-badge font-mono">
            <span class="status-pulse-dot"></span>
            Academic & Foundations
          </div>
          <h3 class="empty-state-title">Experience & Journey</h3>
          <p class="empty-state-desc">
            Currently building experience through academic learning at SRM Trichy, personal experimentation, systems practice, and future technical project development.
          </p>
          <div class="timeline-empty-preview">
            <div class="timeline-empty-step">
              <span class="step-bullet"></span>
              <div>
                <h4 class="font-medium text-sm">Computer Science & Cyber Security Studies</h4>
                <p class="text-xs text-muted">SRM Trichy • 2026 – Present</p>
              </div>
            </div>
            <div class="timeline-empty-step is-future">
              <span class="step-bullet"></span>
              <div>
                <h4 class="font-medium text-sm">Future Internships, Hackathons & Research</h4>
                <p class="text-xs text-muted">Upcoming milestones will be documented as my journey develops.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  renderEducation() {
    const container = document.getElementById('education-card');
    if (!container) return;

    const edu = PORTFOLIO_DATA.education;
    container.innerHTML = `
      <div class="academic-card" data-tilt data-tilt-max="3">
        <div class="academic-header">
          <div>
            <span class="academic-period font-mono">${edu.period}</span>
            <h3 class="academic-degree">${edu.degree}</h3>
            <p class="academic-major">${edu.major} — <span class="highlight-specialization">${edu.specialization}</span></p>
          </div>
          <div class="academic-badge font-mono">SRM TRICHY</div>
        </div>
        <div class="academic-meta">
          <div class="meta-item">
            <span class="meta-label font-mono">INSTITUTION</span>
            <span class="meta-val">${edu.institution}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label font-mono">EXPECTED GRADUATION</span>
            <span class="meta-val">${edu.expectedGraduation}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label font-mono">LOCATION</span>
            <span class="meta-val">${edu.location}</span>
          </div>
        </div>
        <div class="academic-focus">
          <h4 class="focus-heading font-mono">CORE CURRICULUM & STUDY AREAS</h4>
          <div class="focus-pills">
            ${edu.focusAreas.map(f => `<span class="focus-pill">${f}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) return;

    const hasCerts = PORTFOLIO_DATA.certifications && PORTFOLIO_DATA.certifications.length > 0;

    if (!hasCerts) {
      container.innerHTML = `
        <div class="empty-state-card" data-tilt data-tilt-max="2">
          <div class="empty-state-badge font-mono">
            <span class="status-pulse-dot"></span>
            Continuous Growth
          </div>
          <h3 class="empty-state-title">Certifications & Credentials</h3>
          <p class="empty-state-desc">
            Professional certifications and verified credentials will be added here as I progress through my cybersecurity and cloud security learning roadmap.
          </p>
          <div class="certs-placeholder-grid">
            <div class="cert-placeholder-box">
              <span class="font-mono text-xs opacity-60">PLANNED TARGET</span>
              <h4 class="font-medium text-sm mt-1">Cloud Security Foundations</h4>
              <p class="text-xs text-muted mt-1">Study phase in progress</p>
            </div>
            <div class="cert-placeholder-box">
              <span class="font-mono text-xs opacity-60">PLANNED TARGET</span>
              <h4 class="font-medium text-sm mt-1">Linux & Systems Administration</h4>
              <p class="text-xs text-muted mt-1">Hands-on practice</p>
            </div>
            <div class="cert-placeholder-box">
              <span class="font-mono text-xs opacity-60">PLANNED TARGET</span>
              <h4 class="font-medium text-sm mt-1">Networking & Security Principles</h4>
              <p class="text-xs text-muted mt-1">Core curriculum</p>
            </div>
          </div>
        </div>
      `;
    }
  }

  renderAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;

    const hasAch = PORTFOLIO_DATA.achievements && PORTFOLIO_DATA.achievements.length > 0;

    if (!hasAch) {
      container.innerHTML = `
        <div class="empty-state-card" data-tilt data-tilt-max="2">
          <div class="empty-state-badge font-mono">
            <span class="status-pulse-dot"></span>
            Milestones
          </div>
          <h3 class="empty-state-title">Achievements & Milestones</h3>
          <p class="empty-state-desc">
            Technical milestones, competitions, hackathons, and notable technical accomplishments will be documented here as I participate in events and community challenges.
          </p>
        </div>
      `;
    }
  }

  initNavigation() {
    const navbar = document.getElementById('main-navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Scroll spy for sticky navbar styling & active link
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('navbar-scrolled');
      } else {
        navbar?.classList.remove('navbar-scrolled');
      }
      this.updateActiveNavLink();
    }, { passive: true });

    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
      const isOpen = mobileDrawer?.classList.contains('is-open');
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    });

    // Close mobile drawer when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileDrawer?.classList.add('is-open');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    mobileDrawer?.classList.remove('is-open');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !message) {
        if (feedback) {
          feedback.className = 'form-feedback is-error';
          feedback.textContent = 'Please fill out all fields before sending.';
        }
        return;
      }

      // Format mailto fallback link for secure direct transmission
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${PORTFOLIO_DATA.socials.email}?subject=${subject}&body=${body}`;

      if (feedback) {
        feedback.className = 'form-feedback is-success';
        feedback.textContent = 'Opening your email client to transmit message...';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
        form.reset();
      }, 600);
    });
  }

  initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  initFooterYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }
}

// Instantiate portfolio application
const app = new PortfolioApp();
export default app;

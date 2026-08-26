/**
 * THEME MANAGER
 * Handles smooth Dark Mode (default) and Light Mode transitions.
 * Emits custom events for 3D canvas and WebGL sync.
 */

const STORAGE_KEY = 'akmal_portfolio_theme';

export class ThemeManager {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.toggleButtons = [];
    this.init();
  }

  getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to dark mode per design requirements
    return 'dark';
  }

  init() {
    this.applyTheme(this.currentTheme, false);
    
    // Listen to system preference changes if user hasn't explicitly set one
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        this.applyTheme(e.matches ? 'dark' : 'light', true);
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      this.bindToggles();
    });
  }

  bindToggles() {
    this.toggleButtons = Array.from(document.querySelectorAll('.theme-toggle-btn'));
    this.toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => this.toggleTheme());
      this.updateButtonState(btn);
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme, true);
  }

  applyTheme(theme, save = true) {
    this.currentTheme = theme;
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }

    if (save) {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    this.toggleButtons.forEach(btn => this.updateButtonState(btn));

    // Dispatch global event for Canvas/3D system updates
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: this.currentTheme } 
    }));
  }

  updateButtonState(btn) {
    if (!btn) return;
    const isDark = this.currentTheme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    
    const darkIcon = btn.querySelector('.dark-icon');
    const lightIcon = btn.querySelector('.light-icon');
    
    if (darkIcon && lightIcon) {
      if (isDark) {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
      } else {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
      }
    }
  }

  isDark() {
    return this.currentTheme === 'dark';
  }
}

export const themeManager = new ThemeManager();

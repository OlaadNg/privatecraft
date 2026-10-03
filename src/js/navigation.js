import { $, $$ } from './utils.js';

export function initNavigation() {
  const header = $('#main-header');
  const hamburgerBtn = $('#hamburger-toggle');
  const mobileDrawer = $('#mobile-drawer');

  const closeMobileMenu = () => {
    mobileDrawer?.classList.remove('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  // Scroll header glass effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  hamburgerBtn?.addEventListener('click', () => {
    const isActive = mobileDrawer?.classList.toggle('active');
    hamburgerBtn.setAttribute('aria-expanded', String(isActive));
    mobileDrawer?.setAttribute('aria-hidden', String(!isActive));
    document.body.classList.toggle('menu-open', Boolean(isActive));
  });

  // Close the drawer after any menu action.
  mobileDrawer?.querySelectorAll('[data-link]').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) closeMobileMenu();
  });

  // Update active state based on current path
  updateActiveNavLinks();
}

export function updateActiveNavLinks() {
  const currentPath = window.location.pathname;
  $$('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href !== '/' && currentPath.startsWith(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

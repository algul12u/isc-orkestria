/* Mobile navigation: keyboard, outside click and desktop reset. */
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const mobileViewport = window.matchMedia('(max-width: 800px)');
document.documentElement.classList.add('js');

function setMenuOpen(open) {
  menu.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  menuButton.textContent = open ? '× Fermer' : '☰ Menu';
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
    setMenuOpen(false);
  }
});
mobileViewport.addEventListener('change', () => setMenuOpen(false));

/* Content stays visible when JavaScript or motion effects are unavailable. */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('pending');
    revealObserver.observe(element);
  });
}

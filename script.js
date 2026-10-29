const menuButton = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('#menu-panel');

if (menuButton && menuPanel) {
  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    menuButton.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    menuPanel.hidden = isExpanded;
  });

  menuPanel.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuPanel.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menuPanel.hidden) {
      menuPanel.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open menu');
      menuButton.focus();
    }
  });
}

const aboutNav = document.querySelector('.about-nav');
const indicator = aboutNav?.querySelector('.nav-indicator');
const aboutLinks = aboutNav ? [...aboutNav.querySelectorAll('a')] : [];

if (aboutNav && indicator && aboutLinks.length) {
  let activeIndex = 0;

  const moveIndicator = (index) => {
    const navBounds = aboutNav.getBoundingClientRect();
    const linkBounds = aboutLinks[index].getBoundingClientRect();
    const left = linkBounds.left - navBounds.left + (linkBounds.width - indicator.offsetWidth) / 2;

    indicator.style.left = `${left}px`;
    aboutLinks.forEach((link, linkIndex) => {
      link.classList.toggle('is-highlighted', linkIndex === index);
    });
  };

  const updatePosition = () => moveIndicator(activeIndex);

  moveIndicator(activeIndex);
  window.addEventListener('resize', updatePosition);
  document.fonts?.ready.then(updatePosition);
  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % aboutLinks.length;
    moveIndicator(activeIndex);
  }, 2000);
}

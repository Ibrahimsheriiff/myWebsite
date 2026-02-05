const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealEls = document.querySelectorAll('section, .card, .timeline-item, .contact-card');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

const modal = document.getElementById('image-modal');
const modalImg = modal ? modal.querySelector('img') : null;
const modalImages = document.querySelectorAll('.media-grid img');

if (modal && modalImg) {
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
  };

  modalImages.forEach((image) => {
    image.addEventListener('click', () => {
      const src = image.getAttribute('src');
      modalImg.src = src;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
}

const systemMaps = document.querySelectorAll('.system-map');
systemMaps.forEach((map) => {
  const nodes = map.querySelectorAll('.node');
  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      map.dataset.active = node.dataset.node;
    });
    node.addEventListener('mouseleave', () => {
      map.dataset.active = '';
    });
    node.addEventListener('focus', () => {
      map.dataset.active = node.dataset.node;
    });
    node.addEventListener('blur', () => {
      map.dataset.active = '';
    });
  });
});

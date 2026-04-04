// Navbar scroll effect
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 50);
  lastScroll = scrollY;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const actions = document.querySelector('.nav-actions');
  actions.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.querySelector('.nav-actions').classList.remove('open');
  });
});

// Screenshot tab switcher
const screenshotData = {
  chat: {
    id: 'ss-chat',
    caption: 'AI Chat with tool-calling — generates React/Recharts visualizations rendered in the output panel.'
  },
  agent: {
    id: 'ss-agent',
    caption: 'Visual Agent Editor — drag-and-drop multi-agent design with mesh networking and YAML export.'
  },
  task: {
    id: 'ss-task',
    caption: 'Minecraft Task Monitor — live pixel-art agents with speech bubbles, walking animations, and inter-agent interactions.'
  }
};

document.querySelectorAll('.ss-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const screen = tab.dataset.screen;
    const data = screenshotData[screen];
    if (!data) return;

    document.querySelectorAll('.ss-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    document.querySelectorAll('.screenshot-img').forEach(img => img.classList.remove('active'));
    document.getElementById(data.id).classList.add('active');

    const caption = document.getElementById('ssCaption');
    if (caption) caption.textContent = data.caption;
  });
});

// Topology button interaction
document.querySelectorAll('.topo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.topo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Smooth reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to cards and sections
document.querySelectorAll('.feature-card, .sec-card, .uc-card, .download-card, .step, .ps-card, .cli-card, .budget-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Stagger animation for grids
document.querySelectorAll('.features-grid, .security-grid, .uc-grid, .download-grid, .cli-grid, .budget-grid').forEach(grid => {
  const children = grid.children;
  Array.from(children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

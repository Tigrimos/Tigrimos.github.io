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
    caption: 'Task Manager — monitor running agent tasks with live status, call counts, and Minecraft-style visualization.'
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

// Topology switcher — 7 topologies
const topoData = {
  mesh: {
    title: 'Mesh Network',
    text: 'Every agent can talk to every other agent directly. Any node can request help from any peer — no bottleneck, full redundancy. Best for collaborative problem-solving where context is shared.'
  },
  pipeline: {
    title: 'Pipeline',
    text: 'Tasks flow through a fixed sequence: Design → Code → Test → Ship. Each agent specializes in one step and passes results to the next. Best for structured workflows like CI/CD or content pipelines.'
  },
  star: {
    title: 'Star (Hub & Spoke)',
    text: 'A central orchestrator delegates tasks to all workers and collects results. Workers don\'t talk to each other — the hub coordinates everything. Best when one agent has the full picture.'
  },
  p2p: {
    title: 'P2P Swarm',
    text: 'Like freelance bidding — tasks are posted and agents compete based on capability and cost. The best-fit agent wins the job. Fully decentralized with no single point of failure.'
  },
  broadcast: {
    title: 'Broadcast',
    text: 'One sender pushes the same task to all receivers simultaneously. Useful for parallel data processing, fan-out analysis, or when you need multiple perspectives on the same problem.'
  },
  hierarchical: {
    title: 'Hierarchical',
    text: 'Tree structure with managers and workers in layers. Top-level agents break work into sub-tasks and delegate down. Each layer can use a different AI model optimized for its role.'
  },
  hybrid: {
    title: 'Hybrid',
    text: 'Combines Star + Mesh + Pipeline in a single swarm. The orchestrator delegates via star pattern, workers collaborate via mesh, and output flows through a pipeline. Maximum flexibility.'
  }
};

document.querySelectorAll('.topo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const topo = btn.dataset.topo;
    const data = topoData[topo];
    if (!data) return;

    document.querySelectorAll('.topo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.topo-svg').forEach(s => s.classList.remove('active'));
    const svg = document.getElementById('topo-' + topo);
    if (svg) svg.classList.add('active');

    const title = document.getElementById('topoTitle');
    const text = document.getElementById('topoText');
    if (title) title.textContent = data.title;
    if (text) text.textContent = data.text;
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
document.querySelectorAll('.feature-card, .sec-card, .deploy-card, .download-card, .deploy-step, .budget-card, .pain-row').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Stagger animation for grids
document.querySelectorAll('.features-grid, .security-grid, .deploy-grid, .download-grid, .budget-grid, .pain-list').forEach(grid => {
  const children = grid.children;
  Array.from(children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

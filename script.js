/* ═══════════════════════════════════════════════════
   VIGNESHWAR REDDY PORTFOLIO — JavaScript
   ═══════════════════════════════════════════════════ */

/* ── 1. Canvas Particle Background ───────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');

  let w, h, particles = [], mouse = { x: null, y: null };
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 130;
  const COLORS = ['#00d4ff', '#7c3aed', '#10b981', '#f472b6'];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
  }

  function drawLine(a, b, dist) {
    const alpha = (1 - dist / MAX_DIST) * 0.25;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  function update() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 100) {
          p.x += dx / d * 1.5;
          p.y += dy / d * 1.5;
        }
      }

      drawParticle(p);
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < MAX_DIST) drawLine(particles[i], particles[j], dist);
      }
    }

    requestAnimationFrame(update);
  }

  window.addEventListener('resize', init);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  init();
  update();
})();

/* ── 2. Navbar ───────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4, rootMargin: `-${70}px 0px 0px 0px` });

  sections.forEach(s => observer.observe(s));
})();

/* ── 3. Scroll Reveal ────────────────────────────── */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.skill-category, .project-card, .timeline-item, .edu-card, .cert-card, .highlight-card, .contact-card'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => obs.observe(el));
})();

/* ── 4. Role Cycler ──────────────────────────────── */
(function initRoleCycler() {
  const el = document.getElementById('role-cycler');
  if (!el) return;
  const roles = [
    'Full Stack Apps',
    'AI/ML Models',
    'REST APIs',
    'NLP Pipelines',
    'React Frontends',
    'Flask Backends',
  ];
  let idx = 0;

  function typeWriter(text, el, speed, cb) {
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) { clearInterval(timer); if (cb) setTimeout(cb, 1800); }
    }, speed);
  }

  function eraser(el, speed, cb) {
    let text = el.textContent;
    const timer = setInterval(() => {
      text = text.slice(0, -1);
      el.textContent = text;
      if (!text.length) { clearInterval(timer); if (cb) cb(); }
    }, speed);
  }

  function cycle() {
    typeWriter(roles[idx], el, 80, () => {
      eraser(el, 50, () => {
        idx = (idx + 1) % roles.length;
        cycle();
      });
    });
  }

  setTimeout(cycle, 1500);
})();

/* ── 5. Grade Bar Animation ──────────────────────── */
(function initGradeBars() {
  const bars = document.querySelectorAll('.grade-bar');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.getPropertyValue('--pct') ||
          getComputedStyle(entry.target).getPropertyValue('--pct');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => obs.observe(b));
})();

/* ── 6. Animated Stat Counters ───────────────────── */
(function initCounters() {
  const cards = [
    { id: 'highlight-accuracy',    target: 92, suffix: '%',   decimals: 0, prefix: '~' },
    { id: 'highlight-articles',    target: 40, suffix: 'K+',  decimals: 0 },
    { id: 'highlight-performance', target: 30, suffix: '%',   decimals: 0 },
    { id: 'highlight-temples',     target: 10, suffix: '+',   decimals: 0 },
  ];

  function animateCounter(el, target, duration, prefix, suffix, decimals) {
    const numEl = el.querySelector('.highlight-number');
    if (!numEl) return;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const val = (pct * target).toFixed(decimals);
      numEl.textContent = (prefix || '') + val + (suffix || '');
      if (pct < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cfg = cards.find(c => c.id === entry.target.id);
        if (cfg) animateCounter(entry.target, cfg.target, 1500, cfg.prefix, cfg.suffix, cfg.decimals || 0);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) obs.observe(el);
  });
})();

/* ── 7. Contact Form ─────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  btn.innerHTML = '<span>Sending…</span>';
  btn.disabled = true;

  // Build mailto link
  const mailto = `mailto:vigneshwarreddy402@gmail.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message)}`;

  setTimeout(() => {
    window.location.href = mailto;
    btn.innerHTML = `<span>Message Sent ✓</span>`;
    btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    setTimeout(() => {
      btn.innerHTML = '<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1000);
}

/* ── 8. Smooth Section Transitions ──────────────── */
(function initSectionGlow() {
  const sections = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.05 });
  sections.forEach(s => obs.observe(s));
})();

/* ── 9. Cursor Glow Effect ───────────────────────── */
(function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

/* ── 10. Tilt on Project Cards ───────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c👋 Hey there!', 'color:#00d4ff; font-size:20px; font-weight:bold;');
console.log('%cThis portfolio was built by Vigneshwar Reddy Gangidi.', 'color:#8899bb; font-size:13px;');
console.log('%cInterested in hiring? → vigneshwarreddy402@gmail.com', 'color:#7c3aed; font-size:13px;');

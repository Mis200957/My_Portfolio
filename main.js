// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Language toggle (AR <-> EN) =====
const LANG_KEY = 'portfolio_lang';
const langToggle = document.getElementById('langToggle');

const applyLang = (lang) => {
  const html = document.documentElement;
  const isEn = lang === 'en';
  html.lang = isEn ? 'en' : 'ar';
  html.dir = isEn ? 'ltr' : 'rtl';

  document.querySelectorAll('[data-en]').forEach(el => {
    const en = el.getAttribute('data-en');
    if (!el.hasAttribute('data-ar')) {
      el.setAttribute('data-ar', el.textContent.trim());
    }
    el.textContent = isEn ? en : el.getAttribute('data-ar');
  });

  document.querySelectorAll('[data-en-html]').forEach(el => {
    const en = el.getAttribute('data-en-html');
    if (!el.hasAttribute('data-ar-html')) {
      el.setAttribute('data-ar-html', el.innerHTML.trim());
    }
    el.innerHTML = isEn ? en : el.getAttribute('data-ar-html');
  });

  if (langToggle) {
    langToggle.setAttribute('aria-label', isEn ? 'Switch language' : 'تبديل اللغة');
    langToggle.title = isEn ? 'Switch language' : 'تبديل اللغة';
  }

  try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
};

let currentLang = 'ar';
try { currentLang = localStorage.getItem(LANG_KEY) || 'ar'; } catch (e) {}
if (currentLang === 'en') applyLang('en');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLang(currentLang);
  });
}

// ===== Sticky nav shadow =====
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Reveal on scroll =====
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
reveals.forEach(el => io.observe(el));

// ===== Counter animation =====
const stats = document.querySelectorAll('.stat-num');
const animateCount = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
stats.forEach(s => statIo.observe(s));

// ===== Project filters =====
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const f = btn.dataset.filter;
    projects.forEach(card => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ===== THEME TOGGLE ===== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 'light';

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.className = 'fas fa-sun';
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.className = 'fas fa-moon';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.className = 'fas fa-sun';
      localStorage.setItem('theme', 'dark');
    }
  });

  /* ===== MOBILE HAMBURGER ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinkEls.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--primary)';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ===== SCROLL REVEAL (Intersection Observer) ===== */
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ===== SKILL BAR ANIMATION ===== */
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(bar => barObserver.observe(bar));

  /* ===== COUNTER ANIMATION ===== */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  function animateCounter(el, target) {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + '+';
    }, 30);
  }

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    const mailtoLink = `mailto:agyirisakyi3@gmail.com?subject=${encodeURIComponent(subject || 'New Inquiry from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.open(mailtoLink, '_blank');
    showFormMessage('Thank you! Your message has been sent.', 'success');
    contactForm.reset();
  });

  function showFormMessage(msg, type) {
    const existing = contactForm.querySelector('.form-message');
    if (existing) existing.remove();

    const p = document.createElement('p');
    p.className = 'form-message';
    p.textContent = msg;
    p.style.cssText = `
      margin-top: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: .88rem;
      font-weight: 500;
      text-align: center;
      background: ${type === 'error' ? 'rgba(239,68,68,.2)' : 'rgba(34,197,94,.2)'};
      color: ${type === 'error' ? '#fca5a5' : '#86efac'};
      border: 1px solid ${type === 'error' ? 'rgba(239,68,68,.3)' : 'rgba(34,197,94,.3)'};
    `;
    contactForm.appendChild(p);

    setTimeout(() => { p.style.opacity = '0'; p.style.transition = 'opacity .3s'; }, 4000);
    setTimeout(() => p.remove(), 4300);
  }

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(open => {
        open.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});

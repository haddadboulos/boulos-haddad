/* ==========================================================================
   PORTFOLIO ENGINE // INTERACTIVE CANVAS, PHYSICS & MICRO-INTERACTIONS
   Inspired by wodniack.dev // Canvas Backdrop, Mouse Dynamics, 3D Tilt
   ========================================================================== */

(function () {
  'use strict';

  // State
  const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2, moved: false },
    cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    canvasMode: 0, // 0: magnetic blue, 1: repulsion shockwave, 2: quantum constellation
    modes: ['magnetic blue', 'repulsion grid', 'quantum field'],
    ripples: []
  };

  /* ==========================================================================
     1. CUSTOM CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      state.mouse.x = e.clientX;
      state.mouse.y = e.clientY;
      state.mouse.moved = true;

      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Smooth lerp for outer ring
    function renderCursor() {
      state.cursor.x += (state.mouse.x - state.cursor.x) * 0.18;
      state.cursor.y += (state.mouse.y - state.cursor.y) * 0.18;
      cursorRing.style.transform = `translate(${state.cursor.x}px, ${state.cursor.y}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover state detection
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor="hover"], .tilt-card');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
      target.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';
  }

  /* ==========================================================================
     2. INTERACTIVE CANVAS BACKDROP (Physics & Particles)
     ========================================================================== */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 45 : 95;

    // Symbol choices inspired by wodniack.dev
    const symbols = ['•', '0', '1', '+', '✦'];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = init ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = init ? Math.random() * height : Math.random() * height;
        this.originX = this.x;
        this.originY = this.y;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.3 ? 'rgba(56, 189, 248,' : 'rgba(59, 130, 246,';
        this.alpha = Math.random() * 0.5 + 0.2;
        this.isSymbol = Math.random() > 0.65;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.size = Math.random() * 10 + 9;
      }

      update() {
        // Natural ambient drift
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundary
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse physics interaction
        const dx = state.mouse.x * dpr - this.x;
        const dy = state.mouse.y * dpr - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180 * dpr;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist);
          const angle = Math.atan2(dy, dx);

          if (state.canvasMode === 0) {
            // Mode 0: Magnetic attraction/orbit
            this.x += Math.cos(angle) * force * 3.5;
            this.y += Math.sin(angle) * force * 3.5;
          } else if (state.canvasMode === 1) {
            // Mode 1: Strong Repulsion shock
            this.x -= Math.cos(angle) * force * 7.0;
            this.y -= Math.sin(angle) * force * 7.0;
          } else {
            // Mode 2: Swirl turbulence
            this.x += Math.cos(angle + Math.PI / 2) * force * 5.0;
            this.y += Math.sin(angle + Math.PI / 2) * force * 5.0;
          }
        }

        // Handle ripples from clicks
        for (let i = 0; i < state.ripples.length; i++) {
          const rip = state.ripples[i];
          const rdx = this.x - rip.x;
          const rdy = this.y - rip.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          if (Math.abs(rDist - rip.radius) < 30 * dpr) {
            const push = (1 - Math.abs(rDist - rip.radius) / (30 * dpr)) * rip.power;
            const rAngle = Math.atan2(rdy, rdx);
            this.x += Math.cos(rAngle) * push * 6;
            this.y += Math.sin(rAngle) * push * 6;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.fillStyle = `${this.baseColor} ${this.alpha})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
        ctx.shadowBlur = 6;

        if (this.isSymbol) {
          ctx.font = `${this.size}px 'JetBrains Mono', monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.symbol, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth * dpr;
      height = window.innerHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Click Shockwave
    window.addEventListener('click', (e) => {
      state.ripples.push({
        x: e.clientX * dpr,
        y: e.clientY * dpr,
        radius: 10,
        maxRadius: 260 * dpr,
        power: 1.0,
        alpha: 0.8
      });
    });

    // Cycle Mode Button
    const modeBtn = document.getElementById('canvas-mode-btn');
    const modeText = document.getElementById('mode-text');
    if (modeBtn && modeText) {
      modeBtn.addEventListener('click', () => {
        state.canvasMode = (state.canvasMode + 1) % state.modes.length;
        modeText.textContent = state.modes[state.canvasMode];
      });
    }

    // Animation Loop
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Render ripples
      for (let i = state.ripples.length - 1; i >= 0; i--) {
        const rip = state.ripples[i];
        rip.radius += 6 * dpr;
        rip.alpha *= 0.94;
        rip.power *= 0.94;

        ctx.save();
        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha})`;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (rip.alpha < 0.02 || rip.radius > rip.maxRadius) {
          state.ripples.splice(i, 1);
        }
      }

      // Connect particles with luminous blue lines
      const maxConnectDist = 110 * dpr;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.18;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.8 * dpr;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw connection lines to mouse
      const mouseMaxDist = 140 * dpr;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();

        const mdx = state.mouse.x * dpr - p.x;
        const mdy = state.mouse.y * dpr - p.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouseMaxDist) {
          const mAlpha = (1 - mDist / mouseMaxDist) * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(state.mouse.x * dpr, state.mouse.y * dpr);
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /* ==========================================================================
     3. 3D CARD TILT & SPECULAR HOVER
     ========================================================================== */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
        const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  /* ==========================================================================
     4. SCROLL PROGRESS & HEADER STATE
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  /* ==========================================================================
     5. SCROLL REVEAL (IntersectionObserver)
     ========================================================================== */
  document.body.classList.add('js-motion');
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

  reveals.forEach((el) => revealObserver.observe(el));

  /* ==========================================================================
     6. MOBILE MENU DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();

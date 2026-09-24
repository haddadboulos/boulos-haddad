// ===================================
// BOOT
// ===================================

document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const topNav = document.querySelector('.top-nav');

// ===================================
// MOBILE MENU TOGGLE
// ===================================

function setMenu(open) {
    menuToggle.classList.toggle('active', open);
    navMenu.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
}

menuToggle.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('active'));
});

navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        setMenu(false);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        setMenu(false);
        menuToggle.focus();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) setMenu(false);
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

window.addEventListener('scroll', () => {
    topNav.classList.toggle('scrolled', window.scrollY > 100);
}, { passive: true });

// ===================================
// SMOOTH SCROLL WITH NAV OFFSET
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        const target = id === '#top' ? document.body : document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = id === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - topNav.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', id);
    });
});

// ===================================
// ACTIVE NAV LINK
// ===================================

const sections = ['about', 'projects', 'experience', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => navObserver.observe(section));

// ===================================
// REVEAL ON SCROLL
// ===================================

const revealTargets = document.querySelectorAll(
    '.hero-left, .hero-right, .section'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Safety net: never leave content hidden if the observer misses (deep links, print, bots)
window.addEventListener('load', () => {
    setTimeout(() => revealTargets.forEach(el => el.classList.add('fade-in')), 2500);
});
window.addEventListener('beforeprint', () => revealTargets.forEach(el => el.classList.add('fade-in')));

// ===================================
// FOOTER YEAR
// ===================================

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

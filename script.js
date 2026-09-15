// ========== TYPING ANIMATION ==========
// CHANGE THIS: Replace "Web Developer" etc with what you actually do
var typed = new Typed('.typed-text', {
  strings: ['Elvis Wachira', 'a Web Developer', 'a Freelancer', 'a Problem Solver'],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true
});

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) progressBar.style.width = scrolled + '%';
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.navicon')?.classList.remove('active');
    }
  });
});

// ========== DARK MODE TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  if (themeToggle) {
    themeToggle.querySelector('i').classList.remove('fa-moon');
    themeToggle.querySelector('i').classList.add('fa-sun');
  }
}

// ========== MOBILE HAMBURGER MENU ==========
const navicon = document.getElementById('navicon');
const navLinksMenu = document.querySelector('.nav-links');

if (navicon && navLinksMenu) {
  navicon.addEventListener('click', () => {
    navicon.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
  });
}

// ========== SKILLS PROGRESS BARS ==========
const skillBars = document.querySelectorAll('.progress-fill');
const skillsSection = document.querySelector('#skills');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
  skillsAnimated = true;
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// ========== CIRCLE STATS ANIMATION ==========
const circles = document.querySelectorAll('.circle');
let circlesAnimated = false;

function animateCircles() {
  if (circlesAnimated) return;
  circles.forEach(circle => {
    const value = parseFloat(circle.getAttribute('data-value'));
    const degree = value * 360;
    circle.style.background = `conic-gradient(var(--accent) 0deg ${degree}deg, var(--border) ${degree}deg)`;
  });
  circlesAnimated = true;
}

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCircles();
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (document.querySelector('.about-stats')) {
  aboutObserver.observe(document.querySelector('.about-stats'));
}

// ========== PROJECT FILTERING ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    projects.forEach(project => {
      const category = project.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        project.style.display = 'block';
        project.style.animation = 'fadeInUp 0.4s ease';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formMessage = document.querySelector('.form-message');
    formMessage.innerHTML = '<p style="color: green;">✓ Thanks! I\'ll respond within 24 hours.</p>';
    contactForm.reset();
    setTimeout(() => {
      formMessage.innerHTML = '';
    }, 4000);
  });
}
// Custom Cursor Animation
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
  });

  // Hover effect for interactive elements
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = `scale(1.5)`;
      cursorFollower.style.borderColor = '#ffd700';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = `scale(1)`;
      cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });
  });
}

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
  if (animated) return;
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 30);
  });
  animated = true;
}

// Trigger stats when in viewport
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    // Filter projects with animation
    projects.forEach((project, index) => {
      const category = project.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        project.classList.remove('hide');
        project.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`;
      } else {
        project.classList.add('hide');
      }
    });
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.project-card, .stat-card, .skill-tag');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  scrollObserver.observe(el);
});

// Typing Animation for Bio (Optional)
const bioText = document.querySelector('.bio');
if (bioText && !bioText.hasAttribute('data-typed')) {
  const originalText = bioText.textContent;
  bioText.textContent = '';
  bioText.setAttribute('data-typed', 'true');
  
  let i = 0;
  function typeWriter() {
    if (i < originalText.length) {
      bioText.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();
}

// Parallax effect on hover for project cards
projects.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// Glowing effect on header
const header = document.querySelector('header');
if (header) {
  header.addEventListener('mousemove', (e) => {
    const rect = header.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = header.querySelector('.glow-effect');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 70%)`;
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Dynamic year in footer
const footerYear = document.querySelector('footer p');
if (footerYear) {
  const year = new Date().getFullYear();
  footerYear.innerHTML = footerYear.innerHTML.replace('2025', year);
}

console.log('🚀 Portfolio loaded with animations!');
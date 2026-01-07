// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const backToTopBtn = document.getElementById('backToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

// State
let currentTestimonial = 0;
let isScrolling = false;

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
  initNavigation();
  initScrollEffects();
  initProjectFilter();
  initTestimonials();
  initForms();
  initAnimations();
});

// Navigation
function initNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
      span.style.transform = navMenu.classList.contains('active') 
        ? getHamburgerTransform(index) 
        : 'none';
    });
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      navToggle.querySelectorAll('span').forEach(span => {
        span.style.transform = 'none';
      });
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

function getHamburgerTransform(index) {
  const transforms = [
    'rotate(45deg) translate(5px, 5px)',
    'opacity: 0',
    'rotate(-45deg) translate(7px, -6px)'
  ];
  return transforms[index];
}

// Scroll Effects
function initScrollEffects() {
  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      backToTopBtn.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTopBtn.classList.remove('show');
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink();
  });

  // Back to top button
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// Project Filter
function initProjectFilter() {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      const filter = this.getAttribute('data-filter');
      projectItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Testimonials Slider
function initTestimonials() {
  if (testimonialItems.length === 0) return;

  // Auto-play testimonials
  setInterval(() => {
    nextTestimonial();
  }, 5000);

  // Manual controls
  if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
  }
}

function showTestimonial(index) {
  testimonialItems.forEach((item, i) => {
    item.classList.remove('active');
    if (i === index) {
      item.classList.add('active');
    }
  });
  currentTestimonial = index;
}

function nextTestimonial() {
  const nextIndex = (currentTestimonial + 1) % testimonialItems.length;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  const prevIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
  showTestimonial(prevIndex);
}

// Forms
function initForms() {
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Validate form
      if (!validateContactForm(data)) {
        return;
      }
      
      // Show success message
      showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      
      // Reset form
      this.reset();
    });
  }

  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      if (!validateEmail(email)) {
        showFormMessage('Por favor, insira um e-mail válido.', 'error');
        return;
      }
      
      showFormMessage('Inscrição realizada com sucesso!', 'success');
      this.reset();
    });
  }
}

function validateContactForm(data) {
  if (!data.name || data.name.trim().length < 3) {
    showFormMessage('Por favor, insira seu nome completo.', 'error');
    return false;
  }
  
  if (!validateEmail(data.email)) {
    showFormMessage('Por favor, insira um e-mail válido.', 'error');
    return false;
  }
  
  if (!data.phone || data.phone.trim().length < 10) {
    showFormMessage('Por favor, insira um telefone válido.', 'error');
    return false;
  }
  
  if (!data.service) {
    showFormMessage('Por favor, selecione um tipo de serviço.', 'error');
    return false;
  }
  
  if (!data.message || data.message.trim().length < 10) {
    showFormMessage('Por favor, descreva melhor seu projeto (mínimo 10 caracteres).', 'error');
    return false;
  }
  
  return true;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  
  // Style the message
  messageDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: slideInRight 0.3s ease;
  `;
  
  // Set background color based on type
  const colors = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };
  
  messageDiv.style.background = colors[type] || colors.info;
  
  // Add to DOM
  document.body.appendChild(messageDiv);
  
  // Remove after 5 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 300);
  }, 5000);
}

// Animations
function initAnimations() {
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in-up {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .fade-in-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .project-item, .stat-item, .feature');
  animatedElements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Format as (XX) XXXXX-XXXX
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      }
      
      e.target.value = value;
    });
  }
});

// Loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.animation = 'fadeIn 0.5s ease';
    });
    
    // Handle image loading errors
    img.addEventListener('error', function() {
      this.src = 'https://via.placeholder.com/400x300/1e293b/e5e7eb?text=Imagem+Indisponível';
    });
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(function() {
  // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add CSS animation for fade in
const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(fadeInStyle);

// Initialize project items with transition styles
projectItems.forEach(item => {
  item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Add hover effect for service cards
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Format the number
    if (element.textContent.includes('+')) {
      element.textContent = Math.floor(current) + '+';
    } else if (element.textContent.includes('%')) {
      element.textContent = Math.floor(current) + '%';
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Initialize counter animation when stats are visible
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const statValue = entry.target.querySelector('h3');
      const targetValue = parseInt(statValue.textContent.replace(/\D/g, ''));
      
      entry.target.classList.add('animated');
      animateCounter(statValue, targetValue);
    }
  });
}, { threshold: 0.5 });

// Observe stat items
document.addEventListener('DOMContentLoaded', function() {
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    statsObserver.observe(item);
  });
});

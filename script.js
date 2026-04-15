// ========================================
// VENUEFINDERNG - MODERN JAVASCRIPT
// ========================================

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
}

// Close mobile menu when clicking links
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu on scroll
window.addEventListener('scroll', () => {
  if (mobileMenu.classList.contains('active')) {
    mobileToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ========================================
// TESTIMONIAL SLIDER
// ========================================
class TestimonialSlider {
  constructor() {
    this.slider = document.getElementById('testimonialSlider');
    if (!this.slider) return;
    
    this.slides = this.slider.querySelectorAll('.testimonial-slide');
    this.dots = document.querySelectorAll('.slider-dots .dot');
    this.prevBtn = document.getElementById('prevTestimonial');
    this.nextBtn = document.getElementById('nextTestimonial');
    this.currentSlide = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000;
    
    this.init();
  }
  
  init() {
    // Button listeners
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    // Dot listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Touch support
    this.addTouchSupport();
    
    // Start autoplay
    this.startAutoplay();
    
    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoplay());
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
  }
  
  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');
    
    this.currentSlide = index;
    
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
  }
  
  next() {
    const nextSlide = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextSlide);
  }
  
  prev() {
    const prevSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevSlide);
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
  }
  
  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }
  
  addTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.slider.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });
    
    this.slider.addEventListener('touchend', () => {
      if (startX - endX > 50) this.next();
      if (endX - startX > 50) this.prev();
    });
  }
}

// Initialize testimonial slider
new TestimonialSlider();

// ========================================
// FAQ ACCORDION
// ========================================
document.querySelectorAll('.faq-item-modern').forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item-modern').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('open');
      }
    });
    
    // Toggle current FAQ
    item.classList.toggle('open');
  });
});

// ========================================
// NEWSLETTER FORM
// ========================================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = newsletterForm.querySelector('.subscribe-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Subscribing...</span>';
    submitBtn.disabled = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success state
    submitBtn.innerHTML = '<span>✓ Subscribed!</span>';
    submitBtn.style.background = '#10b981';
    
    // Reset form
    setTimeout(() => {
      newsletterForm.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', () => {
  console.log('🎉 VenueFinderNG loaded successfully!');
});
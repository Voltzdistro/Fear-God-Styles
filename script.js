// Fear God Styles Landing Page JS
// Edit WhatsApp number in whatsappNumber below and all wa.me links in HTML as needed

document.addEventListener('DOMContentLoaded', function () {
  // WhatsApp number (change here to update for all buttons)
  const whatsappNumber = "2348088184511"; // <-- EDIT THIS

  // Mobile nav
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', function () {
    const expanded = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', expanded);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // WhatsApp Order buttons (product grid)
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const product = btn.getAttribute('data-product');
      // Prefilled WhatsApp message
      const waMsg = encodeURIComponent(`Hi Fear God Styles, I want to order ${product}`);
      window.open(`https://wa.me/${whatsappNumber}?text=${waMsg}`, '_blank');
    });
  });

  // Sticky WhatsApp button (mobile)
  const stickyBtn = document.querySelector('.whatsapp-sticky');
  if (stickyBtn) {
    stickyBtn.addEventListener('click', function () {
      // Already points to wa.me, nothing needed
    });
  }

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  document.querySelectorAll('.gallery-thumb').forEach(img => {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      lightbox.focus();
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        img.click();
      }
    });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('active') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeLightbox();
    }
  });
  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }

  // Testimonials carousel
  const testimonialCards = Array.from(document.querySelectorAll('.testimonial-card'));
  let currentTestimonial = 0;
  function showTestimonial(idx) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === idx);
    });
  }
  document.querySelector('.carousel-btn.next').addEventListener('click', function () {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });
  document.querySelector('.carousel-btn.prev').addEventListener('click', function () {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  });
  showTestimonial(currentTestimonial);

  // Mailing list form
const mailingForm = document.getElementById('mailing-form');
const toast = document.getElementById('toast');

mailingForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = mailingForm.email.value.trim();

  if (!validateEmail(email)) {
    mailingForm.email.focus();
    showToast("Please enter a valid email address.");
    return;
  }

  // Send form data to FormSubmit via fetch
  fetch(mailingForm.action, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      email: email,
      _captcha: "false",
      _subject: "New Mailing List Signup"
    })
  })
  .then(() => {
    mailingForm.reset();
    showToast("You’ve joined our mailing list! 🎉");
  })
  .catch(() => {
    showToast("Oops, something went wrong. Try again!");
  });
});

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
  // Copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
});
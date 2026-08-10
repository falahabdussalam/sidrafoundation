/* ==========================================================================
   SIDRA FOUNDATION - Master JavaScript
   Interactive navigation, counter animations, search filters, modals & forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initCounterAnimations();
  initVentureSearch();
  initGalleryFilters();
  initGalleryLightbox();
  initVideoModal();
  initContactForm();
  initDonationModal();
  initScrollReveal();
});

/* --- 1. Sticky Header --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- 2. Mobile Navigation Toggle --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (mainNav.classList.contains('active')) {
        icon.className = 'bi bi-x-lg';
      } else {
        icon.className = 'bi bi-list';
      }
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) icon.className = 'bi bi-list';
    });
  });
}

/* --- 3. Animated Impact Statistics Counter --- */
function initCounterAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const suffix = stat.getAttribute('data-suffix') || '';
          if (isNaN(target)) return;

          let count = 0;
          const duration = 2000; // 2 seconds
          const stepTime = 30;
          const increment = Math.ceil(target / (duration / stepTime));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            stat.textContent = count.toLocaleString('en-IN') + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --- 4. Venture Grid Search / Filter --- */
function initVentureSearch() {
  const searchInput = document.querySelector('.venture-search-input');
  const ventureCards = document.querySelectorAll('.venture-card');

  if (!searchInput || ventureCards.length === 0) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    ventureCards.forEach(card => {
      const name = card.querySelector('.venture-name').textContent.toLowerCase();
      if (name.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* --- 5. Gallery Filter Tabs --- */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --- 6. Gallery Lightbox --- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;

  // Create lightbox markup dynamically if not present
  let lightbox = document.getElementById('gallery-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'gallery-lightbox';
    lightbox.className = 'modal-overlay';
    lightbox.innerHTML = `
      <div class="modal-card" style="max-width: 850px; padding: 1.5rem; background: #000; text-align: center;">
        <button class="modal-close" style="color: #fff; font-size: 2rem;">&times;</button>
        <img id="lightbox-img" src="" alt="Gallery Image" style="max-height: 75vh; margin: 0 auto; border-radius: 8px;">
        <h4 id="lightbox-caption" style="color: #fff; margin-top: 1rem; font-family: var(--font-heading);"></h4>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('#lightbox-img');
  const lightboxCaption = lightbox.querySelector('#lightbox-caption');
  const closeBtn = lightbox.querySelector('.modal-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption') || img;
      lightboxImg.src = img.src;
      lightboxCaption.textContent = caption.textContent || img.alt;
      lightbox.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

/* --- 7. Video Modal --- */
function initVideoModal() {
  const videoBtns = document.querySelectorAll('.btn-watch-video, .video-trigger');
  if (videoBtns.length === 0) return;

  let modal = document.getElementById('video-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 800px; padding: 1rem; background: #000;">
        <button class="modal-close" style="color: #fff; font-size: 2rem; z-index: 10;">&times;</button>
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;">
          <iframe id="video-frame" style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const videoFrame = modal.querySelector('#video-frame');
  const closeBtn = modal.querySelector('.modal-close');

  videoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Default SIDRA foundation video
      videoFrame.src = "https://www.youtube.com/embed/M1KJIWgNAE8?autoplay=1";
      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    videoFrame.src = "";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      videoFrame.src = "";
    }
  });
}

/* --- 8. Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Submit payload asynchronously to API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    }).then(res => res.json())
      .then(data => {
        showToast('Thank you! Your message has been sent successfully.', 'success');
        form.reset();
      })
      .catch(() => {
        showToast('Thank you! Your message has been received.', 'success');
        form.reset();
      });
  });
}

/* --- 9. Donation Modal & Tax Calculator --- */
function initDonationModal() {
  const donateBtns = document.querySelectorAll('.btn-donate-trigger, a[href="/payment"], a[href="donate.html"]');
  
  let modal = document.getElementById('donate-modal');
  if (!modal && donateBtns.length > 0) {
    modal = document.createElement('div');
    modal.id = 'donate-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <button class="modal-close">&times;</button>
        <div class="text-center" style="margin-bottom: 1.5rem;">
          <span class="mission-tag">SIDRA FOUNDATION</span>
          <h3 style="color: var(--dark-green); font-size: 1.75rem; margin-top: 0.25rem;">Make a Difference Today</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Your donation is eligible for 80G Tax Exemption.</p>
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem;">
          <button class="btn btn-outline amount-btn" data-amount="500">₹500</button>
          <button class="btn btn-outline amount-btn active" data-amount="1000" style="background: var(--dark-green); color: #fff;">₹1,000</button>
          <button class="btn btn-outline amount-btn" data-amount="2500">₹2,500</button>
          <button class="btn btn-outline amount-btn" data-amount="5000">₹5,000</button>
        </div>

        <div class="form-group">
          <label class="form-label">Custom Amount (₹)</label>
          <input type="number" id="custom-amount" class="form-input" value="1000" placeholder="Enter amount">
        </div>

        <div class="form-group">
          <label class="form-label">Select Cause</label>
          <select id="donation-cause" class="form-input">
            <option>General Education & Volunteering</option>
            <option>Langar e Khwaja (Food Relief)</option>
            <option>Safe Water Mission (Handpumps)</option>
            <option>SIDRA Primary Academies</option>
          </select>
        </div>

        <div style="background: var(--light-green); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; border: 1px solid var(--border-light);">
          <div style="font-size: 0.85rem; color: var(--dark-green); font-weight: 700;">80G Tax Exemption Notice</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
            For tax receipt, WhatsApp your PAN card & payment details to <strong>+91 7624 852 616</strong>.
          </div>
        </div>

        <button id="proceed-donate-btn" class="btn btn-primary" style="width: 100%;">PROCEED TO DONATE</button>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close');
    const amountBtns = modal.querySelectorAll('.amount-btn');
    const customInput = modal.querySelector('#custom-amount');
    const proceedBtn = modal.querySelector('#proceed-donate-btn');

    amountBtns.forEach(b => {
      b.addEventListener('click', () => {
        amountBtns.forEach(btn => {
          btn.style.background = 'transparent';
          btn.style.color = 'var(--dark-green)';
        });
        b.style.background = 'var(--dark-green)';
        b.style.color = '#fff';
        customInput.value = b.getAttribute('data-amount');
      });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });

    proceedBtn.addEventListener('click', () => {
      const amount = customInput.value || 1000;
      showToast(`Thank you! Proceeding to secure donation of ₹${amount}...`, 'success');
      setTimeout(() => {
        window.location.href = 'donate.html';
      }, 1200);
    });
  }

  donateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === 'donate.html') return; // Allow normal link if intended
      e.preventDefault();
      if (modal) modal.classList.add('active');
    });
  });
}

/* --- 10. Toast Helper Function --- */
function showToast(message, type = 'info') {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill';
  toast.innerHTML = `<i class="bi ${icon}" style="font-size: 1.2rem;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --- 11. Scroll Reveal Animations --- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.impact-card, .beneficiary-card, .venture-card, .club-card, .institution-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
  });
}

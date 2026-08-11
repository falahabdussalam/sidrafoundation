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
  initHeroSlider();
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
      <div class="modal-card" style="max-width: 850px; padding: 1rem; background: #000; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
        <button class="modal-close" style="color: #fff; font-size: 2rem; z-index: 10; top: 0.5rem; right: 1rem;">&times;</button>
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

  function getYouTubeEmbedUrl(url) {
    if (!url) return "https://www.youtube.com/embed/3i3bupyjwuo?autoplay=1";
    let videoId = "3i3bupyjwuo";
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('/embed/')) {
      videoId = url.split('/embed/')[1].split('?')[0];
    }
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }

  videoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href') || btn.getAttribute('data-video-url');
      videoFrame.src = getYouTubeEmbedUrl(href);
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
  const upiId = "sidrafoundation.62303943@hdfcbank";

  let modal = document.getElementById('donate-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'donate-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <button class="modal-close" aria-label="Close modal">&times;</button>
        
        <!-- Step 1: Select Amount -->
        <div id="donate-step-1">
          <div class="text-center" style="margin-bottom: 1.5rem;">
            <span class="mission-tag">SIDRA FOUNDATION</span>
            <h3 style="color: var(--dark-green); font-size: 1.75rem; margin-top: 0.25rem;">Make a Difference Today</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem;">Your donation is eligible for 80G Tax Exemption.</p>
          </div>

          <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1.5rem;">
            <button class="btn btn-outline amount-btn" data-amount="500">₹500</button>
            <button class="btn btn-outline amount-btn active" data-amount="1000" style="background: var(--dark-green); color: #fff;">₹1,000</button>
            <button class="btn btn-outline amount-btn" data-amount="2500">₹2,500</button>
            <button class="btn btn-outline amount-btn" data-amount="5000">₹5,000</button>
          </div>

          <div class="form-group">
            <label class="form-label"><i class="bi bi-person-fill"></i> Donor Name</label>
            <input type="text" id="donor-name-input" class="form-input" placeholder="Enter your full name">
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

          <button id="proceed-donate-btn" class="btn btn-primary" style="width: 100%;">
            <i class="bi bi-qr-code-scan"></i> PROCEED TO SCAN QR CODE
          </button>
        </div>

        <!-- Step 2: QR Code View -->
        <div id="donate-step-2" style="display: none;" class="qr-modal-container">
          <div class="text-center" style="margin-bottom: 0.5rem;">
            <span class="mission-tag">SIDRA FOUNDATION</span>
            <h3 style="color: var(--dark-green); font-size: 1.5rem; margin-top: 0.25rem;">Scan QR to Complete Donation</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem;" id="qr-amount-display">Amount: ₹1,000</p>
          </div>

          <div class="qr-image-card">
            <img src="images/donate_qr.jpg" alt="SIDRA Foundation UPI QR Code">
            <div class="qr-badge"><i class="bi bi-shield-check"></i> HDFC Verified UPI QR</div>
          </div>

          <div class="upi-id-box">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">UPI ID (VPA)</div>
              <div class="upi-id-code">${upiId}</div>
            </div>
            <button class="btn-copy-upi" id="copy-upi-btn" title="Copy UPI ID">
              <i class="bi bi-copy"></i> Copy
            </button>
          </div>

          <div class="upi-action-btns">
            <a id="direct-upi-link" href="upi://pay?pa=${upiId}&pn=SIDRA%20FOUNDATION&cu=INR" class="btn-upi-app">
              <i class="bi bi-wallet2"></i> Pay via GPay / PhonePe / Paytm
            </a>
            <a id="whatsapp-tax-link" href="https://wa.me/917624852616?text=Hello%20SIDRA%20Foundation,%20I%20have%20sent%20a%20donation.%20Please%20find%20my%20details." target="_blank" class="btn-whatsapp-tax">
              <i class="bi bi-whatsapp"></i> Send Receipt for 80G Tax Exemption
            </a>
          </div>

          <div style="margin-top: 1rem;">
            <button id="back-to-step-1" class="btn btn-outline" style="font-size: 0.85rem; padding: 0.4rem 1rem;">
              <i class="bi bi-arrow-left"></i> Change Details / Cause
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.modal-close');
    const amountBtns = modal.querySelectorAll('.amount-btn');
    const donorNameInput = modal.querySelector('#donor-name-input');
    const customInput = modal.querySelector('#custom-amount');
    const causeSelect = modal.querySelector('#donation-cause');
    const proceedBtn = modal.querySelector('#proceed-donate-btn');
    const backBtn = modal.querySelector('#back-to-step-1');
    const copyBtn = modal.querySelector('#copy-upi-btn');

    const step1 = modal.querySelector('#donate-step-1');
    const step2 = modal.querySelector('#donate-step-2');
    const qrAmountDisplay = modal.querySelector('#qr-amount-display');
    const directUpiLink = modal.querySelector('#direct-upi-link');
    const whatsappTaxLink = modal.querySelector('#whatsapp-tax-link');

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

    function showQRStep(amount, donorName) {
      const amt = amount || customInput.value || 1000;
      const name = (donorName !== undefined && donorName !== '') ? donorName : (donorNameInput ? donorNameInput.value.trim() : '');
      const cause = causeSelect ? causeSelect.value : 'General Education';

      if (name) {
        if (donorNameInput) donorNameInput.value = name;
        qrAmountDisplay.innerHTML = `<span style="color: var(--dark-green); font-weight:700;">Donor: ${name}</span> &nbsp;|&nbsp; Amount: ₹${Number(amt).toLocaleString('en-IN')}`;
      } else {
        qrAmountDisplay.textContent = `Selected Donation Amount: ₹${Number(amt).toLocaleString('en-IN')}`;
      }

      directUpiLink.href = `upi://pay?pa=${upiId}&pn=SIDRA%20FOUNDATION&cu=INR&am=${amt}`;

      const waMsg = encodeURIComponent(
        `Hello SIDRA Foundation, I have completed a donation of ₹${amt}` +
        (name ? ` under the name "${name}"` : '') +
        ` for ${cause}. Please find my payment details attached for 80G tax receipt.`
      );
      if (whatsappTaxLink) {
        whatsappTaxLink.href = `https://wa.me/917624852616?text=${waMsg}`;
      }

      step1.style.display = 'none';
      step2.style.display = 'block';
    }

    proceedBtn.addEventListener('click', () => {
      showQRStep();
    });

    backBtn.addEventListener('click', () => {
      step2.style.display = 'none';
      step1.style.display = 'block';
    });

    copyBtn.addEventListener('click', () => {
      copyTextToClipboard(upiId);
      copyBtn.innerHTML = '<i class="bi bi-check2"></i> Copied!';
      showToast('UPI ID copied to clipboard!', 'success');
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="bi bi-copy"></i> Copy';
      }, 2500);
    });

    // Make modal opener globally accessible
    window.openDonateQRModal = function(amount, directToQR = false, donorName = '') {
      if (amount) customInput.value = amount;
      if (donorName && donorNameInput) donorNameInput.value = donorName;
      if (directToQR) {
        showQRStep(amount, donorName);
      } else {
        step2.style.display = 'none';
        step1.style.display = 'block';
      }
      modal.classList.add('active');
    };
  }

  donateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openDonateQRModal) {
        window.openDonateQRModal();
      } else if (modal) {
        modal.classList.add('active');
      }
    });
  });
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } catch (err) {}
  document.body.removeChild(textarea);
  return Promise.resolve();
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

/* --- 12. Hero Background Slideshow & Interactive Slider --- */
function initHeroSlider() {
  const bgSlides = document.querySelectorAll('.hero-bg-slide');
  const frameImages = document.querySelectorAll('.hero-slide-img');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-slider-controls .prev-btn');
  const nextBtn = document.querySelector('.hero-slider-controls .next-btn');

  if (bgSlides.length === 0 && frameImages.length === 0) return;

  let currentIndex = 0;
  const totalSlides = Math.max(bgSlides.length, frameImages.length);
  let autoSlideTimer = null;

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;

    bgSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    frameImages.forEach((img, i) => {
      img.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startAutoSlide();
    });
  });

  startAutoSlide();
}

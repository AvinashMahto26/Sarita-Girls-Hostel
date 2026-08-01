document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Scroll Shadow
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 3. Highlight Active Nav Link based on URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((i) => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Photo Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach((item) => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Interactive Modal Popup for Schedule a Visit / Book a Room
  const modalOverlay = document.getElementById('visitModal');
  const modalClose = document.getElementById('closeModalBtn');
  const openModalBtns = document.querySelectorAll('.open-visit-modal');

  const openModal = (roomType = '') => {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // If specific room selected, select it in modal form
    const roomSelect = document.getElementById('modalRoomSelect');
    if (roomSelect && roomType) {
      roomSelect.value = roomType;
    }
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomType = btn.getAttribute('data-room') || '';
      openModal(roomType);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // 7. Toast Notification Handler
  const showToast = (message) => {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }
  };

  // 8. Handle Forms (Modal Form & Contact Page Form) -> Redirect to WhatsApp with entered data
  const visitForm = document.getElementById('visitForm');
  const contactForm = document.getElementById('contactForm');

  if (visitForm) {
    visitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value || '';
      const phone = document.getElementById('modalPhone')?.value || '';
      const date = document.getElementById('modalDate')?.value || '';
      const room = document.getElementById('modalRoomSelect')?.value || '';
      const message = document.getElementById('modalMsg')?.value || '';

      let waText = `*Campus Visit / Room Booking Request*\n\n`;
      waText += `*Name:* ${name}\n`;
      waText += `*Phone:* ${phone}\n`;
      if (date) waText += `*Preferred Date:* ${date}\n`;
      if (room) waText += `*Room Preference:* ${room}\n`;
      if (message) waText += `*Message:* ${message}`;

      const waUrl = `https://wa.me/919122302588?text=${encodeURIComponent(waText)}`;
      closeModal();
      showToast("Redirecting your booking details to WhatsApp...");
      setTimeout(() => {
        window.open(waUrl, '_blank');
        visitForm.reset();
      }, 800);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const room = document.getElementById('contactRoom')?.value || '';
      const purpose = document.getElementById('contactPurpose')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';

      let waText = `*New Inquiry - Sarita Girls Hostel*\n\n`;
      waText += `*Name:* ${name}\n`;
      waText += `*Phone:* ${phone}\n`;
      if (email) waText += `*Email:* ${email}\n`;
      if (room) waText += `*Room Preference:* ${room}\n`;
      if (purpose) waText += `*Purpose:* ${purpose}\n`;
      if (message) waText += `*Message:* ${message}`;

      const waUrl = `https://wa.me/919122302588?text=${encodeURIComponent(waText)}`;
      showToast("Redirecting your inquiry details to WhatsApp...");
      setTimeout(() => {
        window.open(waUrl, '_blank');
        contactForm.reset();
      }, 800);
    });
  }

  const homeQuickForm = document.getElementById('homeQuickForm');
  if (homeQuickForm) {
    homeQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('homeQuickName')?.value || '';
      const phone = document.getElementById('homeQuickPhone')?.value || '';
      const room = document.getElementById('homeQuickRoom')?.value || '';
      const message = document.getElementById('homeQuickMessage')?.value || '';

      let waText = `*Quick Inquiry - Home Page (Sarita Girls Hostel)*\n\n`;
      waText += `*Name:* ${name}\n`;
      waText += `*Phone:* ${phone}\n`;
      if (room) waText += `*Interested In:* ${room}\n`;
      if (message) waText += `*Message:* ${message}`;

      const waUrl = `https://wa.me/919122302588?text=${encodeURIComponent(waText)}`;
      showToast("Redirecting your quick inquiry to WhatsApp...");
      setTimeout(() => {
        window.open(waUrl, '_blank');
        homeQuickForm.reset();
      }, 800);
    });
  }

  // 9. Quick Search / Check Availability Bar on Hero Section
  const checkAvailBtn = document.getElementById('checkAvailBtn');
  if (checkAvailBtn) {
    checkAvailBtn.addEventListener('click', () => {
      const roomType = document.getElementById('searchRoomType')?.value || 'Any';
      const stayDuration = document.getElementById('searchDuration')?.value || 'Long-term';
      showToast(`Checking live availability for ${roomType} (${stayDuration})... Good news! Limited beds available in Saket Vihar, Kadru!`);
      setTimeout(() => {
        openModal(roomType);
      }, 1200);
    });
  }

  // 10. Lightbox Gallery Viewer Handler
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = (imgSrc) => {
    if (lightboxModal && lightboxImage) {
      lightboxImage.src = imgSrc;
      lightboxModal.classList.add('active');
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      setTimeout(() => {
        if (lightboxImage) lightboxImage.src = '';
      }, 300);
    }
  };

  document.querySelectorAll('.gallery-item img').forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openLightbox(img.src);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
});


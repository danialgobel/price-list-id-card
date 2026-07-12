/* ===================================================
   TANABREW – script.js
   Lightbox / tap-to-zoom functionality
   =================================================== */

(function () {
  'use strict';

  const lightbox        = document.getElementById('lightbox');
  const openBtn         = document.getElementById('openLightbox');
  const closeBtn        = document.getElementById('closeLightbox');
  const backdrop        = document.getElementById('lightboxBackdrop');

  /** Open lightbox */
  function openLightbox() {
    lightbox.hidden = false;
    lightbox.classList.remove('closing');
    document.body.style.overflow = 'hidden'; // prevent background scroll
    closeBtn.focus();
  }

  /** Close lightbox with exit animation */
  function closeLightbox() {
    lightbox.classList.add('closing');
    // Wait for animation to finish, then hide
    lightbox.addEventListener('animationend', function handler() {
      lightbox.hidden = true;
      lightbox.classList.remove('closing');
      document.body.style.overflow = '';
      lightbox.removeEventListener('animationend', handler);
    }, { once: true });

    // Fallback in case animationend doesn't fire
    setTimeout(function () {
      if (!lightbox.hidden) {
        lightbox.hidden = true;
        lightbox.classList.remove('closing');
        document.body.style.overflow = '';
      }
    }, 350);
  }

  /** Event listeners */
  openBtn.addEventListener('click', openLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  /** Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /** Prevent image drag-open issues on mobile */
  document.getElementById('lightboxImg').addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

})();

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion;
  const hasGsap = typeof window.gsap !== "undefined";

  // A missing CDN should never make the page unusable: CSS provides the visual base state.
  const animate = (target, vars) => hasGsap ? gsap.to(target, vars) : null;

  function initLenis() {
    if (prefersReducedMotion || typeof window.Lenis === "undefined") return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    if (hasGsap && typeof window.ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  function initNavigation() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function initIntro() {
    document.documentElement.classList.add("js-ready");
    if (!hasGsap || prefersReducedMotion) {
      document.querySelectorAll(".js-ready .reveal-item, .js-ready .reveal-block, .js-ready .reveal-row, .js-ready .image-reveal").forEach((item) => {
        item.style.opacity = "1";
      });
      document.querySelectorAll(".hero-title span").forEach((line) => { line.style.transform = "none"; });
      const backdrop = document.querySelector(".hero-backdrop");
      if (backdrop) backdrop.style.clipPath = "inset(0)";
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.to(".hero-backdrop", { clipPath: "inset(0)", duration: 1.15, ease: "expo.out" }, 0.1)
      .fromTo(".site-header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: .65 }, .18)
      .to(".hero-title span", { y: 0, duration: .95, stagger: .09, ease: "power4.out" }, .45)
      .to(".hero-grid .reveal-item", { y: 0, opacity: 1, duration: .65, stagger: .07 }, .72);
  }

  function initHeroMotion() {
    if (!finePointer || !hasGsap) return;
    const hero = document.querySelector(".hero");
    const backdrop = document.querySelector("[data-hero-backdrop] img");
    const title = document.querySelector(".hero-title");
    if (!hero || !backdrop || !title) return;
    const moveImageX = gsap.quickTo(backdrop, "x", { duration: .8, ease: "power3.out" });
    const moveImageY = gsap.quickTo(backdrop, "y", { duration: .8, ease: "power3.out" });
    const moveTitleX = gsap.quickTo(title, "x", { duration: 1.05, ease: "power3.out" });
    const moveTitleY = gsap.quickTo(title, "y", { duration: 1.05, ease: "power3.out" });
    hero.addEventListener("mousemove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      moveImageX(x * 18);
      moveImageY(y * 12);
      moveTitleX(x * -8);
      moveTitleY(y * -5);
    });
    hero.addEventListener("mouseleave", () => {
      moveImageX(0); moveImageY(0); moveTitleX(0); moveTitleY(0);
    });
  }

  function initMagneticButtons() {
    if (!finePointer || !hasGsap) return;
    document.querySelectorAll(".magnetic").forEach((button) => {
      const moveX = gsap.quickTo(button, "x", { duration: .45, ease: "power3.out" });
      const moveY = gsap.quickTo(button, "y", { duration: .45, ease: "power3.out" });
      button.addEventListener("mousemove", (event) => {
        const bounds = button.getBoundingClientRect();
        moveX((event.clientX - (bounds.left + bounds.width / 2)) * .18);
        moveY((event.clientY - (bounds.top + bounds.height / 2)) * .18);
      });
      button.addEventListener("mouseleave", () => { moveX(0); moveY(0); });
    });
  }

  function initScrollAnimations() {
    if (!hasGsap || prefersReducedMotion || typeof window.ScrollTrigger === "undefined") {
      document.querySelectorAll(".reveal-block, .reveal-row, .image-reveal").forEach((item) => { item.style.opacity = "1"; });
      return;
    }
    gsap.utils.toArray(".reveal-block").forEach((block) => {
      gsap.fromTo(block, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: block, start: "top 82%", once: true } });
    });
    gsap.utils.toArray(".reveal-row").forEach((row, index) => {
      gsap.fromTo(row, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .7, delay: index * .04, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 91%", once: true } });
    });
    gsap.utils.toArray(".image-reveal").forEach((image, index) => {
      gsap.fromTo(image, { clipPath: index % 2 ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)" }, { clipPath: "inset(0)", duration: 1.05, ease: "power3.inOut", scrollTrigger: { trigger: image, start: "top 84%", once: true } });
    });
    gsap.utils.toArray(".section-intro").forEach((intro) => {
      gsap.fromTo(intro.querySelectorAll(".section-index, .eyebrow, .section-aside"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: intro, start: "top 84%", once: true } });
    });
  }

  function initParallax() {
    if (!hasGsap || prefersReducedMotion || typeof window.ScrollTrigger === "undefined") return;
    gsap.utils.toArray(".parallax-frame img").forEach((image) => {
      gsap.fromTo(image, { yPercent: -6 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: image.closest(".parallax-frame"), start: "top bottom", end: "bottom top", scrub: 1.2 } });
    });
  }

  function initGallery() {
    if (!finePointer || !hasGsap) return;
    document.querySelectorAll("[data-gallery-item]").forEach((item) => {
      const image = item.querySelector("img");
      const imageX = gsap.quickTo(image, "x", { duration: .8, ease: "power3.out" });
      const imageY = gsap.quickTo(image, "y", { duration: .8, ease: "power3.out" });
      item.addEventListener("mousemove", (event) => {
        const bounds = item.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        imageX((x / bounds.width - .5) * 5);
        imageY((y / bounds.height - .5) * 5);
      });
      item.addEventListener("mouseleave", () => { imageX(0); imageY(0); });
    });
  }

  function initMarquee() {
    const track = document.querySelector(".marquee-track");
    const group = track?.querySelector(".marquee-group");
    const secondGroup = track?.querySelectorAll(".marquee-group")[1];
    if (!track || !group || !secondGroup || prefersReducedMotion || !hasGsap) return;

    let marqueeTween;
    let resizeTimer;
    const repeatedSequence = group.innerHTML;

    const ensureCoverage = () => {
      while (group.getBoundingClientRect().width < window.innerWidth) {
        group.insertAdjacentHTML("beforeend", repeatedSequence);
      }
      // Keep the two groups byte-for-byte identical after any coverage extension.
      secondGroup.innerHTML = group.innerHTML;
    };

    const startMarquee = () => {
      ensureCoverage();
      const groupWidth = group.getBoundingClientRect().width;
      if (!groupWidth) return;
      if (marqueeTween) marqueeTween.kill();
      gsap.set(track, { x: 0 });

      // Move exactly one measured group. The modifier keeps the transform inside
      // that distance, so the second identical group replaces it without a reset gap.
      marqueeTween = gsap.to(track, {
        x: -groupWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (value) => `${parseFloat(value) % groupWidth}px`
        }
      });
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(startMarquee, 120);
    };

    startMarquee();
    window.addEventListener("resize", scheduleResize, { passive: true });
    if (typeof window.ResizeObserver !== "undefined") {
      new ResizeObserver(scheduleResize).observe(group);
    }
  }

  function initBookingModal() {
    const modal = document.querySelector("[data-booking-modal]");
    const panel = modal?.querySelector(".booking-panel");
    const form = modal?.querySelector("[data-booking-form]");
    const success = modal?.querySelector(".booking-success");
    if (!modal || !panel || !form || !success) return;
    const submitButton = form.querySelector(".button-submit");
    const submitLabel = form.querySelector(".submit-label");
    const successTitle = success.querySelector("#booking-confirmed-title");
    const successMark = success.querySelector(".success-mark");
    const requiredFields = [...form.querySelectorAll("input[required], select[required]")];
    let lastFocusedElement = null;
    let processingTimer = null;
    let isProcessing = false;

    const setFieldError = (field, message = "") => {
      const wrapper = field.closest(".form-field");
      const error = wrapper?.querySelector(".form-error");
      if (!wrapper || !error) return;
      wrapper.classList.toggle("has-error", Boolean(message));
      field.setAttribute("aria-invalid", String(Boolean(message)));
      error.textContent = message;
    };

    const validateField = (field) => {
      let message = "";
      if (!field.value.trim()) message = "Please fill out this field.";
      else if (field.type === "email" && !field.validity.valid) message = "Please enter a valid email.";
      setFieldError(field, message);
      return !message;
    };

    const clearFieldErrors = () => requiredFields.forEach((field) => setFieldError(field));

    const resetState = () => {
      if (processingTimer) window.clearTimeout(processingTimer);
      processingTimer = null;
      isProcessing = false;
      form.reset();
      clearFieldErrors();
      form.hidden = false;
      success.hidden = true;
      submitButton.disabled = false;
      submitButton.classList.remove("is-loading");
      submitButton.removeAttribute("aria-busy");
      submitLabel.textContent = "Book a cut";
      form.style.opacity = "";
      form.style.transform = "";
      success.style.opacity = "";
      success.style.transform = "";
    };

    const showFormAgain = () => {
      resetState();
      if (hasGsap && !prefersReducedMotion) {
        gsap.fromTo(form, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .45, ease: "power3.out" });
      }
      window.setTimeout(() => modal.querySelector("#name")?.focus(), prefersReducedMotion ? 0 : 300);
    };

    const showSuccess = () => {
      form.hidden = true;
      success.hidden = false;
      const focusSuccess = () => successTitle?.focus();
      if (hasGsap && !prefersReducedMotion) {
        gsap.fromTo(success, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .55, ease: "power3.out", onComplete: focusSuccess });
        if (successMark) gsap.fromTo(successMark, { opacity: 0, scale: .7 }, { opacity: 1, scale: 1, duration: .45, delay: .12, ease: "back.out(1.7)" });
      } else {
        success.style.opacity = "1";
        focusSuccess();
      }
    };

    const open = () => {
      lastFocusedElement = document.activeElement;
      resetState();
      modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open");
      if (hasGsap && !prefersReducedMotion) {
        gsap.to(modal.querySelector(".modal-backdrop"), { opacity: 1, duration: .35, ease: "power2.out" });
        gsap.to(panel, { x: 0, duration: .7, ease: "expo.out" });
      } else { panel.style.transform = "translateX(0)"; modal.querySelector(".modal-backdrop").style.opacity = "1"; }
      window.setTimeout(() => modal.querySelector("#name")?.focus(), prefersReducedMotion ? 0 : 450);
    };
    const close = () => {
      if (!modal.classList.contains("is-open")) return;
      if (processingTimer) window.clearTimeout(processingTimer);
      processingTimer = null;
      isProcessing = false;
      const finish = () => {
        resetState();
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        lastFocusedElement?.focus();
      };
      if (hasGsap && !prefersReducedMotion) {
        const timeline = gsap.timeline({ onComplete: finish });
        timeline.to(panel, { x: "100%", duration: .55, ease: "power3.in" }).to(modal.querySelector(".modal-backdrop"), { opacity: 0, duration: .3 }, "-=.3");
      } else { panel.style.transform = "translateX(100%)"; modal.querySelector(".modal-backdrop").style.opacity = "0"; finish(); }
    };
    document.querySelectorAll("[data-open-booking]").forEach((trigger) => trigger.addEventListener("click", (event) => { event.preventDefault(); open(); }));
    modal.querySelectorAll("[data-close-booking]").forEach((trigger) => trigger.addEventListener("click", close));
    modal.querySelector("[data-book-another]")?.addEventListener("click", showFormAgain);
    requiredFields.forEach((field) => {
      field.addEventListener("input", () => { if (field.closest(".form-field")?.classList.contains("has-error")) validateField(field); });
      field.addEventListener("change", () => { if (field.closest(".form-field")?.classList.contains("has-error")) validateField(field); });
    });
    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) return;
      if (event.key === "Escape") { close(); return; }
      if (event.key !== "Tab") return;
      const focusable = [...panel.querySelectorAll("button:not([disabled]), input, select, textarea, a[href]")].filter((element) => !element.hidden && element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isProcessing) return;
      const formIsValid = requiredFields.map(validateField).every(Boolean);
      if (!formIsValid) {
        requiredFields.find((field) => field.closest(".form-field")?.classList.contains("has-error"))?.focus();
        return;
      }
      isProcessing = true;
      submitButton.disabled = true;
      submitButton.classList.add("is-loading");
      submitButton.setAttribute("aria-busy", "true");
      submitLabel.textContent = "Booking...";
      processingTimer = window.setTimeout(() => {
        processingTimer = null;
        showSuccess();
      }, prefersReducedMotion ? 0 : 450);
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;
    const links = menu.querySelectorAll("a, button");
    menu.inert = true;
    const setOpen = (open) => {
      toggle.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open)); toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu"); menu.setAttribute("aria-hidden", String(!open));
      menu.classList.toggle("is-open", open);
      menu.inert = !open;
      if (hasGsap && !prefersReducedMotion) {
        if (open) { gsap.to(menu, { clipPath: "inset(0)", duration: .65, ease: "expo.out" }); gsap.fromTo(links, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: .55, stagger: .06, delay: .12, ease: "power3.out" }); }
        else gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: .5, ease: "power3.in" });
      } else menu.style.clipPath = open ? "inset(0)" : "inset(0 0 100% 0)";
    };
    toggle.addEventListener("click", () => setOpen(!toggle.classList.contains("is-open")));
    links.forEach((link) => link.addEventListener("click", () => { if (toggle.classList.contains("is-open")) setOpen(false); }));
  }

  function init() {
    initLenis();
    initNavigation();
    initIntro();
    initHeroMotion();
    initMagneticButtons();
    initScrollAnimations();
    initParallax();
    initGallery();
    initMarquee();
    initBookingModal();
    initMobileMenu();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const drawer = document.getElementById("drawer-nav");
  const toggle = document.querySelector(".site-header__toggle");
  const drawerLinks = drawer ? drawer.querySelectorAll("a[href]") : [];
  const body = document.body;

  /* =========================
     Header Scroll Behavior
     ========================= */
  function updateHeaderOnScroll() {
    const threshold = 40;
    if (window.scrollY > threshold) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);

  /* =========================
     Drawer Toggle
     ========================= */
  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    header.classList.add("is-open");
    body.classList.add("is-drawer-open");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    header.classList.remove("is-open");
    body.classList.remove("is-drawer-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function toggleDrawer() {
    if (!drawer) return;
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      toggleDrawer();
    });
  }

  // ドロワー内リンククリックでクローズ
  drawerLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeDrawer();
    });
  });

  // ESCキーでドロワーを閉じる
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeDrawer();
    }
  });

  /* =========================
     Smooth Scroll for same-page anchors
     ========================= */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.top + window.pageYOffset - headerHeight + 1;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    });
  });

  /* =========================
     Scroll Reveal（IntersectionObserver）
     ========================= */
  if ("IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(".section");

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px", // 下側少し早めに発火
      threshold: 0.2,
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealTargets.forEach((sec) => {
      // ヒーローはCSSのロード時アニメに任せる
      if (sec.id === "hero") return;
      sec.classList.add("reveal-section");
      revealObserver.observe(sec);
    });
  }
});

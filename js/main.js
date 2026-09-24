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

  /* =========================
     アーカイブ絞り込み（キーワード + セレクト）
     ========================= */
  const archiveList = document.querySelector("[data-archive-list]");
  if (archiveList) {
    const cards = Array.prototype.slice.call(archiveList.querySelectorAll("[data-text]"));
    const keyword = document.querySelector("[data-archive-keyword]");
    const selects = Array.prototype.slice.call(document.querySelectorAll("[data-archive-filter]"));
    const countTarget = document.querySelector("[data-archive-count]");
    const emptyMessage = document.querySelector("[data-archive-empty]");

    function normalize(value) {
      return (value || "").toLowerCase().trim();
    }

    function applyFilter() {
      const terms = normalize(keyword ? keyword.value : "").split(/\s+/).filter(Boolean);
      let shown = 0;

      cards.forEach(function (card) {
        const text = normalize(card.dataset.text);
        const matchText = terms.every(function (term) {
          return text.indexOf(term) !== -1;
        });
        const matchSelect = selects.every(function (select) {
          return !select.value || card.dataset[select.dataset.archiveFilter] === select.value;
        });
        const show = matchText && matchSelect;
        card.hidden = !show;
        if (show) shown += 1;
      });

      if (countTarget) countTarget.textContent = shown;
      if (emptyMessage) emptyMessage.hidden = shown !== 0;
    }

    if (keyword) keyword.addEventListener("input", applyFilter);
    selects.forEach(function (select) {
      select.addEventListener("change", applyFilter);
    });
    applyFilter();
  }
});

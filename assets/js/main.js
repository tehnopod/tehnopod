// Dropdown + mobile menu + hero slideshow

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Dropdowns (desktop)
  ========================== */
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));

  const closeAllDropdowns = () => {
    dropdowns.forEach(d => d.classList.remove("open"));
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    if (!button) return;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      // close others
      dropdowns.forEach((other) => {
        if (other !== dropdown) other.classList.remove("open");
      });

      dropdown.classList.toggle("open");
    });

    // keep click inside panel from closing immediately
    const panel = dropdown.querySelector(".dropdown-panel");
    if (panel) {
      panel.addEventListener("click", (e) => e.stopPropagation());
    }
  });

  // click outside closes all dropdowns
  document.addEventListener("click", closeAllDropdowns);

  // ESC closes dropdowns + mobile
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      if (mobile) mobile.classList.remove("show");
    }
  });

  /* =========================
     Mobile menu
  ========================== */
  const burger = document.querySelector("[data-burger]");
  const mobile = document.querySelector("[data-mobile]");

  if (burger && mobile) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobile.classList.toggle("show");
      closeAllDropdowns();
    });

    // click outside closes mobile
    document.addEventListener("click", () => {
      mobile.classList.remove("show");
    });

    // clicking inside mobile shouldn't close it
    mobile.addEventListener("click", (e) => e.stopPropagation());
  }

  /* =========================
     HERO slideshow (background)
     Changes hero1.jpg -> hero2.jpg -> hero3.jpg
  ========================== */
  const hero = document.querySelector(".hero1");
  if (hero) {
    const images = [
      "assets/img/hero1.jpg",
      "assets/img/hero2.jpg",
      "assets/img/hero3.jpg"
    ];

    // Preload images so they swap smoothly
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Respect "reduce motion" setting
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      let i = 0;

      // set initial (in case CSS path is wrong)
      hero.style.backgroundImage = `url("${images[i]}")`;

      const intervalMs = 12000; // 12 seconds (change to 10000 or 15000 if you want)

      setInterval(() => {
        i = (i + 1) % images.length;
        hero.style.backgroundImage = `url("${images[i]}")`;
      }, intervalMs);
    }
  }
});

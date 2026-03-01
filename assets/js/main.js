// Dropdown + mobile menu + hero crossfade slider
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     Dropdowns
  ========================== */
  const dropdowns = Array.from(document.querySelectorAll(".dropdown"));

  const closeAllDropdowns = () => {
    dropdowns.forEach(d => d.classList.remove("open"));
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const panel = dropdown.querySelector(".dropdown-panel");

    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        dropdowns.forEach((other) => {
          if (other !== dropdown) other.classList.remove("open");
        });

        dropdown.classList.toggle("open");
      });
    }

    if (panel) panel.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", closeAllDropdowns);

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

    mobile.addEventListener("click", (e) => e.stopPropagation());

    document.addEventListener("click", () => {
      mobile.classList.remove("show");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDropdowns();
      if (mobile) mobile.classList.remove("show");
    }
  });

  /* =========================
     HERO CROSSFADE SLIDER
  ========================== */
  const hero = document.querySelector(".hero1");
  if (!hero) return;

  const layers = hero.querySelectorAll(".hero-bg");
  if (layers.length < 2) return;

  const images = [
    "assets/img/hero1.jpg",
    "assets/img/hero2.jpg",
    "assets/img/hero3.jpg"
  ];

  // Preload for smooth crossfade
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    // Just show the first image, no animation
    layers[0].style.backgroundImage = `url("${images[0]}")`;
    layers[0].classList.add("is-active");
    return;
  }

  let currentIndex = 0;
  let activeLayer = 0; // 0 or 1

  // Set initial
  layers[0].style.backgroundImage = `url("${images[0]}")`;
  layers[0].classList.add("is-active");
  layers[1].classList.remove("is-active");

  const intervalMs = 12000; // 10–15 sec => use 10000 or 15000 if you prefer

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const nextLayer = activeLayer === 0 ? 1 : 0;

    // Put next image on the hidden layer
    layers[nextLayer].style.backgroundImage = `url("${images[nextIndex]}")`;

    // Crossfade
    layers[nextLayer].classList.add("is-active");
    layers[activeLayer].classList.remove("is-active");

    // Update state
    activeLayer = nextLayer;
    currentIndex = nextIndex;
  }, intervalMs);
});

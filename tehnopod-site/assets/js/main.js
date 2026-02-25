// Dropdown + mobile menu script

document.addEventListener("DOMContentLoaded", function () {

  // Dropdown functionality
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    const button = dropdown.querySelector("button");

    if (button) {
      button.addEventListener("click", function (e) {
        e.stopPropagation();

        dropdowns.forEach(function (other) {
          if (other !== dropdown) {
            other.classList.remove("open");
          }
        });

        dropdown.classList.toggle("open");
      });
    }
  });

  document.addEventListener("click", function () {
    dropdowns.forEach(function (dropdown) {
      dropdown.classList.remove("open");
    });
  });

  // Mobile menu
  const burger = document.querySelector("[data-burger]");
  const mobile = document.querySelector("[data-mobile]");

  if (burger && mobile) {
    burger.addEventListener("click", function () {
      mobile.classList.toggle("show");
    });
  }

});
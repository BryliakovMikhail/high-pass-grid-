const burger = document.querySelector(".burger");
const nav = document.querySelector("#burger-list");
const navLinks = document.querySelectorAll(".burger-link");

burger.addEventListener("click", () => {
  burger.classList.toggle("burger--active");
  nav.classList.toggle("nav__list--active");

  nav.style.transition =
    "visibility 0.2s ease-in-out, transform 0.2s ease-in-out";

  document.body.classList.toggle("stop-scroll");
});

nav.addEventListener("transitionend", () => {
  if (!nav.classList.contains("nav__list--active")) {
    nav.removeAttribute("style");
  }
});

navLinks.forEach(function (el) {
  el.addEventListener("click", () => {
    burger.classList.remove("burger--active");
    nav.classList.remove("nav__list--active");
    document.body.classList.remove("stop-scroll");
  });
});

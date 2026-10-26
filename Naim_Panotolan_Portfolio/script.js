// Portfolio Landing Page JavaScript

const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");
const siteHeader = document.getElementById("siteHeader");
const navLinks = document.querySelectorAll(".nav-link");
const sideLinks = document.querySelectorAll(".side-link");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.getElementById("currentYear");

function openMenu() {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
  body.classList.add("menu-open");
  sideMenu.setAttribute("aria-hidden", "false");
}

function closeSideMenu() {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
  body.classList.remove("menu-open");
  sideMenu.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", openMenu);
closeMenu.addEventListener("click", closeSideMenu);
overlay.addEventListener("click", closeSideMenu);

sideLinks.forEach((link) => {
  link.addEventListener("click", closeSideMenu);
});

// Header shadow on scroll
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
});

// Active navigation link on scroll
function updateActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Reveal animation on scroll
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Current year
currentYear.textContent = new Date().getFullYear();

// Close menu with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSideMenu();
  }
});

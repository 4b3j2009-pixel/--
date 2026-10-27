"use strict";

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id], main header[id]");
const yearLabel = document.querySelector("[data-current-year]");

if (yearLabel) {
  yearLabel.textContent = String(new Date().getFullYear());
}

function closeMenu() {
  if (!navToggle || !navMenu) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "開啟導覽選單");
  navMenu.classList.remove("is-open");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navToggle.setAttribute("aria-label", isExpanded ? "開啟導覽選單" : "關閉導覽選單");
    navMenu.classList.toggle("is-open", !isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        activeLink?.setAttribute("aria-current", "page");
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => activeSectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".section-heading, .about-grid, .project-card, .timeline-item, .experience-card, .feature-card, .contact-panel")
    .forEach((element) => {
      element.setAttribute("data-reveal", "");
      revealObserver.observe(element);
    });
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    element.classList.add("is-visible");
  });
}
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...nav.querySelectorAll("a")];
const mobileLayout = window.matchMedia("(max-width: 640px)");

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.hidden = false;
menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") === "false");
});

nav.addEventListener("click", (event) => {
  if (mobileLayout.matches && event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

mobileLayout.addEventListener("change", () => setMenuOpen(false));

const sections = navLinks.map((link) => document.querySelector(link.hash));
const header = document.querySelector(".site-header");
const root = document.documentElement;
let navFrame = 0;

function syncCurrentSection() {
  navFrame = 0;
  const readingLine = header.offsetHeight + Math.min(window.innerHeight * 0.22, 160);
  let currentSection = sections[0];

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) {
      currentSection = section;
    }
  }

  const remainingScroll = root.scrollHeight - window.innerHeight - window.scrollY;
  if (remainingScroll <= 2) {
    // Near the end of the page, an anchor may stop below the sticky header.
    const linkedSection = sections.find((section) => `#${section.id}` === window.location.hash);
    if (linkedSection && linkedSection.getBoundingClientRect().top >= header.offsetHeight) {
      currentSection = linkedSection;
    } else if (window.scrollY > 0) {
      currentSection = sections.at(-1);
    }
  }

  for (const link of navLinks) {
    if (link.hash === `#${currentSection.id}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  }
}

function scheduleSectionSync() {
  if (!navFrame) {
    navFrame = requestAnimationFrame(syncCurrentSection);
  }
}

window.addEventListener("scroll", scheduleSectionSync, { passive: true });
window.addEventListener("resize", scheduleSectionSync);
window.addEventListener("hashchange", scheduleSectionSync);
scheduleSectionSync();

const filters = document.querySelector(".filters");
const filterButtons = [...filters.querySelectorAll("button")];
const projectGrid = document.querySelector("#project-grid");
const projects = [...projectGrid.querySelectorAll(".project-card")];
const filterResult = document.querySelector("#filter-result");

filters.hidden = false;

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button || button.getAttribute("aria-pressed") === "true") {
    return;
  }

  const selectedFilter = button.dataset.filter;
  for (const filterButton of filterButtons) {
    filterButton.setAttribute("aria-pressed", String(filterButton === button));
  }

  let visibleCount = 0;
  for (const project of projects) {
    const visible = selectedFilter === "all" || project.dataset.status === selectedFilter;
    project.hidden = !visible;
    visibleCount += Number(visible);
  }
  filterResult.textContent = `顯示 ${visibleCount} 件作品`;
  scheduleSectionSync();
});

const data = window.profileData;


const profilePhoto = document.querySelector("#profile-photo");
const profilePhotoFallback = document.querySelector("#profile-photo-fallback");

if (profilePhoto && data.profile.image) {
  profilePhoto.alt = data.profile.imageAlt || data.profile.name;
  profilePhoto.addEventListener("load", () => {
    profilePhoto.classList.add("loaded");
    profilePhotoFallback.hidden = true;
  });
  profilePhoto.addEventListener("error", () => {
    profilePhoto.removeAttribute("src");
    profilePhoto.classList.remove("loaded");
    profilePhotoFallback.hidden = false;
  });
  profilePhoto.src = data.profile.image;
}

const skillsGrid = document.querySelector("#skills-grid");
skillsGrid.innerHTML = data.skills.map((group) => `
  <article class="skill-card reveal">
    <h3>${group.title}</h3>
    <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
  </article>
`).join("");

const projectGrid = document.querySelector("#project-grid");
projectGrid.innerHTML = data.projects.map((project) => `
  <article class="project-card reveal">
    <div class="project-meta"><span>${project.client}</span><span>${project.period}</span></div>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
  </article>
`).join("");

const contactLinks = document.querySelector("#contact-links");
contactLinks.innerHTML = data.contacts.map((contact) => contact.href ? `
  <a class="contact-link" href="${contact.href}"><span>${contact.label}</span><strong>${contact.value}</strong></a>
` : `<div class="contact-link"><span>${contact.label}</span><strong>${contact.value}</strong></div>`).join("");

document.querySelector("#year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.hidden = isOpen;
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (!data.contacts.length) contactLinks.textContent = 'Kontaktdaten folgen.';

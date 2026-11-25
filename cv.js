const { profile, projects, skills, contacts } = window.profileData;

const text = (selector, value) => {
  document.querySelector(selector).textContent = value;
};

text("#cv-name", profile.name);
text("#cv-title", profile.title);
text("#cv-summary", profile.summary);
text("#cv-degree", profile.education.degree);
text("#cv-thesis", profile.education.detail);

document.querySelector("#cv-focus").innerHTML = profile.focus.map((item) => `<span>${item}</span>`).join("");

const technologies = [...new Set(skills.slice(0, 3).flatMap((group) => group.items))].slice(0, 18);
document.querySelector("#cv-technologies").innerHTML = technologies.map((item) => `<span>${item}</span>`).join("");

const featured = projects.find((project) => project.featured) ?? projects[0];
document.querySelector("#featured-project").innerHTML = `
  <div class="project-heading">
    <div><strong>${featured.title}</strong><span>${featured.client}</span></div>
    <time>${featured.period}</time>
  </div>
  <p>${featured.description}</p>
  ${featured.responsibilities ? `<ul>${featured.responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
  <div class="inline-tags">${featured.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
`;

document.querySelector("#cv-projects").innerHTML = projects
  .filter((project) => project !== featured)
  .slice(0, 4)
  .map((project) => `
    <article>
      <div class="project-heading">
        <div><strong>${project.title}</strong><span>${project.client}</span></div>
        <time>${project.period}</time>
      </div>
      <p>${project.description}</p>
    </article>
  `).join("");

document.querySelector("#cv-contacts").innerHTML = contacts.map((contact) => `
  <div><span>${contact.label}</span><strong>${contact.value}</strong></div>
`).join("");

document.querySelector("#print-button").addEventListener("click", () => window.print());

const photo = document.querySelector('#cv-profile-photo');
photo.addEventListener('load', () => { photo.classList.add('loaded'); document.querySelector('#cv-photo-fallback').hidden = true; });
photo.src = profile.image;
if (!contacts.length) document.querySelector('#cv-contacts').textContent = 'Kontaktdaten folgen.';

document.querySelector("#cv-languages").innerHTML = profile.languages.map(item => `<div>${item}</div>`).join("");

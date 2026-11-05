const projectList = document.querySelector("#project-list");
const statusText = document.querySelector("#projects-status");
const searchInput = document.querySelector("#project-search");
const retryButton = document.querySelector("#projects-retry");
let projects = [];
function createProject({ name, description, html_url }) {
  const item = document.createElement("li");
  const article = document.createElement("article");
  article.className = "project-card";
  const body = document.createElement("div");
  body.className = "project-body";
  const heading = document.createElement("h2");
  heading.className = "project-title";
  heading.textContent = name;
  const text = document.createElement("p");
  text.className = "project-description";
  text.textContent = description || "Beskrivning saknas på GitHub.";
  const link = document.createElement("a");
  link.className = "project-link";
  link.href = html_url;
  link.textContent = "Visa på GitHub";
  link.setAttribute("aria-label", `Visa ${name} på GitHub`);
  body.append(heading, text, link);
  article.append(body);
  item.append(article);
  return item;
}
function renderProjects() {
  const search = searchInput.value.trim().toLowerCase();
  const visibleProjects = projects.filter(({ name, description }) => {
    return name.toLowerCase().includes(search) || (description ?? "").toLowerCase().includes(search);
  });
  projectList.replaceChildren();
  for (const project of visibleProjects) {
    projectList.append(createProject(project));
  }
  if (projects.length === 0) {
    statusText.textContent = "Inga publika projekt att visa just nu.";
  } else if (visibleProjects.length === 0) {
    statusText.textContent = "Inga projekt matchar din sökning.";
  } else {
    statusText.textContent = `Visar ${visibleProjects.length} av ${projects.length} projekt.`;
  }
}
async function loadProjects() {
  statusText.textContent = "Hämtar projekt från GitHub…";
  retryButton.hidden = true;
  retryButton.disabled = true;
  searchInput.disabled = true;
  projectList.replaceChildren();
  try {
    const response = await fetch("https://api.github.com/users/SamuelGoitomGezai/repos?sort=updated&per_page=100&type=owner");
    if (!response.ok) {
      throw new Error("GitHub projects could not be loaded");
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("GitHub did not return a project list");
    }
    projects = data;
    searchInput.disabled = projects.length === 0;
    renderProjects();
  } catch {
    projects = [];
    projectList.replaceChildren();
    searchInput.disabled = true;
    statusText.textContent = "Det gick inte att hämta projekten från GitHub. Kontrollera din anslutning eller försök igen om en stund.";
    retryButton.hidden = false;
  }
  retryButton.disabled = false;
}
searchInput.addEventListener("input", renderProjects);
retryButton.addEventListener("click", loadProjects);
loadProjects();

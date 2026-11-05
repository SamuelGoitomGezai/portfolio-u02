const workList = document.querySelector("#work-list");
const educationList = document.querySelector("#education-list");
const statusText = document.querySelector("#cv-status");
const retryButton = document.querySelector("#cv-retry");
function createCvItem({ title, organization, period }, type) {
  const item = document.createElement("li");
  item.className = `${type}-item`;
  const heading = document.createElement("h3");
  heading.className = `${type}-title`;
  heading.textContent = title;
  const details = document.createElement("div");
  details.className = `${type}-details`;
  const organizationText = document.createElement("p");
  organizationText.textContent = organization;
  const periodText = document.createElement("p");
  periodText.textContent = period;
  details.append(organizationText, periodText);
  item.append(heading, details);
  return item;
}
function renderCvList(items, list, type, emptyMessage) {
  list.replaceChildren();
  if (items.length === 0) {
    const item = document.createElement("li");
    const message = document.createElement("p");
    message.textContent = emptyMessage;
    item.append(message);
    list.append(item);
    return;
  }
  for (const item of items) {
    list.append(createCvItem(item, type));
  }
}
async function loadCv() {
  statusText.textContent = "Laddar CV…";
  retryButton.hidden = true;
  retryButton.disabled = true;
  workList.replaceChildren();
  educationList.replaceChildren();
  try {
    const response = await fetch("data/cv.json");
    if (!response.ok) {
      throw new Error("CV could not be loaded");
    }
    const { work, education } = await response.json();
    if (!Array.isArray(work) || !Array.isArray(education)) {
      throw new Error("CV lists are missing");
    }
    renderCvList(work, workList, "experience", "Inga arbeten att visa just nu.");
    renderCvList(education, educationList, "education", "Inga utbildningar att visa just nu.");
    statusText.textContent = "";
  } catch {
    workList.replaceChildren();
    educationList.replaceChildren();
    statusText.textContent = "Det gick inte att hämta mitt CV. Försök igen om en stund.";
    retryButton.hidden = false;
  }
  retryButton.disabled = false;
}
retryButton.addEventListener("click", loadCv);
loadCv();

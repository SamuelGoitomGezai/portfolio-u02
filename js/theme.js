const themeButton = document.querySelector("#theme-toggle");
const themeStatus = document.querySelector("#theme-status");
let isDark = false;
try {
  isDark = localStorage.getItem("portfolio-theme") === "dark";
} catch {
  isDark = false;
}
function renderTheme() {
  document.documentElement.classList.toggle("dark", isDark);
  themeButton.setAttribute("aria-pressed", String(isDark));
}
function changeTheme() {
  isDark = !isDark;
  renderTheme();
  themeStatus.textContent = "";
  let theme = "light";
  if (isDark) {
    theme = "dark";
  }
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    themeStatus.textContent = "Temat ändrades, men webbläsaren kunde inte spara ditt val till nästa sida.";
  }
}
renderTheme();
themeButton.hidden = false;
themeButton.addEventListener("click", changeTheme);

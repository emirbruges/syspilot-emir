function setTheme(theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light-theme");
    document.getElementById("theme-toggle").checked = true;
  } else {
    root.classList.remove("light-theme");
    document.getElementById("theme-toggle").checked = false;
  }
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  document.getElementById("theme-toggle").checked = isLight;
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("change", () => {
      toggleTheme();
    });
  }
});

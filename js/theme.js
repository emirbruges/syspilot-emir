document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Inicializa con tema oscuro (sin clase theme-dawn)
  toggle.checked = false;

  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      body.classList.add("theme-dawn");
    } else {
      body.classList.remove("theme-dawn");
    }
  });

  const container = document.querySelector(".container");
  if (container) {
    container.classList.add("fade-in-content");
    container.addEventListener(
      "animationend",
      () => {
        container.style.top = "auto";
      },
      { once: true },
    );
  }

  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((item, index) => {
    setTimeout(
      () => {
        item.classList.add("fade-in-item");
        item.addEventListener(
          "animationend",
          () => {
            item.style.top = "auto";
          },
          { once: true },
        );
      },
      200 + index * 100,
    );
  });

  const buttonLink = document.querySelector(".button-link");
  if (buttonLink) {
    buttonLink.addEventListener(
      "animationend",
      () => {
        buttonLink.style.top = "auto";
      },
      { once: true },
    );
  }

  const footer = document.querySelector(".footer");
  if (footer) {
    footer.addEventListener(
      "animationend",
      () => {
        footer.style.top = "auto";
      },
      { once: true },
    );
  }
});

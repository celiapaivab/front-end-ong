// scripts/main.js
// Organização: Cada funcionalidade em uma seção comentada

// =====================
// 1. Sistema de Templates JS
// =====================

/**
 * Renderiza um template HTML em um elemento alvo.
 * @param {string} template - HTML string do template.
 * @param {Element|string} target - Elemento ou seletor CSS do alvo.
 * @param {boolean} [replace=false] - Se true, substitui o conteúdo. Se false, adiciona.
 */
function renderTemplate(template, target, replace = false) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (replace) {
    el.innerHTML = template;
  } else {
    el.insertAdjacentHTML("beforeend", template);
  }
}

// =====================
// 2. Menu Hambúrguer Responsivo
// =====================

function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navbarMenu = document.querySelector(".navbar-menu");
  if (!hamburger || !navbarMenu) return;

  hamburger.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    hamburger.setAttribute(
      "aria-expanded",
      navbarMenu.classList.contains("active")
    );
  });

  // Fecha menu ao clicar em link (mobile)
  document.querySelectorAll(".navbar-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        navbarMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// =====================
// 3. Inicialização Global
// =====================

document.addEventListener("DOMContentLoaded", function () {
  setupHamburgerMenu();
  // Outras inicializações podem ser adicionadas aqui
});

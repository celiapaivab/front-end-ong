// Funções globais

// Renderiza HTML em um elemento alvo
function renderTemplate(html, target, replace = true) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (replace) el.innerHTML = html;
  else el.insertAdjacentHTML("beforeend", html);
}

// Menu hambúrguer responsivo
function setupHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navbarMenu = document.querySelector(".navbar-menu");
  if (!hamburger || !navbarMenu) return;

  // Remove listeners anteriores
  hamburger.replaceWith(hamburger.cloneNode(true));
  const newHamburger = document.querySelector(".hamburger");

  newHamburger.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
    newHamburger.classList.toggle("active");
    newHamburger.setAttribute(
      "aria-expanded",
      navbarMenu.classList.contains("active")
    );
  });

  // Fecha menu ao clicar em qualquer link do menu, se estiver aberto
  function closeHamburgerMenu() {
    if (navbarMenu.classList.contains("active")) {
      navbarMenu.classList.remove("active");
      newHamburger.classList.remove("active");
      newHamburger.setAttribute("aria-expanded", "false");
    }
  }
  document.querySelectorAll(".navbar-link, .dropdown-item").forEach((link) => {
    link.addEventListener("click", closeHamburgerMenu);
  });

  // Fecha o menu se a tela for redimensionada para maior que 768px
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeHamburgerMenu();
    }
  });
}

// Inicialização global
document.addEventListener("DOMContentLoaded", () => {
  setupHamburgerMenu();
});

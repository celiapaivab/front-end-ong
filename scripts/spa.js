// Carrega página no SPA
async function loadPage(url, hash) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao carregar página");
    const html = await response.text();
    renderTemplate(html, "#app", true);
    // Re-inicializa scripts globais
    if (typeof setupHamburgerMenu === "function") setupHamburgerMenu();
    // Inicializa validação de formulários, se existir
    document.querySelectorAll("form").forEach((form) => {
      if (typeof initFormValidation === "function") {
        initFormValidation(form);
      }
      // Intercepta submit para mostrar mensagem de sucesso sem redirecionar
      form.addEventListener("submit", function (e) {
        // Se já existe mensagem de sucesso, não faz nada
        if (form.querySelector(".form-success-message")) return;
        let isFormValid = true;
        form.querySelectorAll("input, select").forEach((input) => {
          if (typeof validateField === "function" && !validateField(input))
            isFormValid = false;
        });
        if (isFormValid) {
          e.preventDefault();
          // Remove mensagens de erro
          form.querySelectorAll(".error-message").forEach((el) => el.remove());
          // Exibe mensagem de sucesso
          const msg = document.createElement("div");
          msg.className = "form-success-message";
          msg.innerText = "Formulário enviado com sucesso!";
          msg.style.margin = "16px 0";
          msg.style.color = "#1a7f37";
          form.appendChild(msg);
          // Remove mensagem de sucesso ao editar qualquer campo
          form.querySelectorAll("input, select, textarea").forEach((input) => {
            input.addEventListener("input", () => {
              const successMsg = form.querySelector(".form-success-message");
              if (successMsg) successMsg.remove();
            });
            input.addEventListener("blur", () => {
              const successMsg = form.querySelector(".form-success-message");
              if (successMsg) successMsg.remove();
            });
          });
          // Opcional: resetar o formulário
          form.reset();
        }
        // Se não for válido, o initFormValidation já previne o submit
      });
    });
    // Scroll para hash, se existir
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
    // Reaplica links SPA após render
    setupLinks();
  } catch (err) {
    console.error(err);
    renderTemplate(
      `<section class="card"><h2>Erro 404</h2><p>Página não encontrada.</p></section>`,
      "#app"
    );
  }
}

function getPageAndHashFromUrl(href) {
  // Remove barra inicial e hash isolado
  href = href.replace(/^\/?#?/, "");
  let page = href;
  let hash = undefined;
  if (href.includes("#")) {
    [page, hash] = href.split("#");
  }
  if (!page || page === "") page = "home";
  page = page.replace(/\.html$/, "");
  return { page, hash };
}

function setupLinks() {
  document
    .querySelectorAll("[data-link], .navbar-link, .dropdown-item")
    .forEach((link) => {
      // Remove listeners antigos
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      newLink.addEventListener("click", (e) => {
        // Só intercepta links internos
        const href = newLink.getAttribute("href") || "home";
        if (href.startsWith("http") || href.startsWith("mailto:")) return;
        e.preventDefault();
        // Fecha o menu hamburguer se aberto (sempre)
        const hamburger = document.querySelector(".hamburger");
        const navbarMenu = document.querySelector(".navbar-menu");
        if (
          hamburger &&
          navbarMenu &&
          navbarMenu.classList.contains("active")
        ) {
          navbarMenu.classList.remove("active");
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
        }
        const { page, hash } = getPageAndHashFromUrl(href);
        const url = `pages/${page}.html`;
        loadPage(url, hash);
        history.pushState(
          { page, hash },
          "",
          `/${page}${hash ? "#" + hash : ""}`
        );
      });
    });
}

window.addEventListener("popstate", (event) => {
  let page = event.state?.page || "home";
  let hash = event.state?.hash;
  page = page.replace(/\.html$/, "");
  loadPage(`pages/${page}.html`, hash);
});

document.addEventListener("DOMContentLoaded", () => {
  setupLinks();
  let initialPage = "home";
  let path = window.location.pathname;
  if (path.endsWith("/") || path.endsWith("index.html")) {
    initialPage = "home";
  } else {
    initialPage = path.replace(/^\//, "").replace(/\.html$/, "");
    initialPage = initialPage.replace(/^pages\//, "");
    if (!initialPage) initialPage = "home";
  }
  const hash = window.location.hash.replace("#", "");
  loadPage(`pages/${initialPage}.html`, hash);
});

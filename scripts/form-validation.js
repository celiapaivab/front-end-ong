// Inicializa validação de um formulário
function initFormValidation(form) {
  if (!form) return;

  const inputs = form.querySelectorAll("input, select");

  // Validação em tempo real
  inputs.forEach((input) => {
    input.addEventListener("input", () => validateField(input));
    input.addEventListener("blur", () => validateField(input));
  });

  // Intercepta submit
  form.addEventListener("submit", (e) => {
    let isFormValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isFormValid = false;
    });
    if (!isFormValid) {
      e.preventDefault();
      const firstError = form.querySelector(".error-message");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Valida um campo individual
function validateField(input) {
  let valid = true;
  clearError(input);

  if (input.hasAttribute("required") && !input.value.trim()) {
    showError(input, "Campo obrigatório");
    valid = false;
  } else if (input.type === "email" && input.value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(input.value)) {
      showError(input, "E-mail inválido");
      valid = false;
    }
  } else if (input.type === "number" && input.min) {
    if (Number(input.value) < Number(input.min)) {
      showError(input, `Valor mínimo ${input.min}`);
      valid = false;
    }
  } else if (input.type === "text" && input.pattern) {
    const re = new RegExp(input.pattern);
    if (!re.test(input.value)) {
      showError(input, "Formato inválido");
      valid = false;
    }
  } else if (input.tagName === "SELECT" && input.required) {
    if (!input.value) {
      showError(input, "Selecione uma opção");
      valid = false;
    }
  } else if (input.type === "date" && input.required) {
    const today = new Date().toISOString().split("T")[0];
    if (input.value > today) {
      showError(input, "Data inválida");
      valid = false;
    }
  }

  return valid;
}

// Exibe mensagem de erro
function showError(input, message) {
  input.classList.add("input-error");
  let msg = document.createElement("div");
  msg.className = "error-message";
  msg.innerText = message;
  input.insertAdjacentElement("afterend", msg);
}

// Remove mensagem de erro
function clearError(input) {
  input.classList.remove("input-error");
  const msg = input.parentNode.querySelector(".error-message");
  if (msg) msg.remove();
}

// Exporta para SPA chamar
window.initFormValidation = initFormValidation;

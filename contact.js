document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const topicSelect = document.getElementById("topic");
  const messageInput = document.getElementById("message");
  const consentCheckbox = document.getElementById("consent");
  const successAlert = document.getElementById("form-success");

  const toggleError = (inputEl, errorId, show) => {
    const errorEl = document.getElementById(errorId);
    if (show) {
      inputEl.classList.add("is-invalid");
      errorEl.classList.remove("d-none");
      errorEl.classList.add("d-block");
    } else {
      inputEl.classList.remove("is-invalid");
      errorEl.classList.add("d-none");
      errorEl.classList.remove("d-block");
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Live validation
  nameInput.addEventListener("input", () => {
    toggleError(nameInput, "name-error", nameInput.value.trim().length < 3);
  });

  emailInput.addEventListener("input", () => {
    toggleError(emailInput, "email-error", !isValidEmail(emailInput.value.trim()));
  });

  messageInput.addEventListener("input", () => {
    toggleError(messageInput, "message-error", messageInput.value.trim().length < 10);
  });

  topicSelect.addEventListener("change", () => {
    toggleError(topicSelect, "topic-error", topicSelect.value === "");
  });

  consentCheckbox.addEventListener("change", () => {
    toggleError(consentCheckbox, "consent-error", !consentCheckbox.checked);
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    if (nameInput.value.trim().length < 3) {
      toggleError(nameInput, "name-error", true);
      isValid = false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      toggleError(emailInput, "email-error", true);
      isValid = false;
    }

    if (topicSelect.value === "") {
      toggleError(topicSelect, "topic-error", true);
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      toggleError(messageInput, "message-error", true);
      isValid = false;
    }

    if (!consentCheckbox.checked) {
      toggleError(consentCheckbox, "consent-error", true);
      isValid = false;
    }

    if (isValid) {
      form.reset();

      // Clear any leftover error state after reset
      document.querySelectorAll(".invalid-feedback").forEach((msg) => {
        msg.classList.add("d-none");
        msg.classList.remove("d-block");
      });
      [nameInput, emailInput, topicSelect, messageInput, consentCheckbox].forEach((el) => {
        el.classList.remove("is-invalid");
      });

      successAlert.classList.remove("d-none");
      successAlert.classList.add("d-block");

      setTimeout(() => {
        successAlert.classList.add("d-none");
        successAlert.classList.remove("d-block");
      }, 5000);
    }
  });

  // Reset button
  document.getElementById("reset-btn").addEventListener("click", () => {
    document.querySelectorAll(".invalid-feedback").forEach((msg) => {
      msg.classList.add("d-none");
      msg.classList.remove("d-block");
    });

    [nameInput, emailInput, topicSelect, messageInput, consentCheckbox].forEach((el) => {
      el.classList.remove("is-invalid");
    });

    successAlert.classList.add("d-none");
    successAlert.classList.remove("d-block");
  });
});
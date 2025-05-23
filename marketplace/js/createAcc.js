document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const togglePass = document.getElementById("togglePass");
  const form = document.getElementById("createAccForm");
  const errorMessage = document.getElementById("errorMessage");

  togglePass.addEventListener("change", () => {
    passwordInput.type = togglePass.checked ? "text" : "password";
  });

  form.addEventListener("submit", (e) => {
    const password = passwordInput.value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regex.test(password)) {
      e.preventDefault();
      errorMessage.textContent =
        "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol.";
    } else {
      errorMessage.textContent = "";
    }
  });
});

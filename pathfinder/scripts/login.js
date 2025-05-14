document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email-in").value;
    const password = document.getElementById("password-in").value;

    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/home";
    } else {
      const err = await res.text();
      errorMessage.textContent = err;
    }
  });
});

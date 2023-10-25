document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");
  const errorText = document.getElementById("error");
  const resultText = document.getElementById("resultText");


  loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (!password || password.length < 6) {
      resultText.innerHTML = "Password must be at least 6 characters.";
      return;
      } else {
        resultText.innerHTML = "Password or Username is invalid";
      }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data?.username) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } else {
      errorText.innerText = data;
    }
  });
});

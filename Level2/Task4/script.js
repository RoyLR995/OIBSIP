let userData = JSON.parse(localStorage.getItem("userData")) || [];

function isStrongPassword(password) {
  // Minimum length of 8 characters
  if (password.length < 8) {
    return false;
  }

  // Requires at least one uppercase letter, one lowercase letter, one number, and one special character
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/;
  return regex.test(password);
}

function register() {
  const regUsername = document.getElementById("reg-username").value;
  const regPassword = document.getElementById("reg-password").value;

  // Check if the password is strong
  if (!isStrongPassword(regPassword)) {
    document.getElementById("message").innerText =
      "Password must be strong: at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
  } else if (userData.some((user) => user.username === regUsername)) {
    document.getElementById("message").innerText =
      "Username already exists. Please choose another.";
  } else {
    // Store user data in local storage
    userData.push({ username: regUsername, password: regPassword });
    localStorage.setItem("userData", JSON.stringify(userData));
    document.getElementById("message").innerText = "Registration successful!";
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if the username and password match any stored user data
  const user = userData.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    document.getElementById("message").innerText = "Login successful!";

    // Open 'https://oasisinfobyte.com/' in a new tab
    window.open("https://oasisinfobyte.com/", "_blank");
  } else {
    document.getElementById("message").innerText =
      "Invalid credentials. Please try again.";
  }
}

const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const switchForm = document.getElementById("switchForm");
const userArea = document.getElementById("userArea");
const loggedInUser = document.getElementById("loggedInUser");
const logoutButton = document.getElementById("logoutButton");

let isLogin = false;

// Function to update the form for login or register
function updateForm(isLoginMode) {
  isLogin = isLoginMode;
  formTitle.innerText = isLogin ? "Login" : "Register";
  authForm.querySelector("button").innerText = isLogin ? "Login" : "Register";
  switchForm.innerHTML = isLogin
    ? 'Don\'t have an account? <a href="#" id="switchToRegister">Register</a>'
    : 'Already have an account? <a href="#" id="switchToLogin">Login</a>';
  attachSwitchEvent(); // Reattach the event listener for toggling
}

// Attach event listeners to switch between login and register
function attachSwitchEvent() {
  const switchLink = document.querySelector("#switchToLogin, #switchToRegister");
  if (switchLink) {
    switchLink.addEventListener("click", (e) => {
      e.preventDefault();
      updateForm(!isLogin);
    });
  }
}

//

// Initialize the script
attachSwitchEvent();


// Handle form submission for login or registration
authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // staff account
  const staffAcc = { username: "admin", password: "1234"};

  // user input
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // retreive users from local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    if (username === staffAcc.username && password === staffAcc.password) {

      // stor staff session
      sessionStorage.setItem("staffLoggedIn", "true")

      // redirect staff to dashboard
      alert("Welcome staff!")
      window.location.href = "staff-dashboard.html"
      return;
    }

    // user login
    // handle login logic
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
      alert("Welcome " + user.username + "!");
      
      // Store logged-in user in session storage
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));

      authForm.reset();
      window.location.href = 'index.html'; // Redirect to home page
      console.log("user:" + loggedInUser);

    } 
    else {
      alert("Invalid username or password.");
    }

  } else {
    // handle register logic
    if (users.some(user => user.username === username)) {
      alert("Username already exists.");
    } else {
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registration successful!");
      authForm.reset();

      // Switch to login mode after successful registration
      updateForm(true);
    }
  }
});


// Handle logout
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutButton");

  if (!logoutBtn) {
    console.error("Logout button not found.");
    return; // Exit function if button doesn't exist
  }

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (confirm("Are you sure you want to log out?")) {
      sessionStorage.removeItem("loggedInUser"); // Clear session storage
      localStorage.removeItem("loggedInUser");
      alert("You have successfully logged out.");

      // Redirect to home page after logout
      window.location.href = "index.html";
    }
  });
});

 // to toggle navbar
 function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

// Check for the logged-in user when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser"); // Use sessionStorage
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const profileButton = document.getElementById("profileButton");

  if (loggedInUser) {
    // User is logged in
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
    profileButton.style.display = "block"
  } else {
    // No user is logged in
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
    profileButton.style.display = "none"
  }
});

// Initialize the form
updateForm(true);




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
            sessionStorage.removeItem("staffLoggedIn"); // Clear session storage
            //localStorage.removeItem("loggedInUser");
            alert("You have successfully logged out.");

            // Redirect to home page after logout
            window.location.href = "index.html";
        }
    });
});
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

// handle payments
document.addEventListener("DOMContentLoaded", function () {
    let pendingPayments = JSON.parse(localStorage.getItem("pendingPayments")) || [];
    const tableBody = document.getElementById("paymentTableBody");

    if (pendingPayments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">No pending payments</td></tr>';
        return;
    }

    pendingPayments.forEach((payment, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.car}</td>
            <td>${payment.remarks}</td>
            <td>$${payment.rentalCost.toFixed(2)}</td>
            <td>${payment.paymentStatus}</td>
            <td>
                ${payment.paymentStatus === "Unpaid" ? `<button class="payBtn" data-index="${index}">Pay Now</button>` : "Paid"}
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.querySelectorAll(".payBtn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            processPayment(index);
        });
    });
});

function processPayment(index) {
    let pendingPayments = JSON.parse(localStorage.getItem("pendingPayments")) || [];
    let returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];
    let paidHistory = JSON.parse(localStorage.getItem("paidHistory")) || [];

    if (!pendingPayments[index]) {
        alert("Payment record not found.");
        return;
    }

    const confirmation = confirm(`Confirm payment of $${pendingPayments[index].rentalCost.toFixed(2)} for ${pendingPayments[index].car}?`);

    if (confirmation) {
        // Mark as Paid in pendingPayments
        pendingPayments[index].paymentStatus = "Paid";

        // Find the matching car in returnedCars and update its status
        let returnedCarIndex = returnedCars.findIndex(car => car.car === pendingPayments[index].car && car.paymentStatus === "Unpaid");

        if (returnedCarIndex !== -1) {
            returnedCars[returnedCarIndex].paymentStatus = "Paid";
            returnedCars[returnedCarIndex].status = "Completed";
        }

        // Move the paid record to paidHistory
        paidHistory.push(pendingPayments[index]);

        // Remove the processed record from pendingPayments
        pendingPayments.splice(index, 1);

        // Save updated data back to localStorage
        localStorage.setItem("pendingPayments", JSON.stringify(pendingPayments));
        localStorage.setItem("returnedCars", JSON.stringify(returnedCars));
        localStorage.setItem("paidHistory", JSON.stringify(paidHistory));

        alert("Payment successful!");
        location.reload()
    }
}



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

function populateReturnedCars() {
    const tableBody = document.getElementById('returnTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    let returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];

    if (returnedCars.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10">No returned cars</td></tr>';
        return;
    }

    returnedCars.forEach((car, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${car.car || 'N/A'}</td>
            <td>${car.pickupDate || 'N/A'}</td>
            <td>${car.returnDate || 'N/A'}</td>
            <td>${car.time || 'N/A'}</td>
            <td>${car.duration || 'N/A'}</td>
            <td class="payment-status">${car.paymentStatus || 'Unpaid'}</td>
            <td><button data-index="${index}" class="verifyBtn">Verify</button></td>
            <td><button onclick="openPaymentModal(${index})" id="editBtn">Mark Complete</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Attach event listeners to all "Verify" buttons
    document.querySelectorAll('.verifyBtn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute("data-index");
            console.log(index)
            openReturnModal(index);
        });
    });
}


// Add error handling to the event listener
document.addEventListener('DOMContentLoaded', () => {
    try {
        populateReturnedCars();
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
});

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        populateReturnedCars();
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
});

function openReturnModal(index) {
    const returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];
    const booking = returnedCars[index];

    // Populate modal with data
    document.getElementById("modalCarName").innerText = booking.car;
    document.getElementById("modalReturnDate").innerText = booking.returnDate;
    document.getElementById("modalDuration").innerText = booking.duration;
    document.getElementById("modalRate").innerText = booking.rate;

    // Store index for later use
    document.getElementById("confirmReturnBtn").setAttribute("data-index", index);

    // Show modal
    document.getElementById("returnModal").style.display = "block";
}

// Close modal when clicking "X"
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("returnModal").style.display = "none";
});

document.getElementById("damageCheckbox").addEventListener("change", function () {
    document.getElementById("remarksSection").style.display = this.checked ? "block" : "none";
});

// to verify car for payment
document.getElementById("confirmReturnBtn").addEventListener("click", function () {
    const index = this.getAttribute("data-index");
    console.log(index)
    let returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];
    let pendingPayments = JSON.parse(localStorage.getItem("pendingPayments")) || [];

    if (!returnedCars[index]) {
        alert("Car record not found!");
        return;
    }

    const carName = returnedCars[index].car;
    const hasDamage = document.getElementById("damageCheckbox").checked;
    const remarks = document.getElementById("remarks").value.trim();
    const manualCost = parseFloat(document.getElementById("totalCost").value);

    if (isNaN(manualCost) || manualCost < 0) {
        alert("Please enter a valid total cost.");
        return;
    }

    // Update return record
    returnedCars[index].status = hasDamage ? "Needs Inspection" : "Pending Payment";
    returnedCars[index].remarks = hasDamage ? remarks : "No damages reported";
    returnedCars[index].rentalCost = manualCost;
    returnedCars[index].paymentStatus = "Unpaid";

    // Store payment info
    pendingPayments.push({
        user: returnedCars[index].user,
        car: carName,
        rentalCost: manualCost,
        paymentStatus: "Unpaid",
        remarks: returnedCars[index].remarks
    });

    // Save updates
    localStorage.setItem("returnedCars", JSON.stringify(returnedCars));
    localStorage.setItem("pendingPayments", JSON.stringify(pendingPayments));

    alert(`${carName} return verified. Status: ${returnedCars[index].status}. Payment Due: $${manualCost}`);
    document.getElementById("returnModal").style.display = "none";
    populateReturnedCars(); // Refresh table
});

// handle to remove the payment record once status paid
document.getElementById("confirmPaymentBtn").onclick = function () {
    let returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];
    const index = this.getAttribute("data-index");

    // Remove the paid record
    returnedCars.splice(index, 1);

    // Save updated list back to localStorage
    localStorage.setItem("returnedCars", JSON.stringify(returnedCars));

    alert("Payment confirmed! Record removed.");
    closePaymentModal();
    populateReturnedCars(); // Refresh the table
};


function openPaymentModal() {
    document.getElementById("paymentModal").style.display = "block";
}

function closePaymentModal() {
    document.getElementById("paymentModal").style.display = "none";
    location.reload();
}



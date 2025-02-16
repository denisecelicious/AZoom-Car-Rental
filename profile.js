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

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const bookingContainer = document.querySelector(".bookings-container");
    const profileUser = document.getElementById("profile-user");
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));

    // to display username in profile page
    if (loggedInUser) {
        profileUser.innerHTML = user.username;
    }

    // get all bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    // filter bookings for the current user logged in
    const userBookings = allBookings.filter(booking => booking.user == loggedInUser);

    if (userBookings.length == 0) {
        bookingContainer.innerHTML = "<p style='text-align: center; color: white;'>No current bookings</p>";
        return;
    }

    // generate bookings dynamically
    let bookingHTML = "";
    userBookings.forEach((booking, index) => {
        bookingHTML += `
        <div class="card" style="text-align: left; height: 320px;">
            <div class="card-header">
                Details:
            </div>
            <div class="card-body">
                <h5 class="card-title" id="carName">${booking.car}</h5>
                <hr>
                <p class="card-text"><b>Pickup Date:</b> ${booking.pickupDate}, ${booking.time}</p>
                <p class="card-text"><b>Return Date:</b> ${booking.returnDate}</p>
                <p class="card-text"><b>Duration:</b> ${booking.duration} day(s)</p>
                
                <div class="button-row">
                    <button id="returnBtn" class="return-btn returnBooking" data-index="${index}">Return</button>
                    <button id="cancelBtn" class="cancel-btn cancelBooking" data-index="${index}">Cancel</button>
                </div>
            </div>
        </div>
    `; // Properly close div tags
    });

    // Add this to your HTML where you want the bookings to appear
    bookingContainer.innerHTML = bookingHTML;

    // Handle booking cancellation
    document.querySelectorAll(".cancelBooking").forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("Are you sure you want to cancel the booking?")) {
                const index = this.getAttribute("data-index");

                // Remove selected booking for the user
                userBookings.splice(index, 1);

                // Update the bookings in localStorage
                const updatedBookings = allBookings.filter(booking => booking.user !== loggedInUser);
                localStorage.setItem("bookings", JSON.stringify([...updatedBookings, ...userBookings]));

                alert("Booking canceled.");
                location.reload(); // Refresh the page to update UI
            }
        });
    });
});


// handle return car function
document.addEventListener("DOMContentLoaded", function () {
    const returnCarBtn = document.getElementById("returnBtn");

    if (returnCarBtn) {
        returnCarBtn.addEventListener("click", function () {
            const carName = document.getElementById("carName").innerText; // Get the car's name from the page

            if (confirm(`Are you sure you want to return ${carName}?`)) {
                returnCar(carName); // Call function to update return status
                updateCarStatus(carName); // Update car status on the page
            }
        });
    }
});

// Function to return the car and move it to returnedCars array
function returnCar(carName) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let returnedCars = JSON.parse(localStorage.getItem("returnedCars")) || [];
    let carsData = JSON.parse(localStorage.getItem("carsData")) || []; // Retrieve cars array

    const carIndex = bookings.findIndex(booking => booking.car === carName);
    const carDataIndex = carsData.findIndex(car => car.name === carName);

    if (carIndex !== -1) {
        let returnedCar = { ...bookings[carIndex], status: "Available" };

        returnedCars.push(returnedCar); // Move car to returned list
        bookings.splice(carIndex, 1); // Remove from bookings

        if (carDataIndex !== -1) {
            carsData[carDataIndex].status = "Available"; // Update status in carsData
        }

        localStorage.setItem("returnedCars", JSON.stringify(returnedCars));
        localStorage.setItem("bookings", JSON.stringify(bookings));
        localStorage.setItem("carsData", JSON.stringify(carsData)); // Save updated cars array

        alert(`${carName} has been returned successfully!`);
        location.reload()
    } else {
        alert(`${carName} was not found in bookings.`);
    }
}

// function to go to payment page
function makePayment() {
    window.location.href = "payment.html"
}









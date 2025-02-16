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

// display table of car listings
const carsData = [
    { id: 1, name: 'Hyundai Creta', image: 'images/hyundai-creta.jpeg', seats: '4 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '70' },
    { id: 2, name: 'Toyota Urban Cruiser', image: 'images/toyata-cruiser.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '80' },
    { id: 3, name: 'Kia Sonet', image: 'images/kia-sonet.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '90' }
];

function viewCarDetails(carId) {
    console.log('Viewing car:', carId);
    // Implement your view logic here
}

function populateCarTable() {
    const tableBody = document.getElementById('carTableBody');

    carsData.forEach(car => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${car.id}</td>
        <td><img src="${car.image}" alt="${car.name}" class="car-image"></td>
        <td>${car.name}</td>
        <td>${car.seats}</td>
        <td>${car.vehicleType}</td>
        <td>${car.fuelType}</td>
        <td>$${car.rate}</td>
      `;

        tableBody.appendChild(row);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', populateCarTable);



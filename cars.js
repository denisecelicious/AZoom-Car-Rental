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

// populate cars
const carsData = [
  { id: 1, name: 'Hyundai Creta', image: 'images/hyundai-creta.jpeg', seats: '4 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '70'},
  { id: 2, name: 'Toyota Urban Cruiser', image: 'images/toyata-cruiser.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '80'},
  { id: 3, name: 'Kia Sonet', image: 'images/kia-sonet.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '90' }
]

const carGrid = document.getElementById('carGrid')

carsData.forEach(car => {
  const carItem = document.createElement('div');

  carItem.classList.add('grid-item')

  carItem.innerHTML = `
    <img src="${car.image}" alt="${car.name}">
    <h5>${car.name}</h5>
    <p>seats: ${car.seats}</p>
    <p>Rate: <b>$${car.rate}</b> / day</p>
    <button id="viewCarBtn" onclick="viewCarDetails(${car.id})">View</button>
`;

  carGrid.appendChild(carItem);
})

// navigato to view car details page
function viewCarDetails(carId) {
  window.location.href = `carDetails.html?id=${carId}`;
}

function searchCar() {
  const input = document.getElementById("filter").value.toUpperCase();
  const cardContainer = document.getElementById("carGrid");
  const cards = cardContainer.getElementsByClassName("grid-item");

  for (let i = 0; i < cards.length; i++) {
      let carName = cards[i].querySelector("h5"); 
      
      if (carName.innerText.toUpperCase().includes(input)) {
          cards[i].style.display = "";  // Show matching items
      } else {
          cards[i].style.display = "none"; // Hide non-matching items
      }
  }
}

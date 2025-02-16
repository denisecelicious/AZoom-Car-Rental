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


const carsData = [
  { id: 1, name: 'Hyundai Creta', image: 'images/hyundai-creta.jpeg', seats: '4 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '70', status: 'Available' },
  { id: 2, name: 'Toyota Urban Cruiser', image: 'images/toyata-cruiser.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '80', status: 'Available' },
  { id: 3, name: 'Kia Sonet', image: 'images/kia-sonet.jpeg', seats: '5 seater', vehicleType: 'SUV', fuelType: 'Petrol', rate: '90', status: 'Available' }
]
// get query params from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// get car ID from URL
const carId = getQueryParam('id')

// get car by ID
const car = carsData.find(c => c.id == carId)

// Function to check if a car is booked
function isCarBooked(carName) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  return bookings.some(booking => booking.car === carName);
}

// if car is found
if (car) {
  document.getElementById('carImage').src = car.image;
  document.getElementById('carName').innerText = car.name;
  document.getElementById('carSeats').innerText = `Seats: ${car.seats} ${car.vehicleType}`;
  document.getElementById('fuelType').innerText = `Fuel Type: ${car.fuelType}`;
  document.getElementById('rate').innerHTML = `<p>Rate: <b>$${car.rate}</b> / day</p>`;
  document.getElementById('statusBtn').innerText = car.status;

  // Check if car is booked and update status accordingly
  const statusBtn = document.getElementById('statusBtn');
  const bookCarBtn = document.getElementById('bookCarBtn')

  if (isCarBooked(car.name)) {
    statusBtn.innerText = "Booked";
    // change status to red
    statusBtn.style.backgroundColor = "red";
    // hide book now btutton
    bookCarBtn.style.display = "none";
  } else {
    statusBtn.innerText = "Available";
    // status green
    statusBtn.style.backgroundColor = "lightgreen";
  }

} else {
  document.body.innerHTML = '<h2>Car not found!</h2>';
  window.location.href = 'cars.html'
}

/*
// to handle the car booking using a modal
document.addEventListener("DOMContentLoaded", function () {
  const bookNowBtn = document.getElementById("bookCarBtn");
  const modal = document.getElementById("bookingModal");
  const closeModal = document.querySelector(".close");
  const confirmBooking = document.getElementById("confirmBooking");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  // Get car details from the page
  const carImage = document.getElementById("carImage").src;
  const carName = document.getElementById("carName").innerText;
  const carSeats = document.getElementById("carSeats").innerText;

  bookNowBtn.addEventListener("click", () => {
    if (!loggedInUser) {
      alert("Please log in to book a car.");
      window.location.href = 'login.html'
      return;
    }

    // Set current date and time as default values
    const now = new Date();
    document.getElementById("bookingDate").value = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    document.getElementById("bookingTime").value = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format

    // Update modal with car details
    document.getElementById("modalCarImage").src = carImage;
    document.getElementById("modalCarName").innerText = carName;
    document.getElementById("modalCarSeats").innerText = carSeats;

    modal.style.display = "flex";
  });

  // Close modal when "X" is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle Confirm Booking
  confirmBooking.addEventListener("click", () => {

    const bookCarBtn = document.getElementById("bookCarBtn")

    if (!loggedInUser) {
      alert("You must be logged in to confirm a booking.");
      return;
    }

    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const duration = document.getElementById("bookingDuration").value;

    // convert date to dd-mm-yyyy format
    const dateObj = new Date(date);
    const day = ("0" + dateObj.getDate()).slice(-2); // Ensure 2 digits for day
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Get month (0-based)
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`; // Format as dd-mm-yyyy

  
   

    if (formattedDate && time && duration) {
      const bookingDetails = {
        user: loggedInUser,
        car: carName,
        date: formattedDate,
        time: time,
        duration: duration
      };

      // Get existing bookings from localStorage
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

      // Add new booking
      bookings.push(bookingDetails);
      console.log(bookingDetails);

      // Save updated bookings back to localStorage in an array
      localStorage.setItem("bookings", JSON.stringify(bookings));

      //display to user that booking is confirmed
      alert(`Your Booking is Confirmed!\nCar: ${carName}\nPick-up Date: ${formattedDate}\nPick-up Time: ${time}\nNo. of Days: ${duration} days`);
      modal.style.display = "none";
    } else {
      alert("Please fill in all fields.");
    }
  });
});
*/

// handle booking
document.addEventListener("DOMContentLoaded", function () {
  const bookNowBtn = document.getElementById("bookCarBtn");
  const modal = document.getElementById("bookingModal");
  const closeModal = document.querySelector(".close");
  const confirmBooking = document.getElementById("confirmBooking");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  // Get car details from the page
  const carImage = document.getElementById("carImage").src;
  const carName = document.getElementById("carName").innerText;
  const carSeats = document.getElementById("carSeats").innerText;

  bookNowBtn.addEventListener("click", () => {
    if (!loggedInUser) {
      alert("Please log in to book a car.");
      window.location.href = "login.html";
      return;
    }

    // Set current date and time as default values
    const now = new Date();
    // set the date to only select from the current date onwards
    const pickUpDateInput = document.getElementById("pickupDate").value = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    document.getElementById("pickupDate").setAttribute("min", pickUpDateInput)

    const returnDateInput = document.getElementById("returnDate").value = now.toISOString().split("T")[0];
    document.getElementById("returnDate").setAttribute("min", returnDateInput)

    const bookingTimeInput = document.getElementById("bookingTime").value = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM format
    document.getElementById("bookingTime").setAttribute("min", bookingTimeInput)

    // Update modal with car details
    document.getElementById("modalCarImage").src = carImage;
    document.getElementById("modalCarName").innerText = carName;
    document.getElementById("modalCarSeats").innerText = carSeats;

    modal.style.display = "flex";
  });

  // Close modal when "X" is clicked
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Auto-calculate booking duration
  const pickupDateInput = document.getElementById("pickupDate");
  const returnDateInput = document.getElementById("returnDate");
  const bookingDurationInput = document.getElementById("bookingDuration");

  function calculateDays() {
    const pickupDate = new Date(pickupDateInput.value);
    const returnDate = new Date(returnDateInput.value);

    // Ensure both dates are selected and return date is after pickup date
    if (pickupDate && returnDate && returnDate >= pickupDate) {
      const timeDiff = returnDate.getTime() - pickupDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert ms to days
      bookingDurationInput.value = daysDiff;
    } else {
      bookingDurationInput.value = ""; // Reset if invalid
    }
  }

  // Set min return date when pickup date is selected
  pickupDateInput.addEventListener("change", function () {
    returnDateInput.min = pickupDateInput.value; // Prevent selecting past dates
    returnDateInput.value = ""; // Reset return date on pickup date change
    bookingDurationInput.value = ""; // Reset days count
  });

  // Trigger calculation when dates are selected
  pickupDateInput.addEventListener("change", calculateDays);
  returnDateInput.addEventListener("change", calculateDays);

  // Handle Confirm Booking
confirmBooking.addEventListener("click", () => {
  if (!loggedInUser) {
    alert("You must be logged in to confirm a booking.");
    return;
  }

  const pickupDate = document.getElementById("pickupDate").value;
  const returnDate = document.getElementById("returnDate").value;
  const time = document.getElementById("bookingTime").value;
  const duration = document.getElementById("bookingDuration").value;
  const rate = document.getElementById("rate").textContent


  if (!pickupDate || !returnDate || !time || !duration) {
    alert("Please fill in all fields.");
    return;
  }

  // Format the date
  function formatDate(dateStr) {
    const dateObj = new Date(dateStr);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  let [hours, minutes] = time.split(":").map(Number);
  let ampm = hours >= 12 ? "PM" : "AM"; 
  hours = hours % 12 || 12; 
  const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  const formattedPickupDate = formatDate(pickupDate);
  const formattedReturnDate = formatDate(returnDate);

  const bookingDetails = {
    user: loggedInUser,
    car: carName,
    pickupDate: formattedPickupDate,
    returnDate: formattedReturnDate,
    time: formattedTime,
    duration: duration,
    status: "Booked",
    rate: rate
  };

  // Get existing bookings from localStorage
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Add new booking
  bookings.push(bookingDetails);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Update Car Status in carsData
  let carsData = JSON.parse(localStorage.getItem("carsData")) || [];
  let carIndex = carsData.findIndex(car => car.name === carName);

  if (carIndex !== -1) {
    carsData[carIndex].status = "Booked"; // Change status
    localStorage.setItem("carsData", JSON.stringify(carsData)); // Save update
  }

  // Update UI to reflect new status
  const statusBtn = document.getElementById("statusBtn");
  if (statusBtn) {
    statusBtn.innerText = "Booked";
    statusBtn.style.backgroundColor = "red";
  }

  // Hide the "Book Now" button after booking
  const bookNowBtn = document.getElementById("bookCarBtn");
  if (bookNowBtn) {
    bookNowBtn.style.display = "none";
  }

  // Display confirmation message
  alert(
    `Your Booking is Confirmed!\nCar: ${carName}\nPick-up Date: ${formattedPickupDate}\nReturn Date: ${formattedReturnDate}\nPick-up Time: ${formattedTime}\nNo. of Day(s): ${duration} day(s)`
  );

  modal.style.display = "none";
  location.reload();
});

});


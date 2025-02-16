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

// display user bookings
function populateBookings() {
    const tableBody = document.getElementById('bookingsTableBody');
    
    // Check if table body exists
    if (!tableBody) {
        console.error('Bookings table body not found');
        return;
    }

    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Get and parse bookings with error handling
    let bookings = [];
    try {
        bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    } catch (error) {
        console.error('Error parsing bookings:', error);
        return;
    }

    // Handle empty bookings array
    if (bookings.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="7" class="text-center">No bookings found</td>';
        tableBody.appendChild(emptyRow);
        return;
    }

    bookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        
        // Safely access booking properties with fallbacks
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${booking.car || 'N/A'}</td>
            <td>${booking.pickupDate || 'N/A'}</td>
            <td>${booking.returnDate || 'N/A'}</td>
            <td>${booking.time || 'N/A'}</td>
            <td>${booking.duration || 'N/A'}</td>
            <td>${booking.status || 'N/A'}</td>
            
        `;

        tableBody.appendChild(row);
    });
}

// Add error handling to the event listener
document.addEventListener('DOMContentLoaded', () => {
    try {
        populateBookings();
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
});

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        populateBookings();
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
});
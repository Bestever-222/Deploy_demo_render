// Follow button functionality
const followBtn = document.getElementById('followBtn');

followBtn.addEventListener('click', function() {
    if (followBtn.textContent.trim() === 'Follow') {
        followBtn.textContent = 'Followed';  // Change the button text
        followBtn.classList.remove('follow-btn');
        followBtn.classList.add('followed-btn');
    } else {
        followBtn.textContent = 'Follow';  // Change back to 'Follow'
        followBtn.classList.remove('followed-btn');
        followBtn.classList.add('follow-btn');
    }
});

// View More button functionality
const viewMoreBtn = document.getElementById('viewMoreBtn');

viewMoreBtn.addEventListener('click', function() {
    window.location.href = 'viewmore.html';  // Redirect to viewmore.html
});


///Banner changes
const headerElement = document.querySelector('.full-header');

// Dynamic image update (with cache busting)
const newImagePath = 'assets/banner_profile.png'; // Replace with the new image path
const updatedImagePath = `${newImagePath}?v=${new Date().getTime()}`;

// Update the background image
headerElement.style.backgroundImage = `url('${updatedImagePath}')`;
headerElement.style.backgroundSize = 'cover'; // Ensure the image covers the section
headerElement.style.backgroundPosition = 'center'; // Center the image
headerElement.style.backgroundRepeat = 'no-repeat'; // Prevent tiling


//Profile page JS 
document.addEventListener("DOMContentLoaded", function () {
    const savedProfileImage = sessionStorage.getItem("profileImage");

    if (savedProfileImage) {
        // If a profile image is found in sessionStorage, set it as the profile image
        const profileImageElement = document.querySelector(".profile-image img");
        profileImageElement.src = savedProfileImage;
    }
});

//chnages by Anjali
document.addEventListener('DOMContentLoaded', function () {
    // Fetch username and content from localStorage
    const loggedInUsername = localStorage.getItem('username');
    const loggedInContent = localStorage.getItem('content');

    // Dynamically update the username and content
    if (loggedInUsername) {
        document.getElementById('username').textContent = loggedInUsername;
    }
    if (loggedInContent) {
        document.getElementById('content').textContent = loggedInContent;
    }
});
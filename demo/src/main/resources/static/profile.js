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

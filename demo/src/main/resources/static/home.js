// Profile Photo Upload Functionality
document.getElementById("uploadIcon").addEventListener("click", function() {
    document.getElementById("uploadPhoto").click();
});

document.getElementById("uploadPhoto").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Add Post Functionality
document.getElementById("addPostButton").addEventListener("click", function() {
    const postInput = document.getElementById("postInput").value;
    const mediaInput = document.getElementById("mediaInput").files;

    if (postInput.trim() === "" && mediaInput.length === 0) {
        return; // Do not add post if input is empty
    }

    const postContainer = document.getElementById("postContainer");
    const postDiv = document.createElement("div");
    postDiv.classList.add("user-post");

    const userInfo = `
        <div class="user-info" style="display: flex; align-items: center;">
            <img src="assets/profile.jpg" alt="User Photo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
            <div class="user-details">
                <h3 style="margin-bottom: 5px;">Riya</h3>
                <p style="color: #777;">Comedy content creator</p>
            </div>
        </div>
    `;

    const postContent = `<div class="post-content">
                            <p class="post-text">${postInput}</p>
                          </div>`;

    postDiv.innerHTML = userInfo + postContent;

    // Handle media uploads
    for (let i = 0; i < mediaInput.length; i++) {
        const mediaFile = mediaInput[i];
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const mediaElement = document.createElement("img");
            mediaElement.src = e.target.result;
            mediaElement.classList.add("post-image");
            postDiv.querySelector(".post-content").appendChild(mediaElement);
        };
        fileReader.readAsDataURL(mediaFile);
    }

    // Add Like, Share, Comment, and Repost buttons
    const interactionIcons = `
        <div class="interaction-icons">
            <button class="like-button" data-liked="false" data-likes="0">❤ 0</button>
            <button class="share-button">🔗 Share</button>
            <button class="comment-button">💬 Comment</button>
            <button class="repost-button">🔄 Repost</button>
        </div>
        <div class="share-box" style="display: none;">
            <ul>
                <li><a href="mailto:?subject=Check out this post!&body=${encodeURIComponent(postInput)}" target="_blank">Email</a></li>
                <li><a href="https://api.whatsapp.com/send?text=${encodeURIComponent(postInput)}" target="_blank">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
                <li><a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank">LinkedIn</a></li>
            </ul>
        </div>
        <div class="comment-box" style="display: none;">
            <textarea placeholder="Write a comment..."></textarea>
            <button class="submit-comment">Submit</button>
        </div>`;

    postDiv.innerHTML += interactionIcons;
    postContainer.prepend(postDiv); // Add new post at the top

    document.getElementById("postInput").value = ""; // Clear input
    document.getElementById("mediaInput").value = ""; // Clear media input
    document.getElementById("noPostsMessage").style.display = "none"; // Hide no posts message

    // Add functionality for the new post
    addPostInteractionListeners(postDiv);
});

// Add interaction functionality to dynamically created posts
function addPostInteractionListeners(postDiv) {
    // Like Button Functionality (toggle between like and dislike)
    postDiv.querySelector(".like-button").addEventListener("click", function() {
        let likeCount = parseInt(this.getAttribute("data-likes"));
        const liked = this.getAttribute("data-liked") === "true";

        if (liked) {
            likeCount--;
            this.innerHTML = `❤ ${likeCount}`;
            this.setAttribute("data-liked", "false");
            this.classList.remove("liked"); // Remove red color
        } else {
            likeCount++;
            this.innerHTML = `❤ ${likeCount}`;
            this.setAttribute("data-liked", "true");
            this.classList.add("liked"); // Add red color
        }

        this.setAttribute("data-likes", likeCount);
    });

    // Share Button Functionality
    postDiv.querySelector(".share-button").addEventListener("click", function() {
        const shareBox = postDiv.querySelector(".share-box");
        shareBox.style.display = shareBox.style.display === 'none' ? 'block' : 'none';
    });

    // Comment Button Functionality
    postDiv.querySelector(".comment-button").addEventListener("click", function() {
        const commentBox = postDiv.querySelector(".comment-box");
        commentBox.style.display = commentBox.style.display === "none" ? "block" : "none";
    });

    // Submit Comment Functionality
    postDiv.querySelector(".submit-comment").addEventListener("click", function() {
        const commentText = this.previousElementSibling.value;
        if (commentText.trim()) {
            alert(`Comment Submitted: ${commentText}`);
            this.previousElementSibling.value = ""; // Clear comment input after submission
        }
    });

    // Repost Button Functionality
    postDiv.querySelector(".repost-button").addEventListener("click", function() {
        const postText = this.closest(".user-post").querySelector(".post-text").innerText;
        const postInput = document.getElementById("postInput");
        postInput.value = `Reposting: ${postText}`;
    });
}

// Ensure that the default example posts also have the like, share, comment, and repost functionality
document.querySelectorAll(".user-post").forEach(postDiv => {
    addPostInteractionListeners(postDiv);
});

// Redirect to profile.html when profile image is clicked
document.getElementById("profileImage").addEventListener("click", function() {
    window.location.href = "profile.html"; // Redirects to profile.html
});

// Load username and content type from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const content = localStorage.getItem('content');

    // Update the username and content type in the profile section
    if (username) {
        document.getElementById('username').textContent = username;
    }
    if (content) {
        document.getElementById('content').textContent = content + ' content creator';
    }
});

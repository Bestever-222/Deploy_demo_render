// Profile Photo Upload Functionality
document.getElementById("uploadIcon").addEventListener("click", function () {
    document.getElementById("uploadPhoto").click();
});

document.getElementById("uploadPhoto").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Update the profile image
            const profileImage = document.getElementById("profileImage");
            profileImage.src = e.target.result;

            // Store the uploaded profile image in localStorage
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// On page load, check if profile image exists in localStorage
document.addEventListener("DOMContentLoaded", function () {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
        document.getElementById("profileImage").src = savedProfileImage;
    }
});
// Reset to Default Profile Image After Refresh
window.addEventListener("beforeunload", function () {
    // Clear the uploaded profile image from localStorage when refreshing
    localStorage.removeItem("profileImage");
});

// Add Post Functionality
document.getElementById("addPostButton").addEventListener("click", function () {
    const postInput = document.getElementById("postInput").value.trim();
    const mediaInput = document.getElementById("mediaInput").files;

    if (postInput === "" && mediaInput.length === 0) {
        alert("Cannot add an empty post!");
        return;
    }

    const mediaFiles = [];
    if (mediaInput.length > 0) {
        for (let i = 0; i < mediaInput.length; i++) {
            const fileReader = new FileReader();
            fileReader.onload = function (e) {
                mediaFiles.push(e.target.result);
            };
            fileReader.readAsDataURL(mediaInput[i]);
        }
    }

    // Small delay to allow media files to load
    setTimeout(() => {
        createPost(postInput, mediaFiles);

        // Clear input fields after adding the post
        document.getElementById("postInput").value = ""; // Clear the post text
        document.getElementById("mediaInput").value = ""; // Clear the file input
    }, 500);
});

// Function to create a new post
function createPost(postText, mediaFiles, originalUserName = null) {
    const postContainer = document.getElementById("postContainer");
    const postDiv = document.createElement("div");
    postDiv.classList.add("user-post");

    const profileImage = localStorage.getItem("profileImage") || "assets/profile.jpg";

    // Add "Reposted from" if it's a repost
    const userNameText = originalUserName
        ? `Riya reposted this`
        : "Riya";

    const userInfo = `
        <div class="user-info" style="display: flex; align-items: center;">
            <img src="${profileImage}" alt="User Photo" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-right: 15px;">
            <div class="user-details">
                <h3 style="margin-bottom: 5px;">${userNameText}</h3>
                <p style="color: #777;">Comedy content creator</p>
            </div>
        </div>
    `;

    const postContent = `
        <div class="post-content">
            <p class="post-text">${postText}</p>
        </div>
        <div class="comment-list"></div> <!-- Comment list section -->
    `;

    postDiv.innerHTML = userInfo + postContent;

    if (mediaFiles.length > 0) {
        mediaFiles.forEach(src => {
            const mediaElement = document.createElement("img");
            mediaElement.src = src;
            mediaElement.classList.add("post-image");
            postDiv.querySelector(".post-content").appendChild(mediaElement);
        });
    }

    const interactionIcons = `
        <div class="interaction-icons">
            <button class="like-button" data-liked="false" data-likes="0">❤ 0</button>
            <button class="share-button">🔗 Share</button>
            <button class="comment-button">💬 Comment</button>
            <button class="repost-button">🔄 Repost</button>
            <button class="delete-button">🗑️ Delete</button>
        </div>
        <div class="comment-box" style="display: none;">
            <textarea placeholder="Write a comment..."></textarea>
            <button class="submit-comment">Submit</button>
        </div>
    `;

    postDiv.innerHTML += interactionIcons;
    postContainer.prepend(postDiv);

    // Attach event listeners to the new post
    addPostInteractionListeners(postDiv);
}

// Function to add interaction listeners
function addPostInteractionListeners(postDiv) {
    // Like Button
    postDiv.querySelector(".like-button").addEventListener("click", function () {
        let likeCount = parseInt(this.getAttribute("data-likes"));
        const liked = this.getAttribute("data-liked") === "true";

        if (liked) {
            likeCount--;
            this.innerHTML = `❤ ${likeCount}`;
            this.setAttribute("data-liked", "false");
        } else {
            likeCount++;
            this.innerHTML = `❤ ${likeCount}`;
            this.setAttribute("data-liked", "true");
        }

        this.setAttribute("data-likes", likeCount);
    });

    // Comment Button
    postDiv.querySelector(".comment-button").addEventListener("click", function () {
        const commentBox = postDiv.querySelector(".comment-box");
        commentBox.style.display = commentBox.style.display === "none" ? "block" : "none";
    });

    // Submit Comment
    postDiv.querySelector(".submit-comment").addEventListener("click", function () {
        const commentInput = postDiv.querySelector(".comment-box textarea");
        const commentText = commentInput.value.trim();

        if (commentText) {
            const commentList = postDiv.querySelector(".comment-list");

            const commentItem = document.createElement("div");
            commentItem.innerHTML = `
                <div style="display: flex; align-items: center; margin-top: 10px;">
                    <img src="${localStorage.getItem("profileImage") || "assets/profile.jpg"}" alt="User Photo" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 10px;">
                    <p style="margin: 0; font-size: 14px;"><strong>Riya:</strong> ${commentText}</p>
                </div>
            `;
            commentList.appendChild(commentItem);

            commentInput.value = "";
        } else {
            alert("Comment cannot be empty!");
        }
    });

    // Repost Button
    postDiv.querySelector(".repost-button").addEventListener("click", function () {
        const originalUserName = postDiv.querySelector(".user-details h3").innerText.split("Reposted from ")[1] || postDiv.querySelector(".user-details h3").innerText;
        const postText = postDiv.querySelector(".post-text").innerText;
        const mediaElements = postDiv.querySelectorAll(".post-image");
        const mediaSources = Array.from(mediaElements).map(img => img.src);
        createPost(postText, mediaSources, originalUserName);
    });

    // Share Button Functionality
    const shareButton = postDiv.querySelector(".share-button");
    if (shareButton) {
        shareButton.addEventListener("click", function () {
            const postText = postDiv.querySelector(".post-text").innerText;
            const shareData = {
                title: "Shared Post",
                text: postText,
                url: window.location.href
            };

            // Use Web Share API if available
            if (navigator.share) {
                navigator.share(shareData).catch(err => console.error("Share failed:", err));
            } else {
                alert("Sharing is not supported on this browser. Try copying the URL!");
            }
        });
    }

    // Delete Button
    postDiv.querySelector(".delete-button").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this post?")) {
            postDiv.remove();
        }
    });
}

// Attach listeners to all posts on page load
document.addEventListener("DOMContentLoaded", function () {
    const allPosts = document.querySelectorAll(".user-post");
    allPosts.forEach(postDiv => addPostInteractionListeners(postDiv));
});

// Redirect to profile.html when profile image is clicked
document.getElementById("profileImage").addEventListener("click", function () {
    window.location.href = "profile.html";
});
// Redirect to mentorship.html when mentorship button is clicked
document.getElementById("mentorshipButton").addEventListener("click", function () {
    window.location.href = "mentoring.html"; // Replace with the correct path to your mentorship page
});

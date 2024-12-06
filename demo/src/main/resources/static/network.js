document.addEventListener('DOMContentLoaded', () => {
        const followButtons = document.querySelectorAll('.suggestions-section .connect-button');


        followButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.card'); // Get the user card
                const userName = card.querySelector('h3').innerText; // Get user's name
                const userRole = card.querySelector('p').innerText; // Get user's role


                // Clone the card to add to My Community
                const myCommunityGrid = document.querySelector('.followers-section .card-grid');
                const newCard = document.createElement('div');
                newCard.classList.add('card');
                newCard.innerHTML = `
                    <img src="assets/profile.jpg" alt="User">
                    <h3>${userName}</h3>
                    <p>${userRole}</p>
                    <button class="connect-button">Message</button>
                `;


                // Add the cloned card to the My Community grid
                myCommunityGrid.appendChild(newCard);


                // Remove the original card from Trending Creators
                card.remove();
            });
        });
    });


    //for create new post
    document.addEventListener('DOMContentLoaded', () => {
        const openModal = document.getElementById('openCreatePost');
        const modal = document.getElementById('createPostModal');
        const closeModal = document.getElementById('closeModal');
        const cancelPostButton = document.getElementById('cancelPostButton');
        const createPostForm = document.getElementById('createPostForm');
        const postMediaInput = document.getElementById('postMedia');
        const mediaPreview = document.getElementById('mediaPreview');

        let selectedFiles = []; // To store selected files

        // Open the modal
        openModal.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            modal.style.display = 'flex'; // Show the modal
        });

        // Close the modal
        const closeModalFunc = () => {
            modal.classList.add('hidden');
            modal.style.display = 'none'; // Hide the modal
            mediaPreview.innerHTML = ''; // Clear media previews
            selectedFiles = []; // Clear selected files
        };

        closeModal.addEventListener('click', closeModalFunc);
        cancelPostButton.addEventListener('click', closeModalFunc);

        // Media preview logic
        postMediaInput.addEventListener('change', (e) => {
            mediaPreview.innerHTML = ''; // Clear existing previews
            selectedFiles = Array.from(e.target.files); // Get all selected files

            selectedFiles.forEach((file) => {
                const fileURL = URL.createObjectURL(file); // Create a temporary URL
                const previewElement = document.createElement('div');
                previewElement.classList.add('preview-item');

                if (file.type.startsWith('image/')) {
                    previewElement.innerHTML = `<img src="${fileURL}" alt="Image Preview">`;
                } else if (file.type.startsWith('video/')) {
                    previewElement.innerHTML = `<video src="${fileURL}" controls></video>`;
                }

                mediaPreview.appendChild(previewElement);
            });

            mediaPreview.classList.remove('hidden'); // Show the preview section
        });

        // Handle form submission
        createPostForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get post text
            const postText = document.getElementById('postText').value;

            // Convert media files to Base64
            const mediaFiles = await Promise.all(
                selectedFiles.map((file) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(file);
                    });
                })
            );

            // Create post object
            const newPost = {
                user: 'Riya', // Example user
                role: 'Comedy Content Creator', // Example role
                text: postText,
                media: mediaFiles, // Array of Base64-encoded files
            };

            // Save to localStorage
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            posts.unshift(newPost); // Add the new post to the beginning of the list
            localStorage.setItem('posts', JSON.stringify(posts));

            // Redirect to home page
            window.location.href = 'home.html';
        });
    });

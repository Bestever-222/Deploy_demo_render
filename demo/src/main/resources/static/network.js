// document.addEventListener('DOMContentLoaded', () => {
//         const followButtons = document.querySelectorAll('.suggestions-section .connect-button');


//         followButtons.forEach(button => {
//             button.addEventListener('click', (e) => {
//                 const card = e.target.closest('.card'); // Get the user card
//                 const userName = card.querySelector('h3').innerText; // Get user's name
//                 const userRole = card.querySelector('p').innerText; // Get user's role


//                 // Clone the card to add to My Community
//                 const myCommunityGrid = document.querySelector('.followers-section .card-grid');
//                 const newCard = document.createElement('div');
//                 newCard.classList.add('card');
//                 newCard.innerHTML = `
//                     <img src="assets/profile.jpg" alt="User">
//                     <h3>${userName}</h3>
//                     <p>${userRole}</p>
//                     <button class="connect-button">Message</button>
//                 `;


//                 // Add the cloned card to the My Community grid
//                 myCommunityGrid.appendChild(newCard);


//                 // Remove the original card from Trending Creators
//                 card.remove();
//             });
//         });
//     });


//     //for create new post
//     document.addEventListener('DOMContentLoaded', () => {
//         const openModal = document.getElementById('openCreatePost');
//         const modal = document.getElementById('createPostModal');
//         const closeModal = document.getElementById('closeModal');
//         const cancelPostButton = document.getElementById('cancelPostButton');
//         const createPostForm = document.getElementById('createPostForm');
//         const postMediaInput = document.getElementById('postMedia');
//         const mediaPreview = document.getElementById('mediaPreview');

//         let selectedFiles = []; // To store selected files

//         // Open the modal
//         openModal.addEventListener('click', (e) => {
//             e.preventDefault();
//             modal.classList.remove('hidden');
//             modal.style.display = 'flex'; // Show the modal
//         });

//         // Close the modal
//         const closeModalFunc = () => {
//             modal.classList.add('hidden');
//             modal.style.display = 'none'; // Hide the modal
//             mediaPreview.innerHTML = ''; // Clear media previews
//             selectedFiles = []; // Clear selected files
//         };

//         closeModal.addEventListener('click', closeModalFunc);
//         cancelPostButton.addEventListener('click', closeModalFunc);

//         // Media preview logic
//         postMediaInput.addEventListener('change', (e) => {
//             mediaPreview.innerHTML = ''; // Clear existing previews
//             selectedFiles = Array.from(e.target.files); // Get all selected files

//             selectedFiles.forEach((file) => {
//                 const fileURL = URL.createObjectURL(file); // Create a temporary URL
//                 const previewElement = document.createElement('div');
//                 previewElement.classList.add('preview-item');

//                 if (file.type.startsWith('image/')) {
//                     previewElement.innerHTML = `<img src="${fileURL}" alt="Image Preview">`;
//                 } else if (file.type.startsWith('video/')) {
//                     previewElement.innerHTML = `<video src="${fileURL}" controls></video>`;
//                 }

//                 mediaPreview.appendChild(previewElement);
//             });

//             mediaPreview.classList.remove('hidden'); // Show the preview section
//         });

//         // Handle form submission
//         createPostForm.addEventListener('submit', async (e) => {
//             e.preventDefault();

//             // Get post text
//             const postText = document.getElementById('postText').value;

//             // Convert media files to Base64
//             const mediaFiles = await Promise.all(
//                 selectedFiles.map((file) => {
//                     return new Promise((resolve) => {
//                         const reader = new FileReader();
//                         reader.onload = () => resolve(reader.result);
//                         reader.readAsDataURL(file);
//                     });
//                 })
//             );

//             // Create post object
//             const newPost = {
//                 user: 'Riya', // Example user
//                 role: 'Comedy Content Creator', // Example role
//                 text: postText,
//                 media: mediaFiles, // Array of Base64-encoded files
//             };

//             // Save to localStorage
//             const posts = JSON.parse(localStorage.getItem('posts')) || [];
//             posts.unshift(newPost); // Add the new post to the beginning of the list
//             localStorage.setItem('posts', JSON.stringify(posts));

//             // Redirect to home page
//             window.location.href = 'home.html';
//         });
//     });

//     //chnages by Anjali
// document.addEventListener('DOMContentLoaded', function () {
//     // Fetch username and content from localStorage
//     const loggedInUsername = localStorage.getItem('username');
//     const loggedInContent = localStorage.getItem('content');

//     // Dynamically update the username and content
//     if (loggedInUsername) {
//         document.getElementById('username').textContent = loggedInUsername;
//     }
//     if (loggedInContent) {
//         document.getElementById('content').textContent = loggedInContent;
//     }
// });














// //changes by payal

// Handle follow button actions
// For dynamically moving cards and adding them to 'My Community' section

// document.addEventListener('DOMContentLoaded', () => {
//     const followButtons = document.querySelectorAll('.suggestions-section .connect-button');

//     followButtons.forEach(button => {
//         button.addEventListener('click', async (e) => {
//             const card = e.target.closest('.card'); // Get the user card
//             const userName = card.querySelector('h3').innerText; // Get user's name
//             const userRole = card.querySelector('p').innerText; // Get user's role

            
//                 // Clone the card to add to My Community
//                 const myCommunityGrid = document.querySelector('.followers-section .card-grid');
//                 const newCard = document.createElement('div');
//                 newCard.classList.add('card');
//                 newCard.innerHTML = `
//                     <img src="assets/profile.jpg" alt="User">
//                     <h3>${userName}</h3>
//                     <p>${userRole}</p>
//                     <button class="connect-button">Message</button>
//                 `;


//                 // Add the cloned card to the My Community grid
//                 myCommunityGrid.appendChild(newCard);


//                 // Remove the original card from Trending Creators
//                 card.remove();

//             // Prepare user data for backend
//             const userData = {
//                 name: userName,
//                 role: userRole
//             };

//             try {
//                 // Send user data to backend
//                 const response = await fetch('/api/follow', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(userData)
//                 });

//                 if (response.ok) {
//                     // Clone the card to add to My Community
//                     const myCommunityGrid = document.querySelector('.followers-section .card-grid');
//                     const newCard = document.createElement('div');
//                     newCard.classList.add('card');
//                     newCard.innerHTML = `
//                         <img src="assets/profile.jpg" alt="User">
//                         <h3>${userName}</h3>
//                         <p>${userRole}</p>
//                         <button class="connect-button">Message</button>
//                     `;

//                     // Add the cloned card to the My Community grid
//                     myCommunityGrid.appendChild(newCard);

//                     // Remove the original card from Trending Creators
//                     card.remove();
//                 } else {
//                     console.error('Error following user:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// });

// // Handle modal for creating new posts
// document.addEventListener('DOMContentLoaded', () => {
//     const openModal = document.getElementById('openCreatePost');
//     const modal = document.getElementById('createPostModal');
//     const closeModal = document.getElementById('closeModal');
//     const cancelPostButton = document.getElementById('cancelPostButton');
//     const createPostForm = document.getElementById('createPostForm');
//     const postMediaInput = document.getElementById('postMedia');
//     const mediaPreview = document.getElementById('mediaPreview');

//     let selectedFiles = []; // To store selected files

//     // Open the modal
//     openModal.addEventListener('click', (e) => {
//         e.preventDefault();
//         modal.classList.remove('hidden');
//         modal.style.display = 'flex'; // Show the modal
//     });

//     // Close the modal
//     const closeModalFunc = () => {
//         modal.classList.add('hidden');
//         modal.style.display = 'none'; // Hide the modal
//         mediaPreview.innerHTML = ''; // Clear media previews
//         selectedFiles = []; // Clear selected files
//     };

//     closeModal.addEventListener('click', closeModalFunc);
//     cancelPostButton.addEventListener('click', closeModalFunc);

//     // Media preview logic
//     postMediaInput.addEventListener('change', (e) => {
//         mediaPreview.innerHTML = ''; // Clear existing previews
//         selectedFiles = Array.from(e.target.files); // Get all selected files

//         selectedFiles.forEach((file) => {
//             const fileURL = URL.createObjectURL(file); // Create a temporary URL
//             const previewElement = document.createElement('div');
//             previewElement.classList.add('preview-item');

//             if (file.type.startsWith('image/')) {
//                 previewElement.innerHTML = `<img src="${fileURL}" alt="Image Preview">`;
//             } else if (file.type.startsWith('video/')) {
//                 previewElement.innerHTML = `<video src="${fileURL}" controls></video>`;
//             }

//             mediaPreview.appendChild(previewElement);
//         });

//         mediaPreview.classList.remove('hidden'); // Show the preview section
//     });

//     // Handle form submission
//     createPostForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         // Get post text
//         const postText = document.getElementById('postText').value;

//         // Convert media files to Base64
//         const mediaFiles = await Promise.all(
//             selectedFiles.map((file) => {
//                 return new Promise((resolve) => {
//                     const reader = new FileReader();
//                     reader.onload = () => resolve(reader.result);
//                     reader.readAsDataURL(file);
//                 });
//             })
//         );

//         // Create post object
//         const newPost = {
//             user: 'Riya', // Example user
//             role: 'Comedy Content Creator', // Example role
//             text: postText,
//             media: mediaFiles, // Array of Base64-encoded files
//         };

//         // Save to localStorage
//         const posts = JSON.parse(localStorage.getItem('posts')) || [];
//         posts.unshift(newPost); // Add the new post to the beginning of the list
//         localStorage.setItem('posts', JSON.stringify(posts));

//         // Redirect to home page
//         window.location.href = 'home.html';
//     });
// });

// // Dynamically update username and content from localStorage
// document.addEventListener('DOMContentLoaded', function () {
//     const loggedInUsername = localStorage.getItem('username');
//     const loggedInContent = localStorage.getItem('content');

//     if (loggedInUsername) {
//         document.getElementById('username').textContent = loggedInUsername;
//     }
//     if (loggedInContent) {
//         document.getElementById('content').textContent = loggedInContent;
//     }
// });












//new changes for backend integration
document.addEventListener('DOMContentLoaded', () => {
    const followButtons = document.querySelectorAll('.suggestions-section .connect-button');

    followButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const card = e.target.closest('.card'); // Get the user card
            const userName = card.querySelector('h3').innerText; // Get user's name (e.g., Leo Sketch)
            const userRole = card.querySelector('p').innerText; // Get user's role (e.g., Illustrator)

            // Get logged-in user's details (e.g., user2) from localStorage or session
            const loggedInUsername = localStorage.getItem('username'); // Assumes 'username' is saved during login

            if (!loggedInUsername) {
                console.error('No logged-in user found!');
                return;
            }

            // Prepare user data for backend
            const userData = {
                followerId: loggedInUsername, // The logged-in user following someone
                followedId: userName // The person being followed (e.g., Leo Sketch)
            };

            try {
                // Send user data to backend
                const response = await fetch('/api/demo/follow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    // Add the followed user's card to "My Community"
                    const myCommunityGrid = document.querySelector('.followers-section .card-grid');
                    const newCard = document.createElement('div');
                    newCard.classList.add('card');
                    newCard.innerHTML = `
                        <img src="assets/profile.jpg" alt="User">
                        <h3>${userName}</h3>
                        <p>${userRole}</p>
                        <button class="connect-button">Message</button>
                    `;

                    // Add the cloned card to My Community grid
                    myCommunityGrid.appendChild(newCard);

                    // Remove the original card from Trending Creators
                    card.remove();
                } else {
                    console.error('Error following user:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
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


// Handle modal for creating new posts
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
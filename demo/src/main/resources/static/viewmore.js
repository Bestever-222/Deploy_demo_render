function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Toggle the "community-active" class on the container
    const container = document.querySelector('.container');
    if (sectionId === 'community') {
        container.classList.add('community-active');
    } else {
        container.classList.remove('community-active');
    }
}

function openUploadModal(sectionId) {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'block';
    modal.dataset.section = sectionId;
}

function closeModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

function uploadContent() {
    const sectionId = document.getElementById('uploadModal').dataset.section;
    const fileInput = document.getElementById('fileInput').files[0];
    const urlInput = document.getElementById('urlInput').value.trim();
    const descriptionInput = document.getElementById('descriptionInput').value.trim();

    if (!descriptionInput) {
        alert('Description is required.');
        return;
    }

    const container = document.querySelector(`.${sectionId}-container`);
    const iframeWrapper = document.createElement('div');
    iframeWrapper.classList.add('iframe-wrapper');

    const iframe = document.createElement('iframe');
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    if (fileInput) {
        // Handle file upload
        const fileURL = URL.createObjectURL(fileInput);
        iframe.src = fileURL;
        iframe.width = 560;
        iframe.height = 315;
    } else if (urlInput) {
        // Handle URL input
        if (urlInput.includes('shorts')) {
            iframe.src = urlInput.replace('https://www.youtube.com/shorts/', 'https://www.youtube.com/embed/');
            iframe.width = 200;
            iframe.height = 315;
        } else if (urlInput.includes('playlist?list=')) {
            iframe.src = urlInput.replace('playlist?list=', 'embed/videoseries?list=');
            iframe.width = 560;
            iframe.height = 315;
        } else if (urlInput.includes('watch?v=')) {
            iframe.src = urlInput.replace('watch?v=', 'embed/');
            iframe.width = 560;
            iframe.height = 315;
        } else {
            alert('Invalid URL. Please enter a valid Video, Shorts, or Playlist URL.');
            return;
        }
    } else {
        alert('Please provide a valid file or URL.');
        return;
    }

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('video-description');
    descriptionDiv.innerHTML = `
        <h3>${descriptionInput}</h3>
        <p>Uploaded by <strong>You</strong></p>
        <div class="video-actions">
            <button class="like-btn" data-liked="false" onclick="likeVideo(this)">👍 <span>0</span></button>
            <button class="share-btn" onclick="shareVideo('${iframe.src}')">Share</button>
            <button class="download-btn" onclick="downloadVideo('${iframe.src}')">Download</button>
        </div>
        <div class="three-dots-menu" style="text-align: right;">
            <button onclick="toggleOptions(this)">...</button>
            <div class="options-menu">
                <button onclick="addToQueue('${descriptionInput}', '${iframe.src}')">Add to Queue</button>
                <button onclick="addToWatchLater('${descriptionInput}', '${iframe.src}')">Watch Later</button>
                <button onclick="deleteIframe(this)">Delete</button>
            </div>
        </div>
    `;

    iframeWrapper.appendChild(iframe);
    iframeWrapper.appendChild(descriptionDiv);
    container.appendChild(iframeWrapper);
    closeModal();
}

function likeVideo(button) {
    const likeCount = button.querySelector('span');
    let count = parseInt(likeCount.textContent, 10);
    const liked = button.dataset.liked === 'true';

    button.dataset.liked = !liked;
    likeCount.textContent = liked ? count - 1 : count + 1;
}

function shareVideo(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard: ' + url);
    });
}

function downloadVideo(url) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'video.mp4';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

function addToQueue(description, url) {
    const queueContainer = document.getElementById('queue-container');
    if (!Array.from(queueContainer.children).find(item => item.dataset.url === url)) {
        const item = document.createElement('div');
        item.innerHTML = `<a href="${url}" target="_blank">${description}</a>`;
        item.dataset.url = url;
        queueContainer.appendChild(item);
    } else {
        alert('Already added to Queue');
    }
}

function addToWatchLater(description, url) {
    const watchLaterContainer = document.getElementById('watchlater-container');
    if (!Array.from(watchLaterContainer.children).find(item => item.dataset.url === url)) {
        const item = document.createElement('div');
        item.innerHTML = `<a href="${url}" target="_blank">${description}</a>`;
        item.dataset.url = url;
        watchLaterContainer.appendChild(item);
    } else {
        alert('Already added to Watch Later');
    }
}

function deleteIframe(button) {
    const iframeWrapper = button.closest('.iframe-wrapper');
    const url = iframeWrapper.querySelector('iframe').src;

    ['queue-container', 'watchlater-container'].forEach(containerId => {
        const container = document.getElementById(containerId);
        const item = Array.from(container.children).find(child => child.dataset.url === url);
        if (item) container.removeChild(item);
    });

    iframeWrapper.remove();
    alert('Video deleted');
}

function toggleOptions(button) {
    const optionsMenu = button.nextElementSibling;
    const isVisible = optionsMenu.style.display === 'block';
    document.querySelectorAll('.options-menu').forEach(menu => (menu.style.display = 'none'));
    if (!isVisible) optionsMenu.style.display = 'block';
}

function postToCommunity() {
    const input = document.getElementById('communityInput');
    const postsContainer = document.getElementById('communityPosts');
    const message = input.value.trim();

    if (!message) {
        alert('Please enter a message!');
        return;
    }

    // Create a new post
    const post = document.createElement('div');
    post.classList.add('community-post');
    post.innerHTML = `
        <p>You: ${message}</p>
        <small>Just now</small>
    `;

    // Prepend the new post to the top of the posts container
    postsContainer.prepend(post);

    // Clear the input field
    input.value = '';
}

//Chat room by Anjali
let chatMessages = JSON.parse(localStorage.getItem('chatRoomMessages')) || [];

// Render chat messages
function renderMessages() {
    const chatContainer = document.getElementById('chatMessages');
    chatContainer.innerHTML = chatMessages
        .map((msg, index) => `
            <div class="chat-message">
                <span><strong>${msg.user}:</strong> ${msg.text}</span>
                <button class="delete-btn" onclick="deleteMessage(${index})">Delete</button>
            </div>
        `)
        .join('');
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message
}

// Send a message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        chatMessages.push({ user: 'You', text: message });
        localStorage.setItem('chatRoomMessages', JSON.stringify(chatMessages));
        renderMessages();
        input.value = ''; // Clear the input
    }
}

// Delete a message
function deleteMessage(index) {
    chatMessages.splice(index, 1); // Remove the message at the given index
    localStorage.setItem('chatRoomMessages', JSON.stringify(chatMessages));
    renderMessages();
}


// Auto-refresh chat messages every second
setInterval(() => {
    chatMessages = JSON.parse(localStorage.getItem('chatRoomMessages')) || [];
    renderMessages();
}, 1000);

// Initial render
renderMessages();


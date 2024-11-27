
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Testimonials Slider Logic
const testimonials = document.querySelectorAll('.testimonial');
let current = 0;

if (testimonials.length > 0) {
    setInterval(() => {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === current ? 'block' : 'none';
        });
        current = (current + 1) % testimonials.length;
    }, 3000);
}

// Contact Modal
const contactButton = document.querySelector(".secondary-btn"); // The button
const modal = document.getElementById("contactModal"); // The modal
const closeModal = document.querySelector(".close-btn"); // The close button

// Open the modal when the button is clicked
contactButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  modal.style.display = "flex"; // Show the modal
});

// Close the modal when the close button is clicked
closeModal.addEventListener("click", () => {
  modal.style.display = "none"; // Hide the modal
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"; // Hide the modal
  }
});

// Example event data
const events = [
    {
        date: '2024-11-15', // Format: YYYY-MM-DD
        title: 'Online Session',
        time: '5:00 PM',
        description: 'Live on "Start Career with Content Creation"',
    },
    {
        date: '2024-11-25',
        title: 'Mentorship Meeting',
        time: '3:00 PM',
        description: 'Q&A Session with industry experts.',
    },
    {
        date: '2024-12-07', // Correct Format: YYYY-MM-DD
        title: 'Webinar',
        time: '5:00 PM',
        description: 'Discuss strategies for growing your YouTube channel',
    },
    {
        date: '2025-01-26', // Correct Format: YYYY-MM-DD
        title: 'Online Session',
        time: '7:00 PM',
        description: 'video editing techniques for beginners',
    },
];

const calendarDates = document.getElementById("calendar-dates");
const currentMonthYear = document.getElementById("current-month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Set the header
    currentMonthYear.textContent = date.toLocaleString("default", { month: "long", year: "numeric" });

    // Clear previous calendar dates
    calendarDates.innerHTML = "";

    // Get the first day and the total days of the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("empty");
        calendarDates.appendChild(emptyCell);
    }

    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;

        // Format date as YYYY-MM-DD
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Highlight today's date
        const today = new Date();
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayCell.classList.add("today");
        }

        // Highlight event dates and add tooltip
        const event = events.find((e) => e.date === formattedDate);
        if (event) {
            dayCell.classList.add("event-date");

            // Create a tooltip for the event
            const tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");
            tooltip.innerHTML = `
                <strong>${event.title}</strong><br>
                ${event.time}<br>
                ${event.description}
            `;
            dayCell.appendChild(tooltip);

            // Add click event to toggle the tooltip
            dayCell.addEventListener("click", (e) => {
                // Close all other open tooltips
                document.querySelectorAll('.event-date.active').forEach((activeDate) => {
                    activeDate.classList.remove('active');
                });

                // Show tooltip for the clicked date
                dayCell.classList.add('active');
                e.stopPropagation(); // Prevent propagation to avoid closing tooltip immediately
            });
        }

        calendarDates.appendChild(dayCell);
    }
}

// Close tooltips when clicking outside
document.addEventListener("click", () => {
    document.querySelectorAll('.event-date.active').forEach((activeDate) => {
        activeDate.classList.remove('active');
    });
});

// Add event listeners for navigation
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Initialize the calendar
renderCalendar(currentDate);


// Chatbox functionality
const chatbox = document.querySelector('.chatbox');
const chatInput = document.getElementById('chat-input');
const chatBody = document.getElementById('chat-body');
const sendChatButton = document.getElementById('send-chat');
const closeChatButton = document.getElementById('close-chat');

// Predefined responses based on intents
const intentResponses = {
    greeting: [
        "Hi there! How can I assist you today?",
        "Hello! What can I do for you?",
    ],
    help: [
        "Sure, I'm here to help. Please provide more details.",
        "Let me assist you. What do you need help with?",
    ],
    content: [
        "Content creation is a great skill! Are you looking for tips?",
        "We offer workshops on content creation. Would you like to join?",
    ],
    thanks: [
        "You're welcome! Let me know if you need anything else.",
        "Happy to help! Have a great day.",
    ],
    default: [
        "I'm not sure I understand. Can you rephrase that?",
        "Hmm, I don't have an answer for that. Can you provide more details?",
    ],
};

// Function to determine the intent and get a response
function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("hello")) {
        return getRandomResponse(intentResponses.greeting);
    } else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("assist")) {
        return getRandomResponse(intentResponses.help);
    } else if (lowerCaseMessage.includes("content")) {
        return getRandomResponse(intentResponses.content);
    } else if (lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank you")) {
        return getRandomResponse(intentResponses.thanks);
    } else {
        return getRandomResponse(intentResponses.default);
    }
}

// Function to get a random response from a response array
function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Function to add messages to the chat body
function addMessage(message, sender = 'user') {
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('chat-message', sender);
    messageBubble.textContent = message;
    chatBody.appendChild(messageBubble);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to the latest message
}

// Handle user sending a message
sendChatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        // Add the user's message to the chat
        addMessage(message, 'user');

        // Clear the input field
        chatInput.value = '';

        // Simulate a delay and then add a system reply
        setTimeout(() => {
            const reply = getResponse(message); // Get response based on user input
            addMessage(reply, 'system');
        }, 1000); // 1-second delay for realism
    }
});

// Close chatbox functionality
closeChatButton.addEventListener('click', () => {
    chatbox.classList.toggle('hide');
});


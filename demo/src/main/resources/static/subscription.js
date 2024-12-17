// Mentor data
const mentors = [
    {
        id: 1,
        name: "Sarah Johnson",
        expertise: "Content Strategy & YouTube Growth",
        price: 99,
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4.9,
    },
    {
        id: 2,
        name: "Bhuvan Bam",
        expertise: "Top content creator & Mentor",
        price: 149,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc0LEd_EI-FUmqhwJdDodhZmG1tLU6bny9eQ&s",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Emma Wilson",
        expertise: "Social Media Marketing",
        price: 79,
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4.7,
    },
];

let selectedPlan = null;
let selectedMentor = null;

// DOM Elements
const mentorModal = document.getElementById('mentorModal');
const paymentModal = document.getElementById('paymentModal');
const mentorGrid = document.getElementById('mentorGrid');
const paymentForm = document.getElementById('paymentForm');
const closeButtons = document.querySelectorAll('.close');

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        mentorModal.style.display = 'none';
        paymentModal.style.display = 'none';
    });
});

// Close modal on clicking outside
window.addEventListener('click', (e) => {
    if (e.target === mentorModal) mentorModal.style.display = 'none';
    if (e.target === paymentModal) paymentModal.style.display = 'none';
});

// Show mentor modal
function showMentorModal(plan) {
    selectedPlan = plan;
    mentorModal.style.display = 'flex';
    displayMentors();
}

// Display mentor cards
function displayMentors() {
    mentorGrid.innerHTML = mentors.map(mentor => `
        <div class="mentor-card" onclick="selectMentor(${mentor.id})">
            <img src="${mentor.image}" alt="${mentor.name}">
            <h3>${mentor.name}</h3>
            <p>${mentor.expertise}</p>
            <div class="mentor-rating">
                ${'★'.repeat(Math.floor(mentor.rating))}
                <span class="rating-number">${mentor.rating}</span>
            </div>
            <p class="price">$${mentor.price}/month</p>
        </div>
    `).join('');
}

// Select a mentor and proceed to payment modal
function selectMentor(mentorId) {
    selectedMentor = mentors.find(m => m.id === mentorId);
    mentorModal.style.display = 'none';
    paymentModal.style.display = 'flex';
    updatePaymentModal(selectedMentor);
}

// Update payment modal dynamically
function updatePaymentModal(mentor) {
    document.getElementById('mentorName').innerText = mentor.name;
    document.getElementById('subscriptionPrice').innerText = `$${mentor.price}`;
    document.getElementById('payAmount').innerText = `$${mentor.price}`;
}

// Handle payment form submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const cardData = {
        name: formData.get('cardName'),
        number: formData.get('cardNumber'),
        expiry: formData.get('expiry'),
        cvv: formData.get('cvv'),
    };

    processPayment(cardData).then(response => {
        if (response.success) {
            alert('Payment successful! Redirecting to your dashboard...');
            window.location.href = 'mentoring.html';
        } else {
            alert('Payment failed. Please try again.');
        }
    });
});

// Simulate payment processing
function processPayment(cardData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1500);
    });
}

// Input formatting
document.getElementById('cardNumber').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
});
document.getElementById('expiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});
document.getElementById('cvv').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
});

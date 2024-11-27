document.addEventListener("DOMContentLoaded", function() {
    // Redirect to home.html after 7 seconds with fade-out effect
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        splashScreen.style.transition = "opacity 1.5s ease";
        splashScreen.style.opacity = 0;

        // Allow the fade-out effect to complete before redirecting
        setTimeout(() => {
            window.location.href = "home.html";
        }, 1500); // 1.5 seconds for fade-out
    }, 7000); // 7 seconds before starting fade-out
});

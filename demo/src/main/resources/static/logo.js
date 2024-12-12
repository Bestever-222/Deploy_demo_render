document.addEventListener("DOMContentLoaded", function () {
    // Redirect to home.html after 7 seconds with fade-out effect
    setTimeout(() => {
        const splashScreen = document.getElementById("splash-screen");
        splashScreen.style.transition = "opacity 1.5s ease";
        splashScreen.style.opacity = 0;

        // Allow the fade-out effect to complete before redirecting
        setTimeout(() => {
            // Fetch username and content from localStorage
            const username = localStorage.getItem("username");
            const content = localStorage.getItem("content");

            // Redirect to home.html with username and content as query parameters
            const queryParams = `?username=${encodeURIComponent(username)}&content=${encodeURIComponent(content)}`;
            window.location.href = `home.html${queryParams}`;
        }, 1500); // 1.5 seconds for fade-out
    }, 7000); // 7 seconds before starting fade-out
});
console.log("logo");
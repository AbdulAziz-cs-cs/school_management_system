document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value;
    const errorBox = document.getElementById("errorMessage");

    errorBox.style.display = "none";

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Invalid username or password");
        }

        const result = await response.json();

        // Store login state
        localStorage.setItem("isLoggedIn", "true");
        if (result.token) {
            localStorage.setItem("authToken", result.token);
        }

        // Navigate to dashboard
        window.location.href = "/home.html";

    } catch (err) {
        errorBox.textContent = err.message;
        errorBox.style.display = "block";
    }
});

const loginScreen = document.querySelector("#loginScreen");
const signupScreen = document.querySelector("#signupScreen");

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

const loginMessage = document.querySelector("#loginMessage");
const signupMessage = document.querySelector("#signupMessage");

const signupPassword = document.querySelector("#signupPassword");
const confirmPassword = document.querySelector("#confirmPassword");

const strengthBar = document.querySelector("#strengthBar");
const strengthText = document.querySelector("#strengthText");

// Switch between login and account creation.
function showScreen(screen) {
    const isSignup = screen === "signup";

    loginScreen.hidden = isSignup;
    signupScreen.hidden = !isSignup;

    loginMessage.textContent = "";
    signupMessage.textContent = "";

    history.replaceState(
        null,
        "",
        isSignup ? "#signup" : "#login"
    );
}

document.querySelector("#showSignup").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen("signup");
});

document.querySelector("#showLogin").addEventListener("click", (event) => {
    event.preventDefault();
    showScreen("login");
});

// Open the appropriate screen when using a URL hash.
function handleHash() {
    showScreen(location.hash === "#signup" ? "signup" : "login");
}

window.addEventListener("hashchange", handleHash);

// Show or hide any password field.
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        const showing = input.type === "text";

        input.type = showing ? "password" : "text";
        button.textContent = showing ? "Show" : "Hide";
        button.setAttribute(
            "aria-label",
            showing ? "Show password" : "Hide password"
        );
    });
});

// Login form validation.
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginMessage.textContent = "";

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    loginMessage.textContent =
        "Form validated successfully! This is a demo; no account was accessed.";
    loginMessage.style.color = "#a7f3d0";
});

// Calculate a basic password strength score.
function calculateStrength(value) {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^a-zA-Z0-9]/.test(value)) score++;

    return score;
}

signupPassword.addEventListener("input", () => {
    const score = calculateStrength(signupPassword.value);

    const levels = [
        { text: "Enter a password", color: "transparent" },
        { text: "Weak password", color: "#fb7185" },
        { text: "Fair password", color: "#fbbf24" },
        { text: "Good password", color: "#38bdf8" },
        { text: "Strong password", color: "#34d399" }
    ];

    const level = levels[score];

    strengthBar.style.width = `${score * 25}%`;
    strengthBar.style.backgroundColor = level.color;
    strengthText.textContent = `Password strength: ${level.text}`;
});

// Check that both password fields match.
confirmPassword.addEventListener("input", () => {
    if (
        confirmPassword.value &&
        confirmPassword.value !== signupPassword.value
    ) {
        confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
        confirmPassword.setCustomValidity("");
    }
});

signupPassword.addEventListener("input", () => {
    confirmPassword.setCustomValidity(
        confirmPassword.value &&
            confirmPassword.value !== signupPassword.value
            ? "Passwords do not match."
            : ""
    );
});

// Create account form validation.
signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupMessage.textContent = "";

    if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
    }

    signupMessage.textContent =
        "All fields validated! This demo does not create or save an account.";
    signupMessage.style.color = "#a7f3d0";
});

// Initialize the correct screen.
handleHash();

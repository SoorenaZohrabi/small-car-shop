document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = false; // Login page default; update after login success
    const loginBtn = document.querySelector(".login-btn");
    const userProfile = document.querySelector(".user-profile");

    if (isLoggedIn) {
        loginBtn.classList.add("d-none");
        userProfile.classList.remove("d-none");
    } else {
        loginBtn.classList.remove("d-none");
        userProfile.classList.add("d-none");
    }

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            loginBtn.classList.remove("d-none");
            userProfile.classList.add("d-none");
        });
    }
});

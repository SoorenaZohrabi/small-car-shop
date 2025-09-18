import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = loadData('currentUser');

    if (currentUser && currentUser.username) {
        // Show profile dropdown
        document.querySelector('.user-profile')?.classList.remove('d-none');

        // Update name
        const nameSpan = document.querySelector('.user-profile span');
        if (nameSpan) {
            nameSpan.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        }

        // Hide login button
        document.querySelector('.login-btn')?.classList.add('d-none');

        // ✅ Show admin link if user is admin
        if (currentUser.role === "admin") {
            document.querySelector('.admin-link')?.classList.remove('d-none');
        }
    }
});

// for logout
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove current user from localStorage
            localStorage.removeItem('currentUser');

            // Redirect to homepage or reload
            window.location.href = './../index.html'; // or use window.location.reload();
        });
    }
});
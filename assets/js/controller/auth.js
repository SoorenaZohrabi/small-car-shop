import { loadData } from './../storage/storage.js';

export function initializeUserSession() {
    // User state
    const currentUser = loadData('currentUser');

    if (currentUser && currentUser.username) {
        document.querySelector('.user-profile')?.classList.remove('d-none');

        const nameSpan = document.querySelector('.user-profile span');

        if (nameSpan) {
            nameSpan.textContent =
                `${currentUser.firstName} ${currentUser.lastName}`;
        }

        document.querySelector('.login-btn')?.classList.add('d-none');

        if (currentUser.role === 'admin') {
            document.querySelector('.admin-link')?.classList.remove('d-none');
        }
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();

            localStorage.removeItem('currentUser');
            window.location.href = './../index.html';
        });
    }
}
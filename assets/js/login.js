import Customer from './ntt/Customer.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Check if users already exist
if (!localStorage.getItem('users')) {
    const initialUsers = [
        new Customer(1, 'Soorena', 'Zohrabi', 'soor', 'soor@example.com', '1234'),
    ];

    saveData('users', initialUsers);
}
// for sign up
document.getElementById('signup-tab').addEventListener('click', () => {
    document.getElementById('signup').querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const id = generateUUID(); // e.g., "f47ac10b-58cc-4372-a567-0e02b2c3d479"
        const firstName = document.getElementById('signup-firstname').value.trim();
        const lastName = document.getElementById('signup-lastname').value.trim();
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        // Create new user
        const users = loadData('users');
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            alert('Username already taken!');
            return;
        }
        const newUser = new Customer(id, firstName, lastName, username, email, password);
        users.push(newUser);
        saveData('users', users);

        // Optionally store logged-in user
        saveData('currentUser', newUser);

        // Redirect to main page
        window.location.href = './../../index.html';
    });
});
// for sign in
document.querySelector('#signin form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signin-username').value.trim();
    const password = document.getElementById('signin-password').value.trim();

    const users = loadData('users');

    const matchedUser = users.find(
        user => user.username === username && user.password === password
    );

    if (!matchedUser) {
        alert('Invalid username or password.');
        return;
    }

    // Save logged-in user
    saveData('currentUser', matchedUser);

    // Redirect to main page
    window.location.href = './../../index.html';
});

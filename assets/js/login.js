import Customer from './ntt/Customer.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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

        // Validate if fields are empty
        let errors = [];
        if (!firstName) errors.push("First name is required.");
        if (!lastName) errors.push("Last name is required.");
        if (!username) errors.push("Username is required.");
        if (!email) errors.push("Email is required.");
        if (!password) errors.push("Password is required.");
        if (errors.length > 0) {
            alert(errors.join("\n"));
            // Optionally return false to prevent form submission
            return false;
        }

        // Create new user
        const users = loadData('users');
        let role = "admin";
        if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            alert('Username already taken!');
            return;
        }
        if (username.toLowerCase() === "soorena17" || username.toLowerCase() === "arshavin") {
            role = "admin";
        } else {
            role = "customer";
        }
        const newUser = new Customer(id, firstName, lastName, username, email, password, role);
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
    if (matchedUser.role === "admin") {
        window.location.href = "./../pages/admin.html";
    } else {
        window.location.href = "./../index.html";
    }
});

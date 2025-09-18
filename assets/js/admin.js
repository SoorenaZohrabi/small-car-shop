import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = loadData('currentUser');
    if (!currentUser || currentUser.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "./../index.html";
    }
});
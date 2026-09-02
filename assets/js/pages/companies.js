import { initializeUserSession } from "./../auth.js";
import { renderCompanies } from "./../UI/companyUI.js";

document.addEventListener('DOMContentLoaded', () => {
    initializeUserSession();
    renderCompanies();
});
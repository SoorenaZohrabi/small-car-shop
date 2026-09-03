import { initializeUserSession } from "./../controller/auth.js";
import { renderCompanies } from "./../UI/companyRender.js";

document.addEventListener('DOMContentLoaded', () => {
    initializeUserSession();
    renderCompanies();
});
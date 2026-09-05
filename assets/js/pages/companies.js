import { initializeUserSession } from "./../controller/auth.js";
import { renderCompanies } from "./../UI/companyRender.js";
import { renderFooter } from "./../UI/footerRender.js";

document.addEventListener('DOMContentLoaded', () => {
    initializeUserSession();
    renderCompanies();
    renderFooter();
});
import { initializeCompanies } from "../database/companydata.js";
import { loadData } from "./../storage.js";
import { loadAndRenderCars } from "./../UI/carUI.js";
import { renderCompanies } from "./../UI/companyUI.js";
import { initializeUserSession } from "./../auth.js";
import { initializeCars } from "./../database/carsdata.js";

document.addEventListener("DOMContentLoaded", () => {
    if (loadData('companies').length === 0 && loadData('cars').length === 0) {
        initializeCompanies();
        initializeCars();
    }
    initializeUserSession();
    loadAndRenderCars(3);
    renderCompanies();
});
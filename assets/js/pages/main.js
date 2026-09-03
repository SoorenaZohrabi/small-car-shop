import { initializeCompanies } from "./../database/companydata.js";
import { loadData } from "./../storage/storage.js";
import { loadAndRenderCars } from "./../UI/carRender.js";
import { renderCompanies } from "./../UI/companyRender.js";
import { initializeUserSession } from "./../controller/auth.js";
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
import Company from './../ntt/Company.js';
import { saveData } from './../storage.js';
import { generateUUID } from "./../generateUUID.js";

function initializeCompanies() {
    const companies = [
        new Company(generateUUID(), "Tesla", "3500 Deer Creek Road, Palo Alto, CA", "+1 (650) 681-5000", "Innovative electric vehicles and autonomous driving."),
        new Company(generateUUID(), "Toyota", "6565 Headquarters Dr, Plano, TX", "+1 (469) 292-4000", "Reliable and fuel-efficient vehicles for all lifestyles."),
        new Company(generateUUID(), "Mercedes-Benz", "1 Mercedes-Benz Dr, Sandy Springs, GA", "+1 (770) 705-0600", "Luxury vehicles with cutting-edge technology."),
        new Company(generateUUID(), "Porsche", "1 Porsche Dr, Atlanta, GA", "+1 (800) 767-7243", "High-performance sports cars and luxury SUVs."),
        new Company(generateUUID(), "BMW", "300 Chestnut Ridge Rd, Woodcliff Lake, NJ", "+1 (800) 831-1117", "Premium driving experience with German engineering.")
    ];

    saveData('companies', companies);
}

document.addEventListener('DOMContentLoaded', initializeCompanies);
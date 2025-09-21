import Company from './../ntt/Company.js';
import { saveData, loadData } from './../storage.js';
import { generateUUID } from "./../generateUUID.js";

function initializeCompanies() {
    const existing = loadData('companies');
    if (existing.length > 0) return; // Avoid overwriting if already saved

    const companies = [
        new Company(generateUUID(), "BlueDrive Motors", "123 Innovation Blvd, San Francisco, CA", "+1 (415) 555-0198", "Specializes in electric vehicle fleets."),
        new Company(generateUUID(), "Skyline Rentals", "456 Metro Ave, New York, NY", "+1 (212) 555-0456", "Premium car rentals for travelers."),
        new Company(generateUUID(), "EcoFleet Logistics", "789 Greenway Rd, Austin, TX", "+1 (512) 555-0789", "Eco-friendly delivery vehicles."),
        new Company(generateUUID(), "UrbanMotion", "321 City Center Dr, Chicago, IL", "+1 (312) 555-0345", "Compact and hybrid car options."),
        new Company(generateUUID(), "GlobalAuto Partners", "654 International Pkwy, Miami, FL", "+1 (305) 555-0623", "Commercial vehicles and fleet services.")
    ];

    saveData('companies', companies);
}

document.addEventListener('DOMContentLoaded', initializeCompanies);
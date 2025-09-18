import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    renderAvailableCars();
    renderPartnerCompanies();
});

function renderAvailableCars() {
    const cars = loadData('cars');
    const container = document.getElementById('availableCarsContainer');

    if (cars.length === 0) {
        container.innerHTML = `<p class="empty-message">No cars available.</p>`;
        return;
    }

    container.innerHTML = cars.slice(0, 6).map(car => `
        <div class="col-md-4 mb-4">
            <div class="card ${car.Class.toLowerCase()}">
                <div class="card-body">
                    <h5 class="card-title">${car.name}</h5>
                    <p class="card-text"><strong>Model:</strong> ${car.model}</p>
                    <p class="card-text"><strong>Color:</strong> ${car.color}</p>
                    <p class="card-text"><strong>Price:</strong> ${car.price}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPartnerCompanies() {
    const companies = loadData('companies');
    const container = document.getElementById('partnerCompaniesContainer');

    if (companies.length === 0) {
        container.innerHTML = `<p class="empty-message">No partner companies found.</p>`;
        return;
    }

    container.innerHTML = companies.slice(0, 6).map(c => `
        <div class="col-md-4 mb-4">
            <div class="card company-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${c.name}</h5>
                    <p class="card-text">${c.info}</p>
                    <a href="cars.html?companyId=${c.id}" class="btn btn-outline-primary">View Cars</a>
                </div>
            </div>
        </div>
    `).join('');
}

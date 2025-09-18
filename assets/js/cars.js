import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const companyId = urlParams.get('companyId');

    const cars = loadData('cars').filter(car => car.companyId === companyId);
    const container = document.getElementById('companyCarsContainer');

    if (cars.length === 0) {
        container.innerHTML = `<p class="empty-message">No cars available for this company.</p>`;
        return;
    }

    container.innerHTML = cars.map(car => `
        <div class="col-md-4">
            <div class="card ${car.Class.toLowerCase()}">
                <div class="card-body">
                    <h5 class="card-title">${car.name}</h5>
                    <p class="card-text"><strong>Model:</strong> ${car.model}</p>
                    <p class="card-text"><strong>Class:</strong> ${car.Class}</p>
                    <p class="card-text"><strong>Color:</strong> ${car.color}</p>
                    <p class="card-text"><strong>Price:</strong> ${car.price}</p>
                </div>
            </div>
        </div>
    `).join('');
});

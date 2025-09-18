import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const cars = loadData('cars');
    const container = document.getElementById('allCarsContainer');

    if (cars.length === 0) {
        container.innerHTML = `<p class="empty-message">No cars available.</p>`;
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

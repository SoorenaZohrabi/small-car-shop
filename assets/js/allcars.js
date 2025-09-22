import ElectricCar from "./ntt/ElectricCar.js";
import GasolineCar from "./ntt/GasolineCar.js";
import { loadData, saveData } from "./storage.js";

const allCarsContainer = document.getElementById("allCarsContainer");
const storageKey = "cars";
const shopKey = "shopItems";

function renderCarCard(car) {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";

    const isElectric = car.hasOwnProperty("chargingTime");
    const iconType = isElectric
        ? `<i class="bi bi-lightning-charge-fill text-success" title="Electric Car"></i>`
        : `<i class="bi bi-fuel-pump-fill text-danger" title="Gasoline Car"></i>`;
    const detailsUrl = `car-details.html?id=${car.id}`;

    card.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${car.image}" class="card-img-top" alt="${car.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title">${car.name} (${car.model})</h5>
                    <span class="fs-4">${iconType}</span>
                </div>
                <p class="card-text"><strong>Class:</strong> ${car.Class}</p>
                <p class="card-text"><strong>Color:</strong> ${car.color}</p>
                <p class="card-text"><strong>Price:</strong> $${car.price.toLocaleString()}</p>
                ${isElectric
            ? `<p class="card-text"><strong>Battery:</strong> ${car.batteryType}, ${car.drivingRange}km range</p>
                       <p class="card-text"><strong>Charging:</strong> ${car.chargingTime} hrs</p>
                       <p class="card-text"><strong>Performance:</strong> ${car.performance}</p>`
            : `<p class="card-text"><strong>Fuel:</strong> ${car.fuelType} (${car.fuelGrade})</p>
                       <p class="card-text"><strong>Engine:</strong> ${car.engineType}, ${car.engineSize}L</p>`
        }
                <button class="btn btn-primary w-100 mt-2 add-to-shop">Add to Shop</button>
                <a href="${detailsUrl}" class="btn btn-outline-secondary w-100 mt-2">More</a>
            </div>
            <div class="card-footer bg-peach">
                <h6>Reviews</h6>
                <p class="text-muted">No reviews yet.</p>
            </div>
        </div>
    `;

    card.querySelector(".add-to-shop").addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const shopItems = loadData(shopKey);
        shopItems.push(car);
        saveData(shopKey, shopItems);
        alert(`${car.name} added to shop!`);
    });

    allCarsContainer.appendChild(card);
}

export function loadAndRenderCars(carsCount, limitedCars) {
    if (carsCount) {
        const rawCars = loadData(storageKey);
        limitedCars = rawCars.slice(0, carsCount);
    } else if (!carsCount && !limitedCars) {
        const rawCars = loadData(storageKey);
        limitedCars = rawCars;
    } else {
        const rawCompany = loadData('selectedCompany');
        limitedCars = rawCompany.cars;
        console.log(limitedCars);
    }
    
    limitedCars.forEach(car => {
        let carInstance;
        if (car.hasOwnProperty("chargingTime")) {
            carInstance = new ElectricCar(
                car.id, car.name, car.model, car.Class, car.color, car.price,
                car.chargingTime, car.drivingRange, car.batteryType, car.performance, car.image
            );
        } else {
            carInstance = new GasolineCar(
                car.id, car.name, car.model, car.Class, car.color, car.price,
                car.fuelType, car.engineType, car.engineSize, car.fuelGrade, car.image
            );
        }
        console.log(car.id);
        renderCarCard(carInstance);
    });
}

if (window.location.pathname.includes("allcars.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        loadAndRenderCars(0);
    });
}

import { renderCompaniesList, updateCompanyDropdowns } from "./../UI/adminCompanyRender.js";
import { generateUUID } from "./../utils/generateUUID.js";
import Company from "./../models/Company.js";
import GasolineCar from "./../models/GasolineCar.js";
import ElectricCar from "./../models/ElectricCar.js";
import { loadData, saveData } from "./../storage/storage.js";

const addCompanyForm = document.getElementById('addCompanyForm');
const gasCompanySelect = document.getElementById('gasCompanyName');
const electricCompanySelect = document.getElementById('electricCompanyName');
const addGasolineCarForm = document.getElementById('addGasolineCarForm');
const addElectricCarForm = document.getElementById('addElectricCarForm');

export function renderCarsList() {
    const carsContainer = document.getElementById('cars-list');
    const allCars = loadData('cars');
    carsContainer.innerHTML = '';

    if (allCars.length === 0) {
        carsContainer.innerHTML = '<p>No cars added yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    table.innerHTML = `
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Class</th>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Company</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${allCars.map(car => `
                    <tr data-id="${car.id}" >
                        <td>${car.type}</td>
                        <td><input type="text" class="form-control form-name" value="${car.name}"></td>
                        <td><input type="text" class="form-control form-model" value="${car.model}"></td>
                        <td><input type="text" class="form-control form-class" value="${car.Class}"></td>
                        <td><input type="text" class="form-control form-color" value="${car.color}"></td>
                        <td><input type="number" class="form-control form-price" value="${car.price}"></td>
                        <td>${car.company}</td>
                        <td>
                            <button class="btn btn-sm btn-success btn-save">Save</button>
                            <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

    carsContainer.appendChild(table);

    // Save car edits
    carsContainer.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const carId = row.dataset.id;
            const cars = loadData('cars');
            const car = cars.find(c => c.id === carId);

            if (car) {
                car.name = row.querySelector('.form-name').value.trim();
                car.model = row.querySelector('.form-model').value.trim();
                car.Class = row.querySelector('.form-class').value.trim();
                car.color = row.querySelector('.form-color').value.trim();
                car.price = parseFloat(row.querySelector('.form-price').value);
                saveData('cars', cars);
                renderCarsList();
                alert('Car updated!');
            }
        });
    });

    // Delete car
    carsContainer.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const carId = row.dataset.id;
            let cars = loadData('cars');
            const car = cars.find(c => c.id === carId);
            if (car) {
                cars = cars.filter(c => c.id !== carId);
                saveData('cars', cars)
                renderCarsList();
                alert('Car deleted!');
            }
        });
    });
}

addCompanyForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('companyName').value.trim();
    const address = document.getElementById('companyAddress').value.trim();
    const tel = document.getElementById('companyTel').value.trim();
    const info = document.getElementById('companyInfo').value.trim();

    if (!name || !address || !tel) {
        alert('Please fill in all required fields.');
        return;
    }

    const companies = loadData('companies');
    if (companies.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        alert('A company with this name already exists.');
        return;
    }

    const newCompany = new Company(generateUUID(), name, address, tel, info);
    companies.push(newCompany);
    saveData('companies', companies);

    addCompanyForm.reset();
    alert('Company added successfully!');
    updateCompanyDropdowns(companies);
    renderCompaniesList(companies);
    renderCarsList();
});

addGasolineCarForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newCar = new GasolineCar(
        generateUUID(),
        document.getElementById('gasName').value.trim(),
        document.getElementById('gasModel').value.trim(),
        document.getElementById('gasClass').value.trim(),
        document.getElementById('gasColor').value.trim(),
        parseFloat(document.getElementById('gasPrice').value),
        gasCompanySelect.value.trim(),
        document.getElementById('fuelType').value.trim(),
        document.getElementById('engineType').value.trim(),
        document.getElementById('engineSize').value.trim(),
        document.getElementById('fuelGrade').value.trim(),
        document.getElementById('gasImage').value.trim() || 'default-gas.jpg'
    );

    const companies = loadData('companies');
    const cars = loadData('cars');
    if (newCar) {
        cars.push(newCar);
        saveData('cars', cars)
        addGasolineCarForm.reset();
        alert('Gasoline car added!');
        renderCarsList();
        renderCompaniesList(companies);
    }
});

addElectricCarForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newCar = new ElectricCar(
        generateUUID(),
        document.getElementById('electricName').value.trim(),
        document.getElementById('electricModel').value.trim(),
        document.getElementById('electricClass').value.trim(),
        document.getElementById('electricColor').value.trim(),
        parseFloat(document.getElementById('electricPrice').value),
        electricCompanySelect.value.trim(),
        document.getElementById('chargingTime').value.trim(),
        document.getElementById('drivingRange').value.trim(),
        document.getElementById('batteryType').value.trim(),
        document.getElementById('performance').value.trim(),
        document.getElementById('electricImage').value.trim() || 'default-electric.jpg'
    );

    const companies = loadData('companies');
    const cars = loadData('cars');
    if (newCar) {
        cars.push(newCar);
        saveData('cars', cars);
        addElectricCarForm.reset();
        alert('Electric car added!');
        renderCarsList();
        renderCompaniesList(companies);
    }
});
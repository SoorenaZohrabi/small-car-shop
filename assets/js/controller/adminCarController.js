import { renderCompaniesList, updateCompanyDropdowns } from "./companyRender.js";
import { generateUUID } from "../utils/generateUUID.js";
import Company from "../models/Company.js";
import { loadData, saveData } from "../storage/storage.js";

const addCompanyForm = document.getElementById('addCompanyForm');
const gasCompanySelect = document.getElementById('gasCompanyName');
const electricCompanySelect = document.getElementById('electricCompanyName');
const addGasolineCarForm = document.getElementById('addGasolineCarForm');
const addElectricCarForm = document.getElementById('addElectricCarForm');

export function renderCarsList() {
    const carsContainer = document.getElementById('cars-list');
    const companies = loadData('companies');
    carsContainer.innerHTML = '';

    const allCars = companies.flatMap(company =>
        company.cars.map(car => ({
            ...car,
            companyId: company.id,
            companyName: company.name
        }))
    );

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
                    <tr data-id="${car.id}" data-company="${car.companyId}">
                        <td>${car.type}</td>
                        <td><input type="text" class="form-control form-name" value="${car.name}"></td>
                        <td><input type="text" class="form-control form-model" value="${car.model}"></td>
                        <td><input type="text" class="form-control form-class" value="${car.class}"></td>
                        <td><input type="text" class="form-control form-color" value="${car.color}"></td>
                        <td><input type="number" class="form-control form-price" value="${car.price}"></td>
                        <td>${car.companyName}</td>
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
            const companyId = row.dataset.company;
            const companies = loadData('companies');
            const company = companies.find(c => c.id === companyId);
            const car = company?.cars.find(c => c.id === carId);
            if (car) {
                car.name = row.querySelector('.form-name').value.trim();
                car.model = row.querySelector('.form-model').value.trim();
                car.class = row.querySelector('.form-class').value.trim();
                car.color = row.querySelector('.form-color').value.trim();
                car.price = parseFloat(row.querySelector('.form-price').value);
                saveData('companies', companies);
                renderCompaniesList(companies);
                alert('Car updated!');
            }
        });
    });

    // Delete car
    carsContainer.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = btn.closest('tr');
            const carId = row.dataset.id;
            const companyId = row.dataset.company;
            const companies = loadData('companies');
            const company = companies.find(c => c.id === companyId);
            if (company) {
                company.cars = company.cars.filter(c => c.id !== carId);
                saveData('companies', companies);
                renderCompaniesList(companies);
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

    const car = {
        id: generateUUID(),
        type: 'gasoline',
        name: document.getElementById('gasName').value.trim(),
        model: document.getElementById('gasModel').value.trim(),
        class: document.getElementById('gasClass').value.trim(),
        color: document.getElementById('gasColor').value.trim(),
        price: parseFloat(document.getElementById('gasPrice').value),
        fuelType: document.getElementById('fuelType').value.trim(),
        engineType: document.getElementById('engineType').value.trim(),
        engineSize: document.getElementById('engineSize').value.trim(),
        fuelGrade: document.getElementById('fuelGrade').value.trim(),
        image: document.getElementById('gasImage').value.trim() || 'default-gas.jpg'
    };

    const companyId = gasCompanySelect.value;
    const companies = loadData('companies');
    const company = companies.find(c => c.id === companyId);
    if (company) {
        company.cars.push(car);
        saveData('companies', companies);
        addGasolineCarForm.reset();
        alert('Gasoline car added!');
        renderCompaniesList(companies);
        renderCarsList();
    }
});

addElectricCarForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const car = {
        id: generateUUID(),
        type: 'electric',
        name: document.getElementById('electricName').value.trim(),
        model: document.getElementById('electricModel').value.trim(),
        class: document.getElementById('electricClass').value.trim(),
        color: document.getElementById('electricColor').value.trim(),
        price: parseFloat(document.getElementById('electricPrice').value),
        chargingTime: document.getElementById('chargingTime').value.trim(),
        drivingRange: document.getElementById('drivingRange').value.trim(),
        batteryType: document.getElementById('batteryType').value.trim(),
        performance: document.getElementById('performance').value.trim(),
        image: document.getElementById('electricImage').value.trim() || 'default-electric.jpg'
    };

    const companyId = electricCompanySelect.value;
    const companies = loadData('companies');
    const company = companies.find(c => c.id === companyId);
    if (company) {
        company.cars.push(car);
        saveData('companies', companies);
        addElectricCarForm.reset();
        alert('Electric car added!');
        renderCompaniesList(companies);
        renderCarsList();
    }
});
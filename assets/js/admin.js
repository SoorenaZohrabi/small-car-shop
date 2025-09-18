import Company from './ntt/Company.js';
import Car from './ntt/Car.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Add Company
document.getElementById('companyForm').addEventListener('submit', e => {
    e.preventDefault();

    const id = generateUUID();
    const name = document.getElementById('companyName').value.trim();
    const address = document.getElementById('companyAddress').value.trim();
    const tel = document.getElementById('companyTel').value.trim();
    const info = document.getElementById('companyInfo').value.trim();

    const companies = loadData('companies');
    const newCompany = new Company(id, name, address, tel, info);
    companies.push(newCompany);
    saveData('companies', companies);

    updateCompanyList();
    updateCompanyDropdown();
    e.target.reset();
});

// Add Car
document.getElementById('carForm').addEventListener('submit', e => {
    e.preventDefault();

    const id = generateUUID();
    const name = document.getElementById('carName').value.trim();
    const model = document.getElementById('carModel').value.trim();
    const Class = document.getElementById('carClass').value.trim();
    const color = document.getElementById('carColor').value.trim();
    const price = document.getElementById('carPrice').value.trim();
    const companyId = document.getElementById('carCompany').value;

    const cars = loadData('cars');
    const newCar = new Car(id, name, model, Class, color, price);
    newCar.companyId = companyId;
    cars.push(newCar);
    saveData('cars', cars);

    updateCarList();
    e.target.reset();
});

// Render Company List
function updateCompanyList() {
    const companies = loadData('companies');
    const list = document.getElementById('companyList');
    list.innerHTML = companies.map(c => `<li class="list-group-item">${c.name} - ${c.address}</li>`).join('');
}

// Render Car List
function updateCarList() {
    const cars = loadData('cars');
    const list = document.getElementById('carList');
    list.innerHTML = cars.map(c => `<li class="list-group-item">${c.name} (${c.model})</li>`).join('');
}

// Populate Company Dropdown
function updateCompanyDropdown() {
    const companies = loadData('companies');
    const dropdown = document.getElementById('carCompany');
    dropdown.innerHTML = `<option value="">Select Company</option>` +
        companies.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    updateCompanyList();
    updateCarList();
    updateCompanyDropdown();
});

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = loadData('currentUser');
    if (!currentUser || currentUser.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "./../index.html";
    }
});
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

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = loadData('currentUser');
    if (!currentUser || currentUser.role !== "admin") {
        alert("Access denied. Admins only.");
        window.location.href = "./../index.html";
        return;
    }

    updateCompanyList();
    updateCarList();
    updateCompanyDropdown();
});

// Add or Edit Company
document.getElementById('companyForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.editingId || generateUUID();
    const name = form.companyName.value.trim();
    const address = form.companyAddress.value.trim();
    const tel = form.companyTel.value.trim();
    const info = form.companyInfo.value.trim();

    if (!name || !address || !tel || !info) return alert("All fields are required.");

    let companies = loadData('companies');
    if (form.dataset.editingId) {
        const index = companies.findIndex(c => c.id === id);
        companies[index] = new Company(id, name, address, tel, info);
        delete form.dataset.editingId;
    } else {
        companies.push(new Company(id, name, address, tel, info));
    }

    saveData('companies', companies);
    updateCompanyList();
    updateCompanyDropdown();
    form.reset();
});

// Add or Edit Car
document.getElementById('carForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    const id = form.dataset.editingId || generateUUID();
    const name = form.carName.value.trim();
    const model = form.carModel.value.trim();
    const Class = form.carClass.value.trim();
    const color = form.carColor.value.trim();
    const price = form.carPrice.value.trim();
    const companyId = form.carCompany.value;

    if (!name || !model || !Class || !color || !price || !companyId) return alert("All fields are required.");

    let cars = loadData('cars');
    if (form.dataset.editingId) {
        const index = cars.findIndex(c => c.id === id);
        const updatedCar = new Car(id, name, model, Class, color, price);
        updatedCar.companyId = companyId;
        cars[index] = updatedCar;
        delete form.dataset.editingId;
    } else {
        const newCar = new Car(id, name, model, Class, color, price);
        newCar.companyId = companyId;
        cars.push(newCar);
    }

    saveData('cars', cars);
    updateCarList();
    form.reset();
});

// Render Company List
function updateCompanyList() {
    const companies = loadData('companies');
    const list = document.getElementById('companyList');
    list.innerHTML = companies.map(c => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${c.name} - ${c.address}
      <div>
        <button class="btn btn-sm btn-warning me-2 edit-company" data-id="${c.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-company" data-id="${c.id}">Delete</button>
      </div>
    </li>
  `).join('');
}

// Render Car List
function updateCarList() {
    const cars = loadData('cars');
    const list = document.getElementById('carList');
    list.innerHTML = cars.map(c => `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      ${c.name} (${c.model})
      <div>
        <button class="btn btn-sm btn-warning me-2 edit-car" data-id="${c.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-car" data-id="${c.id}">Delete</button>
      </div>
    </li>
  `).join('');
}

// Populate Company Dropdown
function updateCompanyDropdown() {
    const companies = loadData('companies');
    const dropdown = document.getElementById('carCompany');
    dropdown.innerHTML = `<option value="">Select Company</option>` +
        companies.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

// Delete Company
document.getElementById('companyList').addEventListener('click', e => {
    if (e.target.classList.contains('delete-company')) {
        const id = e.target.dataset.id;
        const companies = loadData('companies').filter(c => c.id !== id);
        saveData('companies', companies);
        updateCompanyList();
        updateCompanyDropdown();
    }
});

// Edit Company
document.getElementById('companyList').addEventListener('click', e => {
    if (e.target.classList.contains('edit-company')) {
        const id = e.target.dataset.id;
        const company = loadData('companies').find(c => c.id === id);
        const form = document.getElementById('companyForm');
        form.companyName.value = company.name;
        form.companyAddress.value = company.address;
        form.companyTel.value = company.tel;
        form.companyInfo.value = company.info;
        form.dataset.editingId = id;
    }
});

// Delete Car
document.getElementById('carList').addEventListener('click', e => {
    if (e.target.classList.contains('delete-car')) {
        const id = e.target.dataset.id;
        const cars = loadData('cars').filter(c => c.id !== id);
        saveData('cars', cars);
        updateCarList();
    }
});

// Edit Car
document.getElementById('carList').addEventListener('click', e => {
    if (e.target.classList.contains('edit-car')) {
        const id = e.target.dataset.id;
        const car = loadData('cars').find(c => c.id === id);
        const form = document.getElementById('carForm');
        form.carName.value = car.name;
        form.carModel.value = car.model;
        form.carClass.value = car.Class;
        form.carColor.value = car.color;
        form.carPrice.value = car.price;
        form.carCompany.value = car.companyId;
        form.dataset.editingId = id;
    }
});
// Import base classes
import User from './ntt/User.js';
import Company from './ntt/Company.js';
import Car from './ntt/Car.js';
import Review from './ntt/Review.js';

// Import subclasses
import Customer from './ntt/Customer.js';
import ElectricCar from './ntt/ElectricCar.js';
import GasolineCar from './ntt/GasolineCar.js';

const dbName = 'CompanyDB';
const storeName = 'companies';
let db;

function openDB() {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
        }
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        loadCompanies();
    };
    request.onerror = function () {
        console.error('Failed to open IndexedDB');
    };
}

function saveCompany(company) {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    store.put(company);
    tx.oncomplete = () => loadCompanies();
}

function loadCompanies() {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = function () {
        const companies = request.result;
        const list = document.getElementById('companyList');
        list.innerHTML = '';
        companies.forEach(c => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${c.name} (${c.address}) - ${c.tel}`;
            list.appendChild(li);
        });
    };
}

document.getElementById('companyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    form.classList.add('was-validated');

    if (!form.checkValidity()) return;

    const id = document.getElementById('companyId').value.trim();
    const name = document.getElementById('companyName').value.trim();
    const address = document.getElementById('companyAddress').value.trim();
    const tel = document.getElementById('companyTel').value.trim();
    const info = document.getElementById('companyInfo').value.trim();

    const newCompany = new Company(id, name, address, tel, info);
    saveCompany(newCompany);
    form.reset();
    form.classList.remove('was-validated');
});

openDB();
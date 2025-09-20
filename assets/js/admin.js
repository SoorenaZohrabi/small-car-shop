import Company from './ntt/Company.js';
import Car from './ntt/Car.js';
import Customer from './ntt/Customer.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    function syncColorInputs(textInputId, pickerId) {
        const textInput = document.getElementById(textInputId);
        const colorPicker = document.getElementById(pickerId);

        // Convert named color to hex using a temporary element
        function resolveColorToHex(colorString) {
            const temp = document.createElement("div");
            temp.style.color = colorString;
            document.body.appendChild(temp);

            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgbMatch = computedColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
                const [r, g, b] = rgbMatch.map(Number);
                return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
            }
            return null;
        }

        // Picker → Input
        colorPicker.addEventListener("input", () => {
            textInput.value = colorPicker.value;
        });

        // Input → Picker
        textInput.addEventListener("input", () => {
            const value = textInput.value.trim();
            let hex = null;

            if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                hex = value;
            } else {
                hex = resolveColorToHex(value);
            }

            if (hex) {
                colorPicker.value = hex;
            }
        });
    }

    // Apply to both forms
    syncColorInputs("electricColor", "electricColorPicker");
    syncColorInputs("gasColor", "gasColorPicker");
});


function renderUsers(users) {
    const container = document.getElementById("usersTable");
    if (!users.length) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
    const rawUsers = loadData("users");
    const customers = rawUsers.map(u => new Customer(
        u.id, u.firstName, u.lastName, u.username, u.email, u.password, u.role
    ));
    renderUsers(customers);
});

document.addEventListener('DOMContentLoaded', () => {
    const addCompanyForm = document.getElementById('addCompanyForm');
    const gasCompanySelect = document.getElementById('gasCompanyName');
    const electricCompanySelect = document.getElementById('electricCompanyName');
    const companiesContainer = document.getElementById('companies-list');

    function updateCompanyDropdowns() {
        const companies = loadData('companies');
        [gasCompanySelect, electricCompanySelect].forEach(select => {
            select.innerHTML = '<option value="" disabled selected>Select company</option>';
            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company.id;
                option.textContent = company.name;
                select.appendChild(option);
            });
        });
    }

    function renderCompaniesList() {
        const companies = loadData('companies');
        companiesContainer.innerHTML = '';

        if (companies.length === 0) {
            companiesContainer.innerHTML = '<p>No companies added yet.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'table table-bordered table-striped';

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Telephone</th>
                    <th>Info</th>
                    <th>Cars</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${companies.map(c => `
                    <tr data-id="${c.id}">
                        <td><input type="text" class="form-control form-name" value="${c.name}"></td>
                        <td><input type="text" class="form-control form-address" value="${c.address}"></td>
                        <td><input type="text" class="form-control form-tel" value="${c.tel}"></td>
                        <td><input type="text" class="form-control form-info" value="${c.info}"></td>
                        <td>${c.cars.length}</td>
                        <td>
                            <button class="btn btn-sm btn-success btn-save">Save</button>
                            <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        companiesContainer.appendChild(table);

        // Add event listeners for Save and Delete
        companiesContainer.querySelectorAll('.btn-save').forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('tr');
                const id = row.dataset.id;
                const companies = loadData('companies');
                const company = companies.find(c => c.id === id);
                if (company) {
                    company.name = row.querySelector('.form-name').value.trim();
                    company.address = row.querySelector('.form-address').value.trim();
                    company.tel = row.querySelector('.form-tel').value.trim();
                    company.info = row.querySelector('.form-info').value.trim();
                    saveData('companies', companies);
                    updateCompanyDropdowns();
                    alert('Company updated!');
                }
            });
        });

        companiesContainer.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('tr');
                const id = row.dataset.id;
                let companies = loadData('companies');
                companies = companies.filter(c => c.id !== id);
                saveData('companies', companies);
                updateCompanyDropdowns();
                renderCompaniesList();
                alert('Company deleted!');
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
        updateCompanyDropdowns();
        renderCompaniesList();
    });

    updateCompanyDropdowns();
    renderCompaniesList();
});

document.addEventListener('DOMContentLoaded', () => {
    const addCompanyForm = document.getElementById('addCompanyForm');
    const gasCompanySelect = document.getElementById('gasCompanyName');
    const electricCompanySelect = document.getElementById('electricCompanyName');
    const companiesContainer = document.getElementById('companies-list');
    const carsContainer = document.getElementById('cars-list');
    const addGasolineCarForm = document.getElementById('addGasolineCarForm');
    const addElectricCarForm = document.getElementById('addElectricCarForm');

    function updateCompanyDropdowns() {
        const companies = loadData('companies');
        [gasCompanySelect, electricCompanySelect].forEach(select => {
            select.innerHTML = '<option value="" disabled selected>Select company</option>';
            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company.id;
                option.textContent = company.name;
                select.appendChild(option);
            });
        });
    }

    function renderCompaniesList() {
        const companies = loadData('companies');
        companiesContainer.innerHTML = '';

        if (companies.length === 0) {
            companiesContainer.innerHTML = '<p>No companies added yet.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'table table-bordered table-striped';

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Telephone</th>
                    <th>Info</th>
                    <th>Cars</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${companies.map(c => `
                    <tr data-id="${c.id}">
                        <td><input type="text" class="form-control form-name" value="${c.name}"></td>
                        <td><input type="text" class="form-control form-address" value="${c.address}"></td>
                        <td><input type="text" class="form-control form-tel" value="${c.tel}"></td>
                        <td><input type="text" class="form-control form-info" value="${c.info}"></td>
                        <td>${c.cars.length}</td>
                        <td>
                            <button class="btn btn-sm btn-success btn-save">Save</button>
                            <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;

        companiesContainer.appendChild(table);

        companiesContainer.querySelectorAll('.btn-save').forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('tr');
                const id = row.dataset.id;
                const companies = loadData('companies');
                const company = companies.find(c => c.id === id);
                if (company) {
                    company.name = row.querySelector('.form-name').value.trim();
                    company.address = row.querySelector('.form-address').value.trim();
                    company.tel = row.querySelector('.form-tel').value.trim();
                    company.info = row.querySelector('.form-info').value.trim();
                    saveData('companies', companies);
                    updateCompanyDropdowns();
                    renderCarsList();
                    alert('Company updated!');
                }
            });
        });

        companiesContainer.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const row = btn.closest('tr');
                const id = row.dataset.id;
                let companies = loadData('companies');
                companies = companies.filter(c => c.id !== id);
                saveData('companies', companies);
                updateCompanyDropdowns();
                renderCompaniesList();
                renderCarsList();
                alert('Company deleted!');
            });
        });
    }

    function renderCarsList() {
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
                    renderCompaniesList();
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
                    renderCompaniesList();
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
        updateCompanyDropdowns();
        renderCompaniesList();
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
            renderCompaniesList();
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
            renderCompaniesList();
            renderCarsList();
        }
    });
});

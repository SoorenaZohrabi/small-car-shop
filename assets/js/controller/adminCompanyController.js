import { loadData, saveData } from './../storage/storage.js';
import Company from './../models/Company.js';
import { updateCompanyDropdowns, renderCompaniesList } from './../UI/adminCompanyRender.js';
import { saveCompany, deleteCompany } from './../actions/adminCompanyActions.js';
import { generateUUID } from './../utils/generateUUID.js';

export function initializeCompanyManagement() {

    const addCompanyForm = document.getElementById('addCompanyForm');
    const companiesContainer = document.getElementById('companies-list');

    function refreshCompanies() {
        const companies = loadData('companies');
        updateCompanyDropdowns(companies);
        renderCompaniesList(companies);
    }

    // Add company
    addCompanyForm.addEventListener('submit', e => {
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

        if (companies.some(
            c => c.name.toLowerCase() === name.toLowerCase()
        )) {
            alert('A company with this name already exists.');
            return;
        }

        const newCompany = new Company(
            generateUUID(),
            name,
            address,
            tel,
            info
        );

        companies.push(newCompany);

        saveData('companies', companies);

        addCompanyForm.reset();

        alert('Company added successfully!');

        refreshCompanies();
    });

    // Save / Delete
    companiesContainer.addEventListener('click', e => {

        const row = e.target.closest('tr');

        if (!row) return;

        const id = row.dataset.id;

        // Save
        if (e.target.classList.contains('btn-save')) {

            const data = {
                name: row.querySelector('.form-name').value.trim(),
                address: row.querySelector('.form-address').value.trim(),
                tel: row.querySelector('.form-tel').value.trim(),
                info: row.querySelector('.form-info').value.trim()
            };

            saveCompany(id, data);

            refreshCompanies();

            alert('Company updated!');
        }

        // Delete
        if (e.target.classList.contains('btn-delete')) {
            const name = row.querySelector('.form-name').value.trim();

            deleteCompany(id, name);

            refreshCompanies();

            alert('Company deleted!');
        }
    });

    refreshCompanies();
};
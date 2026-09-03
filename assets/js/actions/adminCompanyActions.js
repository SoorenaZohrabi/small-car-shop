import { loadData, saveData } from './../storage/storage.js';

export function saveCompany(id, data) {
    const companies = loadData('companies');

    const company = companies.find(c => c.id === id);

    if (!company) return false;

    company.name = data.name;
    company.address = data.address;
    company.tel = data.tel;
    company.info = data.info;

    saveData('companies', companies);

    return true;
}

export function deleteCompany(id, name) {
    let companies = loadData('companies');
    let cars = loadData('cars');

    companies = companies.filter(company => company.id !== id);
    cars = cars.filter(car => car.company !== name);

    saveData('companies', companies);
    saveData('cars', cars)
}
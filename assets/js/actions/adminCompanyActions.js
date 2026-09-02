import { loadData, saveData } from '../storage/storage.js';

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

export function deleteCompany(id) {
    let companies = loadData('companies');

    companies = companies.filter(company => company.id !== id);

    saveData('companies', companies);
}
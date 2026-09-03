import { loadData } from "./../storage/storage.js";

export function getCompanyCars(company) {
    const cars = loadData('cars');
    return cars.filter(car => car.company === company.name);
}
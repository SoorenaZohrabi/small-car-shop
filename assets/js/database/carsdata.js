import ElectricCar from "./../ntt/ElectricCar.js";
import GasolineCar from "./../ntt/GasolineCar.js";
import { saveData , loadData } from "./../storage.js";
import { generateUUID } from "./../generateUUID.js";

function assignCarsToCompanies(carList) {
    const companies = loadData('companies');

    companies.forEach(company => {
        company.cars = carList.filter(car => car.name === company.name);
    });

    saveData('companies', companies);
}

function initializeCars() {
    const carList = [
        // 🚘 Tesla Electric Cars
        new ElectricCar(generateUUID(), "Tesla", "Model S", "Sedan", "Black", 79999, 1.5, 650, "Lithium-ion", "0-100 in 3.2s", "https://www.tesla.com/sites/default/files/modelsx-new/social/model-s-hero-social.jpg"),
        new ElectricCar(generateUUID(), "Tesla", "Model X", "SUV", "White", 89999, 1.8, 560, "Lithium-ion", "0-100 in 3.9s", "https://www.tesla.com/sites/default/files/modelsx-new/social/model-x-hero-social.jpg"),

        // 🚘 BMW Electric Cars
        new ElectricCar(generateUUID(), "BMW", "i4", "Sedan", "Blue", 69999, 1.6, 590, "Lithium-ion", "0-100 in 5.7s", "https://www.press.bmwgroup.com/global/article/attachment/T0403102EN/bmw-i4-exterior-front.jpg"),
        new ElectricCar(generateUUID(), "BMW", "iX", "SUV", "Silver", 85999, 2.0, 630, "Lithium-ion", "0-100 in 4.6s", "https://www.bmwusa.com/content/dam/bmwusa/ix/2023/overview/BMW-MY23-iX-Overview-Highlight-Exterior.jpg"),

        // 🚘 Mercedes-Benz Electric Cars
        new ElectricCar(generateUUID(), "Mercedes-Benz", "EQS", "Luxury Sedan", "Gray", 99999, 2.5, 770, "Lithium-ion", "0-100 in 4.1s", "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/eqs-sedan/UW23EQSSEDAN.png"),
        new ElectricCar(generateUUID(), "Mercedes-Benz", "EQB", "SUV", "Red", 65999, 1.9, 420, "Lithium-ion", "0-100 in 6.2s", "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/eqb-suv/UW23EQBSUV.png"),

        // 🚘 Porsche Electric Cars
        new ElectricCar(generateUUID(), "Porsche", "Taycan", "Sports Sedan", "Black", 109999, 2.2, 500, "Performance Battery", "0-100 in 3.0s", "https://files.porsche.com/filestore/image/multimedia/none/modelseries-taycan-cross-turismo-gallery-01/normal/1f1b1d2d-7e3b-11eb-80d9-005056bbdc38;sK;twebp/porsche-normal.webp"),

        // 🚘 Toyota Electric Cars
        new ElectricCar(generateUUID(), "Toyota", "bZ4X", "SUV", "White", 49999, 1.7, 500, "Lithium-ion", "0-100 in 7.1s", "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/bz4x/1/040.png"),

        // ⛽ Toyota Gasoline Cars
        new GasolineCar(generateUUID(), "Toyota", "Corolla", "Sedan", "Silver", 22999, "Petrol", "I4", 1.8, "Regular", "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2023/corolla/1/1F7.png"),
        new GasolineCar(generateUUID(), "Toyota", "Land Cruiser", "SUV", "Black", 65999, "Diesel", "V8", 4.5, "Premium", "https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2024/landcruiser/1/202.png"),

        // ⛽ BMW Gasoline Cars
        new GasolineCar(generateUUID(), "BMW", "3 Series", "Sedan", "Blue", 41999, "Petrol", "I4", 2.0, "Premium", "https://www.bmwusa.com/content/dam/bmwusa/3-series/sedan/2023/BMW-MY23-3Series-Sedan-Overview-Highlight-Exterior.jpg"),
        new GasolineCar(generateUUID(), "BMW", "X5", "SUV", "White", 65999, "Petrol", "V6", 3.0, "Premium", "https://www.bmwusa.com/content/dam/bmwusa/x5/2023/overview/BMW-MY23-X5-Overview-Highlight-Exterior.jpg"),

        // ⛽ Mercedes-Benz Gasoline Cars
        new GasolineCar(generateUUID(), "Mercedes-Benz", "C-Class", "Sedan", "Gray", 44999, "Petrol", "I4", 2.0, "Premium", "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/c-class-sedan/UW23CCLSEDAN.png"),
        new GasolineCar(generateUUID(), "Mercedes-Benz", "GLE", "SUV", "Black", 69999, "Petrol", "V6", 3.5, "Premium", "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my23/gle-suv/UW23GLESUV.png"),

        // ⛽ Porsche Gasoline Cars
        new GasolineCar(generateUUID(), "Porsche", "911", "Sports Coupe", "Red", 119999, "Petrol", "Flat-6", 3.0, "Premium", "https://files.porsche.com/filestore/image/multimedia/none/modelseries-911-carrera-gallery-01/normal/1f1b1d2d-7e3b-11eb-80d9-005056bbdc38;sK;twebp/porsche-normal.webp"),
        new GasolineCar(generateUUID(), "Porsche", "Cayenne", "SUV", "Silver", 89999, "Petrol", "V6", 3.0, "Premium", "https://files.porsche.com/filestore/image/multimedia/none/modelseries-cayenne-gallery-01/normal/1f1b1d2d-7e3b-11eb-80d9-005056bbdc38;sK;twebp/porsche-normal.webp")
    ];

    assignCarsToCompanies(carList)
    saveData('cars', carList);
}

document.addEventListener('DOMContentLoaded', initializeCars);
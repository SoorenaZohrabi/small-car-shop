import Car from "./Car.js";

export default class GasolineCar extends Car {
    constructor(id, name, model, Class, color, price, company, fuelType, engineType, engineSize, fuelGrade, image, type = "Gasoline") {
        super(id, name, model, Class, color, price, company);
        this.type = type;
        this.fuelType = fuelType;
        this.engineType = engineType;
        this.engineSize = engineSize;
        this.fuelGrade = fuelGrade;
        this.image = image || "default-gas.jpg";
    }
}

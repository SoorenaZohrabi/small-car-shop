import Car from "./Car.js";

export default class GasolineCar extends Car {
    constructor(id, name, model, Class, color, price, fuelType, engineType, engineSize, fuelGrade, image) {
        super(id, name, model, Class, color, price);
        this.fuelType = fuelType;
        this.engineType = engineType;
        this.engineSize = engineSize;
        this.fuelGrade = fuelGrade;
        this.image = image || "default-gas.jpg";
    }
}

import Car from "./Car.js";
export default class ElectricCar extends Car {
    constructor(id, name, model, Class, color, price, company, chargingTime, drivingRange, batteryType, performance, image, type = "Electric") {
        super(id, name, model, Class, color, price, company);
        this.type = type;
        this.chargingTime = chargingTime;
        this.drivingRange = drivingRange;
        this.batteryType = batteryType;
        this.performance = performance;
        this.image = image || "default-electric.jpg";
    }
}

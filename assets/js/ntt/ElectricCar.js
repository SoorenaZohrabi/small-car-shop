import { Car } from "./Car.js";

class ElectricCar extends Car {
    constructor(id, name, model, Class, color, price, chargingTime, drivingRange, baterryType, performance) {
        super(id, name, model, Class, color, price);
        this.chargingTime = chargingTime;
        this.drivingRange = drivingRange;
        this.baterryType = baterryType;
        this.performance = performance;
    }
}
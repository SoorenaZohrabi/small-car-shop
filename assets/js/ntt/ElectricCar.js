import Car from "./Car.js";
export default class ElectricCar extends Car {
    constructor(id, name, model, Class, color, price, chargingTime, drivingRange, batteryType, performance, image) {
        super(id, name, model, Class, color, price);
        this.chargingTime = chargingTime;
        this.drivingRange = drivingRange;
        this.batteryType = batteryType;
        this.performance = performance;
        this.image = image || "default-electric.jpg";
    }
}

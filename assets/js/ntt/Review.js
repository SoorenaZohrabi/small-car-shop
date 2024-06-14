export default class Review {
    constructor(userId, carId, rate, viewpoint) {
        this.userId = userId;
        this.carId = carId;
        this.rate = rate;
        this.viewpoint = viewpoint;
    }
}
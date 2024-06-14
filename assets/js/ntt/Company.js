export default class Company {
    constructor(id,name,address,tel,info) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.tel = tel;
        this.info = info;
        this.cars = [];
    }
}
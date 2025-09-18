import User from "./User.js";

export default class Customer extends User {
    constructor(id, firstName, lastName, username, email, password, role = "customer") {
        super(id, firstName, lastName);
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
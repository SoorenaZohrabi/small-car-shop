import { renderUsers } from "./../UI/userRender.js";
import { loadData } from "./../storage/storage.js";
import Customer from "./../models/Customer.js";

export function loadAndRenderUsers() {
    const rawUsers = loadData("users");
    const customers = rawUsers.map(u => new Customer(
        u.id, u.firstName, u.lastName, u.username, u.email, u.password, u.role
    ));
    renderUsers(customers);
};
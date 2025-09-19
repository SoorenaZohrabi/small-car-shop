import Company from './ntt/Company.js';
import Car from './ntt/Car.js';
import Customer from './ntt/Customer.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    function syncColorInputs(textInputId, pickerId) {
        const textInput = document.getElementById(textInputId);
        const colorPicker = document.getElementById(pickerId);

        // Convert named color to hex using a temporary element
        function resolveColorToHex(colorString) {
            const temp = document.createElement("div");
            temp.style.color = colorString;
            document.body.appendChild(temp);

            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgbMatch = computedColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
                const [r, g, b] = rgbMatch.map(Number);
                return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
            }
            return null;
        }

        // Picker → Input
        colorPicker.addEventListener("input", () => {
            textInput.value = colorPicker.value;
        });

        // Input → Picker
        textInput.addEventListener("input", () => {
            const value = textInput.value.trim();
            let hex = null;

            if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                hex = value;
            } else {
                hex = resolveColorToHex(value);
            }

            if (hex) {
                colorPicker.value = hex;
            }
        });
    }

    // Apply to both forms
    syncColorInputs("electricColor", "electricColorPicker");
    syncColorInputs("gasColor", "gasColorPicker");
});


function renderUsers(users) {
    const container = document.getElementById("usersTable");
    if (!users.length) {
        container.innerHTML = "<p>No users found.</p>";
        return;
    }

    const table = document.createElement("table");
    table.className = "table table-striped table-bordered";

    table.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
          </tr>
        `).join("")}
      </tbody>
    `;

    container.innerHTML = "";
    container.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
    const rawUsers = loadData("users");
    const customers = rawUsers.map(u => new Customer(
        u.id, u.firstName, u.lastName, u.username, u.email, u.password, u.role
    ));
    renderUsers(customers);
});
export function renderUsers(users) {
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
export function updateCompanyDropdowns(companies) {
    const gasCompanySelect = document.getElementById('gasCompanyName');
    const electricCompanySelect = document.getElementById('electricCompanyName');

    console.log(gasCompanySelect, electricCompanySelect);

    [gasCompanySelect, electricCompanySelect].forEach(select => {
        select.innerHTML = '<option value="" disabled selected>Select company</option>';

        companies.forEach(company => {
            const option = document.createElement('option');

            option.value = company.id;
            option.textContent = company.name;

            select.appendChild(option);
        });
    });
}

export function renderCompaniesList(companies) {
    const companiesContainer = document.getElementById('companies-list');

    companiesContainer.innerHTML = '';

    if (companies.length === 0) {
        companiesContainer.innerHTML = '<p>No companies added yet.</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Telephone</th>
                <th>Info</th>
                <th>Cars</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            ${companies.map(c => `
                <tr data-id="${c.id}">
                    <td>
                        <input type="text"
                               class="form-control form-name"
                               value="${c.name}">
                    </td>

                    <td>
                        <input type="text"
                               class="form-control form-address"
                               value="${c.address}">
                    </td>

                    <td>
                        <input type="text"
                               class="form-control form-tel"
                               value="${c.tel}">
                    </td>

                    <td>
                        <input type="text"
                               class="form-control form-info"
                               value="${c.info}">
                    </td>

                    <td>${c.cars.length}</td>

                    <td>
                        <button class="btn btn-sm btn-success btn-save">
                            Save
                        </button>

                        <button class="btn btn-sm btn-danger btn-delete">
                            Delete
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    companiesContainer.appendChild(table);
}
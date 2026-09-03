import { saveData, loadData } from './../storage/storage.js';

export function renderCompanies() {
    const container = document.getElementById('company-list');
    if (!container) {
        return;
    }
    const companies = loadData('companies');
    container.innerHTML = '';

    companies.forEach(company => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card company-card h-100';
        card.onclick = () => {
            saveData('selectedCompany', company);
            window.location.href = window.location.href = '/pages/companyCars.html';
        };

        card.innerHTML = `
      <div class="card-header">${company.name}</div>
      <div class="card-body">
        <p><strong>Address:</strong> ${company.address}</p>
        <p><strong>Tel:</strong> ${company.tel}</p>
        <p>${company.info}</p>
      </div>
    `;

        col.appendChild(card);
        container.appendChild(col);
    });
}
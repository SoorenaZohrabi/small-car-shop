import { loadData } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const companies = loadData('companies');
    const container = document.querySelector('.company-directory .row');

    if (companies.length === 0) {
        container.innerHTML = `<p class="empty-message">No companies available.</p>`;
        return;
    }

    container.innerHTML = companies.map(c => `
        <div class="col-md-4">
            <div class="card company-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${c.name}</h5>
                    <p class="card-text"><strong>Address:</strong> ${c.address}</p>
                    <p class="card-text"><strong>Tel:</strong> ${c.tel}</p>
                    <p class="card-text">${c.info}</p>
                    <a href="companycars.html?companyId=${c.id}" class="btn btn-outline-primary">View Cars</a>
                </div>
            </div>
        </div>
    `).join('');
});

export function renderFooter() {
    const footer = document.querySelector('.site-footer');

    if (!footer) return;

    footer.innerHTML = `
        <div class="container text-center">
            <p class="mb-1">
                Contact us: info@carhub.com | +98 000 000 0000
            </p>

            <p class="mb-1">
                Follow us:
                <a href="#" class="footer-link">Instagram</a> |
                <a href="#" class="footer-link">Twitter</a> |
                <a href="#" class="footer-link">LinkedIn</a>
            </p>

            <p class="mb-0">
                &copy; 2025 CarHub. All rights reserved.
            </p>
        </div>
    `;
}
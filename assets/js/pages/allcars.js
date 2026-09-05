import { initializeUserSession } from "./../controller/auth.js";
import { loadAndRenderCars } from "./../UI/carRender.js";
import { renderFooter } from "./../UI/footerRender.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeUserSession();
    loadAndRenderCars(0);
    renderFooter();
});
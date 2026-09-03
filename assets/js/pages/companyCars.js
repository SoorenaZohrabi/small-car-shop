import { initializeUserSession } from "./../controller/auth.js";
import { loadAndRenderCars } from "./../UI/carRender.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeUserSession();
    loadAndRenderCars(0, 1);
});
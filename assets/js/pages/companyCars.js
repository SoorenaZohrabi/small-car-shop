import { initializeUserSession } from "./../auth.js";
import { loadAndRenderCars } from "./../UI/carUI.js";

document.addEventListener("DOMContentLoaded", () => {
    initializeUserSession();
    loadAndRenderCars(0, 1);
});
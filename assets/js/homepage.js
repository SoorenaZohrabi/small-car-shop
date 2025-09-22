import { loadAndRenderCars } from "./allcars.js";
import { loadData } from './storage.js';

document.addEventListener("DOMContentLoaded", () => {
    loadAndRenderCars(3);
});
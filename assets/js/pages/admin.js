import { syncColorInputs } from "./../utils/colorInputSync.js";
import { loadAndRenderUsers } from './../controller/userController.js';
import { initializeCompanyManagement } from "./../controller/adminCompanyController.js";
import { initializeUserSession } from "./../controller/auth.js";
import { renderCompaniesList, updateCompanyDropdowns } from "./../UI/adminCompanyRender.js";
import { renderCarsList } from "./../controller/adminCarController.js";
import { loadData } from "./../storage/storage.js";

function initializeCompanyAndCarUI() {
    updateCompanyDropdowns(loadData('companies'));
    renderCompaniesList(loadData('companies'));
    renderCarsList();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeUserSession();
    syncColorInputs("electricColor", "electricColorPicker");
    syncColorInputs("gasColor", "gasColorPicker");
    loadAndRenderUsers();
    initializeCompanyManagement();
    initializeCompanyAndCarUI()
});
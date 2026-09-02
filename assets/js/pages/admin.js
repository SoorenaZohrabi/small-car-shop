import { syncColorInputs } from "./../colorInputSync.js";
import { loadAndRenderUsers } from './../userController.js';
import { initializeCompanyManagement } from "./../companyController.js";
import { initializeUserSession } from "./../auth.js";
import { renderCompaniesList, updateCompanyDropdowns } from "./../companyRender.js";
import { renderCarsList } from "./../carRender.js";
import { loadData } from "./../storage.js";

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
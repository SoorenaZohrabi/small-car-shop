import Company from './ntt/Company.js';
import Car from './ntt/Car.js';
import { saveData, loadData } from './storage.js';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    function syncColorInputs(textInputId, pickerId) {
        const textInput = document.getElementById(textInputId);
        const colorPicker = document.getElementById(pickerId);

        // Convert named color to hex using a temporary element
        function resolveColorToHex(colorString) {
            const temp = document.createElement("div");
            temp.style.color = colorString;
            document.body.appendChild(temp);

            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgbMatch = computedColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
                const [r, g, b] = rgbMatch.map(Number);
                return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
            }
            return null;
        }

        // Picker → Input
        colorPicker.addEventListener("input", () => {
            textInput.value = colorPicker.value;
        });

        // Input → Picker
        textInput.addEventListener("input", () => {
            const value = textInput.value.trim();
            let hex = null;

            if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                hex = value;
            } else {
                hex = resolveColorToHex(value);
            }

            if (hex) {
                colorPicker.value = hex;
            }
        });
    }

    // Apply to both forms
    syncColorInputs("electricColor", "electricColorPicker");
    syncColorInputs("gasColor", "gasColorPicker");
});

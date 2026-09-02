import { resolveColorToHex } from "./colorUtils.js";

export function syncColorInputs(textInputId, pickerId) {
    const textInput = document.getElementById(textInputId);
    const colorPicker = document.getElementById(pickerId);

    if (!textInput || !colorPicker) return;

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
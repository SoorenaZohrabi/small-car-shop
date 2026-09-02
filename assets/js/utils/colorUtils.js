export function resolveColorToHex(colorString) {
    const temp = document.createElement("div");
    temp.style.color = colorString;
    document.body.appendChild(temp);

    const computedColor = getComputedStyle(temp).color;
    document.body.removeChild(temp);

    const rgbMatch = computedColor.match(/\d+/g);

    if (rgbMatch && rgbMatch.length >= 3) {
        const [r, g, b] = rgbMatch.map(Number);
        return ("#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join(""));
    }

    return null;
}
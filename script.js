async function checkIngredients() {
    let input = document.getElementById("ingredientInput").value;
    
    let result = await fetch(`/process?ingredients=${encodeURIComponent(input)}`)
                       .then(response => response.json());

    let outputElement = document.getElementById("output");
    outputElement.innerHTML = ""; // Clear previous output

    // NAC-80 ingredients
    if (result.nac80.length > 0) {
        outputElement.innerHTML += `⚠️ NAC-80 Ingredients Found:<br>${result.nac80.join(", ")}<br><br>`;
    } else {
        outputElement.innerHTML += `✅ No NAC-80 ingredients found.<br><br>`;
    }

    // Fragrance ingredients
    if (result.fragrance.length > 0) {
        outputElement.innerHTML += `⚠️ Fragrance Ingredients Found:<br>${result.fragrance.join(", ")}<br><br>`;
    } else {
        outputElement.innerHTML += `✅ No additional fragrance ingredients found.<br><br>`;
    }

    // Adjacent ingredients
    if (result.adjacent.length > 0) {
        outputElement.innerHTML += `⚠️ Adjacent Ingredients Found:<br>${result.adjacent.join(", ")}<br><br>`;
    } else {
        outputElement.innerHTML += `✅ No adjacent ingredients found.<br><br>`;
    }
}

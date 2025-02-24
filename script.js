async function checkIngredients() {
    let input = document.getElementById("ingredientInput").value;

    // Simulating backend response (Replace this with an actual backend request if needed)
    let result = await fetch(`/process?ingredients=${encodeURIComponent(input)}`)
                       .then(response => response.json());

    // Parse the response and update the output sections
    document.getElementById("nac80Output").innerHTML = formatOutput("NAC-80 Ingredients", result.nac80);
    document.getElementById("fragranceOutput").innerHTML = formatOutput("Fragrance Ingredients", result.fragrance);
    document.getElementById("adjacentOutput").innerHTML = formatOutput("Adjacent Ingredients", result.adjacent);
}

// Function to format the output with correct icons (✅ or ⚠️)
function formatOutput(title, items) {
    if (items.length > 0) {
        return `<span class="warning">⚠️ ${title} Found:</span> ${items.join(", ")}`;
    } else {
        return `<span class="checkmark">✅ No ${title.toLowerCase()} found.</span>`;
    }
}

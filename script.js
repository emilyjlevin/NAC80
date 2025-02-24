// NAC-80 allergen list
const nac80List = [
    "1,3-diphenylguanidine", "2-hydroxyethyl methacrylate", "2-mercaptobenzothiazole", "benzophenone-4", 
    "benzyl alcohol", "benzyl salicylate", "cocamide dea", "cocamidopropyl betaine", "fragrance mix i", "fragrance mix ii", 
    "tocopherol", "toluene-2,5-diamine sulfate", "sodium benzoate", "methylisothiazolinone", "propyl gallate"
];

// Function to check ingredients
function checkIngredients() {
    const input = document.getElementById("ingredientInput").value;
    const ingredients = input.split(",").map(ing => ing.trim().toLowerCase());
    
    // Find matches in NAC-80 list
    const matches = ingredients.filter(ing => nac80List.includes(ing));
    
    // Detect acrylates
    const acrylates = ingredients.filter(ing => ing.includes("acrylate"));
    
    // Detect fragrances
    const fragrances = ingredients.filter(ing =>
        ing.includes("fragrance") || ing.includes("parfum") || ing.includes("perfume")
    );
    
    // Display results
    document.getElementById("results").innerHTML = `
        <h3>Results:</h3>
        <p><strong>NAC-80 Ingredients Found:</strong> ${matches.length ? matches.join(", ") : "None"}</p>
        <p><strong>Acrylates Detected:</strong> ${acrylates.length ? acrylates.join(", ") : "None"}</p>
        <p><strong>Fragrances Detected:</strong> ${fragrances.length ? fragrances.join(", ") : "None"}</p>
    `;
}

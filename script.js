document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("checkButton").addEventListener("click", checkIngredients);
});

// NAC-80 Allergen List
const nac80List = [
    "1,3-diphenylguanidine", "2-hydroxyethyl methacrylate", "2-mercaptobenzothiazole",
    "2-n-octyl-4-isothiazolin-3-one", "3-(dimethylamino)-1-propylamine", "4-tert-butylphenolformaldehyde resin",
    "amidoamine", "amerchol l-101", "ammonium persulfate", "bacitracin", "benzalkonium chloride",
    "benzisothiazolinone", "benzocaine", "benzophenone-4", "benzyl alcohol", "benzyl salicylate",
    "black rubber mix", "bromo-2-nitropropane-1,3-diol", "budesonide", "caine mix iii", "carba mix",
    "chlorhexidine digluconate", "chloroxylenol", "cinnamal", "clobetasol-17-propionate",
    "cobalt(ii)chloride hexahydrate", "cocamide dea", "cocamidopropyl betaine", "colophonium",
    "compositae mix ii", "decyl glucoside", "diazolidinyl urea", "dmdm hydantoin", "epoxy resin, bisphenol a",
    "ethyl acrylate", "ethylenediamine dihydrochloride", "formaldehyde", "fragrance mix i",
    "fragrance mix ii", "hydroperoxides of limonene", "hydroperoxides of linalool",
    "hydroxyisohexyl 3-cyclohexene carboxaldehyde", "imidazolidinyl urea", "iodopropynyl butylcarbamate",
    "lauryl polyglucose", "lanolin alcohol", "lidocaine", "mercapto mix", "methyl methacrylate",
    "methylisothiazolinone", "methylisothiazolinone+methylchloroisothiazolinone",
    "methyldibromo glutarinitrile", "mixed dialkyl thiourea", "neomycin sulfate",
    "nickel(ii)sulfate hexahydrate", "n-isopropyl-n-phenyl-4-phenylenediamine",
    "oleamidopropyl dimethylamine", "p-phenylenediamine", "paraben mix", "peru balsam",
    "polymyxin b sulfate", "potassium dichromate", "propyl gallate", "propylene glycol", "propolis",
    "pramoxine hydrochloride", "quaternium-15", "sesquiterpene lactone mix", "sodium benzoate",
    "sodium metabisulfite", "sorbitan oleate", "sorbitan sesquioleate", "textile dye mix ii",
    "tea tree oil oxidized", "thiuram mix", "tixocortol-21-pivalate", "tocopherol",
    "toluene-2,5-diamine sulfate", "toluenesulfonamide formaldehyde resin", "ylang ylang oil"
];

// Function to check sunscreen ingredients
function checkIngredients() {
    let input = document.getElementById("ingredientInput").value.trim();
    
    if (!input) {
        document.getElementById("output").innerHTML = "<p>Please enter ingredients to check.</p>";
        return;
    }

    // Convert input into an array, trimming spaces
    let userIngredients = input.split(",").map(ing => ing.trim().toLowerCase());

    // NAC-80 Matches (Now including acrylates)
    let matchingIngredients = userIngredients.filter(ing => 
        nac80List.includes(ing) || ing.includes("acrylate")
    );

    // Fragrance Detection (Catches multiple variations)
    let fragranceMatches = userIngredients.filter(ing => 
        /fragrance|parfum|perfume|parfume|perfum/i.test(ing) && !/fragrance mix i|fragrance mix ii/i.test(ing)
    );

    // Adjacent Ingredients (Detects tocopheryl acetate, limonene, linalool, but excludes hydroperoxides)
    let adjacentIngredients = userIngredients.filter(ing => 
        /tocopheryl acetate|limonene|linalool/i.test(ing) && 
        !/hydroperoxides of linalool|hydroperoxides of limonene/i.test(ing)
    );

    // Output Formatting
    let outputHTML = "<h2>Results:</h2>";

    outputHTML += formatResult("NAC-80 Ingredients Found", matchingIngredients);
    outputHTML += formatResult("Fragrance Ingredients Found", fragranceMatches);
    outputHTML += formatResult("Adjacent Ingredients Found", adjacentIngredients);

    document.getElementById("output").innerHTML = outputHTML;
}

// Helper function to format results
function formatResult(title, list) {
    if (list.length > 0) {
        return `<p style="color: red;">⚠️ <strong>${title}:</strong> ${list.join(", ")}</p>`;
    } else {
        return `<p style="color: green;">✅ No ${title.toLowerCase()}.</p>`;
    }
}

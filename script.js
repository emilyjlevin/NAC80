// List of NAC-80 allergens
const nac80List = [
    "1,3-diphenylguanidine", "2-hydroxyethyl methacrylate", "2-mercaptobenzothiazole", 
    "2-n-octyl-4-isothiazolin-3-one", "3-(dimethylamino)-1-propylamine", 
    "4-tert-butylphenolformaldehyde resin", "amidoamine", "amerchol l-101", 
    "ammonium persulfate", "bacitracin", "benzalkonium chloride", "benzisothiazolinone", 
    "benzocaine", "benzophenone-4", "benzyl alcohol", "benzyl salicylate", "black rubber mix", 
    "bromo-2-nitropropane-1,3-diol", "budesonide", "caine mix iii", "carba mix", 
    "chlorhexidine digluconate", "chloroxylenol", "cinnamal", "clobetasol-17-propionate", 
    "cobalt(ii)chloride hexahydrate", "cocamide dea", "cocamidopropyl betaine", "colophonium", 
    "compositae mix ii", "decyl glucoside", "diazolidinyl urea", "dmdm hydantoin", 
    "epoxy resin, bisphenol a", "ethyl acrylate", "ethylenediamine dihydrochloride", "formaldehyde", 
    "fragrance mix i", "fragrance mix ii", "hydroperoxides of limonene", "hydroperoxides of linalool", 
    "hydroxyisohexyl 3-cyclohexene carboxaldehyde", "imidazolidinyl urea", "iodopropynyl butylcarbamate", 
    "lauryl polyglucose", "lanolin alcohol", "lidocaine", "mercapto mix", "methyl methacrylate", 
    "methylisothiazolinone", "methylisothiazolinone+methylchloroisothiazolinone", 
    "methyldibromo glutarinitrile", "mixed dialkyl thiourea", "neomycin sulfate", 
    "nickel(ii)sulfate hexahydrate", "n-isopropyl-n-phenyl-4-phenylenediamine", "oleamidopropyl dimethylamine", 
    "p-phenylenediamine", "paraben mix", "peru balsam", "polymyxin b sulfate", "potassium dichromate", 
    "propyl gallate", "propylene glycol", "propolis", "pramoxine hydrochloride", "quaternium-15", 
    "sesquiterpene lactone mix", "sodium benzoate", "sodium metabisulfite", "sorbitan oleate", 
    "sorbitan sesquioleate", "textile dye mix ii", "tea tree oil oxidized", "thiuram mix", 
    "tixocortol-21-pivalate", "tocopherol", "toluene-2,5-diamine sulfate", "toluenesulfonamide formaldehyde resin", 
    "ylang ylang oil"
];

// Function to check ingredients against NAC-80 list
function checkIngredients() {
    let input = document.getElementById("ingredientInput").value;
    let userIngredients = input.split(",").map(i => i.trim().toLowerCase());

    // Find exact matches with NAC-80 list
    let matchingIngredients = userIngredients.filter(ingredient => nac80List.includes(ingredient));
    
    // Find acrylates
    let acrylateMatches = userIngredients.filter(ingredient => ingredient.includes("acrylate"));
    
    // Find fragrance-related terms
    let fragranceMatches = userIngredients.filter(ingredient => 
        ingredient.includes("fragrance") || ingredient.includes("parfum") || 
        ingredient.includes("perfume") || ingredient.includes("parfume") || 
        ingredient.includes("perfum"));
    
    let resultText = "";

    if (matchingIngredients.length > 0) {
        resultText += `✅ NAC-80 Ingredients Found: ${matchingIngredients.join(", ")}`;
    } else {
        resultText += "✅ No NAC-80 ingredients found.";
    }

    if (acrylateMatches.length > 0) {
        resultText += `\n⚠️ Acrylate Ingredients Found: ${acrylateMatches.join(", ")}`;
    }

    if (fragranceMatches.length > 0) {
        resultText += `\n⚠️ Fragrance-Related Ingredients Found: ${fragranceMatches.join(", ")}`;
    }
    
    document.getElementById("output").innerText = resultText;
}

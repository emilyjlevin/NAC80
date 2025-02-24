document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("checkButton").addEventListener("click", checkIngredients);
});

function checkIngredients() {
    let input = document.getElementById("ingredientInput").value;

    if (!input.trim()) {
        document.getElementById("output").innerText = "Please enter ingredients.";
        return;
    }

    let userIngredients = input.split(",").map(ing => ing.trim());

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
        "epoxy resin, bisphenol a", "ethyl acrylate", "ethylenediamine dihydrochloride",
        "formaldehyde", "fragrance mix i", "fragrance mix ii", "hydroperoxides of limonene",
        "hydroperoxides of linalool", "hydroxyisohexyl 3-cyclohexene carboxaldehyde",
        "imidazolidinyl urea", "iodopropynyl butylcarbamate", "lauryl polyglucose",
        "lanolin alcohol", "lidocaine", "mercapto mix", "methyl methacrylate",
        "methylisothiazolinone", "methylisothiazolinone+methylchloroisothiazolinone",
        "methyldibromo glutarinitrile", "mixed dialkyl thiourea", "neomycin sulfate",
        "nickel(ii)sulfate hexahydrate", "n-isopropyl-n-phenyl-4-phenylenediamine",
        "oleamidopropyl dimethylamine", "p-phenylenediamine", "paraben mix", "peru balsam",
        "polymyxin b sulfate", "potassium dichromate", "propyl gallate", "propylene glycol",
        "propolis", "pramoxine hydrochloride", "quaternium-15", "sesquiterpene lactone mix",
        "sodium benzoate", "sodium metabisulfite", "sorbitan oleate", "sorbitan sesquioleate",
        "textile dye mix ii", "tea tree oil oxidized", "thiuram mix", "tixocortol-21-pivalate",
        "tocopherol", "toluene-2,5-diamine sulfate", "toluenesulfonamide formaldehyde resin",
        "ylang ylang oil"
    ];

    let acrylateMatches = userIngredients.filter(ing => ing.toLowerCase().includes("acrylate"));
    let nac80Matches = userIngredients.filter(ing => nac80List.includes(ing.toLowerCase()));

    let fragranceMatches = userIngredients.filter(ing =>
        /(fragrance|parfum|perfume|parfume|perfum)/i.test(ing) &&
        !["Fragrance Mix I", "Fragrance Mix II"].includes(ing)
    );

    let adjacentMatches = userIngredients.filter(ing =>
        /(tocopheryl acetate|(?<!hydroperoxides of )limonene|(?<!hydroperoxides of )linalool)/i.test(ing)
    );

    // Ensure tocopherol is NAC-80, not adjacent
    if (nac80Matches.includes("tocopherol")) {
        adjacentMatches = adjacentMatches.filter(ing => !/tocopherol/i.test(ing));
    }

    let output = "--------------------------------------------\n";

    if (nac80Matches.length > 0 || acrylateMatches.length > 0) {
        output += "\n✅ NAC-80 Ingredients Found:\n";
        output += "--------------------------------------------\n";
        output += [...new Set([...nac80Matches, ...acrylateMatches])].join(", ") + "\n\n";
    } else {
        output += "\n✅ No NAC-80 ingredients found.\n\n";
    }

    if (fragranceMatches.length > 0) {
        output += "\n⚠️  Fragrance Ingredients Found:\n";
        output += "--------------------------------------------\n";
        output += fragranceMatches.join(", ") + "\n\n";
    } else {
        output += "\n✅ No additional fragrance ingredients found.\n\n";
    }

    if (adjacentMatches.length > 0) {
        output += "\n⚠️  Adjacent Ingredients Found:\n";
        output += "--------------------------------------------\n";
        output += adjacentMatches.join(", ") + "\n\n";
    } else {
        output += "\n✅ No adjacent-ingredients found.\n\n";
    }

    output += "--------------------------------------------\n";

    document.getElementById("output").innerText = output;
}

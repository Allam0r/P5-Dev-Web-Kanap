// Récupération de l'ID du produit dans l'URL
let params = new URL(document.location).searchParams;
let orderId = params.get("orderId");
console.log(orderId);

// Affichage de orderId dans le champ approprié
document.getElementById("orderId").textContent = orderId;

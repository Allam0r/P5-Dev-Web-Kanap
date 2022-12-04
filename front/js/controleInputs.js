// Contrôler la quantité entre 1 et 100
function validQty(quantity) {
  if (quantity > 0 && quantity <= 100) {
    return true;
  } else {
    alert("La quantité selectionner n'est pas valide !");
    return false;
  }
}

// Contrôler la selection d'une couleur
function validColor(color) {
  if (color !== "") {
    return true;
  } else {
    alert("Veuillez selectionner une couleur !");
    return false;
  }
}

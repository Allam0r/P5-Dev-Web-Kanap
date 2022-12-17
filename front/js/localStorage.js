function setLocalStorage(arrayLocalStorage) {
  // On sauvegarde le tableau
  localStorage.setItem("KanapCart", JSON.stringify(arrayLocalStorage));
}

// ***************************************************************
// Fonction qui récupère un tableau d'articles du localStorage
function getLocalStorageArray() {
  // Si le localStorage contient un élément "KanapCart", on le récupère et on le parse
  if (localStorage.getItem("KanapCart") != null) {
    return JSON.parse(localStorage.getItem("KanapCart"));
    // Sinon, on renvoie un tableau vide
  } else {
    return [];
  }
}

// ***************************************************************
// Fonction qui vide le localStorage
function clearLocalStorage() {
  localStorage.clear();
}

// ***************************************************************
// Fonction qui enregistre les coordonnées de contact dans le localStorage
function setContact(contact) {
  // Enregistrement des coordonnées de contact dans le localStorage sous forme de chaîne de caractères JSON
  localStorage.setItem("contact", JSON.stringify(contact));
}

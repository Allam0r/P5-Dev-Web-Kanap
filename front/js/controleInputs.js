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

const regexName = /^[A-zÀ-ÿ ]{3,20}$/;
const regexAddress = /^[A-zÀ-ÿ0-9 ]{5,50}$/;
const regexEmail =
  /^[a-zA-Z0-9.!#$’*+/=?^_`{}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// /^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
// source regex mail: https://www.infomaniak.com/fr/support/faq/438/caracteres-admis-et-valides-dans-une-adresse-email

// Contrôle du "firstName"

function validFirstName() {
  const firstName = document.getElementById("firstName").value;
  if (regexName.test(firstName) == false) {
    document.getElementById("firstNameErrorMsg").textContent =
      "Le nombre de caractères doit être compris entre 3 et 20. Les symboles, caractères speciaux et les chiffres ne sont pas accepté.";
    return false;
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "";
    return true;
  }
}

// Contrôle du "lastName"

function validLastName() {
  const lastName = document.getElementById("lastName").value;
  if (regexName.test(lastName) == false) {
    document.getElementById("lastNameErrorMsg").textContent =
      "Le nombre de caractères doit être compris entre 3 et 20. Les symboles, caractères speciaux et les chiffres ne sont pas accepté.";
    return false;
  } else {
    document.getElementById("lastNameErrorMsg").textContent = "";
    return true;
  }
}

// Contrôle de "address"

function validAddress() {
  const address = document.getElementById("address").value;
  if (regexAddress.test(address) == false) {
    document.getElementById("addressErrorMsg").textContent =
      "Le nombre de caractères doit être compris entre 5 et 50. Les symboles et caractères speciaux ne sont pas accepté.";
    return false;
  } else {
    document.getElementById("addressErrorMsg").textContent = "";
    return true;
  }
}

// Contrôle de "city"

function validCity() {
  const city = document.getElementById("city").value;
  if (regexName.test(city) == false) {
    document.getElementById("cityErrorMsg").textContent =
      "Le nombre de caractères doit être compris entre 3 et 20. Les symboles, caractères speciaux et les chiffres ne sont pas accepté.";
    return false;
  } else {
    document.getElementById("cityErrorMsg").textContent = "";
    return true;
  }
}

// Contrôle de "email"

function validEmail() {
  const email = document.getElementById("email").value;
  if (regexEmail.test(email) == false) {
    document.getElementById("emailErrorMsg").textContent =
      "L'adresse Email n'est pas valide";
    return false;
  } else {
    document.getElementById("emailErrorMsg").textContent = "";
    return true;
  }
}

var tableLocalStorage = getLocalStorageArray();
var tableProductAPI = [];
var cart = [];

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
    getUserCart(products);
  })

  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

// ***************************************************************
// Fonction qui récupère les produits du panier de l'utilisateur
function getUserCart(products) {
  // Enregistrement de la liste de tous les produits dans une variable globale
  tableProductAPI = products;
  // Boucle sur chaque élément du panier de l'utilisateur stocké dans le localStorage
  for (let userOrder of tableLocalStorage) {
    // Filtrage de la liste de tous les produits pour trouver le produit correspondant à l'ID de l'élément du panier de l'utilisateur
    let arrayFilter = tableProductAPI.filter(
      (element) => element._id == userOrder.id
    );
    // Création d'un objet produit en fusionnant l'objet du produit trouvé dans la liste de tous les produits et l'élément du panier de l'utilisateur
    let product = {
      ...arrayFilter[0],
      ...userOrder,
    };
    // Ajout du produit au panier
    cart.push(product);
  }
  // Affichage du panier
  displayCart();
}

// ***************************************************************

// Fonction qui affiche le panier de l'utilisateur
function displayCart() {
  // Boucle sur chaque élément du panier
  cart.forEach((article) => {
    let articleLink = document.createElement("article");
    articleLink.classList.add("cart__item");
    articleLink.dataset.id = article.id;
    articleLink.dataset.color = article.color;

    let articleDivImg = document.createElement("div");
    articleDivImg.classList.add("cart__item__img");
    articleLink.appendChild(articleDivImg);

    let articleImg = document.createElement("img");
    articleImg.setAttribute("src", article.imageUrl);
    articleImg.setAttribute("alt", article.altTxt);
    articleDivImg.appendChild(articleImg);

    let articleDivContent = document.createElement("div");
    articleDivContent.classList.add("cart__item__content");
    articleLink.appendChild(articleDivContent);

    let articleDivContentDesc = document.createElement("div");
    articleDivContentDesc.classList.add("cart__item__content__description");
    articleDivContent.appendChild(articleDivContentDesc);

    let articleName = document.createElement("h2");
    articleName.textContent = article.name;
    articleDivContentDesc.appendChild(articleName);

    let articleColor = document.createElement("p");
    articleColor.textContent = article.color;
    articleDivContentDesc.appendChild(articleColor);

    let articlePrice = document.createElement("p");
    articlePrice.textContent = article.price + ` €`;
    articleDivContentDesc.appendChild(articlePrice);

    let articleDivSettings = document.createElement("div");
    articleDivSettings.classList.add("cart__item__content__settings");
    articleDivContent.appendChild(articleDivSettings);

    let articleDivSettingsQty = document.createElement("div");
    articleDivSettingsQty.classList.add(
      "cart__item__content__settings__quantity"
    );
    articleDivSettings.appendChild(articleDivSettingsQty);

    let articleQty = document.createElement("p");
    articleQty.textContent = `Qté : `;
    articleDivSettingsQty.appendChild(articleQty);

    let articleInput = document.createElement("input");
    articleInput.classList.add("itemQuantity");
    articleInput.setAttribute("type", `number`);
    articleInput.setAttribute("name", `itemQuantity`);
    articleInput.setAttribute("min", `1`);
    articleInput.setAttribute("max", `100`);
    articleInput.setAttribute("value", article.quantity);
    articleDivSettingsQty.appendChild(articleInput);

    let articleDivSettingsDelete = document.createElement("div");
    articleDivSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );
    articleDivSettings.appendChild(articleDivSettingsDelete);

    // Création du bouton "Supprimer" pour chaque produit du panier
    let articleDelete = document.createElement("p");
    articleDelete.classList.add("deleteItem");
    articleDelete.textContent = `Supprimer`;
    articleDivSettingsDelete.appendChild(articleDelete);
    // Ajout d'un évènement "click" au bouton "Supprimer" pour supprimer le produit du panier
    articleDelete.addEventListener("click", (event) =>
      deleteFromCart(event, articleLink, article.id, article.color)
    );

    document.getElementById("cart__items").appendChild(articleLink);
  });

  displayTotaux();
  updateQty();

  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();
    processOrder();
  });
}

// ***************************************************************

function displayTotaux() {
  // Initialiser les variables pour le total des prix et des quantités à 0
  let totalPrix = 0;
  let totalQte = 0;

  // Parcourir le tableau de panier et calculez les totaux de prix et de quantité
  for (element of cart) {
    totalPrix += element.price * element.quantity;
    totalQte += element.quantity;
  }
  // Affichez les totaux de prix et de quantité dans les éléments HTML correspondants
  document.getElementById("totalPrice").textContent = totalPrix;
  document.getElementById("totalQuantity").textContent = totalQte;
}

// ***************************************************************

function deleteFromCart(event, article, id, color) {
  //  Récupérer l'élément HTML qui contient les articles du panier
  cardItems = document.getElementById("cart__items");

  // Trouvez l'index de l'article à supprimer dans le tableau de stockage local
  index = tableLocalStorage.findIndex(
    (obj) => obj.id === id && obj.color === color
  );

  // Supprimer l'article du tableau de stockage local
  tableLocalStorage.splice(index, 1);

  // Supprimer l'article de l'élément HTML qui contient les articles du panier
  cardItems.removeChild(article);

  // Afficher une alerte indiquant que l'article a été supprimé du panier
  alert("Un article à été supprimer du panier.");

  // Supprimer l'article du tableau de panier
  cart.splice(index, 1);

  // Mettre à jour le localStorage
  setLocalStorage(tableLocalStorage);

  // Mettre à jour les totaux du panier
  displayTotaux();

  // Si le panier est vide, vider le stockage local
  if (cart == []) {
    clearLocalStorage();
  }
}

// ***************************************************************

function updateQty() {
  const itemQuantities = document.querySelectorAll(".itemQuantity");

  itemQuantities.forEach((element) => {
    // modifier l'element sur le html
    element.addEventListener("change", function (event) {
      event.preventDefault();
      // console.log("dans update qty ");
      // console.log(element.closest(".cart__item"));
      let article = element.closest(".cart__item");
      let id = article.dataset.id;
      let color = article.dataset.color;
      let newQty = parseInt(this.value);
      // controler la nouvelle qte saisie
      if (validQty(newQty)) {
        // modifier l'element dans le localstorage
        let elementInCart = cart.find(
          (article) => article._id == id && article.color == color
        );
        // console.log(elementInCart);
        let elementInLocalStorage = tableLocalStorage.find(
          (article) => article.id == id && article.color == color
        );
        // console.log(elementInLocalStorage);

        elementInCart.quantity = newQty;
        elementInLocalStorage.quantity = newQty;
        setLocalStorage(tableLocalStorage);
        // mettre à jour les totaux
        displayTotaux();
      }
    });
  });
}

// ***************************************************************

function processOrder() {
  // verfier que le panier n'est pas vide
  let size = tableLocalStorage.length;
  // verifier les champs saisis
  if (
    validFirstName() &&
    validLastName() &&
    validAddress() &&
    validCity() &&
    validEmail() &&
    size > 0
  ) {
    // si tout est ok : remplir un objet contact
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    // envoyer les objets (panier et contact) au back
    setContact(contact);
    const products = setProductID();
    // Rassemblement des infos ( contact et products)
    const data = {
      contact,
      products,
    };

    // Configuration des options pour l'envoi d'une requête HTTP POST
    const options = {
      // Méthode de la requête HTTP
      method: "POST",
      // Corps de la requête HTTP (envoi de données au serveur)
      body: JSON.stringify(data),
      // En-têtes de la requête HTTP
      headers: {
        // Type de contenu envoyé au serveur
        "Content-Type": "application/json",
        // Type de contenu accepté par le client
        Accept: "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((res) => res.json())
      .then((data) => {
        const orderId = data.orderId;
        clearLocalStorage();
        window.location.href = `./confirmation.html?orderId=${orderId}`;
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Une erreur est survenue! Veuillez contacter l'administrateur du site !"
        );
      });
  } else {
    alert("Veuillez verifier les données saisies.");
  }
}

// ***************************************************************

// Fonction qui récupère les IDs de tous les produits du panier de l'utilisateur
function setProductID() {
  // Création d'un tableau vide pour stocker les IDs des produits
  let products = [];
  // Boucle sur chaque élément du panier de l'utilisateur stocké dans le localStorage
  tableLocalStorage.forEach((element) => {
    // Ajout de l'ID du produit au tableau
    products.push(element.id);
  });
  return products;
}

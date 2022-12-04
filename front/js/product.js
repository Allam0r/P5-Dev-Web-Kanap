// Récupération de l'ID du produit dans l'URL
let params = new URL(document.location).searchParams;
let productId = params.get("_id");
console.log(productId);

// Affichage du produit via l'ID
fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
    productItem(product);
  })

  //  Alerte si l'API n'est pas joignable
  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

function productItem(product) {
  document.querySelector("title").textContent = product.name;

  let articleImg = document.createElement("img");
  articleImg.src = product.imageUrl;
  articleImg.alt = product.altTxt;
  document.querySelector(".item__img").appendChild(articleImg);

  let articleName = document.getElementById("title");
  articleName.textContent = product.name;

  let articlePrice = document.getElementById("price");
  articlePrice.textContent = product.price;

  let articleDesc = document.getElementById("description");
  articleDesc.textContent = product.description;

  for (let color of product.colors) {
    let articleColor = document.createElement("option");
    articleColor.value = color;
    articleColor.text = color;

    document.querySelector("#colors").appendChild(articleColor);
  }

  // Ajouter le contrôle de la selection d'une couleur
  document
    .getElementById("colors")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();

      validColor(this.value);
    });

  // Ajouter le controle de saisie d'une quantité valide ( etre 1 et 100)
  document
    .getElementById("quantity")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();

      let qty = parseInt(this.value);
      validQty(qty);
    });

  // Ajouter le listener et le controle sur le bouton ajouter au panier
  document
    .getElementById("addToCart")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();

      let qty = parseInt(document.getElementById("quantity").value);
      let isValidQty = validQty(qty);

      let isValidColor = validColor(document.getElementById("colors").value);

      // Si les deux champs sont valide
      if (isValidColor && isValidQty) {
        //  Données enregistrées dans le localStorage
        let orderOption = {
          id: `${product._id}`,
          color: document.getElementById("colors").value,
          quantity: parseInt(document.getElementById("quantity").value),
        };

        let array = getLocalStorageArray();
        // Mise à jour du tableau localStorage
        AjouterProduitDansTableau(orderOption, array);
        // Mise à jour du localStorage
        // Sauvegarde du tableau
        setLocalStorage(array);

        window.location = "./cart.html";
      }
      // Sinon rien à faire, afficher une alerte avec le probleme (Déjà faite dans les deux fonction valid)
    });
}

function AjouterProduitDansTableau(orderOption, tableau) {
  // Chercher si le produit a été deja ajouté
  const productFound = tableau.find(
    (elem) => elem.id == orderOption.id && elem.color == orderOption.color
  );

  // Produit non disponible
  if (productFound == undefined || productFound == null) {
    tableau.push(orderOption);
  }

  //  Si produit est disponible avec même ID/color
  // Si dispo on modifie de la quantité
  else {
    let qteTotal = productFound.quantity + orderOption.quantity;
    if (validQty(qteTotal)) productFound.quantity = qteTotal;
  }
}

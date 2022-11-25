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

      // Si les deux champs sont valid
      if (isValidColor && isValidQty) {
        // Ajout sur le localStorage
        function saveLocalStorage(orderOption) {
          let productSaveInLocal = JSON.parse(
            localStorage.getItem("KanapCart")
          );

          if (productSaveInLocal === null) {
            productSaveInLocal = [];
            productSaveInLocal.push(orderOption);
            localStorage.setItem(
              "KanapCart",
              JSON.stringify(productSaveInLocal)
            );
          } else {
            const productFound = productSaveInLocal.find(
              (elem) =>
                elem.id == orderOption.id && elem.color == orderOption.color
            );

            if (productFound == undefined) {
              productSaveInLocal.push(orderOption);
              localStorage.setItem(
                "KanapCart",
                JSON.stringify(productSaveInLocal)
              );

              //  Si produit avec même ID/color modification de la quantité
            } else {
              productFound.quantity += orderOption.quantity;
              localStorage.setItem(
                "KanapCart",
                JSON.stringify(productSaveInLocal)
              );
            }
          }
        }

        //  Données enregistrées dans le localStorage
        let orderOption = {
          id: `${product._id}`,
          name: `${product.name}`,
          image: `${product.imageUrl}`,
          imageDesc: `${product.altTxt}`,
          color: document.getElementById("colors").value,
          quantity: parseInt(document.getElementById("quantity").value),
          price: `${product.price}`,
        };
        saveLocalStorage(orderOption);
        window.location = "./cart.html";
      }
      // Sinon rien à faire, afficher une alerte avec le probleme (Déjà faite dans les deux fonction valid)
    });
}

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

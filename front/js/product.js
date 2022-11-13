// Recuperer l'identifiant du produit
let params = new URL(document.location).searchParams;
let productId = params.get("_id");
console.log(productId);

fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((product) => {
    console.log(product);
    productItem(product);
  })
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
    console.log(color);
    let articleColor = document.createElement("option");
    articleColor.value = color;
    articleColor.text = color;

    document.querySelector("#colors").appendChild(articleColor);
  }

  //Ajouter le controle de la selection d'une couleur
  document
    .getElementById("colors")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();

      validColor(this.value);
    });

  //Ajouter le controle de sais d'une bonne quantité ( etre 1 et 100)
  document
    .getElementById("quantity")
    .addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();

      let qty = parseInt(this.value);
      validQty(qty);
    });

  //Ajouter le listener et le controle sur le bouton ajouter au panier
  document
    .getElementById("addToCart")
    .addEventListener("click", function (event) {
      event.stopPropagation();
      event.preventDefault();

      let qty = parseInt(document.getElementById("quantity").value);
      let isValidQty = validQty(qty);

      let isValidColor = validColor(document.getElementById("colors").value);

      // si les deux champs sont valid
      if (isValidColor && isValidQty) {
        //=> ajouter sur le localStorage
      }
      //Sinon rien à faire afficher une alerte avec le probleme (Déjà faite dans les deux fonction valid)
    });
}

// controler la quantité entre 1 et 100
function validQty(quantity) {
  if (quantity > 1 && quantity <= 100) {
    return true;
  } else {
    alert("La quantité selectionner n'est pas valide !");
    return false;
  }
}

// controler la selection d'une couleur
function validColor(color) {
  if (color !== "") {
    return true;
  } else {
    alert("Veuillez selectionner une couleur !");
    return false;
  }
}

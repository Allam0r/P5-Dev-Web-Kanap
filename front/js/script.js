// Envoie une requête HTTP GET à l'URL spécifiée
fetch("http://localhost:3000/api/products")
  // Transforme la réponse en JSON
  .then((res) => res.json())
  .then((list) => {
    // Affiche le résultat dans la console sous forme de tableau
    console.table(list);

    // Appelle la fonction listKanap avec list comme argument
    listKanap(list);
  })

  // Si une erreur est survenue, affiche un message d'alerte et affiche le message d'erreur dans la console
  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

// ***************************************************************

function listKanap(listProducts) {
  // Pour chaque article de la liste de produits
  listProducts.forEach((article) => {
    // Création d'un article +
    // Définition de l'URL de l'élément "a" en utilisant l'ID de l'article
    let linkProduct = document.createElement("a");
    linkProduct.href = `./product.html?_id=${article._id}`;

    // Création d'un article
    let articleCard = document.createElement("article");
    linkProduct.appendChild(articleCard);

    // Création de la balise img + récupération des infos de l'image
    let articleImage = document.createElement("img");
    articleCard.appendChild(articleImage);
    articleImage.setAttribute("src", `${article.imageUrl}`);
    articleImage.setAttribute("alt", `${article.altTxt}`);

    // Création du h3 + récupération du nom de l'article
    let productName = document.createElement("h3");
    articleCard.appendChild(productName);
    productName.classList.add("productName");
    productName.textContent = `${article.name}`;

    // Création du p + récupération de la description de l'article
    let productDesc = document.createElement("p");
    articleCard.appendChild(productDesc);
    productDesc.classList.add("productDescription");
    productDesc.innerHTML = `${article.description}`;

    // Ajout de l'élément "a" à l'élément avec l'ID "items"
    document.querySelector("#items").appendChild(linkProduct);
  });
}

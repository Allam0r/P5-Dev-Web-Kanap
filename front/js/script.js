// Affichage des produits récuperer dans l'API

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((list) => {
    console.table(list);

    listKanap(list);
  })

  //  Alerte si l'API n'est pas joignable
  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

function listKanap(listProducts) {
  listProducts.forEach((article) => {
    // Creation du lien + éléments
    let linkProduct = document.createElement("a");
    linkProduct.href = `./product.html?_id=${article._id}`;

    let articleCard = document.createElement("article");
    linkProduct.appendChild(articleCard);

    let articleImage = document.createElement("img");
    articleCard.appendChild(articleImage);
    articleImage.setAttribute("src", `${article.imageUrl}`);
    articleImage.setAttribute("alt", `${article.altTxt}`);

    let productName = document.createElement("h3");
    articleCard.appendChild(productName);
    productName.classList.add("productName");
    productName.textContent = `${article.name}`;

    let productDesc = document.createElement("p");
    articleCard.appendChild(productDesc);
    productDesc.classList.add("productDescription");
    productDesc.innerHTML = `${article.description}`;

    document.querySelector("#items").appendChild(linkProduct);
  });
}

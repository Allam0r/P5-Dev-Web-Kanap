fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((list) => {
    console.table(list);

    listKanap(list);
  })
  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

function listKanap(index) {
  index.forEach((article) => {
    console.log(article);

    let linkProduct = document.createElement("a");
    document.querySelector("#items").appendChild(linkProduct);
    linkProduct.href = `./product.html?_id=${article._id}`;

    let articleCard = document.createElement("article");
    linkProduct.appendChild(articleCard);

    let articleImage = document.createElement("img");
    articleCard.appendChild(articleImage);
    articleImage.src = `${article.imageUrl}`;
    articleImage.alt = `${article.altTxt}`;

    let productName = document.createElement("h3");
    articleCard.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = `${article.name}`;

    let productDesc = document.createElement("p");
    articleCard.appendChild(productDesc);
    productDesc.classList.add("productDescription");
    productDesc.innerHTML = `${article.description}`;
  });
}

// **********************************************************************

// // Récupération des infos de l'API
// fetch("http://localhost:3000/api/products")
//   // Une fois les infos obtenues on recupère le résultat en Json
//   .then((res) => res.json())
//   //   Donne moi les infos sur la console sous forme de tableau
//   .then((list) => {
//     console.table(list);
//     // Fonction d'appel d'affichage des produits
//     listKanap(list);
//   })
//   .catch((error) => {
//     alert("Veuillez contacter l'administrateur du site");
//     console.log(error.message);
//   });
// // Fonction d'affichage des items de l'API sur la page Index
// function listKanap(index) {
//   // On déclare l'emplacement de 'articleCard' dans l'HTML
//   let articleCards = document.querySelector("#items");
//   // Création de la boucle article dans Index
//   for (let article of index) {
//     console.log(article);
//     // Mise en forme et récupération des infos: id, imageUrl, altTxt, name, desc pour chaques articles de la data
//     articleCards.innerHTML += `
//         <a href="./product.html?_id${article._id}">
//         <article>
//         <img src='${article.imageUrl}' alt='${article.altTxt}'>
//         <h3 class='productName'>${article.name}</h3>
//         <p class='productDescription'>${article.description}
//         </article>
//         </a>
//         `;
//   }
// }

// **********************************************************************

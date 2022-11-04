// **********************************************************************

// Récupération des infos de l'API
fetch("http://localhost:3000/api/products")
  // Une fois les infos obtenues on recupère le résultat en Json
  .then((response) => response.json())
  //   Donne moi les infos sur la console sous forme de tableau
  .then((data) => {
    console.table(data);
    // Fonction d'appel d'affichage des produits
    listKanap(data);
  });

// **********************************************************************

// Fonction d'affichage des items de l'API sur la page Index
function listKanap(index) {
  // On déclare l'emplacement de 'articleCard' dans l'HTML
  let articleCards = document.querySelector("#items");
  // Création de la boucle article dans Index
  for (let article of index) {
    // Mise en forme et récupération des infos: id, imageUrl, altTxt, name, desc pour chaques articles de la data
    articleCards.innerHTML += `
        <a href="./product.html?_id${article._id}">
        <article>
        <img src='${article.imageUrl}' alt='${article.altTxt}'>
        <h3 class='productName'>${article.name}</h3>
        <p class='productDescription'>${article.description}
        </article>
        </a>
        `;
  }
}

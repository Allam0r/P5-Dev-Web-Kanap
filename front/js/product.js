let params = new URL(document.location).searchParams;
let productId = params.get("_id");
console.log(productId);

fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((list) => {
    console.table(list);

    productItem(list);
  })
  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

function productItem(list) {
  let articlePage = list.name;
  document.querySelector("title").textContent = articlePage;

  let articleImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(articleImg);
  articleImg.src = list.imageUrl;
  articleImg.alt = list.altTxt;

  let articleName = document.getElementById("title");
  articleName.innerHTML = list.name;

  let articlePrice = document.getElementById("price");
  articlePrice.innerHTML = list.price;

  let articleDesc = document.getElementById("description");
  articleDesc.innerHTML = list.description;

  for (let colors of list.colors) {
    console.log(colors);
    let articleColor = document.createElement("option");
    document.querySelector("#colors").appendChild(articleColor);
    articleColor.value = colors;
    articleColor.innerHTML = colors;
  }
}

const cart = JSON.parse(localStorage.getItem("KanapCart"));

function cartList(cart) {
  cart.forEach((article) => {
    console.log(article);

    let articleLink = document.createElement("a");
    articleLink.classList.add("cart__item");
    articleLink.dataset.id = article.id;
    articleLink.dataset.color = article.color;

    let articleDivImg = document.createElement("div");
    articleDivImg.classList.add("cart__item__img");
    articleLink.appendChild(articleDivImg);

    let articleImg = document.createElement("img");
    articleImg.setAttribute("src", article.image);
    articleImg.setAttribute("alt", article.imageDesc);
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

    let articleDelete = document.createElement("p");
    articleDelete.classList.add("deleteItem");
    articleDelete.textContent = `Supprimer`;
    articleDivSettingsDelete.appendChild(articleDelete);

    document.getElementById("cart__items").appendChild(articleLink);
  });
}

function DisplayTotalQuantity() {
  const totalQuantity = document.querySelector("#totalQuantity");
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
}

if (cart != null) {
  cartList(cart);
  DisplayTotalQuantity();
} else {
  console.log("Le panier est vide");
}

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
cartList(cart);

// ***************************************************************

function changeQty() {
  let qtyChange = document.getElementsByClassName("itemQuantity");

  for (let elt = 0; elt < qtyChange.length; elt++) {
    qtyChange[elt].addEventListener("change", function (event) {
      event.stopPropagation();
      event.preventDefault();

      console.log(qtyChange[elt].value);

      let currentQty = cart[elt].quantity;
      let newQty = qtyChange[elt].valueAsNumber;

      const qtyValueFind = cart.find((el) => el.newQty !== currentQty);

      qtyValueFind.quantity = newQty;
      cart[elt].quantity = qtyValueFind.quantity;

      localStorage.setItem("KanapCart", JSON.stringify(cart));

      location.reload();
    });
  }
}
changeQty();

// ***************************************************************

function displayTotalQuantity() {
  let elemQty = document.getElementsByClassName("itemQuantity");
  let itemQtyLength = elemQty.length,
    totalQty = 0;

  for (let i = 0; i < itemQtyLength; ++i) {
    totalQty += elemQty[i].valueAsNumber;
  }

  let totalProductQty = document.getElementById("totalQuantity");
  totalProductQty.innerHTML = totalQty;
}
displayTotalQuantity();

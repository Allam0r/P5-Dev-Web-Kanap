var tableLocalStorage = getLocalStorageArray();
var tableProductAPI = [];
var cart = [];

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((products) => {
    // console.log("API :", products);
    getUserCart(products);
  })

  .catch((error) => {
    alert("Veuillez contacter l'administrateur du site");
    console.log(error.message);
  });

function getUserCart(products) {
  tableProductAPI = products;

  for (let userOrder of tableLocalStorage) {
    let arrayFilter = tableProductAPI.filter(
      (element) => element._id == userOrder.id
    );
    let product = {
      ...arrayFilter[0],
      ...userOrder,
    };
    cart.push(product);
  }
  displayCart();
}

// ***************************************************************

function displayCart() {
  cart.forEach((article) => {
    let articleLink = document.createElement("article");
    articleLink.classList.add("cart__item");
    articleLink.dataset.id = article.id;
    articleLink.dataset.color = article.color;

    let articleDivImg = document.createElement("div");
    articleDivImg.classList.add("cart__item__img");
    articleLink.appendChild(articleDivImg);

    let articleImg = document.createElement("img");
    articleImg.setAttribute("src", article.imageUrl);
    articleImg.setAttribute("alt", article.altTxt);
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
    articleDelete.addEventListener("click", (event) =>
      deleteFromCart(event, articleLink, article.id, article.color)
    );

    document.getElementById("cart__items").appendChild(articleLink);
  });

  displayTotaux();
  updateQty();

  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();
    processOrder();
  });
}

// ***************************************************************

function displayTotaux() {
  let totalPrix = 0;
  let totalQte = 0;

  for (element of cart) {
    totalPrix += element.price * element.quantity;
    totalQte += element.quantity;
  }
  document.getElementById("totalPrice").textContent = totalPrix;
  document.getElementById("totalQuantity").textContent = totalQte;
}

// ***************************************************************

function deleteFromCart(event, article, id, color) {
  cardItems = document.getElementById("cart__items");
  index = tableLocalStorage.findIndex(
    (obj) => obj.id === id && obj.color === color
  );
  tableLocalStorage.splice(index, 1);
  cardItems.removeChild(article);
  alert("Un article à été supprimer du panier.");
  cart.splice(index, 1);
  displayTotaux();

  if (cart == []) {
    clearLocalStorage();
  }
}

// ***************************************************************

function updateQty() {
  const itemQuantities = document.querySelectorAll(".itemQuantity");

  itemQuantities.forEach((element) => {
    // modifier l'element sur le html
    element.addEventListener("change", function (event) {
      event.preventDefault();
      // console.log("dans update qty ");
      // console.log(element.closest(".cart__item"));
      let article = element.closest(".cart__item");
      let id = article.dataset.id;
      let color = article.dataset.color;
      let newQty = parseInt(this.value);
      // controler la nouvelle qte saisie
      if (validQty(newQty)) {
        // modifier l'element dans le localstorage
        let elementInCart = cart.find(
          (article) => article._id == id && article.color == color
        );
        // console.log(elementInCart);
        let elementInLocalStorage = tableLocalStorage.find(
          (article) => article.id == id && article.color == color
        );
        // console.log(elementInLocalStorage);

        elementInCart.quantity = newQty;
        elementInLocalStorage.quantity = newQty;
        setLocalStorage(tableLocalStorage);
        // mettre à jour les totaux
        displayTotaux();
      }
    });
  });
}

// ***************************************************************

function processOrder() {
  // verfier que le panier est plein
  let size = tableLocalStorage.length;
  // verifier les champs saisis
  if (
    validFirstName() &&
    validLastName() &&
    validAddress() &&
    validCity() &&
    validEmail() &&
    size > 0
  ) {
    // si tout est ok : remplir un objet contact
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    // envoyer les objets (panier et contact) au back
    setContact(contact);
    const products = setProductID();
    // Rassemblement des infos
    const data = {
      contact,
      products,
    };

    //console.log(data);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.orderId);
        const orderId = data.orderId;
        clearLocalStorage();
        window.location.href = `./confirmation.html?orderId=${orderId}`;
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Une erreur est survenue! Veuillez contacter l'administrateur du site !"
        );
      });
  } else {
    alert(
      "Veuillez verifier les données saisies et les produits de votre panier!!"
    );
  }
}

function setProductID() {
  let products = [];
  tableLocalStorage.forEach((element) => {
    products.push(element.id);
  });
  return products;
}

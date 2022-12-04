function setLocalStorage(arrayLocalStorage) {
  // On sauvegarde le tableau
  localStorage.setItem("KanapCart", JSON.stringify(arrayLocalStorage));
}

function getLocalStorageArray() {
  if (localStorage.getItem("KanapCart") != null) {
    return JSON.parse(localStorage.getItem("KanapCart"));
  } else {
    return [];
  }
}

function clearLocalStorage() {
  localStorage.clear();
  // localStorage.removeItem("KanapCart");
}

//Mise en place d'une constante serveur à appeler à chaque opération
const server = "http://localhost:3000/api/products/";
// créaton de localData pour récupérer le localstrorage
let localData = JSON.parse(localStorage.getItem("cart")) || {};
// localData = localStorage.removeItem(price);
// delete product.price;
// if (localData === null) localData = {};
/**
 * Fonction qui ajoute un produit par id dnas le localdata
 *
 * @param   {number}  product   produit
 * @param   {string}  product   Couleur du produit
 *
 *
 * @return  {void}              crée l'entrée si necessaire et met à jour la quantité 
 **/
function addToCart(product) {
  const key = product.id + "_" + product.couleur;
  if (localData[key] === undefined) {
    localData[key] = product;
  } else {
    localData[key].quantite =
      parseInt(localData[key].quantite) + product.quantite;
      
  }

  alert("Votre commande a bien été ajouté au panier");

   saveLocalStorage();
}

/**
 *  Fonction qui enregistre le localstorage
 *
 * @return  {void}  
 */
function saveLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(localData));
}
/**
 Fonction async qui recupère la peponse.json par id
 *
 * @param   {number}  id  Id number
 *
 * @return  {Object}      les données au format json
 */
async function getProductInfo(id) {
  const reponse = await fetch(server + id);
  return await reponse.json();
}
/**
 *  Fonction qui permet de supprimer des produits
 *  selon l'id dans le localdata.
 *
 * @param   {Number}  id  Numéro d'id
 *
 * @return  {void}        Delete de localdata et saveLocalStorage
 */
function removeProduct(id) {
  delete localData[id];
  initPage();
  saveLocalStorage();
}
/**
 * Fonction qui permet de retourner le localdata
 *
 * @return  {Object}  localdata
 */
function getCart() {
return localData;
}


/**
 * Fonction qui permet de changer la quantité des canapés dans le panier
 *
 * @param   {number}  product   
 * @param   {number}  quantite  quantité de canapés
 *
 * @return  {void}           met à jour le localStorage
 */
function changeQuantity(product, quantite) {
  if (quantite === 0) return removeProduct(product);
  localData[product].quantite = parseInt(quantite);
  saveLocalStorage();
}

/**
 *  Fonction asynchrone qui envoie le formulaire à l'api et retourne
 * l'orderId
 *
 * @param   {String}  contact  données de contact du formulaire
 *
 * @return  {void}
 */
async function sendOrder(contact) {
  const products = [];

  for (const value of Object.values(localData)) {
    
    products.push(value.id);
  }

  fetch(server + "order", {
    method: "POST",
    body: JSON.stringify({ contact, products }),
    headers: {
      Accept: "application/json,text/plain,*/*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
       if (res.ok) console.log(res)
      return res.json();
     })

.then((data) =>{
  if(data.products === null || data.products == 0){
return alert("Votre panier est vide")
  }else{
    (!data.orderId)
    localStorage.setItem("orderId", data.orderId);
     localStorage.clear();
     localData = {};
     document.location.href = `confirmation.html?orderId=${data.orderId}`;
     
 }
; }).catch(error=> { console.log(err) });}
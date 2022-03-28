/**
 * @typedef {Object}   ficheProduit
 * @property {Array}   colors  exemple": [ "Blue", "White", "Black"],
 * @property {String}   _id    exemple : "107fb5b75607497b96722bda5b504926",
 * @property {String}   name    exemple : "Kanap Sinopé",
 * @property {Number}   price    exemple : 1849,
 * @property {String}   imageUrl    exemple : "http://localhost:3000/images/kanap01.jpeg",
 * @property {String}   description    exemple : "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
 * @property {String}   altTxt    exemple : "Photo d'un canapé bleu, deux places"
 */


/**
 * Fonction qui permet de récupérer le paramètre id de l'adresse url de chaque produit
 *
 * @return  {String}  id du produit
 */

function getIdFromUrl(){
    const queryString = window.location.search;       
    const urlParams = new URLSearchParams(queryString);
    const product_id = urlParams.get("id");
    return product_id;

};
/**
  fonction async à laquelle je passe la fonction getUrlFromId();

 *
 * @return  {void}  recupère les infos des kanap individuellement
 */
async function getProductById(){

    const product = await getProductInfo(getIdFromUrl());
    document.querySelector("title").innerText = `${product.name}`;
    document.querySelector(".item").innerHTML = ` <article>
    <div class="item__img">
       <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="item__content">

      <div class="item__content__titlePrice">
        <h1 id="title">${product.name}</h1>
        <p>Prix : <span id="price">${product.price}</span>€</p>
      </div>

      <div class="item__content__description">
        <p class="item__content__description__title">${product.description}</p>
        <p id="description"><!-- Dis enim malesuada risus sapien gravida nulla nisl arcu. --></p>
      </div>

      <div class="item__content__settings">
        <div class="item__content__settings__color">
          <label for="color-select">Choisir une couleur :</label>
          <select name="color-select" id="colors">
              <option value="">--SVP, choisissez une couleur --</option>
              ${productColors(product.colors)}
          </select>
        </div>

        <div class="item__content__settings__quantity">
          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
        </div>
      </div>

      <div class="item__content__addButton">
        <button id="addToCart">Ajouter au panier</button>
      </div>

    </div>
  </article>`
  ;

  const colorChoice = document.getElementById('colors');

  const quantity = document.getElementById('quantity');


  const elt = document.getElementById('addToCart');


  
  //on écoute l'élément onclick
elt.addEventListener('click', function(){
 
  const quantite = parseInt(quantity.value); //analyse et renvoie un entier

  if (colorChoice.value === "" || quantite === 0 || quantite >100){
    alert("la saisie est incorrecte");
    return;
  }
  const couleur = colorChoice.value;
  

  // if(quantite === undefined || quantity === 0){
  //   alert("choisissez une quantité entre 0 et 100")
  //   return;
  // }else{

   addToCart({
    couleur,
    quantite,
    // price : product.price,
    // imageUrl : product.imageUrl,
    // name : product.name,
    id : product._id
  })

});

}
getProductById();
/**
 * Fonction qui permet de choisir la couleur du Canapé
 *
 * @param   {string}  colors  couleur
 *
 * @return  {void}      ajoute la couleur dans le dom    
 */
function productColors(colors) {
  let options = "";

  for(let color of colors) {
    options += `<option value="${color}">${color}</option>`
  }
  return options;
}






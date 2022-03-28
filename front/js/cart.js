
let total;
let nbOfProducts;

/**
 * Fonction qui se déclanche à la fin du processus de chargement du DOM
 *
 * @return  {void} 
 */
async function initPage() {
  document.querySelector("#order").addEventListener("click", validOrder);

  const localData = getCart();

  if (localData === null) {
  
  } else {
    total = 0;
    nbOfProducts=0;
    let html = "";
    // let ref;
    for (const value of Object.values(localData)) {
      html += await makeProductSummary(value);
      updateResume();
    }
    document.querySelector("#cart__items").innerHTML = html;
  }
}


async function makeProductSummary(props){
  
  const ref =props.id + "_" + props.couleur;
  const value = await getProductInfo(props.id);
  nbOfProducts+=props.quantite;
  total+= props.quantite*value.price;

  return `    <article class="cart__item" data-id="${ref}">
  <div class="cart__item__img">
    <img src="${value.imageUrl}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
      <h2>${value.name}</h2>
      <p>${props.couleur}</p>
      <p>${value.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté :</p>
        <input type="number" class="itemQuantity"  name="itemQuantity" min="1" max="100" value="${props.quantite}" onchange="changeQty('${ref}', this.value)">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem" onclick="removeCartProduct('${ref}')">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
}

window.onload = initPage;
/**
 * Fonction qui permet de mettre à jour le nbOfProducts et de calculer le nouveau total et
 * de l'afficher dans le ".cart__price"
 *
 * @return  {void}
 */
function updateResume() {
  // const { nbOfProducts, newTotal } = getTotalPrice();
  document.querySelector(".cart__price").innerHTML = `
              <p>Total (<span id="totalQuantity">
              ${nbOfProducts}
                </span> article${
                  nbOfProducts <= 1 ? "" : "s"
                }) : <span id="totalPrice">
                  ${total}
                </span> €</p>
            </div>`;
            
}
initPage()
/**
 * Fonction permettant d'enlever un produit selon son id
 *
 * @param   {Number}  id  Numéro du produit (id) à enelever
 *
 * @return  {void}      
 */
function removeCartProduct(id) {
  removeProduct(id);
  const target = document.querySelector(`article[data-id="${id}"]`);
  target.parentNode.removeChild(target);
  initPage();
}

/**
 * fonction appelée par un bouton qui met à jour la quantité commandée d'un produit
 *
 * @param   {Number}  id   Numéro d'id du canapé
 * @param   {Number}  qty  quantité de canapé
 *
 * @return  {void}
 */
function changeQty(id, qty) {
  changeQuantity(id, qty);
  initPage();
}


/**
 * recupère les données du formulaire et envoi la commande
 *
 * @param   {Event}  event
 *
 * @return  {void}         met à jour le localStorage et transmet les informations au datamanager
 */
function validOrder(event) {
  event.preventDefault();
  event.stopPropagation();

  const contact = {
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
  };

  let fields = document.querySelectorAll(
      ".cart__order__form input, .cart__order__form select, .cart__order__form textarea"
    );
    let valid = true;
    for (let field of fields) {
      valid &= check(field);
      if (!valid) return;
    }
 
     sendOrder(contact);
  
  };

  /**
   * Fonction qui permet de gérer les restrictions du formulaire
   *
   * @param   {string}  input  les champs du formulaire
   *
   * @return  {void}         L'instruction reportValidity
   */
  function check(input) {
    input.setCustomValidity("");
    if (input.validity.tooshort) {
      input.setCustomValidity(
        `Ce champ doit comporter au moins ${input.minLength} caractères`
      );
    }
    if (input.validity.valueMissing) {
      input.setCustomValidity("Ce champ est obligatoire");
    }
    return input.reportValidity();
  }


/**
 * Fonction qui permet de faire le total des produits
 * et des prix
 *
 * @return  {Object}  newTotal(price) et nbOfProducts
 */
//  function getTotalPrice() {
//   let newTotal = 0;
//   let nbOfProducts = 0;
//   for (const product of Object.values(localData)) {
//     product.quantite = parseInt(product.quantite);
//     newTotal += product.price * product.quantite;
//     nbOfProducts += product.quantite;
//   }
//   return { newTotal, nbOfProducts };
// }
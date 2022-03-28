/**
 *
   fonction asynchrone getAllProducts() pour récupérer 
   toutes les infos des produits par id
  
 *
 * @return  {void}  
 */
async function getAllProduct(){
const reponse = await fetch(server);
const productList = await reponse.json();  // création d'une constante productList
let html  = "";
productList.forEach(produit => {
    html += `<a href="./product.html?id=${produit._id}">
    <article>
    <img src="${produit.imageUrl}" alt="${produit.alTxt}">
      <h3 class="productName">${produit.name}</h3>
      <p class="productDescription">${produit.description}</p>
    </article>
  </a>`
    });
     document.querySelector("#items").innerHTML = html;
}

getAllProduct();

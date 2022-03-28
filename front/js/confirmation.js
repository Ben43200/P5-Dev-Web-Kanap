/**
 * fonction qui récupère l'orderId de l'url
 *
 * @return  {void}
 */
function getOrderIdFromUrl(){
  const queryString = window.location.search;       
  const urlParams = new URLSearchParams(queryString);
  const orderId = urlParams.get("orderId");
  

document.getElementById("orderId").innerHTML = orderId;


};

getOrderIdFromUrl();



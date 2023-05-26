function disable() { 
  document.getElementById("lastname").disabled = true;
  document.getElementById("firstname").disabled = true;
  document.getElementById("address").disabled = true;
  document.getElementById("contact").disabled = true;
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;  
  
  document.getElementById("productName").disabled = true;
  document.getElementById("price").disabled = true;
  document.getElementById("stock").disabled = true;
  document.getElementById("description").disabled = true;
  document.getElementById("productImage").disabled = true;
  document.getElementById("productCategory").disabled = true;
}
 function enable() { 
  document.getElementById("lastname").disabled = false;
  document.getElementById("firstname").disabled = false;
  document.getElementById("address").disabled = false;
  document.getElementById("contact").disabled = false;
  document.getElementById("username").disabled = false;
  document.getElementById("password").disabled = false; 

  document.getElementById("productName").disabled = false;
  document.getElementById("price").disabled = false;
  document.getElementById("stock").disabled = false;
  document.getElementById("description").disabled = false;
  document.getElementById("productImage").disabled = false;
  document.getElementById("productCategory").disabled = false;
}

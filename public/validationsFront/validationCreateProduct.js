window.addEventListener("load", (e) => {
    let form = document.querySelector(".createForm");
    let name = document.querySelector("#name");
    let description = document.querySelector("#description");
    let category = document.querySelector("#category");
    let price = document.querySelector("#price");
    let image = document.querySelector("#image");
    
  
  
    form.addEventListener('submit', e=>{
      let errors = [];
  if (name.value == "") {
      errors.push('Ingrese un nombre al producto')
  }
  
  if (description.value < 20) {
      errors.push('Ingrese una descripcion de al menos 20 caracteres')
  }
  
  if (category.value == "") {
      errors.push('Ingrese una categoría')
  }
  
  if (price.value == "") {
      errors.push('Ingrese un precio')
  }
  
  if (image.value == "") {
      errors.push('Ingrese una imagen')
  }
  
  if (errors.length > 0) {
      e.preventDefault();
      let ulErrors = document.querySelector('div.errors ul')
      for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += '<li style="color: green">' + errors[i] +'</li>'
          
      }
  }
  
    })
  });
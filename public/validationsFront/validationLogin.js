window.addEventListener("load", (e) => {
   let form = document.querySelector(".loginForm");
   let email = document.querySelector("#email");
   let password = document.querySelector("#password");

   form.addEventListener('submit', e=>{
     let errors = [];
 if (email.value == "") {
     errors.push('Ingrese un email')
 }
 
 if (password.value == "") {
     errors.push('Ingrese una contraseña')
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
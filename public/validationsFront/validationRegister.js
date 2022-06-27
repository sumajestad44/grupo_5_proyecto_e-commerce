window.addEventListener("load", (e) => {
  let form = document.querySelector("#registerForm");
  let name = document.querySelector("#first_name");
  let lastName = document.querySelector("#last_name");
  let email = document.querySelector("#email");
  let password = document.querySelector("#password");
  let repassword = document.querySelector("#password_confirm");


  form.addEventListener('submit', e=>{
    let errors = [];
if (name.value == "") {
    errors.push('Ingrese un nombre')
}

if (lastName.value == "") {
    errors.push('Ingrese un apellido')
}

if (email.value == "") {
    errors.push('Ingrese un email')
}

if (password.value == "") {
    errors.push('Ingrese una contraseña')
}

if (repassword.value == "") {
    errors.push('Reingrese la contraseña')
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

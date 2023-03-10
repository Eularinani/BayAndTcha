var formEntrar = document.querySelector('#Entrar')
var formCadastro = document.querySelector('#Sair')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnEntrar')
  .addEventListener('click', () => {
    formEntrar.style.left = "25px"
    formCadastro.style.left = "450px"
    btnColor.style.left = "0px"
})
async function login() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("Email").value;
        let pass = document.getElementById("Passe").value;
        let result = await requestLogin(email,pass);
        if (result.err) {
            msgDOM.textContent = "An error occurred";
        } else if (!result.successful) {
            msgDOM.textContent = "Wrong username or password";    
        } else {
            msgDOM.textContent = "Login successful!";    
            window.location.pathname = "/profile.html"
        }
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";
    }
}

async function register() {
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("Email").value;
        let pass = document.getElementById("Passe").value;
        let result = await requestLogin(email,pass);
        if (res.successful) {
            msgDOM.textContent = "Account created. Go to login page";
        } else {
            msgDOM.textContent = "Was not able to register";
        }      
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "An error occurred";   
    }
}

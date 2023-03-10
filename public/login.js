var formEntrar = document.querySelector('#entrar')
var formCadastro = document.querySelector('#cadastros')
var btnColor = document.querySelector('.btnColor')

document.querySelector('#btnEntrar')
  .addEventListener('click', () => {
    formEntrar.style.left = "25px"
    formCadastro.style.left = "450px"
    btnColor.style.left = "0px"
})

document.querySelector('#btnCadastro')
  .addEventListener('click', () => {
    formEntrar.style.left = "-450px"
    formCadastro.style.left = "25px"
    btnColor.style.left = "110px"
})

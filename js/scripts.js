const sistema = new Sistema();
const btnRegistro = document.querySelector('#ingresar-registro');

//Función que se ejecuta al clickear el botón de "Registrarse"
function registrarUsuario() {
  const nombre = document.querySelector('#nombre-registro').value;
  const apellido = document.querySelector('#apellido-registro').value;
  const userName = document.querySelector('#usuario-registro').value;
  const pass = document.querySelector('#pass-registro').value;
  const numTarjeta = document.querySelector('#tarjeta-registro').value;
  const cvcTarjeta = document.querySelector('#cvc-registro').value;
  const usuarioComprador = new Persona(nombre, apellido, userName, pass, numTarjeta, cvcTarjeta);

  if (!sistema.validarUserNameRepetido(userName) && usuarioComprador.validarRegistroUsuario()) {
    sistema.agregarUsuario(usuarioComprador);
    console.log(sistema.listaUsuarios)
  } else {
    alert('asas');
  }
}

btnRegistro.addEventListener('click', () => {
  registrarUsuario(sistema.listaUsuarios);
})

//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const btnLogin = document.querySelector("#ingresar-login");

  btnRegistro.addEventListener('click', e => {

    const userName = document.querySelector("#username-login")
    const pass = document.querySelector("#pass-login")

  })

}
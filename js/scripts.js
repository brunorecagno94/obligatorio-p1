const sistema = new Sistema();
const btnRegistro = document.querySelector('#registrar-usuario');
const btnCrearProducto = document.querySelector('#btn-crear-producto');

//Función que se ejecuta al clickear el botón de "Registrarse"
function registrarUsuario() {
  const nombre = document.querySelector('#nombre-registro').value;
  const apellido = document.querySelector('#apellido-registro').value;
  const userName = document.querySelector('#usuario-registro').value;
  const pass = document.querySelector('#pass-registro').value;
  const numTarjeta = document.querySelector('#tarjeta-registro').value;
  const cvcTarjeta = document.querySelector('#cvc-registro').value;
  const usuarioComprador = new Persona(nombre, apellido, userName, pass, numTarjeta, cvcTarjeta);

  //Si los datos son válidos, se agrega el usuario al array de usuarios
  if (!sistema.validarUserNameRepetido(userName) && usuarioComprador.validarRegistroUsuario()) {
    sistema.agregarUsuario(usuarioComprador);
    console.log(sistema.listaUsuarios)
  } else {
    alert('No se registró el usuario');
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

//Functión que se ejecuta al clickear el botón "Crear producto"
function crearProducto() {
  const nombreProd = document.querySelector('#input-nombre-producto').value;
  const precioProd = document.querySelector('#input-precio-producto').value;
  const descripcionProd = document.querySelector('#input-descripcion-producto').value;
  const urlImagen = document.querySelector('#input-imagen-producto').value;
  const stockProd = document.querySelector('#input-stock-producto').value;
  const producto = new Producto(nombreProd, precioProd, descripcionProd, urlImagen, stockProd);

  //Si los datos son válidos, se crea el producto
  if (producto.validarProducto()) {
    sistema.agregarProducto(producto);
    console.log(sistema.listaProductos)
  } else {
    alert('No se agregó el producto');
  }
}

btnCrearProducto.addEventListener('click', () => {
  crearProducto(sistema.listaProductos);
})

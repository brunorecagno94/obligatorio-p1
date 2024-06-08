const sistema = new Sistema();
const btnRegistro = document.querySelector('#registrar-usuario');
const btnCrearProducto = document.querySelector('#btn-crear-producto');
const btnLogin = document.querySelector("#ingresar-login");

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
  if (!buscarAtributo(sistema.listaUsuarios, 'userName', userName) && !validarCaseInsensitive(sistema.listaUsuarios, 'userName', userName) && usuarioComprador.validarRegistroUsuario()) {
    sistema.agregarUsuario(usuarioComprador);
  } else {
    alert('No se registró el usuario');
  }
}

btnRegistro.addEventListener('click', () => {
  registrarUsuario(sistema.listaUsuarios);
})

//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const inputUserName = document.querySelector("#username-login").value.trim();
  const inputPass = document.querySelector("#pass-login").value.trim();
  /* let objetoUsuario = buscarObjeto(sistema.listaUsuarios, 'userName', inputUserName); */

  if (buscarAtributo(sistema.listaUsuarios, 'pass', inputPass)
    && validarCaseInsensitive(sistema.listaUsuarios, 'userName', inputUserName)) {
    alert('Login EXITOSO')
  } else {
    alert('Login FALLADO')
  }
}

btnLogin.addEventListener('click', () => {
  loginUsuario(sistema.listaUsuarios)
});

//Functión que se ejecuta al clickear el botón "Crear producto"
function crearProducto() {
  const nombreProd = document.querySelector('#input-nombre-producto').value;
  const precioProd = document.querySelector('#input-precio-producto').value;
  const imagenSeleccionada = document.querySelector('#input-imagen-producto').value;
  const urlImagen = asignarImagen(imagenSeleccionada); 
  const descripcionProd = document.querySelector('#input-descripcion-producto').value;
  const stockProd = document.querySelector('#input-stock-producto').value;

  const producto = new Producto(nombreProd, precioProd, descripcionProd, urlImagen, stockProd);
  
  //Si los datos son válidos, se crea el producto
  if (producto.validarProducto()) {
    sistema.agregarProducto(producto);
  } else {
    alert('No se agregó el producto');
  }
}
function asignarImagen(imagenSeleccionada) {
  switch (imagenSeleccionada) {
    case 'img-pelota':
      urlImagen = './img/pelota.jpg';
      break;
    case 'img-camiseta':
      urlImagen = './img/camiseta.png';
      break;
    case 'img-zapatillas':
      urlImagen = './img/zapatilla.jpeg';
      break;
    case 'img-conos':
      urlImagen = './img/conos.jpg';
      break;
    case 'img-proteccion':
      urlImagen = './img/proteccion.jpg';
      break;
  }
}
btnCrearProducto.addEventListener('click', () => {
  crearProducto(sistema.listaProductos);
})





const sistema = new Sistema();
const btnRegistro = document.querySelector('#registrar-usuario');
const btnCrearProducto = document.querySelector('#btn-crear-producto');
const btnLogin = document.querySelector("#ingresar-login");
const seccionRegistro = document.querySelector('#contenedor-registro');
const listadoProductos = document.querySelector('#contenedor-productos');

/* document.querySelector('#boton').addEventListener('click', e => {
  e.preventDefault();
  if(!sistema.usuarioLogueado) {
    
  sistema.usuarioLogueado = true;
    seccionRegistro.style.display = 'none';
  } else {
    seccionRegistro.style.display = 'block';
  }

}) */


//REGISTRO DE USUARIO
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


//LOGIN DE USUARIO
//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const inputUserName = document.querySelector("#username-login").value.trim();
  const inputPass = document.querySelector("#pass-login").value.trim();
  /* let objetoUsuario = buscarObjeto(sistema.listaUsuarios, 'userName', inputUserName); */

  if (buscarAtributo(sistema.listaUsuarios, 'pass', inputPass)
    && validarCaseInsensitive(sistema.listaUsuarios, 'userName', inputUserName)) {
    alert('Login EXITOSO')
  } else {
    alert('Tu nombre de usuario o contraseña son incorrectas')
  }
}

btnLogin.addEventListener('click', () => {
  loginUsuario(sistema.listaUsuarios)
});


//CREACIÓN DE PRODUCTO
//Functión que se ejecuta al clickear el botón "Crear producto"
function crearProducto() {
  const nombreProd = document.querySelector('#input-nombre-producto').value;
  const precioProd = document.querySelector('#input-precio-producto').value;
  const imagenSeleccionada = document.querySelector('#input-imagen-producto').value;
  const urlImagen = asignarImagen(imagenSeleccionada);
  const descripcionProd = document.querySelector('#input-descripcion-producto').value;
  const stockProd = parseInt(document.querySelector('#input-stock-producto').value.trim());

  const producto = new Producto(nombreProd, precioProd, descripcionProd, urlImagen, stockProd);

  let productoTabla = `
  <tr>
    <td>
      ${nombreProd}
    </td>
    <td>${precioProd}</td>
    <td>${descripcionProd}</td>
    <td>${producto.oferta ? 'Sí' : 'No'}</td>
    <td><img src=${urlImagen} alt=${descripcionProd}></td>
    <td><input type="number" value="cantidad-producto-compra"></td>
    <td>
      <input type="button" value="Comprar"/>
    </td>
  </tr>`;

  //Si los datos son válidos, se crea el producto
  if (producto.validarProducto()) {
    if (buscarAtributo(sistema.listaProductos, 'imagen', urlImagen)) {
      sumarStock(sistema.listaProductos, 'imagen', urlImagen, stockProd);
      console.log(sistema.listaProductos)
    } else {
      sistema.agregarProducto(producto);
      listadoProductos.innerHTML += productoTabla;
    }
  } else {
    alert('No se agregó el producto');
  }
}

//Define la imagen del producto dependiendo del valor del select
function asignarImagen(imagenSeleccionada) {
  switch (imagenSeleccionada) {
    case 'img-pelota':
      urlImagen = './img/pelota.jpg';
      break;
    case 'img-camiseta':
      urlImagen = './img/camiseta.png';
      break;
    case 'img-zapatillas':
      urlImagen = './img/zapatillas.jpeg';
      break;
    case 'img-conos':
      urlImagen = './img/conos.jpg';
      break;
    case 'img-proteccion':
      urlImagen = './img/proteccion.jpg';
      break;
    default:
      urlImagen = "";
  }

  return urlImagen;
}

btnCrearProducto.addEventListener('click', () => {
  crearProducto(sistema.listaProductos);
})





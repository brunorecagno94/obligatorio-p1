const sistema = new Sistema();
const btnRegistro = document.querySelector('#registrar-usuario');
const btnLogin = document.querySelector("#ingresar-login");
const btnCrearProducto = document.querySelector('#btn-crear-producto');
const seccionRegistro = document.querySelector('#contenedor-registro');
const listadoProductos = document.querySelector('#contenedor-productos');
const listadoCompras = document.querySelector('#contenedor-compras-usuario');
const parrafoMontoTotal = document.querySelector('#total-compras-usuario');



//REGISTRO DE USUARIO
//Función que se ejecuta al clickear el botón de "Registrarse"
function registrarUsuario() {
  const nombre = document.querySelector('#nombre-registro').value;
  const apellido = document.querySelector('#apellido-registro').value;
  const userName = document.querySelector('#usuario-registro').value;
  const pass = document.querySelector('#pass-registro').value;
  const numTarjeta = document.querySelector('#tarjeta-registro');
  const cvcTarjeta = document.querySelector('#cvc-registro').value;

  //Agrega un guión cada 4 dígitos al input de la tarjeta de crédito
  numTarjeta.addEventListener('keydown', e => {
    if (numTarjeta.length === 4 || numTarjeta.length === 9 || numTarjeta.length === 14) {
      numTarjeta.innerHTML += '-';
    }
  })

  const usuarioComprador = new Persona(nombre, apellido, userName, pass, numTarjeta.value, cvcTarjeta);
  console.log(usuarioComprador)
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

/*--------------------------------------------------------- */

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
    <td><input type="number" id="cantidad-producto-compra"></td>
    <td>
      <input type="button" data-value="${idProducto}" class="btn-comprar-producto" value="Comprar"/>
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

  const btnComprarProducto = document.querySelectorAll('.btn-comprar-producto');

  for (let i = 0; i < btnComprarProducto.length; i++) {
    btnComprarProducto[i].addEventListener("click", comprarProducto);
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
    case 'img-pesa':
      urlImagen = './img/pesa.jpg';
      break;
    case 'img-gorra':
      urlImagen = './img/gorra.jpg';
      break;
    case 'img-lentes':
      urlImagen = './img/lentes.jpg';
      break;
    case 'img-patas':
      urlImagen = './img/patas.jpg';
      break;
    case 'img-botella':
      urlImagen = './img/botella.jpg';
      break;
    default:
      urlImagen = "";
  }

  return urlImagen;
}

btnCrearProducto.addEventListener('click', () => {
  crearProducto(sistema.listaProductos);
})

//COMPRA DE PRODUCTOS
function comprarProducto() {
  const nombreProd = document.querySelector('#input-nombre-producto').value;
  const precioProd = document.querySelector('#input-precio-producto').value;
  const cantidad = parseInt(document.querySelector('#cantidad-producto-compra').value.trim());

  if (!isNaN(cantidad) && cantidad > 0) {
    const compra = new Compra(nombreProd, cantidad, precioProd);

    let compraTabla = `
    <tr>
      <td>${compra.nombre}</td>
      <td>${cantidad}</td>
      <td>${precioProd}</td>
      <td>
        <input type="button" data-value=${idProducto} class="btn-cancelar-compra" value="Cancelar"/>
      </td>
    </tr>
    `
    listadoCompras.innerHTML += compraTabla;
  } else {
    alert('Debe comprar al menos una unidad')
  }
}

function divPrueba() {
  const select = document.querySelector('#select-prueba').value;
  const div = document.querySelector('#div-prueba');
  let result = ``

  switch (select) {
    case 'valueA':
      result = `<h5>VALUE A</h5>`;
      break;
    case 'valueB':
      result = `<h5>VALUE B</h5>`;
      break;
    case 'valueC':
      result = `<h5>VALUE C</h5>`;
      break;
  }

  div.innerHTML = result;
}

document.querySelector('#btn-prueba').addEventListener('click', divPrueba);

//LISTADO DE COMPRAS DE USUARIO
function mostrarCompras(arrayCompras) {
  let compraTabla = ``

  for (let i = 0; i < arrayCompras.length; i++) {
    const compra = arrayCompras[i];

    compraTabla = `
    <tr>
      <td>${compra.nombre}</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    `
  }
}

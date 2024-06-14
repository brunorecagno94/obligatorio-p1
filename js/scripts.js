const sistema = new Sistema();
//Botones
const btnRegistroLogin = document.querySelector('#registrarse');
const btnRegistro = document.querySelector('#registrar-usuario');
const btnLogin = document.querySelector("#ingresar-login");
const btnCrearProducto = document.querySelector('#btn-crear-producto');
const filtrosProductos = document.querySelectorAll('input[name="mostrar-productos"]');
//Secciones
const seccionRegistro = document.querySelector('#contenedor-registro');
const seccionLogin = document.querySelector('#contenedor-login');
const seccionCrearProducto = document.querySelector('#contenedor-crear-producto');
const seccionListadoProductos = document.querySelector('#contenedor-listado-productos');
//Listados
const listadoProductos = document.querySelector('#contenedor-productos');
const listadoCompras = document.querySelector('#contenedor-compras-usuario');
const parrafoMontoTotal = document.querySelector('#total-compras-usuario');
//CARGA DE LISTADOS PRECARGADOS
sistema.crearTabla()
sistema.crearTablaCompras();

/*--------------------------------------------------------------*/

//LOGIN DE USUARIO
//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const inputUserName = document.querySelector("#username-login").value.trim();
  const inputPass = document.querySelector("#pass-login").value.trim();
  /* let objetoUsuario = buscarObjeto(sistema.listaUsuarios, 'userName', inputUserName); */

  if (buscarAtributo(sistema.listaUsuarios, 'pass', inputPass)
    && validarCaseInsensitive(sistema.listaUsuarios, 'userName', inputUserName)) {
    alert('Login EXITOSO');
    sistema.usuarioLogueado = inputUserName;
    seccionLogin.style.display = 'none';
    seccionRegistro.style.display = 'none';
  } else {
    /* seccionLogin.innerHTML += `<p id="login-alert"><strong style="color:red">Usuario y contraseña incorrectos</strong></p>` */
    alert('Login FALLADO');
  }
}

btnLogin.addEventListener('click', () => {
  loginUsuario(sistema.listaUsuarios)
});

//REGISTRO DE USUARIO
//Crea el formulario de registro al hacer click en "¿No tienes una cuenta?"
btnRegistroLogin.addEventListener('click', e => {
  seccionRegistro.style.display = 'block';
});

//Función que se ejecuta al clickear el botón de "Registrarse"
function registrarUsuario() {
  const nombre = document.querySelector('#nombre-registro').value;
  const apellido = document.querySelector('#apellido-registro').value;
  const userName = document.querySelector('#usuario-registro').value;
  const pass = document.querySelector('#pass-registro').value;
  const numTarjeta = document.querySelector('#tarjeta-registro');
  const cvcTarjeta = document.querySelector('#cvc-registro').value;

  const usuarioComprador = new Persona(nombre, apellido, userName, pass, numTarjeta.value, cvcTarjeta);
  //Si los datos son válidos, se agrega el usuario al array de usuarios
  if (!buscarAtributo(sistema.listaUsuarios, 'userName', userName) && !validarCaseInsensitive(sistema.listaUsuarios, 'userName', userName) && usuarioComprador.validarRegistroUsuario()) {
    sistema.agregarUsuario(usuarioComprador);
    alert('¡Usuario registrado con éxito!');
    /* seccionRegistro.style.display = 'none'; */
  } else {
    alert('Poné bien los datos por favor UNA cosa te pido nada más dios mío será posible')
    /* seccionRegistro.innerHTML += `<p id="login-alert"><strong style="color:red">Comprueba que todos los campos sean correctos</strong></p>` */
  }
}

btnRegistro.addEventListener('click', () => {
  registrarUsuario(sistema.listaUsuarios);
})

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
    <td>$${precioProd}</td>
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

//Filtra el listado de productos mostrando todos o sólo las ofertas
function filtrarProductos() {
  const inputFiltro = document.querySelector('input[name="mostrar-productos"]:checked');
  let productoTabla = ``;
  let contenidoTabla = ``;

  if (inputFiltro.value === 'ofertas') {
    sistema.listaOfertas = sistema.listaProductos.filter((producto) => producto.oferta === true);
    for (let i = 0; i < sistema.listaOfertas.length; i++) {
      const producto = sistema.listaOfertas[i];
      productoTabla = `
      <tr>
        <td>
          ${producto.nombre}
        </td>
        <td>$${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.oferta ? 'Sí' : 'No'}</td>
        <td><img src=${producto.imagen} alt=${producto.descripcion}></td>
        <td><input type="number" id="cantidad-producto-compra"></td>
        <td>
          <input type="button" data-value="${producto.id}" class="btn-comprar-producto" value="Comprar"/>
        </td>
      </tr>`;

      contenidoTabla += productoTabla;
    }
  } else {
    for (let i = 0; i < sistema.listaProductos.length; i++) {
      const producto = sistema.listaProductos[i];
      productoTabla = `
      <tr>
        <td>
          ${producto.nombre}
        </td>
        <td>$${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.oferta ? 'Sí' : 'No'}</td>
        <td><img src=${producto.imagen} alt=${producto.descripcion}></td>
        <td><input type="number" id="cantidad-producto-compra"></td>
        <td>
          <input type="button" data-value="${producto.id}" class="btn-comprar-producto" value="Comprar"/>
        </td>
      </tr>`;

      contenidoTabla += productoTabla;
    }
  }

  listadoProductos.innerHTML = contenidoTabla;
}

for (let i = 0; i < filtrosProductos.length; i++) {
  const input = filtrosProductos[i];
  input.addEventListener('click', filtrarProductos)
}


//COMPRA DE PRODUCTOS
function comprarProducto() {
  const nombreProd = document.querySelector('#input-nombre-producto').value;
  const precioProd = document.querySelector('#input-precio-producto').value;
  const cantidad = parseInt(document.querySelector('#cantidad-producto-compra').value.trim());

  if (!isNaN(cantidad) && cantidad > 0) {
    const compra = new Compra(nombreProd, cantidad, precioProd);

    
    //TERMINAR
    /* for (let i = 0; i < sistema.listaProductos.length; i++) {
      const producto = sistema.listaProductos[i];
      if (producto['id'] === valor) {
        if (producto.estado === 'activo') {
          if (cantidad === producto.stock) {

          }
        } else {
          alert('No se pudo realizar la compra')
        }
      }
    }

    let compraTabla = `
    <tr>
      <td>${compra.nombre}</td>
      <td>${cantidad}</td>
      <td>$${precioProd}</td>
      <td>
        <input type="button" data-value=${idProducto} class="btn-cancelar-compra" value="Cancelar"/>
      </td>
    </tr>
    `
    listadoCompras.innerHTML += compraTabla;
  } else {
    alert('Debe comprar al menos una unidad');
  } */
  }
}

//PRUEBA 
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

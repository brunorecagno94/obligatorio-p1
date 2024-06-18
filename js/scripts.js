const sistema = new Sistema();
//Botones
const btnRegistroLogin = document.querySelector('#registrarse');
const btnRegistro = document.querySelector('#registrar-usuario');
const btnLogin = document.querySelector("#ingresar-login");
const btnCrearProducto = document.querySelector('#btn-crear-producto');
//Secciones
const vistaComprador = document.querySelectorAll('.vista-comprador')
const vistaAdmin = document.querySelectorAll('.vista-admin')
const navPrincipal = document.querySelector('#navPrincipal');
const seccionRegistro = document.querySelector('#contenedor-registro');
const seccionLogin = document.querySelector('#contenedor-login');
const seccionCrearProducto = document.querySelector('#contenedor-crear-producto');
const seccionListadoProductos = document.querySelector('#contenedor-listado-productos');
const seccionCompras = document.querySelector('#contenedor-compras');
const seccionProductos = document.querySelector('#contenedor-listado-productos');
const seccionAdministrarProductos = document.querySelector('#contenedor-administrar-productos');
//CARGA DE LISTADOS PRECARGADOS
actualizarTablas();

//Funcionamiento de los botones de Comprar
let btnsComprarProducto = document.querySelectorAll('.btn-comprar-producto');
for (let i = 0; i < btnsComprarProducto.length; i++) {
  const boton = btnsComprarProducto[i];
  boton.addEventListener('click', comprarProducto);
}

/*--------------------------------------------------------------*/

//LOGIN DE USUARIO
//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const inputUserName = document.querySelector("#username-login").value.trim();
  const inputPass = document.querySelector("#pass-login").value.trim();
  let usuarioLogueado = null;
  const errorLogin = document.querySelector('#login-alert');

  //Valida los inputs para obtener un objeto usuario con el cual trabajar luego
  for (let i = 0; i < sistema.listaUsuarios.length; i++) {
    const usuario = sistema.listaUsuarios[i];
    if (usuario.pass === inputPass && usuario.userName === inputUserName
      && validarCaseInsensitive(sistema.listaUsuarios, 'userName', inputUserName)) {
      usuarioLogueado = usuario;
      break;
    }
  }

  //Valida si el usuario es correcto
  if (usuarioLogueado) {
    alert('Login exitoso!');
    errorLogin.style.display = 'none';
    sistema.usuarioLogueado = usuarioLogueado.userName;
    seccionLogin.style.display = 'none';
    seccionRegistro.style.display = 'none';
    actualizarNav()

    //Cambia la vista si el usuario es Administrador o Comprador
    if (usuarioLogueado.admin) {
      mostrarVistaAdmin()
    } else {
      mostrarVistaComprador()
    }
    sistema.crearTablaCompras()
  } else {
    errorLogin.style.display = 'block';
  }

  actualizarTablas();

  //Habilita el eventListener del filtro de ofertas en el listado de productos
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });
}

btnLogin.addEventListener('click', () => {
  loginUsuario(sistema.listaUsuarios)
});

//Actualiza el nav superior cuando se loguea un usuario
function actualizarNav() {
  const nombreUsuario = sistema.usuarioLogueado;
  const contenidoNav = `
    <li><p id="nav-nombre">${nombreUsuario}</p></li>
    <li><a id="cerrar-sesion">Cerrar sesión</a></li>
    `
  navPrincipal.innerHTML = contenidoNav;
  document.querySelector('#nav-nombre').style.display = 'block';

  //Crea el botón de Cerrar sesión
  const btnLogout = document.querySelector('#cerrar-sesion');
  btnLogout.addEventListener('click', cerrarSesion);
}

function cerrarSesion() {
  sistema.usuarioLogueado = null;
  document.querySelector('#nav-nombre').style.display = 'none';
  seccionLogin.style.display = 'block';
  this.style.display = 'none';

  //Esconde todo el contenido de la página al cerrar sesión
  vistaComprador.forEach(contenedor => {
    contenedor.style.display = 'none';
  })
  vistaAdmin.forEach(contenedor => {
    contenedor.style.display = 'none';
  })
  seccionCompras.style.display = 'none';
}

//Muestra el contenido del usuario Administrador
function mostrarVistaAdmin() {
  vistaComprador.forEach(contenedor => {
    contenedor.style.display = 'none';
  })
  vistaAdmin.forEach(contenedor => {
    contenedor.style.display = 'block';
  })
}

//Muestra el contenido del usuario Comprador
function mostrarVistaComprador() {
  vistaComprador.forEach(contenedor => {
    contenedor.style.display = 'block';
  })
  vistaAdmin.forEach(contenedor => {
    contenedor.style.display = 'none';
  })
}

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
  const errorRegistro = document.querySelector('#registro-alert');

  const usuarioComprador = new Persona(nombre, apellido, userName, pass, numTarjeta.value, cvcTarjeta);
  //Si los datos son válidos, se agrega el usuario al array de usuarios
  if (!buscarAtributo(sistema.listaUsuarios, 'userName', userName) && !validarCaseInsensitive(sistema.listaUsuarios, 'userName', userName) && usuarioComprador.validarRegistroUsuario()) {
    sistema.agregarUsuario(usuarioComprador);
    alert('¡Usuario registrado con éxito!');
    errorRegistro.style.display = 'none';
    seccionRegistro.style.display = 'none';
  } else {
    errorRegistro.style.display = 'block';
  }
}

btnRegistro.addEventListener('click', () => {
  registrarUsuario(sistema.listaUsuarios);
})

/*--------------------------------------------------------- */

//CREACIÓN DE PRODUCTOS
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
      <td>${nombreProd}</td>
      <td>$${precioProd}</td>
      <td>${descripcionProd}</td>
      <td>${producto.oferta ? 'Sí' : 'No'}</td>
      <td><img src=${urlImagen} alt=${descripcionProd}></td>
      <td><input type="number" data-cantidad="${producto.id}" class="cantidad-producto-compra"></td>
      <td>
          <input type="button" data-value="${idProducto}" class="btn-comprar-producto" value="Comprar"/>
      </td>
  </tr>`;

  let productoTablaAdmin = `<tr>
      <td>${producto.nombre}</td>
      <td><input type="number" data-id="${producto.id}" class="input-stock" value="${producto.stock}"></td>
      <td>
          <select data-id="${producto.id}" class="select-estado">
              <option value="activo" ${producto.estado === 'activo' ? 'selected' : ''}>Activo</option>
              <option value="pausado" ${producto.estado === 'pausado' ? 'selected' : ''}>Pausado</option>
          </select>
      </td>
      <td>
          <input type="checkbox" data-id="${producto.id}" class="checkbox-oferta" ${producto.oferta ? 'checked' : ''}>
      </td>
      <td>
          <button data-id="${producto.id}" class="btn-guardar-producto">Guardar</button>
      </td>
  </tr>`;

  if (producto.validarProducto()) {
    alert('Producto agregado!');
    sistema.agregarProducto(producto);

    // Actualizar la tabla de productos
    const listadoProductos = document.querySelector('#contenedor-productos');
    listadoProductos.innerHTML += productoTabla;

    // Actualizar la tabla de administración de productos
    const listadoProductosAdmin = document.querySelector('#lista-productos-admin');
    listadoProductosAdmin.innerHTML += productoTablaAdmin;

    // Añadir event listener para el botón de compra del nuevo producto
    const btnsComprarProducto = document.querySelectorAll('.btn-comprar-producto');
    for (let i = 0; i < btnsComprarProducto.length; i++) {
      btnsComprarProducto[i].addEventListener("click", comprarProducto);
    }

    // Añadir event listener para el botón de guardar del nuevo producto
    const botonesGuardar = document.querySelectorAll('.btn-guardar-producto');
    for (let i = 0; i < botonesGuardar.length; i++) {
      const boton = botonesGuardar[i];
      boton.addEventListener('click', guardarCambiosProducto);
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
  const listadoProductos = document.querySelector('#contenedor-productos');
  let productoTabla = '';
  let contenidoTabla = '';

  //Guarda un array filtrado por ofertas o el array original, dependiendo del input seleccionado
  if (inputFiltro && inputFiltro.value === 'ofertas') {
    sistema.listaFiltroOfertas = sistema.listaProductos.filter(producto => producto.oferta);
  } else {
    sistema.listaFiltroOfertas = sistema.listaProductos;
  }

  for (let i = 0; i < sistema.listaFiltroOfertas.length; i++) {
    const producto = sistema.listaFiltroOfertas[i];

    //Crea el producto sólo si su estado es activo
    if (producto.estado === 'activo') {
      productoTabla = `
      <tr data-producto-id="${producto.id}">
        <td class="nombre-producto">${producto.nombre}</td>
        <td class="precio-producto">$${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.oferta ? 'Sí' : 'No'}</td>
        <td><img src=${producto.imagen} alt=${producto.descripcion}></td>
        <td><input type="number" data-cantidad="${producto.id}" class="cantidad-producto-compra"></td>
        <td>
          <input type="button" data-value="${producto.id}" class="btn-comprar-producto" value="Comprar"/>
        </td>
      </tr>`;
    }

    contenidoTabla += productoTabla;
  }

  listadoProductos.innerHTML = contenidoTabla;

  let btnsComprarProducto = document.querySelectorAll('.btn-comprar-producto');
  for (let boton of btnsComprarProducto) {
    boton.addEventListener('click', comprarProducto);
  }
}

document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
  input.addEventListener('click', filtrarProductos);
});


//COMPRA DE PRODUCTOS
function comprarProducto() {
  const inputsCantidad = document.querySelectorAll('.cantidad-producto-compra');
  const dataValueBoton = parseInt(this.getAttribute('data-value'));
  let cantidad = 0;

  // Se obtiene la cantidad ingresada por el usuario para el producto seleccionado
  for (let i = 0; i < inputsCantidad.length; i++) {
    if (parseInt(inputsCantidad[i].getAttribute('data-cantidad')) === dataValueBoton) {
      cantidad = parseInt(inputsCantidad[i].value);
      break;
    }
  }

  // Buscar el producto correspondiente en la lista de productos
  let producto = devolverObjeto(sistema.listaProductos, 'id', dataValueBoton);

  if (producto && cantidad > 0) {
    if (cantidad <= producto.stock) {
      let compra = new Compra(producto.nombre, cantidad, producto.precio, producto.id);
      sistema.listaCompras.push(compra);
      producto.stock -= cantidad;
      actualizarTablaCompras();
      alert('¡Compra agregada!');

      if (producto.stock === 0) {
        producto.estado = 'pausado'
        this.setAttribute('disabled', 'disabled');
        this.value = 'SIN STOCK'
      }
    } else { alert('No hay stock suficiente') }
  } else {
    alert('Indique una cantidad válida');
  }
}

//Actualiza la tabla de compras de la vista del Administrador
function actualizarTablaCompras() {
  const listadoCompras = document.querySelector('#contenedor-compras-usuario');
  let contenidoTabla = '';

  for (let i = 0; i < sistema.listaCompras.length; i++) {
    let compra = sistema.listaCompras[i];
    let producto = devolverObjeto(sistema.listaProductos, 'id', compra.id);

    //Crea el producto sólo si su estado es activo
    if (producto.estado === 'activo') {
      let total = producto.precio * compra.cantidadComprada;
      contenidoTabla += `
      <tr>
        <td>${compra.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${compra.cantidadComprada}</td>
        <td>${compra.estadoCompra}</td>
        <td>$${total}</td>
        <td>
          <input type="button" data-value="${compra.idCompra}" class="btn-cancelar-compra" value="Cancelar" ${compra.estadoCompra === 'cancelada' || compra.estadoCompra === 'aprobada' ? 'disabled' : ''} />
        </td>
      </tr>`;
    }
  }

  listadoCompras.innerHTML = contenidoTabla;

  let btnsCancelarCompra = document.querySelectorAll('.btn-cancelar-compra');
  for (let i = 0; i < btnsCancelarCompra.length; i++) {
    btnsCancelarCompra[i].addEventListener('click', cancelarCompra);
  }
}

// Llamar a actualizarTablaCompras al cargar la página para configurar los eventos correctamente
actualizarTablaCompras();

//CANCELAR COMPRA DE PRODUCTO
function cancelarCompra() {
  const compraId = parseInt(this.getAttribute('data-value'));

  for (let i = 0; i < sistema.listaCompras.length; i++) {
    if (sistema.listaCompras[i].idCompra === compraId && sistema.listaCompras[i].estadoCompra === 'pendiente') {
      sistema.listaCompras[i].estadoCompra = 'cancelada';
      break;
    }
  }

  actualizarTablaCompras();
}

//ADMINISTRAR PRODUCTOS
function guardarCambiosProducto() {
  const idProducto = parseInt(this.getAttribute('data-id'));
  const nuevoStock = parseInt(document.querySelector(`.input-stock[data-id="${idProducto}"]`).value);
  const nuevoEstado = document.querySelector(`.select-estado[data-id="${idProducto}"]`).value;
  const nuevaOferta = document.querySelector(`.checkbox-oferta[data-id="${idProducto}"]`).checked;

  const producto = devolverObjeto(sistema.listaProductos, 'id', idProducto);

  if (producto) {
    //Validar condiciones para que el cambio del producto sea viable
    if ((nuevoEstado === 'activo' && nuevoStock > 0 || nuevoEstado === 'pausado' && nuevoStock >= 0)) {
      producto.stock = nuevoStock;
      producto.estado = nuevoEstado;
      producto.oferta = nuevaOferta;

      alert('Producto actualizado correctamente');

      //Actualizar las tablas de productos y administración
      sistema.crearTablaAdmin();
      sistema.crearTabla();

      //Reaplicar el filtro si está seleccionado
      document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
        input.addEventListener('click', filtrarProductos);
      });
    }
    if (nuevoEstado === 'activo' && nuevoStock <= 0) {
      alert('Debe haber un mínimo de 1 en stock para que el producto esté Activo');
    }
  } else {
    alert('Error al actualizar el producto');
  }

  for (let i = 0; i < btnsComprarProducto.length; i++) {
    const boton = btnsComprarProducto[i];
    boton.addEventListener('click', comprarProducto);
  }
}


//ACTUALIZAR TODAS LAS TABLAS
function actualizarTablas() {
  sistema.crearTabla()
  sistema.crearTablaCompras();
  sistema.crearTablaAdmin();
  actualizarTablaCompras();
  filtrarProductos();
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


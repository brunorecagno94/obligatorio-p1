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
const seccionComprasAdmin = document.querySelector('#contenedor-compras-admin');
const seccionProductos = document.querySelector('#contenedor-listado-productos');
const seccionAdministrarProductos = document.querySelector('#contenedor-administrar-productos');

//CARGA DE LISTADOS PRECARGADOS Y CREACIÓN DE EVENTOS DE BOTONES
sistema.crearTabla();
sistema.crearTablaAdmin();
filtrarProductos();
actualizarEventListeners();

/*--------------------------------------------------------------*/

//LOGIN DE USUARIO
//Función que se ejecuta al clickear el botón de "Ingresar"
function loginUsuario() {
  const inputUserName = document.querySelector("#username-login").value.trim();
  const inputPass = document.querySelector("#pass-login").value.trim();
  const errorLogin = document.querySelector('#login-alert');

  // Valida los inputs para obtener un objeto usuario con el cual trabajar luego
  for (let i = 0; i < sistema.listaUsuarios.length; i++) {
    const usuario = sistema.listaUsuarios[i];
    if (usuario.pass === inputPass && usuario.userName.toLowerCase() === inputUserName.toLowerCase()) {
      sistema.usuarioLogueado = usuario;
      break;
    }
  }

  // Valida si el usuario es correcto
  if (sistema.usuarioLogueado) {
    alert('Login exitoso!');
    errorLogin.style.display = 'none';
    seccionLogin.style.display = 'none';
    seccionRegistro.style.display = 'none';
    actualizarNav();
    actualizarTablas();
    //Actualiza el filtro de la tabla de compras para que aparezcan las compras
    document.querySelectorAll('input[name="mostrar-compras"]').forEach(input => {
      input.addEventListener('click', sistema.crearTablaCompras);
    });
    //Cambia la vista si el usuario es Administrador o Comprador
    if (sistema.usuarioLogueado.admin) {
      mostrarVistaAdmin();
      mostrarMontoAdministrador()
    } else {
      mostrarVistaComprador();
      mostrarMontoUsuario()
    }
  } else {
    errorLogin.style.display = 'block';
  }

  //Actualiza eventos de botones
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });

  document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
    boton.addEventListener('click', aprobarCompra);
  });

  document.querySelectorAll('.btn-cancelar-compra').forEach(boton => {
    boton.addEventListener('click', cancelarCompra);
  });
}

//Actualiza el nav superior cuando se loguea un usuario
function actualizarNav() {
  const nombreUsuario = sistema.usuarioLogueado.userName;
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

  esconderVistas();
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

//Esconde todo el contenido de la página al cerrar sesión
function esconderVistas() {
  vistaComprador.forEach(contenedor => {
    contenedor.style.display = 'none';
  });
  vistaAdmin.forEach(contenedor => {
    contenedor.style.display = 'none';
  });
}

//REGISTRO DE USUARIO
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

  actualizarEventListeners()
}

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

  //Crea el producto para la tabla de productos
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

  //Crea el producto para la tabla de administrar productos
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

    //Actualiza la tabla de productos
    const listadoProductos = document.querySelector('#contenedor-productos');
    listadoProductos.innerHTML += productoTabla;

    // Actualiza la tabla de administrar productos
    const listadoProductosAdmin = document.querySelector('#lista-productos-admin');
    listadoProductosAdmin.innerHTML += productoTablaAdmin;

    // Añade eventos a los botones de compra
    document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
      boton.addEventListener("click", comprarProducto);
    });

    // Añadir event listener para el botón de guardar del nuevo producto
    document.querySelectorAll('.btn-guardar-producto').forEach(boton => {
      boton.addEventListener('click', guardarCambiosProducto);
    });
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

      contenidoTabla += productoTabla;
    }
  }

  listadoProductos.innerHTML = contenidoTabla;

  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  })
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
    if (cantidad <= producto.stockProvisorio) {
      let compra = new Compra(producto.nombre, cantidad, producto.precio, producto.id);
      sistema.listaCompras.push(compra);
      producto.stockProvisorio -= cantidad;
      alert('¡Compra agregada!');
    } else { alert('No hay stock suficiente') }
  } else {
    alert('Indique una cantidad válida');
  }

  //Reconstruye las tablas
  sistema.crearTabla();
  sistema.crearTablaCompras();
  //Reconstruye los eventos de botones
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });
  
  document.querySelectorAll('.btn-cancelar-compra').forEach(boton => {
    boton.addEventListener('click', cancelarCompra);
  })

  document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
    boton.addEventListener('click', aprobarCompra);
  })

  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  });
}

//CANCELAR COMPRA DE PRODUCTO
function cancelarCompra() {
  const compraId = parseInt(this.getAttribute('data-value'));

  for (let i = 0; i < sistema.listaCompras.length; i++) {
    if (sistema.listaCompras[i].id === compraId && sistema.listaCompras[i].estadoCompra === 'pendiente') {
      sistema.listaCompras[i].estadoCompra = 'cancelada';
      break;
    }
  }

  sistema.crearTabla();
  sistema.crearTablaCompras();


  //Actualiza eventos de botones
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });
  document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
    boton.addEventListener('click', aprobarCompra);
  });

  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  });
}

//APRUEBA COMPRA DE PRODUCTO
function aprobarCompra() {
  const compraId = parseInt(this.getAttribute('data-value'));

  for (let i = 0; i < sistema.listaCompras.length; i++) {
    const compra = sistema.listaCompras[i];
    const productoRelacionado = devolverObjeto(sistema.listaProductos, 'id', compra.id);
    const usuarioRelacionado = devolverObjeto(sistema.listaUsuarios, 'userName', compra.usuarioComprador);

    if (compra.id === compraId && compra.estadoCompra === 'pendiente') {
      if ((usuarioRelacionado.saldo < compra.cantidadComprada * compra.precio) ||
        productoRelacionado.stock < compra.cantidadComprada ||
        productoRelacionado.estado !== 'activo') {
        alert('No se pudo realizar la compra. Su estado pasó a CANCELADA.')
        compra.estadoCompra = 'cancelada';
      } else if (usuarioRelacionado.saldo >= compra.cantidadComprada * compra.precio) {
        compra.estadoCompra = 'aprobada';
        usuarioRelacionado.saldo -= compra.cantidadComprada * compra.precio;
        productoRelacionado.unidadesVendidas += compra.cantidadComprada;

        if (productoRelacionado.stock === compra.cantidadComprada) {
          productoRelacionado.estado = 'pausado';
        }
      }
      break;
    }
  }

  sistema.crearTabla();
  sistema.crearTablaCompras();

  //Actualiza el monto y el saldo del usuario
  mostrarMontoUsuario()
  mostrarMontoAdministrador()

  //Actualiza los eventos de los botones
  document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
    boton.addEventListener('click', aprobarCompra);
  });

  document.querySelectorAll('.btn-cancelar-compra').forEach(boton => {
    boton.addEventListener('click', cancelarCompra);
  });

  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  });

  document.querySelectorAll('input[name="mostrar-compras"]').forEach(input => {
    input.addEventListener('click', sistema.crearTablaCompras);
  });
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
    }
    if ((nuevoEstado === 'activo' || nuevoEstado === "pausado") && nuevoStock <= 0) {
      producto.estado = "pausado"
      alert('Producto actualizado: PAUSADO')
    }
  } else {
    alert('Error al actualizar el producto');
  }

  //Actualizar las tablas de productos y administrar productos
  sistema.crearTabla()
  //Reaplicar el filtro de ofertas
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });
  //Crea el evento del botón para comprar producto
  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  })
}


//Muestra monto y saldo del Comprador
function mostrarMontoUsuario() {
  const parrafo = document.querySelector('#monto-compras-usuario');
  let montoTotal = 0;
  let mensaje = ``

  for (let i = 0; i < sistema.listaCompras.length; i++) {
    const compra = sistema.listaCompras[i];
    if (compra.usuarioComprador === sistema.usuarioLogueado.userName && compra.estadoCompra === 'aprobada') {
      montoTotal += compra.precio * compra.cantidadComprada;
    }
    mensaje = `Total de compras: $${montoTotal}; su saldo disponible es: $${sistema.usuarioLogueado.saldo}.`
  }

  parrafo.innerHTML = mensaje;
}

//Mostrar precio de aprobadas y ganancia total para el Administrador
function mostrarMontoAdministrador() {
  const parrafo = document.querySelector('#monto-compras-admin');
  let mensaje = ``;
  let contadorGanancias = 0;

  for (let i = 0; i < sistema.listaProductos.length; i++) {
    const producto = sistema.listaProductos[i];

    mensaje += `<p>${producto.nombre}: ${producto.unidadesVendidas} unidades</p>`
  }
  for (let i = 0; i < sistema.listaCompras.length; i++) {
    const compra = sistema.listaCompras[i];
    if (compra.estadoCompra === 'aprobada') contadorGanancias += compra.cantidadComprada * compra.precio;
  }

  mensaje += `<strong>Ganancias totales: $${contadorGanancias}</strong>`
  parrafo.innerHTML = mensaje;
}


//ACTUALIZAR TODAS LAS TABLAS
function actualizarTablas() {
  sistema.crearTabla()
  sistema.crearTablaAdmin();
  sistema.crearTablaCompras();
  filtrarProductos();
}

//ACTUALIZAR EVENTOS DE BOTONES
function actualizarEventListeners() {
  //Login
  btnLogin.addEventListener('click', loginUsuario);

  //Crea el formulario de registro al hacer click en "¿No tienes una cuenta?"
  btnRegistroLogin.addEventListener('click', e => {
    seccionRegistro.style.display = 'block';
  });

  //Registrar usuario
  btnRegistro.addEventListener('click', () => {
    registrarUsuario(sistema.listaUsuarios);
  });

  //Crear producto
  btnCrearProducto.addEventListener('click', () => {
    crearProducto(sistema.listaProductos);
  });

  //Comprar producto
  document.querySelectorAll('.btn-comprar-producto').forEach(boton => {
    boton.addEventListener('click', comprarProducto);
  });

  //Filtrar por ofertas
  document.querySelectorAll('input[name="mostrar-productos"]').forEach(input => {
    input.addEventListener('click', filtrarProductos);
  });

  //Filtrar lista de compras de Comprador según usuario
  document.querySelectorAll('input[name="mostrar-compras"]').forEach(input => {
    input.addEventListener('click', sistema.crearTablaCompras);
  });

  //Guardar cambios al administrar producto
  document.querySelectorAll('.btn-guardar-producto').forEach(boton => {
    boton.addEventListener('click', guardarCambiosProducto);
  });

  //Aprobar y cancelar compra (Administrador)
  document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
    boton.addEventListener('click', aprobarCompra);
  });

  document.querySelectorAll('.btn-cancelar-compra').forEach(boton => {
    boton.addEventListener('click', cancelarCompra);
  });
}
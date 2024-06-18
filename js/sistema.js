// Se inicializa en 9 porque ya hay usuarios registrados del 0 al 9
let idUsuario = 9;
// Se inicializa en 9 porque ya hay productos creados del 0 al 9
let idProducto = 9;
// Se inicializa en 4 porque ya hay compras creadas del 0 al 4
let idCompra = 4;


class Sistema {
  constructor() {
    this.listaUsuarios = [
      //Usuarios Administradores
      {
        nombre: 'Andy',
        apellido: 'Andrade',
        userName: 'AndyKpo',
        pass: 'Elandy1',
        admin: true,
        id: 0
      },
      {
        nombre: 'Bruno',
        apellido: 'Recagno',
        userName: 'Brunreca',
        pass: 'Bruno1',
        admin: true,
        id: 1
      },
      {
        nombre: 'María',
        apellido: 'Pérez',
        userName: 'maperez',
        pass: 'Mape24',
        admin: true,
        id: 2
      },
      {
        nombre: 'Richard',
        apellido: 'Da Silva',
        userName: 'RichieSilver',
        pass: 'Richie10',
        admin: true,
        id: 3
      },
      {
        nombre: 'Silvestre',
        apellido: 'Piolín',
        userName: 'piola90',
        pass: 'silvePiola90',
        admin: true,
        id: 4,
      },
      //Usuarios Compradores
      {
        nombre: 'Alicia',
        apellido: 'Paredes',
        userName: 'AliP',
        pass: 'Paredes12',
        numTarjeta: '4532-0151-1283-0366',
        numTarjetaFinal: '4532015112830366',
        cvcTarjeta: '123',
        admin: false,
        id: 5,
        saldo: 3000
      },
      {
        nombre: 'Franco',
        apellido: 'Gil',
        userName: 'Frangi',
        pass: 'Frank0',
        numTarjeta: '4012-8888-8888-1881',
        numTarjetaFinal: '4012888888881881',
        cvcTarjeta: '132',
        admin: false,
        id: 6,
        saldo: 3000
      },
      {
        nombre: 'Matías',
        apellido: 'Matíez',
        userName: 'Matimati',
        pass: 'Elmati26',
        numTarjeta: '4916-5301-4024-8742',
        numTarjetaFinal: '4916530140248742',
        cvcTarjeta: '713',
        admin: false,
        id: 7,
        saldo: 3000
      },
      {
        nombre: 'Roberto',
        apellido: 'Mate',
        userName: 'betomate',
        pass: 'ElgranBeto16',
        numTarjeta: '5500-0000-0000-0004',
        numTarjetaFinal: '5500000000000004',
        cvcTarjeta: '363',
        admin: false,
        id: 8,
        saldo: 3000
      },
      {
        nombre: 'Julia',
        apellido: 'Javascript',
        userName: 'JJscript',
        pass: 'JuliaJota20',
        numTarjeta: '6011-1111-1111-1117',
        numTarjetaFinal: '6011111111111117',
        cvcTarjeta: '350',
        admin: false,
        id: 9,
        saldo: 3000
      },
    ];
    this.listaProductos = [

      {
        nombre: 'Pelota',
        precio: 6000,
        descripcion: "Pelota oficial",
        imagen: './img/pelota.jpg',
        stock: 12,
        id: 0,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Pesas',
        precio: 12000,
        descripcion: "Pesas para ejercicios",
        imagen: './img/pesa.jpg',
        stock: 3,
        id: 1,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Botella',
        precio: 1200,
        descripcion: "Cantimplora para guardar líquido",
        imagen: './img/botella.jpg',
        stock: 1,
        id: 2,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Gorra de natación',
        precio: 150,
        descripcion: "Gorra para protección en piscina",
        imagen: './img/gorra.jpg',
        stock: 50,
        id: 3,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Conos',
        precio: 700,
        descripcion: "Conos para ejercicios",
        imagen: './img/conos.jpg',
        stock: 34,
        id: 4,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Patas de rana',
        precio: 850,
        descripcion: "Patas de rana para nadar",
        imagen: './img/patas.jpg',
        stock: 14,
        id: 5,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Protección',
        precio: 790,
        descripcion: "Protección para piernas",
        imagen: './img/proteccion.jpg',
        stock: 4,
        id: 6,
        oferta: true,
        estado: 'activo',
      },
      {
        nombre: 'Camiseta',
        precio: 2350,
        descripcion: "Camiseta oficial",
        imagen: './img/camiseta.png',
        stock: 24,
        id: 7,
        oferta: true,
        estado: 'activo',
      },
      {
        nombre: 'Zapatillas',
        precio: 700,
        descripcion: "Zapatillas oficiales",
        imagen: './img/zapatillas.jpeg',
        stock: 104,
        id: 8,
        oferta: true,
        estado: 'activo',
      },
      {
        nombre: 'Lentes de natación',
        precio: 700,
        descripcion: "Lentes para protección en piscina",
        imagen: './img/lentes.jpg',
        stock: 16,
        id: 9,
        oferta: true,
        estado: 'activo',
      },
    ];
    this.listaCompras = [
      {
        nombre: 'Pelota',
        cantidadComprada: 2,
        precio: 6000,
        estadoCompra: 'pendiente',
        usuarioComprador: 'AliP',
        id: 0,
        idCompra: ++idCompra,

      },
      {
        nombre: 'Pesas',
        cantidadComprada: 5,
        precio: 12000,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Frangi',
        id: 1,
        idCompra: ++idCompra,
      },
      {
        nombre: 'Botella',
        cantidadComprada: 1,
        precio: 1200,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Frangi',
        id: 2,
        idCompra: ++idCompra,
      },
      {
        nombre: 'Gorra de natación',
        cantidadComprada: 1,
        precio: 150,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Matimati',
        id: 3,
        idCompra: ++idCompra,
      },
      {
        nombre: 'Conos',
        cantidadComprada: 2,
        precio: 700,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Matimati',
        id: 4,
        idCompra: ++idCompra,
      }
    ];
    this.listaFiltroOfertas = [];
    this.usuarioLogueado = null;
  }

  agregarUsuario(usuarioComprador) {
    this.listaUsuarios.push(usuarioComprador);
  }

  agregarProducto(nuevoProducto) {
    this.listaProductos.push(nuevoProducto);
  }

  //Crea la tabla de productos precargados
  crearTabla() {
    //Se crea la estructura de la tabla
    let estructuraTabla = `
    <h3>Productos</h3>
        <div id="inputs-radio">
          <legend>Mostrar productos:</legend>
          <div class="input-group">
            <label for="todos">Ver todos</label>
            <input type="radio" name="mostrar-productos" id="todos" value="todos">
            <label for="ofertas">Ver sólo ofertas</label>
            <input type="radio" name="mostrar-productos" id="ofertas" value="ofertas">
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Oferta</th>
              <th>Imagen</th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="contenedor-productos">
          </tbody>
        </table>`;
    let productoTabla = ``;
    let contenidoTabla = ``;

    for (let i = 0; i < this.listaProductos.length; i++) {
      const producto = this.listaProductos[i];

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
          <input type="button" data-value="${producto.id}" class="btn-comprar-producto" 
          ${producto.estado === 'pausado' ? 'disabled' : ''} value="Comprar"/>
        </td>
      </tr>`;
      }
      contenidoTabla += productoTabla;
    }
    seccionProductos.innerHTML = estructuraTabla;
    const listadoProductos = document.querySelector('#contenedor-productos');
    listadoProductos.innerHTML = contenidoTabla;
  }

  //Crea la tabla de compras del usuario Comprador
  crearTablaCompras() {
    //Se crea la estructura de la tabla
    let estructuraTabla = `
    <h3>Compras</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Unidades compradas</th>
              <th>Estado</th>
              <th>Monto total</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="contenedor-compras-usuario">

          </tbody>
          <p id="total-compras-usuario"></p>
        </table>`;
    let productoTabla = ``;
    let contenidoTabla = ``;

    //Lista de compras referentes a un usuario específico
    const listaComprasUsuario = this.listaCompras.filter(compra => compra.usuarioComprador === this.usuarioLogueado);

    for (let i = 0; i < listaComprasUsuario.length; i++) {
      const producto = listaComprasUsuario[i];
      productoTabla = `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidadComprada}</td>
        <td>${producto.estadoCompra}</td>
        <td>$${producto.precio * producto.cantidadComprada}</td>
        <td>
          <input type="button" data-value="${producto.id}" class="btn-cancelar-compra" value="Cancelar"/>
        </td>
      </tr>`;

      contenidoTabla += productoTabla;
    }
    /* Se inserta la estructura de la tabla en el contenedor de HTML, y luego se inserta el listado
    de productos en la estructura de la tabla */
    seccionCompras.innerHTML = estructuraTabla;
    const listadoCompras = document.querySelector('#contenedor-compras-usuario');
    listadoCompras.innerHTML = contenidoTabla;
  }

  //Crea la tabla para administrar productos del usuario Administrador
  crearTablaAdmin() {
    //Se crea la estructura de la tabla
    let estructuraTabla = `
    <h3>Administrar Productos</h3>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Estado</th>
          <th>Oferta</th>
        </tr>
      </thead>
      <tbody id="lista-productos-admin">
      </tbody>
    </table>`;
    let productoTabla = ``;
    let contenidoTabla = ``;

    for (let i = 0; i < this.listaProductos.length; i++) {
      let producto = this.listaProductos[i];
      productoTabla = `
      <tr>
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

      contenidoTabla += productoTabla;
    }

    seccionAdministrarProductos.innerHTML = estructuraTabla;
    const listadoProductosAdmin = document.querySelector('#lista-productos-admin');
    listadoProductosAdmin.innerHTML = contenidoTabla;

    // Añadir event listeners para los botones de guardar
    const botonesGuardar = document.querySelectorAll('.btn-guardar-producto');
    for (let i = 0; i < botonesGuardar.length; i++) {
      const boton = botonesGuardar[i];
      boton.addEventListener('click', guardarCambiosProducto);
    }
  }

  /* document.querySelector('#boton').addEventListener('click', e => {
    e.preventDefault();
    if(!sistema.usuarioLogueado) {
      
    sistema.usuarioLogueado = true;
      seccionRegistro.style.display = 'none';
    } else {
      seccionRegistro.style.display = 'block';
    }
  
  }) */
}
// Se inicializa en 9 porque ya hay usuarios registrados del 0 al 9
let idUsuario = 9;
// Se inicializa en 9 porque ya hay productos creados del 0 al 9
let idProducto = 9;


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
        stockProvisorio: 12,
        unidadesVendidas: 2,
        idInicial: 'PROD_ID_0',
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
        stockProvisorio: 3,
        unidadesVendidas: 5,
        idInicial: 'PROD_ID_1',
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
        stockProvisorio: 0,
        unidadesVendidas: 1,
        idInicial: 'PROD_ID_2',
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
        stockProvisorio: 50,
        unidadesVendidas: 8,
        idInicial: 'PROD_ID_3',
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
        stockProvisorio: 34,
        unidadesVendidas: 15,
        idInicial: 'PROD_ID_4',
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
        stockProvisorio: 14,
        unidadesVendidas: 2,
        idInicial: 'PROD_ID_5',
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
        stockProvisorio: 4,
        unidadesVendidas: 3,
        idInicial: 'PROD_ID_6',
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
        stockProvisorio: 24,
        unidadesVendidas: 10,
        idInicial: 'PROD_ID_7',
        id: 7,
        oferta: true,
        estado: 'activo',
      },
      {
        nombre: 'Zapatillas',
        precio: 700,
        descripcion: "Zapatillas oficiales",
        imagen: './img/zapatillas.jpeg',
        stock: 4,
        stockProvisorio: 4,
        unidadesVendidas: 2,
        idInicial: 'PROD_ID_8',
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
        stockProvisorio: 16,
        unidadesVendidas: 6,
        idInicial: 'PROD_ID_9',
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
      },
      {
        nombre: 'Pesas',
        cantidadComprada: 5,
        precio: 12000,
        estadoCompra: 'aprobada',
        usuarioComprador: 'Frangi',
        id: 1,
      },
      {
        nombre: 'Botella',
        cantidadComprada: 1,
        precio: 1200,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Frangi',
        id: 2,
      },
      {
        nombre: 'Botella',
        cantidadComprada: 1,
        precio: 1200,
        estadoCompra: 'cancelada',
        usuarioComprador: 'Frangi',
        id: 2,
      },
      {
        nombre: 'Gorra de natación',
        cantidadComprada: 1,
        precio: 150,
        estadoCompra: 'aprobada',
        usuarioComprador: 'Matimati',
        id: 3,
      },
      {
        nombre: 'Conos',
        cantidadComprada: 2,
        precio: 700,
        estadoCompra: 'aprobada',
        usuarioComprador: 'Matimati',
        id: 4,
      }
    ];
    //Lista final que imprime el filtro de ofertas
    this.listaFiltroOfertas = [];
    //Listados de compras para cada tipo de usuario
    this.listaComprasAdmin = [];
    this.listaComprasComprador = [];
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
        <tr data-producto-id="${producto.id}" style="${producto.stockProvisorio <= 0 ? 'display:none' : ''}">
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

        contenidoTabla += productoTabla;
      }
    }

    seccionProductos.innerHTML = estructuraTabla;
    const listadoProductos = document.querySelector('#contenedor-productos');
    listadoProductos.innerHTML = contenidoTabla;
  }

  //Crea la tabla de compras
  crearTablaCompras() {
    const radioFiltro = document.querySelector('input[name="mostrar-compras"]:checked');
    //Se crea la estructura de la tabla
    let estructuraTabla = `
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Unidades compradas</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Monto total</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="contenedor-compras-interno">
          </tbody>
        </table>`;
    let compraTabla = ``;
    let contenidoTabla = ``;

    if (sistema.usuarioLogueado) {
      if (sistema.usuarioLogueado.admin) {
        this.listaComprasAdmin = sistema.listaCompras;

        for (let i = 0; i < this.listaComprasAdmin.length; i++) {
          const compra = this.listaComprasAdmin[i];
          compraTabla = `
          <tr>
            <td>${compra.nombre}</td>
            <td>$${compra.precio}</td>
            <td>${compra.cantidadComprada}</td>
            <td>${compra.usuarioComprador}</td>
            <td>${compra.estadoCompra}</td>
            <td>$${compra.precio * compra.cantidadComprada}</td>
            <td>
              <input type="button" data-value="${compra.id}" 
              style="${compra.estadoCompra === 'aprobada' || compra.estadoCompra === 'cancelada' ? 'display:none' : ''}" class="btn-aprobar-compra" value="Aprobar"/>
            </td>
          </tr>`;

          contenidoTabla += compraTabla;
        }
        seccionComprasAdmin.innerHTML = estructuraTabla;
        const listaContenedor = document.querySelector('#contenedor-compras-interno');
        listaContenedor.innerHTML = contenidoTabla;

      } else {
        switch (radioFiltro.value) {
          case 'todas':
            this.listaComprasComprador = sistema.listaCompras;
            break;
          case 'aprobadas':
            this.listaComprasComprador = sistema.listaCompras.filter(compra => compra.estadoCompra === 'aprobada');
            break;
          case 'pendientes':
            this.listaComprasComprador = sistema.listaCompras.filter(compra => compra.estadoCompra === 'pendiente');
            break;
          case 'canceladas':
            this.listaComprasComprador = sistema.listaCompras.filter(compra => compra.estadoCompra === 'cancelada');
            break;
        }

        for (let i = 0; i < this.listaComprasComprador.length; i++) {
          const compra = this.listaComprasComprador[i];

          //Valida que la compra corresponda al usuario logueado
          if (compra.usuarioComprador === sistema.usuarioLogueado.userName) {
            compraTabla = `
            <tr>
              <td>${compra.nombre}</td>
              <td>$${compra.precio}</td>
              <td>${compra.cantidadComprada}</td>
              <td>${compra.usuarioComprador}</td>
              <td>${compra.estadoCompra}</td>
              <td>$${compra.precio * compra.cantidadComprada}</td>
              <td>
                <input type="button" data-value="${compra.id}" class="btn-cancelar-compra"
                style="${compra.estadoCompra === 'aprobada' || compra.estadoCompra === 'cancelada' ? 'display:none' : ''}" value="Cancelar"/>
              </td>
            </tr>`;

            contenidoTabla += compraTabla;
          }
        }
        seccionCompras.innerHTML = estructuraTabla;
        const listaContenedor = document.querySelector('#contenedor-compras-interno');
        listaContenedor.innerHTML = contenidoTabla;
        mostrarMontoUsuario();
      }
    }

    //Crea los eventos para cancelar y aprobar compras
    document.querySelectorAll('.btn-aprobar-compra').forEach(boton => {
      boton.addEventListener('click', aprobarCompra);
    });
  
    document.querySelectorAll('.btn-cancelar-compra').forEach(boton => {
      boton.addEventListener('click', cancelarCompra);
    });

    document.querySelectorAll('input[name="mostrar-compras"]').forEach(input => {
      input.addEventListener('click', this.crearTablaCompras);
    });
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
      if (producto.estado === 'activo') {
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
}
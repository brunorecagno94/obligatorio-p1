/* Se inicializa en 9 porque ya hay usuarios registrados
del 0 al 9 */
let idUsuario = 9;
// Se inicializa en 5 porque ya hay compras hechas del 0 al 4
let idProducto = 4;

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
        numTarjeta: '4321-4321-4321-4321',
        numTarjetaFinal: '4321432143214321',
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
        numTarjeta: '8765-8765-8765-8765',
        numTarjetaFinal: '8765876587658765',
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
        numTarjeta: '9808-6756-2345-1734',
        numTarjetaFinal: '9808675623451734',
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
        numTarjeta: '6582-2347-7308-1235',
        numTarjetaFinal: '6582234773081235',
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
        numTarjeta: '2346-2348-8342-2505',
        numTarjetaFinal: '2346234883422505',
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
        descripcion: "Tremenda pelota",
        imagen: './img/pelota.jpg',
        stock: 12,
        id: 0,
        oferta: true,
        estado: 'activo',
      },
      {
        nombre: 'Pesas',
        precio: 12000,
        descripcion: "Tremenda pesa che",
        imagen: './img/pesa.jpg',
        stock: 3,
        id: 1,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Botella',
        precio: 1200,
        descripcion: "Te juro que es tremenda botella",
        imagen: './img/botella.jpg',
        stock: 1,
        id: 2,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Gorra de natación',
        precio: 150,
        descripcion: "en teoria te ayuda",
        imagen: './img/gorra.jpg',
        stock: 50,
        id: 3,
        oferta: false,
        estado: 'activo',
      },
      {
        nombre: 'Conos',
        precio: 700,
        descripcion: "No se bro es un cono",
        imagen: './img/conos.jpg',
        stock: 34,
        id: 4,
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
        id: 0
      },
      {
        nombre: 'Pesas',
        cantidadComprada: 5,
        precio: 12000,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Frangi',
        id: 1
      },
      {
        nombre: 'Botella',
        cantidadComprada: 1,
        precio: 1200,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Frangi',
        id: 2
      },
      {
        nombre: 'Gorra de natación',
        cantidadComprada: 1,
        precio: 150,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Matimati',
        id: 3
      },
      {
        nombre: 'Conos',
        cantidadComprada: 2,
        precio: 700,
        estadoCompra: 'pendiente',
        usuarioComprador: 'Matimati',
        id: 4
      }
    ];
    this.listaOfertas = [];
    this.usuarioLogueado = false;
  }

  agregarUsuario(usuarioComprador) {
    this.listaUsuarios.push(usuarioComprador);
  }

  agregarProducto(nuevoProducto) {
    this.listaProductos.push(nuevoProducto);
  }

  //Crea la tabla de productos precargados
  crearTabla() {
    let productoTabla = ``;
    let contenidoTabla = ``;

    for (let i = 0; i < this.listaProductos.length; i++) {
      const producto = this.listaProductos[i];
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

    listadoProductos.innerHTML = contenidoTabla;
  }

  //Crea la tabla de compras del usuario Comprador
  crearTablaCompras() {
    let productoTabla = ``;
    let contenidoTabla = ``;

    for (let i = 0; i < this.listaCompras.length; i++) {
      const producto = this.listaCompras[i];
      productoTabla = `
      <tr>
        <td>
          ${producto.nombre}
        </td>
        <td>$${producto.precio}</td>
        <td>${producto.cantidadComprada}</td>
        <td>${producto.estadoCompra}</td>
        <td>$${producto.precio * producto.cantidadComprada}</td>
        <td>
          <input type="button" data-value="${producto.id}" class="btn-comprar-producto" value="Comprar"/>
        </td>
      </tr>`;

      contenidoTabla += productoTabla;
    }

    listadoCompras.innerHTML = contenidoTabla;
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
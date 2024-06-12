/* Se inicializa en 10 porque ya hay usuarios registrados
del 0 al 9 */
let idUsuario = 10;
// Se inicializa en 5 porque ya hay compras hechas del 0 al 5
let idProducto = 5;

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
        id: 5,
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
        id: 5,
        saldo: 3000
      },
    ];
    this.listaProductos = [];
    this.usuarioLogueado = false;
  }

  agregarUsuario(usuarioComprador) {
    this.listaUsuarios.push(usuarioComprador);
  }

  agregarProducto(nuevoProducto) {
    this.listaProductos.push(nuevoProducto);
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
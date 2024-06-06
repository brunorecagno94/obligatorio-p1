let idUsuario = 0;
let idProducto = 0;

class Sistema {
  constructor() {
    this.listaUsuarios = [];
    this.listaProductos = [];
  }

  validarUserNameRepetido(userName) {
    let repetido = false;

    for (let i = 0; i < this.listaUsuarios.length; i++) {
      const usuario = this.listaUsuarios[i];
      if (usuario.userName === userName) {
        repetido = true;
      }
    }
    return repetido;
  }

  agregarUsuario(usuarioComprador) {
    this.listaUsuarios.push(usuarioComprador);
  }

  agregarProducto(nuevoProducto) {
    this.listaProductos.push(nuevoProducto);
  }
}
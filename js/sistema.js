let idUsuario = 0;
let idProducto = 0;

class Sistema {
  constructor() {
    this.listaUsuarios = [];
    this.listaProductos = [];
    this.usuarioLogueado = false;
  }

  agregarUsuario(usuarioComprador) {
    this.listaUsuarios.push(usuarioComprador);
  }

  agregarProducto(nuevoProducto) {
    this.listaProductos.push(nuevoProducto);
  }
}
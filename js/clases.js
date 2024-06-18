//Constructor para nuevo usuario Comprador
class Persona {
  constructor(nombre, apellido, userName, pass, numTarjeta, cvcTarjeta) {
    this.nombre = nombre.trim();
    this.apellido = apellido.trim();
    this.userName = userName.trim();
    this.pass = pass.trim();
    this.numTarjeta = numTarjeta;
    this.numTarjetaFinal = eliminarCaracter(this.numTarjeta, "-");
    this.cvcTarjeta = cvcTarjeta;
    this.admin = false;
    this.id = ++idUsuario;
    this.saldo = 3000;
  }

  //VALIDACIONES REGISTRO
  //Validación en el momento del registro
  validarRegistroUsuario() {
    return this.nombre !== "" && this.apellido !== "" && isNaN(this.nombre) && isNaN(this.apellido) && this.validarUserName() &&
      this.validarPass() && this.validarTarjeta();
  }
  //Validación general de username
  validarUserName() {
    return this.userName !== "";
  }

  //Validación general de contraseña
  validarPass() {
    return this.pass.length >= 5 && encontrarMayuscula(this.pass) && encontrarMinuscula(this.pass) && encontrarNumero(this.pass);
  }

  //Validación general de tarjeta
  validarTarjeta() {
    return this.validarFormato() && this.validacionLuhn() && this.validarCVC();
  }

  /* VALIDARFORMATO Y VALIDAR4DIGITOS vienen juntas*/
  validarFormato() {
    const numeros = this.numTarjeta.split("-")
    if (this.numTarjeta.length === 19 &&
      numeros.length === 4 &&
      this.validar4Digitos(numeros[0]) &&
      this.validar4Digitos(numeros[1]) &&
      this.validar4Digitos(numeros[2]) &&
      this.validar4Digitos(numeros[3])
    ) {
      return true
    }
    return false
  }

  validar4Digitos(texto) {
    if (texto.length === 4 && !isNaN(texto)) {
      return true;
    }
    return false;
  }


  validarCVC() {
    return !isNaN(this.cvcTarjeta) && this.cvcTarjeta.length === 3;
  }


  validacionLuhn() {
    let alternar = false;
    let total = 0;

    for (let i = this.numTarjetaFinal.length - 1; i >= 0; i--) {
      let n = parseInt(this.numTarjetaFinal[i]);

      if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
      }

      total += n;
      alternar = !alternar;
    }

    // El número es válido si el total es divisible por 10
    if (total % 10 === 0) {
      alert('valida luhn');
      return true;
    } else {
      alert('no luhn');
      return false;
    }
  }
}

//Constructor para nuevo producto
class Producto {
  constructor(nombreProd, precioProd, descripcionProd, urlImagen, stockProd) {
    this.nombre = nombreProd.trim();
    this.precio = precioProd.trim();
    this.descripcion = descripcionProd.trim();
    this.imagen = urlImagen;
    this.stock = stockProd;
    this.id = ++idProducto;
    this.oferta = false;
    this.estado = 'activo';
  }

  //Validación general del producto
  validarProducto() {
    return this.validarNombreProd && this.validarPrecioProd() &&
      this.validarStockProd() && this.validarDescProd() && this.validarImagenProd();
  }

  validarNombreProd() {
    return this.nombre !== "";
  }

  validarPrecioProd() {
    return this.precio !== "" && !isNaN(this.precio) && this.precio > 0;
  }

  validarStockProd() {
    return this.stock !== "" && !isNaN(this.stock) && this.stock > 0;
  }

  validarDescProd() {
    return this.descripcion !== "";
  }
  validarImagenProd() {
    return this.imagen !== "";
  }

}

//Constructor para cada compra del usuario Comprador
class Compra {
  constructor(nombreProd, cantidad, precioProd, idProd) {
    this.nombre = nombreProd.trim();
    this.cantidadComprada = cantidad;
    this.precio = precioProd;
    this.estadoCompra = 'pendiente';
    /* "id" existe para conectar el producto con la compra a la hora de cargarla en la tabla de compras, mientras que
    "idCompra" existe para identificar cada compra a la hora de cancelar, y evitar que se cancelen tres compras distintas
    de un mismo producto */
    this.id = idProd;
    this.idCompra = ++idCompra;
    this.usuarioComprador = sistema.usuarioLogueado;
  }
  
  validarCantidadVacia() {
    return !isNaN(this.cantidadComprada) && this.cantidadComprada > 0;
  }

  validarEstadoCompra() {
    return this.estadoCompra = "pendiente";
  }

}
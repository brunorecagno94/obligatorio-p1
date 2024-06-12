//Constructor para nuevo usuario Comprador
class Persona {
  constructor(nombre, apellido, userName, pass, numTarjeta, cvcTarjeta) {
    this.nombre = nombre.trim();
    this.apellido = apellido.trim();
    this.userName = userName.trim();
    this.pass = pass.trim();
    this.numTarjeta = numTarjeta.trim();
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
    //ARREGLAR VALIDAR TARJETA!!!!
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
    return this.validarFormato() /*&& this.validacionLuhn()*/ && this.validarCVC();
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
    let alternar = true;
    let total = 0;

    for (let i = this.numTarjetaFinal.length - 1; i >= 0; i--) {
      if (alternar) {
        let subTotal = parseInt(this.numTarjetaFinal[i]) * 2;
        if (subTotal > 9) subTotal -= 9;
        total += subTotal;
        alternar = false;
      }
      else {
        total += parseInt(this.numTarjetaFinal[i]);
        alternar = true;
      }
    }

    total = total * 9;
    total = String(total);
    if (this.numTarjetaFinal[this.numTarjetaFinal.length - 1] === total[total.length - 1]) {
      alert('valida luhn')
    } else {
      alert('no luhn')
    }
  };
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
  constructor(nombreProd, cantidad, precioProd) {
    this.nombre = nombreProd.trim();
    this.cantidadComprada = cantidad;
    this.precio = precioProd.trim();
    this.estadoCompra = '';
    this.usuarioComprador = '';
  }
}






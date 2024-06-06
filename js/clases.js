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

  //Validación en el momento del registro
  validarRegistroUsuario() {
    return this.nombre !== "" && this.apellido !== "" && this.validarUserName() &&
      this.validarPass() /* && this.validarTarjeta(); */
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
    return this.validarNumeroTrajeta() && this.validacionLuhn() && /* bien */this.validarCVC();
  }

  //Valida que la tarjeta tenga 16 dígitos
  validarNumeroTrajeta() {
    return this.numTarjetaFinal === 16;
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
    return this.numTarjetaFinal[this.numTarjetaFinal.length - 1] === total[total.length - 1];
  }
}


//Constructor para nuevo producto
class Producto {
  constructor(nombreProd, precioProd, descripcionProd, urlImagen, stockProd) {
    this.nombre = nombreProd.trim();
    this.precio = precioProd.trim();
    this.descripcion = descripcionProd.trim();
    this.imagen = urlImagen;
    this.stock = stockProd.trim();
    this.id = ++idProducto;
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






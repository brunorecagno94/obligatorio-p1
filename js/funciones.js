function encontrarCaracter(texto, caracter) {
  let posicion = -1;

  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === caracter) posicion = texto[i];
  }
  return posicion;
}

function contarCaracter(texto, caracter) {
  let contador = 0;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === caracter) {
      contador++;
    }
  }
  return contador;
}

function encontrarNumero(texto) {
  let exito = false;

  for (let i = 0; i < texto.length; i++) {
    if (!isNaN(texto[i])) {
      exito = true;
    }
  }
  return exito;
}

function encontrarMayuscula(texto) {
  let exito = false;

  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= 'A' && texto[i] <= 'Z') {
      exito = true;
    }
  }
  return exito;
}

function encontrarMinuscula(texto) {
  let exito = false;

  for (let i = 0; i < texto.length; i++) {
    if (texto[i] >= 'a' && texto[i] <= 'z') {
      exito = true;
    }
  }
  return exito;
}

function eliminarCaracter(texto, caracter) {
  let nuevoTexto = "";

  for (let i = 0; i < texto.length; i++) {
    if (texto[i] !== caracter) {
      nuevoTexto += texto[i];
    }
  }
  return nuevoTexto;
}

function buscarAtributo(array, atributo, valor) {
  let existe = false;

  for (let i = 0; i < array.length; i++) {
    const objeto = array[i];
    if (objeto[`${atributo}`] === valor) {
      existe = true;
    }
  }
  return existe;
}

function devolverObjeto(array, atributo, valor) {
  let objeto = null;
  for (let i = 0; i < array.length; i++) {
    if (array[i][`${atributo}`] === valor) {
      objeto = array[i];
      break;
    }
  }
  return objeto;
}

function sumarStock(array, atributo, valor, nuevoStock) {

  for (let i = 0; i < array.length; i++) {
    const objeto = array[i];
    if (objeto[`${atributo}`] === valor) {
      objeto.stock += nuevoStock;
    }
  }
}

function validarCaseInsensitive(array, atributo, valor) {
  let valida = false;

  for (let i = 0; i < array.length; i++) {
    const objeto = array[i];
    if (objeto[`${atributo}`].toLowerCase() === valor.toLowerCase()) {
      valida = true;
    }
  }
  return valida;
}

function validarSaldoSuficiente(array, atributo) {
  let valida = false;
  let saldoUsuario = buscarAtributo(sistema.listaUsuarios, 'saldo', saldo)
  for (let i = 0; i < array.length; i++) {
    const objeto = array[i];
    if (objeto[`${atributo}`] * cantidad <= saldoUsuario) {
      valida = true;
    }
    return valida;
  }
}

function extraerNumero(texto) {
  let numero = '';
  for (let i = 0; i < texto.length; i++) {
    const caracter = texto[i];
    if((!isNaN(parseInt(caracter)))) numero += caracter;
  }

  return parseInt(numero);
}
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
    if (texto[i] === texto[i].toUpperCase()) {
      exito = true;
    }
  }
  return exito;
}

function encontrarMinuscula(texto) {
  let exito = false;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === texto[i].toLowerCase()) {
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
class Util {

  joinAskWithTags(rows) { //devuelve un array con las preguntas y sus etiquetas en forma de array
    let array = []
    if (rows.length != 0) {
      let p = []
      rows.forEach(e => {
        if (array[e.id] === undefined) {

          if (e.texto.length > 150) { //Para mostrar solo 150 caracteres
            e.texto = e.texto.slice(0, 150) + "..."
          }

          if (e.votos != undefined) { //Para ver una pregunta en especifico
            p = {
              "id": e.id,
              "titulo": e.titulo,
              "texto": e.texto,
              "fecha": e.fecha,
              "votos": e.votos,
              "visitas": e.visitas,
              "avatar": e.avatar,
              "nombreUsuario": e.nombreUsuario,
              "tags": [e.nombreEtiqueta]
            };
          }
          else { //Para la vista de todas las preguntas
            p = {
              "id": e.id,
              "titulo": e.titulo,
              "texto": e.texto,
              "fecha": e.fecha,
              "avatar": e.avatar,
              "nombreUsuario": e.nombreUsuario,
              "tags": [e.nombreEtiqueta]
            };
          }

          array[p.id] = p
        }
        else {
          array[p.id].tags.push(e.nombreEtiqueta)
        }

      });
      //como los ids son las posiciones del array, a veces los ids en la BD son 1,4,5... Y las posiciones del 2 al 3 quedan vacias, por lo que para eliminarlas se hace esto:
      array = array.filter(Boolean)
    }
    return array;
  }

  createTask(texto) {
    let regexp = /@\w+/g; //@cualquier letra o numero. La g es para coger todos los tags que hay.
    let tags = texto.match(regexp);
    let tagsFin = [];

    if (tags != null) {
      tagsFin = tags.map((e) => e.substring(1)); //le quitas el @ del principio
    }

    return tagsFin;
  }
}
module.exports = Util;

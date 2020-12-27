"use strict";
const mysql = require("mysql");

class modelAsk {
    constructor(pool) {
        this.pool = pool;
    }

    getAllAsks(callback) { //saca todas las preguntas
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else { //Left join para que saque preguntas aunque no tengan etiquetas
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo ORDER BY preguntas.id DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            let array = []

                            if (rows.length != 0) {

                                let p = []

                                rows.forEach(e => {
                                    if (array[e.id] === undefined) {
                                        p = {
                                            "id": e.id,
                                            "titulo": e.titulo,
                                            "texto": e.texto,
                                            "fecha": e.fecha,
                                            "avatar": e.avatar,
                                            "nombreUsuario": e.nombreUsuario,
                                            "tags": [e.nombreEtiqueta]
                                        };

                                        array[p.id] = p
                                    }
                                    else {
                                        array[p.id].tags.push(e.nombreEtiqueta)
                                    }

                                });

                                //como los ids son las posiciones del array, a veces los ids en la BD son 1,4,5... Y las posiciones del 2 al 3 quedan vacias, por lo que para eliminarlas se hace esto:
                                array = array.filter(Boolean)
                            }

                            callback(null, array)
                        }

                    });
            }
        });
    }

    getAsk(idPregunta, callback) { //Se puede acceder la información detallada de una pregunta pulsando su título en cualquiera de las vistas de preguntas
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else { //Left join para que saque preguntas aunque no tengan etiquetas
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto, preguntas.fecha, preguntas.votos, preguntas.visitas, usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo WHERE preguntas.id = ?",
                    [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else if (rows.length === 0) {
                            callback(null, false) //no existe la pregunta
                        }
                        else { //En cuanto a las visitas de las preguntas, cada vez que un usuario accede a la información detallada de una pregunta, se incrementa en uno sun número de visitas.
                            connection.query("UPDATE preguntas SET visitas=visitas+1 WHERE id = ?",
                                [idPregunta],
                                function (err) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"))
                                    }
                                    else {
                                        callback(null, rows)
                                    }
                                });
                        }
                    });
            }
        });
    }

    insertAsk(titulo, texto, fecha, email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO preguntas(titulo, texto, fecha, idUsuario) VALUES (?,?,?,?)",
                    [titulo, texto, fecha, email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error en la insercion de la pregunta"))
                        }
                        else {


                            callback(null, rows)
                        }
                    });
            }
        }
        );
    }

    getAllAsksByTag(nombreTag, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo WHERE etiquetas.nombre = ?",
                    [nombreTag],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //no hay preguntas con esa etiqueta
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    getAllAsksWithoutReply(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo WHERE preguntas.id NOT IN (SELECT respuestas.idPregunta FROM respuestas)",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //todas las preguntas tienen respuesta
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    getAllAsksByText(palabra, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo WHERE preguntas.titulo LIKE '%" + palabra + "%' OR preguntas.texto LIKE '%" + palabra + "%'",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //ninguna pregunta contiene esa palabra en su texto o titulo
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    voteAsk(email, idPregunta, puntos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO votapregunta(idUsuario, idPregunta, puntos) VALUES (?,?,?)",
                    [email, idPregunta, puntos],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Un usuario no puede votar dos veces a la misma pregunta"))
                        }
                        else {
                            connection.query("UPDATE preguntas SET votos=? + (SELECT votos FROM preguntas WHERE id=?) where id=?",
                                [puntos, idPregunta, idPregunta],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"))
                                    }
                                    else {
                                        callback(null, rows)
                                    }
                                });
                        }
                    });
            }
        });
    }

}
module.exports = modelAsk;
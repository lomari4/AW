"use strict";
const mysql = require("mysql");
const util = require("../utils.js")
const utils = new util();

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
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto, preguntas.fecha, usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo ORDER BY preguntas.id DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            let array = utils.joinAskWithTags(rows)
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
                        else {
                            //Para sacar las respuestas
                            connection.query("SELECT respuestas.id, respuestas.texto, respuestas.votos, respuestas.fecha, usuarios.avatar, usuarios.nombre as nombreUsuario FROM (respuestas JOIN preguntas ON respuestas.idPregunta = preguntas.id) JOIN usuarios ON respuestas.idUsuario = usuarios.correo WHERE preguntas.id = ?",
                                [idPregunta],
                                function (err, resp) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"))
                                    }
                                    else {
                                        let array = utils.joinAskWithTags(rows)
                                        callback(null, resp, array)
                                    }
                                });
                        }
                    });
            }
        });
    }

    insertAsk(titulo, texto, fecha, email, etiquetas, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                //CUANDO SE INSERTA UNA PREGUNTA SALTA UN TRIGGER PARA AUMENTAR EL npreguntas DEL USUARIO
                connection.query("INSERT INTO preguntas(titulo, texto, fecha, idUsuario) VALUES (?,?,?,?)",
                    [titulo, texto, fecha, email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error en la insercion de la pregunta"))
                        }
                        else {
                            let cont = 0;
                            for (var i = 0; i < etiquetas.length; ++i) {
                                if (cont > 4) break; //solo deja insertar 5 etiquetas

                                connection.query("INSERT INTO etiquetas(idPregunta, nombre) VALUES (?,?)",
                                    [rows.insertId, etiquetas[i]],
                                    function (err, rows2) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"))
                                        }
                                    });
                                cont++;
                            }
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
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.correo WHERE preguntas.id IN (SELECT idPregunta FROM etiquetas WHERE nombre= ?)",
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
                                let array = utils.joinAskWithTags(rows)
                                callback(null, array)
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
                                let array = utils.joinAskWithTags(rows);
                                callback(null, array)
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
                                let array = utils.joinAskWithTags(rows)
                                callback(null, array)
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
                //CUANDO SE INSERTA EN votapregunta SALTA UN TRIGGER EN LA BD PARA ACTUALIZAR LA REPUTACION DEL USUARIO
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

    visitAsk(email, idPregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                //CUANDO SE INSERTA EN votaRespuesta SALTA UN TRIGGER EN LA BD PARA ACTUALIZAR LA REPUTACION DEL USUARIO
                connection.query("INSERT INTO visitaPregunta(idUsuario, idPregunta) VALUES (?,?)",
                    [email, idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Un usuario no se puede visitar dos veces a la misma pregunta porque sino es un chollo lo de las medallas"))
                        }
                        else {
                            connection.query("UPDATE preguntas SET visitas=visitas + 1 where id=?",
                                [idPregunta],
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

    //RESPUESTAS
    insertReply(texto, fecha, idUsuario, idPregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                //CUANDO SE INSERTA UNA RESPUESTA SALTA UN TRIGGER PARA AUMENTAR EL nrespuestas DEL USUARIO
                connection.query("INSERT INTO respuestas(texto, fecha, idUsuario, idPregunta) VALUES (?,?,?,?)",
                    [texto, fecha, idUsuario, idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error en la insercion de la repuesta"))
                        }
                        else {
                            callback(null, rows)
                        }
                    });
            }
        }
        );
    }

    voteReply(idUsuario, idRespuesta, puntos, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO votarespuesta(idUsuario, idRespuesta, puntos) VALUES (?,?,?)",
                    [idUsuario, idRespuesta, puntos],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Un usuario no puede votar dos veces a la misma respuesta"))
                        }
                        else {
                            connection.query("UPDATE respuestas SET votos=? + votos where id=?",
                            [puntos, idRespuesta],
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
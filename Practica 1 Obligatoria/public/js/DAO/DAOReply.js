"use strict";
const mysql = require("mysql");

class DAOReply {
    constructor(pool) {
        this.pool = pool;
    }

    getAllReplies(idPregunta, callback) { //respuestas de una pregunta
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else {
                connection.query("SELECT respuestas.texto, respuestas.votos, respuestas.fecha, respuestas.idUsuario FROM respuestas JOIN preguntas ON respuestas.idPregunta = preguntas.id WHERE preguntas.id = ?",
                    [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //la pregunta no tiene respuestas
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    insertReply(texto, fecha, idUsuario, idPregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
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

    getAllUserReplies(idUsuario, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT respuestas.texto, respuestas.votos, respuestas.fecha, respuestas.idPregunta FROM respuestas JOIN usuarios ON respuestas.idUsuario = usuarios.id WHERE usuarios.id = ?",
                    [idUsuario],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //el usuario no tiene respuestas
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

}
module.exports = DAOReply;
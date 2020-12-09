"use strict";
const mysql = require("mysql");

class DAOTag {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTags(idPregunta, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else {
                connection.query("SELECT etiquetas.nombre FROM etiquetas JOIN preguntas ON etiquetas.idPregunta = preguntas.id WHERE preguntas.id = ?",
                    [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //la pregunta no tiene etiquetas
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    insertTag(idPregunta, nombre, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT nombre FROM etiquetas WHERE idPregunta=? AND  nombre=?",
                    [idPregunta, nombre],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                connection.query("INSERT INTO etiquetas(idPregunta, nombre) VALUES (?,?)",
                                [idPregunta, nombre],
                                function (err, rows2) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"))
                                    }
                                    else {
                                        callback(null, rows2)
                                    }
                                });
                            }
                            else {
                                callback(null, false) //la pregunta ya tiene esa etiqueta
                            }
                           
                        }

                    });
            }
        }
        );
    }

}
module.exports = DAOTag;
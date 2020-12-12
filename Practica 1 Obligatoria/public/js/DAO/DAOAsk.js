"use strict";
const mysql = require("mysql");

class DAOAsk {
    constructor(pool) {
        this.pool = pool;
    }

    getAllAsks(callback) { //saca todas las preguntas
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else { //Left join para que saque preguntas aunque no tengan etiquetas
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.id",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //no hay preguntas en la BD
                            }
                            else {
                                callback(null, rows)
                            }
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
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha, preguntas.votos, preguntas.visitas, usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.id WHERE preguntas.id = ?",
                    [idPregunta],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else { //En cuanto a las visitas de las preguntas, cada vez que un usuario accede a la información detallada de una pregunta, se incrementa en uno sun número de visitas.
                            connection.query("UPDATE preguntas SET visitas=visitas+1 WHERE id = ?",
                                [idPregunta],
                                function (err) {
                                    if(err){
                                        callback(new Error("Error de acceso a la base de datos"))
                                    }
                                    else{
                                        callback(null, rows)
                                    }
                            });
                        }
                    });
            }
        });
    }

    insertAsk(titulo, texto, fecha, idUsuario, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO preguntas(titulo, texto, fecha, idUsuario) VALUES (?,?,?,?)",
                    [titulo, texto, fecha, idUsuario],
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

    getAllAsksByTag(nombreTag, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.id WHERE etiquetas.nombre = ?",
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

    getAllAsksWithoutReply(callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar, usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.id WHERE preguntas.id NOT IN (SELECT respuestas.idPregunta FROM respuestas)",
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

    getAllAsksByText(palabra, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("SELECT preguntas.id, preguntas.titulo, preguntas.texto,preguntas.fecha,usuarios.avatar,  usuarios.nombre as nombreUsuario, etiquetas.nombre as nombreEtiqueta FROM (preguntas LEFT JOIN etiquetas ON preguntas.id = etiquetas.idPregunta) JOIN usuarios ON preguntas.idUsuario = usuarios.id WHERE preguntas.titulo LIKE '%" + palabra + "%' OR preguntas.texto LIKE '%" + palabra + "%'",
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

}
module.exports = DAOAsk;
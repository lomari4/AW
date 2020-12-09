"use strict";
const mysql = require("mysql");

class DAOMedal { 
    constructor(pool) {
        this.pool = pool;
    }

    getAllMedals(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else {
                connection.query("SELECT medallas.logro, medallas.cantidad, medallas.tipo FROM usuarios JOIN medallas ON usuarios.id = medallas.idUsuario WHERE usuarios.correo = ?",
                [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //el usuario no tiene medallas
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    insertMedal(idUsuario, logro, cantidad, tipo, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO medallas(idUsuario, logro, cantidad, tipo) VALUES (?,?,?,?)",
                    [idUsuario, logro, cantidad, tipo],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            connection.query("UPDATE medallas SET cantidad = ? + (SELECT cantidad FROM medallas WHERE logro=? AND tipo=? AND idUsuario=?) WHERE logro=? AND tipo=? AND idUsuario=?",
                            [cantidad, logro, tipo, idUsuario, logro, tipo, idUsuario],
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
                            callback(null, rows)
                        }
                    });
            }
        }
        );
    }
}
module.exports = DAOMedal;
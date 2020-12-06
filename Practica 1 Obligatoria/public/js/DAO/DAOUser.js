"use strict";
const mysql = require("mysql");

class DAOUser { 
    constructor(pool) {
        this.pool = pool;
    }

    getAllUsers(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }

            else {
                connection.query("SELECT * FROM usuarios",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //no existe ningun usuario
                            }
                            else {
                                callback(null, rows)
                            }
                        }
                    });
            }
        });
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("SELECT * FROM usuarios WHERE correo = ? AND pass = ?",
                    [email, password],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"))
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false) //no está el usuario con el password proporcionado
                            }
                            else {
                                callback(null, true)
                            }
                        }
                    });
            }
        }
        );
    }

    insertUser(email, pass, name, avatar, fecha, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else {
                connection.query("INSERT INTO usuarios(correo, pass, nombre, avatar, fecha) VALUES (?,?,?,?,?)",
                    [email, pass, name, avatar, fecha],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Ya existe un usuario con ese nombre"))
                        }
                        else {
                            callback(null, rows)
                        }
                    });
            }
        }
        );
    }

    getUser(email, callback) {
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                connection.query("SELECT * FROM usuarios WHERE correo = ?",
                [email],
                function (err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"))
                    }
                    else {
                        if (rows.length === 0) {
                            callback(null, false) //no existe el usuario
                        }
                        else {
                            callback(null, rows)
                        }
                    }
                });
            }
        });
    }

    getUserbyName(name, callback) {
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"))
            }
            else{
                connection.query("SELECT * FROM usuarios WHERE nombre = ?",
                [name],
                function (err, rows) {
                    connection.release(); // devolver al pool la conexión
                    if (err) {
                        callback(new Error("Error de acceso a la base de datos"))
                    }
                    else {
                        if (rows.length === 0) {
                            callback(null, false) //no existe el usuario
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
module.exports = DAOUser;
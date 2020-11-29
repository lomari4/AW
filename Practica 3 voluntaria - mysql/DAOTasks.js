"use strict";
const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }

            else {
                connection.query("SELECT task.id, task.text, task.done, tag.tag FROM user JOIN (task JOIN tag ON task.id = tag.taskId) ON user.email = task.user WHERE user.email=?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false); //no existe el usuario
                            }
                            else {
                                let array = []
                                let i = 0

                                while (i < rows.length) {

                                    let arrayTags = []

                                    while (rows.length > i + 1 && rows[i].id === rows[i + 1].id) {
                                        arrayTags.push(rows[i].tag)
                                        i++
                                    }
                                    arrayTags.push(rows[i].tag)

                                    if (rows[i].tag === null) {
                                        array.push([rows[i].id, rows[i].text, rows[i].done])
                                    } else {
                                        array.push([rows[i].id, rows[i].text, rows[i].done, arrayTags])
                                    }
                                    i++
                                }

                                callback(null, array);
                            }
                        }
                    });
            }
        });
    }

    insertTask(email, task, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("INSERT INTO task(user,text,done) VALUES(?,?,?)",
                    [email, task.text, task.done],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else {
                            if (rows.length === 0) {
                                callback(null, false); //no existe el usuario
                            }
                            else {
                                let array = []

                                task.tags.forEach(e => {
                                    array.push([rows.insertId, e])
                                })

                                connection.query("INSERT INTO tag(taskId,tag) VALUES ?",
                                    [array], function (err, result) {
 
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        }
                                        else{
                                            callback(null);
                                        }
                                       
                                    })
                            }
                        }
                    });
            }
        }
        );
    }

    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("UPDATE task SET done=1 WHERE task.id=?",
                    [idTask],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else{
                            callback(null);
                        }
                    });
            }
        }
        );
    }

    deleteCompleted(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {
                connection.query("DELETE FROM task WHERE task.user=? AND task.done = 1",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        }
                        else{
                            callback(null);
                        }
                    });
            }
        }
        );
    }
}
module.exports = DAOTasks;



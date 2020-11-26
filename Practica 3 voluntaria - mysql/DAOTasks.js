"use strict";
const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this.pool=pool;
    }

    getAllTasks(email, callback) {
        this.pool.getConnection(function (err, connection){
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            
            else{
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
                            callback(null, rows);
                        }
                    }
                });
            }
        });
    }
    
    insertTask(email, task, callback) {

    }

    markTaskDone(idTask, callback) {

    }
    
    deleteCompleted(email, callback) {

    }
}
module.exports = DAOTasks;



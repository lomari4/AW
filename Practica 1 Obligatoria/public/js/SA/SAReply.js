const DAOReply = require("../DAO/DAOReply.js");

class SAReply {

    constructor(pool) {
        this.pool = pool;
        this.daoReply = new DAOReply(pool)
    }

    getAllReplies(idPregunta) {
        this.daoReply.getAllReplies(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen respuestas para esa pregunta");
            }
        });
    }

    insertReply(texto, idUsuario, idPregunta){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.daoReply.insertReply(texto, fecha, idUsuario, idPregunta, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Respuesta con id " + result.insertId + " añadida a la pregunta: " + idPregunta + " hecha por el usuario " + idUsuario);
            }
        });
    }

    getAllUserReplies(idUsuario){
        this.daoReply.getAllUserReplies(idUsuario, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen respuestas para ese usuario");
            }
        });
    }
}
module.exports = SAReply;
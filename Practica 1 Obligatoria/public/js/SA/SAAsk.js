const DAOAsk = require("../DAO/DAOAsk.js");
const DAOReply = require("../DAO/DAOReply.js");

class SAAsk {

    constructor(pool) {
        this.pool = pool;
        this.daoAsk = new DAOAsk(pool)
    }

    getAllAsk() {
        this.daoAsk.getAllAsks(function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay preguntas en la BD");
            }
        });
    }

    getAsk(idPregunta){
        this.daoAsk.getAsk(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No existe la pregunta con el id", idPregunta);
            }
        });
    }

    insertAsk(titulo, texto, idUsuario){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.daoAsk.insertAsk(titulo, texto, fecha, idUsuario, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Pregunta con id " + result.insertId + " hecha por el usuario " + idUsuario);
            }
        });
    }

    getAllAsksByTag(nombreTag){
        this.daoAsk.getAllAsksByTag(nombreTag, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay preguntas con esa etiqueta");
            }
        });
    }

    getAllAsksWithoutReply(){
        this.daoAsk.getAllAsksWithoutReply(function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("Todas las preguntas tienen respuesta");
            }
        });
    }

    getAllAsksByText(palabra){
        this.daoAsk.getAllAsksByText(palabra, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("ninguna pregunta contiene esa palabra en su texto o titulo");
            }
        });
    }
}
module.exports = SAAsk;
const modelAsk = require("../models/modelAsk.js");
const modelReply = require("../models/modelReply.js");
const modelTag = require("../models/modelTag.js");

class controllerPreguntas {

    constructor(pool) {
        this.pool = pool;
        this.modelAsk = new modelAsk(pool)
        this.modelReply = new modelReply(pool)
        this.modelTag = new modelTag(pool)
    }

    //PREGUNTAS//
    getAllAsk() {
        this.modelAsk.getAllAsks(function (err, result) {
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
        this.modelAsk.getAsk(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No existe la pregunta con el id " + idPregunta);
            }
        });
    }

    insertAsk(titulo, texto, idUsuario){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.modelAsk.insertAsk(titulo, texto, fecha, idUsuario, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Pregunta con id " + result.insertId + " hecha por el usuario " + idUsuario);
            }
        });
    }

    getAllAsksByTag(nombreTag){
        this.modelAsk.getAllAsksByTag(nombreTag, function (err, result){
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
        this.modelAsk.getAllAsksWithoutReply(function (err, result){
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
        this.modelAsk.getAllAsksByText(palabra, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("ninguna pregunta contiene esa palabra en su texto o titulo");
            }
        });
    }

    voteAsk(idUsuario, idPregunta, puntos){
        this.modelAsk.voteAsk(idUsuario, idPregunta, puntos, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("Un usuario no puede votar dos veces a la misma pregunta");
            }
        });
    }

    //RESPUESTAS//
    getAllReplies(idPregunta) {
        this.modelReply.getAllReplies(idPregunta, function (err, result) {
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

        this.modelReply.insertReply(texto, fecha, idUsuario, idPregunta, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Respuesta con id " + result.insertId + " añadida a la pregunta: " + idPregunta + " hecha por el usuario " + idUsuario);
            }
        });
    }

    getAllUserReplies(idUsuario){
        this.modelReply.getAllUserReplies(idUsuario, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen respuestas para ese usuario");
            }
        });
    }

    voteReply(idUsuario, idRespuesta, puntos){
        this.modelReply.voteReply(idUsuario, idRespuesta, puntos, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("Un usuario no puede votar dos veces a la misma respuesta");
            }
        });
    }

    //ETIQUETAS//
    getAllTags(idPregunta) {
        this.modelTag.getAllTags(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No existen etiquetas para esa pregunta");
            }
        });
    }

    insertTag(idPregunta, nombre){
        this.modelTag.insertTag(idPregunta, nombre, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {   
                console.log("Etiqueta añadida a la pregunta con id: " + idPregunta);
            }
            else{
                console.log("La pregunta ya tiene esa etiqueta");
            }
        });
    }
}
module.exports = controllerPreguntas;
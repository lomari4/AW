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
    getAllAsk(response) {
        this.modelAsk.getAllAsks(function (err, result) {
            if (err) {
                console.log(err.message);
            } else {
                response.render("preguntas", { userName: response.locals.userName, preguntas: result, titulo: "Todas las preguntas" });
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

    insertAsk(titulo, texto, email,etiquetas, response){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.modelAsk.insertAsk(titulo, texto, fecha, email, etiquetas, function (err, result){
            if (err) {
                console.log(err.message);
                response.redirect("/preguntas/preguntas")
            } else {       
                console.log("Pregunta con id " + result.insertId + " hecha por el usuario " + email);
                response.redirect("/preguntas/preguntas")
            }
        });
    }

    getAllAsksByTag(nombreTag, response){
        this.modelAsk.getAllAsksByTag(nombreTag, function (err, result){
            if (err) {
                console.log(err.message);
            } else {
                console.log(result);
                response.render("preguntas", { userName: response.locals.userName, preguntas: result, titulo: "Preguntas con la etiqueta [" + nombreTag + "]" });
            }
        });
    }

    getAllAsksWithoutReply(response){
        this.modelAsk.getAllAsksWithoutReply(function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result)
                response.render("preguntas", { userName: response.locals.userName, preguntas: result, titulo: "Preguntas sin responder" });
            } else {
                response.render("preguntas", { userName: response.locals.userName, preguntas: [], titulo: "Todas las preguntas tienen respuesta" });
            }
        });
    }

    getAllAsksByText(palabra, response){
        this.modelAsk.getAllAsksByText(palabra, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                response.render("preguntas", { userName: response.locals.userName, preguntas: result, titulo: "Resultados de la busqueda \"" + palabra + "\"" });
            } else {
                response.render("preguntas", { userName: response.locals.userName, preguntas: [], titulo: "Ninguna pregunta contiene esa palabra en su texto o titulo" });
            }
        });
    }

    voteAsk(email, idPregunta, puntos){
        this.modelAsk.voteAsk(email, idPregunta, puntos, function (err, result){
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

    insertReply(texto, email, idPregunta){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.modelReply.insertReply(texto, fecha, email, idPregunta, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Respuesta con id " + result.insertId + " añadida a la pregunta: " + idPregunta + " hecha por el usuario " + email);
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

    voteReply(email, idRespuesta, puntos){
        this.modelReply.voteReply(email, idRespuesta, puntos, function (err, result){
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
const modelAsk = require("../models/modelAsk.js");

class controllerPreguntas {

    constructor(pool) {
        this.pool = pool;
        this.modelAsk = new modelAsk(pool)
    }
   
    /*
    RECORDATORIOS:
    CUALQUIER RENDER QUE TENGA HEADER NECESITA QUE LE PASES userName Y userEmail
    */

    //PREGUNTAS//
    getAllAsk(response) {
        this.modelAsk.getAllAsks(function (err, result) {
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else {
                response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Todas las preguntas" });
            }
        });
    }

    getAsk(idPregunta, response){
        this.modelAsk.getAsk(idPregunta, function (err, respuestas, pregunta) {
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else {
                response.render("informePregunta", { userName: response.locals.userName, userEmail: response.locals.userEmail, pregunta: pregunta[0], titulo: pregunta[0].titulo, respuestas:respuestas});
            }
        });
    }

    getAllAsksByTag(nombreTag, response){
        this.modelAsk.getAllAsksByTag(nombreTag, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else {
                response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Preguntas con la etiqueta [" + nombreTag + "]" });
            }
        });
    }

    getAllAsksWithoutReply(response){
        this.modelAsk.getAllAsksWithoutReply(function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else if (result) {
                response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Preguntas sin responder" });
            } else {
                response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: [], titulo: "Todas las preguntas tienen respuesta" });
            }
        });
    }

    getAllAsksByText(palabra, useremail, username, response){
        this.modelAsk.getAllAsksByText(palabra, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else if (result) {
                response.render("preguntas", { userName: username, userEmail: useremail, preguntas: result, titulo: "Resultados de la busqueda \"" + palabra + "\"" });
            } else {
                response.render("preguntas", { userName: username, userEmail: useremail, preguntas: [], titulo: "Ninguna pregunta contiene esa palabra en su texto o titulo" });
            }
        });
    }
    
    insertAsk(titulo, texto, email,etiquetas, response){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();
        this.modelAsk.insertAsk(titulo, texto, fecha, email, etiquetas, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else {       
                console.log("Pregunta con id " + result.insertId + " hecha por el usuario " + email);
                response.redirect("/preguntas/preguntas")
            }
        });
    }

    voteAsk(email, idPregunta, puntos, response){
        this.modelAsk.voteAsk(email, idPregunta, puntos, function (err, result){
            if (err) {
                console.log(err.message);
                response.redirect("/preguntas/" + idPregunta);
            } else {
                response.redirect("/preguntas/" + idPregunta);
            }
        });
    }

    visitAsk(email, idPregunta, response){
        this.modelAsk.visitAsk(email, idPregunta, function (err, result){
            if (err) {
                console.log(err.message);
                response.redirect("/preguntas/" + idPregunta);
            } else {
                response.redirect("/preguntas/" + idPregunta);
            }
        });
    }

    //RESPUESTAS//
    getAllReplies(idPregunta) {
        this.modelReply.getAllReplies(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen respuestas para esa pregunta");
            }
        });
    }

    insertReply(texto, email, idPregunta, response){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();

        this.modelAsk.insertReply(texto, fecha, email, idPregunta, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else {            
                console.log("Respuesta con id " + result.insertId + " añadida a la pregunta: " + idPregunta + " hecha por el usuario " + email);
                //response.redirect("/preguntas/" + idPregunta);
                response.redirect("/preguntas/preguntas")
            }
        });
    }

    getAllUserReplies(idUsuario){
        this.modelReply.getAllUserReplies(idUsuario, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("error503.ejs");
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen respuestas para ese usuario");
            }
        });
    }

    voteReply(email, idPregunta, idRespuesta, puntos, response){
        this.modelAsk.voteReply(email, idRespuesta, puntos, function (err, result){
            if (err) {
                console.log(err.message);
                response.redirect("/preguntas/" + idPregunta);
            } else {
                response.redirect("/preguntas/" + idPregunta);
            }
        });
    }

}
module.exports = controllerPreguntas;
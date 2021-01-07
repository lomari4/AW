const ModelAsk = require("../models/modelAsk.js");
const mysql = require("mysql");
const config = require("../config.js");
const util = require("../utils.js")
const utils = new util();

const pool = mysql.createPool(config.mysqlConfig);
const modelAsk = new ModelAsk(pool);

//PREGUNTAS//
function getAllAsk(request, response, next) {
    modelAsk.getAllAsks(function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else {
            response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Todas las preguntas" });
        }
    });
}

function getAsk(request, response, next) {
    modelAsk.getAsk(request.params.idPregunta, function (err, pregunta) {
        if (err) {
            console.log(err.message);
            next(err);
        } else {
            modelAsk.getReplies(request.params.idPregunta, function (err, respuestas) {
                if (err) {
                    console.log(err.message);
                    next(err);
                } else {
                    response.render("informePregunta", { userName: response.locals.userName, userEmail: response.locals.userEmail, pregunta: pregunta[0], titulo: pregunta[0].titulo, respuestas: respuestas });
                }
            });
        }
    });
}

function getAllAsksByTag(request, response, next) {
    modelAsk.getAllAsksByTag(request.params.tag, function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else {
            response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Preguntas con la etiqueta [" + request.params.tag + "]" });
        }
    });
}

function getAllAsksWithoutReply(request, response, next) {
    modelAsk.getAllAsksWithoutReply(function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else if (result) {
            response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: result, titulo: "Preguntas sin responder" });
        } else {
            response.render("preguntas", { userName: response.locals.userName, userEmail: response.locals.userEmail, preguntas: [], titulo: "Todas las preguntas tienen respuesta" });
        }
    });
}

function getAllAsksByText(request, response, next) {
    modelAsk.getAllAsksByText(request.body.nombreBusqueda, function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else if (result) {
            response.render("preguntas", { userName: request.session.currentName, userEmail: request.session.currentUser, preguntas: result, titulo: "Resultados de la busqueda \"" + request.body.nombreBusqueda + "\"" });
        } else {
            response.render("preguntas", { userName: request.session.currentName, userEmail: request.session.currentUser, preguntas: [], titulo: "Ninguna pregunta contiene esa palabra en su texto o titulo" });
        }
    });
}

function insertAsk(request, response, next) {
    let f = new Date();
    let fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
    let etiquetas = utils.createTask(request.body.etiquetas)

    modelAsk.insertAsk(request.body.titulo, request.body.cuerpo, fecha, request.session.currentUser, etiquetas, function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else {
            console.log("Pregunta con id " + result.insertId + " hecha por el usuario " + request.session.currentUser);
            response.redirect("/preguntas/preguntas")
        }
    });
}

function voteAsk(request, response, next) {
    modelAsk.voteAsk(response.locals.userEmail, request.params.idPregunta, request.params.like, function (err, result) {
        if (err) {
            console.log(err.message);
            response.redirect("/preguntas/" + request.params.idPregunta);
        } else {
            response.redirect("/preguntas/" + request.params.idPregunta);
        }
    });
}

function visitAsk(request, response, next) {
    modelAsk.visitAsk(response.locals.userEmail, request.params.idPregunta, function (err, result) {
        if (err) {
            console.log(err.message);
            response.redirect("/preguntas/" + request.params.idPregunta);
        } else {
            response.redirect("/preguntas/" + request.params.idPregunta);
        }
    });
}

//RESPUESTAS//
function insertReply(request, response, next) {
    let f = new Date();
    let fecha = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

    console.log(request.body.textarea)
    console.log(fecha)
    console.log(request.session.currentUser)
    console.log(request.params.idPregunta)
    modelAsk.insertReply(request.body.textarea, fecha, request.session.currentUser, request.params.idPregunta, function (err, result) {
        if (err) {
            console.log(err.message);
            next(err);
        } else {
            console.log("Respuesta con id " + result.insertId + " añadida a la pregunta: " + request.params.idPregunta + " hecha por el usuario " + request.session.currentUser);
            response.redirect("/preguntas/preguntas")
        }
    });
}

function voteReply(request, response, next) {
    modelAsk.voteReply(response.locals.userEmail, request.params.idRespuesta, request.params.like, function (err, result) {
        if (err) {
            console.log(err.message);
            response.redirect("/preguntas/" + request.params.idPregunta);
        } else {
            response.redirect("/preguntas/" + request.params.idPregunta);
        }
    });
}

module.exports = {
    getAllAsk: getAllAsk,
    getAsk: getAsk,
    getAllAsksByTag: getAllAsksByTag,
    getAllAsksWithoutReply: getAllAsksWithoutReply,
    getAllAsksByText: getAllAsksByText,
    insertAsk: insertAsk,
    voteAsk: voteAsk,
    visitAsk: visitAsk,
    insertReply: insertReply,
    voteReply: voteReply
};
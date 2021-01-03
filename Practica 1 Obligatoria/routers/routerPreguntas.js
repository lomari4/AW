const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const config = require("../config.js");
const mysql = require("mysql");
const path = require("path");
const util = require("../utils.js")

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const controllerPreguntas = require("../controllers/controllerPreguntas.js");

// Crear el pool de conexiones
const pool = mysql.createPool(config.mysqlConfig);

//Sesiones
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

//Uses
router.use(middlewareSession);
router.use(bodyParser.urlencoded({ extended: true }));

//Declaraciones
let controllerAsk = new controllerPreguntas(pool)
const utils = new util();


//Middleware para identificar al usuario
function identificacionRequerida(request, response, next) {
    if (request.session.currentUser) {
        response.locals.userEmail = request.session.currentUser;
        response.locals.userName = request.session.currentName;
        next();
    } else {
        console.log("No lo intentes ;)")
        response.redirect("/login");
    }
}

/* middleware propios
router.get("/",)
*/

//MANEJADORES DE RUTA

//pagina principal de preguntas
router.get("/preguntas", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsk(response);
});

//formular pregunta
router.get("/formular", identificacionRequerida, function (request, response) {
    response.render("formular", { userName: response.locals.userName });
});

//preguntas sin responder
router.get("/sinResponder", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsksWithoutReply(response);
});

//para coger las etiquetas de la pregunta
router.get("/etiquetados/:tag", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsksByTag(request.params.tag, response);
});

//get pregunta
router.get("/:idPregunta", identificacionRequerida, function (request, response) {
    controllerAsk.getAsk(request.params.idPregunta, response);
});

//Visitar pregunta
router.get("/visita/:idPregunta", identificacionRequerida, function (request, response) {
    controllerAsk.visitAsk(response.locals.userEmail,request.params.idPregunta, response);
});

//Like y dislike preguntas
router.get("/likePregunta/:idPregunta", identificacionRequerida, function (request, response) {
    controllerAsk.voteAsk(response.locals.userEmail,request.params.idPregunta, 1, response);
});
router.get("/dislikePregunta/:idPregunta", identificacionRequerida, function (request, response) {
    controllerAsk.voteAsk(response.locals.userEmail,request.params.idPregunta, -1, response);
});

//Like y dislike respuesta
router.get("/likeRespuesta/:idPregunta/:idRespuesta", identificacionRequerida, function (request, response) {
    controllerAsk.voteReply(response.locals.userEmail,request.params.idPregunta,request.params.idRespuesta, 1, response);
});
router.get("/dislikeRespuesta/:idPregunta/:idRespuesta", identificacionRequerida, function (request, response) {
    controllerAsk.voteReply(response.locals.userEmail,request.params.idPregunta,request.params.idRespuesta, -1, response);
});


//POST REQUESTS
router.post("/procesar_formular", function (request, response) { //al no necesitar la funcion identificacionRequerida, no puedes usar response.locals para pasarle el username ya que ahi es donde se define
    let etiquetas = utils.createTask(request.body.etiquetas)
    controllerAsk.insertAsk(request.body.titulo, request.body.cuerpo, request.session.currentUser, etiquetas, response);
});

router.post("/procesar_busqueda", function (request, response) { 
    controllerAsk.getAllAsksByText(request.body.nombreBusqueda, request.session.currentUser, request.session.currentName, response);
});

router.post("/procesar_respuesta/:idPregunta", function (request, response) { 
    controllerAsk.insertReply(request.body.textarea, request.session.currentUser, request.params.idPregunta, response);
});


module.exports = router;
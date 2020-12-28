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
router.get("/preguntas", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsk(response);
});

router.get("/formular", identificacionRequerida, function (request, response) {
    response.render("formular", { userName: response.locals.userName });
});

router.get("/sinResponder", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsksWithoutReply(response);
});

router.get("/:tag", identificacionRequerida, function (request, response) {
    controllerAsk.getAllAsksByTag(request.params.tag, response);
});

//POST REQUESTS
router.post("/procesar_formular", function (request, response) {
    let etiquetas = utils.createTask(request.body.etiquetas)
    controllerAsk.insertAsk(request.body.titulo, request.body.cuerpo, request.session.currentUser, etiquetas, response);
});

router.post("/procesar_busqueda", function (request, response) {
    controllerAsk.getAllAsksByText(request.body.nombreBusqueda, response);
});


module.exports = router;
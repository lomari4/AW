const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config.js");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const controllerAsk = require("../controllers/controllerPreguntas.js");

//Declaramos el router
const router = express.Router();

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

//MANEJADORES DE RUTA

//pagina principal de preguntas
router.get("/preguntas", identificacionRequerida, controllerAsk.getAllAsk);

//formular pregunta
router.get("/formular", identificacionRequerida, function (request, response) {
    response.render("formular", { userName: response.locals.userName });
});

//preguntas sin responder
router.get("/sinResponder", identificacionRequerida, controllerAsk.getAllAsksWithoutReply);

//para coger las etiquetas de la pregunta
router.get("/etiquetados/:tag", identificacionRequerida, controllerAsk.getAllAsksByTag);

//get pregunta
router.get("/:idPregunta", identificacionRequerida, controllerAsk.getAsk);

//Visitar pregunta
router.get("/visita/:idPregunta", identificacionRequerida, controllerAsk.visitAsk); 

//Like y dislike preguntas
router.get("/:like/:idPregunta", identificacionRequerida, controllerAsk.voteAsk);

//Like y dislike respuesta
router.get("/:like/:idPregunta/:idRespuesta", identificacionRequerida, controllerAsk.voteReply);

//POST REQUESTS
router.post("/procesar_formular", identificacionRequerida, controllerAsk.insertAsk); //al no necesitar la funcion identificacionRequerida, no puedes usar response.locals para pasarle el username ya que ahi es donde se define

router.post("/procesar_busqueda", identificacionRequerida, controllerAsk.getAllAsksByText);

router.post("/procesar_respuesta/:idPregunta", identificacionRequerida, controllerAsk.insertReply);

module.exports = router;
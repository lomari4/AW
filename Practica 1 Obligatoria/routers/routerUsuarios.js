const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const config = require("../config.js");
const mysql = require("mysql");
const path = require("path");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const controllerUsuarios = require("../controllers/controllerUsuarios.js");

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
let controllerUser = new controllerUsuarios(pool)

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
router.get("perfil/:idUsuario",....)
*/

//MANEJADORES DE RUTA
router.get("/principal", identificacionRequerida, function (request, response) {
    response.render("principal", { userName: response.locals.userName });
});

router.get("/imagenUsuario", function (request, response) {
    controllerUser.getUserImageName(request.session.currentUser,response)
});

router.get("/nombreUsuario", function (request, response) {
    console.log("hola")
    controllerUser.getUserName(request.session.currentUser, request, response);
});

//POST REQUESTS
router.post("/procesar_login", function (request, response) {
    controllerUser.isUserCorrect(request.body.correo, request.body.password, request, response)
});

router.post("/procesar_registro", function (request, response) {
    if (request.body.password == request.body.confirmPassword) {
        controllerUser.insertUser(request.body.correo, request.body.password, request.body.nickname, request.body.avatar, request, response);
    }
    else {
        response.render("registro", { errorMsg: "Passwords no coinciden" });
    }
});

module.exports = router;
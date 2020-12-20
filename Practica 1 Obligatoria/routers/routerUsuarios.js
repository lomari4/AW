const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const controllerUsuarios = require("../controllers/controllerUsuarios.js");

//preguntar si el pool va aqui
const config = require("../config.js");
const mysql = require("mysql");
// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.mysqlConfig.host,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});

router.use(bodyParser.urlencoded({ extended: true }));

/* middleware propios

router.get("perfil/:idUsuario",....)
*/

let controllerUser = new controllerUsuarios(pool)

router.get("/", function (request, response) {
    response.redirect("/login.html")
});

router.get("/login", function (request, response) {
    response.redirect("/login.html")
});

router.get("/registro", function (request, response) {
    response.redirect("/registro.html")
});

router.get("/principal", function (request, response) {
    response.redirect("/principal.html")
});

//preguntar si response va ahi
router.post("/procesar_login", function (request, response, next) {
    controllerUser.isUserCorrect(request.body.correo, request.body.password, response, next);
});

router.post("/procesar_registro", function (request, response, next) {
    if (request.body.password == request.body.confirmPassword) {
        controllerUser.insertUser(request.body.correo, request.body.password, request.body.nickname, request.body.avatar, response, next);
    }
    else{
        response.statusCode = 404;
        console.log("Passwords no coinciden")
        //preguntar
        //preguntar validacion formularios (dejar correo vacio etc)
    }
});

module.exports = router;
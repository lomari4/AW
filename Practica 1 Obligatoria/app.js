"use strict";
const mysql = require("mysql");
const config = require("./config.js");
const express = require("express");
const routerUsuarios = require("./routers/routerUsuarios.js");
const routerPreguntas = require("./routers/routerPreguntas.js");
const path = require("path");
const app = express();

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

//Sesiones
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
  saveUninitialized: false,
  secret: "foobar34",
  resave: false,
  store: sessionStore
});

//para que funcione ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Uses
app.use(middlewareSession);
app.use(express.static(__dirname + '/public')); //IMPORTANTE
//routers
app.use("/usuarios", routerUsuarios)
app.use("/preguntas", routerPreguntas)

//MANEJADORES DE RUTA
app.get("/", function (request, response) {
  response.redirect("/login")
});

app.get("/login", function (request, response) {
  response.render("login", { errorMsg: null });
});

app.get("/registro", function (request, response) {
  response.render("registro", { errorMsg: null });
});

app.get("/logout", function (request, response) {
  request.session.destroy()
  response.redirect("/login");
});

// Arrancar el servidor
app.listen(config.port, function (err) {
  if (err) {
    console.log("ERROR al iniciar el servidor");
  } else {
    console.log(`Servidor arrancado en el puerto ${config.port}`);
  }
});


//**************USUARIOS****************
//console.log(controllerUser.getAllUsers());
//console.log(controllerUser.isUserCorrect("usuario1@ucm.es", 1234));
//console.log(controllerUser.insertUser("usuario3@ucm.es", 4321, "Usuario3", "../recursos/user.png"));
//console.log(controllerUser.getUser("usuario35@ucm.es"));
//console.log(controllerUser.getUserbyName("Usuario3"));
// console.log(controllerUser.updateReputation(1, -2))

//**************MEDALLAS****************
//console.log(controllerUser.getAllMedals("usuario1@ucm.es"));
//console.log(controllerUser.insertMedal(2, "Registrado", 1, "oro"));

//**************ETIQUETAS***************
//console.log(controllerAsk.getAllTags(1))
// console.log(controllerAsk.insertTag(5, "covid"));

//**************RESPUESTAS***************
//console.log(controllerAsk.insertReply("Respuesta prueba2",2,2));
//console.log(controllerAsk.getAllReplies(1));
//console.log(controllerAsk.getAllUserReplies(2));
// console.log(controllerAsk.voteReply(1,1,1))


//**************PREGUNTAS***************
//console.log(controllerAsk.getAllAsk())
// console.log(controllerAsk.insertAsk("Evolucion del covid-19", "El covid a dia de hoy...", 2))
// console.log(controllerAsk.getAllAsksByTag("aw"))
// console.log(controllerAsk.getAllAsksWithoutReply())
// console.log(controllerAsk.getAllAsksByText("dia"))
// console.log(controllerAsk.getAsk(5)) 
// console.log(controllerAsk.voteAsk(1,1,1))
//DUDA CON HACER TRIGGER O AUMENTAR EN 1 A MANO creo que mejor a mano 
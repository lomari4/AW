"use strict";
const mysql = require("mysql");
const config = require("./config.js");
const SAUser = require("./public/js/SA/SAUser.js");
const SAMedal = require("./public/js/SA/SAMedal.js");
const SATag = require("./public/js/SA/SATag.js");
const SAReply = require("./public/js/SA/SAReply.js");
const SAAsk = require("./public/js/SA/SAAsk.js");


// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let saUser = new SAUser(pool)
let saMedal = new SAMedal(pool)
let saTag = new SATag(pool)
let saReply = new SAReply(pool)
let saAsk = new SAAsk(pool)

//**************USUARIOS****************
//console.log(saUser.getAllUsers());
//console.log(saUser.isUserCorrect("usuario1@ucm.es", 1234));
//console.log(saUser.insertUser("usuario3@ucm.es", 4321, "Usuario3", "../recursos/user.png"));
//console.log(saUser.getUser("usuario3@ucm.es"));
//console.log(saUser.getUserbyName("Usuario3"));

//**************MEDALLAS****************
//console.log(saMedal.getAllMedals("usuario1@ucm.es"));
//console.log(saMedal.insertMedal(2, "Registrado", 1, "oro"));

//**************ETIQUETAS***************
//console.log(saTag.getAllTags(1))
// console.log(saTag.insertTag(5, "covid"));

//**************RESPUESTAS***************
//console.log(saReply.insertReply("Respuesta prueba2",2,2));
//console.log(saReply.getAllReplies(1));
//console.log(saReply.getAllUserReplies(2));

//**************PREGUNTAS***************
// console.log(saAsk.getAllAsk())
// console.log(saAsk.insertAsk("Evolucion del covid-19", "El covid a dia de hoy...", 2))
// console.log(saAsk.getAllAsksByTag("aw"))
// console.log(saAsk.getAllAsksWithoutReply())
// console.log(saAsk.getAllAsksByText("dia"))
console.log(saAsk.getAsk(5)) 
//DUDA CON HACER TRIGGER O AUMENTAR EN 1 A MANO creo que mejor a mano 
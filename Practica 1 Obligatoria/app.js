"use strict";

const mysql = require("mysql");
const config = require("./config.js");
const SAUser = require("./public/js/SA/SAUser.js");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let saUser = new SAUser(pool)

// console.log(saUser.getAllUsers());
// console.log(saUser.isUserCorrect("usuario1@ucm.es", 1234));
//console.log(saUser.insertUser("usuario3@ucm.es", 4321, "Usuario3", "../recursos/user.png"));

console.log(saUser.getUser("usuario3@ucm.es"));

const modelUser = require("../models/modelUser.js");
const modelMedal = require("../models/modelMedal.js");

var path = require('path');

class controllerUsuarios {

    constructor(pool) {
        this.pool = pool;
        this.modelUser = new modelUser(pool)
        this.modelMedal = new modelMedal(pool)
    }

    //USUARIOS//
    getAllUsers() {
        this.modelUser.getAllUsers(function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay usuarios en la base de datos");
            }
        });
    }

    isUserCorrect(email,pass,response){
        this.modelUser.isUserCorrect(email, pass, function (err, result) {
            if (err) {
                console.log(err.message);
                response.render("login", { errorMsg: err.message });
            } else if (result) {
                console.log("Usuario y contraseña correctos");
                response.redirect("/usuarios/principal")
            } else {
                console.log("Usuario y/o contraseña incorrectos");
                response.render("login", { errorMsg: "Usuario y/o contraseña incorrectos" });
            }
        });
    }

    insertUser(email,pass,nombre,avatar,response){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();
    
        this.modelUser.insertUser(email,pass,nombre,avatar,fecha, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("registro", { errorMsg: "Email ya existente" });
            } else {            
                console.log("Usuario registrado con id: " + result.insertId);
                response.redirect("/usuarios/principal")
            }
        });
    }

    getUserImageName(email, response){
        this.modelUser.getUserImageName(email, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result[0].avatar != null) {
                response.sendFile(path.resolve("public/profile_imgs/") + "/" + result[0].avatar)
            } else {
                response.sendFile(path.resolve("public/profile_imgs/") + "/avatar_" + Math.floor(Math.random() * 4) + ".png")
            }
        });
    }

    getUser(email){
        this.modelUser.getUser(email, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log("Usuario: " + result[0].correo);
            } else {
                console.log("Error al obtener el usuario con el email " + email);
            }
        });
    }

    getUserbyName(name){
        this.modelUser.getUserbyName(name, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log("Correo del usuario: " + result[0].correo);
            } else {
                console.log("Error al obtener el usuario con el nombre " + name);
            }
        });
    }

    updateReputation(id,reputacion){
        this.modelUser.updateReputation(id,reputacion, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("Error al actualizar reputacion");
            }
        });
    }

    //MEDALLAS//
    getAllMedals(email) {
        this.modelMedal.getAllMedals(email, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay existen medallas para ese usuario en la base de datos");
            }
        });
    }

    insertMedal(idUsuario, logro, cantidad, tipo){
        this.modelMedal.insertMedal(idUsuario, logro, cantidad, tipo, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Medalla añadida al usuario: " + idUsuario);
            }
        });
    }
    
}
module.exports = controllerUsuarios;
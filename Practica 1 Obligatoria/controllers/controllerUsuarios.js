const modelUser = require("../models/modelUser.js");
const modelMedal = require("../models/modelMedal.js");

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

    isUserCorrect(email,pass,response,next){
        this.modelUser.isUserCorrect(email, pass, function (err, result) {
            if (err) {
                console.log(err.message);
                response.redirect("/login")
            } else if (result) {
                console.log("Usuario y contraseña correctos");
                response.redirect("/principal")
                next()
            } else {
                console.log("Usuario y/o contraseña incorrectos");
                response.redirect("/login")
            }
        });
    }

    insertUser(email,pass,nombre,avatar,response,next){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();
    
        this.modelUser.insertUser(email,pass,nombre,avatar,fecha, function (err, result){
            if (err) {
                console.log(err.message);
                response.redirect("/registro")
            } else {            
                console.log("Usuario registrado con id: " + result.insertId);
                response.redirect("/principal")
                next()
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
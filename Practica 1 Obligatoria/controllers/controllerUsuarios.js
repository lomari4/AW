const modelUser = require("../models/modelUser.js");

var path = require('path');

class controllerUsuarios {

    constructor(pool) {
        this.pool = pool;
        this.modelUser = new modelUser(pool)
    }

    //USUARIOS//
    getAllUsers(response) {
        this.modelUser.getAllUsers(function (err, result) {
            if (err) {
                console.log(err.message);
            } else {
                response.render("usuarios", { userName: response.locals.userName, userEmail: response.locals.userEmail, usuarios: result, titulo: "Usuarios"});
            }
        });
    }

    getAllUsersByText(palabra, useremail, username, response){
        this.modelUser.getAllUsersByText(palabra, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {
                response.render("usuarios", { userName: username, userEmail: useremail, usuarios: result, titulo:"Usuarios filtrados por [\""+palabra+"\"]" });           
            } else {
                response.render("usuarios", { userName: username, userEmail: useremail, usuarios: [], titulo: "No hay usuarios con [\""+palabra+"\"]" });           
            }
        });
    }

    isUserCorrect(email,pass, request, response){
        this.modelUser.isUserCorrect(email, pass, function (err, result) {
            if (err) {
                console.log(err.message);
                response.render("login", { errorMsg: err.message });
            } else if (result) {
                console.log("Usuario y contraseña correctos");
                request.session.currentUser = request.body.correo;
                response.redirect("/usuarios/nombreUsuario");
            } else {
                console.log("Usuario y/o  contraseña incorrectos");
                response.render("login", { errorMsg: "Usuario y/o contraseña incorrectos" });
            }
        });
    }

    getUserImageName(email, response){
        this.modelUser.getUserImageName(email, function (err, result){
            if (err) {
                console.log(err.message);
            } else {
                let pathImg = path.join(__dirname, "../public/profile_imgs/", result[0].avatar);
                response.sendFile(pathImg);
            }
        });
    }

    updateUserImage(avatar,email,response){
        this.modelUser.updateUserImage(avatar,email, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Avatar actualizado");
                //response.redirect("/usuarios/...")
            }
        });
    }

    getUser(email, response){
        this.modelUser.getUser(email, function (err, result) {
            if (err) {
                console.log(err.message);
            } else{
                response.render("perfilUsuario", { userName: response.locals.userName, userEmail: response.locals.userEmail, usuario: result});
            }
        });
    }

    getUserName(email, request, response){
        this.modelUser.getUserName(email, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                request.session.currentName = result[0].nombre;
                console.log(request.session.currentName);
                response.redirect("/usuarios/principal");
            } else {
                console.log("Error al obtener el usuario");
            }
        });
    }

    insertUser(email,pass,nombre,avatar,request,response){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();
    
        this.modelUser.insertUser(email,pass,nombre,avatar,fecha, function (err, result){
            if (err) {
                console.log(err.message);
                response.render("registro", { errorMsg: "Email ya existente" });
            } else {            
                console.log("Usuario registrado con correo: " + email);
                request.session.currentUser = request.body.correo;
                response.redirect("/usuarios/nombreUsuario")    
            }
        });
    }

    updateReputation(email,reputacion){
        this.modelUser.updateReputation(email,reputacion, function (err, result) {
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

    insertMedal(email, logro, cantidad, tipo){
        this.modelMedal.insertMedal(email, logro, cantidad, tipo, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Medalla añadida al usuario: " + email);
            }
        });
    }
    
}
module.exports = controllerUsuarios;
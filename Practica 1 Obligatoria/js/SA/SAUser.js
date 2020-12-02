const DAOUser = require("../DAO/DAOUser.js");

class SAUser {

    constructor(pool) {
        this.pool = pool;
        this.daoUser = new DAOUser(pool)
    }

    getAllUsers() {
        this.daoUser.getAllUsers(function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No hay usuarios en la base de datos");
            }
        });
    }

    isUserCorrect(email,pass){
        this.daoUser.isUserCorrect(email, pass, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log("Usuario y contraseña correctos");
            } else {
                console.log("Usuario y/o contraseña incorrectos");
            }
        });
    }

    insertUser(email,pass,nombre,avatar){
        let f = new Date();
        let fecha = f.getFullYear() + "-"+ (f.getMonth()+1) + "-" + f.getDate();
    
        this.daoUser.insertUser(email,pass,nombre,avatar,fecha, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Usuario registrado con id: " + result.insertId);
            }
        });
    }

    getUser(email){
        this.daoUser.getUser(email, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log("Usuario: "+ result[0].correo);
            } else {
                console.log("Error al obtener el usuario con el email" + email);
            }
        });
    }
    
}
module.exports = SAUser;
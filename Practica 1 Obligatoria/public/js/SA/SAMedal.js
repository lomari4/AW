const DAOMedal = require("../DAO/DAOMedal.js");

class SAMedal {

    constructor(pool) {
        this.pool = pool;
        this.daoMedal = new DAOMedal(pool)
    }

    getAllMedals(email) {
        this.daoMedal.getAllMedals(email, function (err, result) {
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
        this.daoMedal.insertMedal(idUsuario, logro, cantidad, tipo, function (err, result){
            if (err) {
                console.log(err.message);
            } else {            
                console.log("Medalla añadida al usuario: " + idUsuario);
            }
        });
    }
}
module.exports = SAMedal;
const DAOTag = require("../DAO/DAOTag.js");

class SATag {

    constructor(pool) {
        this.pool = pool;
        this.daoTag = new DAOTag(pool)
    }

    getAllTags(idPregunta) {
        this.daoTag.getAllTags(idPregunta, function (err, result) {
            if (err) {
                console.log(err.message);
            } else if (result) {
                console.log(result);
            } else {
                console.log("No existen etiquetas para esa pregunta");
            }
        });
    }

    insertTag(idPregunta, nombre){
        this.daoTag.insertTag(idPregunta, nombre, function (err, result){
            if (err) {
                console.log(err.message);
            } else if (result) {   
                console.log("Etiqueta añadida a la pregunta con id: " + idPregunta);
            }
            else{
                console.log("La pregunta ya tiene esa etiqueta");
            }
        });
    }
}
module.exports = SATag;
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const controllerPreguntas = require("../controllers/controllerPreguntas.js");

router.use(bodyParser.urlencoded({extended:true}));

//poner pool

/* middleware propios
router.get("/",)
*/


module.exports = router;
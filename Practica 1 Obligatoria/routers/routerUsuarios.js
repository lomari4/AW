const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config.js");
const path = require("path");
const multer = require("multer");

const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySQLStore = mysqlSession(session);

const controllerUser = require("../controllers/controllerUsuarios.js");

//Declaramos el router
const router = express.Router();

//Sesiones
const sessionStore = new MySQLStore(config.mysqlConfig);
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

//Uses
router.use(middlewareSession);
router.use(bodyParser.urlencoded({ extended: true }));

//Multer. Permite guardar las imagenes de perfil que suba el usuario en profile_imgs
var storage = multer.diskStorage({
    destination: function (req, file, cb) { //donde se guardara el archivo
      cb(null, 'public/profile_imgs')
    },
    filename: function (req, file, cb) { //nombre del archivo, avatar_fecha.extension para que todos sean unicos y no se sobreescriban
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
  })
const multerFactory = multer({ storage: storage});

//Middleware para identificar al usuario
function identificacionRequerida(request, response, next) {
    if (request.session.currentUser) {
        response.locals.userEmail = request.session.currentUser;
        response.locals.userName = request.session.currentName;
        next();
    } else {
        console.log("No lo intentes ;)")
        response.redirect("/login");
    }
}

//MANEJADORES DE RUTA

router.get("/principal", identificacionRequerida, function (request, response) {
    response.render("principal", { userName: response.locals.userName });
});

router.get("/imagenUsuario", identificacionRequerida, controllerUser.getUserImageName);

router.get("/usuarios", identificacionRequerida, controllerUser.getAllUsers);

//POST REQUESTS
router.post("/procesar_login", controllerUser.isUserCorrect);

router.post("/procesar_busqueda", identificacionRequerida, controllerUser.getAllUsersByText);

router.post("/perfil", identificacionRequerida, controllerUser.getUser);

router.post("/procesar_registro", multerFactory.single("avatar"), controllerUser.insertUser);

module.exports = router;
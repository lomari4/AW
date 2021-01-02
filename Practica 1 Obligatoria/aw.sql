-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-01-2021 a las 13:00:39
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `id` int(10) NOT NULL,
  `idPregunta` int(10) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`id`, `idPregunta`, `nombre`) VALUES
(25, 18, 'java'),
(29, 18, 'html'),
(26, 23, 'uwu'),
(27, 24, 'node');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallas`
--

CREATE TABLE `medallas` (
  `idUsuario` varchar(20) NOT NULL,
  `logro` varchar(20) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `tipo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medallas`
--

INSERT INTO `medallas` (`idUsuario`, `logro`, `cantidad`, `tipo`) VALUES
('usuario4@ucm.es', 'Estudiante', 1, 'bronze');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(10) NOT NULL,
  `titulo` varchar(1000) NOT NULL,
  `texto` varchar(1000) NOT NULL,
  `idUsuario` varchar(20) NOT NULL,
  `votos` int(30) NOT NULL DEFAULT 0,
  `visitas` int(30) NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `titulo`, `texto`, `idUsuario`, `votos`, `visitas`, `fecha`) VALUES
(18, 'ff', 'ff', 'usuario1@ucm.es', 0, 1, '2020-12-28'),
(19, 'pls funsiona', 'fgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsf', 'usuario3@ucm.es', 0, 0, '2020-12-28'),
(23, 'wuw', 'd', 'usuario5@ucm.es', 0, 3, '2020-12-30'),
(24, 'kk', 'kk', 'usuario5@ucm.es', 0, 4, '2020-12-30'),
(25, 'hh', 'hh', 'usuario4@ucm.es', 2, 6, '2020-12-30'),
(29, 'h', 'h', 'usuario4@ucm.es', 1, 1, '2021-1-2');

--
-- Disparadores `preguntas`
--
DELIMITER $$
CREATE TRIGGER `darMedalla` BEFORE UPDATE ON `preguntas` FOR EACH ROW BEGIN
    	DECLARE nombreMedalla varchar(20);
        DECLARE tipoMedalla varchar(10);
        DECLARE aumentar int;
        DECLARE existe int;
  
    	IF (NEW.votos > OLD.votos) THEN
        	if NEW.votos = 1 THEN
            	SET nombreMedalla="Estudiante";
            	SET tipoMedalla="bronze";
        	elseif NEW.votos = 2 THEN
            	SET nombreMedalla="Pregunta interesante";
            	SET tipoMedalla="bronze";
       		elseif NEW.votos = 4 THEN
            	SET nombreMedalla="Buena pregunta";
            	SET tipoMedalla="plata";
         	elseif NEW.votos = 6 THEN
            	SET nombreMedalla="Excelente pregunta";
            	SET tipoMedalla="oro";
        	END IF;
        
        	SELECT COUNT(*) into aumentar FROM medallas WHERE logro=nombreMedalla AND NEW.id NOT IN (SELECT id FROM preguntas where id=NEW.id AND idUsuario=NEW.idUsuario);
            
            SELECT COUNT(*) into existe FROM medallas WHERE logro=nombreMedalla AND NEW.id IN (SELECT id FROM preguntas where id=NEW.id AND idUsuario=NEW.idUsuario);
            
        	if aumentar > 0 THEN
        		UPDATE medallas SET cantidad = cantidad + 1 WHERE logro=nombreMedalla AND tipo=tipoMedalla AND idUsuario=NEW.idUsuario;
        	elseif existe = 0 THEN
        		INSERT INTO medallas(idUsuario, logro, cantidad, tipo) VALUES (NEW.idUsuario,nombreMedalla,1,tipoMedalla);
        	END IF;
        
   		END IF;
 
     END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateNpreguntas` AFTER INSERT ON `preguntas` FOR EACH ROW UPDATE usuarios SET npreguntas=npreguntas+1 WHERE correo=NEW.idUsuario
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int(10) NOT NULL,
  `texto` varchar(1000) NOT NULL,
  `votos` int(10) NOT NULL DEFAULT 0,
  `fecha` varchar(10) NOT NULL,
  `idUsuario` varchar(20) NOT NULL,
  `idPregunta` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id`, `texto`, `votos`, `fecha`, `idUsuario`, `idPregunta`) VALUES
(13, 'hh', 0, '2020-12-30', 'usuario5@ucm.es', 23);

--
-- Disparadores `respuestas`
--
DELIMITER $$
CREATE TRIGGER `updateNrespuestas` AFTER INSERT ON `respuestas` FOR EACH ROW UPDATE usuarios SET nrespuestas=nrespuestas+1 WHERE correo=NEW.idUsuario
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('vHkcuEBBTh_ucQiDF5Qqn5ZUwAIrtjQJ', 1609626013, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario1@ucm.es\",\"currentName\":\"Usuario 1\"}'),
('x3nNVlVSgmxUkSwfN5997MwDj6Qk9x_m', 1609674956, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario4@ucm.es\",\"currentName\":\"Usuario 4\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `avatar` varchar(500) DEFAULT NULL,
  `fecha` date NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `npreguntas` int(10) NOT NULL,
  `nrespuestas` int(10) NOT NULL,
  `reputacion` int(10) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `pass`, `avatar`, `fecha`, `nombre`, `npreguntas`, `nrespuestas`, `reputacion`) VALUES
('usuario1@ucm.es', '12345678', 'avatar_2.png', '2020-12-27', 'Usuario 1', 1, 0, 29),
('usuario3@ucm.es', '12345678', 'avatar_0.png', '2020-12-27', 'Usuario 3', 0, 0, 34),
('usuario4@ucm.es', '12345678', 'user.png', '2020-12-28', 'Usuario 4', 3, 0, 117),
('usuario5@ucm.es', '12345678', 'user.png', '2020-12-30', 'Usuario 5', 2, 4, 79),
('usuario6@ucm.es', '12345678', 'avatar_1609536395550.png', '2021-01-01', 'Usuario 6', 0, 1, 1),
('usuario7@ucm.es', '12345678', 'avatar_0.png', '2021-01-01', 'Usuario 7', 0, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitapregunta`
--

CREATE TABLE `visitapregunta` (
  `idUsuario` varchar(20) NOT NULL,
  `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `visitapregunta`
--

INSERT INTO `visitapregunta` (`idUsuario`, `idPregunta`) VALUES
('usuario1@ucm.es', 23),
('usuario1@ucm.es', 24),
('usuario1@ucm.es', 25),
('usuario3@ucm.es', 24),
('usuario3@ucm.es', 25),
('usuario4@ucm.es', 25),
('usuario4@ucm.es', 29),
('usuario5@ucm.es', 23),
('usuario5@ucm.es', 25),
('usuario6@ucm.es', 24),
('usuario6@ucm.es', 25),
('usuario7@ucm.es', 18),
('usuario7@ucm.es', 23),
('usuario7@ucm.es', 24),
('usuario7@ucm.es', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votapregunta`
--

CREATE TABLE `votapregunta` (
  `idUsuario` varchar(20) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `puntos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `votapregunta`
--

INSERT INTO `votapregunta` (`idUsuario`, `idPregunta`, `puntos`) VALUES
('usuario1@ucm.es', 25, 1),
('usuario3@ucm.es', 25, -1),
('usuario4@ucm.es', 25, 1),
('usuario4@ucm.es', 29, 1),
('usuario5@ucm.es', 25, 1);

--
-- Disparadores `votapregunta`
--
DELIMITER $$
CREATE TRIGGER `updateReputationAsk` AFTER INSERT ON `votapregunta` FOR EACH ROW BEGIN
        DECLARE c varchar(20);
        DECLARE rep int;
        SELECT preguntas.idUsuario into c FROM preguntas WHERE preguntas.id=NEW.idPregunta;
        
        if NEW.puntos = 1 THEN
        	UPDATE usuarios SET reputacion=reputacion+10 WHERE correo=c;
        else
        	UPDATE usuarios SET reputacion=reputacion-2 WHERE correo=c;
        END IF;
        
        SELECT usuarios.reputacion into rep FROM usuarios WHERE usuarios.correo=c;
        
        if rep < 1 THEN
        	UPDATE usuarios SET reputacion=1 WHERE correo=c;
       	END IF;
                
 	END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votarespuesta`
--

CREATE TABLE `votarespuesta` (
  `idUsuario` varchar(20) NOT NULL,
  `idRespuesta` int(10) NOT NULL,
  `puntos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Disparadores `votarespuesta`
--
DELIMITER $$
CREATE TRIGGER `updateReputationReply` AFTER INSERT ON `votarespuesta` FOR EACH ROW BEGIN
        DECLARE c varchar(20);
        DECLARE rep int;
        SELECT respuestas.idUsuario into c FROM respuestas WHERE respuestas.id=NEW.idRespuesta;
        if NEW.puntos = 1 THEN
        	UPDATE usuarios SET reputacion=reputacion+10 WHERE correo=c;
        else
        	UPDATE usuarios SET reputacion=reputacion-2 WHERE correo=c;
        END IF;
        
        SELECT usuarios.reputacion into rep FROM usuarios WHERE usuarios.correo=c;

        if rep < 1 THEN
            UPDATE usuarios SET reputacion=1 WHERE correo=c;
        END IF;
                
 	END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD PRIMARY KEY (`id`,`nombre`),
  ADD KEY `idPreguntas` (`idPregunta`);

--
-- Indices de la tabla `medallas`
--
ALTER TABLE `medallas`
  ADD PRIMARY KEY (`idUsuario`,`logro`) USING BTREE,
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `visitapregunta`
--
ALTER TABLE `visitapregunta`
  ADD PRIMARY KEY (`idUsuario`,`idPregunta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `votapregunta`
--
ALTER TABLE `votapregunta`
  ADD PRIMARY KEY (`idUsuario`,`idPregunta`),
  ADD KEY `idPregunta` (`idPregunta`);

--
-- Indices de la tabla `votarespuesta`
--
ALTER TABLE `votarespuesta`
  ADD PRIMARY KEY (`idUsuario`,`idRespuesta`),
  ADD KEY `idRespuesta` (`idRespuesta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD CONSTRAINT `etiquetas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallas`
--
ALTER TABLE `medallas`
  ADD CONSTRAINT `medallas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitapregunta`
--
ALTER TABLE `visitapregunta`
  ADD CONSTRAINT `visitapregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visitapregunta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votapregunta`
--
ALTER TABLE `votapregunta`
  ADD CONSTRAINT `votapregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votapregunta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votarespuesta`
--
ALTER TABLE `votarespuesta`
  ADD CONSTRAINT `votarespuesta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votarespuesta_ibfk_2` FOREIGN KEY (`idRespuesta`) REFERENCES `respuestas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-12-2020 a las 13:28:32
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

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
(9, 8, 'aw'),
(23, 17, 'aw'),
(24, 17, 'node'),
(25, 18, 'java');

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
(8, 'pls funsiona', 'pls', 'usuario3@ucm.es', 0, 24, '2020-12-27'),
(17, 'pls funsiona', 'yy', 'usuario1@ucm.es', 0, 0, '2020-12-28'),
(18, 'ff', 'ff', 'usuario1@ucm.es', 0, 0, '2020-12-28'),
(19, 'pls funsiona', 'fgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsfgsf', 'usuario3@ucm.es', 0, 0, '2020-12-28');

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
(6, 'buen pregunta bro', 0, '2020-12-01', 'usuario1@ucm.es', 8),
(9, 'rr', 0, '2020-12-29', 'usuario1@ucm.es', 8);

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
('CkczId0ZqyW180yqzfyrVkpUZh0Bk5tj', 1609246180, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario4@ucm.es\",\"currentName\":\"Usuario 4\"}'),
('PUuy1xQAWosd1xURMHEDneyaUMvpFLxW', 1609327117, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario1@ucm.es\",\"currentName\":\"Usuario 1\"}'),
('TKcs8QCnvIFziq1JxOD6L527lwbuwpkt', 1609290193, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"usuario1@ucm.es\",\"currentName\":\"Usuario 1\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `avatar` varchar(20) DEFAULT NULL,
  `fecha` date NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `npreguntas` int(10) NOT NULL,
  `nrespuestas` int(10) NOT NULL,
  `reputacion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `pass`, `avatar`, `fecha`, `nombre`, `npreguntas`, `nrespuestas`, `reputacion`) VALUES
('usuario1@ucm.es', '12345678', 'avatar_2.png', '2020-12-27', 'Usuario 1', 0, 0, 18),
('usuario3@ucm.es', '12345678', 'avatar_0.png', '2020-12-27', 'Usuario 3', 0, 0, 0),
('usuario4@ucm.es', '12345678', 'user.png', '2020-12-28', 'Usuario 4', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitapregunta`
--

CREATE TABLE `visitapregunta` (
  `idUsuario` varchar(20) NOT NULL,
  `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
('usuario1@ucm.es', 18, 1),
('usuario3@ucm.es', 18, -1),
('usuario4@ucm.es', 18, 1);

--
-- Disparadores `votapregunta`
--
DELIMITER $$
CREATE TRIGGER `updateReputation` AFTER INSERT ON `votapregunta` FOR EACH ROW BEGIN
        DECLARE c varchar(20);
        SELECT preguntas.idUsuario into c FROM preguntas WHERE preguntas.id=NEW.idPregunta;
        if NEW.puntos = 1 THEN
        	UPDATE usuarios SET reputacion=reputacion+10 WHERE correo=c;
        else
        	UPDATE usuarios SET reputacion=reputacion-2 WHERE correo=c;
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
  ADD PRIMARY KEY (`idUsuario`,`logro`,`tipo`),
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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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

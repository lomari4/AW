-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2020 a las 17:51:39
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
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`id`, `idPregunta`, `nombre`) VALUES
(1, 1, 'node'),
(2, 1, 'aw'),
(8, 2, 'aw');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallas`
--

CREATE TABLE `medallas` (
  `idUsuario` int(10) NOT NULL,
  `logro` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad` int(10) NOT NULL,
  `tipo` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `medallas`
--

INSERT INTO `medallas` (`idUsuario`, `logro`, `cantidad`, `tipo`) VALUES
(1, 'Registrado', 4, 'bronce'),
(1, 'Registrado', 3, 'oro'),
(1, 'Registrado', 3, 'plata'),
(2, 'Registrado', 4, 'oro'),
(2, 'Registrado', 3, 'plata');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(10) NOT NULL,
  `titulo` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `texto` varchar(1000) COLLATE utf8mb4_spanish_ci NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `votos` int(30) NOT NULL DEFAULT 0,
  `visitas` int(30) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `titulo`, `texto`, `idUsuario`, `votos`, `visitas`, `fecha`) VALUES
(1, 'Prueba', 'PruebaTexto', 1, 0, 3, '0000-00-00'),
(2, 'Prueba2', 'Prueba2Texto', 2, 0, 1, '0000-00-00'),
(3, 'Pregunta AW', 'cuando se entrega la practica', 2, 0, 3, '2020-12-12'),
(4, 'Pregunta SGE', 'señor croquetin cuantos años tiene', 1, 0, 1, '2020-12-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `id` int(10) NOT NULL,
  `texto` varchar(1000) COLLATE utf8mb4_spanish_ci NOT NULL,
  `votos` int(10) NOT NULL DEFAULT 0,
  `fecha` date NOT NULL,
  `idUsuario` int(10) NOT NULL,
  `idPregunta` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`id`, `texto`, `votos`, `fecha`, `idUsuario`, `idPregunta`) VALUES
(1, 'Respuesta prueba', 0, '2020-12-10', 1, 1),
(2, 'Respuesta prueba', 0, '2020-12-10', 2, 1),
(3, 'Respuesta prueba', 0, '2020-12-10', 2, 1),
(5, 'Respuesta prueba2', 0, '2020-12-11', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `pass` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `avatar` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fecha` date NOT NULL,
  `nombre` varchar(15) COLLATE utf8mb4_spanish_ci NOT NULL,
  `npreguntas` int(10) NOT NULL,
  `nrespuestas` int(10) NOT NULL,
  `reputacion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `pass`, `correo`, `avatar`, `fecha`, `nombre`, `npreguntas`, `nrespuestas`, `reputacion`) VALUES
(1, '1234', 'usuario1@ucm.es', '../recursos/user.png', '2020-12-02', 'Usuario1', 0, 0, 0),
(2, '4321', 'usuario2@ucm.es', '../recursos/user.png', '2020-12-02', 'Usuario2', 0, 0, 0),
(8, '4321', 'usuario3@ucm.es', '../recursos/user.png', '2020-12-02', 'Usuario3', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitapregunta`
--

CREATE TABLE `visitapregunta` (
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votapregunta`
--

CREATE TABLE `votapregunta` (
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `puntos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votarespuesta`
--

CREATE TABLE `votarespuesta` (
  `idUsuario` int(10) NOT NULL,
  `idRespuesta` int(10) NOT NULL,
  `puntos` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  ADD CONSTRAINT `medallas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitapregunta`
--
ALTER TABLE `visitapregunta`
  ADD CONSTRAINT `visitapregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visitapregunta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votapregunta`
--
ALTER TABLE `votapregunta`
  ADD CONSTRAINT `votapregunta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votapregunta_ibfk_2` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votarespuesta`
--
ALTER TABLE `votarespuesta`
  ADD CONSTRAINT `votarespuesta_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votarespuesta_ibfk_2` FOREIGN KEY (`idRespuesta`) REFERENCES `respuestas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

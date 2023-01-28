-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-01-2023 a las 14:41:02
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `idProyecto` int(7) NOT NULL,
  `idTarea` int(7) NOT NULL,
  `idBitacora` int(7) NOT NULL,
  `fechaBtacora` date NOT NULL COMMENT 'fecha de registro de la bitacora',
  `descripcionBitacora` varchar(300) NOT NULL,
  `idFoto` int(7) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='versión demo para la bitácora solo permite una foto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diseño`
--

CREATE TABLE `diseño` (
  `idDiseño` int(7) NOT NULL,
  `nombreDiseño` varchar(20) NOT NULL,
  `direcionCarpeta` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `diseñoAprovado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='tabla diseño demo contiene las direciones de los diceños';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

CREATE TABLE `foto` (
  `idFoto` int(7) NOT NULL,
  `direcionCarpeta` varchar(50) NOT NULL,
  `nombreFoto` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE `presupuesto` (
  `idPresupuesto` int(7) NOT NULL,
  `cotizacion` int(15) NOT NULL,
  `personal` text NOT NULL,
  `material` text NOT NULL,
  `fechaPresupuesto` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `idProyecto` int(11) NOT NULL,
  `nombreProyecto` varchar(50) NOT NULL COMMENT 'nombre del proyecto',
  `descripcionProyecto` text NOT NULL,
  `AreaTerreno` float NOT NULL COMMENT 'Área del terreno en metros cuadrados m2',
  `idPresupuesto` int(7) DEFAULT NULL,
  `idDiseño` int(7) DEFAULT NULL,
  `idUsuario` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idProyecto` int(7) NOT NULL,
  `idTarea` int(7) NOT NULL,
  `nombreTarea` varchar(50) NOT NULL,
  `descripcionTarea` text NOT NULL,
  `etapa` varchar(20) NOT NULL,
  `fechainicio` date NOT NULL,
  `completado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='versión demo tabla tarea';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `codigoUsuario` varchar(4) NOT NULL COMMENT 'código usuario de los radios',
  `nombreUsuario` varchar(20) NOT NULL COMMENT 'nombres del usuario',
  `apellidosUsuario` varchar(30) NOT NULL COMMENT 'apellidos del usuario',
  `cargoUsuario` varchar(30) NOT NULL COMMENT 'cargo empleado versión demo',
  `contraceña` varchar(20) NOT NULL COMMENT 'contraseña sin encriptar versión demo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='version demo de la tabla usuario';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`idBitacora`,`idProyecto`,`idTarea`,`idFoto`),
  ADD UNIQUE KEY `idFoto` (`idFoto`),
  ADD KEY `idTarea` (`idTarea`),
  ADD KEY `idProyecto` (`idProyecto`);

--
-- Indices de la tabla `diseño`
--
ALTER TABLE `diseño`
  ADD PRIMARY KEY (`idDiseño`),
  ADD UNIQUE KEY `nombreDiseño` (`nombreDiseño`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`idFoto`);

--
-- Indices de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD PRIMARY KEY (`idPresupuesto`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`idProyecto`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`),
  ADD UNIQUE KEY `idPresupuesto` (`idPresupuesto`),
  ADD UNIQUE KEY `idDiseño` (`idDiseño`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`,`idProyecto`),
  ADD KEY `idProyecto` (`idProyecto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`codigoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `idBitacora` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `diseño`
--
ALTER TABLE `diseño`
  MODIFY `idDiseño` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `idFoto` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  MODIFY `idPresupuesto` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `idProyecto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(7) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`),
  ADD CONSTRAINT `bitacora_ibfk_2` FOREIGN KEY (`idProyecto`) REFERENCES `tarea` (`idProyecto`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bitacora_ibfk_3` FOREIGN KEY (`idFoto`) REFERENCES `foto` (`idFoto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`idPresupuesto`) REFERENCES `presupuesto` (`idPresupuesto`) ON UPDATE CASCADE,
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`idDiseño`) REFERENCES `diseño` (`idDiseño`) ON UPDATE CASCADE,
  ADD CONSTRAINT `proyecto_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`codigoUsuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

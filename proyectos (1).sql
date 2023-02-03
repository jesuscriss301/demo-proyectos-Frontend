-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-02-2023 a las 22:31:15
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

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
  `id_bitacora` int(7) NOT NULL,
  `id_tarea` int(7) NOT NULL,
  `id_proyecto` int(7) DEFAULT NULL,
  `descripcion_bitacora` text NOT NULL,
  `id_foto` int(7) NOT NULL,
  `fecha` date NOT NULL,
  `id-proyecto` int(11) DEFAULT NULL,
  `id-tarea` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bitacora`
--

INSERT INTO `bitacora` (`id_bitacora`, `id_tarea`, `id_proyecto`, `descripcion_bitacora`, `id_foto`, `fecha`, `id-proyecto`, `id-tarea`) VALUES
(9, 5, NULL, 'descripcion bitacora', 1, '2023-02-02', NULL, NULL),
(11, 5, NULL, 'bitacora actualizada', 1, '2023-02-02', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diseño`
--

CREATE TABLE `diseño` (
  `id_diseño` int(7) NOT NULL,
  `nombre_diseño` varchar(50) NOT NULL,
  `direccion_carpeta` varchar(500) NOT NULL,
  `fecha_diseño` date NOT NULL,
  `aprovado` tinyint(1) NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diseño`
--

INSERT INTO `diseño` (`id_diseño`, `nombre_diseño`, `direccion_carpeta`, `fecha_diseño`, `aprovado`, `id`) VALUES
(1, 'manual-de-archivos-de-oficina', 'C:\\Users\\SISTEMAS\\Desktop\\demo\\demo-proyectos-Frontend\\imagen', '2023-02-04', 0, 0),
(5, 'manual-de-archivos-de-oficina.pdf', 'C:\\Users\\SISTEMAS\\Desktop\\demo\\demo-proyectos-Frontend\\imagen', '2023-02-04', 0, 3),
(6, 'nombre de prueba ', 'carpeta ', '2023-02-01', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diseño_id_seq`
--

CREATE TABLE `diseño_id_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diseño_id_seq`
--

INSERT INTO `diseño_id_seq` (`next_val`) VALUES
(4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etapa`
--

CREATE TABLE `etapa` (
  `id_etapa` int(7) NOT NULL,
  `nombre_Etapa` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `etapa`
--

INSERT INTO `etapa` (`id_etapa`, `nombre_Etapa`) VALUES
(1, 'Prueba'),
(2, 'Culminado'),
(3, 'Desarrollo'),
(4, 'archivado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idfotografia`
--

CREATE TABLE `idfotografia` (
  `id_foto` int(7) NOT NULL,
  `nombre_foto` varchar(50) NOT NULL,
  `direccion_carpeta` varchar(500) NOT NULL,
  `fecha` date NOT NULL,
  `id` int(11) NOT NULL,
  `id_etapa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `idfotografia`
--

INSERT INTO `idfotografia` (`id_foto`, `nombre_foto`, `direccion_carpeta`, `fecha`, `id`, `id_etapa`) VALUES
(1, 'foto', 'direcion de prueba', '2023-02-01', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE `presupuesto` (
  `id_presupuesto` int(7) NOT NULL,
  `cotizacion` int(20) NOT NULL,
  `personal` text NOT NULL,
  `material` text NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `presupuesto`
--

INSERT INTO `presupuesto` (`id_presupuesto`, `cotizacion`, `personal`, `material`, `fecha`) VALUES
(2, 9000000, '- Jesus Cristancho\r\n-Sebastian Mejias', 'computadores, escritorios', '2023-02-01'),
(3, 9000000, '- Jesus Cristancho\r\n-Sebastian Mejias', 'computadores, escritorios', '2023-02-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id` int(7) NOT NULL,
  `nombre_Proyecto` varchar(30) NOT NULL,
  `descripcion_Proyecto` text NOT NULL,
  `responsable` varchar(30) NOT NULL,
  `area_Terreno` int(10) NOT NULL,
  `diseño` int(7) DEFAULT NULL,
  `presupuesto` int(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id`, `nombre_Proyecto`, `descripcion_Proyecto`, `responsable`, `area_Terreno`, `diseño`, `presupuesto`) VALUES
(3, 'proyecto brueba2', 'edicion de proyecto2', 'Jeison 2', 80, NULL, NULL),
(5, 'proyecto brueba2', 'edicion de proyecto2', 'Jeison 2', 75, NULL, NULL),
(6, 'proyecto brueba2', 'edicion de proyecto2', 'Jeison 2', 80, NULL, NULL),
(7, 'nuevo proyecto', 'proyecto de  prueba ', 'Jeison', 50, 1, 2),
(8, 'nuevo proyecto', 'proyecto de  prueba ', 'Jeison', 50, 1, 2),
(9, 'proyecto brueba2', 'edicion de proyecto2', 'Jeison 2', 80, NULL, NULL),
(10, 'proyecto brueba2', 'edicion de proyecto2', 'Jeison 2', 80, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_Tarea` int(7) NOT NULL,
  `id_Proyecto` int(7) NOT NULL,
  `nombre_Tarea` varchar(30) NOT NULL,
  `descripcion_Tarea` text NOT NULL,
  `id_etapa` int(7) NOT NULL,
  `completado` tinyint(1) NOT NULL,
  `fecha` date NOT NULL,
  `id-proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id_Tarea`, `id_Proyecto`, `nombre_Tarea`, `descripcion_Tarea`, `id_etapa`, `completado`, `fecha`, `id-proyecto`) VALUES
(5, 5, 'nueva tarea', 'descripcion de una tarea de prueba ', 1, 0, '2023-02-01', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_bitacora`),
  ADD KEY `idTarea` (`id_tarea`),
  ADD KEY `idProyecto` (`id_proyecto`),
  ADD KEY `idFoto` (`id_foto`),
  ADD KEY `FKcmmofog3idc79mchfblmnsdrd` (`id-proyecto`),
  ADD KEY `FKgbtgwskpl6jtmyixgfprtohyl` (`id-tarea`);

--
-- Indices de la tabla `diseño`
--
ALTER TABLE `diseño`
  ADD PRIMARY KEY (`id_diseño`),
  ADD UNIQUE KEY `nombreDicseño` (`nombre_diseño`);

--
-- Indices de la tabla `etapa`
--
ALTER TABLE `etapa`
  ADD PRIMARY KEY (`id_etapa`),
  ADD UNIQUE KEY `id` (`id_etapa`),
  ADD UNIQUE KEY `id_2` (`id_etapa`),
  ADD UNIQUE KEY `id_3` (`id_etapa`),
  ADD UNIQUE KEY `id_4` (`id_etapa`);

--
-- Indices de la tabla `idfotografia`
--
ALTER TABLE `idfotografia`
  ADD PRIMARY KEY (`id_foto`),
  ADD UNIQUE KEY `nombreFoto` (`nombre_foto`);

--
-- Indices de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD PRIMARY KEY (`id_presupuesto`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idProyecto` (`id`),
  ADD KEY `diseño` (`diseño`),
  ADD KEY `presupuesto` (`presupuesto`),
  ADD KEY `idProyecto_2` (`id`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id_Tarea`),
  ADD KEY `idProyecto` (`id_Proyecto`),
  ADD KEY `idEtapa` (`id_etapa`),
  ADD KEY `FKigg2h8ndfrd99d72llwhrqw5p` (`id-proyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id_bitacora` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `diseño`
--
ALTER TABLE `diseño`
  MODIFY `id_diseño` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `etapa`
--
ALTER TABLE `etapa`
  MODIFY `id_etapa` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `idfotografia`
--
ALTER TABLE `idfotografia`
  MODIFY `id_foto` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  MODIFY `id_presupuesto` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_Tarea` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `FKcmmofog3idc79mchfblmnsdrd` FOREIGN KEY (`id-proyecto`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `FKgbtgwskpl6jtmyixgfprtohyl` FOREIGN KEY (`id-tarea`) REFERENCES `tarea` (`id_Tarea`),
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bitacora_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id_Tarea`) ON UPDATE CASCADE,
  ADD CONSTRAINT `bitacora_ibfk_3` FOREIGN KEY (`id_foto`) REFERENCES `idfotografia` (`id_foto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`diseño`) REFERENCES `diseño` (`id_diseño`) ON UPDATE CASCADE,
  ADD CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`presupuesto`) REFERENCES `presupuesto` (`id_presupuesto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `FKigg2h8ndfrd99d72llwhrqw5p` FOREIGN KEY (`id-proyecto`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`id_Proyecto`) REFERENCES `proyecto` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`id_Etapa`) REFERENCES `etapa` (`id_etapa`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tarea_ibfk_3` FOREIGN KEY (`id_etapa`) REFERENCES `etapa` (`id_etapa`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

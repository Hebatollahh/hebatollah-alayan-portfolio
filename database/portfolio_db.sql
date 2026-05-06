-- phpMyAdmin SQL Dump
-- Hebatollah Alayan - Portfolio Database

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+03:00";

--
-- Database: `portfolio_db`
--
CREATE DATABASE IF NOT EXISTS `portfolio_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `portfolio_db`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
-- Default password: admin123
-- HASH: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
--
INSERT INTO `admin_users` (`id`, `username`, `password`, `remember_token`, `created_at`) VALUES
(1, 'hebatollah', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, '2026-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(500) NOT NULL DEFAULT 'images/default-project.jpg',
  `link` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping sample data for table `projects`
--
INSERT INTO `projects` (`id`, `title`, `description`, `image_url`, `link`, `created_at`) VALUES
(1, 'Task Management System', 'A comprehensive full-stack task management application built with React and Node.js, featuring drag-and-drop functionality, real-time updates via WebSockets, and user authentication.', 'https://www.bitrix24.com/images/content_en/tools/tasks_and_projects/index/tasks_and_projects-main.png', 'https://github.com/hebatollah/task-manager', '2026-01-15 07:00:00'),
(2, 'E-Commerce Platform', 'A fully responsive e-commerce website with shopping cart functionality, secure payment gateway integration, and a comprehensive admin dashboard for inventory and order management.', 'https://www.wpdownloadmanager.com/wp-content/uploads/2021/08/Features-To-Consider-Before-Choosing-an-E-commerce-Platform.jpg', 'https://github.com/hebatollah/ecommerce', '2026-01-10 05:30:00'),
(3, 'Weather Forecast App', 'A weather forecasting application utilizing the OpenWeather API with interactive maps, location-based services, and 7-day forecast visualization.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxKA7HvO10GTQBbTTroY57QxgaI-W6kfyUw&s', 'https://github.com/hebatollah/weather-app', '2026-01-05 09:00:00'),
(4, 'E-Learning Platform', 'A comprehensive online learning platform built with PHP and MySQL, featuring course management, student enrollment, progress tracking, and interactive quizzes with real-time feedback.', 'https://cdn.prod.website-files.com/65cb6a13e28e17a9782545c2/6628a14fd0bbecd12de2b04b_gfsb.jpg', 'https://www.github.com/Hebatollah/E-Learning -Platform', '2026-05-06 18:42:58'),
(5, 'Portfolio Builder Tool', 'A drag-and-drop portfolio builder that allows users to create professional portfolio websites without coding. Built with JavaScript, PHP backend, and features customizable templates.', 'https://colorlib.com/wp-content/uploads/sites/2/carbonmade-portfolio-builder.jpg', 'https://github.com/hebatollah/portfolio-builder', '2026-05-06 18:48:09'),
(6, 'Hospital Management System', 'A full-stack hospital management application with patient registration, appointment scheduling, doctor assignments, and medical records management using PHP, MySQL, and Bootstrap.', 'https://www.karexpert.com/wp-content/uploads/2024/06/HIMS7.webp', 'https://github.com/hebatollah/hospital-management', '2026-05-06 18:48:48'),
(7, 'Real-Time Chat Application', 'A real-time messaging application with private and group chats, file sharing, and online status indicators. Implemented using Node.js, Socket.io, and MySQL for data persistence.', 'https://i.ytimg.com/vi/gbocZlm71nE/maxresdefault.jpg', 'https://github.com/hebatollah/realtime-chat', '2026-05-06 18:49:19');

--
--
--
--
--
--
--
--
--
--
--

COMMIT;
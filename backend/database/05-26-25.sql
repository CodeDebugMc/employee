-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 10:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `earist_hris`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` enum('superadmin','administrator','staff') NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `employeeNumber` int(11) NOT NULL,
  `employmentCategory` tinyint(4) NOT NULL,
  `access_level` varchar(1111) DEFAULT 'user',
  `status_id` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `role`, `password`, `employeeNumber`, `employmentCategory`, `access_level`, `status_id`, `created_at`) VALUES
(28, 'ardenmecasio', 'ardenmecasio2@gmail.com', 'superadmin', '$2a$10$rALo9o/murxu.frsjUlehOdAh7kNKECVXJ7ntZ7lwPDwRmpuulm.C', 20134508, 1, 'superadmin', 0, '2025-01-18 03:14:31'),
(30, 'ArdenMecasio123', 'Ardenmecasio21@gmail.com', 'administrator', '$2a$10$OUUKNgphVegaRtCtxsJKwun0rExqCHbz7JNsQuySZD/wTbDDQRyGG', 20134509, 0, 'user', 0, '2025-01-23 12:48:18'),
(32, 'dhani', 'disanjose@gmail.com', 'administrator', '$2a$10$2J/5rLQ1t7lgoNKpxPv.ZOZr8JpnSM.g9PquAm5DE9VFWnMTgvR7u', 20134507, 0, 'user', 0, '2025-03-04 00:43:08'),
(35, NULL, 'asasa@earist.edu.ph', 'administrator', '$2a$10$4Dgq5FKtyUp9zb3pl.6mdeP5fqgSEMienYF9Vjkxasb5K2tAaMCv6', 1232234, 0, 'user', 0, '2025-03-10 05:23:36'),
(37, NULL, 'd@g.com', 'administrator', '$2a$10$gPD2By2g6sk26Zdlur3P..IdAE8wXCTzm0Jl3cj0iLT5Xd/2J1l6m', 4444444, 0, 'user', 0, '2025-03-10 05:36:19'),
(38, 'staff', 'staff@gmail.com', 'staff', '$2a$10$JGde7m55SZMRXEh3hFfJtuvLUgq3g6B7SO8YWGdXCOEqSg6UmPmrC', 1, 0, 'user', 0, '2025-03-29 03:32:31'),
(39, 'admin1', 'admin1@gmail.com', 'administrator', '$2a$10$F4Io11AZQODQ9OCcKkcO8ulzJhKoKjEvFLGKEn0sSX5irClhwxl52', 123456, 0, 'user', 0, '2025-03-30 15:15:18'),
(40, 'hanapot', 'hannasarabia879@gmail.com', 'staff', '$2a$10$u3Gnk5B4/3kfiSCslX6t/eXt8RCmrmApEh6XPmYtsNQxEGRJDJzVm', 16566, 0, 'user', 0, '2025-04-05 08:28:08'),
(42, 'user', 'user@gmail.com', 'administrator', '$2a$10$sayqJJSkFPVAJYA.DbxQceq0Yvqbh0PIxB.gksPF5qW6EuhiIxIwG', 0, 0, 'user', 0, '2025-04-18 03:14:47');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `before_insert_users` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
  IF NEW.role = 'superadmin' THEN
    SET NEW.access_level = 'superadmin';
  ELSE
    SET NEW.access_level = 'user';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_users` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
  IF NEW.role = 'superadmin' THEN
    SET NEW.access_level = 'superadmin';
  ELSE
    SET NEW.access_level = 'user';
  END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employeeNumber_2` (`employeeNumber`),
  ADD KEY `id` (`id`),
  ADD KEY `employeeNumber` (`employeeNumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

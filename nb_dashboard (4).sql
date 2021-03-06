-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 04, 2020 at 04:10 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nb_dashboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `condo_code` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`, `condo_code`) VALUES
(1, 'Demo Condo', 'condo123', 'democondo@mail.com', 'abcd1234'),
(2, 'L Tower', 'condo567', 'ltower@mail.com', 'tscc2449rf'),
(3, 'Five Condo', 'condo891', 'fivecondo@mail.com', 'tscc2516mf');

-- --------------------------------------------------------

--
-- Table structure for table `condos`
--

DROP TABLE IF EXISTS `condos`;
CREATE TABLE IF NOT EXISTS `condos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'card',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `condos`
--

INSERT INTO `condos` (`id`, `code`, `name`, `status`) VALUES
(1, 'abcd1234', 'Demo Condo', 1),
(5, 'tscc2449rf', 'L Tower', 1),
(6, 'tscc2516mf', 'Five Condo', 1);

-- --------------------------------------------------------

--
-- Table structure for table `new_noticetable`
--

DROP TABLE IF EXISTS `new_noticetable`;
CREATE TABLE IF NOT EXISTS `new_noticetable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '1',
  `text` text,
  `icon` int(3) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `condo` varchar(40) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `new_noticetable`
--

INSERT INTO `new_noticetable` (`id`, `type`, `text`, `icon`, `start`, `end`, `condo`, `status`, `created`, `modified`) VALUES
(1, 1, 'Fire Alarm testing', 10, '2020-01-22 15:00:00', '2020-01-22 23:15:00', 'abcd1234', 1, '2019-09-17 15:56:08', '2019-12-24 15:24:06'),
(2, 1, 'Roof cleaning', 1, '2020-01-22 12:30:00', '2020-01-22 13:30:00', 'tscc2449rf', 1, '2019-09-17 15:58:22', NULL),
(3, 1, 'Please be advised, we will be sealcoating the asphalt throughout the community', 1, '2020-01-22 18:00:00', '2020-01-22 18:30:00', 'tscc2516mf', 1, '2019-09-17 16:05:07', NULL),
(4, 1, 'Repair work with electricity. Temporary shutdown.', 11, '2020-01-22 09:30:00', '2020-01-22 12:30:00', 'abcd1234', 1, '2019-09-18 10:55:00', '2019-12-24 15:12:24'),
(5, 1, 'The bag left in the lobby can be picked up at the office.', 4, '2020-01-22 10:30:00', '2020-01-29 10:30:00', 'abcd1234', 0, '2019-09-18 10:55:00', '2019-10-08 16:15:32'),
(6, 1, 'Corridor and lobby carpets will be cleaned', 12, '2020-01-22 09:00:00', '2020-01-22 17:00:00', 'abcd1234', 1, '2019-10-06 18:20:50', '2019-10-08 16:16:22'),
(7, 1, 'Our Office will be temporarily closed', 4, '2019-10-08 17:00:00', '2019-10-08 18:00:00', 'abcd1234', 1, '2019-10-06 20:11:37', '2019-10-08 14:56:55'),
(8, 1, 'Holiday', 6, '2019-11-30 00:00:00', '2019-11-30 23:45:00', 'abcd1234', 1, '2019-11-21 20:51:03', '2019-11-25 22:20:30'),
(9, 1, 'Elevator repairing', 3, '2020-01-22 09:00:00', '2020-01-22 19:00:00', 'abcd1234', 1, '2019-11-21 20:58:31', NULL),
(10, 1, 'Parking lot', 5, '2019-11-26 12:30:00', '2019-11-26 20:30:00', 'abcd1234', 1, '2019-11-21 21:08:01', '2019-11-25 22:09:54'),
(11, 1, 'Power test', 11, '2019-11-28 18:00:00', '2019-11-28 21:30:00', 'abcd1234', 1, '2019-11-21 21:26:25', NULL),
(12, 1, 'Door painting', 1, '2019-11-22 09:00:00', '2019-11-21 17:00:00', 'abcd1234', 1, '2019-11-21 21:35:03', NULL),
(13, 1, 'Just notice', 4, '2019-11-26 17:30:00', '2019-11-27 21:42:00', 'abcd1234', 1, '2019-11-21 21:42:32', '2019-11-25 22:16:13'),
(14, 1, 'Fire Alarm testing', 10, '2020-01-24 12:00:00', '2020-01-30 23:59:00', 'abcd1234', 1, '2020-01-17 15:48:45', NULL),
(15, 1, 'Fire Alarm testing', 10, '2020-02-24 12:00:00', '2020-03-01 23:59:00', 'abcd1234', 1, '2020-01-17 16:20:22', NULL),
(16, 1, 'Repair work with electricity. Temporary shutdown.', 11, '2020-01-07 12:00:00', '2020-01-07 17:00:00', 'abcd1234', 1, '2020-01-17 16:33:16', '2020-01-20 15:49:12'),
(53, 1, 'Fire Alarm testing.', 10, '2020-04-01 12:00:00', '2020-04-01 12:30:00', 'abcd1234', 1, '2020-01-21 20:52:51', NULL),
(54, 1, 'Repair work with electricity. Temporary shutdown.', 11, '2020-04-02 12:00:00', '2020-04-02 12:30:00', 'abcd1234', 1, '2020-01-21 20:52:51', NULL),
(55, 1, 'Elevator repairing.', 3, '2020-04-03 12:00:00', '2020-04-03 12:30:00', 'abcd1234', 1, '2020-01-21 20:52:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `noticetable`
--

DROP TABLE IF EXISTS `noticetable`;
CREATE TABLE IF NOT EXISTS `noticetable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '1',
  `text` text NOT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `start` int(40) DEFAULT NULL,
  `end` int(40) DEFAULT NULL,
  `condo` varchar(40) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `noticetable`
--

INSERT INTO `noticetable` (`id`, `type`, `text`, `icon`, `start`, `end`, `condo`, `status`, `created`, `modified`) VALUES
(56, 1, '<p>Fire alarm testing will be held in the common areas of the building today!</p>\r\n', 'animated_alarm', NULL, NULL, 'abcd1234', 1, '2016-08-24 13:47:53', NULL),
(88, 1, '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>&nbsp;Welcome!</strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Sincerely,</strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Management</strong></p>\r\n', 'static/Building 4.png', NULL, NULL, 'tscc1989cm', 1, '2016-10-06 00:28:35', NULL),
(89, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'TSCC1817LP', 1, '2016-10-06 00:33:15', NULL),
(91, 1, '<p>WELCOME TO SKYVIEW!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Balloons.png', 1552460400, 1555311600, 'tscc2017ms', 1, '2016-10-06 23:33:04', NULL),
(92, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'PCC946SD', 1, '2016-10-06 23:42:38', NULL),
(93, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'YCC433DM', 1, '2016-10-07 13:25:35', NULL),
(94, 1, '<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em><strong>&nbsp; &nbsp; WELCOME</strong></em></p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <em><strong>TO&nbsp; SKYVIEW&nbsp; ON YONGE</strong></em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>SINCERELY, MANAGEMENT&nbsp;</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Building 4.png', 1552374000, 1555398000, 'tscc2184sb', 1, '2016-10-07 13:31:19', NULL),
(97, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'PCC253SA', 1, '2016-10-07 18:14:37', NULL),
(98, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'PCC256AA', 1, '2016-10-07 18:36:49', NULL),
(101, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'TSCC2272LK', 1, '2016-10-07 19:40:45', NULL),
(102, 1, '<p>Welcome!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', NULL, NULL, 'TSCC1948', 1, '2016-10-07 19:43:11', NULL),
(103, 1, '<p style=\"text-align: justify;\"><strong>False alarms have occurred before, due to residents opening their front doors to vent smoke from cooking. When smoke enters the hallway and triggers the fire alarm; it costs the building $1,050 for every false alarm! Please use your range or window to vent smoke properly!</strong></p>\r\n', 'static/Emergency.png', NULL, NULL, 'tscc1506mm', 1, '2016-10-13 22:52:30', NULL),
(105, 1, '<p style=\"text-align: justify;\"><strong>Pet Violations Won&rsquo;t Be Tolerated</strong></p>\r\n\r\n<p style=\"text-align: justify;\"><strong>Dogs inside the condo MUST BE ON LEASHES. Also, dog owners MUST CLEAN UP after their pets IMMEDIATELY should their pet create a mess at Princess Place. Residents in violation of pet rules are identifiable on camera and may be subject to penalties.</strong></p>\r\n', 'animated_ban', NULL, NULL, 'tscc1506mm', 1, '2016-10-13 23:05:03', NULL),
(106, 1, '<p>False alarms have occurred before, due to residents opening their front doors to vent smoke from cooking. When smoke enters the hallway and triggers the fire alarm; it costs the building $1,050 for every false alarm! Please use your range or window to vent smoke properly!</p>\r\n', 'static/Emergency.png', NULL, NULL, 'tscc1515mm', 1, '2016-10-13 23:08:06', NULL),
(107, 1, '<p>Pet Violations Won&rsquo;t Be Tolerated</p>\r\n\r\n<p>Dogs inside the condo MUST BE ON LEASHES. Also, dog owners MUST CLEAN UP after their pets IMMEDIATELY should their pet create a mess at Princess Place. Residents in violation of pet rules are identifiable on camera and may be subject to penalties.</p>\r\n', 'animated_ban', NULL, NULL, 'tscc1515mm', 1, '2016-10-13 23:11:00', NULL),
(135, 1, '<p style=\"text-align: center;\"><strong>WASTE DISPOSAL RULES!!!</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>-TIE ALL BAGS BEFORE DISPOSING OF IT</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>-DO NOT LEAVE GARBAGE OR RECYCLING IN THIS AREA</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>-DO NOT FORCE LARGE CARDBOARD AND OTHER ITEMS DOWN THE CHUTE</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>-PLEASE TAKE ALL LARGE ITEMS DOWN TO THE LOADING DOCK AREA</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>-VIOLATORS WILL BE FINED!!</strong></p>\r\n', 'static/Garbage Bag.png', NULL, NULL, 'tscc2090sp', 1, '2017-02-16 14:10:48', NULL),
(137, 1, '<p style=\"text-align:center\">WASTE DISPOSAL RULES!!!</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">-TIE ALL BAGS BEFORE DISPOSING OF IT</p>\r\n\r\n<p style=\"text-align:center\">-DO NOT LEAVE GARBAGE OR RECYCLING IN THIS AREA</p>\r\n\r\n<p style=\"text-align:center\">-DO NOT FORCE LARGE CARDBOARD AND OTHER ITEMS DOWN THE CHUTE</p>\r\n\r\n<p style=\"text-align:center\">-PLEASE TAKE ALL LARGE ITEMS DOWN TO THE LOADING DOCK AREA</p>\r\n\r\n<p style=\"text-align:center\">-VIOLATORS WILL BE FINED!!</p>\r\n', 'static/Recycle 2.png', NULL, NULL, 'tscc2090sp2', 1, '2017-02-16 14:18:55', NULL),
(144, 1, '<p style=\"text-align: center;\">With the nicer weather soon approaching, residents will want to use their balcony space to enjoy the weather; they do not want to have to clean up after other peoples mess.</p>\r\n\r\n<p style=\"text-align: center;\">If you, your family or your guests go on your balcony:</p>\r\n\r\n<p style=\"text-align: center;\">Ensure that all cigarettes are completely extinguished and disposed of in an ashtray or another suitable container</p>\r\n\r\n<p style=\"text-align: center;\">Ensure that all ashtrays or containers are emptied frequently to prevent the wind from blowing cigarettes from your balcony</p>\r\n\r\n<p style=\"text-align: center;\"><u>Ensure that no-one throws cigarettes from your balcony.</u></p>\r\n\r\n<p style=\"text-align: center;\">We appreciate your cooperation.</p>\r\n', 'static/Balcony.png', 1487923200, 1514707200, 'tsccsp', 1, '2017-02-24 20:04:03', NULL),
(145, 1, '<p>Welcome to Luna Villa!</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sincerely,</p>\r\n\r\n<p>Management</p>\r\n', 'static/Buildings.png', 1487923200, 1514707200, 'tsccsp', 1, '2017-02-24 20:08:48', NULL),
(146, 1, '<p style=\"text-align: center;\">WASTE DISPOSAL RULES!!!</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">-TIE ALL BAGS BEFORE DISPOSING OF IT</p>\r\n\r\n<p style=\"text-align: center;\">-DO NOT LEAVE GARBAGE OR RECYCLING IN THIS AREA</p>\r\n\r\n<p style=\"text-align: center;\">-DO NOT FORCE LARGE CARDBOARD AND OTHER ITEMS DOWN THE CHUTE</p>\r\n\r\n<p style=\"text-align: center;\">-PLEASE TAKE ALL LARGE ITEMS DOWN TO THE LOADING DOCK AREA</p>\r\n\r\n<p style=\"text-align: center;\">-VIOLATORS WILL BE FINED!!</p>\r\n', 'static/Recycle 2.png', 1487923200, 1514707200, 'tsccsp', 1, '2017-02-24 20:10:17', NULL),
(147, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>POOL EQUIPMENT</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Dear Residents,</p>\r\n\r\n<p style=\"text-align:center\"><strong>Please do not move or play with the pool equipment. &nbsp;</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">The life saving equipment is <strong>NOT A TOY</strong>&nbsp;and must stay in its location(s) in case of an actual pool emergency.</p>\r\n\r\n<p style=\"text-align:center\">Thank you for your anticipated cooperation.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n', 'animated_medkit', 1488268800, 1489474800, 'tscc2449rf', 1, '2017-02-28 17:57:03', NULL),
(149, 1, '<p style=\"text-align:center\"><strong>THROWING CIGARETTES OFF BALCONIES</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Please be reminded that this is a serious fire safety hazard for Residents and pedestrians below.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Please be a good neighbor!</p>\r\n', 'static/Balcony.png', 0, 1517385600, 'tscc2449rf', 1, '2017-03-03 21:18:40', NULL),
(151, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>SHORT-TERM RENTALS</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Residents are reminded that short-term rentals of <strong>LESS THAN SIX (6) MONTHS</strong>&nbsp;are <strong>NOT PERMITTED</strong> in this building.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n', 'static/Notes.png', 1505631600, 1514620800, 'tscc2449rf', 1, '2017-03-07 18:53:24', NULL),
(153, 1, '<p style=\"text-align: center;\">In order to utilize the parcel service at the conceige desk, please ensure that you have properly registered yourself with property management.</p>\r\n\r\n<p style=\"text-align: center;\">This will include your&nbsp;<u>name, phone number, email address and lease documents</u>. &nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><u>Please note: All packages must be picked up within&nbsp;<strong>72hrs</strong>&nbsp;and must be&nbsp;<strong>15&rdquo; X 11&rdquo; X 20&rdquo;</strong>due to our limited storage space.&nbsp;</u></p>\r\n\r\n<p style=\"text-align: center;\"><u>Residents must be available to receive oversized parcels.</u></p>\r\n', 'static/Trolley.png', 1489132800, 1514707200, 'tscc2090sp2', 1, '2017-03-10 18:24:39', NULL),
(154, 1, '<p style=\"text-align:center\">In order to utilize the parcel service at the conceige desk, please ensure that you have properly registered yourself with property management.</p>\r\n\r\n<p style=\"text-align:center\">This will include your&nbsp;<u>name, phone number, email address and lease documents</u>. &nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><u>Please note: All packages must be picked up within <strong>72hrs</strong> and must be <strong>15&rdquo; X 11&rdquo; X 20&rdquo;</strong>due to our limited storage space.&nbsp;</u></p>\r\n\r\n<p style=\"text-align: center;\"><u>Residents must be available to receive oversized parcels.</u></p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Trolley.png', 1489132800, 1514707200, 'tscc2090sp', 1, '2017-03-10 18:26:47', NULL),
(156, 1, '<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>REMINDER:</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>EARTH HOUR - SATURDAY MARCH 25, 2017</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>8:30 - 9:30</strong></p>\r\n', 'animated_pin-on', 1490338800, 1490511600, 'tscc2449rf', 1, '2017-03-24 15:50:23', NULL),
(159, 1, '<p style=\"text-align:center\"><strong>Reminder to Residents:</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>* ANNUAL GENERATOR TESTING *</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>The annual generator testing will be taking place today between 10-4pm.</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>We appreciate your patience during this time as you may experience power interruption and longer wait times for the elevators.</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>Thank you</strong></p>\r\n', 'static/Building 2.png', 1490770800, 1490857200, 'tscc2449rf', 1, '2017-03-29 13:54:08', NULL),
(160, 1, '<p style=\"text-align: center;\"><strong>FIRE ALARM TESTING</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">The monthly fire alarm testing will take place on <strong>THURSDAY APRIL 6, 2017</strong> between <strong>9am-4pm</strong></p>\r\n\r\n<p style=\"text-align: center;\">Alarms and signals will sound. &nbsp;In case of emergency, you will be notified.</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Thank you!</p>\r\n', 'static/Emergency.png', 1491202800, 1491548400, 'tscc2449', 1, '2017-03-31 20:49:05', NULL),
(161, 1, '<p style=\"text-align:center\"><strong>HOT WATER SHUT-DOWN</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">There will be <strong>NO HOT WATER</strong> on:</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;<strong>THURSDAY APRIL 13, 2017</strong> between <strong>9am-5pm</strong> to complete&nbsp;maintenance to the Domestic Hot Water Tank.&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">We apologize for any inconvenience and thank you for your patience.&nbsp;</p>\r\n', 'static/Calendar 5.png', 1491807600, 1492153200, 'tscc2449', 1, '2017-03-31 20:55:58', NULL),
(164, 1, '<p style=\"text-align: center;\"><strong>MONTHLY FIRE ALARM TESTING</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">The monthly fire alarm testing is scheduled for <strong>THURSDAY APRIL 6, 2017</strong>. &nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Alarms and signals will sound (in case of an emergency, you will be notified).</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Thank you</p>\r\n', 'static/Fire Alarm.png', 1491289200, 1491548400, 'tscc2449rf', 1, '2017-04-04 17:23:50', NULL),
(165, 1, '<p style=\"text-align:center\"><strong>REMINDER OF AN OWNER&#39;S MEETING</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>PLEASE SUBMIT YOUR PROXY TO THE MANAGEMENT OFFICE</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">On<strong> </strong><strong><u>TUESDAY APRIL 25TH, 2017</u></strong> there will be an <strong>Owner&#39;s Meeting to Appoint Auditors</strong>.</p>\r\n\r\n<p style=\"text-align:center\"><strong><u>This is the only item on the agenda</u></strong>.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>REGISTRATION: &nbsp; &nbsp; &nbsp;6:30 PM</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>COMMENCEMENT: &nbsp;7:00 PM</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;PLACE: &nbsp; &nbsp;&nbsp;PARTY ROOM 2nd Floor</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n', 'animated_check-circle-alt', 1491289200, 1493103600, 'tscc2449rf', 1, '2017-04-04 18:53:43', NULL),
(166, 1, '<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>REMINDER - HOT WATER SHUT DOWN</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><u><strong>There will be NO HOT WATER on THURSDAY APRIL 13, 2017 between 9am-5pm.</strong></u></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">We apologize in advance for any inconvenience and thank you for your patience.</p>\r\n', 'static/Faucet.png', 1491289200, 1492153200, 'tscc2449rf', 1, '2017-04-04 19:04:05', NULL),
(167, 1, '<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>NO PARKING GARAGE ACCESS</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>or VISITORS PARKING</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>ON <u>MONDAY APRIL 10 BETWEEN 8AM-4PM</u></strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">We apologize for the inconvenience and thank you for your patience.</p>\r\n\r\n<p style=\"text-align: center;\">Please plan accordingly.</p>\r\n', 'animated_car', 1491548400, 1491894000, 'tscc2449rf', 1, '2017-04-07 14:16:13', NULL),
(171, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>SOCIAL COMMITTEE &ndash; MOVIE NIGHT!</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>THURSDAY APRIL 27 @ 8PM</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Join us to watch Disney&rsquo;s <strong><em>The Jungle Book.</em></strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>Popcorn will be provided.&nbsp; Feel free to bring your own snacks and non-alcoholic beverages.</strong></p>\r\n\r\n<p style=\"margin-left:-4.5pt\">&nbsp;</p>\r\n\r\n<p style=\"margin-left:-4.5pt\">&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Movie.png', 1492758000, 1493276400, 'tscc2449rf', 1, '2017-04-21 19:55:47', NULL),
(172, 1, '<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>MONTHLY FIRE ALARM TESTING</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Onxy-Fire will be conducting the monthly fire alarm testing on <strong>THURSDAY MAY 4, 2017</strong>.</p>\r\n\r\n<p style=\"text-align: center;\">Please disregard any sounds and signals.</p>\r\n\r\n<p style=\"text-align: center;\">In case of an emergency, you will be notified.</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Thank you for your patience during this time.</p>\r\n', 'animated_fire', 1493362800, 1493967600, 'tscc2449rf', 1, '2017-04-28 17:55:01', NULL),
(175, 1, '<p style=\"text-align: center;\"><strong>ITEMS IN INCORRECT LOCKER / C-223</strong><br />\r\n<br />\r\nPlease be advised that Management has been notified that someone has put their personal items into&nbsp;<strong>Locker 223 on Level B3</strong>&nbsp;which belongs to a different resident.</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Kindly ensure that your contents are removed by:</p>\r\n\r\n<p style=\"text-align: center;\"><br />\r\n<strong>12:00pm (noon) on THURSDAY MAY 4th, 2017</strong><br />\r\n<br />\r\nIf the belongings have not been removed by 12:00PM Noon, on the above mentioned date, Management will regrettably cut the lock and have the items removed.</p>\r\n\r\n<p style=\"text-align: center;\"><br />\r\nThank you for your anticipated cooperation.</p>\r\n', 'static/Moving Box.png', 1493622000, 1493881200, 'tscc2449rf', 1, '2017-05-01 18:01:23', NULL),
(178, 1, '<p style=\"text-align:center\"><u><strong>CHANGE IN OFFICE HOURS:</strong></u></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p>Office hours for&nbsp;May 18 &nbsp;to May 23:</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>FRIDAY &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;9am - 2pm &nbsp; &nbsp; &nbsp; May&nbsp;19</p>\r\n\r\n<p>MONDAY &nbsp; &nbsp; &nbsp; &nbsp;CLOSED &nbsp; &nbsp; &nbsp; &nbsp; May 22</p>\r\n\r\n<p>TUESDAY &nbsp; &nbsp; &nbsp; 9am - 5pm &nbsp; &nbsp; &nbsp;May 23</p>\r\n', 'static/Calendar 5.png', 1495004400, 1495522800, 'tscc2449rf', 1, '2017-05-17 20:24:42', NULL),
(179, 1, '<p style=\"text-align: center;\"><strong>JOIN THE SOCIAL COMMITTEE FOR THEIR 1ST ANNUAL BBQ!</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>FRIDAY JUNE 16, 2017</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>7 PM -10 PM - 2ND FLOOR PARTY ROOM</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>Please <u>RSVP</u> to the management office.</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong>Looking forward to seeing you there!</strong></p>\r\n', 'static/BBQ.png', 1495695600, 1497596400, 'tscc2449rf', 1, '2017-05-25 18:53:47', NULL),
(186, 1, '<p style=\"text-align: center;\"><strong>HAPPY 150th CANADA DAY to all Residents!</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Office Hours: &nbsp; &nbsp;</strong>&nbsp;</p>\r\n\r\n<p><strong>Monday July 3: &nbsp; CLOSED</strong></p>\r\n\r\n<p><strong>Tuesday July 4: &nbsp; 9am-5pm</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>The Board and Management wish you all a fabulous and safe long weekend!</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n', 'animated_balloons', 1498806000, 1499151600, 'tscc2449rf', 1, '2017-06-30 19:43:06', NULL),
(189, 1, '<p style=\"text-align:center\"><strong>MOVIE NIGHT!</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Tuesday July 25th, 2017</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Theatre Room @ 7pm</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Join the LTower Social Committee for the<strong> </strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>25th Anniversary production </strong>of</p>\r\n\r\n<p style=\"text-align:center\"><em><strong>THE PHANTOM OF THE OPERA</strong></em></p>\r\n\r\n<p style=\"text-align:center\">(<em><strong>at the Royal Albert Hall</strong></em>).</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n', 'static/Movie.png', 1499842800, 1500966000, 'tscc2449rf', 1, '2017-07-12 14:35:29', NULL),
(192, 1, '<p>&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">If you don&rsquo;t want to receive junk mail</p>\r\n\r\n<p style=\"text-align: center;\">in your mailbox, put a note</p>\r\n\r\n<p style=\"text-align: center;\"><strong>&ldquo;NO FLYERS&rdquo; </strong></p>\r\n\r\n<p style=\"text-align: center;\">in the back of your mailbox.</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Canada Post will not put</p>\r\n\r\n<p style=\"text-align: center;\">flyers in your mailbox.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Newspaper.png', NULL, NULL, 'tscc2516mf', 1, '2017-07-13 21:26:49', NULL),
(193, 1, '<p>&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><em><strong>Visit&nbsp;www.fivecondo.ca &nbsp;</strong></em></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><em><strong>for forms&nbsp;</strong></em></p>\r\n\r\n<p style=\"text-align:center\"><em><strong>information on the building</strong></em></p>\r\n\r\n<p style=\"text-align:center\"><em><strong>online service requests</strong></em></p>\r\n\r\n<p style=\"text-align:center\"><em><strong>discussion forums</strong></em></p>\r\n\r\n<p style=\"text-align:center\"><em><strong>classified ads</strong></em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Notes.png', NULL, NULL, 'tscc2516mf', 1, '2017-07-13 21:27:52', NULL),
(194, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>Please do not throw cigarettes,&nbsp;</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>or any debris,</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>from your balcony.</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>Thank you,</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>your neighbours!</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Balcony.png', NULL, NULL, 'tscc2516mf', 1, '2017-07-13 21:29:15', NULL),
(195, 1, '<p>&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">Visitor parking is available on a</p>\r\n\r\n<p style=\"text-align:center\">first come, first served basis.</p>\r\n\r\n<p style=\"text-align:center\">Please obtain a permit from the Concierge.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>Do not park in empty resident spaces,</strong></p>\r\n\r\n<p style=\"text-align:center\">you will be ticketed and may be towed</p>\r\n\r\n<p style=\"text-align:center\">at your expense.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/Parking.png', NULL, NULL, 'tscc2516mf', 1, '2017-07-13 21:29:51', NULL),
(196, 1, '<p style=\"text-align:center\"><strong>The SOCIAL COMMITTEE is looking for VOLUNTEERS!</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p>If you would like to volunteer, please contact the management office <strong>647.345.0800 / ltower.admin@dukamanagement.com</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>If you would only be interested in helping out with one event, that would also be greatly appreciated!</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'animated_eye-open', 1501138800, 1501916400, 'tscc2449rf', 1, '2017-07-27 22:15:05', NULL),
(197, 1, '<p>The Management Office hours for the upcoming long weekend are as follows:</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>FRIDAY AUGUST 4, 2017 &nbsp; &nbsp; &nbsp; &nbsp;9am - 3pm</strong></p>\r\n\r\n<p><strong>MONDAY AUGUST 7, 2017 &nbsp; &nbsp; CLOSED</strong></p>\r\n\r\n<p><strong>TUESDAY AUGUST 8, 2017 &nbsp; &nbsp; 9am - 5pm</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>If you require immediate assistance outside of the office hours, you may contact the&nbsp;<strong>FRONT DESK / SECURITY @ 647.344.2772</strong></p>\r\n', 'static/Balloons.png', 1501570800, 1502175600, 'tscc2449rf', 1, '2017-08-01 20:19:04', NULL),
(199, 1, '<p style=\"text-align:center\"><strong>Monthly Fire Alarm Testing</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>THURSDAY AUGUST 3rd, 2017</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>9am - 4pm</strong></p>\r\n\r\n<p>The monthly fire alarm testing is scheduled to take place on Thursday August 3rd, 2017. &nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Alarms and signals may sound. &nbsp;In case of an actual emergency, you will be notified.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>We thank you for your patience during this time.</p>\r\n', 'static/Fire Alarm.png', 1501657200, 1501830000, 'tscc2449rf', 1, '2017-08-02 18:20:17', NULL),
(209, 1, '<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\"><strong><u>You can now use the </u></strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong><u>5th floor barbecue!</u></strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Complete a form and</p>\r\n\r\n<p style=\"text-align: center;\">provide a security deposit</p>\r\n\r\n<p style=\"text-align: center;\">to the Management Office.</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'static/BBQ.png', NULL, NULL, 'tscc2516mf', 1, '2017-08-18 22:34:57', NULL),
(210, 1, '<p style=\"text-align:center\"><strong>Open Streets Toronto</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Sunday&nbsp;September 17th</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>8:30 am to 3 pm</strong><br />\r\n<br />\r\n&nbsp;Residents will not be able access Yonge Street</p>\r\n\r\n<p style=\"text-align:center\">with their vehicles during the program.</p>\r\n\r\n<p style=\"text-align:center\">St. Joseph Street, between Yonge and</p>\r\n\r\n<p style=\"text-align:center\">St. Nicholas Street will be converted to</p>\r\n\r\n<p style=\"text-align:center\">two-way traffic to accommodate</p>\r\n\r\n<p style=\"text-align:center\">residents exiting the building.</p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n', 'static/Calendar.png', NULL, 1505718000, 'tscc2516mf', 1, '2017-08-19 19:54:13', NULL),
(212, 1, '<p style=\"text-align: center;\"><strong>Management Office</strong></p>\r\n\r\n<p style=\"text-align: center;\">2nd Floor</p>\r\n\r\n<p style=\"text-align: center;\">Open 9 am to 1 pm, 2 to 5 pm&nbsp;</p>\r\n\r\n<p style=\"text-align: center;\">Monday to Friday, excluding holidays</p>\r\n\r\n<p style=\"text-align: center;\"><strong>416-925-1414</strong></p>\r\n\r\n<p style=\"text-align: center;\"><strong>management@5-stjoseph.com</strong></p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\">For after hours emergencies</p>\r\n\r\n<p style=\"text-align: center;\">call 855-244-8854</p>\r\n\r\n<p style=\"text-align: center;\">&nbsp;</p>\r\n', 'static/Buildings.png', NULL, NULL, 'tscc2516mf', 1, '2017-08-20 18:59:53', NULL),
(218, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>MANAGEMENT OFFICE </strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>WILL BE CLOSED AT 1&nbsp;PM FRIDAY </strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>FOR THE LABOUR DAY HOLIDAY </strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>AND WILL REOPEN TUESDAY AT 9 AM.</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong><em>Have an enjoyable long weekend!</em></strong></p>\r\n', 'animated_calendar', NULL, 1504594800, 'tscc2516mf', 1, '2017-08-27 22:50:22', NULL),
(222, 1, '<p style=\"text-align: center;\"><em><strong>&nbsp; Attention Residents:</strong></em></p>\r\n\r\n<p style=\"text-align: center;\"><em><strong>&nbsp;&nbsp; The hydro costs are continuing to rise.</strong></em><br />\r\n<em><strong>&nbsp; &nbsp; &nbsp; Please control your hydro consumption.</strong></em><br />\r\n<br />\r\n&nbsp;</p>\r\n', 'animated_piggybank', 1505631600, 1505718000, 'tscc2449rf', 1, '2017-09-17 15:06:27', NULL),
(245, 1, '<p>TEST</p>\r\n', NULL, 1516348800, 1516435200, 'mtcc2090', 1, '2018-01-19 20:18:20', NULL),
(246, 1, '<p><strong>REMINDER IN SUITE FIRE ALARM TEST:</strong></p>\r\n\r\n<p><strong>8 Telegram</strong></p>\r\n\r\n<p><strong>January 22nd&nbsp;( Floors 16 to 21),&nbsp; January 23rd&nbsp;(Floors 9 to 15),&nbsp; &nbsp;January 24th&nbsp;(Floors 7 to 8), </strong></p>\r\n\r\n<p><strong>January 25th&nbsp;(Floors 5 to 6), January 26th&nbsp;(Floors 2 to 3)</strong></p>\r\n\r\n<p><strong>25 Capreol</strong></p>\r\n\r\n<p><strong>January 29th&nbsp;( Floors 35 to PH),&nbsp;January 30th&nbsp;(Floors 27 to 33), January 31st&nbsp;(Floors 19 to 26)</strong></p>\r\n\r\n<p><strong>February 1st&nbsp;(Floors 10 to 18), February 2nd&nbsp;(Floors 2 to 9)&rdquo;</strong></p>\r\n', 'animated_info', NULL, 1517644800, 'TSCC2090SP', 1, '2018-01-20 17:13:25', NULL),
(247, 1, '<p><strong>REMINDER IN SUITE FIRE ALARM TEST:</strong></p>\r\n\r\n<p><strong>8 Telegram</strong></p>\r\n\r\n<p><strong>January 22nd&nbsp;( Floors 16 to 21),&nbsp; January 23rd&nbsp;(Floors 9 to 15),&nbsp; &nbsp;January 24th&nbsp;(Floors 7 to 8),</strong></p>\r\n\r\n<p><strong>January 25th&nbsp;(Floors 5 to 6), January 26th&nbsp;(Floors 2 to 3)</strong></p>\r\n\r\n<p><strong>25 Capreol</strong></p>\r\n\r\n<p><strong>January 29th&nbsp;( Floors 35 to PH),&nbsp;January 30th&nbsp;(Floors 27 to 33), January 31st&nbsp;(Floors 19 to 26)</strong></p>\r\n\r\n<p><strong>February 1st&nbsp;(Floors 10 to 18), February 2nd&nbsp;(Floors 2 to 9)</strong></p>\r\n', 'animated_info', NULL, 1517644800, 'TSCC2090SP2', 1, '2018-01-20 17:14:42', NULL),
(251, 1, '<p>Hello Olivia</p>\r\n', 'animated_at', 1517472000, 1517472000, 'abcd12345', 1, '2018-02-01 20:08:44', NULL),
(261, 1, '<p><strong>BALCONY ETIQUETTE</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Only seasonal furniture is permitted on the balcony/patios.</p>\r\n\r\n<p>Barbequing is not permitted.</p>\r\n\r\n<p><strong><u>Remember nothing is to be dropped, thrown or swept from the balcony. This includes cigarettes, cans, beer bottles, paper, and other debris.</u></strong></p>\r\n\r\n<p>No drying of clothes on the balconies.</p>\r\n\r\n<p>No Hanging flags.</p>\r\n', 'static/Balcony.png', 1524466800, 1527750000, 'tscc209sp', 1, '2018-04-24 20:13:15', NULL),
(262, 1, '<p><strong>BALCONY ETIQUETTE</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Only seasonal furniture is permitted on the balcony/patios.</p>\r\n\r\n<p>Barbequing is not permitted.</p>\r\n\r\n<p><strong><u>Remember nothing is to be dropped, thrown or swept from the balcony. This includes cigarettes, cans, beer bottles, paper, and other debris.</u></strong></p>\r\n\r\n<p>No drying of clothes on the balconies.</p>\r\n\r\n<p>No Hanging flags.</p>\r\n', 'static/Balcony.png', 1524466800, 1527750000, 'tscc2090sp2', 1, '2018-04-24 20:22:11', NULL),
(263, 1, '<p><strong>BALCONY ETIQUETTE</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Only seasonal furniture is permitted on the balcony/patios.</p>\r\n\r\n<p>Barbequing is not permitted.</p>\r\n\r\n<p><strong><u>Remember nothing is to be dropped, thrown or swept from the balcony. This includes cigarettes, cans, beer bottles, paper, and other debris.</u></strong></p>\r\n\r\n<p>No drying of clothes on the balconies.</p>\r\n\r\n<p>No Hanging flags.</p>\r\n', 'static/Balcony.png', 1524466800, 1527750000, 'tscc2090sp', 1, '2018-04-24 20:31:35', NULL),
(279, 1, '<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong><u>NOTICE OF ELECTION</u></strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>WHEN: Monday, October 22, 2018</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>WHERE: CONFRENCE ROOM</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>TIME: 10:00 AM - 8:00 PM</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>BE SURE TO BRING YOUR VOTING SLIP AND&nbsp;PHOTO I.D.</strong></p>\r\n', 'static/Canadian Flag.png', 1539759600, 1540278000, 'tscc1989cm', 1, '2018-06-06 13:50:12', NULL),
(281, 1, '<p style=\"text-align:center\"><strong><u>Monthly Fire Alarm Test</u></strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Brampton Fire will be carrying out their Fire alarm test</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Wednesday, October 17, 2018 .</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Thank you,</strong></p>\r\n\r\n<p style=\"text-align:center\"><strong>Management Team</strong></p>\r\n', 'static/Emergency.png', 1539327600, 1539846000, 'tscc1989cm', 1, '2018-06-19 16:38:14', NULL),
(285, 1, '<p style=\"text-align: center;\"><strong><u>To All Residents</u></strong></p>\r\n\r\n<p>Due to the effects of the flooding last week, the Podium elevators will be out of service.</p>\r\n\r\n<p>Please use the elevators on the Tower side.</p>\r\n\r\n<p>We apologize for the inconvenience this may cause you.</p>\r\n\r\n<p>Thank you,</p>\r\n\r\n<p>Management Team</p>\r\n\r\n<p>Thank you,</p>\r\n', 'static/Handyman.png', 1534143600, 1534143600, 'tscc1989cm', 1, '2018-08-13 20:06:42', NULL),
(286, 1, '<p>test</p>\r\n', 'static/Volleyball.png', 1533106800, NULL, 'qwert', 1, '2018-08-21 00:19:43', NULL),
(287, 1, '<p>Hello</p>\r\n\r\n<p>New paragraph</p>\r\n\r\n<p>Bye</p>\r\n', 'animated_address-book', 1533625200, 1535007600, 'test123', 1, '2018-08-21 15:31:16', NULL),
(288, 1, '<p>New</p>\r\n', 'static/Newspaper.png', 1534748400, 1535612400, 'test123', 1, '2018-08-21 16:27:41', NULL),
(289, 1, '<p>Old</p>\r\n', 'static/Badminton.png', 1533106800, 1533625200, 'test123', 1, '2018-08-21 18:14:58', NULL),
(290, 1, '<p>Future</p>\r\n', 'static/Airport.png', 1535698800, NULL, 'test123', 1, '2018-08-21 18:15:18', NULL),
(291, 1, '<p>no icons</p>\r\n', NULL, NULL, NULL, 'test123', 1, '2018-08-21 21:15:08', NULL),
(292, 1, '<p>Wrong dates</p>\r\n', 'static/Airport.png', 1535698800, 1533538800, 'test123', 1, '2018-08-21 21:58:07', NULL),
(298, 1, '<p>TEST&nbsp; 2018/</p>\r\n', 'static/American Football.png', NULL, NULL, 'abcd1234', 1, '2018-09-03 21:05:31', NULL),
(300, 1, '<p style=\"text-align:center\"><u><strong>Monthly Generator Service&nbsp;</strong></u></p>\r\n\r\n<p style=\"text-align:center\"><strong>When:</strong> Wednesday, September 26, 2018 at approx. 11:15 A.M.</p>\r\n\r\n<p style=\"text-align:center\">The technician will be doing a 1 hour building transfer <strong>(which affects elevators and quick glitch in common area lighting)</strong>.</p>\r\n\r\n<p style=\"text-align:center\">There is <strong>ALWAYS</strong> at least 1 elevator working and this will not affect suites.</p>\r\n', 'static/Handyman.png', 1537513200, 1538031600, 'tscc1989cm', 1, '2018-09-17 17:35:21', NULL),
(308, 1, '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;<strong>PCC 253</strong></p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>BOARD OF DIRECTORS&nbsp;</strong></p>\r\n\r\n<p style=\"text-align:justify\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2018 - 2019</strong></p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Michael Baskwell&nbsp; - President&nbsp;</strong></p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <strong>Joseph Gonsalves&nbsp; - Vice President&nbsp;</strong></p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<strong>Fadi Dabliz&nbsp;&nbsp;- VP Communications</strong>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>\r\n\r\n<p style=\"text-align:justify\">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>Zenon Fralic - Secretary</strong></p>\r\n\r\n<p style=\"text-align:justify\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Xavier Remedios&nbsp; - Treasurer</strong></p>\r\n\r\n<p style=\"text-align:justify\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Jim Kline&nbsp; - Director&nbsp; &nbsp; &nbsp;</strong></p>\r\n\r\n<p style=\"text-align:justify\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Jason&nbsp; Goodman - Director</strong></p>\r\n\r\n<p><br />\r\n&nbsp;</p>\r\n', NULL, 1540191600, 1542700800, 'pcc253sa', 1, '2018-10-22 23:59:09', NULL),
(314, 1, '<p style=\"text-align: center;\">WELCOME TO SKYVIEW&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>\r\n', 'static/Balloons.png', 1552460400, 1555311600, 'tscc214sb', 1, '2019-03-13 23:42:33', NULL),
(315, 1, '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;WELCOME TO SKYVIEW!</p>\r\n', 'static/Balloons.png', 1552374000, 1555398000, 'tscc 2184sb', 1, '2019-03-13 23:56:02', NULL),
(316, 1, '<p>&nbsp; &nbsp; &nbsp;<strong>THE MANAGEMENT OF SKYVIEW ON YONGE </strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp;ARE TESTING A NEW WAY&nbsp; TO</strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp;COMMUNICATE WITH RESIDENTS.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp;&nbsp;WE CONSIDER TO TRADE CORK BULLETIN </strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; BOARDS FOR&nbsp;NEW COMMUNICATION </strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp;TECHNOLOGY.</strong></p>\r\n\r\n<p><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></p>\r\n', 'animated_desktop', 1552546800, 1555398000, 'tscc2184sb', 1, '2019-03-15 17:15:35', NULL),
(317, 1, '<p><strong>WELCOME TO SKYVIEW ON YONGE</strong></p>\r\n\r\n<p><em><strong>SINCERELY&nbsp;&nbsp;<br />\r\nTHE MANAGEMENT OF SKYVIEW</strong></em></p>\r\n', 'static/Building 3.png', 1552633200, 1555570800, 'tscc 2017ms', 1, '2019-03-17 15:32:43', NULL),
(318, 1, '<p><strong>THE MANAGEMENT OF SKYVIEW ON YONGE</strong></p>\r\n\r\n<p><strong>ARE TESTING A NEW&nbsp;WAY TO</strong></p>\r\n\r\n<p><strong>COMMUNICATE WITH RESIDENTS.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>WE CONSIDER TO TRADE CORK BULLETIN&nbsp;</strong></p>\r\n\r\n<p><strong>BOARDS FOR NEW COMMUNICATION&nbsp;</strong></p>\r\n\r\n<p><strong>TECHNOLOGY</strong></p>\r\n', 'animated_desktop', 1552460400, 1555484400, 'tscc2017ms', 1, '2019-03-17 18:04:32', NULL),
(320, 1, '<p><strong>FOR&nbsp;AFTER&nbsp;HOURS EMERGENCY,</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>&nbsp;<strong>PLEASE</strong>&nbsp; <strong>CONTACT&nbsp;OUR</strong> <strong>SECURITY</strong>&nbsp;<strong>STAFF</strong> <strong>AT</strong>&nbsp;<strong>THE</strong>&nbsp;&nbsp;<strong>FRONT</strong>&nbsp;<strong>DESK</strong>&nbsp;<strong>AT</strong>&nbsp;<strong>416-226-6306</strong>&nbsp;<strong>WHICH</strong>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>OPERATES</strong>&nbsp;<strong>24</strong>&nbsp;<strong>HOURS&nbsp;</strong>&nbsp;<strong>A</strong>&nbsp;&nbsp;<strong>DAY.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>EMERGENCIES ARE CONSIDERED TO BE ANY PLUMBING LEAK, </strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>MAJOR LEAK, COMPLETE LOSS OF ELECTRICITY, </strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>LOSS OF WATER OR DRAINAGE BLOCKAGE.</strong></p>\r\n', 'static/Faucet 2.png', 1552633200, 1587193200, 'tscc2017ms', 1, '2019-03-19 19:25:01', NULL),
(321, 1, '<p><strong>DEAR RESIDENT,</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>IF YOU INQUIRE NOT AN EMERGENCY, </strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>SUCH AS GENERAL BUILDING INFORMATION,</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>OR AMENITY BOOKINGS.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>WE KINDLY ASK THAT YOU PLEASE AWAIT A RESPONSE TO</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>YOUR INQUIRY FROM MANAGEMENT.</strong></p>\r\n', 'animated_info', 1552633200, 1555570800, 'tscc2017ms', 1, '2019-03-19 19:36:38', NULL),
(322, 1, '<p><em><strong>WISHING YOU AND YOUR FAMILY A WONDERFUL WEEKEND!</strong></em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em><strong>MANAGEMENT OFFICE.</strong></em></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><em><strong>MTCC 680</strong></em></p>\r\n', 'static/Fireworks.png', 1552633200, 1555570800, 'tscc2017ms', 1, '2019-03-19 19:44:06', NULL),
(323, 1, '<p><u><em><strong>COMMUNITY&nbsp; SAFETY&nbsp; AND&nbsp; RESPECT</strong></em></u></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>* OUR CONDOMINIUM MUST BE A SAFE&nbsp; AND RESPECTABLE PLACE FOR ALL</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>* WE ARE ALL RESPONSIBLE FOR PROMOTING A SAFE LIVING AND WORK</strong></p>\r\n\r\n<p><strong>ENVIRONMENT, EXHIBITING RESPECT FOR ALL SITE STAFF MEMBERS,</strong></p>\r\n\r\n<p><strong>CONTRACTORS, RESIDENTS, GUESTS, AND OTHERS.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>* DISCRIMINATION, HARASSMENT, VERBAL AGGRESSION OR VIOLENCE</strong></p>\r\n\r\n<p><strong>FROM ANY SOURCE IS CONTRARY TO THE VALUES OF THIS COMMUNITY.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>* WE MAINTAIN A POLICY THAT AIMS TO REDUCE RISKS, PROVIDES&nbsp; A SAFE</strong></p>\r\n\r\n<p><strong>AND POSITIVE ENVIRONMENT, AND KEEPS US COMPLIANT WITH THE LAW.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>* WE APPRECIATE YOUR COOPERATION IN SUPPORTING THESE PRINCIPLES.&nbsp;</strong></p>\r\n', NULL, 1558076400, 1561964400, 'ycc433dm', 1, '2019-05-17 18:37:56', NULL),
(324, 1, '<p>JOHN PETERS WELCOME TO 1101 BLOOR WEST</p>\r\n', NULL, 1568012400, 1568271600, 'abcd1234', 1, '2019-09-09 22:39:35', NULL),
(325, 1, '<p>&nbsp;WELCOME&nbsp; TO 1101 BAY STREET</p>\r\n', NULL, 1567926000, 1568185200, 'mtcc680', 1, '2019-09-09 23:03:01', NULL),
(326, 1, '<p>WELCOME</p>\r\n', NULL, 1567926000, 1568271600, 'tscc184sb', 1, '2019-09-09 23:38:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

DROP TABLE IF EXISTS `pictures`;
CREATE TABLE IF NOT EXISTS `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`id`, `name`) VALUES
(1, 'Building_Repair.png'),
(2, 'Civic_Provincial Day.png'),
(3, 'Elevator_Repair.png'),
(4, 'Notice.png'),
(5, 'Parking.png'),
(6, 'Winter_Holidays.png'),
(10, 'Fire_Alarm_Testing.png'),
(11, 'Power_Shut_Down.png'),
(12, 'Cleaning.png');

-- --------------------------------------------------------

--
-- Table structure for table `signaturetable`
--

DROP TABLE IF EXISTS `signaturetable`;
CREATE TABLE IF NOT EXISTS `signaturetable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text,
  `logo` text,
  `condo` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `condo` (`condo`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `signaturetable`
--

INSERT INTO `signaturetable` (`id`, `text`, `logo`, `condo`) VALUES
(7, '<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'uploads/B0058M2YLS-promoting  door hanger.jpg', 'abcd1234'),
(8, '<p>&nbsp; &nbsp; &nbsp;</p>\r\n\r\n<p>Office # : 647-345-0800 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;Office Hours:</p>\r\n\r\n<p>Front Desk # : 647-344-2772 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;M/W/F: &nbsp; &nbsp; &nbsp; &nbsp;9am-5pm</p>\r\n\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Tues/Thurs:&nbsp; 9 am-5 pm</p>\r\n', 'uploads/Del_Logo_100x1041.jpg', 'tscc2449rf'),
(9, '<p><strong>Mehdi&nbsp; Khataie</strong>&nbsp;&nbsp;Property Manager</p>\r\n\r\n<p><strong>Phone:</strong>&nbsp;416-987-1595<br />\r\n<strong>Email:</strong>&nbsp;princessplace@delcondo.com</p>\r\n', 'uploads/del.jpg', 'tscc1506mm'),
(10, '<p>Catherine&nbsp;Lin</p>\r\n\r\n<p>Site Administrator</p>\r\n\r\n<p>Phone:&nbsp;416-987-1595</p>\r\n\r\n<p>Email:&nbsp;princessplace.apm@DelCondo.com</p>\r\n', 'uploads/del.jpg', 'tscc1515mm'),
(11, '', 'uploads/hhh.png', 'tscc2298kj'),
(12, '<p><strong>Henry Hernandez</strong></p>\r\n\r\n<p><strong>Assisstant Property Manager</strong></p>\r\n\r\n<p><strong>Email: henry.g.hernandez@fsresidential.com</strong></p>\r\n\r\n<p><strong>Direct Line: 416-941-9744</strong></p>\r\n', 'uploads/0f1812b.png', 'TSCC1989CM'),
(13, '<p>Senior Property Manager Laura</p>\r\n\r\n<p>Site Administrator Lindsey Volpe</p>\r\n\r\n<p>P:&nbsp;416-531-7207</p>\r\n\r\n<p>E:&nbsp;batterypark@rogers.com</p>\r\n', 'uploads/brookfield-residential-square.png', 'TSCC1817LP'),
(14, '', 'uploads/ICC Logo.jpg', 'TSCC2017MS'),
(15, '<p><strong>SHELDON DANIS</strong><br />\r\nSenior Property Manager</p>\r\n\r\n<p>E:Sheldon.Danis@fsresidential.com</p>\r\n\r\n<p>P:&nbsp;905 232 8855</p>\r\n', 'uploads/logo.png', 'PCC946SD'),
(16, '<p><strong>Dean&nbsp;A. Mackenzie</strong></p>\r\n\r\n<p>Condominium Manager</p>\r\n\r\n<p>E:&nbsp;highpoint@delcondo.com</p>\r\n\r\n<p>P:&nbsp;416-756-9640</p>\r\n', 'uploads/del.png', 'YCC433DM'),
(17, '', 'uploads/logo.png', 'TSCC2184SB'),
(18, '<p>Senior Property Manager&nbsp;Susan Acker</p>\r\n\r\n<p>P:&nbsp;(905) 238-6104</p>\r\n', 'uploads/ppmlogo.jpg', 'PCC253SA'),
(19, '<p>Senior Property Manager Ann Allen</p>\r\n\r\n<p>P:&nbsp;905-454-8381</p>\r\n', 'uploads/ppmlogo.jpg', 'PCC256AA'),
(20, '<p style=\"text-align:justify\"><strong>Senior Property </strong><strong>Manager:</strong><strong> Salim Pradhan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Assistant </strong><strong>Manager:</strong><strong> Seema Sharma</strong></p>\r\n\r\n<p style=\"text-align:justify\"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Site</strong> <strong>Administrator:</strong> <strong> Jennifer</strong><strong> Deshong Mercury</strong></p>\r\n\r\n<p><strong>E-Mail: lunamanager@telus.net&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Telephone: 416-623-0481&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; P:&nbsp;416-623-0481&nbsp;</strong></p>\r\n', 'uploads/brookfield-residential-square.png', 'TSCC2090SP'),
(21, '<p><strong>Senior Property Manager &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;Salim Pradhan</strong></p>\r\n\r\n<p><strong>Assistant Property Manager &nbsp; &nbsp;: &nbsp;Seema Sharma</strong></p>\r\n\r\n<p><strong>Site Administrator &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :&nbsp;</strong>Jennifer Deshong Mercury</p>\r\n\r\n<p><strong>E Mail &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; : tscc2090@gmail.com</strong></p>\r\n\r\n<p><strong>Telephone &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;:&nbsp;416-623-0481&nbsp;</strong></p>\r\n', 'uploads/crossbridge.png', 'TSCC2090SP2'),
(22, '<p>Condominium Manager&nbsp;Luisa Kubig<br />\r\nSite Administrator&nbsp;Genta Ballamani</p>\r\n\r\n<p>E:&nbsp;tscc2272@rogers.com</p>\r\n\r\n<p>P:&nbsp;416-519-9469</p>\r\n\r\n<p>&nbsp;</p>\r\n', 'uploads/cropped-MCM-logo-2016-2-e1470250789357.jpg', 'TSCC2272LK'),
(23, '<p>Condominium Manager&nbsp;Luisa Kubig</p>\r\n\r\n<p>Site Administrator &nbsp;Norman Tse.</p>\r\n\r\n<p>&nbsp;Superintendent &nbsp;Ramesh Bipa</p>\r\n\r\n<p>E:&nbsp;skyscapecondo@bellnet.ca</p>\r\n\r\n<p>P:&nbsp;416-519-9469</p>\r\n', 'uploads/cropped-MCM-logo-2016-2-e1470250789357.jpg', 'TSCC1948'),
(24, '<p>Site Administrator Martin Shneider</p>\r\n', 'uploads/', 'tscc 1989cm'),
(25, '<p>joseth</p>\r\n', 'uploads/', 'abcd123'),
(26, '<p>Site Administrator&nbsp; Norman Tse.</p>\r\n\r\n<p>The Superintendent&nbsp; Ramesh Bipat</p>\r\n', 'uploads/', 'tscc 1948'),
(27, '<p>Senior Property Manager&nbsp;Salim Pradhan</p>\r\n\r\n<p>Site Administrator&nbsp;Teressa Cummings</p>\r\n\r\n<p>E: lunamanager@telus.net</p>\r\n\r\n<p>P:&nbsp;416-623-0481&nbsp;</p>\r\n', 'uploads/', 'tsccsp'),
(28, '', 'uploads/', 'tscc2090'),
(29, '<p>&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>MANAGEMENT OFFICE &nbsp;416-925-1414</strong></p>\r\n\r\n<p style=\"text-align:center\">&nbsp;</p>\r\n\r\n<p style=\"text-align:center\"><strong>AFTER HOURS EMERGENCIES &nbsp;&nbsp;855-244-8854</strong></p>\r\n', 'uploads/FIVE logo square.png', 'tscc2516mf'),
(30, '<p>Blabla111</p>\r\n', 'uploads/2012-09-07 13.30.16.jpg', 'test123'),
(31, '', 'uploads/901  5 Lisa Street   2.jpg', 'mtcc680'),
(32, '', 'uploads/5 LISA DR SAM 1.jpg', 'tscc184sb');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

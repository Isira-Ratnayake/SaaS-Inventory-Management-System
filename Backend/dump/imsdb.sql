-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: imsdb
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `imsdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `imsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `imsdb`;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_description` varchar(30) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES
(1,'Lahiru Auto International');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_sequence`
--

DROP TABLE IF EXISTS `company_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_sequence` (
  `company_id` int(11) NOT NULL,
  `users` int(11) NOT NULL,
  `customers` int(11) NOT NULL,
  `suppliers` int(11) NOT NULL,
  `items` int(11) NOT NULL,
  `grns` int(11) NOT NULL,
  `invoices` int(11) NOT NULL,
  `srs` int(11) NOT NULL,
  `pos` int(11) NOT NULL,
  `batch_nos` int(11) NOT NULL,
  PRIMARY KEY (`company_id`),
  CONSTRAINT `company_sequence_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_sequence`
--

LOCK TABLES `company_sequence` WRITE;
/*!40000 ALTER TABLE `company_sequence` DISABLE KEYS */;
INSERT INTO `company_sequence` VALUES
(1,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `company_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES
(1,'John Doe',1),
(2,'Jane Smith',1),
(3,'Michael Johnson',1),
(4,'Emily Davis',1),
(5,'Chris Brown',1),
(6,'Jessica Wilson',1),
(7,'Daniel Martinez',1),
(8,'Laura Taylor',1),
(9,'David Anderson',1),
(10,'Emma Thomas',1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grn`
--

DROP TABLE IF EXISTS `grn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grn` (
  `grn_number` int(11) NOT NULL,
  `grn_date` date NOT NULL,
  `is_canceled` tinyint(1) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `action_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`grn_number`),
  KEY `action_user_id` (`action_user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `grn_ibfk_1` FOREIGN KEY (`action_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `grn_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grn`
--

LOCK TABLES `grn` WRITE;
/*!40000 ALTER TABLE `grn` DISABLE KEYS */;
INSERT INTO `grn` VALUES
(1,'2023-07-01',0,1,11,1),
(2,'2023-08-01',0,1,12,1),
(3,'2023-09-01',0,1,13,1),
(4,'2023-10-01',0,1,14,1),
(5,'2023-11-01',0,1,15,1),
(6,'2023-12-01',0,1,16,1),
(7,'2024-01-01',0,1,80,1),
(8,'2024-02-01',0,1,81,1);
/*!40000 ALTER TABLE `grn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grn_item`
--

DROP TABLE IF EXISTS `grn_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grn_item` (
  `grn_number` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `unit_cost_price` decimal(9,2) NOT NULL,
  `unit_selling_price` decimal(9,2) NOT NULL,
  `quantity` decimal(7,2) NOT NULL,
  PRIMARY KEY (`grn_number`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `grn_item_ibfk_1` FOREIGN KEY (`grn_number`) REFERENCES `grn` (`grn_number`),
  CONSTRAINT `grn_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grn_item`
--

LOCK TABLES `grn_item` WRITE;
/*!40000 ALTER TABLE `grn_item` DISABLE KEYS */;
INSERT INTO `grn_item` VALUES
(1,1,10000.00,12000.00,20.00),
(1,2,6500.00,7500.00,20.00),
(1,3,1000.00,2000.00,20.00),
(1,4,1000.00,2000.00,20.00),
(1,5,4500.00,5500.00,20.00),
(1,6,6000.00,8000.00,20.00),
(2,1,10000.00,12000.00,20.00),
(2,2,6500.00,7500.00,20.00),
(2,3,1000.00,2000.00,20.00),
(2,4,1000.00,2000.00,20.00),
(2,5,4500.00,5500.00,20.00),
(2,6,6000.00,8000.00,20.00),
(3,1,10000.00,12000.00,20.00),
(3,2,6500.00,7500.00,20.00),
(3,3,1000.00,2000.00,20.00),
(3,4,1000.00,2000.00,20.00),
(3,5,4500.00,5500.00,20.00),
(3,6,6000.00,8000.00,20.00),
(4,1,10000.00,12000.00,20.00),
(4,2,6500.00,7500.00,20.00),
(4,3,1000.00,2000.00,20.00),
(4,4,1000.00,2000.00,20.00),
(4,5,4500.00,5500.00,20.00),
(4,6,6000.00,8000.00,20.00),
(5,1,10000.00,12000.00,20.00),
(5,2,6500.00,7500.00,20.00),
(5,3,1000.00,2000.00,20.00),
(5,4,1000.00,2000.00,20.00),
(5,5,4500.00,5500.00,20.00),
(5,6,6000.00,8000.00,20.00),
(6,1,10000.00,12000.00,20.00),
(6,2,6500.00,7500.00,20.00),
(6,3,1000.00,2000.00,20.00),
(6,4,1000.00,2000.00,20.00),
(6,5,4500.00,5500.00,20.00),
(6,6,6000.00,8000.00,20.00),
(7,1,10000.00,12000.00,20.00),
(7,2,6500.00,7500.00,20.00),
(7,3,1000.00,2000.00,20.00),
(7,4,1000.00,2000.00,20.00),
(7,5,4500.00,5500.00,20.00),
(7,6,6000.00,8000.00,20.00),
(8,1,10000.00,12000.00,20.00),
(8,2,6500.00,7500.00,20.00),
(8,3,1000.00,2000.00,20.00),
(8,4,1000.00,2000.00,20.00),
(8,5,4500.00,5500.00,20.00),
(8,6,6000.00,8000.00,20.00);
/*!40000 ALTER TABLE `grn_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grrn`
--

DROP TABLE IF EXISTS `grrn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grrn` (
  `grrn_number` int(11) NOT NULL,
  `grrn_date` date NOT NULL,
  `is_canceled` tinyint(1) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `action_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`grrn_number`),
  KEY `action_user_id` (`action_user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `grrn_ibfk_1` FOREIGN KEY (`action_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `grrn_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grrn`
--

LOCK TABLES `grrn` WRITE;
/*!40000 ALTER TABLE `grrn` DISABLE KEYS */;
/*!40000 ALTER TABLE `grrn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grrn_grn_item`
--

DROP TABLE IF EXISTS `grrn_grn_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grrn_grn_item` (
  `grrn_number` int(11) NOT NULL,
  `grn_number` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `returned_quantity` decimal(7,2) NOT NULL,
  PRIMARY KEY (`grrn_number`,`grn_number`,`item_id`),
  KEY `grn_number` (`grn_number`,`item_id`),
  CONSTRAINT `grrn_grn_item_ibfk_1` FOREIGN KEY (`grrn_number`) REFERENCES `grrn` (`grrn_number`),
  CONSTRAINT `grrn_grn_item_ibfk_2` FOREIGN KEY (`grn_number`, `item_id`) REFERENCES `grn_item` (`grn_number`, `item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grrn_grn_item`
--

LOCK TABLES `grrn_grn_item` WRITE;
/*!40000 ALTER TABLE `grrn_grn_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `grrn_grn_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice` (
  `invoice_number` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `is_canceled` tinyint(1) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `action_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoice_number`),
  KEY `action_user_id` (`action_user_id`),
  KEY `customer_id` (`customer_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`action_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES
(1,'2023-07-02',1,0,1,17,1),
(2,'2023-07-05',1,0,1,18,1),
(3,'2023-07-07',1,0,1,19,1),
(4,'2023-07-14',1,0,1,20,1),
(5,'2023-07-22',1,0,1,21,1),
(6,'2023-07-25',1,0,1,22,1),
(7,'2023-08-02',1,0,1,23,1),
(8,'2023-08-03',1,0,1,24,1),
(9,'2023-08-12',1,0,1,25,1),
(10,'2023-08-16',1,0,1,26,1),
(11,'2023-08-22',1,0,1,27,1),
(12,'2023-09-05',1,0,1,28,1),
(13,'2023-09-06',1,0,1,29,1),
(14,'2023-09-12',1,0,1,30,1),
(15,'2023-09-14',1,0,1,31,1),
(16,'2023-09-20',1,0,1,32,1),
(17,'2023-10-01',1,0,1,33,1),
(18,'2023-10-12',1,0,1,34,1),
(19,'2023-10-13',1,0,1,35,1),
(20,'2023-10-14',1,0,1,36,1),
(21,'2023-10-25',1,0,1,37,1),
(22,'2023-11-03',1,0,1,38,1),
(23,'2023-11-04',1,0,1,39,1),
(24,'2023-11-07',1,0,1,40,1),
(25,'2023-11-12',1,0,1,41,1),
(26,'2023-11-16',1,0,1,42,1),
(27,'2023-12-02',1,0,1,43,1),
(28,'2023-12-07',1,0,1,44,1),
(29,'2023-12-08',1,0,1,45,1),
(30,'2023-12-10',1,0,1,46,1),
(31,'2023-12-11',1,0,1,47,1),
(32,'2024-01-02',1,0,1,48,1),
(33,'2024-01-10',1,0,1,49,1),
(34,'2024-01-11',1,0,1,50,1),
(35,'2024-01-22',1,0,1,51,1),
(36,'2024-01-25',1,0,1,52,1),
(37,'2024-02-02',1,0,1,53,1),
(38,'2024-02-13',1,0,1,54,1),
(39,'2024-02-15',1,0,1,55,1),
(40,'2024-02-17',1,0,1,56,1),
(41,'2024-02-20',1,0,1,57,1),
(42,'2024-03-03',1,0,1,58,1),
(43,'2024-03-04',1,0,1,59,1),
(44,'2024-03-05',1,0,1,60,1),
(45,'2024-03-10',1,0,1,61,1),
(46,'2024-03-20',1,0,1,62,1),
(47,'2024-04-02',1,0,1,63,1),
(48,'2024-04-04',1,0,1,64,1),
(49,'2024-04-06',1,0,1,65,1),
(50,'2024-04-08',1,0,1,66,1),
(51,'2024-04-12',1,0,1,67,1),
(52,'2024-05-13',1,0,1,68,1),
(53,'2024-05-15',1,0,1,69,1),
(54,'2024-05-18',1,0,1,70,1),
(55,'2024-05-19',1,0,1,71,1),
(56,'2024-05-22',1,0,1,72,1),
(57,'2024-06-12',1,0,1,73,1),
(58,'2024-06-15',1,0,1,74,1),
(59,'2024-06-18',1,0,1,75,1),
(60,'2024-06-19',1,0,1,76,1),
(61,'2024-06-22',1,0,1,77,1),
(62,'2024-07-01',1,0,1,78,1),
(63,'2024-07-03',1,0,1,79,1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_grn_item`
--

DROP TABLE IF EXISTS `invoice_grn_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoice_grn_item` (
  `invoice_number` int(11) NOT NULL,
  `grn_number` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` decimal(7,2) NOT NULL,
  PRIMARY KEY (`invoice_number`,`grn_number`,`item_id`),
  KEY `grn_number` (`grn_number`,`item_id`),
  CONSTRAINT `invoice_grn_item_ibfk_1` FOREIGN KEY (`invoice_number`) REFERENCES `invoice` (`invoice_number`),
  CONSTRAINT `invoice_grn_item_ibfk_2` FOREIGN KEY (`grn_number`, `item_id`) REFERENCES `grn_item` (`grn_number`, `item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_grn_item`
--

LOCK TABLES `invoice_grn_item` WRITE;
/*!40000 ALTER TABLE `invoice_grn_item` DISABLE KEYS */;
INSERT INTO `invoice_grn_item` VALUES
(1,1,1,4.00),
(1,1,2,4.00),
(1,1,3,4.00),
(2,1,4,4.00),
(2,1,5,4.00),
(2,1,6,4.00),
(3,1,1,4.00),
(3,1,2,4.00),
(3,1,3,4.00),
(4,1,4,4.00),
(4,1,5,4.00),
(4,1,6,4.00),
(5,1,1,4.00),
(5,1,2,4.00),
(5,1,3,4.00),
(6,1,4,4.00),
(6,1,5,4.00),
(6,1,6,4.00),
(7,1,1,4.00),
(7,1,2,4.00),
(7,1,3,4.00),
(8,1,4,4.00),
(8,1,5,4.00),
(8,1,6,4.00),
(9,2,1,4.00),
(9,2,2,4.00),
(9,2,3,4.00),
(10,2,4,4.00),
(10,2,5,4.00),
(10,2,6,4.00),
(11,2,1,4.00),
(11,2,2,4.00),
(11,2,3,4.00),
(12,2,1,4.00),
(12,2,2,4.00),
(12,2,3,4.00),
(13,2,4,4.00),
(13,2,5,4.00),
(13,2,6,4.00),
(14,2,1,4.00),
(14,2,2,4.00),
(14,2,3,4.00),
(15,3,1,4.00),
(15,3,2,4.00),
(15,3,3,4.00),
(16,2,4,4.00),
(16,2,5,4.00),
(16,2,6,4.00),
(17,3,1,4.00),
(17,3,2,4.00),
(17,3,3,4.00),
(18,2,4,4.00),
(18,2,5,4.00),
(18,2,6,4.00),
(19,3,1,4.00),
(19,3,2,4.00),
(19,3,3,4.00),
(20,3,4,4.00),
(20,3,5,4.00),
(20,3,6,4.00),
(21,3,1,4.00),
(21,3,2,4.00),
(21,3,3,4.00),
(22,4,1,4.00),
(22,4,2,4.00),
(22,4,3,4.00),
(23,3,4,4.00),
(23,3,5,4.00),
(23,3,6,4.00),
(24,4,1,4.00),
(24,4,2,4.00),
(24,4,3,4.00),
(25,3,4,4.00),
(25,3,5,4.00),
(25,3,6,4.00),
(26,4,1,4.00),
(26,4,2,4.00),
(26,4,3,4.00),
(27,4,1,4.00),
(27,4,2,4.00),
(27,4,3,4.00),
(28,4,4,4.00),
(28,4,5,4.00),
(28,4,6,4.00),
(29,5,1,4.00),
(29,5,2,4.00),
(29,5,3,4.00),
(30,4,4,4.00),
(30,4,5,4.00),
(30,4,6,4.00),
(31,5,1,4.00),
(31,5,2,4.00),
(31,5,3,4.00),
(32,5,1,4.00),
(32,5,2,4.00),
(32,5,3,4.00),
(33,4,4,4.00),
(33,4,5,4.00),
(33,4,6,4.00),
(34,5,1,4.00),
(34,5,2,4.00),
(34,5,3,4.00),
(35,4,4,4.00),
(35,4,5,4.00),
(35,4,6,4.00),
(36,6,1,4.00),
(36,6,2,4.00),
(36,6,3,4.00),
(37,6,1,4.00),
(37,6,2,4.00),
(37,6,3,4.00),
(38,5,4,4.00),
(38,5,5,4.00),
(38,5,6,4.00),
(39,6,1,4.00),
(39,6,2,4.00),
(39,6,3,4.00),
(40,5,4,4.00),
(40,5,5,4.00),
(40,5,6,4.00),
(41,6,1,4.00),
(41,6,2,4.00),
(41,6,3,4.00),
(42,5,4,4.00),
(42,5,5,4.00),
(42,5,6,4.00),
(43,2,1,4.00),
(43,2,2,4.00),
(43,2,3,4.00),
(44,5,4,4.00),
(44,5,5,4.00),
(44,5,6,4.00),
(45,3,1,4.00),
(45,3,2,4.00),
(45,3,3,4.00),
(46,6,4,4.00),
(46,6,5,4.00),
(46,6,6,4.00),
(47,4,1,4.00),
(47,4,2,4.00),
(47,4,3,4.00),
(48,5,1,4.00),
(48,5,2,4.00),
(48,5,3,4.00),
(49,6,4,4.00),
(49,6,5,4.00),
(49,6,6,4.00),
(50,6,1,4.00),
(50,6,2,4.00),
(50,6,3,4.00),
(51,6,4,4.00),
(51,6,5,4.00),
(51,6,6,4.00),
(52,7,1,4.00),
(52,7,2,4.00),
(52,7,3,4.00),
(53,7,1,4.00),
(53,7,2,4.00),
(53,7,3,4.00),
(54,6,4,4.00),
(54,6,5,4.00),
(54,6,6,4.00),
(55,7,1,4.00),
(55,7,2,4.00),
(55,7,3,4.00),
(56,7,4,4.00),
(56,7,5,4.00),
(56,7,6,4.00),
(57,7,1,4.00),
(57,7,2,4.00),
(57,7,3,4.00),
(58,7,1,4.00),
(58,7,2,4.00),
(58,7,3,4.00),
(59,7,4,4.00),
(59,7,5,4.00),
(59,7,6,4.00),
(60,8,1,4.00),
(60,8,2,4.00),
(60,8,3,4.00),
(61,7,4,4.00),
(61,7,5,4.00),
(61,7,6,4.00),
(62,8,1,4.00),
(62,8,2,4.00),
(62,8,3,4.00),
(63,7,4,4.00),
(63,7,5,4.00),
(63,7,6,4.00);
/*!40000 ALTER TABLE `invoice_grn_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `action_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `action_user_id` (`action_user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `item_ibfk_2` FOREIGN KEY (`action_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `item_ibfk_3` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES
(1,'Brake Pads',1,1,1,1),
(2,'Oil Filter',2,1,2,1),
(3,'Air Filter',3,1,3,1),
(4,'Spark Plugs',4,1,4,1),
(5,'Timing Belt',5,1,5,1),
(6,'Headlight Bulb',6,1,6,1),
(7,'Windshield Wipers',7,1,7,1),
(8,'Fuel Pump',8,1,8,1),
(9,'Radiator',9,1,9,1),
(10,'Alternator',10,1,10,1);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_model`
--

DROP TABLE IF EXISTS `item_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_model` (
  `item_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  PRIMARY KEY (`item_id`,`model_id`),
  KEY `model_id` (`model_id`),
  CONSTRAINT `item_model_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `model` (`model_id`),
  CONSTRAINT `item_model_item_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_model`
--

LOCK TABLES `item_model` WRITE;
/*!40000 ALTER TABLE `item_model` DISABLE KEYS */;
INSERT INTO `item_model` VALUES
(1,1),
(1,4),
(1,7),
(1,10),
(1,13),
(2,2),
(2,5),
(2,8),
(2,11),
(3,3),
(3,6),
(3,9),
(4,7),
(4,8),
(4,14),
(5,9),
(5,10),
(5,12),
(5,15),
(6,2),
(6,11),
(6,12),
(6,13),
(7,13),
(7,14),
(7,15),
(8,1),
(8,3),
(8,5),
(8,7),
(8,15),
(9,2),
(9,3),
(9,4),
(10,4),
(10,5),
(10,6),
(10,7),
(10,8);
/*!40000 ALTER TABLE `item_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `make`
--

DROP TABLE IF EXISTS `make`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `make` (
  `make_id` int(11) NOT NULL,
  `make_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`make_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `make_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `make`
--

LOCK TABLES `make` WRITE;
/*!40000 ALTER TABLE `make` DISABLE KEYS */;
INSERT INTO `make` VALUES
(1,'Toyota',1),
(2,'Honda',1),
(3,'Ford',1),
(4,'Chevrolet',1),
(5,'Nissan',1);
/*!40000 ALTER TABLE `make` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model` (
  `model_id` int(11) NOT NULL,
  `make_id` int(11) NOT NULL,
  `model_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`model_id`),
  KEY `company_id` (`company_id`),
  KEY `make_id` (`make_id`),
  CONSTRAINT `model_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `model_ibfk_2` FOREIGN KEY (`make_id`) REFERENCES `make` (`make_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES
(1,1,'Corolla',1),
(2,1,'Camry',1),
(3,1,'Prius',1),
(4,2,'Civic',1),
(5,2,'Accord',1),
(6,2,'CR-V',1),
(7,3,'Focus',1),
(8,3,'Mustang',1),
(9,3,'Explorer',1),
(10,4,'Malibu',1),
(11,4,'Impala',1),
(12,4,'Equinox',1),
(13,5,'Altima',1),
(14,5,'Sentra',1),
(15,5,'Rogue',1);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sr`
--

DROP TABLE IF EXISTS `sr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sr` (
  `invoice_number` int(11) NOT NULL,
  `sr_number` int(11) NOT NULL,
  `sr_date` date NOT NULL,
  `is_canceled` tinyint(1) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL,
  `batch_no` int(11) NOT NULL,
  `action_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoice_number`),
  UNIQUE KEY `sr_number` (`sr_number`),
  KEY `action_user_id` (`action_user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `sr_ibfk_1` FOREIGN KEY (`action_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `sr_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sr`
--

LOCK TABLES `sr` WRITE;
/*!40000 ALTER TABLE `sr` DISABLE KEYS */;
/*!40000 ALTER TABLE `sr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sr_grn_item`
--

DROP TABLE IF EXISTS `sr_grn_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sr_grn_item` (
  `invoice_number` int(11) NOT NULL,
  `grn_number` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` decimal(7,2) NOT NULL,
  PRIMARY KEY (`invoice_number`,`grn_number`,`item_id`),
  KEY `grn_number` (`grn_number`,`item_id`),
  CONSTRAINT `sr_grn_item_ibfk_1` FOREIGN KEY (`invoice_number`) REFERENCES `sr` (`invoice_number`),
  CONSTRAINT `sr_grn_item_ibfk_2` FOREIGN KEY (`grn_number`, `item_id`) REFERENCES `grn_item` (`grn_number`, `item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sr_grn_item`
--

LOCK TABLES `sr_grn_item` WRITE;
/*!40000 ALTER TABLE `sr_grn_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `sr_grn_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `supplier` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(50) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`supplier_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES
(1,'Global Auto Parts',1),
(2,'Speedy Supplies',1),
(3,'Quality Car Parts',1),
(4,'Automotive Essentials',1),
(5,'Motor World',1),
(6,'AutoMax Supplies',1),
(7,'Prime Parts Co.',1),
(8,'Reliable Auto Components',1),
(9,'Super Auto Supplies',1),
(10,'Top Gear Parts',1);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_full_name` varchar(50) NOT NULL,
  `user_password` varchar(300) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'iuratnayake','Isira Uvindu Ratnayake','123',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'imsdb'
--

--
-- Dumping routines for database 'imsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-12 17:09:29

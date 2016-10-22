-- MySQL dump 10.13  Distrib 5.5.52, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: diaware
-- ------------------------------------------------------
-- Server version	5.5.52-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `diaware`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `diaware` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `diaware`;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `appointments` (
  `centreId` varchar(255) DEFAULT NULL,
  `appointmentId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `dayOfTheWeek` varchar(255) DEFAULT NULL,
  `appointmentType` varchar(255) DEFAULT NULL,
  `tmtMachine` varchar(255) DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `oneTimeAppointment` tinyint(1) DEFAULT '0',
  `present` tinyint(1) DEFAULT NULL,
  `billingDone` tinyint(1) DEFAULT '0',
  `monitoringDone` tinyint(1) DEFAULT '0',
  `treatmentConsumptionAdded` tinyint(1) DEFAULT '0',
  `processComplete` tinyint(1) DEFAULT '0',
  `cancelled` tinyint(1) DEFAULT '0',
  `allBillsCleared` tinyint(1) DEFAULT '0',
  `billingRemarks` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`appointmentId`),
  KEY `centreId` (`centreId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=302 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('JP1',19,'2016-09-05','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,1,1,1,1,1,0,1,NULL,'2016-09-05 14:19:26','2016-09-05 14:30:37'),('JP1',20,'2016-09-12','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',21,'2016-09-19','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',22,'2016-09-26','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',23,'2016-10-03','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',24,'2016-10-10','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',25,'2016-10-17','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',26,'2016-10-24','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',27,'2016-10-31','Monday','OPD','NegativeMachine','JP1-2016-3',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',28,'2016-09-06','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',29,'2016-09-13','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',30,'2016-09-20','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',31,'2016-09-27','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',32,'2016-10-04','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',33,'2016-10-11','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',34,'2016-10-18','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',35,'2016-10-25','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',36,'2016-11-01','Tuesday','OPD','NegativeMachine','JP1-2016-3',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-05 14:19:26','2016-09-05 14:19:26'),('7Med Banaras',37,'2016-09-11','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',38,'2016-09-18','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',39,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',40,'2016-10-02','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',41,'2016-10-09','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',42,'2016-10-16','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',43,'2016-10-23','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',44,'2016-10-30','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',45,'2016-11-06','Sunday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',46,'2016-09-12','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',47,'2016-09-19','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',48,'2016-09-26','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',49,'2016-10-03','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',50,'2016-10-10','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',51,'2016-10-17','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',52,'2016-10-24','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',53,'2016-10-31','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',54,'2016-11-07','Monday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',55,'2016-09-16','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',56,'2016-09-23','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',57,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',58,'2016-10-07','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',59,'2016-10-14','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',60,'2016-10-21','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',61,'2016-10-28','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',62,'2016-11-04','Friday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',63,'2016-09-10','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,1,1,1,1,1,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 17:30:03'),('7Med Banaras',64,'2016-09-17','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,1,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-17 10:26:22'),('7Med Banaras',65,'2016-09-24','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',66,'2016-10-01','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',67,'2016-10-08','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',68,'2016-10-15','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',69,'2016-10-22','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',70,'2016-10-29','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',71,'2016-11-05','Saturday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',72,'2016-09-13','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',73,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,1,1,1,0,0,0,1,NULL,'2016-09-10 07:36:10','2016-10-20 08:27:37'),('7Med Banaras',74,'2016-09-27','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',75,'2016-10-04','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',76,'2016-10-11','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',77,'2016-10-18','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',78,'2016-10-25','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',79,'2016-11-01','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',80,'2016-11-08','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',81,'2016-09-14','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',82,'2016-09-21','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',83,'2016-09-28','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',84,'2016-10-05','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',85,'2016-10-12','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',86,'2016-10-19','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',87,'2016-10-26','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',88,'2016-11-02','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',89,'2016-09-15','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',90,'2016-09-22','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',91,'2016-09-29','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',92,'2016-10-06','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',93,'2016-10-13','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',94,'2016-10-20','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',95,'2016-10-27','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',96,'2016-11-03','Thursday','OPD','NegativeMachine','7Med Banaras-2016-5',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',97,'2016-09-11','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',98,'2016-09-18','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',99,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',100,'2016-10-02','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',101,'2016-10-09','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',102,'2016-10-16','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',103,'2016-10-23','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',104,'2016-10-30','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',105,'2016-11-06','Sunday','OPD','NegativeMachine','7Med Banaras-2016-6',3,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',106,'2016-09-16','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',107,'2016-09-23','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',108,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',109,'2016-10-07','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',110,'2016-10-14','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',111,'2016-10-21','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',112,'2016-10-28','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',113,'2016-11-04','Friday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',114,'2016-09-12','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',115,'2016-09-19','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',116,'2016-09-26','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',117,'2016-10-03','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',118,'2016-10-10','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',119,'2016-10-17','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',120,'2016-10-24','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',121,'2016-10-31','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',122,'2016-11-07','Monday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',123,'2016-09-13','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',124,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',125,'2016-09-27','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',126,'2016-10-04','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',127,'2016-10-11','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',128,'2016-10-18','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',129,'2016-10-25','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',130,'2016-11-01','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',131,'2016-11-08','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',132,'2016-09-14','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',133,'2016-09-21','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',134,'2016-09-28','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',135,'2016-10-05','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',136,'2016-10-12','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',137,'2016-10-19','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',138,'2016-10-26','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',139,'2016-11-02','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',140,'2016-09-15','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',141,'2016-09-22','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',142,'2016-09-29','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',143,'2016-10-06','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',144,'2016-10-13','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',145,'2016-10-20','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',146,'2016-10-27','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',147,'2016-11-03','Thursday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',148,'2016-09-10','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,1,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:37:36'),('7Med Banaras',149,'2016-09-17','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,1,1,1,1,1,0,1,NULL,'2016-09-10 09:31:47','2016-09-17 07:37:37'),('7Med Banaras',150,'2016-09-24','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',151,'2016-10-01','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',152,'2016-10-08','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',153,'2016-10-15','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',154,'2016-10-22','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',155,'2016-10-29','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',156,'2016-11-05','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',157,'2016-09-10','Saturday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-10 09:37:54','2016-09-10 09:37:54'),('7Med Banaras',158,'2016-09-10','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,1,1,0,0,0,0,1,NULL,'2016-09-10 17:32:37','2016-09-10 17:33:54'),('7Med Banaras',159,'2016-09-17','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,1,1,1,0,0,0,1,NULL,'2016-09-10 17:32:37','2016-09-17 10:29:17'),('7Med Banaras',160,'2016-09-24','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',161,'2016-10-01','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',162,'2016-10-08','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',163,'2016-10-15','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',164,'2016-10-22','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',165,'2016-10-29','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',166,'2016-11-05','Saturday','OPD','BPositiveMachine','7Med Banaras-2016-4',1,0,NULL,0,0,0,0,0,0,NULL,'2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',193,'2016-09-26','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',194,'2016-10-03','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,1,1,0,0,0,0,1,NULL,'2016-09-20 05:40:58','2016-10-03 16:39:42'),('7Med Banaras',195,'2016-10-10','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',201,'2016-09-21','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',202,'2016-09-28','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',203,'2016-10-05','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',204,'2016-10-12','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',205,'2016-10-19','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',206,'2016-10-26','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',207,'2016-11-02','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',208,'2016-09-23','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',209,'2016-11-09','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',210,'2016-11-16','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',211,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',212,'2016-10-07','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',213,'2016-10-14','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',214,'2016-10-21','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',215,'2016-10-28','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',216,'2016-11-04','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',217,'2016-11-11','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',218,'2016-11-18','Friday','OPD','NegativeMachine','7Med Banaras-2016-7',2,0,NULL,0,0,0,0,0,0,NULL,'2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',219,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-7',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:42:30','2016-09-20 05:42:30'),('7Med Banaras',220,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:48:42','2016-09-20 05:48:42'),('7Med Banaras',221,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-7',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:48:47','2016-09-20 05:48:47'),('7Med Banaras',222,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:49:38','2016-09-20 05:49:38'),('7Med Banaras',223,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:49:45','2016-09-20 05:49:45'),('7Med Banaras',224,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:49:46','2016-09-20 05:49:46'),('7Med Banaras',225,'2016-09-20','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-20 05:49:47','2016-09-20 05:49:47'),('7Med Banaras',226,'2016-09-25','Sunday','OPD','BPositiveMachine','7Med Banaras-2016-4',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-25 09:18:40','2016-09-25 09:18:40'),('7Med Banaras',227,'2016-09-26','Monday','OPD','NegativeMachine','7Med Banaras-2016-2',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-25 09:23:55','2016-09-25 09:23:55'),('7Med Banaras',228,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-7',3,1,NULL,NULL,NULL,NULL,0,0,NULL,NULL,'2016-09-25 10:25:41','2016-09-25 10:25:41'),('7Med Banaras',229,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-7',1,1,1,1,NULL,NULL,0,0,1,NULL,'2016-09-25 10:26:06','2016-09-25 10:30:02'),('7Med Banaras',230,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-1',3,1,NULL,NULL,NULL,NULL,0,0,NULL,NULL,'2016-09-25 10:37:21','2016-09-25 10:37:21'),('7Med Banaras',231,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-1',3,1,NULL,NULL,NULL,NULL,0,0,NULL,NULL,'2016-09-25 10:37:46','2016-09-25 10:37:46'),('7Med Banaras',232,'2016-11-11','Friday','OPD','NegativeMachine','7Med Banaras-2016-1',3,1,0,0,0,0,0,0,0,NULL,'2016-09-25 10:47:50','2016-09-25 10:47:50'),('7Med Banaras',233,'2016-09-25','Sunday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-25 11:05:33','2016-09-25 11:05:33'),('7Med Banaras',234,'2016-09-27','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-1',2,1,0,0,0,0,0,0,0,NULL,'2016-09-25 12:50:51','2016-09-25 12:50:51'),('7Med Banaras',235,'2016-09-27','Tuesday','OPD','NegativeMachine','7Med Banaras-2016-2',1,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:17:38','2016-09-29 12:17:38'),('7Med Banaras',236,'2016-09-24','Saturday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:19:40','2016-09-29 12:19:40'),('7Med Banaras',237,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:04','2016-09-29 12:20:04'),('7Med Banaras',238,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:13','2016-09-29 12:20:13'),('7Med Banaras',239,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:15','2016-09-29 12:20:15'),('7Med Banaras',240,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:29','2016-09-29 12:20:29'),('7Med Banaras',241,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:32','2016-09-29 12:20:32'),('7Med Banaras',242,'2016-09-30','Friday','OPD','NegativeMachine','7Med Banaras-2016-2',2,1,0,0,0,0,0,0,0,NULL,'2016-09-29 12:20:34','2016-09-29 12:20:34'),('JP1',243,'2016-09-30','Friday','OPD','NegativeMachine','JP1-2016-3',2,1,0,0,0,0,0,0,0,NULL,'2016-09-30 17:35:53','2016-09-30 17:35:53'),('JP1',244,'2016-09-30','Friday','OPD','NegativeMachine','JP1-2016-3',2,1,0,0,0,0,0,0,0,NULL,'2016-09-30 17:37:31','2016-09-30 17:37:31'),('JP1',245,'2016-09-30','Friday','OPD','NegativeMachine','JP1-2016-4',3,1,0,0,0,0,0,0,0,NULL,'2016-10-01 06:17:51','2016-10-01 06:17:51'),('7Med Banaras',246,'2016-10-05','Wednesday','OPD','NegativeMachine','7Med Banaras-2016-6',3,1,0,0,0,0,0,0,0,NULL,'2016-10-01 07:22:10','2016-10-01 07:22:10'),('7Med Banaras',247,'2016-10-01','Saturday','OPD','NegativeMachine','7Med Banaras-2016-2',3,1,1,0,0,0,0,0,0,NULL,'2016-10-01 07:22:46','2016-10-01 07:23:01'),('7Med Banaras',248,'2016-10-03','Monday','OPD','NegativeMachine','7Med Banaras-2016-2',3,1,1,0,0,0,0,0,0,NULL,'2016-10-03 16:08:54','2016-10-03 16:09:19'),('7Med Banaras',249,'2016-10-17','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,1,1,0,0,0,0,1,NULL,'2016-10-17 05:08:18','2016-10-17 05:12:33'),('7Med Banaras',250,'2016-10-24','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',251,'2016-10-31','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',252,'2016-11-07','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',253,'2016-11-14','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',254,'2016-11-21','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',255,'2016-11-28','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',256,'2016-12-05','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med Banaras',257,'2016-12-12','Monday','OPD','NegativeMachine','7Med Banaras-2016-7',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med_Gurgaon',258,'2016-10-24','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',259,'2016-10-31','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',260,'2016-11-07','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',261,'2016-11-14','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',262,'2016-11-21','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',263,'2016-11-28','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',264,'2016-12-05','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',265,'2016-12-12','Monday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',266,'2016-10-19','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',267,'2016-10-26','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',268,'2016-11-02','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',269,'2016-11-09','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',270,'2016-11-16','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',271,'2016-11-23','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',272,'2016-11-30','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',273,'2016-10-21','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',274,'2016-12-07','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',275,'2016-12-14','Wednesday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',276,'2016-10-28','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',277,'2016-11-04','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',278,'2016-11-11','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',279,'2016-11-18','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',280,'2016-11-25','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',281,'2016-12-02','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',282,'2016-12-09','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',283,'2016-12-16','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-1',2,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',284,'2016-10-18','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,1,1,1,0,0,0,1,NULL,'2016-10-18 07:41:19','2016-10-18 08:00:16'),('7Med_Gurgaon',285,'2016-10-25','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',286,'2016-11-01','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',287,'2016-11-08','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',288,'2016-11-15','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',289,'2016-11-22','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',290,'2016-11-29','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',291,'2016-12-06','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',292,'2016-12-13','Tuesday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',293,'2016-10-21','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',294,'2016-10-28','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',295,'2016-11-04','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',296,'2016-11-11','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',297,'2016-11-18','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',298,'2016-11-25','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',299,'2016-12-02','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',300,'2016-12-09','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',301,'2016-12-16','Friday','OPD','NegativeMachine','7Med_Gurgaon-2016-2',1,0,NULL,0,0,0,0,0,0,NULL,'2016-10-18 07:41:19','2016-10-18 07:41:19');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billMaster`
--

DROP TABLE IF EXISTS `billMaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billMaster` (
  `billId` int(11) NOT NULL AUTO_INCREMENT,
  `appointmentId` int(11) NOT NULL,
  `appointmentDate` date DEFAULT NULL,
  `appointmentType` varchar(255) DEFAULT NULL,
  `modeOfPayment` varchar(255) DEFAULT NULL,
  `panelId` int(11) DEFAULT NULL,
  `additionalDiscount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `payableAmount` decimal(10,2) NOT NULL,
  `patientPayableAmount` decimal(10,2) NOT NULL,
  `amountPending` decimal(10,2) NOT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`billId`),
  KEY `appointmentId` (`appointmentId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `billMaster_ibfk_1` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`appointmentId`),
  CONSTRAINT `billMaster_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billMaster`
--

LOCK TABLES `billMaster` WRITE;
/*!40000 ALTER TABLE `billMaster` DISABLE KEYS */;
INSERT INTO `billMaster` VALUES (1,19,'2016-09-05','OPD','cash',NULL,0.00,'FullPaid',8750.00,8750.00,8750.00,0.00,'admin','2016-09-05 14:24:19','2016-09-05 14:25:11',NULL,'JP1-2016-3'),(2,19,'2016-09-05','OPD','cash',NULL,0.00,'FullPaid',250.00,250.00,250.00,0.00,'admin','2016-09-05 14:30:37','2016-09-05 14:30:37',NULL,'JP1-2016-3'),(3,63,'2016-09-10','OPD','cash',NULL,0.00,'FullPaid',1700.00,1700.00,1700.00,0.00,'admin','2016-09-10 11:42:02','2016-09-10 11:42:47',NULL,'7Med Banaras-2016-5'),(4,158,'2016-09-10','OPD','cash',NULL,0.00,'Due',400.00,400.00,400.00,100.00,'admin','2016-09-10 17:33:54','2016-09-10 17:33:54',NULL,'7Med Banaras-2016-4'),(5,149,'2016-09-17','OPD','cash',NULL,0.00,'FullPaid',1600.00,1600.00,1600.00,0.00,'admin','2016-09-17 07:37:10','2016-09-17 07:37:10',NULL,'7Med Banaras-2016-6'),(6,159,'2016-09-17','OPD','cash',NULL,0.00,'FullPaid',1600.00,1600.00,1600.00,0.00,'admin','2016-09-17 10:28:27','2016-09-17 10:28:27',NULL,'7Med Banaras-2016-4'),(7,229,'2016-09-25','OPD','cash',NULL,0.00,'FullPaid',400.00,400.00,400.00,0.00,'admin','2016-09-25 10:30:02','2016-09-25 10:30:02',NULL,'7Med Banaras-2016-7'),(8,194,'2016-10-03','OPD','cashless',2,0.00,'PartialPaid',400.00,400.00,360.00,40.00,'admin','2016-10-03 16:37:49','2016-10-03 16:37:49',NULL,'7Med Banaras-2016-7'),(9,194,'2016-10-03','OPD','cash',NULL,0.00,'FullPaid',400.00,400.00,400.00,0.00,'admin','2016-10-03 16:39:42','2016-10-03 16:39:42',NULL,'7Med Banaras-2016-7'),(10,249,'2016-10-17','OPD','cash',NULL,0.00,'FullPaid',2200.00,2200.00,2200.00,0.00,'admin','2016-10-17 05:12:33','2016-10-17 05:12:33',NULL,'7Med Banaras-2016-7'),(11,284,'2016-10-18','OPD','cash',NULL,0.00,'FullPaid',2200.00,2200.00,2200.00,0.00,'Devender','2016-10-18 07:46:54','2016-10-18 07:46:54',NULL,'7Med_Gurgaon-2016-2'),(12,73,'2016-09-20','IPD','cash',NULL,0.00,'FullPaid',400.00,400.00,400.00,0.00,'admin','2016-10-20 08:26:47','2016-10-20 08:26:47',NULL,'7Med Banaras-2016-5');
/*!40000 ALTER TABLE `billMaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `billId` int(11) NOT NULL,
  `transactionId` int(11) NOT NULL,
  `transactionType` varchar(255) DEFAULT NULL,
  `ledger` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`billId`,`transactionId`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`billId`) REFERENCES `billMaster` (`billId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,1,'Ttype 1','Ledger T1',25,6250.00,'2016-09-05 14:24:19','2016-09-05 14:24:19',NULL),(1,2,'Ttype 1','Ledger T1',10,2500.00,'2016-09-05 14:24:19','2016-09-05 14:24:19',NULL),(2,1,'Ttype 1','Ledger T1',1,250.00,'2016-09-05 14:30:37','2016-09-05 14:30:37',NULL),(3,1,'Dialysis','Reuse Dialysis',1,1100.00,'2016-09-10 11:42:02','2016-09-10 11:42:02',NULL),(3,2,'Pharmacy','EPO',1,600.00,'2016-09-10 11:42:02','2016-09-10 11:42:02',NULL),(4,1,'Catheter Kit','Femoral - Single Lumen',1,400.00,'2016-09-10 17:33:54','2016-09-10 17:33:54',NULL),(5,1,'Dialysis','Re-Use Dialysis',1,1600.00,'2016-09-17 07:37:10','2016-09-17 07:37:10',NULL),(6,1,'Dialysis','Re-Use Dialysis',1,1600.00,'2016-09-17 10:28:27','2016-09-17 10:28:27',NULL),(7,1,'Catheter Kit','Femoral - Single Lumen',1,400.00,'2016-09-25 10:30:02','2016-09-25 10:30:02',NULL),(8,1,'Catheter Kit','Femoral - Single Lumen',1,400.00,'2016-10-03 16:37:49','2016-10-03 16:37:49',NULL),(9,1,'Catheter Kit','Femoral - Single Lumen',1,400.00,'2016-10-03 16:39:42','2016-10-03 16:39:42',NULL),(10,1,'Dialysis','Single Use Dialysis',1,2200.00,'2016-10-17 05:12:33','2016-10-17 05:12:33',NULL),(11,1,'Dialysis','Single Use Dialysis',1,2200.00,'2016-10-18 07:46:54','2016-10-18 07:46:54',NULL),(12,1,'Catheter Kit','Femoral - Single Lumen',1,400.00,'2016-10-20 08:26:47','2016-10-20 08:26:47',NULL);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catheterizationItems`
--

DROP TABLE IF EXISTS `catheterizationItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catheterizationItems` (
  `itemId` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`itemId`),
  CONSTRAINT `catheterizationItems_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catheterizationItems`
--

LOCK TABLES `catheterizationItems` WRITE;
/*!40000 ALTER TABLE `catheterizationItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `catheterizationItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centres`
--

DROP TABLE IF EXISTS `centres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centres` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `maxPatients` int(11) DEFAULT NULL,
  `accessLinesAvailable` varchar(500) DEFAULT NULL,
  `patientCount` int(11) DEFAULT '1',
  `noOfShiftsPerDay` int(11) NOT NULL,
  `typesOfMachinesAvailable` varchar(255) DEFAULT NULL,
  `OPDTotalNegativeMachines` int(11) DEFAULT NULL,
  `OPDTotalCPositiveMachines` int(11) DEFAULT NULL,
  `OPDTotalBPositiveMachines` int(11) DEFAULT NULL,
  `OPDTotalHIVMachines` int(11) DEFAULT NULL,
  `IPD_ICUTotalNegativeMachines` int(11) DEFAULT NULL,
  `IPD_ICUTotalCPositiveMachines` int(11) DEFAULT NULL,
  `IPD_ICUTotalBPositiveMachines` int(11) DEFAULT NULL,
  `IPD_ICUTotalHIVMachines` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centres`
--

LOCK TABLES `centres` WRITE;
/*!40000 ALTER TABLE `centres` DISABLE KEYS */;
INSERT INTO `centres` VALUES ('007','7Med Varanasi','Varanasi',200,'AVF,IJ,Femoral,Other',1,4,'NegativeMachines,BPositiveMachines,CPositiveMachines',6,NULL,1,NULL,1,NULL,NULL,NULL,'2016-09-09 11:33:01','2016-09-10 05:43:18'),('7Med Banaras','7Med Banaras','Banaras',200,'AVF,IJ',9,3,'NegativeMachines,BPositiveMachines,CPositiveMachines',10,1,2,NULL,1,NULL,NULL,NULL,'2016-09-09 11:44:24','2016-09-29 12:25:40'),('7Med Varanasi','7Med Varanasi','Varanasi',200,'AVF,IJ,Femoral,Other',2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-09-09 11:38:09','2016-09-09 12:21:47'),('7MED_07','7Med_Gurgaon','Gurgaon',110,'AVF,IJ,Femoral',1,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-18 05:26:56','2016-10-18 05:26:56'),('7Med_Gurgaon','7Med_Gurgaon','Gurgaon',110,'AVF,IJ,Femoral',6,3,'NegativeMachines,NegativeMachines,BPositiveMachines,BPositiveMachines,BPositiveMachines',6,NULL,NULL,NULL,0,NULL,NULL,NULL,'2016-10-18 05:33:22','2016-10-21 07:51:54'),('CH','chandigarh','chandigarh',50,'femoral,fistoral,IJ',1,4,'NegativeMachines',15,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-07-13 10:48:56','2016-07-13 10:48:56'),('JP1','Apex Jaipur','malviya nagar',50,'femoral,fistoral,IJ,central',5,3,'NegativeMachines',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-07-13 10:48:56','2016-09-09 12:08:35');
/*!40000 ALTER TABLE `centres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumption`
--

DROP TABLE IF EXISTS `consumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consumption` (
  `centreId` varchar(255) NOT NULL,
  `treatmentDate` datetime DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `treatmentType` varchar(255) DEFAULT NULL,
  `treatmentId` bigint(20) NOT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`treatmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumption`
--

LOCK TABLES `consumption` WRITE;
/*!40000 ALTER TABLE `consumption` DISABLE KEYS */;
INSERT INTO `consumption` VALUES ('JP1','2016-09-05 00:00:00','JP1-2016-3','Reuse',19,'admin','2016-09-05 14:29:07','2016-09-05 14:29:07'),('7Med Banaras','2016-09-10 00:00:00','7Med Banaras-2016-5','Reuse',63,'Ratnakar','2016-09-10 17:30:03','2016-09-10 17:30:03'),('7Med Banaras','2016-09-17 00:00:00','7Med Banaras-2016-6','Reuse',149,'admin','2016-09-17 07:20:40','2016-09-17 07:20:40'),('7Med Banaras','2016-09-10 00:00:00','7Med Banaras-2016-4','Catheterization Single Lumen',158,'admin','2016-09-10 17:34:54','2016-09-10 17:34:54');
/*!40000 ALTER TABLE `consumption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumptionItems`
--

DROP TABLE IF EXISTS `consumptionItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consumptionItems` (
  `treatmentId` bigint(20) NOT NULL DEFAULT '0',
  `itemId` bigint(20) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`treatmentId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `consumptionItems_ibfk_1` FOREIGN KEY (`treatmentId`) REFERENCES `consumption` (`treatmentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consumptionItems_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumptionItems`
--

LOCK TABLES `consumptionItems` WRITE;
/*!40000 ALTER TABLE `consumptionItems` DISABLE KEYS */;
INSERT INTO `consumptionItems` VALUES (19,1,0,'admin','2016-09-05 14:29:07','2016-09-05 14:29:07'),(149,2,0,'admin','2016-09-17 07:20:40','2016-09-17 07:20:40');
/*!40000 ALTER TABLE `consumptionItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialysisCarePlan`
--

DROP TABLE IF EXISTS `dialysisCarePlan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dialysisCarePlan` (
  `patientId` varchar(255) NOT NULL,
  `carePlanId` int(11) NOT NULL AUTO_INCREMENT,
  `prescriptionDate` datetime DEFAULT NULL,
  `dryWeight` decimal(10,2) DEFAULT NULL,
  `dialysisDurationFirstTime` int(11) DEFAULT NULL,
  `dialysisDurationRegular` int(11) DEFAULT NULL,
  `BFR` decimal(10,2) DEFAULT NULL,
  `DFR` decimal(10,2) DEFAULT NULL,
  `UFR` decimal(10,2) DEFAULT NULL,
  `heparinFree` varchar(255) DEFAULT NULL,
  `heparinDosageBolus` int(11) DEFAULT NULL,
  `heparinDosageHourly` int(11) DEFAULT NULL,
  `dialysateType` varchar(255) DEFAULT NULL,
  `dialysateTemperature` decimal(10,2) DEFAULT NULL,
  `dialysateFrequencyPerWeek` int(11) DEFAULT NULL,
  `accessUsed` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`carePlanId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `dialysisCarePlan_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialysisCarePlan`
--

LOCK TABLES `dialysisCarePlan` WRITE;
/*!40000 ALTER TABLE `dialysisCarePlan` DISABLE KEYS */;
INSERT INTO `dialysisCarePlan` VALUES ('7Med Banaras-2016-5',1,'1970-01-01 00:00:00',55.00,2,4,300.00,500.00,100.00,'No',2000,800,NULL,29.00,6,'AVF','admin','2016-09-10 07:38:45','2016-09-10 12:22:04');
/*!40000 ALTER TABLE `dialysisCarePlan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialysisItems`
--

DROP TABLE IF EXISTS `dialysisItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dialysisItems` (
  `itemId` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`itemId`),
  CONSTRAINT `dialysisItems_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialysisItems`
--

LOCK TABLES `dialysisItems` WRITE;
/*!40000 ALTER TABLE `dialysisItems` DISABLE KEYS */;
INSERT INTO `dialysisItems` VALUES (2,'2016-09-17 07:20:08','2016-09-17 07:20:08'),(3,'2016-09-17 10:07:50','2016-09-17 10:07:50'),(8,'2016-09-17 10:07:59','2016-09-17 10:07:59'),(11,'2016-09-17 10:08:13','2016-09-17 10:08:13'),(12,'2016-09-17 10:08:26','2016-09-17 10:08:26'),(13,'2016-09-17 10:08:29','2016-09-17 10:08:29'),(17,'2016-09-17 10:08:35','2016-09-17 10:08:35'),(18,'2016-09-17 10:09:19','2016-09-17 10:09:19'),(19,'2016-09-17 10:08:43','2016-09-17 10:08:43'),(20,'2016-09-17 10:08:46','2016-09-17 10:08:46'),(21,'2016-09-17 10:08:48','2016-09-17 10:08:48'),(24,'2016-09-17 10:09:25','2016-09-17 10:09:25'),(27,'2016-09-17 10:09:28','2016-09-17 10:09:28'),(28,'2016-09-17 10:09:30','2016-09-17 10:09:30'),(31,'2016-09-17 10:09:33','2016-09-17 10:09:33'),(32,'2016-09-17 10:09:35','2016-09-17 10:09:35'),(38,'2016-09-17 10:09:37','2016-09-17 10:09:37'),(39,'2016-09-17 10:09:39','2016-09-17 10:09:39'),(42,'2016-09-17 10:09:47','2016-09-17 10:09:47'),(45,'2016-09-17 10:09:59','2016-09-17 10:09:59'),(46,'2016-09-17 10:10:01','2016-09-17 10:10:01'),(50,'2016-09-17 10:10:08','2016-09-17 10:10:08'),(53,'2016-09-17 10:10:11','2016-09-17 10:10:11'),(54,'2016-09-17 10:10:14','2016-09-17 10:10:14'),(55,'2016-09-17 10:10:21','2016-09-17 10:10:21'),(59,'2016-09-17 10:10:23','2016-09-17 10:10:23');
/*!40000 ALTER TABLE `dialysisItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialyzateTypes`
--

DROP TABLE IF EXISTS `dialyzateTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dialyzateTypes` (
  `dialyzateType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`dialyzateType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialyzateTypes`
--

LOCK TABLES `dialyzateTypes` WRITE;
/*!40000 ALTER TABLE `dialyzateTypes` DISABLE KEYS */;
INSERT INTO `dialyzateTypes` VALUES ('Dialysis Part A','2016-09-10 12:08:32','2016-09-10 12:08:32'),('Dialysis Part A - Potassium Free','2016-09-10 12:08:47','2016-09-10 12:08:47');
/*!40000 ALTER TABLE `dialyzateTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseases`
--

DROP TABLE IF EXISTS `diseases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diseases` (
  `diseaseName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`diseaseName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseases`
--

LOCK TABLES `diseases` WRITE;
/*!40000 ALTER TABLE `diseases` DISABLE KEYS */;
INSERT INTO `diseases` VALUES ('Chronic Kidney Failure','2016-09-10 12:13:59','2016-09-10 12:13:59'),('High Blood Pressure','2016-09-10 12:14:08','2016-09-10 12:14:08');
/*!40000 ALTER TABLE `diseases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floor`
--

DROP TABLE IF EXISTS `floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `floor` (
  `centreId` varchar(255) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `availableQuantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`centreId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `floor_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floor`
--

LOCK TABLES `floor` WRITE;
/*!40000 ALTER TABLE `floor` DISABLE KEYS */;
INSERT INTO `floor` VALUES ('7Med_Gurgaon',2,5,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14'),('7Med_Gurgaon',16,4,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14'),('7Med_Gurgaon',18,10,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14');
/*!40000 ALTER TABLE `floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generalConsumption`
--

DROP TABLE IF EXISTS `generalConsumption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generalConsumption` (
  `centreId` varchar(255) NOT NULL,
  `generalConsumptionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`generalConsumptionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generalConsumption`
--

LOCK TABLES `generalConsumption` WRITE;
/*!40000 ALTER TABLE `generalConsumption` DISABLE KEYS */;
/*!40000 ALTER TABLE `generalConsumption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generalConsumptionItems`
--

DROP TABLE IF EXISTS `generalConsumptionItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `generalConsumptionItems` (
  `generalConsumptionId` bigint(20) NOT NULL DEFAULT '0',
  `itemId` bigint(20) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`generalConsumptionId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `generalConsumptionItems_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generalConsumptionItems`
--

LOCK TABLES `generalConsumptionItems` WRITE;
/*!40000 ALTER TABLE `generalConsumptionItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `generalConsumptionItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indent`
--

DROP TABLE IF EXISTS `indent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indent` (
  `centreId` varchar(255) NOT NULL,
  `indentId` int(11) NOT NULL AUTO_INCREMENT,
  `requestDate` datetime DEFAULT NULL,
  `requiredByDate` datetime DEFAULT NULL,
  `stockOrderTo` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`indentId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indent`
--

LOCK TABLES `indent` WRITE;
/*!40000 ALTER TABLE `indent` DISABLE KEYS */;
INSERT INTO `indent` VALUES ('7Med Banaras',1,'2016-09-10 17:09:19','2016-09-15 17:09:19','7Med Corporate Office','Received','admin','2016-09-10 17:21:59','2016-09-10 17:28:26'),('7Med_Gurgaon',2,'2016-10-18 05:58:13','2016-10-18 05:58:13','7Med Corporate Office','Received','Devender','2016-10-18 06:21:59','2016-10-18 06:37:09'),('7Med_Gurgaon',3,'2016-10-18 07:06:09','2016-10-18 07:06:09','7Med Corporate Office','Received','Devender','2016-10-18 07:09:31','2016-10-18 07:12:06');
/*!40000 ALTER TABLE `indent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indentItems`
--

DROP TABLE IF EXISTS `indentItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indentItems` (
  `indentId` int(11) NOT NULL DEFAULT '0',
  `itemId` bigint(20) NOT NULL DEFAULT '0',
  `linkedStatus` varchar(255) NOT NULL,
  `quantityRequired` int(11) DEFAULT NULL,
  `availableQuantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`indentId`,`itemId`,`linkedStatus`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `indentItems_ibfk_1` FOREIGN KEY (`indentId`) REFERENCES `indent` (`indentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `indentItems_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indentItems`
--

LOCK TABLES `indentItems` WRITE;
/*!40000 ALTER TABLE `indentItems` DISABLE KEYS */;
INSERT INTO `indentItems` VALUES (1,2,'Approved',600,0,'admin','2016-09-10 11:20:49','2016-09-10 17:27:41'),(1,2,'Raised',600,0,'admin','2016-09-10 11:20:49','2016-09-10 17:22:00'),(1,2,'Received',600,0,'admin','2016-09-10 11:20:49','2016-09-10 17:28:26'),(1,5,'Approved',2,0,'admin','2016-09-10 11:24:12','2016-09-10 17:27:41'),(1,5,'Raised',2,0,'admin','2016-09-10 11:24:12','2016-09-10 17:22:00'),(1,5,'Received',2,0,'admin','2016-09-10 11:24:12','2016-09-10 17:28:26'),(1,6,'Approved',100,0,'admin','2016-09-10 11:24:12','2016-09-10 17:27:41'),(1,6,'Raised',100,0,'admin','2016-09-10 11:24:12','2016-09-10 17:22:00'),(1,6,'Received',100,0,'admin','2016-09-10 11:24:12','2016-09-10 17:28:26'),(1,7,'Approved',12,0,'admin','2016-09-10 11:24:12','2016-09-10 17:27:41'),(1,7,'Raised',12,0,'admin','2016-09-10 11:24:12','2016-09-10 17:22:00'),(1,7,'Received',12,0,'admin','2016-09-10 11:24:12','2016-09-10 17:28:26'),(1,8,'Approved',50,0,'admin','2016-09-10 11:24:12','2016-09-10 17:27:41'),(1,8,'Raised',50,0,'admin','2016-09-10 11:24:12','2016-09-10 17:22:00'),(1,8,'Received',50,0,'admin','2016-09-10 11:24:12','2016-09-10 17:28:26'),(1,10,'Approved',20,0,'admin','2016-09-10 11:24:12','2016-09-10 17:27:41'),(1,10,'Raised',20,0,'admin','2016-09-10 11:24:12','2016-09-10 17:22:00'),(1,10,'Received',20,0,'admin','2016-09-10 11:24:12','2016-09-10 17:28:26'),(1,11,'Approved',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,11,'Raised',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,11,'Received',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,12,'Approved',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,12,'Raised',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,12,'Received',312,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,15,'Approved',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,15,'Raised',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,15,'Received',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,16,'Approved',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,16,'Raised',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,16,'Received',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,17,'Approved',200,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,17,'Raised',200,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,17,'Received',200,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,18,'Approved',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,18,'Raised',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,18,'Received',500,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,19,'Approved',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,19,'Raised',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,19,'Received',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,20,'Approved',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:27:41'),(1,20,'Raised',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:22:00'),(1,20,'Received',100,0,'admin','2016-09-10 11:32:26','2016-09-10 17:28:26'),(1,21,'Approved',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:41'),(1,21,'Raised',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,21,'Received',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:26'),(1,22,'Approved',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,22,'Raised',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,22,'Received',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:26'),(1,23,'Approved',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,23,'Raised',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,23,'Received',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:26'),(1,25,'Approved',7200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,25,'Raised',7200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,25,'Received',7200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:26'),(1,26,'Approved',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,26,'Raised',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,26,'Received',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,28,'Approved',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,28,'Raised',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,28,'Received',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,30,'Approved',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,30,'Raised',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,30,'Received',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,31,'Approved',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,31,'Raised',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,31,'Received',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,32,'Approved',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,32,'Raised',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,32,'Received',1200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,34,'Approved',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,34,'Raised',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,34,'Received',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,35,'Approved',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,35,'Raised',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,35,'Received',60,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,36,'Approved',24,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,36,'Raised',24,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,36,'Received',24,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,37,'Approved',21,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,37,'Raised',21,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,37,'Received',21,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,38,'Approved',168,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,38,'Raised',168,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:00'),(1,38,'Received',168,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,39,'Approved',216,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,39,'Raised',216,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,39,'Received',216,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,40,'Approved',12,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,40,'Raised',12,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,40,'Received',12,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,42,'Approved',150,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,42,'Raised',150,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,42,'Received',150,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,43,'Approved',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,43,'Raised',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,43,'Received',10,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,44,'Approved',100,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,44,'Raised',100,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,44,'Received',100,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,45,'Approved',350,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,45,'Raised',350,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,45,'Received',350,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,47,'Approved',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,47,'Raised',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,47,'Received',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,48,'Approved',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,48,'Raised',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,48,'Received',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,49,'Approved',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,49,'Raised',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,49,'Received',20,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,50,'Approved',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,50,'Raised',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,50,'Received',200,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,51,'Approved',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,51,'Raised',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,51,'Received',15,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,53,'Approved',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,53,'Raised',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,53,'Received',300,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(1,54,'Approved',600,0,'admin','2016-09-10 12:07:44','2016-09-10 17:27:42'),(1,54,'Raised',600,0,'admin','2016-09-10 12:07:44','2016-09-10 17:22:01'),(1,54,'Received',600,0,'admin','2016-09-10 12:07:44','2016-09-10 17:28:27'),(2,2,'Approved',152,0,'Devender','2016-09-10 11:20:49','2016-10-18 06:28:18'),(2,2,'Raised',152,0,'Devender','2016-09-10 11:20:49','2016-10-18 06:22:00'),(2,2,'Received',152,0,'Devender','2016-09-10 11:20:49','2016-10-18 06:37:09'),(2,7,'Approved',9,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:28:18'),(2,7,'Raised',9,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:22:00'),(2,7,'Received',9,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:37:10'),(2,8,'Approved',25,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:28:18'),(2,8,'Raised',25,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:22:00'),(2,8,'Received',25,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:37:10'),(2,9,'Approved',3,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:28:18'),(2,9,'Raised',3,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:22:00'),(2,9,'Received',3,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:37:10'),(2,10,'Approved',19,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:28:18'),(2,10,'Raised',19,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:22:01'),(2,10,'Received',19,0,'Devender','2016-09-10 11:24:12','2016-10-18 06:37:10'),(2,15,'Approved',498,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,15,'Raised',498,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:00'),(2,15,'Received',498,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,16,'Approved',400,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,16,'Raised',400,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:00'),(2,16,'Received',400,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,17,'Approved',23,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,17,'Raised',23,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:01'),(2,17,'Received',23,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,18,'Approved',300,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,18,'Raised',300,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:01'),(2,18,'Received',300,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,19,'Approved',100,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,19,'Raised',100,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:01'),(2,19,'Received',100,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,20,'Approved',96,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:28:18'),(2,20,'Raised',96,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:22:01'),(2,20,'Received',96,0,'Devender','2016-09-10 11:32:26','2016-10-18 06:37:10'),(2,21,'Approved',182,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,21,'Raised',182,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:02'),(2,21,'Received',182,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,22,'Approved',9,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,22,'Raised',9,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:02'),(2,22,'Received',9,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,25,'Approved',6800,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,25,'Raised',6800,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:02'),(2,25,'Received',6800,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,26,'Approved',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,26,'Raised',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:02'),(2,26,'Received',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,27,'Approved',25,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,27,'Raised',25,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:03'),(2,27,'Received',25,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,28,'Approved',349,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:18'),(2,28,'Raised',349,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:03'),(2,28,'Received',349,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,30,'Approved',26,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,30,'Raised',26,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:04'),(2,30,'Received',26,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,31,'Approved',177,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,31,'Raised',177,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:04'),(2,31,'Received',177,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,32,'Approved',350,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,32,'Raised',350,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:05'),(2,32,'Received',350,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,33,'Approved',1,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,33,'Raised',1,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:06'),(2,33,'Received',1,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,35,'Approved',48,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,35,'Raised',48,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:09'),(2,35,'Received',48,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,36,'Approved',12,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,36,'Raised',12,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:12'),(2,36,'Received',12,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,37,'Approved',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,37,'Raised',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:16'),(2,37,'Received',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,38,'Approved',324,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,38,'Raised',324,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:19'),(2,38,'Received',324,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,39,'Approved',216,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,39,'Raised',216,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:22'),(2,39,'Received',216,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,42,'Approved',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,42,'Raised',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:23'),(2,42,'Received',100,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,43,'Approved',2,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,43,'Raised',2,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:25'),(2,43,'Received',2,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,44,'Approved',96,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,44,'Raised',96,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:30'),(2,44,'Received',96,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,45,'Approved',93,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,45,'Raised',93,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:36'),(2,45,'Received',93,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,47,'Approved',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,47,'Raised',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:37'),(2,47,'Received',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,48,'Approved',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,48,'Raised',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:38'),(2,48,'Received',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,49,'Approved',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,49,'Raised',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:42'),(2,49,'Received',18,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,50,'Approved',98,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,50,'Raised',98,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:49'),(2,50,'Received',98,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,53,'Approved',40,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,53,'Raised',40,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:22:55'),(2,53,'Received',40,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:10'),(2,54,'Approved',30,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:28:19'),(2,54,'Raised',30,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:23:01'),(2,54,'Received',30,0,'Devender','2016-09-10 12:07:44','2016-10-18 06:37:11'),(3,54,'Approved',30,30,'Devender','2016-09-10 12:07:44','2016-10-18 07:09:59'),(3,54,'Raised',30,30,'Devender','2016-09-10 12:07:44','2016-10-18 07:09:32'),(3,54,'Received',30,30,'Devender','2016-09-10 12:07:44','2016-10-18 07:12:38'),(3,62,'Approved',152,0,'Devender','2016-10-18 06:52:25','2016-10-18 07:09:59'),(3,62,'Raised',152,0,'Devender','2016-10-18 06:52:25','2016-10-18 07:09:32'),(3,62,'Received',152,0,'Devender','2016-10-18 06:52:25','2016-10-18 07:12:38'),(3,63,'Approved',40,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:09:59'),(3,63,'Raised',40,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:09:32'),(3,63,'Received',40,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:12:39'),(3,64,'Approved',50,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:09:59'),(3,64,'Raised',50,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:09:31'),(3,64,'Received',50,0,'Devender','2016-10-18 07:06:35','2016-10-18 07:12:46');
/*!40000 ALTER TABLE `indentItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `itemId` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) DEFAULT NULL,
  `usageType` varchar(255) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `quantityMeasurementType` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Item 1','Treatment Specific','brand 1','pairs','admin','2016-09-05 14:28:42','2016-09-05 14:28:42'),(2,'Blood Tubing','Treatment Specific','Adfusion','pieces','admin','2016-09-10 11:20:49','2016-09-10 11:20:49'),(3,'Blood Tubing - 5008 HDF','Treatment Specific','Adfusion','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(4,'BACCILOL SPRAY 250ml','Treatment Specific','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(5,'Bacillol 5 Ltr. Refill Pack','General Stocks','NA','cans','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(6,'BAND AID','General Stocks','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(7,'Betadine Lotion 500 Ml','General Stocks','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(8,'B.T. SET','Treatment Specific','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(9,'HD Machine Disinfectant','General Stocks','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(10,'Cotton half KG rolls','General Stocks','NA','pieces','admin','2016-09-10 11:24:12','2016-09-10 11:24:12'),(11,'Dialyzers Single Use - 1.1','Treatment Specific','Fresenius - Fx5','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(12,'Dialyzers Re-Use','Treatment Specific','Fresenius 1.3','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(13,'Dialyzers High Flux','Treatment Specific',NULL,'pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(14,'Dialyser Port Caps','General Stocks','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(15,'DISP APRON','General Stocks','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(16,'DISP CAP','General Stocks','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(17,'Disposible Syringe 20ML with Needle','Treatment Specific','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(18,'Disposable Syringes 10ML Without Needle','Treatment Specific','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(19,'Disp Syringes 1 Ml X 30G','Treatment Specific','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(20,'Disp Syringes 2ML','Treatment Specific','NA','pieces','admin','2016-09-10 11:32:26','2016-09-10 11:32:26'),(21,'Disp Syringes 5 ML','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(22,'Double Lumen Catheter -Curved','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(23,'Double Lumen Catheter - Straight','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(24,'Dialysis On/Off Kit','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(25,'Examination Gloves - Non Sterile','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(26,'Face Mask','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(27,'Fistula Needle 17G','Treatment Specific','NA','pairs','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(28,'Fistula Needle 16G','Treatment Specific','NA','pairs','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(29,'RO Antiscalant','General Stocks','NA','cans','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(30,'Gauze Than','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(31,'Heparin 25000IU','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(32,'I.V. Set','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(33,'LEUCOPLAST 3 INCH','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(34,'LEUCOPLAST 3 INCH','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(35,'MICROPORE 1 INCH','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(36,'MICROPORE 2 INCH','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(37,'MICROPORE 3 INCH','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(38,'NS - 1000ML','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(39,'NA - 500ML','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(40,'Dialyzer disinfactant','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(41,'Salt Tablet','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(42,'Surgical Gloves Sterile','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(43,'Strilium/Handrub','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(44,'Surgical Blade','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(45,'Transducer Protector','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(46,'Cannula 16G','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(47,'Femoral Catheter - Straight','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(48,'Guide Wire','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(49,'Introducer Needle','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(50,'Gluck Strip','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(51,'Luco Band','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(52,'Dia-Safe','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(53,'Dialysate Part A','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(54,'Bicarbonate Powder Part B','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(55,'Dextrose 25%','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(56,'Xylocain','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(57,'Citric Acid','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(58,'Sodium Hypocloride','General Stocks','NA','cans','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(59,'Dialysate Part A - Potassium Free','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(60,'Hydrogen paroxide','General Stocks','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(61,'Suture Silk','Treatment Specific','NA','pieces','admin','2016-09-10 12:07:44','2016-09-10 12:07:44'),(62,'Re-Use Dialyzer 1.5','Treatment Specific','Nipro ELISIO 15L','pieces','admin','2016-10-18 06:52:25','2016-10-18 06:52:25'),(63,'Dialysate Part A - Dry','Treatment Specific',NULL,'pieces','admin','2016-10-18 07:06:35','2016-10-18 07:06:35'),(64,'EPO 4000 IU','Treatment Specific','Repoitin - Serum Pharma','pieces','admin','2016-10-18 07:06:35','2016-10-18 07:06:35'),(65,NULL,NULL,NULL,NULL,'admin','2016-10-18 07:06:35','2016-10-18 07:06:35');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ledgerTable`
--

DROP TABLE IF EXISTS `ledgerTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ledgerTable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ledgerType` varchar(255) NOT NULL,
  `ledgerName` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`cost`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledgerTable`
--

LOCK TABLES `ledgerTable` WRITE;
/*!40000 ALTER TABLE `ledgerTable` DISABLE KEYS */;
INSERT INTO `ledgerTable` VALUES (4,'Dialysis','Re-Use Dialysis',1600.00,'2016-09-10 12:10:51','2016-09-10 12:10:51'),(5,'Dialysis','Single Use Dialysis',2200.00,'2016-09-10 12:11:11','2016-09-10 12:11:11'),(6,'Dialysis','New Dialyser',1600.00,'2016-09-10 12:11:39','2016-09-10 12:11:39'),(7,'Catheter Kit','Femoral - Single Lumen',400.00,'2016-09-10 12:12:24','2016-09-10 12:12:24'),(8,'Catheter Kit','Femoral - Procedure',300.00,'2016-09-10 12:12:45','2016-09-10 12:12:45'),(9,'Dialysis','Re-use Dialysis - CGHS',1000.00,'2016-10-03 17:04:14','2016-10-03 17:04:14'),(10,'Dialysis','ESIC Gurgaon - Reuse',1400.00,'2016-10-18 07:26:37','2016-10-18 07:26:37');
/*!40000 ALTER TABLE `ledgerTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majorClinicalEvents`
--

DROP TABLE IF EXISTS `majorClinicalEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `majorClinicalEvents` (
  `patientId` varchar(255) NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `details` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `majorClinicalEvents_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majorClinicalEvents`
--

LOCK TABLES `majorClinicalEvents` WRITE;
/*!40000 ALTER TABLE `majorClinicalEvents` DISABLE KEYS */;
/*!40000 ALTER TABLE `majorClinicalEvents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalHistory`
--

DROP TABLE IF EXISTS `medicalHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicalHistory` (
  `patientId` varchar(255) NOT NULL,
  `diseaseName` varchar(255) NOT NULL,
  `diseasePresent` varchar(255) DEFAULT NULL,
  `doctorComments` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`patientId`,`diseaseName`),
  CONSTRAINT `medicalHistory_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalHistory`
--

LOCK TABLES `medicalHistory` WRITE;
/*!40000 ALTER TABLE `medicalHistory` DISABLE KEYS */;
INSERT INTO `medicalHistory` VALUES ('7Med Banaras-2016-7','Chronic Kidney Failure','Yes',NULL,'admin','2016-09-20 05:37:54','2016-09-20 05:37:54'),('7Med Banaras-2016-7','High Blood Pressure','Yes',NULL,'admin','2016-09-20 05:37:54','2016-09-20 05:37:54'),('7Med_Gurgaon-2016-1','Chronic Kidney Failure','Yes','CKD Stage 5','Devender','2016-10-18 07:34:46','2016-10-18 07:34:46'),('7Med_Gurgaon-2016-1','High Blood Pressure','Yes',NULL,'Devender','2016-10-18 07:34:46','2016-10-18 07:34:46'),('7Med_Gurgaon-2016-4','Chronic Kidney Failure','Yes',NULL,'Devender','2016-10-20 09:28:11','2016-10-20 09:28:11'),('7Med_Gurgaon-2016-4','High Blood Pressure','Yes',NULL,'Devender','2016-10-20 09:28:11','2016-10-20 09:28:11');
/*!40000 ALTER TABLE `medicalHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartIntra`
--

DROP TABLE IF EXISTS `monitoringChartIntra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartIntra` (
  `patientId` varchar(255) NOT NULL,
  `intraId` bigint(20) NOT NULL,
  `entryNumber` int(11) NOT NULL,
  `entryTime` int(11) DEFAULT NULL,
  `bp` decimal(10,2) DEFAULT NULL,
  `pr` decimal(10,2) DEFAULT NULL,
  `ap` decimal(10,2) DEFAULT NULL,
  `vp` decimal(10,2) DEFAULT NULL,
  `tmp` decimal(10,2) DEFAULT NULL,
  `ufr` decimal(10,2) DEFAULT NULL,
  `totalUF` decimal(10,2) DEFAULT NULL,
  `bfr` decimal(10,2) DEFAULT NULL,
  `ebf` decimal(10,2) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`intraId`,`entryNumber`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartIntra_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartIntra_ibfk_2` FOREIGN KEY (`intraId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartIntra`
--

LOCK TABLES `monitoringChartIntra` WRITE;
/*!40000 ALTER TABLE `monitoringChartIntra` DISABLE KEYS */;
INSERT INTO `monitoringChartIntra` VALUES ('7Med Banaras-2016-5',2,0,15,120.00,88.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'','admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,1,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med Banaras-2016-5',2,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-09-10 12:30:17','2016-09-10 12:30:17'),('7Med_Gurgaon-2016-2',5,0,0,0.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41'),('7Med_Gurgaon-2016-2',5,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Arif','2016-10-18 08:06:41','2016-10-18 08:06:41');
/*!40000 ALTER TABLE `monitoringChartIntra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPost`
--

DROP TABLE IF EXISTS `monitoringChartPost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPost` (
  `patientId` varchar(255) NOT NULL,
  `postId` bigint(20) NOT NULL,
  `postWeight` decimal(10,2) DEFAULT NULL,
  `weightLoss` decimal(10,2) DEFAULT NULL,
  `UFReading` int(11) DEFAULT NULL,
  `BPSitting` int(11) DEFAULT NULL,
  `BPStanding` int(11) DEFAULT NULL,
  `temperature` decimal(10,2) DEFAULT NULL,
  `pulse` decimal(10,2) DEFAULT NULL,
  `symptomaticHypotension` varchar(255) DEFAULT NULL,
  `prolongedBleeding` varchar(255) DEFAULT NULL,
  `bruit` varchar(255) DEFAULT NULL,
  `subjectiveStatement` varchar(255) DEFAULT NULL,
  `cardiacStatus` varchar(255) DEFAULT NULL,
  `respiratoryStatus` varchar(255) DEFAULT NULL,
  `mentalStatus` varchar(255) DEFAULT NULL,
  `ambulatoryStatus` varchar(255) DEFAULT NULL,
  `KtVAchieved` decimal(10,2) DEFAULT NULL,
  `EPODosage` int(11) DEFAULT NULL,
  `EPOGivenBy` varchar(255) DEFAULT NULL,
  `EPOSupply` varchar(255) DEFAULT NULL,
  `bloodTransfusion` varchar(255) DEFAULT NULL,
  `numberOfUnits` int(11) DEFAULT NULL,
  `bloodBankName` varchar(255) DEFAULT NULL,
  `concludedBy` varchar(255) DEFAULT NULL,
  `anyOtherComments` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPost_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPost`
--

LOCK TABLES `monitoringChartPost` WRITE;
/*!40000 ALTER TABLE `monitoringChartPost` DISABLE KEYS */;
INSERT INTO `monitoringChartPost` VALUES ('7Med Banaras-2016-5',2,56.00,5.00,120,105,140,98.00,120.00,'No','No','Yes','Good','Good','Good','Good','Good',0.00,NULL,NULL,NULL,'No',NULL,NULL,NULL,NULL,'admin','2016-09-10 12:35:29','2016-09-10 12:35:29'),('7Med_Gurgaon-2016-2',5,81.50,2.20,2,NULL,NULL,98.70,70.00,'No','No','Yes','Good','Good','20 per minute','Normal','Walking',NULL,4000,'Dr.Duryodhan','External',NULL,NULL,NULL,'Arif',NULL,'Arif','2016-10-18 08:07:27','2016-10-18 08:10:46');
/*!40000 ALTER TABLE `monitoringChartPost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPreAccessAssessment`
--

DROP TABLE IF EXISTS `monitoringChartPreAccessAssessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPreAccessAssessment` (
  `patientId` varchar(255) NOT NULL,
  `preBasicId` bigint(20) NOT NULL,
  `bruit` varchar(255) DEFAULT NULL,
  `anyAbnormality` varchar(255) DEFAULT NULL,
  `signOfAccessInfection` varchar(255) DEFAULT NULL,
  `cannulation` varchar(255) DEFAULT NULL,
  `centralLineStatus` varchar(255) DEFAULT NULL,
  `commencedBy` varchar(255) DEFAULT NULL,
  `assistedBy` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreAccessAssessment_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPreAccessAssessment_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreAccessAssessment`
--

LOCK TABLES `monitoringChartPreAccessAssessment` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreAccessAssessment` DISABLE KEYS */;
INSERT INTO `monitoringChartPreAccessAssessment` VALUES ('7Med Banaras-2016-5',2,'Good','No','No','no_problem','NormalFlow','Ratnakar','Raju','admin','2016-09-10 12:28:26','2016-09-10 12:28:26'),('7Med_Gurgaon-2016-2',5,'Good','No','No','no_problem','NormalFlow','Arif','NA','Arif','2016-10-18 08:05:33','2016-10-18 08:05:33');
/*!40000 ALTER TABLE `monitoringChartPreAccessAssessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPreAssessment`
--

DROP TABLE IF EXISTS `monitoringChartPreAssessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPreAssessment` (
  `patientId` varchar(255) NOT NULL,
  `preBasicId` bigint(20) NOT NULL,
  `preHDWeight` decimal(10,2) DEFAULT NULL,
  `lastPostHDWeight` decimal(10,2) DEFAULT NULL,
  `weightGain` decimal(10,2) DEFAULT NULL,
  `dryWeight` decimal(10,2) DEFAULT NULL,
  `targetWeightLoss` decimal(10,2) DEFAULT NULL,
  `physicalChestPain` varchar(255) DEFAULT NULL,
  `chestAuscultation` varchar(255) DEFAULT NULL,
  `recentSurgery` varchar(255) DEFAULT NULL,
  `peripheralOedema` varchar(255) DEFAULT NULL,
  `respiratoryStatus` varchar(255) DEFAULT NULL,
  `temperature` decimal(10,2) DEFAULT NULL,
  `pulse` decimal(10,2) DEFAULT NULL,
  `BPSitting` int(11) DEFAULT NULL,
  `BPStanding` int(11) DEFAULT NULL,
  `breakfastLunchDinner` varchar(255) DEFAULT NULL,
  `subjectiveStatement` varchar(255) DEFAULT NULL,
  `interdialyticComplaints` varchar(255) DEFAULT NULL,
  `ambulatoryStatus` varchar(255) DEFAULT NULL,
  `hypotension` varchar(255) DEFAULT NULL,
  `headache` varchar(255) DEFAULT NULL,
  `cramps` varchar(255) DEFAULT NULL,
  `vomiting` varchar(255) DEFAULT NULL,
  `fever` varchar(255) DEFAULT NULL,
  `rigor` varchar(255) DEFAULT NULL,
  `rash` varchar(255) DEFAULT NULL,
  `chest` varchar(255) DEFAULT NULL,
  `other` varchar(255) DEFAULT NULL,
  `dyspnea` varchar(255) DEFAULT NULL,
  `pruritus` varchar(255) DEFAULT NULL,
  `generalComments` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreAssessment_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPreAssessment_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreAssessment`
--

LOCK TABLES `monitoringChartPreAssessment` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreAssessment` DISABLE KEYS */;
INSERT INTO `monitoringChartPreAssessment` VALUES ('7Med Banaras-2016-5',2,61.00,55.00,6.00,55.00,6.00,'No','No','No','No','',NULL,NULL,NULL,NULL,'Yes','Good','No',NULL,'Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes','Yes',NULL,'admin','2016-09-10 12:21:49','2016-09-10 12:26:21'),('7Med_Gurgaon-2016-2',5,83.70,81.00,2.70,80.00,3.70,'No','Yes','No','No','20 per minute',98.00,64.00,110,70,'Yes','Good','No','Walking','No','No','No','No','No','No','No','No','No','No','No',NULL,'Arif','2016-10-18 08:04:40','2016-10-18 08:04:40');
/*!40000 ALTER TABLE `monitoringChartPreAssessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPreBasic`
--

DROP TABLE IF EXISTS `monitoringChartPreBasic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPreBasic` (
  `patientId` varchar(255) NOT NULL,
  `monitoringDate` datetime NOT NULL,
  `preBasicId` bigint(20) NOT NULL AUTO_INCREMENT,
  `machineNumber` int(11) DEFAULT NULL,
  `bedNumber` int(11) DEFAULT NULL,
  `leadTechnicianName` varchar(255) DEFAULT NULL,
  `prescribedDuration` int(11) DEFAULT NULL,
  `startTime` varchar(255) DEFAULT NULL,
  `endTime` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreBasic_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasic`
--

LOCK TABLES `monitoringChartPreBasic` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasic` DISABLE KEYS */;
INSERT INTO `monitoringChartPreBasic` VALUES ('JP1-2016-3','2016-09-05 00:00:00',1,2,2,'name',3,'12:23','14:22','admin','2016-09-05 14:27:57','2016-09-05 14:27:57'),('7Med Banaras-2016-5','2016-09-10 00:00:00',2,1,1,'Ratnakar',4,'07:00','11:00','admin','2016-09-10 12:17:04','2016-09-10 12:17:04'),('7Med Banaras-2016-6','2016-09-17 00:00:00',3,23,1,'someone',4,'10:00','14:00','admin','2016-09-17 07:37:37','2016-09-17 07:37:37'),('7Med Banaras-2016-4','2016-09-17 00:00:00',4,1,1,'n',4,'10:00','14:00','admin','2016-09-17 10:29:17','2016-09-17 10:29:17'),('7Med_Gurgaon-2016-2','2016-10-18 00:00:00',5,4,4,'Arif',4,'07:50','11:50','Arif','2016-10-18 08:00:16','2016-10-18 08:00:16'),('7Med Banaras-2016-5','2016-09-20 00:00:00',6,12,87,'kjds',4,'12:11','13:22','admin','2016-10-20 08:27:37','2016-10-20 08:27:37');
/*!40000 ALTER TABLE `monitoringChartPreBasic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPreBasicMedical`
--

DROP TABLE IF EXISTS `monitoringChartPreBasicMedical`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPreBasicMedical` (
  `patientId` varchar(255) NOT NULL,
  `preBasicId` bigint(20) NOT NULL,
  `dialyzerName` varchar(255) DEFAULT NULL,
  `dialyzerType` varchar(255) DEFAULT NULL,
  `accessUsed` varchar(255) DEFAULT NULL,
  `centralLineCreated` varchar(255) DEFAULT NULL,
  `centralLine` varchar(255) DEFAULT NULL,
  `anticoagulant` varchar(255) DEFAULT NULL,
  `bolusAmount` int(11) DEFAULT NULL,
  `hourlyHeparin` int(11) DEFAULT NULL,
  `heparinStopBefore` varchar(255) DEFAULT NULL,
  `NSFlushingFrequency` int(11) DEFAULT NULL,
  `NSFlushingVolume` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreBasicMedical_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPreBasicMedical_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasicMedical`
--

LOCK TABLES `monitoringChartPreBasicMedical` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasicMedical` DISABLE KEYS */;
INSERT INTO `monitoringChartPreBasicMedical` VALUES ('7Med Banaras-2016-5',2,'Dialyzer 1.1','SingleUse','AVF','No',NULL,'Yes',2000,800,NULL,8,100,'admin','2016-09-10 12:19:18','2016-09-10 12:19:18'),('7Med_Gurgaon-2016-2',5,'Elisio 1.5L','SingleUse','AVF','No',NULL,'Yes',5000,1000,NULL,0,0,'Arif','2016-10-18 08:01:42','2016-10-18 08:01:42');
/*!40000 ALTER TABLE `monitoringChartPreBasicMedical` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitoringChartPreMachineFinalCheck`
--

DROP TABLE IF EXISTS `monitoringChartPreMachineFinalCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitoringChartPreMachineFinalCheck` (
  `patientId` varchar(255) NOT NULL,
  `preBasicId` bigint(20) NOT NULL,
  `machineNumber` int(11) DEFAULT NULL,
  `machineTestPassed` varchar(255) DEFAULT NULL,
  `machineTestCheckedBy` varchar(255) DEFAULT NULL,
  `airDetector` varchar(255) DEFAULT NULL,
  `alarmLimits` varchar(255) DEFAULT NULL,
  `dialysateFlowRate` int(11) DEFAULT NULL,
  `dialysisCounterCurrentFlow` varchar(255) DEFAULT NULL,
  `dialysateTemperature` decimal(10,2) DEFAULT NULL,
  `conductivity` varchar(255) DEFAULT NULL,
  `partAConcentrationCombination` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreMachineFinalCheck_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPreMachineFinalCheck_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreMachineFinalCheck`
--

LOCK TABLES `monitoringChartPreMachineFinalCheck` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreMachineFinalCheck` DISABLE KEYS */;
INSERT INTO `monitoringChartPreMachineFinalCheck` VALUES ('7Med Banaras-2016-5',2,1,'Yes','Ratnakar','Yes','Yes',NULL,'Yes',35.00,'14','ca28k19na20','admin','2016-09-10 12:20:15','2016-09-10 12:20:15'),('7Med_Gurgaon-2016-2',5,4,'Yes','Arif','Yes','Yes',NULL,'Yes',35.00,'14','ca21k10na3','Arif','2016-10-18 08:02:35','2016-10-18 08:02:35');
/*!40000 ALTER TABLE `monitoringChartPreMachineFinalCheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otherDetails`
--

DROP TABLE IF EXISTS `otherDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otherDetails` (
  `patientId` varchar(255) NOT NULL,
  `PAN` varchar(255) DEFAULT NULL,
  `aadhar` varchar(255) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `otherCard1` varchar(255) DEFAULT NULL,
  `otherCard2` varchar(255) DEFAULT NULL,
  `otherCard3` varchar(255) DEFAULT NULL,
  `PANData` blob,
  `aadharData` blob,
  `passportData` blob,
  `otherCard1Data` blob,
  `otherCard2Data` blob,
  `otherCard3Data` blob,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`patientId`),
  CONSTRAINT `otherDetails_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otherDetails`
--

LOCK TABLES `otherDetails` WRITE;
/*!40000 ALTER TABLE `otherDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `otherDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panelDetails`
--

DROP TABLE IF EXISTS `panelDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panelDetails` (
  `patientId` varchar(255) NOT NULL,
  `panelId` bigint(20) NOT NULL,
  `panelPermissionDateFrom` datetime DEFAULT NULL,
  `panelPermissionDateTo` datetime DEFAULT NULL,
  `panelPermissionNumber` varchar(255) DEFAULT NULL,
  `totalTmtsPermitted` int(11) DEFAULT NULL,
  `totalTmtsRemaining` int(11) DEFAULT NULL,
  `renewalDate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`patientId`,`panelId`),
  KEY `panelId` (`panelId`),
  CONSTRAINT `panelDetails_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `panelDetails_ibfk_2` FOREIGN KEY (`panelId`) REFERENCES `panels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panelDetails`
--

LOCK TABLES `panelDetails` WRITE;
/*!40000 ALTER TABLE `panelDetails` DISABLE KEYS */;
INSERT INTO `panelDetails` VALUES ('7Med Banaras-2016-7',2,NULL,NULL,'111111',4,NULL,NULL,1,'admin','2016-09-20 05:36:42','2016-09-20 05:36:42'),('7Med_Gurgaon-2016-1',3,NULL,NULL,'6914749213',36,4,NULL,1,'Devender','2016-10-18 07:33:34','2016-10-18 07:33:34');
/*!40000 ALTER TABLE `panelDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `panels`
--

DROP TABLE IF EXISTS `panels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `panels` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panels`
--

LOCK TABLES `panels` WRITE;
/*!40000 ALTER TABLE `panels` DISABLE KEYS */;
INSERT INTO `panels` VALUES (2,'CGHS','CGHS panel for Apex Hospital',10.00,'2016-09-20 05:34:13','2016-09-20 05:34:13'),(3,'ESIC - Gurgaon Sec 9',NULL,NULL,'2016-10-18 07:24:58','2016-10-18 07:25:23');
/*!40000 ALTER TABLE `panels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patientDetails`
--

DROP TABLE IF EXISTS `patientDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patientDetails` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `alternativeContact` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bloodGroup` varchar(255) DEFAULT NULL,
  `transplantWaitingList` varchar(255) DEFAULT NULL,
  `maritalStatus` varchar(255) DEFAULT NULL,
  `emergencyContactName` varchar(255) DEFAULT NULL,
  `emergencyContactRelationship` varchar(255) DEFAULT NULL,
  `emergencyContactMobile` varchar(255) DEFAULT NULL,
  `hasChildren` varchar(255) DEFAULT NULL,
  `numberOfChildren` int(11) DEFAULT NULL,
  `childrenContact` varchar(255) DEFAULT NULL,
  `employementStatus` varchar(255) DEFAULT NULL,
  `officeName` varchar(255) DEFAULT NULL,
  `officeAddress` varchar(255) DEFAULT NULL,
  `otherClinicalDetails` varchar(255) DEFAULT NULL,
  `modeOfPayment` varchar(255) DEFAULT NULL,
  `referredBy` varchar(255) DEFAULT NULL,
  `doctorName` varchar(255) DEFAULT NULL,
  `viralMarkerStatus` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `centreId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `centreId` (`centreId`),
  CONSTRAINT `patientDetails_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patientDetails`
--

LOCK TABLES `patientDetails` WRITE;
/*!40000 ALTER TABLE `patientDetails` DISABLE KEYS */;
INSERT INTO `patientDetails` VALUES ('7Med Banaras-2016-1','test-user2',22,'1994-06-08 18:30:00','Male','Negative','9999102942','9798798247','jaipur','hell','A+','Yes','married',NULL,NULL,NULL,'Yes',2,NULL,NULL,NULL,NULL,NULL,'Cash','doc','Dr. lal','Yes','admin','2016-09-09 12:24:05','2016-09-09 12:24:05','7Med Banaras'),('7Med Banaras-2016-2','test-user1',20,'1996-08-31 18:30:00','Male','Negative','9999102942',NULL,'jaipur','jaiput','A+','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,'vikas','Yes','admin','2016-09-09 12:25:18','2016-09-09 12:25:18','7Med Banaras'),('7Med Banaras-2016-3','Raj',66,'1950-08-31 18:30:00','Male','Negative','9999999999',NULL,'Banaras','Banaras','A+','No','married','Vivek','Friend','9898989898','No',0,NULL,NULL,NULL,NULL,NULL,'Cash','Referred By','Ajay','Yes','admin','2016-09-09 14:07:47','2016-09-09 14:07:47','7Med Banaras'),('7Med Banaras-2016-4','Raj',66,'1950-08-31 18:30:00','Male','BPositive','9898989898',NULL,'New Delhi','104','A+','No',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,'Ajay','Yes','admin','2016-09-10 05:42:31','2016-09-10 07:35:20','7Med Banaras'),('7Med Banaras-2016-5','Pawan',28,'1987-08-28 18:30:00','Male','Negative',NULL,NULL,'Banaras','Hi','A-','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,'Ajay','Yes','admin','2016-09-10 07:32:26','2016-09-10 07:32:26','7Med Banaras'),('7Med Banaras-2016-6','Akash',1,'2015-08-31 18:30:00','Male','Negative',NULL,NULL,'Delhi','Delhi','A-','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,'Ajay','Yes','admin','2016-09-10 09:31:03','2016-09-10 09:31:03','7Med Banaras'),('7Med Banaras-2016-7','Dr.Virendra Kumar',52,'1964-08-31 18:30:00','Male','Negative',NULL,NULL,'Varanasi','Varanasi','B-','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Panel',NULL,'Ajay','Yes','admin','2016-09-20 05:35:30','2016-09-20 05:35:30','7Med Banaras'),('7Med Banaras-2016-8','shubham',20,'1995-10-15 18:30:00','Male','Negative',NULL,NULL,'delhi','delhi','A+','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Panel',NULL,'doc name','Yes','admin','2016-09-29 12:25:40','2016-09-29 12:25:40','7Med Banaras'),('7Med Varanasi-2016-1','test-user1',20,'1996-07-02 18:30:00','Male','Negative','9999102942','9900395732','jaipur','sector-2','A+','Yes','married',NULL,NULL,NULL,'Yes',1,'8974982728','salaried','l&T infotech','jaiput',NULL,'Cash','ajay','vikas','Yes','admin','2016-09-09 12:21:47','2016-09-09 12:21:47','7Med Varanasi'),('7Med_Gurgaon-2016-1','Ms.Jyoti',20,'1995-12-31 18:30:00','Female','Negative','8527703828',NULL,'Gurgaon','H.No. 174,/96, Gali No. 6H\nGandhi Nagar, \nGurgaon','O+','No','unmarried',NULL,NULL,NULL,'No',0,NULL,'unemployed',NULL,NULL,NULL,'Panel','Technician Arif','Dr.S.Srinivas','Yes','Devender','2016-10-18 07:23:47','2016-10-18 07:23:47','7Med_Gurgaon'),('7Med_Gurgaon-2016-2','Pradeep Kumar',51,'1964-12-31 18:30:00','Male','Negative','9811859222',NULL,'Gurgaon','490/9, Subhash Nagar\nGurgaon','A+','No','married',NULL,NULL,NULL,'Yes',0,NULL,'businessman',NULL,NULL,NULL,'Cash','Old patient','Dr.S.Srinivas','Yes','Devender','2016-10-18 07:39:52','2016-10-18 07:39:52','7Med_Gurgaon'),('7Med_Gurgaon-2016-4','Rajesh Kumar',48,'1968-01-05 18:30:00','Male','Negative','95822302751','7838474465','gurgaon','Nawada Fathepur Manasar Dist- Gurgaon','O+','No','married','vasudha','wife','9205623897','Yes',1,'92505623897','salaried',NULL,NULL,NULL,'Panel','old patient','dr. sashidhar srinivash','Yes','Devender','2016-10-20 09:25:57','2016-10-20 09:25:57','7Med_Gurgaon'),('7Med_Gurgaon-2016-5','Rajesh Kumar',48,'1968-01-05 18:30:00','Male','Negative','9582302791','7838474465','gurgaon','nowada fatypur dtt. gurgaon','O+','No','married','VASHUDHA','WIFE','9205623897','Yes',1,NULL,'salaried','M','INDA INDUSTRIES LTD',NULL,'Panel','Old patient','DR. SASHIDHAR SRINIVASH','Yes','devender','2016-10-21 07:51:54','2016-10-21 07:51:54','7Med_Gurgaon'),('JP1-2016-3','Test User',20,'1996-09-01 18:30:00','Male','Negative',NULL,NULL,'jaipur','home','A+','Yes',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,'doc name','Yes','admin','2016-09-05 14:18:05','2016-09-05 14:18:05','JP1'),('JP1-2016-4','test-user2',19,'1997-01-08 18:30:00','Male','Negative','9999102942','9990929729','hello','aads','A+','Yes','married',NULL,NULL,NULL,'Yes',1,'9787429272','salaried','l&T infotech','bhopal','','Cash','ref-1','Dr. lal','Yes','admin','2016-09-09 12:08:35','2016-09-09 12:08:35','JP1');
/*!40000 ALTER TABLE `patientDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedulePatients`
--

DROP TABLE IF EXISTS `schedulePatients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedulePatients` (
  `centreId` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `appointmentType` varchar(255) DEFAULT NULL,
  `tmtMachine` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `centreId` (`centreId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `schedulePatients_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`),
  CONSTRAINT `schedulePatients_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedulePatients`
--

LOCK TABLES `schedulePatients` WRITE;
/*!40000 ALTER TABLE `schedulePatients` DISABLE KEYS */;
INSERT INTO `schedulePatients` VALUES ('JP1',3,'JP1-2016-3','Monday',1,'OPD','NegativeMachine','2016-09-05 14:19:26','2016-09-05 14:19:26'),('JP1',4,'JP1-2016-3','Tuesday',3,'OPD','NegativeMachine','2016-09-05 14:19:26','2016-09-05 14:19:26'),('7Med Banaras',5,'7Med Banaras-2016-5','Sunday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',6,'7Med Banaras-2016-5','Monday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',7,'7Med Banaras-2016-5','Tuesday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',8,'7Med Banaras-2016-5','Wednesday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',9,'7Med Banaras-2016-5','Thursday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',10,'7Med Banaras-2016-5','Friday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',11,'7Med Banaras-2016-5','Saturday',1,'OPD','NegativeMachine','2016-09-10 07:36:10','2016-09-10 07:36:10'),('7Med Banaras',12,'7Med Banaras-2016-6','Sunday',3,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',13,'7Med Banaras-2016-6','Monday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',14,'7Med Banaras-2016-6','Tuesday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',15,'7Med Banaras-2016-6','Wednesday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',16,'7Med Banaras-2016-6','Thursday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',17,'7Med Banaras-2016-6','Friday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',18,'7Med Banaras-2016-6','Saturday',2,'OPD','NegativeMachine','2016-09-10 09:31:47','2016-09-10 09:31:47'),('7Med Banaras',19,'7Med Banaras-2016-4','Saturday',1,'OPD','BPositiveMachine','2016-09-10 17:32:37','2016-09-10 17:32:37'),('7Med Banaras',24,'7Med Banaras-2016-7','Wednesday',2,'OPD','NegativeMachine','2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',25,'7Med Banaras-2016-7','Friday',2,'OPD','NegativeMachine','2016-09-20 05:40:58','2016-09-20 05:40:58'),('7Med Banaras',26,'7Med Banaras-2016-7','Monday',1,'OPD','NegativeMachine','2016-10-17 05:08:18','2016-10-17 05:08:18'),('7Med_Gurgaon',27,'7Med_Gurgaon-2016-1','Monday',2,'OPD','NegativeMachine','2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',28,'7Med_Gurgaon-2016-1','Wednesday',2,'OPD','NegativeMachine','2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',29,'7Med_Gurgaon-2016-1','Friday',2,'OPD','NegativeMachine','2016-10-18 07:36:07','2016-10-18 07:36:07'),('7Med_Gurgaon',30,'7Med_Gurgaon-2016-2','Tuesday',1,'OPD','NegativeMachine','2016-10-18 07:41:19','2016-10-18 07:41:19'),('7Med_Gurgaon',31,'7Med_Gurgaon-2016-2','Friday',1,'OPD','NegativeMachine','2016-10-18 07:41:19','2016-10-18 07:41:19');
/*!40000 ALTER TABLE `schedulePatients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `centreId` varchar(255) NOT NULL,
  `itemId` bigint(20) NOT NULL,
  `availableQuantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`centreId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES ('7Med Banaras',2,599,'admin','2016-09-10 17:28:27','2016-09-10 17:36:35'),('7Med Banaras',5,1,'admin','2016-09-10 17:28:27','2016-09-10 17:36:35'),('7Med Banaras',6,100,'admin','2016-09-10 17:28:27','2016-09-10 17:28:27'),('7Med Banaras',7,11,'admin','2016-09-10 17:28:27','2016-09-10 17:36:35'),('7Med Banaras',8,49,'admin','2016-09-10 17:28:27','2016-09-10 17:36:35'),('7Med Banaras',10,20,'admin','2016-09-10 17:28:27','2016-09-10 17:28:27'),('7Med Banaras',11,312,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',12,312,'admin','2016-09-10 17:28:27','2016-09-10 17:28:27'),('7Med Banaras',15,500,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',16,500,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',17,200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',18,500,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',19,100,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',20,100,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',21,200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',22,10,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',23,10,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',25,7200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',26,200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',28,1200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',30,60,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',31,300,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',32,1200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',34,15,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',35,60,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',36,24,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',37,21,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',38,168,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',39,216,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',40,12,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',42,150,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',43,10,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',44,100,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',45,350,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',47,20,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',48,20,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',49,20,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',50,200,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',51,15,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',53,300,'admin','2016-09-10 17:28:28','2016-09-10 17:28:28'),('7Med Banaras',54,599,'admin','2016-09-10 17:28:28','2016-09-10 17:36:35'),('7Med_Gurgaon',2,147,'Devender','2016-10-18 06:37:41','2016-10-18 08:22:14'),('7Med_Gurgaon',7,9,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',8,25,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',9,3,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',10,19,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',15,498,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',16,396,'Devender','2016-10-18 06:37:11','2016-10-18 08:22:14'),('7Med_Gurgaon',17,23,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',18,290,'Devender','2016-10-18 06:37:11','2016-10-18 08:22:14'),('7Med_Gurgaon',19,100,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',20,96,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',21,182,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',22,9,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',25,6800,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',26,100,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',27,25,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',28,349,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',30,26,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',31,177,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',32,350,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',33,1,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',35,48,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',36,12,'Devender','2016-10-18 06:37:11','2016-10-18 06:37:11'),('7Med_Gurgaon',37,18,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',38,324,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',39,216,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',42,100,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',43,2,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',44,96,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',45,93,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',47,18,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',48,18,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',49,18,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',50,98,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',53,40,'Devender','2016-10-18 06:37:12','2016-10-18 06:37:12'),('7Med_Gurgaon',54,90,'Devender','2016-10-18 06:37:12','2016-10-18 07:12:32'),('7Med_Gurgaon',62,304,'Devender','2016-10-18 07:12:31','2016-10-18 07:12:32'),('7Med_Gurgaon',63,80,'Devender','2016-10-18 07:12:31','2016-10-18 07:12:32'),('7Med_Gurgaon',64,100,'Devender','2016-10-18 07:12:31','2016-10-18 07:12:33');
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockIssued`
--

DROP TABLE IF EXISTS `stockIssued`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockIssued` (
  `centreId` varchar(255) NOT NULL,
  `stockIssuedId` bigint(20) NOT NULL AUTO_INCREMENT,
  `stockIssuedTo` varchar(255) DEFAULT NULL,
  `estimatedSingleUse` int(11) DEFAULT NULL,
  `estimatedReUse` int(11) DEFAULT NULL,
  `estimatedNewDialyzer` int(11) DEFAULT NULL,
  `estimatedCatheterSingleLumen` int(11) DEFAULT NULL,
  `estimatedCatheterDoubleLumen` int(11) DEFAULT NULL,
  `stockIssueDate` datetime DEFAULT NULL,
  `stockTakerName` varchar(255) DEFAULT NULL,
  `nextExpectedStockIssueDate` datetime DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`stockIssuedId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockIssued`
--

LOCK TABLES `stockIssued` WRITE;
/*!40000 ALTER TABLE `stockIssued` DISABLE KEYS */;
INSERT INTO `stockIssued` VALUES ('7Med Banaras',1,'Transfer To Other Clinic',2,2,2,NULL,NULL,'2016-09-10 17:34:56','Mayank','2016-09-10 17:34:56','admin','2016-09-10 17:36:34','2016-09-10 17:36:34'),('7Med_Gurgaon',2,'Floor',5,5,5,1,1,'2016-10-18 08:16:22','Arif','2016-10-19 08:16:22','Devender','2016-10-18 08:22:14','2016-10-18 08:22:14');
/*!40000 ALTER TABLE `stockIssued` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockIssuedItems`
--

DROP TABLE IF EXISTS `stockIssuedItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stockIssuedItems` (
  `stockIssuedId` bigint(20) NOT NULL DEFAULT '0',
  `itemId` bigint(20) NOT NULL DEFAULT '0',
  `quantity` int(11) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`stockIssuedId`,`itemId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `stockIssuedItems_ibfk_1` FOREIGN KEY (`stockIssuedId`) REFERENCES `stockIssued` (`stockIssuedId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `stockIssuedItems_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `item` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockIssuedItems`
--

LOCK TABLES `stockIssuedItems` WRITE;
/*!40000 ALTER TABLE `stockIssuedItems` DISABLE KEYS */;
INSERT INTO `stockIssuedItems` VALUES (1,2,1,'admin','2016-09-10 17:36:35','2016-09-10 17:36:35'),(1,5,1,'admin','2016-09-10 17:36:35','2016-09-10 17:36:35'),(1,7,1,'admin','2016-09-10 17:36:35','2016-09-10 17:36:35'),(1,8,1,'admin','2016-09-10 17:36:35','2016-09-10 17:36:35'),(1,54,1,'admin','2016-09-10 17:36:34','2016-09-10 17:36:34'),(2,2,5,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14'),(2,16,4,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14'),(2,18,10,'Devender','2016-10-18 08:22:14','2016-10-18 08:22:14');
/*!40000 ALTER TABLE `stockIssuedItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionTypes`
--

DROP TABLE IF EXISTS `transactionTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionTypes` (
  `transactionType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`transactionType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionTypes`
--

LOCK TABLES `transactionTypes` WRITE;
/*!40000 ALTER TABLE `transactionTypes` DISABLE KEYS */;
INSERT INTO `transactionTypes` VALUES ('Catheter Kit','2016-09-10 12:09:11','2016-09-10 12:09:11'),('Dialysis','2016-09-10 11:35:04','2016-09-10 11:35:04'),('Other Consumable','2016-09-10 12:09:29','2016-09-10 12:09:29'),('Pharmacy','2016-09-10 11:34:02','2016-09-10 11:34:02'),('Procedure','2016-09-10 12:08:59','2016-09-10 12:08:59');
/*!40000 ALTER TABLE `transactionTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `hashedPassword` varchar(255) DEFAULT NULL,
  `centres` varchar(500) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `incharge` tinyint(1) DEFAULT NULL,
  `manager` tinyint(1) DEFAULT NULL,
  `clinical` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3','JP1,CH,all,007,7Med Varanasi,7Med Banaras,7MED_07,7Med_Gurgaon',1,0,1,1,'2016-07-13 10:48:56','2016-10-18 05:33:22'),(2,'Ratnakar','827ccb0eea8a706c4c34a16891f84e7b','7Med Banaras',0,1,1,1,'2016-09-10 17:25:53','2016-09-10 17:25:53'),(3,'Devender','fcea920f7412b5da7be0cf42b8c93759','7Med_Gurgaon',0,0,1,0,'2016-10-18 05:36:54','2016-10-18 05:36:54'),(4,'Arif','fcea920f7412b5da7be0cf42b8c93759','7Med_Gurgaon',0,0,0,1,'2016-10-18 05:37:52','2016-10-18 05:37:52');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccinationDetails`
--

DROP TABLE IF EXISTS `vaccinationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaccinationDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patientId` varchar(255) NOT NULL,
  `diseaseName` varchar(255) DEFAULT NULL,
  `dosage1` datetime DEFAULT NULL,
  `dosage2` datetime DEFAULT NULL,
  `dosage3` datetime DEFAULT NULL,
  `dosage4` datetime DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccinationDetails`
--

LOCK TABLES `vaccinationDetails` WRITE;
/*!40000 ALTER TABLE `vaccinationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `vaccinationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor` (
  `vendorId` int(11) NOT NULL AUTO_INCREMENT,
  `vendorName` varchar(255) DEFAULT NULL,
  `vendorAddress` varchar(255) DEFAULT NULL,
  `vendorTINNumber` bigint(20) DEFAULT NULL,
  `vendorContactPerson` varchar(255) DEFAULT NULL,
  `vendorContactPersonNumber` bigint(20) DEFAULT NULL,
  `vendorIntroducedBy` varchar(255) DEFAULT NULL,
  `vendorIntroducedByName` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`vendorId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'7Med Corporate Office','508, JyotiShikher Building, Janakpuri District Center, New Delhi',NULL,'Manoranjan',9898989898,'Staff','Mayank','admin','2016-09-10 12:39:03','2016-09-10 12:39:03');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-22 15:20:21

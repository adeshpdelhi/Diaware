-- MySQL dump 10.13  Distrib 5.5.50, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: diaware
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

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
-- Table structure for table `billMaster`
--

DROP TABLE IF EXISTS `billMaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billMaster` (
  `billId` int(11) NOT NULL AUTO_INCREMENT,
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
  KEY `patientId` (`patientId`),
  CONSTRAINT `billMaster_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billMaster`
--

LOCK TABLES `billMaster` WRITE;
/*!40000 ALTER TABLE `billMaster` DISABLE KEYS */;
INSERT INTO `billMaster` VALUES (1,'OPD','cash',NULL,0.00,'FullPaid',1500.00,1500.00,1500.00,0.00,'Varanasi_1','2016-08-12 10:38:35','2016-08-12 10:38:35',NULL,'Varanasi_1-2016-1');
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
INSERT INTO `bills` VALUES (1,1,'Dialysis Reuse','Dialysis Reuse',1,1500.00,'2016-08-12 10:38:35','2016-08-12 10:38:35',NULL);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancelledAppointments`
--

DROP TABLE IF EXISTS `cancelledAppointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cancelledAppointments` (
  `centreId` varchar(255) DEFAULT NULL,
  `shiftPatientsId` int(11) DEFAULT NULL,
  `appointmentId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `dayOfTheWeek` varchar(255) DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `cancelled` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`appointmentId`),
  KEY `centreId` (`centreId`),
  KEY `shiftPatientsId` (`shiftPatientsId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `cancelledAppointments_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`),
  CONSTRAINT `cancelledAppointments_ibfk_2` FOREIGN KEY (`shiftPatientsId`) REFERENCES `shiftPatients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cancelledAppointments_ibfk_3` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancelledAppointments`
--

LOCK TABLES `cancelledAppointments` WRITE;
/*!40000 ALTER TABLE `cancelledAppointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `cancelledAppointments` ENABLE KEYS */;
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
INSERT INTO `centres` VALUES ('JP1','Apex Jaipur','malviya nagar',50,'femoral,fistoral,IJ,central',2,3,'NegativeMachines',10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2016-07-13 10:48:56','2016-07-13 10:48:56'),('Varanasi_1','7Med Laxmi Hospital','Varanasi',110,NULL,4,2,'NegativeMachines,BPositiveMachines,CPositiveMachines',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-09-03 07:23:52');
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
INSERT INTO `consumption` VALUES ('Varanasi_1','2016-08-15 00:00:00','Varanasi_1-2016-1','Reuse',1,'admin','2016-09-03 12:48:27','2016-09-03 12:48:27');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialysisCarePlan`
--

LOCK TABLES `dialysisCarePlan` WRITE;
/*!40000 ALTER TABLE `dialysisCarePlan` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `floor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `futureAppointments`
--

DROP TABLE IF EXISTS `futureAppointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `futureAppointments` (
  `centreId` varchar(255) DEFAULT NULL,
  `shiftPatientsId` int(11) DEFAULT NULL,
  `appointmentId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `dayOfTheWeek` varchar(255) DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `attended` tinyint(1) DEFAULT NULL,
  `cancelled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`appointmentId`),
  KEY `centreId` (`centreId`),
  KEY `shiftPatientsId` (`shiftPatientsId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `futureAppointments_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`),
  CONSTRAINT `futureAppointments_ibfk_2` FOREIGN KEY (`shiftPatientsId`) REFERENCES `shiftPatients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `futureAppointments_ibfk_3` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `futureAppointments`
--

LOCK TABLES `futureAppointments` WRITE;
/*!40000 ALTER TABLE `futureAppointments` DISABLE KEYS */;
INSERT INTO `futureAppointments` VALUES ('Varanasi_1',2,2,'2016-08-18','Thursday','Varanasi_1-2016-1',1,NULL,0,'2016-08-12 08:20:14','2016-08-12 08:20:14'),('Varanasi_1',10,7,'2016-08-20','Saturday','Varanasi_1-2016-2',1,NULL,0,'2016-08-14 05:59:08','2016-08-14 05:59:08'),('Varanasi_1',11,8,'2016-08-19','Friday','Varanasi_1-2016-2',1,NULL,0,'2016-08-14 05:59:08','2016-08-14 05:59:08'),('Varanasi_1',9,11,'2016-08-18','Thursday','Varanasi_1-2016-2',1,NULL,0,'2016-08-14 05:59:08','2016-08-14 05:59:08');
/*!40000 ALTER TABLE `futureAppointments` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indent`
--

LOCK TABLES `indent` WRITE;
/*!40000 ALTER TABLE `indent` DISABLE KEYS */;
INSERT INTO `indent` VALUES ('Varanasi_1',1,'2016-08-12 09:46:28','2016-08-12 09:46:28','7Med Corporate Office','Approved','admin','2016-08-12 09:50:11','2016-08-12 09:50:55'),('Varanasi_1',2,'2016-08-12 09:51:21','2016-08-12 09:51:21','7Med Corporate Office','Raised','Varanasi_1','2016-08-12 10:04:17','2016-08-12 10:04:17'),('Varanasi_1',3,'2016-08-12 10:04:38','2016-08-12 10:04:38','7Med Corporate Office','Received','Varanasi_1','2016-08-12 10:17:53','2016-08-12 10:28:10'),('Varanasi_1',4,'2016-08-12 10:25:24','2016-08-12 10:25:24','7Med Corporate Office','Raised','Varanasi_1','2016-08-12 10:25:41','2016-08-12 10:25:41'),('Varanasi_1',5,'2016-08-14 05:44:20','2016-08-14 05:44:20','7Med Corporate Office','Saved','admin','2016-08-14 05:45:14','2016-08-14 05:47:53'),('Varanasi_1',6,'2016-08-14 05:45:33','2016-08-14 05:45:33','7Med Corporate Office','Raised','Varanasi_1','2016-08-14 05:46:17','2016-08-14 05:46:17'),('Varanasi_1',7,'2016-08-14 05:48:27','2016-08-14 05:48:27',NULL,'Raised','admin','2016-08-14 05:49:08','2016-08-14 05:49:08');
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
INSERT INTO `indentItems` VALUES (3,1,'Approved',600,0,'Varanasi_1','2016-08-12 09:08:15','2016-08-12 10:20:32'),(3,1,'Raised',600,0,'Varanasi_1','2016-08-12 09:08:15','2016-08-12 10:17:53'),(3,1,'Received',600,0,'Varanasi_1','2016-08-12 09:08:15','2016-08-12 10:28:10'),(3,4,'Approved',2,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,4,'Raised',2,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,4,'Received',2,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:10'),(3,5,'Approved',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,5,'Raised',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,5,'Received',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:10'),(3,6,'Approved',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,6,'Raised',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,6,'Received',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:10'),(3,7,'Approved',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,7,'Raised',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,7,'Received',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:10'),(3,8,'Approved',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,8,'Raised',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,8,'Received',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,9,'Approved',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,9,'Raised',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,9,'Received',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,10,'Approved',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,10,'Raised',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,10,'Received',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,12,'Approved',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,12,'Raised',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,12,'Received',312,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,19,'Approved',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,19,'Raised',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,19,'Received',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,20,'Approved',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,20,'Raised',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,20,'Received',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,21,'Approved',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,21,'Raised',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,21,'Received',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,22,'Approved',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,22,'Raised',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,22,'Received',500,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,23,'Approved',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,23,'Raised',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,23,'Received',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,24,'Approved',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,24,'Raised',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,24,'Received',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,25,'Approved',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,25,'Raised',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,25,'Received',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,26,'Approved',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,26,'Raised',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:53'),(3,26,'Received',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,27,'Approved',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,27,'Raised',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,27,'Received',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,29,'Approved',7200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,29,'Raised',7200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,29,'Received',7200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,30,'Approved',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,30,'Raised',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,30,'Received',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,31,'Approved',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,31,'Raised',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,31,'Received',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,34,'Approved',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,34,'Raised',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,34,'Received',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,36,'Approved',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,36,'Raised',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,36,'Received',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,37,'Approved',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,37,'Raised',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,37,'Received',1200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,39,'Approved',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:32'),(3,39,'Raised',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,39,'Received',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,41,'Approved',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,41,'Raised',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,41,'Received',60,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,42,'Approved',24,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,42,'Raised',24,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,42,'Received',24,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,43,'Approved',168,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,43,'Raised',168,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,43,'Received',168,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,44,'Approved',216,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,44,'Raised',216,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,44,'Received',216,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,46,'Approved',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,46,'Raised',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,46,'Received',12,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,48,'Approved',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,48,'Raised',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,48,'Received',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,49,'Approved',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,49,'Raised',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,49,'Received',50,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:11'),(3,51,'Approved',350,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,51,'Raised',350,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,51,'Received',350,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,52,'Approved',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,52,'Raised',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,52,'Received',10,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,55,'Approved',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,55,'Raised',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,55,'Received',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,56,'Approved',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,56,'Raised',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,56,'Received',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,57,'Approved',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,57,'Raised',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,57,'Received',20,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,58,'Approved',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,58,'Raised',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,58,'Received',200,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,59,'Approved',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,59,'Raised',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,59,'Received',15,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,61,'Approved',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,61,'Raised',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,61,'Received',300,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(3,70,'Approved',600,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:20:33'),(3,70,'Raised',600,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:17:54'),(3,70,'Received',600,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:28:12'),(4,2,'Raised',100,0,'Varanasi_1','2016-08-12 09:41:38','2016-08-12 10:25:41'),(5,8,'Saved',1,12,'admin','2016-08-12 09:41:38','2016-08-14 05:45:14'),(5,16,'Saved',1,0,'admin','2016-08-12 09:41:38','2016-08-14 05:45:14'),(5,63,'Saved',1,0,'admin','2016-08-12 09:41:38','2016-08-14 05:45:14'),(6,1,'Raised',20,600,'Varanasi_1','2016-08-12 09:08:15','2016-08-14 05:46:17'),(6,5,'Raised',1,200,'Varanasi_1','2016-08-12 09:41:38','2016-08-14 05:46:17'),(6,7,'Raised',1,50,'Varanasi_1','2016-08-12 09:41:38','2016-08-14 05:46:17'),(6,12,'Raised',1,312,'Varanasi_1','2016-08-12 09:41:38','2016-08-14 05:46:17'),(7,3,'Raised',1,0,'admin','2016-08-12 09:41:38','2016-08-14 05:49:08'),(7,9,'Raised',1,20,'admin','2016-08-12 09:41:38','2016-08-14 05:49:08');
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Blood Tubing','utype1',NULL,'type1','admin','2016-08-12 09:08:15','2016-08-12 09:08:15'),(2,'Blood Tubing 5008S','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(3,'Bac','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(4,'Baccilol Spray Jar - 5Ltr','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(5,'Band Aid','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(6,'Betadine Lotion - 500Ml','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(7,'BT Set','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(8,'HD Machine Disinfectant - Diaclean','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(9,'Cotton Roll - .5 Kg','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(10,'Dialyzer Single Use 1.1','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(11,'Dialyzer Single Use 1.3','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(12,'Dialyzer Reuse 1.3','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(13,'Dialyzer Reuse 1.4','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(14,'Dialyzer Reuse 1.5','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(15,'Dialyzer Reuse 1.8','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(16,'Dialyzer High Flux','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(17,'Dialyzer Port Caps','utype3',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(18,'Blood Port Caps','utype3',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(19,'Disposable Appron','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(20,'Disposable Cap','utype3',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(21,'Disposable Syringe 20Ml with Needle','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(22,'Disposable Syringe 10Ml Without Needle','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(23,'Disp. Syringe 1Ml (30G)','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(24,'Disp. Syringe 2Ml (24G)','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(25,'Disp. Syringe 5Ml (24G)','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(26,'Catheter Double Lumen Curved','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(27,'Catheter Double Lumen Straight','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(28,'Dialysis On/Off kit','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(29,'Examination Gloves','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(30,'Face Mask','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(31,'AVF Needle 16G','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(32,'AVF Needle 17G','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(33,'RO Anti Scalant','utype3',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(34,'Gauze Than','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(35,'Gauze Pieces','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(36,'Heparin 25000IU','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(37,'IV Set','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(38,'Leucoplast 3 Inch','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(39,'Leucoplast 4Inch','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(40,'Micropore 1Inch','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(41,'Micropore 2Inch','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(42,'Micropore 3Inch','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(43,'Normal Saline - 1000Ml','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(44,'Normal Saline 500Ml','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(45,'Normal Saline 100 ML','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(46,'Dialyzer Disinfactant','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(47,'Salt Tablet Bag','utype3',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(48,'Surgical Gloves 6.5','utype1',NULL,'type2','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(49,'Surgical Gloves 7','utype1',NULL,'type2','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(50,'Surgical Gloves 7.5','utype1',NULL,'type2','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(51,'Transducer Protector','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(52,'Surface Disinfectant','utype3',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(53,'Blade - 11No.','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(54,'Cannula 16G','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(55,'Catheter Single Lumen Straight','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(56,'Guide Wire','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(57,'Introducer Needle','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(58,'Gluck Strip','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(59,'Luco Band','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(60,'Dialyzate Filter','utype3',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(61,'Dialysate Part A (Dry)','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(62,'Dialysaty Part A (Liquid)','utype1',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(63,'Dextrose 25%','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(64,'Xylocain','utype1',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(65,'Sodium Hypocloride','utype3',NULL,'type3','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(66,'EPO 4000IU','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(67,'EPO 6000 IU','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(68,'EPO 10000 IU','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(69,'EPO 2000 IU','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(70,'Dialysate Part B','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(71,'BiBag','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(72,'Catheter Triple Lumen Curved','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(73,'Neosporin Powder','utype2',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(74,'Suture Silk','utype1',NULL,'type1','admin','2016-08-12 09:41:38','2016-08-12 09:41:38'),(75,'Height Meter Tape','utype3',NULL,'type1','admin','2016-08-12 09:42:39','2016-08-12 09:42:39');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledgerTable`
--

LOCK TABLES `ledgerTable` WRITE;
/*!40000 ALTER TABLE `ledgerTable` DISABLE KEYS */;
INSERT INTO `ledgerTable` VALUES (1,'Dialysis Reuse','Dialysis Reuse',1500.00,'2016-08-12 10:37:38','2016-08-12 10:37:38');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasic`
--

LOCK TABLES `monitoringChartPreBasic` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasic` DISABLE KEYS */;
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
INSERT INTO `otherDetails` VALUES ('Varanasi_1-2016-1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Varanasi_1','2016-08-12 08:18:28','2016-08-12 08:18:28');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panels`
--

LOCK TABLES `panels` WRITE;
/*!40000 ALTER TABLE `panels` DISABLE KEYS */;
/*!40000 ALTER TABLE `panels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pastAppointments`
--

DROP TABLE IF EXISTS `pastAppointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pastAppointments` (
  `centreId` varchar(255) DEFAULT NULL,
  `shiftPatientsId` int(11) DEFAULT NULL,
  `appointmentId` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `dayOfTheWeek` varchar(255) DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `attended` tinyint(1) DEFAULT NULL,
  `cancelled` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`appointmentId`),
  KEY `centreId` (`centreId`),
  KEY `shiftPatientsId` (`shiftPatientsId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `pastAppointments_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`),
  CONSTRAINT `pastAppointments_ibfk_2` FOREIGN KEY (`shiftPatientsId`) REFERENCES `shiftPatients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pastAppointments_ibfk_3` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pastAppointments`
--

LOCK TABLES `pastAppointments` WRITE;
/*!40000 ALTER TABLE `pastAppointments` DISABLE KEYS */;
INSERT INTO `pastAppointments` VALUES ('Varanasi_1',1,1,'2016-08-15','Monday','Varanasi_1-2016-1',1,1,0,'2016-08-12 08:20:14','2016-08-14 06:32:23'),('Varanasi_1',3,3,'2016-08-13','Saturday','Varanasi_1-2016-1',1,0,0,'2016-08-12 08:20:14','2016-08-14 05:54:43'),('Varanasi_1',4,4,'2016-08-14','Sunday','Varanasi_1-2016-1',2,1,0,'2016-08-14 05:55:10','2016-08-14 06:06:34'),('Varanasi_1',6,5,'2016-08-15','Monday','Varanasi_1-2016-2',1,1,0,'2016-08-14 05:59:08','2016-08-14 06:03:52'),('Varanasi_1',5,6,'2016-08-14','Sunday','Varanasi_1-2016-2',1,1,0,'2016-08-14 05:59:08','2016-08-14 06:01:55'),('Varanasi_1',7,9,'2016-08-16','Tuesday','Varanasi_1-2016-2',1,1,0,'2016-08-14 05:59:08','2016-08-14 06:08:35'),('Varanasi_1',8,10,'2016-08-17','Wednesday','Varanasi_1-2016-2',1,1,0,'2016-08-14 05:59:08','2016-08-14 06:13:27');
/*!40000 ALTER TABLE `pastAppointments` ENABLE KEYS */;
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
INSERT INTO `patientDetails` VALUES ('Varanasi_1-2016-1','Vikas Kumar',26,'1990-03-07 18:30:00','Male','9807564305',NULL,'Varanasi','Village Shakarpur, Gazipur',NULL,NULL,'unmarried','Raju Kumar','Brother','9451689588','No',0,NULL,'other','NA','NA',NULL,'Cash',NULL,'Dr.Tribhuvan Gupta','No','Varanasi_1','2016-08-12 08:18:00','2016-08-12 08:18:00','Varanasi_1'),('Varanasi_1-2016-2','Sharukh',-3,'2019-09-08 18:30:00','Male',NULL,NULL,NULL,NULL,'A+',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,NULL,NULL,'Varanasi_1','2016-08-14 05:58:31','2016-08-14 05:58:31','Varanasi_1'),('Varanasi_1-2016-3','hjgb',2,'2014-12-02 18:30:00','Male',NULL,NULL,NULL,NULL,'A+',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Panel',NULL,NULL,NULL,'admin','2016-09-03 07:23:52','2016-09-03 07:23:52','Varanasi_1');
/*!40000 ALTER TABLE `patientDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shiftPatients`
--

DROP TABLE IF EXISTS `shiftPatients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shiftPatients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shiftId` varchar(255) DEFAULT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `appointmentType` varchar(255) DEFAULT NULL,
  `tmtMachine` varchar(255) DEFAULT NULL,
  `shiftNumber` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shiftId` (`shiftId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `shiftPatients_ibfk_1` FOREIGN KEY (`shiftId`) REFERENCES `shifts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shiftPatients_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shiftPatients`
--

LOCK TABLES `shiftPatients` WRITE;
/*!40000 ALTER TABLE `shiftPatients` DISABLE KEYS */;
INSERT INTO `shiftPatients` VALUES (1,'Varanasi_1-Mon-1','Varanasi_1-2016-1','Monday','OPD','Negative Machine',1,'2016-08-12 08:20:14','2016-08-12 08:20:14'),(2,'Varanasi_1-Thu-1','Varanasi_1-2016-1','Thursday','OPD','Negative Machine',1,'2016-08-12 08:20:14','2016-08-12 08:20:14'),(3,'Varanasi_1-Sat-1','Varanasi_1-2016-1','Saturday','OPD','Negative Machine',1,'2016-08-12 08:20:14','2016-08-12 08:20:14'),(4,'Varanasi_1-Sun-2','Varanasi_1-2016-1','Sunday','OPD','Negative Machine',2,'2016-08-14 05:55:10','2016-08-14 05:55:10'),(5,'Varanasi_1-Sun-1','Varanasi_1-2016-2','Sunday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(6,'Varanasi_1-Mon-1','Varanasi_1-2016-2','Monday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(7,'Varanasi_1-Tue-1','Varanasi_1-2016-2','Tuesday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(8,'Varanasi_1-Wed-1','Varanasi_1-2016-2','Wednesday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(9,'Varanasi_1-Thu-1','Varanasi_1-2016-2','Thursday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(10,'Varanasi_1-Sat-1','Varanasi_1-2016-2','Saturday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08'),(11,'Varanasi_1-Fri-1','Varanasi_1-2016-2','Friday','OPD','Negative Machine',1,'2016-08-14 05:59:08','2016-08-14 05:59:08');
/*!40000 ALTER TABLE `shiftPatients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shifts` (
  `id` varchar(255) NOT NULL DEFAULT '',
  `OPDAvailableNegativeMachines` int(11) DEFAULT NULL,
  `OPDAvailableBPositiveMachines` int(11) DEFAULT NULL,
  `OPDAvailableCPositiveMachines` int(11) DEFAULT NULL,
  `OPDAvailableHIVMachines` int(11) DEFAULT NULL,
  `IPD_ICUAvailableNegativeMachines` int(11) DEFAULT NULL,
  `IPD_ICUAvailableBPositiveMachines` int(11) DEFAULT NULL,
  `IPD_ICUAvailableCPositiveMachines` int(11) DEFAULT NULL,
  `IPD_ICUAvailableHIVMachines` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES ('Varanasi_1-Fri-1',5,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Fri-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1-Mon-1',4,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Mon-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1-Sat-1',4,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Sat-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1-Sun-1',5,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Sun-2',5,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:55:10'),('Varanasi_1-Thu-1',4,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Thu-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1-Tue-1',5,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Tue-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1-Wed-1',5,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-14 05:59:08'),('Varanasi_1-Wed-2',6,1,1,NULL,0,0,0,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
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
INSERT INTO `stock` VALUES ('Varanasi_1',1,600,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',4,2,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',5,200,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',6,12,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',7,50,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',8,12,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',9,20,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',10,312,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',12,312,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',19,500,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',20,500,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',21,200,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',22,500,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',23,100,'Varanasi_1','2016-08-12 10:28:12','2016-08-12 10:28:12'),('Varanasi_1',24,100,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',25,200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',26,10,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',27,10,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',29,7200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',30,200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',31,1200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',34,60,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',36,300,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',37,1200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',39,15,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',41,60,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',42,24,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',43,168,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',44,216,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',46,12,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',48,100,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',49,50,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',51,350,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',52,10,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',55,20,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',56,20,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',57,20,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',58,200,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',59,15,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',61,300,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13'),('Varanasi_1',70,600,'Varanasi_1','2016-08-12 10:28:13','2016-08-12 10:28:13');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockIssued`
--

LOCK TABLES `stockIssued` WRITE;
/*!40000 ALTER TABLE `stockIssued` DISABLE KEYS */;
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
INSERT INTO `transactionTypes` VALUES ('Dialysis Reuse','2016-08-12 10:33:21','2016-08-12 10:33:21');
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
INSERT INTO `users` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3','JP1,CH,all,Varanasi_1',1,0,1,0,'2016-07-13 10:48:56','2016-08-09 10:52:31'),(2,'rishabh','c64e8e7b05a6d831605cfe23dd617deb','all,Varanasi_1',1,0,0,0,'2016-07-29 17:19:23','2016-08-09 10:52:31'),(3,'Operation1','cb05215d57a649cc976b59cde38b81f0','Varanasi_1',0,1,1,1,'2016-08-12 07:43:01','2016-08-12 07:45:25'),(4,'Varanasi_1','827ccb0eea8a706c4c34a16891f84e7b','Varanasi_1',0,0,1,1,'2016-08-12 07:47:11','2016-08-12 07:47:11');
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
INSERT INTO `vendor` VALUES (1,'7Med Corporate Office','508, JyotiShikher Building, Janak Place, district Center, New Delhi',NULL,'Abhimanyu',1141604414,NULL,NULL,'admin','2016-08-12 09:46:23','2016-08-12 09:46:23');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weekDaySlots`
--

DROP TABLE IF EXISTS `weekDaySlots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weekDaySlots` (
  `centreId` varchar(255) NOT NULL DEFAULT '',
  `dayOfTheWeek` varchar(255) NOT NULL DEFAULT '',
  `shift1Id` varchar(255) DEFAULT NULL,
  `shift2Id` varchar(255) DEFAULT NULL,
  `shift3Id` varchar(255) DEFAULT NULL,
  `shift4Id` varchar(255) DEFAULT NULL,
  `shift5Id` varchar(255) DEFAULT NULL,
  `shift6Id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`centreId`,`dayOfTheWeek`),
  KEY `shift1Id` (`shift1Id`),
  KEY `shift2Id` (`shift2Id`),
  KEY `shift3Id` (`shift3Id`),
  KEY `shift4Id` (`shift4Id`),
  KEY `shift5Id` (`shift5Id`),
  KEY `shift6Id` (`shift6Id`),
  CONSTRAINT `weekDaySlots_ibfk_1` FOREIGN KEY (`centreId`) REFERENCES `centres` (`id`),
  CONSTRAINT `weekDaySlots_ibfk_2` FOREIGN KEY (`shift1Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `weekDaySlots_ibfk_3` FOREIGN KEY (`shift2Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `weekDaySlots_ibfk_4` FOREIGN KEY (`shift3Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `weekDaySlots_ibfk_5` FOREIGN KEY (`shift4Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `weekDaySlots_ibfk_6` FOREIGN KEY (`shift5Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `weekDaySlots_ibfk_7` FOREIGN KEY (`shift6Id`) REFERENCES `shifts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekDaySlots`
--

LOCK TABLES `weekDaySlots` WRITE;
/*!40000 ALTER TABLE `weekDaySlots` DISABLE KEYS */;
INSERT INTO `weekDaySlots` VALUES ('Varanasi_1','Friday','Varanasi_1-Fri-1','Varanasi_1-Fri-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Monday','Varanasi_1-Mon-1','Varanasi_1-Mon-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Saturday','Varanasi_1-Sat-1','Varanasi_1-Sat-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Sunday','Varanasi_1-Sun-1','Varanasi_1-Sun-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Thursday','Varanasi_1-Thu-1','Varanasi_1-Thu-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Tuesday','Varanasi_1-Tue-1','Varanasi_1-Tue-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31'),('Varanasi_1','Wednesday','Varanasi_1-Wed-1','Varanasi_1-Wed-2',NULL,NULL,NULL,NULL,'2016-08-09 10:52:31','2016-08-09 10:52:31');
/*!40000 ALTER TABLE `weekDaySlots` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-05 14:00:06

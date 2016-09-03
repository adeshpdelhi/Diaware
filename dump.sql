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
-- Current Database: `diaware`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `diaware` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `diaware`;

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
INSERT INTO `billMaster` VALUES (1,'OPD','cashless',1,0.00,'FullPaid',1200.00,1200.00,1200.00,0.00,'admin','2016-07-28 09:03:43','2016-07-28 09:03:43',NULL,'JP1-2016-1');
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
INSERT INTO `bills` VALUES (1,1,'Dialysis','OPD Dialysis',1,1200.00,'2016-07-28 09:03:43','2016-07-28 09:03:43',NULL);
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
INSERT INTO `centres` VALUES ('JP1','7MED Apex','malviya nagar',500,'femoral,fistoral,IJ',3,3,'NegativeMachines,BPositiveMachines',10,NULL,2,NULL,5,NULL,1,NULL,'2016-07-28 08:44:49','2016-07-28 09:21:08');
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
-- Table structure for table `costSheet`
--

DROP TABLE IF EXISTS `costSheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `costSheet` (
  `centreId` varchar(255) DEFAULT NULL,
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `appointmentType` varchar(255) DEFAULT NULL,
  `panelName` varchar(255) DEFAULT NULL,
  `ledgerType` varchar(255) DEFAULT NULL,
  `ledgerName` varchar(255) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costSheet`
--

LOCK TABLES `costSheet` WRITE;
/*!40000 ALTER TABLE `costSheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `costSheet` ENABLE KEYS */;
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
INSERT INTO `dialysisCarePlan` VALUES ('JP1-2016-1',1,'2016-02-05 18:30:00',68.00,2,4,300.00,500.00,0.00,'No',2000,1500,'Calcium 5%, Potassium Free',22.00,4,'fistoral','admin','2016-07-28 09:17:51','2016-07-28 09:17:51');
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
INSERT INTO `dialyzateTypes` VALUES ('Calcium 5%, Potassium Free','2016-07-28 08:51:39','2016-07-28 08:51:39');
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
INSERT INTO `diseases` VALUES ('Cardiovascular Pulpitation','2016-07-28 08:54:13','2016-07-28 08:54:13'),('Glomerulo Nephritis','2016-07-28 08:53:59','2016-07-28 08:53:59');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `futureAppointments`
--

LOCK TABLES `futureAppointments` WRITE;
/*!40000 ALTER TABLE `futureAppointments` DISABLE KEYS */;
INSERT INTO `futureAppointments` VALUES ('JP1',8,8,'2016-07-29','Friday','JP1-2016-2',1,NULL,0,'2016-07-28 09:21:33','2016-07-28 09:21:33'),('JP1',9,9,'2016-08-01','Monday','JP1-2016-2',1,NULL,0,'2016-07-28 09:21:33','2016-07-28 09:21:33'),('JP1',18,18,'2016-07-29','Friday','JP1-2016-1',3,NULL,0,'2016-07-28 10:34:07','2016-07-28 10:34:07'),('JP1',19,19,'2016-08-01','Monday','JP1-2016-1',3,NULL,0,'2016-07-28 10:34:07','2016-07-28 10:34:07');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indent`
--

LOCK TABLES `indent` WRITE;
/*!40000 ALTER TABLE `indent` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `indentItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indents`
--

DROP TABLE IF EXISTS `indents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indents` (
  `centreId` varchar(255) NOT NULL,
  `indentId` int(11) NOT NULL AUTO_INCREMENT,
  `requestDate` datetime DEFAULT NULL,
  `requiredByDate` datetime DEFAULT NULL,
  `stockOrderTo` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `itemsRaised` varchar(255) DEFAULT NULL,
  `itemsApproved` varchar(255) DEFAULT NULL,
  `itemsReceived` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`indentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indents`
--

LOCK TABLES `indents` WRITE;
/*!40000 ALTER TABLE `indents` DISABLE KEYS */;
/*!40000 ALTER TABLE `indents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indentsItems`
--

DROP TABLE IF EXISTS `indentsItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `indentsItems` (
  `indentItemsId` varchar(255) NOT NULL DEFAULT '',
  `itemNumber` int(11) NOT NULL DEFAULT '0',
  `itemName` varchar(255) DEFAULT NULL,
  `usageType` varchar(255) DEFAULT NULL,
  `brandName` varchar(255) DEFAULT NULL,
  `quantityRequired` int(11) DEFAULT NULL,
  `availabilityQuantity` int(11) DEFAULT NULL,
  `quantityType` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`indentItemsId`,`itemNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indentsItems`
--

LOCK TABLES `indentsItems` WRITE;
/*!40000 ALTER TABLE `indentsItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `indentsItems` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledgerTable`
--

LOCK TABLES `ledgerTable` WRITE;
/*!40000 ALTER TABLE `ledgerTable` DISABLE KEYS */;
INSERT INTO `ledgerTable` VALUES (1,'Dialysis','OPD Dialysis',1200.00,'2016-07-28 08:53:06','2016-07-28 08:53:06'),(2,'Dialysis','ICU Dialysis',4000.00,'2016-07-28 08:53:21','2016-07-28 08:53:21'),(3,'Procedure','OPD - Double Lumen IJ',4000.00,'2016-07-28 08:53:42','2016-07-28 08:53:42');
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
INSERT INTO `medicalHistory` VALUES ('JP1-2016-1','Cardiovascular Pulpitation','Yes',NULL,'admin','2016-07-28 09:01:00','2016-07-28 09:12:56'),('JP1-2016-1','Glomerulo Nephritis','Yes',NULL,'admin','2016-07-28 09:01:00','2016-07-28 09:12:56'),('JP1-2016-1','hebanicisluns','Yes',NULL,'admin','2016-07-28 09:12:45','2016-07-28 09:12:45'),('JP1-2016-1','hepatitisB','No',NULL,'admin','2016-07-28 09:10:10','2016-07-28 09:12:56');
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
INSERT INTO `monitoringChartPreAccessAssessment` VALUES ('JP1-2016-1',1,'Good','no','No','no_problem',NULL,'Ramakant','Amina','admin','2016-07-28 09:41:22','2016-07-28 09:41:22');
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
INSERT INTO `monitoringChartPreAssessment` VALUES ('JP1-2016-1',1,72.00,0.00,72.00,68.00,4.00,'No','No','No','No','Good',99.00,120.00,10,5,'Yes','Good','No','Ambulatory','No','No','No','No','No','No','No','No','No','No','No',NULL,'admin','2016-07-28 09:40:34','2016-07-28 09:40:34');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasic`
--

LOCK TABLES `monitoringChartPreBasic` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasic` DISABLE KEYS */;
INSERT INTO `monitoringChartPreBasic` VALUES ('JP1-2016-1','2016-07-27 18:30:00',1,2,2,'Ramakant',4,'6:30','10:30','admin','2016-07-28 09:34:04','2016-07-28 09:34:04'),('JP1-2016-2','2016-07-28 00:00:00',2,NULL,NULL,NULL,0,NULL,NULL,'admin','2016-07-28 09:42:13','2016-07-28 09:42:13');
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
INSERT INTO `monitoringChartPreBasicMedical` VALUES ('JP1-2016-1',1,'F6','SingleUse','fistoral','No',NULL,'Yes',2000,1500,NULL,4,0,'admin','2016-07-28 09:37:24','2016-07-28 09:37:24');
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
INSERT INTO `monitoringChartPreMachineFinalCheck` VALUES ('JP1-2016-1',1,2,'Yes','Amina','Yes','Yes',NULL,'Yes',35.00,'13.8','ca28k19na20','admin','2016-07-28 09:38:48','2016-07-28 09:38:48');
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
INSERT INTO `otherDetails` VALUES ('JP1-2016-1','Too rich','Too rich','Not valid',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-28 09:01:28','2016-07-28 09:01:28');
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
INSERT INTO `panelDetails` VALUES ('JP1-2016-1',1,'2016-01-04 18:30:00','2016-12-30 18:30:00','121212abc',60,23,'2016-12-31 18:30:00',1,'admin','2016-07-28 09:00:46','2016-07-28 09:00:46');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `panels`
--

LOCK TABLES `panels` WRITE;
/*!40000 ALTER TABLE `panels` DISABLE KEYS */;
INSERT INTO `panels` VALUES (1,'Bhamashah Rajasthan','Health insurance scheme by Rajasthan Government',0.00,'2016-07-28 08:50:57','2016-07-28 08:50:57');
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
INSERT INTO `pastAppointments` VALUES ('JP1',10,10,'2016-07-28','Thursday','JP1-2016-2',2,1,0,'2016-07-28 09:21:33','2016-07-28 09:42:14');
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
INSERT INTO `patientDetails` VALUES ('JP1-2016-1','Arjun Rampal',51,'1965-01-30 18:30:00','Male','1212121212','1212121212','Mumbai','885, Mumbai','AB+','No','married','Shahrukh','Friend','1212121212','Yes',1,'1212121212','salaried','Bollywood','H','Interesting','Panel','Rajnikant','Amitabh','Yes','admin','2016-07-28 08:59:29','2016-07-28 08:59:29','JP1'),('JP1-2016-2','rakesh roshan',14,'2002-12-30 18:30:00','Male',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'Cash',NULL,NULL,NULL,'admin','2016-07-28 09:21:08','2016-07-28 09:21:08','JP1');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shiftPatients`
--

LOCK TABLES `shiftPatients` WRITE;
/*!40000 ALTER TABLE `shiftPatients` DISABLE KEYS */;
INSERT INTO `shiftPatients` VALUES (8,'JP1-Fri-1','JP1-2016-2','Friday','OPD','Negative Machine',1,'2016-07-28 09:21:33','2016-07-28 09:21:33'),(9,'JP1-Mon-1','JP1-2016-2','Monday','OPD','Negative Machine',1,'2016-07-28 09:21:33','2016-07-28 09:21:33'),(10,'JP1-Thu-2','JP1-2016-2','Thursday','OPD','Negative Machine',2,'2016-07-28 09:21:33','2016-07-28 09:21:33'),(18,'JP1-Fri-3','JP1-2016-1','Friday','OPD','Negative Machine',3,'2016-07-28 10:34:07','2016-07-28 10:34:07'),(19,'JP1-Mon-3','JP1-2016-1','Monday','OPD','Negative Machine',3,'2016-07-28 10:34:07','2016-07-28 10:34:07');
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
INSERT INTO `shifts` VALUES ('JP1-Fri-1',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Fri-2',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 09:20:18'),('JP1-Fri-3',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Mon-1',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Mon-2',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 09:20:18'),('JP1-Mon-3',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Sat-1',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Sat-2',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Sat-3',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Sun-1',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Sun-2',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Sun-3',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Thu-1',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Thu-2',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 09:21:33'),('JP1-Thu-3',9,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 09:20:18'),('JP1-Tue-1',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Tue-2',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 09:20:18'),('JP1-Tue-3',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Wed-1',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 10:34:07'),('JP1-Wed-2',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49'),('JP1-Wed-3',10,2,NULL,NULL,5,1,NULL,NULL,'2016-07-28 08:44:49','2016-07-28 08:44:49');
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
INSERT INTO `transactionTypes` VALUES ('Dialysis','2016-07-28 08:52:14','2016-07-28 08:52:14'),('ICU Dialysis','2016-07-28 08:52:28','2016-07-28 08:52:28'),('Pharmacy','2016-07-28 08:51:58','2016-07-28 08:51:58'),('Procedure','2016-07-28 08:52:37','2016-07-28 08:52:37');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','21232f297a57a5a743894a0e4a801fc3','all,JP1',1,0,1,0,'2016-07-13 10:48:56','2016-07-28 08:44:50');
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
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
INSERT INTO `weekDaySlots` VALUES ('JP1','Friday','JP1-Fri-1','JP1-Fri-2','JP1-Fri-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Monday','JP1-Mon-1','JP1-Mon-2','JP1-Mon-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Saturday','JP1-Sat-1','JP1-Sat-2','JP1-Sat-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Sunday','JP1-Sun-1','JP1-Sun-2','JP1-Sun-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Thursday','JP1-Thu-1','JP1-Thu-2','JP1-Thu-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Tuesday','JP1-Tue-1','JP1-Tue-2','JP1-Tue-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50'),('JP1','Wednesday','JP1-Wed-1','JP1-Wed-2','JP1-Wed-3',NULL,NULL,NULL,'2016-07-28 08:44:50','2016-07-28 08:44:50');
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

-- Dump completed on 2016-09-02 16:44:15

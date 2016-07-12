-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: diaware
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bills` (
  `transactionId` int(11) NOT NULL AUTO_INCREMENT,
  `bedType` varchar(255) DEFAULT NULL,
  `transactionType` varchar(255) DEFAULT NULL,
  `ledger` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `patientId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transactionId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,NULL,NULL,NULL,NULL,NULL,'Paid',27,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00','JP1-2016-1'),(2,'OPD','Consumable','consumabletype1',1,0,'Paid',0,'','2016-07-10 20:44:18','2016-07-10 21:11:45','JP1-2016-2'),(3,'IPD','Dialysis','dialysistype1',2,0,'Pending',400,'','2016-07-10 20:47:45','2016-07-10 20:47:45','JP1-2016-2'),(4,'IPD','Dialysis','dialysistype1',1,0,'Pending',200,'','2016-07-10 21:09:39','2016-07-10 21:09:39','JP1-2016-1'),(5,'OPD','Procedure','proceduretype2',4,0,'Paid',800,'admin','2016-07-10 21:09:39','2016-07-10 21:11:35','JP1-2016-1'),(6,'IPD','Dialysis','dialysistype2',2,0,'Paid',400,'','2016-07-10 21:13:26','2016-07-10 21:13:26','JP1-2016-1'),(7,'IPD','Pharmacy','pharmacytype2',1,0,'Paid',200,'admin','2016-07-10 21:13:26','2016-07-10 21:13:26','JP1-2016-1');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
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
  `patientCount` int(11) DEFAULT NULL,
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
INSERT INTO `centres` VALUES ('CH','chandigarh','chandigarh',50,'femoral,fistoral,IJ',1,'0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1','Apex Jaipur','malviya nagar',50,'femoral,fistoral,IJ,central',3,'0000-00-00 00:00:00','2016-07-10 20:22:17');
/*!40000 ALTER TABLE `centres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumableTypes`
--

DROP TABLE IF EXISTS `consumableTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consumableTypes` (
  `consumableType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`consumableType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumableTypes`
--

LOCK TABLES `consumableTypes` WRITE;
/*!40000 ALTER TABLE `consumableTypes` DISABLE KEYS */;
INSERT INTO `consumableTypes` VALUES ('consumabletype1','0000-00-00 00:00:00','0000-00-00 00:00:00'),('consumabletype2','0000-00-00 00:00:00','0000-00-00 00:00:00'),('consumabletype3','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `consumableTypes` ENABLE KEYS */;
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
  `bedType` varchar(255) DEFAULT NULL,
  `panelName` varchar(255) DEFAULT NULL,
  `ledgerType` varchar(255) DEFAULT NULL,
  `ledgerName` varchar(255) DEFAULT NULL,
  `cost` decimal(10,0) DEFAULT NULL,
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
  `dryWeight` decimal(10,0) DEFAULT NULL,
  `dialysisDurationFirstTime` int(11) DEFAULT NULL,
  `dialysisDurationRegular` int(11) DEFAULT NULL,
  `BFR` decimal(10,0) DEFAULT NULL,
  `DFR` decimal(10,0) DEFAULT NULL,
  `UFR` decimal(10,0) DEFAULT NULL,
  `heparinFree` varchar(255) DEFAULT NULL,
  `heparinDosageBolus` int(11) DEFAULT NULL,
  `heparinDosageHourly` int(11) DEFAULT NULL,
  `dialysateType` varchar(255) DEFAULT NULL,
  `dialysateTemperature` decimal(10,0) DEFAULT NULL,
  `dialysateFrequencyPerWeek` int(11) DEFAULT NULL,
  `accessUsed` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`carePlanId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `dialysisCarePlan_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`)
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
-- Table structure for table `dialysisTypes`
--

DROP TABLE IF EXISTS `dialysisTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dialysisTypes` (
  `dialysisType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`dialysisType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialysisTypes`
--

LOCK TABLES `dialysisTypes` WRITE;
/*!40000 ALTER TABLE `dialysisTypes` DISABLE KEYS */;
INSERT INTO `dialysisTypes` VALUES ('dialysistype1','0000-00-00 00:00:00','0000-00-00 00:00:00'),('dialysistype2','0000-00-00 00:00:00','0000-00-00 00:00:00'),('dialysistype3','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `dialysisTypes` ENABLE KEYS */;
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
INSERT INTO `dialyzateTypes` VALUES ('dialyzatetype1','0000-00-00 00:00:00','0000-00-00 00:00:00'),('dialyzatetype2','0000-00-00 00:00:00','0000-00-00 00:00:00'),('dialyzatetype3','0000-00-00 00:00:00','0000-00-00 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majorClinicalEvents`
--

LOCK TABLES `majorClinicalEvents` WRITE;
/*!40000 ALTER TABLE `majorClinicalEvents` DISABLE KEYS */;
INSERT INTO `majorClinicalEvents` VALUES ('JP1-2016-1',1,'a',NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-2',2,'aaa','2016-12-30 18:30:00','aaa','admin','2016-07-10 20:24:49','2016-07-10 20:24:49'),('JP1-2016-2',3,'aa','2015-11-29 18:30:00','aa','admin','2016-07-10 20:24:49','2016-07-10 20:24:49');
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
INSERT INTO `medicalHistory` VALUES ('JP1-2016-1','xxx','Yes',NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-2','cerebrovascularDisease','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','coronaryArteryDisease','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','diabetes','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','drugAllergy','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','haemoglobiNopathy','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','hepatitisB','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','hepatitisC','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','HIV','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','hypertension','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','malignancy','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','malnutrition','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','peripheralNeuropathy','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','peripheralVascularDisease','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','ratinopathy','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41'),('JP1-2016-2','respiratoryDisease','No',NULL,'admin','2016-07-10 20:23:41','2016-07-10 20:23:41');
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
  `entryTime` varchar(255) DEFAULT NULL,
  `bp` decimal(10,0) DEFAULT NULL,
  `pr` decimal(10,0) DEFAULT NULL,
  `ap` decimal(10,0) DEFAULT NULL,
  `vp` decimal(10,0) DEFAULT NULL,
  `tmp` decimal(10,0) DEFAULT NULL,
  `ufr` decimal(10,0) DEFAULT NULL,
  `totalUF` decimal(10,0) DEFAULT NULL,
  `bfr` decimal(10,0) DEFAULT NULL,
  `ebf` decimal(10,0) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`intraId`,`entryNumber`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartIntra_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartIntra_ibfk_2` FOREIGN KEY (`intraId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartIntra`
--

LOCK TABLES `monitoringChartIntra` WRITE;
/*!40000 ALTER TABLE `monitoringChartIntra` DISABLE KEYS */;
INSERT INTO `monitoringChartIntra` VALUES ('JP1-2016-1',2,0,'1',5,6,6,8,5,4,6,7,6,'hgj','admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,1,'54',57,5,33,7,4,6,3444,4,6,'abc','admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,2,'7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',2,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:28:32','2016-07-10 16:28:32'),('JP1-2016-1',4,0,'89',89,89,89,89,9,899,9,89,89,'adih','admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,1,'1',1,1,1,1,1,1,1,1,1,'aish','admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,2,'2',2,2,2,2,2,2,2,2,2,'aaa','admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,3,'3',3,3,3,3,3,3,3,3,3,'asdsda','admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,4,'5',1,51,351,535,135,135,135,35,13,'dlidj','admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,5,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 17:27:45','2016-07-10 17:27:45'),('JP1-2016-1',4,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 17:27:45','2016-07-10 17:27:45');
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
  `postWeight` decimal(10,0) DEFAULT NULL,
  `weightLoss` decimal(10,0) DEFAULT NULL,
  `UFReading` int(11) DEFAULT NULL,
  `BPSitting` int(11) DEFAULT NULL,
  `BPStanding` int(11) DEFAULT NULL,
  `temperature` decimal(10,0) DEFAULT NULL,
  `pulse` int(11) DEFAULT NULL,
  `symptomaticHypotension` varchar(255) DEFAULT NULL,
  `prolongedBleeding` varchar(255) DEFAULT NULL,
  `bruit` varchar(255) DEFAULT NULL,
  `subjectiveStatement` varchar(255) DEFAULT NULL,
  `cardiacStatus` varchar(255) DEFAULT NULL,
  `respiratoryStatus` varchar(255) DEFAULT NULL,
  `mentalStatus` varchar(255) DEFAULT NULL,
  `ambulatoryStatus` varchar(255) DEFAULT NULL,
  `KtVAchieved` decimal(10,0) DEFAULT NULL,
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
  CONSTRAINT `monitoringChartPost_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPost`
--

LOCK TABLES `monitoringChartPost` WRITE;
/*!40000 ALTER TABLE `monitoringChartPost` DISABLE KEYS */;
INSERT INTO `monitoringChartPost` VALUES ('JP1-2016-1',3,78,67,6,5,5,1,0,NULL,'Yes','Yes','a','a','a','a','a',0,1,'a','internal','Yes',0,'a','a','aa','admin','2016-07-10 16:34:16','2016-07-10 16:34:16');
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
  CONSTRAINT `monitoringChartPreAccessAssessment_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreAccessAssessment`
--

LOCK TABLES `monitoringChartPreAccessAssessment` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreAccessAssessment` DISABLE KEYS */;
INSERT INTO `monitoringChartPreAccessAssessment` VALUES ('JP1-2016-1',1,'Good','No',NULL,NULL,NULL,'adesh','Rishabh','aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-1',4,'Fair','nope','No','no_problem','NormalFlow','aish','aishwarya','admin','2016-07-10 17:26:42','2016-07-10 17:26:42');
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
  `preHDWeight` decimal(10,0) DEFAULT NULL,
  `lastPostHDWeight` decimal(10,0) DEFAULT NULL,
  `weightGain` decimal(10,0) DEFAULT NULL,
  `dryWeight` decimal(10,0) DEFAULT NULL,
  `targetWeightLoss` decimal(10,0) DEFAULT NULL,
  `physicalChestPain` varchar(255) DEFAULT NULL,
  `chestAuscultation` varchar(255) DEFAULT NULL,
  `recentSurgery` varchar(255) DEFAULT NULL,
  `peripheralOedema` varchar(255) DEFAULT NULL,
  `respiratoryStatus` varchar(255) DEFAULT NULL,
  `temperature` decimal(10,0) DEFAULT NULL,
  `pulse` int(11) DEFAULT NULL,
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
  CONSTRAINT `monitoringChartPreAssessment_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreAssessment`
--

LOCK TABLES `monitoringChartPreAssessment` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreAssessment` DISABLE KEYS */;
INSERT INTO `monitoringChartPreAssessment` VALUES ('JP1-2016-1',1,46,40,NULL,40,NULL,'Yes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-1',4,78,74,4,73,5,'Yes','Yes','Yes','Yes','a',2,2,5,5,'Yes','sdjhksj','Yes','dfs','No','Yes','No','No','Yes','No','Yes','No','Yes','Yes','No','true','admin','2016-07-10 17:26:08','2016-07-10 17:26:08');
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
  CONSTRAINT `monitoringChartPreBasic_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasic`
--

LOCK TABLES `monitoringChartPreBasic` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasic` DISABLE KEYS */;
INSERT INTO `monitoringChartPreBasic` VALUES ('JP1-2016-1','0000-00-00 00:00:00',1,1,1,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-1','2016-12-29 18:30:00',2,NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:27:52','2016-07-10 16:27:52'),('JP1-2016-1','2016-12-30 18:30:00',3,1,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 16:33:06','2016-07-10 16:33:06'),('JP1-2016-1','2016-11-29 18:30:00',4,1,1,'1',2,'2:34','12:34','admin','2016-07-10 17:23:42','2016-07-10 17:23:42');
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
  CONSTRAINT `monitoringChartPreBasicMedical_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreBasicMedical`
--

LOCK TABLES `monitoringChartPreBasicMedical` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreBasicMedical` DISABLE KEYS */;
INSERT INTO `monitoringChartPreBasicMedical` VALUES ('JP1-2016-1',1,'xxx','type1','femoral',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-1',4,'typ','Reuse','fistoral','Yes','a','Yes',1,2,NULL,1,3,'admin','2016-07-10 17:24:27','2016-07-10 17:24:27');
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
  `dialysateTemperature` decimal(10,0) DEFAULT NULL,
  `conductivity` varchar(255) DEFAULT NULL,
  `partAConcentrationCombination` varchar(255) DEFAULT NULL,
  `lastModifiedBy` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`preBasicId`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `monitoringChartPreMachineFinalCheck_ibfk_1` FOREIGN KEY (`patientId`) REFERENCES `patientDetails` (`id`),
  CONSTRAINT `monitoringChartPreMachineFinalCheck_ibfk_2` FOREIGN KEY (`preBasicId`) REFERENCES `monitoringChartPreBasic` (`preBasicId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitoringChartPreMachineFinalCheck`
--

LOCK TABLES `monitoringChartPreMachineFinalCheck` WRITE;
/*!40000 ALTER TABLE `monitoringChartPreMachineFinalCheck` DISABLE KEYS */;
INSERT INTO `monitoringChartPreMachineFinalCheck` VALUES ('JP1-2016-1',1,1,'Yes',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-1',4,1,'Yes','aihs','Yes','Yes',NULL,'Yes',36,'13.8','ca20k0na22','admin','2016-07-10 17:25:00','2016-07-10 17:25:00');
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
INSERT INTO `otherDetails` VALUES ('JP1-2016-1','JP3382893','JP-29282HJ2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-2','23456','45678','567','4567','5678','567',NULL,NULL,NULL,NULL,NULL,NULL,'admin','2016-07-10 20:25:11','2016-07-10 20:25:11');
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
INSERT INTO `panelDetails` VALUES ('JP1-2016-1',1,NULL,NULL,'284883',NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00'),('JP1-2016-2',1,'2016-12-30 18:30:00','2016-12-30 18:30:00','111',1,1,'2016-12-30 18:30:00','admin','2016-07-10 20:23:07','2016-07-10 20:23:07');
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
INSERT INTO `panels` VALUES (1,'cghs','govt','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'bahmas','govt','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'xxx','govt','0000-00-00 00:00:00','0000-00-00 00:00:00');
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
INSERT INTO `patientDetails` VALUES ('JP1-2016-1','adesh',NULL,NULL,NULL,'987654321',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aish','0000-00-00 00:00:00','0000-00-00 00:00:00','JP1'),('JP1-2016-2','aish',4,'2012-12-30 18:30:00','Male','9999999998',NULL,'yo','AA','A-','No','unmarried',NULL,NULL,NULL,'No',0,'1234567899','businessman','yo','aa','aa','Panel','yoyo honey singh','yo','No','admin','2016-07-10 20:22:17','2016-07-10 20:22:17','JP1');
/*!40000 ALTER TABLE `patientDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacyTypes`
--

DROP TABLE IF EXISTS `pharmacyTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pharmacyTypes` (
  `pharmacyType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`pharmacyType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacyTypes`
--

LOCK TABLES `pharmacyTypes` WRITE;
/*!40000 ALTER TABLE `pharmacyTypes` DISABLE KEYS */;
INSERT INTO `pharmacyTypes` VALUES ('pharmacytype1','0000-00-00 00:00:00','0000-00-00 00:00:00'),('pharmacytype2','0000-00-00 00:00:00','0000-00-00 00:00:00'),('pharmacytype3','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `pharmacyTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedureTypes`
--

DROP TABLE IF EXISTS `procedureTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `procedureTypes` (
  `procedureType` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`procedureType`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedureTypes`
--

LOCK TABLES `procedureTypes` WRITE;
/*!40000 ALTER TABLE `procedureTypes` DISABLE KEYS */;
INSERT INTO `procedureTypes` VALUES ('proceduretype1','0000-00-00 00:00:00','0000-00-00 00:00:00'),('proceduretype2','0000-00-00 00:00:00','0000-00-00 00:00:00'),('proceduretype3','0000-00-00 00:00:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `procedureTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionType`
--

DROP TABLE IF EXISTS `transactionType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactionType` (
  `type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionType`
--

LOCK TABLES `transactionType` WRITE;
/*!40000 ALTER TABLE `transactionType` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactionType` ENABLE KEYS */;
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
INSERT INTO `transactionTypes` VALUES ('Consumable','0000-00-00 00:00:00','0000-00-00 00:00:00'),('Dialysis','0000-00-00 00:00:00','0000-00-00 00:00:00'),('Pharmacy','0000-00-00 00:00:00','0000-00-00 00:00:00'),('Procedure','0000-00-00 00:00:00','0000-00-00 00:00:00');
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
  `centre` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `incharge` tinyint(1) DEFAULT NULL,
  `manager` tinyint(1) DEFAULT NULL,
  `clinical` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-11 12:52:18

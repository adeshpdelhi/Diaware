-- drop database diaware;
-- create database diaware;
use diaware;
insert into centres (id, name,location,maxPatients,accessLinesAvailable, patientCount,noOfShiftsPerDay,OPDTotalNegativeMachines,typesOfMachinesAvailable,createdAt,updatedAt) values('JP1',"Apex Jaipur","malviya nagar",50,"femoral,fistoral,IJ,central",2,3,10,"NegativeMachines",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt,type) values("JP1-2016-1","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56','Negative');
-- insert into bills(transactionId,status,amount,lastModifiedBy,patientId,createdAt,updatedAt) values(1,"Paid",26.89,"aish","JP1-2016-1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments(appointmentId, patientId, centreId,billingDone, date) values (DEFAULT,"JP1-2016-1","JP1",true, "2016-07-14");
insert into centres( id, name,location,maxPatients,accessLinesAvailable, patientCount,noOfShiftsPerDay,OPDTotalNegativeMachines,typesOfMachinesAvailable,createdAt,updatedAt) values("CH","chandigarh","chandigarh",50,"femoral,fistoral,IJ",1,4,15,"NegativeMachines",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into panels (id, name, details,createdAt,updatedAt) values(1,"cghs","govt",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into panels (id, name, details,createdAt,updatedAt) values(2,"bahmas","govt",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into panels (id, name, details,createdAt,updatedAt) values(3,"xxx","govt",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into panelDetails(patientId,panelId,panelPermissionNumber,lastModifiedBy,createdAt,updatedAt) values("JP1-2016-1",1,284883,"aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into medicalHistory(patientId,diseaseName,diseasePresent,lastModifiedBy,createdAt,updatedAt) values("JP1-2016-1","xxx","Yes","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into otherDetails(patientId,PAN,	aadhar,lastModifiedBy,createdAt,updatedAt) values("JP1-2016-1","JP3382893","JP-29282HJ2","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into majorClinicalEvents(patientId, lastModifiedBy, details,createdAt,updatedAt) values('JP1-2016-1',"aish","a",'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into dialyzateTypes(dialyzateType,createdAt,updatedAt) value ("dialyzatetype1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialyzateTypes(dialyzateType,createdAt,updatedAt) value ("dialyzatetype2",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialyzateTypes(dialyzateType,createdAt,updatedAt) value ("dialyzatetype3",'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into transactionTypes(transactionType,createdAt,updatedAt) value ("dialysis",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into transactionTypes(transactionType,createdAt,updatedAt) value ("pharmacy",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into transactionTypes(transactionType,createdAt,updatedAt) value ("consumable",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into transactionTypes(transactionType,createdAt,updatedAt) value ("procedure",'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('pharmacy','pharmacytype1',200.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('pharmacy','pharmacytype2',300.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('pharmacy','pharmacytype3',100.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('dialysis','dialysistype1',4400.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('dialysis','dialysistype2',2200.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('dialysis','dialysistype3',1290.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('consumable','consumabletype1',110.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('consumable','consumabletype2',40.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('consumable','consumabletype3',140.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('procedure','proceduretype1',2340.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('procedure','proceduretype3',4500.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into ledgerTable(ledgerType,ledgerName,cost,createdAt,updatedAt) values('procedure','proceduretype2',11200.00,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into monitoringChartPreBasic(patientId,monitoringDate,machineNumber,bedNumber,lastModifiedBy,createdAt,updatedAt) values("JP1-2016-1", "2016-07-14",1,1,"aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into monitoringChartPreBasicMedical(preBasicId,patientId,dialyzerName,dialyzerType,accessUsed,lastModifiedBy,createdAt,updatedAt) values(1,"JP1-2016-1", "xxx","type1","femoral","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into monitoringChartPreMachineFinalCheck(preBasicId,patientId,machineNumber,machineTestPassed,lastModifiedBy,createdAt,updatedAt) values(1, "JP1-2016-1",1,"Yes","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into monitoringChartPreAssessment(preBasicId,patientId,preHDWeight,lastPostHDWeight,dryWeight,physicalChestPain,lastModifiedBy,createdAt,updatedAt) values(1,"JP1-2016-1", 45.5,40.2,40,"Yes","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into monitoringChartPreAccessAssessment(preBasicId,patientId,bruit,anyAbnormality,commencedBy,assistedBy,lastModifiedBy,createdAt,updatedAt) values(1, "JP1-2016-1","Good","No","adesh","Rishabh","aish",'2016-07-13 10:48:56','2016-07-13 10:48:56');

-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Mon-1",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Mon-2",2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Mon-3",4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Tue-1",5,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Tue-2",3,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Tue-3",3,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Wed-1",2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Wed-2",4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Wed-3",5,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Thu-1",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Thu-2",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Thu-3",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Fri-1",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Fri-2",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Fri-3",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sat-1",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sat-2",6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sat-3",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sun-1",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sun-2",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into shifts(id,OPDAvailableNegativeMachines,createdAt,updatedAt) values("JP1-Sun-3",0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Monday","JP1-Mon-1",'JP1-Mon-2','JP1-Mon-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Tuesday","JP1-Tue-1",'JP1-Tue-2','JP1-Tue-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Wednesday","JP1-Wed-1",'JP1-Wed-2','JP1-Wed-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Thursday","JP1-Thu-1",'JP1-Thu-2','JP1-Thu-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Friday","JP1-Fri-1",'JP1-Fri-2','JP1-Fri-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Saturday","JP1-Sat-1",'JP1-Sat-2','JP1-Sat-3','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id,createdAt,updatedAt) values('JP1',"Sunday","JP1-Sun-1",'JP1-Sun-2','JP1-Sun-3','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into diseases(diseaseName,createdAt,updatedAt) values('diabetes','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('hypertension','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('coronaryArteryDisease','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('peripheralNeuropathy','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('ratinopathy/Vision','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('cerebrovascularDisease','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('respiratoryDisease','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('malignancy','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('haemoglobiNopathy','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('peripheralVascularDisease','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('hepatitisB','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('hepatitisC','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('HIV','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('malnutrition','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into diseases(diseaseName,createdAt,updatedAt) values('drugAllergy','2016-07-13 10:48:56','2016-07-13 10:48:56');


INSERT INTO `users` (`id`,`username`,`hashedPassword`,`centres`,`admin`,`incharge`,`manager`,`clinical`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'admin','21232f297a57a5a743894a0e4a801fc3','JP1,CH,all',true,false,true,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into vendor(vendorId ,vendorName,vendorAddress, vendorTINNumber,vendorContactPerson,vendorContactPersonNumber,vendorIntroducedBy,vendorIntroducedByName,createdAt,updatedAt) values(DEFAULT, 'kr dispensaries','jaipur',99999,'aishhwarrya',1234567892,'Staff','rishabh','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into vendor(vendorId ,vendorName,vendorAddress, vendorTINNumber,vendorContactPerson,vendorContactPersonNumber,vendorIntroducedBy,vendorIntroducedByName,createdAt,updatedAt) values(DEFAULT, 'corporate office','delhi',99999,'mayank',1234567892,'Staff','rishabh','2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Blood Tubing ','Treatment Specific','Brand A','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Dialysis on/off kit','Treatment Specific','Brand B','kit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Dialyzer','Treatment Specific','Brand C','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Disposable Appron','Treatment Specific','Brand D','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Disposable Appron','Treatment Specific','Brand D','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Disposable Appron','Treatment Specific','Brand D','kit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Double Lumen Catheter','Treatment Specific','Brand A','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Double Lumen Catheter','Treatment Specific','Brand B','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Double Lumen Catheter','Treatment Specific','Brand C','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Double Lumen Catheter','Treatment Specific','Brand D','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Fistula Needle','Treatment Specific','Brand B','kit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Gauze pieces','Treatment Specific','Brand C','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Guide wire','Treatment Specific','Brand D','metre','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Guide wire','Treatment Specific','Brand D','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Heparin','Treatment Specific','Brand A','bottle','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Introducer needle ','Treatment Specific','Brand B','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'IV Set','Treatment Specific','Brand C','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Normal Saline 1000 ml','Treatment Specific','Brand D','bottle','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Normal Saline 500 ml','Treatment Specific','Brand A','bottle','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Part A','Treatment Specific','Brand B','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Part B','Treatment Specific','Brand C','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Single Lumen Catheter','Treatment Specific','Brand C','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Sterile Gloves','Treatment Specific','Brand D','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 1 ml','Treatment Specific','Brand A','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 10 ml','Treatment Specific','Brand B','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 20 ml','Treatment Specific','Brand C','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 20 ml','Treatment Specific','Brand A','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 20 ml','Treatment Specific','Brand A','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 5 ml','Treatment Specific','Brand D','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 5 ml','Treatment Specific','Brand D','kit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Syringe 5 ml','Treatment Specific','Brand E','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Transducer Protector','Treatment Specific','Brand A','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Transducer Protector','Treatment Specific','Brand B','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Transducer Protector','Treatment Specific','Brand C','metre','2016-07-13 10:48:56','2016-07-13 10:48:56');



insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Unsterile Gloves','Treatment Specific','Brand B','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Unsterile Gloves','Treatment Specific','Brand B','unit','2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'Unsterile Gloves','Treatment Specific','Brand C','pair','2016-07-13 10:48:56','2016-07-13 10:48:56');






insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'savlon','General Stock','dettol','bottles','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'savlon','General Stock','dettol3','wide bottles','2016-07-13 10:48:56','2016-07-13 10:48:56');
	
insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'savlon','Treatment Specific','dettol','bottles','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'savlon','Treatment Specific','dettol2','lil bottles','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into item(itemId,itemName,usageType,brandName,quantityMeasurementType,createdAt,updatedAt) values (DEFAULT, 'handwash','Treatment Specific','lifebuoy','bottles','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into indent (centreId,indentId,requestDate,requiredByDate,stockOrderTo,status,createdAt,updatedAt) values('JP1',DEFAULT,'2016-07-13 10:48:56','2016-07-13 10:48:56','Me','Raised','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into indentItems(indentId, itemId, linkedStatus,quantityRequired, availableQuantity, createdAt, updatedAt) values (1,1,'Raised',4,2,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',1,8,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',2,4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',3,6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',4,0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',1,0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',2,5,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',3,2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into stock(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',4,15,'2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',1,8,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',2,4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',3,6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('JP1',4,0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',1,0,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',2,5,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',3,2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into floor(centreId, itemId, availableQuantity, createdAt, updatedAt) values('CH',4,15,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into stockIssued(centreId,stockIssuedId,stockIssuedTo,estimatedSingleUse,estimatedReUse,estimatedNewDialyzer,estimatedCatheterSingleLumen,estimatedCatheterDoubleLumen,stockIssueDate,stockTakerName,nextExpectedStockIssueDate,createdAt, updatedAt) values ('JP1',DEFAULT,'Floor',1,2,3,4,5,'2016-07-13 10:48:56','adesh','2016-07-13 10:48:56','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into stockIssuedItems(stockIssuedId,itemId,quantity,createdAt, updatedAt) values(1,1,4,'2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into consumption(centreId,treatmentType,treatmentId,createdAt, updatedAt) values ('JP1','Single Use',0,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into consumptionItems(treatmentId,itemId,quantity,createdAt,updatedAt) values (0,1,2,'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into generalConsumption(centreId, lastModifiedBy,createdAt,updatedAt) values ('JP1','admin','2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into generalConsumptionItems(generalConsumptionId, itemId, quantity, lastModifiedBy, createdAt, updatedAt) values (1,1,5,'admin','2016-07-13 10:48:56','2016-07-13 10:48:56');

-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Dialyzer','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Blood Tubing','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Fistula Needle','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('IV Set','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Sterile Gloves','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Normal Saline 1000 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Normal Saline 500 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Syringe 10 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Syringe 20 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Syringe 1 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Heparin','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Dialysis on/off kit','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Gauze pieces','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Transducer Protector','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Part A','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Part B','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemName,createdAt,updatedAt) values('Unsterile Gloves','2016-07-13 10:48:56','2016-07-13 10:48:56');

-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Double Lumen Catheter','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Single Lumen Catheter','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Guide wire','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Introducer needle ','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Sterile Gloves','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Syringe 5 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Syringe 10 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Syringe 20 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Syringe 1 ml','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Heparin','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Dialysis on/off kit','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Gauze pieces','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Unsterile Gloves','2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemName,createdAt,updatedAt) values('Disposable Appron','2016-07-13 10:48:56','2016-07-13 10:48:56');

-- insert into dialysisItems(itemId, createdAt, updatedAt) values (1,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemId, createdAt, updatedAt) values (2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemId, createdAt, updatedAt) values (3,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemId, createdAt, updatedAt) values (4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into dialysisItems(itemId, createdAt, updatedAt) values (5,'2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into dialysisItems(itemId, createdAt, updatedAt) values (1,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (3,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (11,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (12,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (15,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (17,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (18,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (19,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (20,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (21,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (23,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (24,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (25,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (26,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (27,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (28,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (32,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (33,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (34,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (35,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (36,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into dialysisItems(itemId, createdAt, updatedAt) values (37,'2016-07-13 10:48:56','2016-07-13 10:48:56');


insert into catheterizationItems(itemId, createdAt, updatedAt) values (2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (5,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (6,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (7,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (8,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (9,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (10,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (12,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (13,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (14,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (15,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (16,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (22,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (23,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (24,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (25,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (26,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (27,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (28,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (29,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (30,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (31,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (35,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (36,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into catheterizationItems(itemId, createdAt, updatedAt) values (37,'2016-07-13 10:48:56','2016-07-13 10:48:56');



-- insert into catheterizationItems(itemId, createdAt, updatedAt) values (1,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemId, createdAt, updatedAt) values (2,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemId, createdAt, updatedAt) values (3,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemId, createdAt, updatedAt) values (4,'2016-07-13 10:48:56','2016-07-13 10:48:56');
-- insert into catheterizationItems(itemId, createdAt, updatedAt) values (5,'2016-07-13 10:48:56','2016-07-13 10:48:56');

-- steps to create an event scheduler:
-- (http://www.mysqltutorial.org/mysql-triggers/working-mysql-scheduled-event/ )
-- 1.SHOW PROCESSLIST;
-- 2.SET GLOBAL event_scheduler = ON;
-- 3.SHOW PROCESSLIST;
-- 4.use diaware;
-- 5:
	-- CREATE EVENT addNextWeeksAppointments   
	-- ON SCHEDULE EVERY 1 DAY 
	-- STARTS '2016-07-22 01:46:00' ON COMPLETION PRESERVE ENABLE 
	-- DO INSERT INTO futureAppointments (centreId, shiftPatientsId,date,dayOfTheWeek,patientId,shiftNumber)	SELECT  P.centreId as centreId, S.id as shiftPatientsId, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY) as date, S.day  as dayOfTheWeek, S.patientId as patientId, S.shiftNumber as shiftNumber  FROM    shiftPatients as S join patientDetails as P 	WHERE S.patientId = P.id  and S.day = (select DAYNAME(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY)));



-- ignore below this
-- CREATE EVENT addNextWeeksAppointments   
-- ON SCHEDULE EVERY 1 DAY 
-- STARTS '2016-07-22 01:43:00' ON COMPLETION PRESERVE ENABLE 
-- DO insert into ledgerTable(ledgerType,ledgerName,cost) values('a','a',1)


-- CREATE EVENT addNextWeeksAppointments    ON SCHEDULE AT CURRENT_TIMESTAMP DO INSERT INTO ledgerTable(ledgerType, ledgerName, cost) values("aish","aish",4000);

-- CREATE EVENT `event_name` 
-- ON SCHEDULE schedule
-- [ON COMPLETION [NOT] PRESERVE] 
-- [ENABLE | DISABLE | DISABLE ON SLAVE]
-- DO BEGIN
-- 	-- event body
-- END;

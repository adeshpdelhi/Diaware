-- drop database diaware;
-- create database diaware;
use diaware;
insert into centres (id, name,location,maxPatients,accessLinesAvailable, patientCount,noOfShiftsPerDay,OPDTotalNegativeMachines) values('JP1',"Apex Jaipur","malviya nagar",50,"femoral,fistoral,IJ,central",2,3,10);
insert into patientDetails (id,name,contact,lastModifiedBy,centreId) values("JP1-2016-1","adesh","987654321","aish", "JP1");
insert into bills(transactionId,status,amount,lastModifiedBy,patientId) values(1,"Paid",26.89,"aish","JP1-2016-1");
insert into centres( id, name,location,maxPatients,accessLinesAvailable, patientCount,noOfShiftsPerDay,OPDTotalNegativeMachines) values("CH","chandigarh","chandigarh",50,"femoral,fistoral,IJ",1,4,15);
insert into panels (id, name, details) values(1,"cghs","govt");
insert into panels (id, name, details) values(2,"bahmas","govt");
insert into panels (id, name, details) values(3,"xxx","govt");
insert into panelDetails(patientId,panelId,panelPermissionNumber,lastModifiedBy) values("JP1-2016-1",1,284883,"aish");
insert into medicalHistory(patientId,diseaseName,diseasePresent,lastModifiedBy) values("JP1-2016-1","xxx","Yes","aish");
insert into otherDetails(patientId,PAN,	aadhar,lastModifiedBy) values("JP1-2016-1","JP3382893","JP-29282HJ2","aish");
insert into majorClinicalEvents(patientId, lastModifiedBy, details) values('JP1-2016-1',"aish","a");
insert into dialyzateTypes(dialyzateType) value ("dialyzatetype1");
insert into dialyzateTypes(dialyzateType) value ("dialyzatetype2");
insert into dialyzateTypes(dialyzateType) value ("dialyzatetype3");
insert into dialysisTypes(dialysisType) value ("dialysistype1");
insert into dialysisTypes(dialysisType) value ("dialysistype2");
insert into dialysisTypes(dialysisType) value ("dialysistype3");
insert into transactionTypes(transactionType) value ("Dialysis");
insert into transactionTypes(transactionType) value ("Pharmacy");
insert into transactionTypes(transactionType) value ("Consumable");
insert into transactionTypes(transactionType) value ("Procedure");
insert into pharmacyTypes(pharmacyType) value ("pharmacytype1");
insert into pharmacyTypes(pharmacyType) value ("pharmacytype2");
insert into pharmacyTypes(pharmacyType) value ("pharmacytype3");
insert into procedureTypes(procedureType) value ("proceduretype1");
insert into procedureTypes(procedureType) value ("proceduretype2");
insert into procedureTypes(procedureType) value ("proceduretype3");
insert into consumableTypes(consumableType) value ("consumabletype1");
insert into consumableTypes(consumableType) value ("consumabletype2");
insert into consumableTypes(consumableType) value ("consumabletype3");
insert into monitoringChartPreBasic(patientId,monitoringDate,machineNumber,bedNumber,lastModifiedBy) values("JP1-2016-1", "2016-07-14",1,1,"aish");
insert into monitoringChartPreBasicMedical(preBasicId,patientId,dialyzerName,dialyzerType,accessUsed,lastModifiedBy) values(1,"JP1-2016-1", "xxx","type1","femoral","aish");
insert into monitoringChartPreMachineFinalCheck(preBasicId,patientId,machineNumber,machineTestPassed,lastModifiedBy) values(1, "JP1-2016-1",1,"Yes","aish");
insert into monitoringChartPreAssessment(preBasicId,patientId,preHDWeight,lastPostHDWeight,dryWeight,physicalChestPain,lastModifiedBy) values(1,"JP1-2016-1", 45.5,40.2,40,"Yes","aish");
insert into monitoringChartPreAccessAssessment(preBasicId,patientId,bruit,anyAbnormality,commencedBy,assistedBy,lastModifiedBy) values(1, "JP1-2016-1","Good","No","adesh","Rishabh","aish");
insert into shifts(id,OPDAvailableNegativeMachines) values("1",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("2",2);
insert into shifts(id,OPDAvailableNegativeMachines) values("3",4);
insert into shifts(id,OPDAvailableNegativeMachines) values("4",5);
insert into shifts(id,OPDAvailableNegativeMachines) values("5",3);
insert into shifts(id,OPDAvailableNegativeMachines) values("6",3);
insert into shifts(id,OPDAvailableNegativeMachines) values("7",2);
insert into shifts(id,OPDAvailableNegativeMachines) values("8",4);
insert into shifts(id,OPDAvailableNegativeMachines) values("9",5);
insert into shifts(id,OPDAvailableNegativeMachines) values("10",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("11",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("12",0);
insert into shifts(id,OPDAvailableNegativeMachines) values("13",0);
insert into shifts(id,OPDAvailableNegativeMachines) values("14",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("15",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("16",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("17",6);
insert into shifts(id,OPDAvailableNegativeMachines) values("18",0);
insert into shifts(id,OPDAvailableNegativeMachines) values("19",0);
insert into shifts(id,OPDAvailableNegativeMachines) values("20",0);
insert into shifts(id,OPDAvailableNegativeMachines) values("21",0);
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Monday","1",'2','3');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Tuesday","4",'5','6');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Wednesday","7",'8','9');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Thursday","10",'11','12');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Friday","13",'14','15');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Saturday","18",'17','16');
insert into weekDaySlots(centreId,dayOfTheWeek,shift1Id,shift2Id,shift3Id) values('JP1',"Sunday","19",'20','21');

-- CREATE EVENT addNextWeeksAppointments
--   ON SCHEDULE
--     EVERY 1 DAY
--     STARTS '2016-07-14 01:10:00' ON COMPLETION PRESERVE ENABLE 
--   DO
--     INSERT INTO futureAppointments (centreId, shiftPatientsId,date,dayOfTheWeek,patientId,shiftNumber)
--     -- OUTPUT inserted.Id, inserted.ColumnA, inserted.ColumnB
--     SELECT  S.id as shiftPatientsId, S.patientId as patientId, P.centreId as centreId, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY) as date, S.dayOfTheWeek  as dayOfTheWeek, S.shiftNumber as shiftNumber
--     FROM    shiftPatients as S join patientDetails as P 
--     WHERE S.patientId == P.id and S.dayOfTheWeek == DAYNAME(DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY));





INSERT INTO `users` (`id`,`username`,`hashedPassword`,`centres`,`admin`,`incharge`,`manager`,`clinical`,`createdAt`,`updatedAt`) VALUES (DEFAULT,'admin','21232f297a57a5a743894a0e4a801fc3','JP1,CH',true,false,true,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');

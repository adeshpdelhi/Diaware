use diaware;
insert into centres (id, name,location,maxPatients,accessLinesAvailable, patientCount,noOfShiftsPerDay,OPDTotalNegativeMachines,typesOfMachinesAvailable,createdAt,updatedAt) values('JP1',"Apex Jaipur","malviya nagar",50,"femoral,fistoral,IJ,central",2,3,10,"NegativeMachines",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-1","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-2","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-3","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-4","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-5","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-6","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-7","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-8","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into patientDetails (id,name,contact,lastModifiedBy,centreId,createdAt,updatedAt) values("JP1-2016-9","adesh","987654321","aish", "JP1",'2016-07-13 10:48:56','2016-07-13 10:48:56');

insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-2','Friday','OPD','Negative Machine','JP1-2016-1',1,true,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-2','Friday','OPD','Negative Machine','JP1-2016-2',2,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-2','Friday','OPD','Negative Machine','JP1-2016-3',3,true,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-3','Saturday','OPD','Negative Machine','JP1-2016-4',1,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-3','Saturday','OPD','Negative Machine','JP1-2016-5',2,true,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-3','Saturday','OPD','Negative Machine','JP1-2016-6',3,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-4','Sunday','OPD','Negative Machine','JP1-2016-7',1,true,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-4','Sunday','OPD','Negative Machine','JP1-2016-8',2,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-4','Sunday','OPD','Negative Machine','JP1-2016-7',3,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-5','Monday','OPD','Negative Machine','JP1-2016-6',1,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-5','Monday','OPD','Negative Machine','JP1-2016-5',2,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-5','Monday','OPD','Negative Machine','JP1-2016-4',3,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-6','Tuesday','OPD','Negative Machine','JP1-2016-3',1,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-6','Tuesday','OPD','Negative Machine','JP1-2016-2',2,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');
insert into appointments (centreId,date,dayOfTheWeek,appointmentType,tmtMachine,patientId,shiftNumber,oneTimeAppointment,createdAt,updatedAt) values('JP1','2016-09-6','Tuesday','OPD','Negative Machine','JP1-2016-1',3,false,'2016-07-13 10:48:56','2016-07-13 10:48:56');

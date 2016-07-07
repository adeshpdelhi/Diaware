-- drop database diaware;
-- create database diaware;
use diaware;
insert into centres (id, name,location,maxPatients, patientCount) values('JP1',"Apex Jaipur","malviya nagar",50,2);
insert into patientDetails (id,name,contact,lastModifiedBy,centreId) values("JP1-2016-1","adesh","987654321","aish", "JP1");
insert into bills(transactionId,status,amount,lastModifiedBy,patientId) values(1,"Paid",26.89,"aish","JP1-2016-1");
insert into centres( id, name,location,maxPatients, patientCount) values("CH","chandigarh","chandigarh",50,1);
insert into panels (id, name, details) values(1,"cghs","govt");
insert into panels (id, name, details) values(2,"bahmas","govt");
insert into panels (id, name, details) values(3,"xxx","govt");


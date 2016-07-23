drop database if exists temp;
create database temp;
use temp;

create table indent( -- if status sent for approval in admin then here status is sent for approval as well
	centreId varchar(60) NOT NULL,
	indentId int primary key NOT NULL AUTO_INCREMENT,
	requestDate date,
	requiredByDate date,
	stockOrderTo varchar(60), -- could be reference to vendor table + corporate office
	status varchar(60), -- status could be: saved, sent, approved, rejected , fulfilled
	lastModifiedBy varchar(60)
);

create table indentItems(
	indentId int references indent(indentId),
	itemNumber int,
	type varchar(60), -- should be 'Raised' or 'Approved' or 'Received'
	itemName varchar(60), -- to simulate array
	usageType varchar(60),
	brandName varchar(60),
	quantityRequired int,
	availabilityQuantity int, -- retrieve from stock
	quantityMeasurementType varchar(60),
	lastModifiedBy varchar(60),
	primary key(indentId,itemNumber)
);

create table stock(
	centreId varchar(60) NOT NULL,
	itemId bigint AUTO_INCREMENT primary key NOT NULL,
	itemName varchar(60),
	usageType varchar(60),
	brandName varchar(60),
	availabilityQuantity int,
	quantityMeasurementType varchar(60),
	lastModifiedBy varchar(60)
);

create table stockIssued(
	centreId varchar(60) NOT NULL,
	stockIssuedId bigint primary key NOT NULL,
	stockIssuedTo varchar(60),
	estimatedSingleUse int,
	estimatedReUse int,
	estimatedNewDialyzer int,
	estimatedCatheterSingleLumen int,
	estimatedCatheterDoubleLumen int,
	stockIssueDate date,
	stockTakerName varchar(60),
	nextExpectedStockIssueDate date,
	lastModifiedBy varchar(60)
);

create table stockIssuedItems(
	stockIssuedId bigint references stockIssued(stockIssuedId),
	itemNumber int, -- to simulate array			   ~~~~~~~~~\
	itemId int, --										 		 \ 
	itemName varchar(60), --								      \
	usageType varchar(60), --									   ---------- denotes a single item entry
	brandName varchar(60), --									  /
	quantity int, --											 /
	quantityMeasurementType varchar(60), --			   _________/
	lastModifiedBy varchar(60),
	primary key(stockIssuedId,itemNumber)
);

create table consumption(
	centreId varchar(60) NOT NULL,
	treatementType varchar(60),
	treatementId bigint primary key NOT NULL,
	lastModifiedBy varchar(60)
);

create table consumptionItems(
	treatementId bigint references consumption(treatementId),
	itemNumber int,
	itemName varchar(60),
	brand varchar(60),
	type varchar(60),
	quanityType varchar(60),
	quantity int,
	lastModifiedBy varchar(60),
	primary key(treatementId,itemNumber)
);

create table dialysisItems(
	itemId int primary key NOT NULL AUTO_INCREMENT,
	itemName varchar(60) NOT NULL
);

create table catheterizationItems(
	itemId int primary key NOT NULL AUTO_INCREMENT,
	itemName varchar(60) NOT NULL
);

create table vendor(
	vendorId int primary key NOT NULL AUTO_INCREMENT,
	vendorName varchar(60),
	vendorAddress varchar(60),
	vendorTINNumber bigint,
	vendorContactPerson varchar(60),
	vendorContactPersonNumber bigint,
	vendorIntroducedBy varchar(60),
	vendorIntroducedByName varchar(60),
	lastModifiedBy varchar(60)
);
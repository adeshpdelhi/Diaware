create table indents(
	centreId varchar NOT NULL,
	indentId int primary key AUTOINCREMENT,
	itemNumber int,
	itemName varchar -- to simulate array
	usageType varchar
	brandName varchar
	quantityRequired int
	availabilityQuantity int, --retrieve from stock
	quantityType varchar
	stockOrderTo varchar, --could be reference to vendor table + corporate office
	status varchar -- status could be: saved, sent, approved, rejected 
);

create table fulfilledIndents(
	centreId varchar NOT NULL,
	indentId int primary key AUTOINCREMENT,
	itemNumber int,
	itemName varchar
	usageType varchar
	brandName varchar
	quantityRequired int
	availabilityQuantity int, --retrieve from stock
	quantityType varchar
	stockOrderTo varchar, --could be reference to vendor table + corporate office
	status varchar -- status could be: saved, sent, approved, rejected 
);

create table stock(
	centreId varchar NOT NULL primary key,
	itemId int primary key,
	itemName varchar
	usageType varchar
	brandName varchar
	availabilityQuantity int
	quantityType varchar
);

create table stockIssued(
	centreId varchar NOT NULL primary key,
	stockIssuedTo varchar
	estimatedTreatmentsNextDay int
	stockIssueDate date
	stockTakerName varchar

	itemNumber int, -- to simulate array		   ~~~~~~~~~\
	itemId int --											 \ 
	itemName varchar --										  \
	usageType varchar --									   ---------- denotes a single item entry
	brandName varchar --									  /
	quantity int --											 /
	quantityType varchar --						   _________/


	nextExpectedStockIssueDate date
);


create table consumption(
	treatementId primary key references monitoringChartPreBasic(preBasicId),
	treatementType varchar
);

create table consumptionDialysis(
	treatementId primary key references consumption(treatementId),
	dialyzerBrand,
	bloodTubing Brand,
	fistulaNeedleBrand,
	IvSetBrand,
	sterileGlovesBrand,
	normalSaline1000mlBrand,
	normalSaline500mlBrand,
	syringe10mlBrand,
	syringe20mlBrand,
	syringe1mlBrand,
	heparinBrand,
	dialysisKitBrand,
	gauzePiecesBrand,
	transducerProtectorBrand,
	partABrand,
	partBBrand,
	unsterileGlovesBrand,
	
	dialyzerType,
	bloodTubing Type,
	fistulaNeedleType,
	IvSetType,
	sterileGlovesType,
	normalSaline1000mlType,
	normalSaline500mlType,
	syringe10mlType,
	syringe20mlType,
	syringe1mlType,
	heparinType,
	dialysisKitType,
	gauzePiecesType,
	transducerProtectorType,
	partAType,
	partBType,
	unsterileGlovesType,
	
	dialyzerQuantityType,
	bloodTubing QuantityType,
	fistulaNeedleQuantityType,
	IvSetQuantityType,
	sterileGlovesQuantityType,
	normalSaline1000mlQuantityType,
	normalSaline500mlQuantityType,
	syringe10mlQuantityType,
	syringe20mlQuantityType,
	syringe1mlQuantityType,
	heparinQuantityType,
	dialysisKitQuantityType,
	gauzePiecesQuantityType,
	transducerProtectorQuantityType,
	partAQuantityType,
	partBQuantityType,
	unsterileGlovesQuantityType,
	
	dialyzerQuantity,
	bloodTubing Quantity,
	fistulaNeedleQuantity,
	IvSetQuantity,
	sterileGlovesQuantity,
	normalSaline1000mlQuantity,
	normalSaline500mlQuantity,
	syringe10mlQuantity,
	syringe20mlQuantity,
	syringe1mlQuantity,
	heparinQuantity,
	dialysisKitQuantity,
	gauzePiecesQuantity,
	transducerProtectorQuantity,
	partAQuantity,
	partBQuantity,
	unsterileGlovesQuantity
);

create table consumptionCatheterization(
	treatementId primary key references consumption(treatementId),


	doubleLumenCatheterBrand,
	singleLumenCatheterBrand,
	guideWireBrand,
	introducerNeedle Brand,
	sterileGlovesBrand,
	syringe5mlBrand,
	syringe10mlBrand,
	syringe20mlBrand,
	syringe1mlBrand,
	heparinBrand,
	dialysisKitBrand,
	gauzePiecesBrand,
	unsterileGlovesBrand,
	disposableAppronBrand,

	doubleLumenCatheterType,
	singleLumenCatheterType,
	guideWireType,
	introducerNeedle Type,
	sterileGlovesType,
	syringe5mlType,
	syringe10mlType,
	syringe20mlType,
	syringe1mlType,
	heparinType,
	dialysisKitType,
	gauzePiecesType,
	unsterileGlovesType,
	disposableAppronType,

	doubleLumenCatheterQuantityType,
	singleLumenCatheterQuantityType,
	guideWireQuantityType,
	introducerNeedle QuantityType,
	sterileGlovesQuantityType,
	syringe5mlQuantityType,
	syringe10mlQuantityType,
	syringe20mlQuantityType,
	syringe1mlQuantityType,
	heparinQuantityType,
	dialysisKitQuantityType,
	gauzePiecesQuantityType,
	unsterileGlovesQuantityType,
	disposableAppronQuantityType,


	doubleLumenCatheterQuantity,
	singleLumenCatheterQuantity,
	guideWireQuantity,
	introducerNeedleQuantity,
	sterileGlovesQuantity,
	syringe5mlQuantity,
	syringe10mlQuantity,
	syringe20mlQuantity,
	syringe1mlQuantity,
	heparinQuantity,
	dialysisKitQuantity,
	gauzePiecesQuantity,
	unsterileGlovesQuantity,
	disposableAppronQuantity,

);

create table vendor(
	vendorId,
	vendorName,
	vendorAddress,
	vendorTINNumber,
	vendorContactPerson,
	vendorContactPersonNumver,
	vendorIntroducedBy,
	vendorintroducedByName
);
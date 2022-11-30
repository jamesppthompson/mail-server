const { findOneByEmail, save } = require('../services/prospect_service');

let userData = {
	name: "", // Name // string
	email: "", // string
	phone: "", // Phone  // strings
	prospectType: "",  // Type  // string
	location: "", // Location  // string
	street: "" , // Street Address  // string

	gender: "", // Gender // Male or Female
	birth: "", //Birthday // date - 08/19/1950
	height: "", // Height  // string
	weight: "", // Weight  // string
	tobacco: "", // Tobacco?  // No or Yes string
	relation: "", // Relation  // string


	maritalStatus: "", // Marital Status  // string
	preexistingConditions: "", // Pre-existing Conditions  // Yes or No string
	typeOfCondition: "", // Type of Condition  // string
	peopleInHousehold: "", // People in Household  // digits
	annualIncome: "", // Annual Income  // string

	selfEmployed: "", // self Employed  // Yes or No string
	qualifyingLifeEvent: "", // Qualifying Life Event  // Yes or No string
	expectantParent: "", // Expectant parent   // Yes or No string
	medications : "", // Medications // string
	healthOfCondition: "", // Health Conditions  // string
	deniedCoverage: "", // Denied Coverage in the Past 12 Months?  // Yes or No string
	treatedByPhysician: "", // Treated By Physician in the Past 12 Months?  // Yes or No string 
	planTypes: "", // Plan Types  // string
	optionalCoverage: "", // Optional Coverage  // string

	currentlyInsured: "",  // Currently Insured  // Yes or No string 
	policyExpires: "",  // Policy Expires  // string
	coveredFor: "",  // Covered For  // string
	currentProvider: "",  // Current Provider  // string
	
	type: "prospect",  // not show  // string
	leadVendor: "",
	campaign: "",

    createdAt: "",
};

function user_data_format() {
        userData.name = "", // Name // string
        userData.email = "", // string
        userData.phone = "", // Phone  // strings
        userData.prospectType = "",  // Type  // string
        userData.location = "", // Location  // string
        userData.street = "" , // Street Address  // string
    
        userData.gender = "", // Gender // Male or Female
        userData.birth = "", //Birthday // date - 08/19/1950
        userData.height = "", // Height  // string
        userData.weight = "", // Weight  // string
        userData.tobacco = "", // Tobacco?  // No or Yes string
        userData.relation = "", // Relation  // string
    
    
        userData.maritalStatus = "", // Marital Status  // string
        userData.preexistingConditions = "", // Pre-existing Conditions  // Yes or No string
        userData.typeOfCondition = "", // Type of Condition  // string
        userData.peopleInHousehold = "", // People in Household  // digits
        userData.annualIncome = "", // Annual Income  // string
    
        userData.selfEmployed = "", // self Employed  // Yes or No string
        userData.qualifyingLifeEvent = "", // Qualifying Life Event  // Yes or No string
        userData.expectantParent = "", // Expectant parent   // Yes or No string
        userData.medications = "", // Medications // string
        userData.healthOfCondition = "", // Health Conditions  // string
        userData.deniedCoverage = "", // Denied Coverage in the Past 12 Months?  // Yes or No string
        userData.treatedByPhysician = "", // Treated By Physician in the Past 12 Months?  // Yes or No string 
        userData.planTypes = "", // Plan Types  // string
        userData.optionalCoverage = "", // Optional Coverage  // string
    
        userData.currentlyInsured = "",  // Currently Insured  // Yes or No string 
        userData.policyExpires = "",  // Policy Expires  // string
        userData.coveredFor = "",  // Covered For  // string
        userData.currentProvider = "",  // Current Provider  // string
        
        userData.type = "prospect",  // not show  // string
        userData.leadVendor = "",
        userData.campaign = "",

        userData.createdAt = "";
}

async function email_parse_from_quotewizard(emailText) {
	// 1. email scraper, else return 0
	
    let position = emailText.indexOf("*Please do not respond to this email.Leads are sent from an unmonitored");
	if(position === -1) { console.log("quotewizard: scraper error"); return false; }

	// 2. email parser from emailText, return object
	
	// 2.1 find lead info in email content
	let fromPosition, toPosition, leadInfo; 
	fromPosition = emailText.indexOf("Contact Information");
	toPosition = emailText.indexOf("Custom Lead Type Name : Exclusive")
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: lead error"); return false }

	leadInfo = emailText.slice(fromPosition, toPosition-1);
	// 2.2 add Lead info
	fromPosition = leadInfo.indexOf("NAME");
	toPosition = leadInfo.indexOf("EMAIL");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: name error"); return false }
	userData.name = leadInfo.slice(fromPosition + 5, toPosition-1);

	fromPosition = leadInfo.indexOf("EMAIL");
	toPosition = leadInfo.indexOf("ADDRESS");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: email error"); return false }
  	userData.email = ((leadInfo.slice(fromPosition + 6, toPosition-1).trim()).toLowerCase());

	fromPosition = leadInfo.indexOf("ADDRESS");
	toPosition = leadInfo.indexOf("PHONE");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: address error"); return false }
	userData.street = leadInfo.slice(fromPosition + 8, toPosition-1);

	fromPosition = leadInfo.indexOf("PHONE");
	toPosition = leadInfo.indexOf("CITY / STATE / ZIP");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: phone error"); return false }
	userData.phone = leadInfo.slice(fromPosition + 6, toPosition-1);

	fromPosition = leadInfo.indexOf("CITY / STATE / ZIP");
	toPosition = leadInfo.indexOf("Health Details");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: state error"); return false }
	userData.location = leadInfo.slice(fromPosition + 19, toPosition-1); 

	fromPosition = leadInfo.indexOf("DATE OF BIRTH");
	toPosition = leadInfo.indexOf("GENDER");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: date error"); return false }
	userData.birth = leadInfo.slice(fromPosition + 14, toPosition-1); 

	fromPosition = leadInfo.indexOf("GENDER");
	toPosition = leadInfo.indexOf("Coverage");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: gender error"); return false }
	userData.gender = leadInfo.slice(fromPosition + 7, toPosition-1);

	fromPosition = leadInfo.indexOf("COVERAGE TYPE");
	toPosition = leadInfo.indexOf("IS MEDICARE");
	if(fromPosition === -1 || toPosition === -1) { console.log("quotewizard: coverage error"); return false }
	//userData.coverageType = leadInfo.slice(fromPosition + 14, toPosition-1);

	fromPosition = leadInfo.indexOf("IS MEDICARE");
	if(fromPosition === -1 ) { console.log("quotewizard: medicare error"); return false }
	//userData.isMedicare = leadInfo.slice(fromPosition + 12, fromPosition + 17) === "True" ? 1 : 0 ;

	userData.leadVendor = "Quote Wizard";
    userData.createdAt = new Date();
	return true;
}

async function email_content_parser(emailText) {

	console.log("======== email content =========", emailText);

    user_data_format();

	switch(1) {
		case 1:
			if( await email_parse_from_quotewizard(emailText) !== false ) break;
		default:
			return false;
	}
	
	// 3. Register in DB
 	console.log("<<<<<<< Prospect Info >>>>>>>>", userData)

	// check if user has already been stored 
	const isExist = await findOneByEmail(userData.email);
	
	if(isExist) {
		console.log('email already saved');
	} else {
		const id = await save(userData);
		console.log("====result of prospect data saving==== ", id );
	}
}

module.exports =  email_content_parser;
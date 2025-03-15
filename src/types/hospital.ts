// Location
export interface LocationData {
	state: string;
	lga: string;
}

export type NigerianStates = {
	[key: string]: string[];
};

// Other Details
export interface HospitalFormData {
	[key: string]: string;
	hospitalName: string;
	tier: string;
	address: string;
	phone_number: string;
	email_address: string;
}

export interface SecurityFormData {
	[key: string]: string;
	password: string;
	confirm_password: string;
}

export type FormSections = LocationData | HospitalFormData | SecurityFormData;

export interface HospitalRegistrationData {
	[key: string]: FormSections;
	location: LocationData;
	hospital: HospitalFormData;
	security: SecurityFormData;
}

export interface Hospital {
	name: string;
	state: string;
	lga: string;
	tier: string;
	address: string;
	phoneNumber: string;
	email: string;
	password: string;
}
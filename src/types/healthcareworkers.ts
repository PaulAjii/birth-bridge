export interface HealthCareWorkers {
	[key: string]: string;
	name: string;
	category: string;
	license_number: string;
	phone_number: string;
	email_address: string;
}

export interface HCWSecurityData {
	[key: string]: string;
	password: string;
	confirm_password: string;
}

export interface HCWData {
	biodata: HealthCareWorkers;
	hcw_security: HCWSecurityData;
}

export interface Workers {
	_id: string;
	hospitalID: string;
	name: string;
	category: string;
	license_number: string;
	phone_number: string;
	email_address: string;
	password: string;
}

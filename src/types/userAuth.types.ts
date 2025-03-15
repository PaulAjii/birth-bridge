export interface AuthData {
	email: string;
	password: string;
}
export interface HospitalData {
	_id: string;
	name: string;
	state: string;
	lga: string;
	tier: string;
	address: string;
	phoneNumber: string;
	email: string;
	createdAt: string;
	__v: number;
}

export interface ResponseData {
	hospital?: HospitalData;
	accessToken: string;
}

export interface APIResponse {
	status: string;
	message: string;
	data?: ResponseData;
}
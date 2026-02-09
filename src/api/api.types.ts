// src/api/types/api.types.ts

// -----------------------------------------------------------

// Generic JSON helpers
export type JsonPrimitive = string | number | boolean | null;
export type AnyJson = JsonPrimitive | { [key: string]: AnyJson } | AnyJson[];

// ------------------------------ API RESPONSE ------------------------------
export type ApiSuccess<T> = {
	success: true;
	data: T;
	message?: string;
};

export type ApiFail = {
	success: false;
	message?: string;
	error?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFail;

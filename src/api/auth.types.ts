// src/api/types/auth.types.ts

// -----------------------------------------------------------

// ------------------------------ AUTH PAYLOADS ------------------------------
export interface SignUpPayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface SignInPayload {
	email: string;
	password: string;
}

// ------------------------------ USER ------------------------------
export interface User {
	id: string;
	email: string;
	fullName?: string; // derived / optional
	createdAt: string;
	updatedAt: string;
}

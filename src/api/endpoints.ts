// src/api/endpoints.ts

// ==================== CENTRALIZED FRONTEND ENDPOINTS ===================
export const ENDPOINTS = {
	// ------------------------------ AUTH ------------------------------
	signup: "/api/auth/signup",
	sendVerificationCode: "/api/auth/send-code",
	verifyEmail: "/api/auth/verify-email",
	signin: "/api/auth/signin",
	checkEmail: "/api/auth/check-email",
	me: "/api/auth/me",
	changePassword: "/api/auth/change-password",
	forgotPassword: "/api/auth/forgot-password",
	resetPassword: "/api/auth/reset-password",
	signout: "/api/auth/signout",

	// ------------------------------ TAX ENDPOINTS ------------------------------
	// ---------------------- PUBLIC ----------------------
	taxCalculatePublic: (taxType: string) => `/api/tax/${taxType}/calculate`,

	// ---------------------- PUBLIC SHORTCUT ----------------------
	taxCalculate: (taxType: string) => `/api/tax/${taxType}/calculate`,

	// ---------------------- PRIVATE ----------------------
	taxCalculatePrivate: (taxType: string) =>
		`/api/tax/${taxType}/calculate/save`,

	// ------------------------------ VAT ENDPOINTS ------------------------------
	// ---------------------- PUBLIC ----------------------
	vatCalculatePublic: "/api/vat/calculate",

	// ---------------------- PUBLIC SHORTCUT ----------------------
	vatCalculate: "/api/vat/calculate",

	// ---------------------- PRIVATE ----------------------
	vatCalculatePrivate: "/api/vat/calculate/save",
};

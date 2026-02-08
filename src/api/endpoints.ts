// src/api/endpoints.ts

// ================================
// Centralized frontend endpoints for Taxlator
// ================================

export const ENDPOINTS = {
	// ------------------------------ AUTH ------------------------------
	signup: "/api/auth/signup", // create new user
	sendVerificationCode: "/api/auth/send-code", // send email code
	verifyEmail: "/api/auth/verify-email", // verify email with code
	signin: "/api/auth/signin", // login
	me: "/api/auth/me", // current user (protected)
	changePassword: "/api/auth/change-password", // update password (protected)
	forgotPassword: "/api/auth/forgot-password", // request password reset
	resetPassword: "/api/auth/reset-password", // reset password with token
	signout: "/api/auth/signout", // logout

	// ------------------------------ TAX / VAT CALCULATIONS ------------------------------
	taxCalculatePublic: "/api/tax/taxType/calculate", // public calculation (no save)
	taxCalculatePrivate: "/api/tax/taxType/calculate/save", // authenticated save
	taxCalculate: "/api/tax/taxType/calculate", // shortcut to public TAX calculation
	vatCalculatePublic: "/api/vat/calculate", // public VAT calculation
	vatCalculatePrivate: "/api/vat/calculate/save", // authenticated VAT save
	vatCalculate: "/api/vat/calculate", // shortcut to public VAT calculation
};

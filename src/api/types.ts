// src/api/types.ts
// -----------------------------------------------------------

// Generic JSON helpers
export type JsonPrimitive = string | number | boolean | null;
export type AnyJson = JsonPrimitive | { [key: string]: AnyJson } | AnyJson[];

/* =========================
   AUTH TYPES
========================= */
export interface SignInPayload {
	email: string;
	password: string;
}

export interface SignUpPayload {
	email: string;
	password: string;
	fullName?: string;
}

export interface User {
	id: string;
	email: string;
	fullName?: string;
	createdAt: string;
	updatedAt: string;
}

/* =========================
   PAYE / PIT
========================= */
export interface PayeDeduction {
	key: string;
	label: string;
	amount: number;
	rate?: number;
	base?: number;
	enabled?: boolean;
}

export interface TaxBand {
	label?: string;
	rate: number;
	taxableAmount: number;
	tax: number;
}

export interface PayeResult {
	taxType: "PAYE/PIT";
	frequency: "annual" | "monthly";
	grossIncome: number;
	cra: number;
	deductions: PayeDeduction[];
	totalDeductions: number;
	taxableIncome: number;
	totalTax: number;
	netIncome: number;
	effectiveTaxRate: number;
	computation: TaxBand[];
}

/* =========================
   FREELANCER
========================= */
export interface FreelancerResult {
	taxType: "FREELANCER";
	grossIncome: number;
	totalExpenses: number;
	taxableIncome: number;
	totalTax: number;
	netIncome: number;
	effectiveTaxRate: number;
	computation: TaxBand[];
}

/* =========================
   COMPANY (CIT)
========================= */
export interface CitResult {
	taxType: "CIT";
	companySize: CompanySize;
	annualTurnover: number;
	taxableProfit: number;
	accountingProfit: number;

	// Added for frontend display
	appliedRate: number; // e.g., 0.30 for 30%
	totalTax: number; // final tax due
	netProfitAfterTax: number; // taxableProfit - totalTax
	minimumTaxApplied?: boolean; // true if minimum tax applied

	effectiveTaxRate: number; // raw effective rate
	computation: TaxBand[];
}

/* =========================
   VAT
========================= */
export interface VatResult {
	transactionAmount: number;
	vatAmount: number;
	totalAmount: number;
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
}

/* =========================
   API payloads
========================= */
export interface PayePitCalculatePayload {
	taxType: "PAYE/PIT";
	grossIncome: number;
	pensionApplies: boolean;
	includeNhf: boolean;
	includeNhis: boolean;
	annualRent: number;
	otherDeductions: number;
}

export interface FreelancerCalculatePayload {
	taxType: "FREELANCER";
	grossIncome: number;
	pension: number;
	expenses: number;
}

export interface CitCalculatePayload {
	taxType: "CIT";
	annualTurnover: number;
	fixedAssets: number;
	taxableProfit: number;
	companySize: CompanySize;
	accountingProfit: number;
}

export interface VatCalculatePayload {
	transactionAmount: number;
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
}

/* =========================
   COMPANY SIZE
========================= */
export type CompanySize = "Small" | "Medium" | "Multinational";

/* =========================
   VAT
========================= */
export type VatCalculationType = "add" | "remove";
export type VatTransactionType =
	| "Domestic sale/Purchase"
	| "Export/International"
	| "Digital Services"
	| "Exempt";

/* =========================
   API envelope
========================= */
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

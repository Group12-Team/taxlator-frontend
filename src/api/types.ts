// src/api/types.ts
// -----------------------------------------------------------

// -----------------------------------------------------------
// Domain results
// -----------------------------------------------------------

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

	// Consolidated Relief Allowance
	cra: number;

	// Deductions
	deductions: PayeDeduction[];
	totalDeductions: number;

	// Tax
	taxableIncome: number;
	totalTax: number;
	netIncome: number;
	effectiveTaxRate: number;

	// Breakdown
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
	// Breakdown
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

	taxPayable: number;
	effectiveTaxRate: number;

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

// -----------------------------------------------------------
// API payloads
// -----------------------------------------------------------

/* =========================
   PAYE / PIT
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

/* =========================
   FREELANCER
========================= */

export interface FreelancerCalculatePayload {
	taxType: "FREELANCER";
	grossIncome: number;
	pension: number;
	expenses: number;
}

/* =========================
   COMPANY (CIT)
========================= */

export interface CitCalculatePayload {
	taxType: "CIT";
	annualTurnover: number;
	fixedAssets: number;
	taxableProfit: number;
	companySize: CompanySize;
	accountingProfit: number;
}

/* =========================
   VAT
========================= */

export interface VatCalculatePayload {
	transactionAmount: number;
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
}

// -----------------------------------------------------------
// Shared enums / unions
// -----------------------------------------------------------

/* =========================
   COMPANY SIZE
========================= */

export type CompanySize = "SMALL" | "OTHER" | "MULTINATIONAL";

/* =========================
   VAT
========================= */

export type VatCalculationType = "add" | "remove";

export type VatTransactionType =
	| "Domestic sale/Purchase"
	| "Export/International"
	| "Digital Services"
	| "Exempt";

// -----------------------------------------------------------
// API envelope
// -----------------------------------------------------------

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
// -----------------------------------------------------------
// -----------------------------------------------------------

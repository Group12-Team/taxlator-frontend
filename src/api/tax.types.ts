// src/api/tax.types.ts

// ------------------------------ SHARED ------------------------------
export interface TaxBand {
	limit: number;
	rate: number;
	taxableAmount: number;
	tax: number;
}

// ------------------------------ PAYE / PIT ------------------------------
export interface PayePitCalculatePayload {
	taxType: "PAYE/PIT";
	grossAnnualIncome: number;
	payePitPensionContribution?: boolean;
	nationalHealthInsuranceScheme?: boolean;
	nationalHousingFund?: boolean;
	rentRelief?: number;
	otherDeductions?: number;
	notes?: string;
}

export interface PayePitResult {
	taxType: "PAYE/PIT";
	grossAnnualIncome: number;
	totalDeductions: number;
	taxableIncome: number;
	totalTax: number;
	netIncome: number;
	effectiveTaxRate: number;
	computation: TaxBand[];
}

// ------------------------------ FREELANCER ------------------------------
export interface FreelancerCalculatePayload {
	taxType: "FREELANCER";
	grossAnnualIncome: number;
	freelancerPensionContribution: number;
	totalBusinessExpenses: number;
	notes?: string;
}

export interface FreelancerResult {
	taxType: "FREELANCER";
	grossAnnualIncome: number;
	totalExpenses: number;
	taxableIncome: number;
	totalTax: number;
	netIncome: number;
	effectiveTaxRate: number;
	computation: TaxBand[];
}

// ------------------------------ CIT ------------------------------
export type CompanySize = "Small" | "Other" | "Multinational";

export interface CitCalculatePayload {
	taxType: "CIT";
	annualTurnover: number;
	fixedAssets: number;
	taxableProfit: number;
	companySize: CompanySize;
	accountingProfit?: number;
	notes?: string;
}

export interface CitResult {
	taxType: "CIT";
	companySize: CompanySize;
	annualTurnover: number;
	taxableProfit: number;
	accountingProfit: number;
	appliedRate: number;
	totalTax: number;
	netProfitAfterTax: number;
	minimumTaxApplied?: boolean;
	effectiveTaxRate: number;
	computation: TaxBand[];
}

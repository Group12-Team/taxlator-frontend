// src/types/freelancer.ts
// -----------------------------------------------------------

// ==================== FREELANCER TAX BAND ====================
export interface FreelancerBand {
	label: string;
	rate: number;
	rateFormatted: string;
	taxableAmount: number;
	tax: number;
	taxFormatted: string;
	maxLimit?: number;
}

// ==================== FREELANCER TAX RESPONSE ====================
export interface FreelancerResponse {
	taxType: string;
	country: {
		name: string;
		code: string;
	};
	// ================= SUMMARY =================
	summary: {
		grossAnnualIncome: number;
		netAnnualIncome: number;
		totalAnnualTax: number;
		monthlyTax: number;
		effectiveTaxRate: number;
	};
	// ================= DEDUCTIONS =================
	standardDeductions: {
		pensionContribution: number;
		businessExpenses: number;
	};
	// ================= OTHER =================
	totals: {
		totalDeductions: number;
		taxableIncome: number;
	};
	// ================= PROGRESSIVE =================
	progressive: {
		bands: FreelancerBand[];
		fullBands?: FreelancerBand[];
		totalAnnualTax: number;
		monthlyTax: number;
	};
}

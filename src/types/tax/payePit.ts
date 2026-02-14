// ====================================
// src/types/payePit.ts
// ====================================

// ==================== PAYE/PIT TYPES ====================
export interface PayePitBand {
	label: string;
	rate: number;
	rateFormatted: string;
	taxableAmount: number;
	tax: number;
	taxFormatted: string;
	maxLimit?: number;
}

export interface PayePitResponse {
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
	};
	// ================= DEDUCTIONS =================
	standardDeductions: {
		rentRelief: number;
		pension: number;
		nhis: number;
		nationalInsuranceScheme: number;
		nhf: number;
		otherDeductions: number;
	};
	// ================= OTHER =================
	totals: {
		totalDeductions: number;
		taxableIncome: number;
	};
	// ================= PROGRESSIVE =================
	progressive: {
		bands: PayePitBand[];
		fullBands?: PayePitBand[];
		totalAnnualTax: number;
		monthlyTax: number;
	};
}

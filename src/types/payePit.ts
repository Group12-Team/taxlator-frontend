// src/types/payePit.ts

// ==================== PAYE PIT TYPES ====================
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
	summary: {
		grossAnnualIncome: number;
		netAnnualIncome: number;
		totalAnnualTax: number;
		monthlyTax: number;
	};
	standardDeductions: {
		rentRelief: number;
		pension: number;
		nhis: number;
		nationalInsuranceScheme: number;
		nhf: number;
		otherDeductions: number;
	};
	totals: {
		totalDeductions: number;
		taxableIncome: number;
	};
	progressive: {
		bands: PayePitBand[];
		fullBands?: PayePitBand[];
		totalAnnualTax: number;
		monthlyTax: number;
	};
}

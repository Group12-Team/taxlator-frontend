// ====================================
// src/types/tax/cit.ts
// ====================================

// ==================== CIT TYPES ====================
export interface CitBand {
	taxType: "CIT";
	annualTurnover: number;
	fixedAssets: number;
	taxableProfit: number;
	label: string;
	rateFormatted: string;
	taxableAmount: number;
	tax: number;
	isMultinational: boolean;
	accountingProfit?: number;
}

export interface CitResponse {
	taxType: string;
	country: {
		name: string;
		code: string;
	};

	// ================= SUMMARY =================
	summary: {
		taxableProfit: number;
		netProfit: number;
		totalAnnualTax: number;
		monthlyTax: number;
		companySize: string;
		appliedRate: number;
	};

	// ================== BREAKDOWN ==================
	breakdown: {
		companyType: string;
		citRate: string;
		taxableProfit: number;
		normalCIT: number;
		minimumTax: number;
		finalTax: number;
	};

	// ================== PROGRESSIVE ==================
	progressive: {
		referenceBands: { label: string; rate: string }[];
	};

	// ================== COMPUTATION ==================
	computation: {
		label: string;
		rateFormatted: string;
		taxableAmount: number;
		tax: number;
	}[];
}

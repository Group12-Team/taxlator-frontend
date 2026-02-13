// src/types/tax/cit.ts
// -----------------------------------------------------------

// ==================== CIT PROGRESSIVE BAND ====================
export interface CitProgressiveBand {
	key: string;
	description: string;
	condition: string;
	rate: number;
}

// ==================== CIT COMPUTATION ROW ====================
export interface CitComputationRow {
	label: string;
	rate: number | string;
	rateFormatted: string;
	taxableAmount: number;
	tax: number;
	taxFormatted: string;
}

// ==================== CIT SUMMARY ====================
export interface CitSummary {
	annualTurnover: number;
	taxableProfit: number;
	accountingProfit: number;
	totalTax: number;
	netProfitAfterTax: number;
	appliedRate: number;
	effectiveTaxRate: number;
	minimumTaxApplied: boolean;
	appliedBand: string | null;
}

// ==================== CIT RESPONSE ====================
export interface CitResponse {
	taxType: string;
	country: string;

	// ================= SUMMARY =================
	summary: CitSummary;

	// ================= CLASSIFICATION / BANDS =================
	progressive: {
		bands: CitProgressiveBand[];
		appliedBand: string | null;
	};

	// ================= COMPUTATION =================
	computation: CitComputationRow[];
}

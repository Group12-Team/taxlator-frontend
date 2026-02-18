// ====================================
import type { HistoryType } from "../types/history.type";
// ====================================

// ====================================
type SectionConfig = {
	order?: string[]; // preferred key order
	labels?: Record<string, string>; // key → UI label
};
// ====================================

// ====================================
type HistoryDisplayConfig = Record<
	HistoryType,
	Record<string, SectionConfig> // section name → config
>;
// ====================================

// ==================================== HISTORY DISPLAY CONFIG ====================================
export const historyDisplayConfig: HistoryDisplayConfig = {
	PAYE: {
		summary: {
			order: [
				"grossAnnualIncome",
				"netAnnualIncome",
				"totalAnnualTax",
				"monthlyTax",
			],
			labels: {
				grossAnnualIncome: "Gross Annual Income",
				netAnnualIncome: "Net Annual Income",
				totalAnnualTax: "Total Annual Tax",
				monthlyTax: "Monthly Tax",
			},
		},

		standardDeductions: {
			labels: {
				rentRelief: "Rent Relief",
				pension: "Pension",
				nhis: "NHIS",
				nhf: "NHF",
				otherDeductions: "Other Deductions",
			},
		},

		totals: {
			order: ["totalDeductions", "taxableIncome"],
			labels: {
				totalDeductions: "Total Deductions",
				taxableIncome: "Taxable Income",
			},
		},
	},

	VAT: {},
	CIT: {},
	FREELANCER: {},
};

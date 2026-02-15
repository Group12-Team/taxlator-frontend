// ====================================
// src/types/tax/vat.types.ts
// ====================================

// ==================================== VAT TYPES ================================
export type VatCalculationType = "add" | "remove";

export type VatTransactionType =
	| "Domestic sale/Purchase"
	| "Digital Services"
	| "Export/International"
	| "Exempt Items";

export interface VatResponse {
	taxType: string;
	country: {
		name: string;
		code: string;
	};

	// ================= SUMMARY =================
	summary: {
		transactionAmount: number;
		baseAmount: number;
		vatAmount: number;
		totalAmount: number;
		vatRate: number;
	};

	// ================= TOTALS =================
	totals: {
		totalWithVat: number;
		totalVat: number;
	};

	// ================= PROGRESSIVE =================
	progressive: {
		transactionAmountFormatted: string;
		calculationType: string | null;
		transactionType: string | null;
		vatRateFormatted: string;
		baseAmountFormatted: string;
		vatAmountFormatted: string;
		totalAmountFormatted: string;
	};
}

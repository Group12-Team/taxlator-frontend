// src/types/vat.ts
// -----------------------------------------------------------

// ==================== VAT RESPONSE ====================
export interface VatResponse {
	taxType: string;
	country: string;

	// ================= RAW NUMERIC VALUES =================
	transactionAmount: number;
	baseAmount: number;
	vatRate: number;
	vatAmount: number;
	totalAmount: number;

	// ================= FORMATTED VALUES =================
	transactionAmountFormatted: string;
	baseAmountFormatted: string;
	vatAmountFormatted: string;
	totalAmountFormatted: string;
	vatRateFormatted: string;

	// ================= METADATA =================
	transactionType: string;
	calculationType: string;
	customer: string | null;
	invoiceNumber: string | null;
}

// src/api/vat.types.ts
// -----------------------------------------------------------

// ------------------------------ VAT ------------------------------
export type VatCalculationType = "add" | "remove";

export type VatTransactionType =
	| "Domestic sale/Purchase"
	| "Export/International"
	| "Digital Services"
	| "Exempt Items";

export interface VatCalculatePayload {
	transactionAmount: number;
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
}

// ------------------------------- VAT RESULT ------------------------------
export interface VatResult {
	transactionAmount: number;
	vatAmount: number;
	totalAmount: number;
	vatRate: number;
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
	customer?: string;
	invoiceNumber?: string;
}

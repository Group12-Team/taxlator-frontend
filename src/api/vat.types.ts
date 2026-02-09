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
	transactionAmount: number; // Excluding VAT
	vatAmount: number; // Calculated VAT
	totalAmount: number; // Including VAT (or same as transactionAmount for remove)
	vatRate: number; // e.g., 0.075
	calculationType: VatCalculationType;
	transactionType: VatTransactionType;
	customer?: string; // optional, only if provided
	invoiceNumber?: string; // optional, only if provided
}


// src/utils/numberInput.ts

// -----------------------------------------------------------
// Number input helpers
// -----------------------------------------------------------

/**
 * Keep only digits (0–9)
 * Useful for strict numeric inputs like OTP, phone numbers, etc.
 */
export function onlyNumbers(value: string): string {
	return value.replace(/\D/g, "");
}

/**
 * Format number string with commas for display
 * Example: "1250000" -> "1,250,000"
 */
export function formatNumber(value: string): string {
	if (!value) return "";

	const cleaned = value.replace(/,/g, "").trim();
	if (!cleaned) return "";

	const n = Number(cleaned);
	if (!Number.isFinite(n)) return value;

	return n.toLocaleString("en-NG");
}

/**
 * Parse formatted number back to a safe number
 * Example: "1,250,000" -> 1250000
 */
export function parseNumber(value: string): number {
	const cleaned = value.replace(/,/g, "").trim();
	if (!cleaned) return 0;

	const n = Number(cleaned);
	return Number.isFinite(n) ? n : 0;
}

/**
 * Format a number as Nigerian Naira currency
 * Example: 1250000 -> "₦1,250,000"
 */
export function formatCurrency(amount: number): string {
	if (!Number.isFinite(amount)) return "₦0";
	return `₦${amount.toLocaleString("en-NG")}`;
}

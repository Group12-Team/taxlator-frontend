// src/utils/numberInput.ts

// ----------------------- Only Numbers -----------------------
export function onlyNumbers(value: string): string {
	return value.replace(/\D/g, "");
}

// ----------------------- Format Number with Commas -----------------------
export function formatNumber(value: string): string {
	if (!value) return "";

	const cleaned = value.replace(/,/g, "").trim();
	if (!cleaned) return "";

	const n = Number(cleaned);
	if (!Number.isFinite(n)) return value;

	return n.toLocaleString("en-NG");
}

// ----------------------- Parse Number from Formatted String -----------------------
export function parseNumber(value: string): number {
	const cleaned = value.replace(/,/g, "").trim();
	if (!cleaned) return 0;

	const n = Number(cleaned);
	return Number.isFinite(n) ? n : 0;
}

// ----------------------- Currency Formatting -----------------------
export function formatCurrency(amount: number): string {
	if (!Number.isFinite(amount)) return "₦0";
	return `₦${amount.toLocaleString("en-NG")}`;
}

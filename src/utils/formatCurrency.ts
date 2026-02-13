// src/utils/formatCurrency.ts
// -----------------------------------------------------------

type FormatCurrencyOptions = {
	currency?: "NGN" | string;
	locale?: string;
	decimals?: number;
	fallback?: string;
};

export function formatCurrency(
	amount: number,
	{
		currency = "NGN",
		locale = "en-NG",
		decimals = 0,
		fallback = "₦0",
	}: FormatCurrencyOptions = {},
): string {
	if (!Number.isFinite(amount)) return fallback;

	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	}).format(amount);
}

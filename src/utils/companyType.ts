// ====================================
// src/utils/companyType.ts
// ====================================

// =============================== NORMALIZATION ================================
function normalize(companySize?: string): string {
	return (companySize ?? "").trim().toUpperCase();
}

// =============================== MULTINATIONAL ================================
export function isMultinationalCompany(companySize?: string): boolean {
	return normalize(companySize) === "MULTINATIONAL";
}

// =============================== SMALL ================================
export function isSmallCompany(companySize?: string): boolean {
	return normalize(companySize) === "SMALL";
}

// =============================== OTHER (DEFAULT) ================================
export function isOtherCompany(companySize?: string): boolean {
	const size = normalize(companySize);

	return size === "OTHER" || (size !== "SMALL" && size !== "MULTINATIONAL");
}

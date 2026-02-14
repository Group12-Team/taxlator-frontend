// ====================================
// src/utils/calculateButtonValidation.ts
// ====================================

// ============================== CALCULATION VALIDATION UTILITIES ==============================

// ============================== CIT CALCULATION VALIDATION
export function isCitCalculationValid(params: {
	annualTurnoverNumber: number;
	fixedAssetsNumber: number;
	taxableProfitNumber: number;
	accountingProfitNumber: number;
	companySize: string;
	busy: boolean;
}): boolean {
	const {
		annualTurnoverNumber,
		fixedAssetsNumber,
		taxableProfitNumber,
		accountingProfitNumber,
		companySize,
		busy,
	} = params;

	return (
		annualTurnoverNumber > 0 &&
		fixedAssetsNumber > 0 &&
		taxableProfitNumber > 0 &&
		(companySize !== "Multinational" || accountingProfitNumber > 0) &&
		!busy
	);
}

// ============================== FREELANCER CALCULATION VALIDATION
export function isFreelancerCalculationValid(params: {
	grossAnnualIncomeNumber: number;
	busy: boolean;
}): boolean {
	const { grossAnnualIncomeNumber, busy } = params;
	return grossAnnualIncomeNumber > 0 && !busy;
}

// ============================== PAYE/PIT CALCULATION VALIDATION
export function isPayePitCalculationValid(params: {
	grossAnnualIncomeNumber: number;
	busy: boolean;
}): boolean {
	const { grossAnnualIncomeNumber, busy } = params;
	return grossAnnualIncomeNumber > 0 && !busy;
}

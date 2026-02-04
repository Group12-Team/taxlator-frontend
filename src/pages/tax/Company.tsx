// src/pages/tax/Company.tsx
// -----------------------------------------------------------

import { useMemo, useState, useEffect } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { addHistory } from "../../state/history";
import type { CitCalculatePayload, CitResult } from "../../api/types";
import { useAuth } from "../../state/useAuth";
import CompanyResultPanel from "./CompanyResultPanel";

// -----------------------------------------------------------
// Helpers Imports
// -----------------------------------------------------------
import { parseNumber, formatNumber } from "../../utils/numberInput";
import type { ApiResponse } from "../../api/types";
import TaxProceedButton from "../../components/ui/buttons/TaxProceedButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import CompanySizeSelect, {
	type CompanySize,
} from "../../components/ui/inputs/CompanySizeSelect";

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function Company() {
	const { authenticated } = useAuth();

	// form state
	// ---------------------------
	const [annualTurnover, setAnnualTurnover] = useState("");
	const [fixedAssets, setFixedAssets] = useState("");
	const [taxableProfit, setTaxableProfit] = useState("");
	const [companySize, setCompanySize] = useState<CompanySize | "">("");
	const [accountingProfit, setAccountingProfit] = useState("");

	// request state triad
	// ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<CitResult | null>(null);

	// derived numeric values
	// ---------------------------
	const annualTurnoverNumber = useMemo(
		() => parseNumber(annualTurnover),
		[annualTurnover],
	);

	const fixedAssetsNumber = useMemo(
		() => parseNumber(fixedAssets),
		[fixedAssets],
	);

	const taxableProfitNumber = useMemo(
		() => parseNumber(taxableProfit),
		[taxableProfit],
	);

	const accountingProfitNumber = useMemo(
		() => parseNumber(accountingProfit),
		[accountingProfit],
	);

	// Clear accounting profit if not multinational
	// ---------------------------
	useEffect(() => {
		if (companySize !== "MULTINATIONAL") {
			setAccountingProfit("");
		}
	}, [companySize]);

	async function calculate() {
		if (!companySize || annualTurnoverNumber <= 0) return;

		setError("");
		setBusy(true);

		try {
			const payload: CitCalculatePayload = {
				taxType: "CIT",
				annualTurnover: annualTurnoverNumber,
				fixedAssets: fixedAssetsNumber,
				taxableProfit: taxableProfitNumber,
				companySize,
				accountingProfit: accountingProfitNumber,
			};

			const { data } = await api.post<ApiResponse<CitResult>>(
				ENDPOINTS.taxCalculate,
				payload,
			);

			if (!data.success) {
				setError(data.message || data.error || "CIT calculation failed");
				return;
			}

			setResult(data.data);

			addHistory({
				type: "COMPANY",
				input: payload,
				result: data.data,
			});
		} finally {
			setBusy(false);
		}
	}

	return (
		<TaxPageLayout
			title="Company Income Tax"
			subtitle="Calculate company income tax based on Nigerian CIT rules."
			rightPanel={
				result ? (
					<CompanyResultPanel
						result={result}
						companySize={companySize || undefined}
						isAuthenticated={authenticated}
					/>
				) : undefined
			}
		>
			{error && (
				<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
					{error}
				</div>
			)}

			{/* Annual Turnover */}
			<CurrencyInput
				id="annual-turnover"
				label="Annual Turnover"
				value={formatNumber(annualTurnover)}
				onChange={(v) => setAnnualTurnover(v.replace(/,/g, ""))}
			/>

			{/* Fixed Assets */}
			<CurrencyInput
				id="fixed-assets"
				label="Fixed Assets"
				value={formatNumber(fixedAssets)}
				onChange={(v) => setFixedAssets(v.replace(/,/g, ""))}
			/>

			{/* Taxable Profit */}
			<CurrencyInput
				id="taxable-profit"
				label="Taxable Profit"
				value={formatNumber(taxableProfit)}
				onChange={(v) => setTaxableProfit(v.replace(/,/g, ""))}
			/>

			{/* Company Size */}
			<CompanySizeSelect value={companySize} onChange={setCompanySize} />

			{/* Accounting Profit (Multinationals only) */}
			{companySize === "MULTINATIONAL" && (
				<CurrencyInput
					id="accounting-profit"
					label="Accounting Profit"
					value={formatNumber(accountingProfit)}
					onChange={(v) => setAccountingProfit(v.replace(/,/g, ""))}
				/>
			)}

			{/* Proceed */}
			<TaxProceedButton onClick={calculate} loading={busy} />
		</TaxPageLayout>
	);
}

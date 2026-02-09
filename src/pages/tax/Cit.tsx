// src/pages/tax/Cit.tsx

// -----------------------------------------------------------
import { useMemo, useState, useEffect } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import { useAuth } from "../../state/useAuth";
import type { CitCalculatePayload, CitResult } from "../../api/tax.types";
import CitResultPanel from "./CitResultPanel";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CompanySizeSelect from "../../components/ui/inputs/CompanySizeSelect";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import type { ApiResponse } from "../../api/api.types";

// ---------------------------------------- CIT CALCULATOR PAGE --------------------------------
export default function CIT() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	const [annualTurnover, setAnnualTurnover] = useState("");
	const [fixedAssets, setFixedAssets] = useState("");
	const [taxableProfit, setTaxableProfit] = useState("");
	const [companySize, setCompanySize] = useState<
		"" | "Small" | "Other" | "Multinational"
	>("");
	const [accountingProfit, setAccountingProfit] = useState("");

	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<CitResult | null>(null);

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

	const isCalculationValid =
		annualTurnoverNumber > 0 &&
		fixedAssetsNumber >= 0 &&
		taxableProfitNumber > 0 &&
		(companySize !== "Multinational" || accountingProfitNumber > 0) &&
		!busy;

	useEffect(() => {
		if (companySize !== "Multinational") setAccountingProfit("");
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
				accountingProfit:
					companySize === "Multinational" ? accountingProfitNumber : undefined,
			};

			const { data } = await api.post<ApiResponse<CitResult>>(
				ENDPOINTS.taxCalculate("cit"),
				payload,
			);

			if (!data.success) {
				setError(data.message || data.error || "CIT calculation failed");
				return;
			}

			setResult(data.data);

			if (authenticated) {
				addHistory({
					type: "CIT",
					input: payload,
					result: data.data,
				});
			}
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
					<CitResultPanel result={result} isAuthenticated={authenticated} />
				) : undefined
			}
		>
			{error && (
				<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
					{error}
				</div>
			)}

			<CurrencyInput
				id="annual-turnover"
				label="Annual Turnover"
				value={formatNumber(annualTurnover)}
				onChange={(v) => setAnnualTurnover(onlyNumbers(v))}
			/>

			<CurrencyInput
				id="fixed-assets"
				label="Fixed Assets"
				value={formatNumber(fixedAssets)}
				onChange={(v) => setFixedAssets(onlyNumbers(v))}
			/>

			<CurrencyInput
				id="taxable-profit"
				label="Taxable Profit"
				value={formatNumber(taxableProfit)}
				onChange={(v) => setTaxableProfit(onlyNumbers(v))}
			/>

			<CompanySizeSelect value={companySize} onChange={setCompanySize} />

			{companySize === "Multinational" && (
				<CurrencyInput
					id="accounting-profit"
					label="Accounting Profit"
					value={formatNumber(accountingProfit)}
					onChange={(v) => setAccountingProfit(onlyNumbers(v))}
				/>
			)}

			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isCalculationValid}
			/>
		</TaxPageLayout>
	);
}

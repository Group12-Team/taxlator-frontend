// ====================================
// src/pages/tax/Cit.tsx
// ====================================

// ====================================
import { useMemo, useState, useEffect } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api, API_BASE } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import { useAuth } from "../../state/useAuth";
import type { CitResponse } from "../../types/tax/cit";
import CitResultPanel from "./CitResultPanel";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CompanySizeSelect from "../../components/ui/buttons/CompanySizeSelect";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import type { ApiResponse } from "../../api/api.types";
import { getErrorMessage } from "../../api/getErrorMessage";
import { isCitCalculationValid } from "../../utils/calculateButtonValidation";

// ====================================

// ==================================== CIT UI PAGE =================================
export default function CIT() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	// ==================================== Form state
	const [annualTurnover, setAnnualTurnover] = useState("");
	const [fixedAssets, setFixedAssets] = useState("");
	const [taxableProfit, setTaxableProfit] = useState("");
	const [companySize, setCompanySize] = useState<
		"" | "Small" | "Other" | "Multinational"
	>("");
	const [accountingProfit, setAccountingProfit] = useState("");

	// ==================================== Request state
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<CitResponse | null>(null);

	// ==================================== Derived numbers
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

	// ==================================== Clear accounting profit if company size is not multinational
	useEffect(() => {
		if (companySize !== "Multinational") setAccountingProfit("");
	}, [companySize]);

	// ==================================== Calculation
	async function calculate() {
		if (!companySize || annualTurnoverNumber <= 0) return;

		setError("");
		setBusy(true);

		try {
			// ==================================== Payload construction
			const payload = {
				taxType: "CIT",
				annualTurnover: annualTurnoverNumber,
				fixedAssets: fixedAssetsNumber,
				taxableProfit: taxableProfitNumber,
				isMultinational: companySize === "Multinational",
				accountingProfit:
					companySize === "Multinational" ? accountingProfitNumber : undefined,
			};

			// ==================================== DEV logging for payload
			if (import.meta.env.DEV) {
				console.log("=== Frontend CIT API Call ===");
				console.log("Payload sent:", payload);
				console.log("Full URL:", API_BASE + ENDPOINTS.taxCalculate("cit"));
			}

			// ==================================== Api call
			const response = await api.post<ApiResponse<CitResponse>>(
				ENDPOINTS.taxCalculate("cit"),
				payload,
			);

			if (!response.data.success) {
				setError(response.data.message || "Calculation failed");
				return;
			}

			const dto = response.data.data;

			setResult(dto);

			// ==================================== Authenticated user history logging
			if (authenticated) {
				await addHistory({
					type: "CIT",
					input: payload,
					result: dto,
				});
			}
		} catch (err: unknown) {
			setError(getErrorMessage(err, "CIT calculation failed"));
		} finally {
			setBusy(false);
		}
	}

	// ==================================== Render
	return (
		<TaxPageLayout
			title="Company Income Tax"
			subtitle="Calculate company income tax based on Nigerian CIT rules."
			rightPanel={
				result ? (
					<CitResultPanel
						backendResult={result}
						isAuthenticated={authenticated}
						prefillEmail=""
					/>
				) : null
			}
		>
			{error && (
				<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
					{error}
				</div>
			)}

			<CurrencyInput
				id="annual-turnover"
				label={
					<span>
						Annual turnover <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(annualTurnover)}
				onChange={(v) => setAnnualTurnover(onlyNumbers(v))}
			/>

			<CurrencyInput
				id="fixed-assets"
				label={
					<span>
						Fixed Assets <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(fixedAssets)}
				onChange={(v) => setFixedAssets(onlyNumbers(v))}
				containerClassName="my-3"
			/>

			<CurrencyInput
				id="taxable-profit"
				label={
					<span>
						Taxable Profit <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(taxableProfit)}
				onChange={(v) => setTaxableProfit(onlyNumbers(v))}
				containerClassName="my-3"
			/>

			<CompanySizeSelect value={companySize} onChange={setCompanySize} />

			{companySize === "Multinational" && (
				<CurrencyInput
					id="accounting-profit"
					label={
						<span>
							Accounting Profit <span className="text-red-500">*</span>
						</span>
					}
					value={formatNumber(accountingProfit)}
					onChange={(v) => setAccountingProfit(onlyNumbers(v))}
					containerClassName="my-3"
				/>
			)}

			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isCitCalculationValid({
					annualTurnoverNumber,
					fixedAssetsNumber,
					taxableProfitNumber,
					accountingProfitNumber,
					companySize,
					busy: false,
				})}
			/>
		</TaxPageLayout>
	);
}

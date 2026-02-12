// src/pages/tax/PayePit.tsx
// -----------------------------------------------------------

// imports
// -----------------------------------------------------------
import { useMemo, useState } from "react";
import TaxPageLayout from "../../pages/tax/TaxPageLayout";
import { api, API_BASE } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import { useAuth } from "../../state/useAuth";
import PayePitResultPanel from "./PayePitResultPanel";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import type { ApiResponse } from "../../api/api.types";
import type { PayePitResponse } from "../../types/tax/payePit";

// -----------------------------------------------------------
export default function PayePit() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	// form state
	// ---------------------------
	const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
	const [includeNhf, setIncludeNhf] = useState(false);
	const [includeNhis, setIncludeNhis] = useState(false);
	const [annualRent, setAnnualRent] = useState("");
	const [otherDeductions, setOtherDeductions] = useState("");

	// request state
	// ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<PayePitResponse | null>(null);

	// derived numeric values
	// ---------------------------
	const grossAnnualIncomeNumber = useMemo(
		() => parseNumber(grossAnnualIncome),
		[grossAnnualIncome],
	);

	const rentNumber = useMemo(() => parseNumber(annualRent), [annualRent]);

	const otherDeductionsNumber = useMemo(
		() => parseNumber(otherDeductions),
		[otherDeductions],
	);

	// validation
	// ---------------------------
	const isCalculationValid = grossAnnualIncomeNumber > 0 && !busy;

	// --------------------------- CALCULATE ---------------------------
	async function calculate() {
		setError("");

		if (grossAnnualIncomeNumber <= 0) {
			setError("Gross annual income must be greater than 0");
			return;
		}

		setBusy(true);

		try {
			const payload = {
				taxType: "PAYE/PIT",
				grossAnnualIncome: grossAnnualIncomeNumber,
				payePitPensionContribution: true,
				nationalHousingFund: includeNhf,
				nationalHealthInsuranceScheme: includeNhis,
				rentRelief: rentNumber,
				otherDeductions: otherDeductionsNumber,
			};

			console.log("=== Frontend PAYE/PIT API Call ===");
			console.log("Payload sent:", payload);
			console.log("Full URL:", API_BASE + ENDPOINTS.taxCalculate("payePit"));

			const response = await api.post<ApiResponse<PayePitResponse>>(
				ENDPOINTS.taxCalculate("payePit"),
				payload,
			);

			if (!response.data.success) {
				setError(response.data.message || "Calculation failed");
				return;
			}

			const dto = response.data.data;

			console.log("=== Frontend API DTO (RAW) ===");
			console.log(dto);

			setResult(dto);

			if (authenticated) {
				await addHistory({
					type: "PAYE/PIT",
					input: payload,
					result: dto,
				});
			}
		} catch (err: unknown) {
			const e = err as {
				response?: { data?: { message?: string } };
				message?: string;
			};

			setError(
				e.response?.data?.message || e.message || "PAYE/PIT calculation failed",
			);
		} finally {
			setBusy(false);
		}
	}

	// ---------------------------------------------------- RENDER
	return (
		<TaxPageLayout
			title="PAYE / PIT Calculator"
			subtitle="Calculate your personal income tax based on Nigerian Tax Law (PITA)"
			rightPanel={
				result ? (
					<PayePitResultPanel
						backendResult={result}
						isAuthenticated={authenticated}
						prefillEmail=""
					/>
				) : null
			}
		>
			{error && (
				<div className="mb-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
					{error}
				</div>
			)}

			<CurrencyInput
				id="grossAnnualIncome"
				label={
					<span>
						Gross Annual Income <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(grossAnnualIncome)}
				onChange={(v) => setGrossAnnualIncome(onlyNumbers(v))}
			/>

			<div className="mt-5 rounded-lg border border-brand-200 p-4">
				<div className="text-xs font-medium text-slate-600">
					Pension Contribution
				</div>
				<div className="mt-1 text-xs text-slate-600">8% deduction</div>
			</div>

			<div className="mt-3 flex justify-between rounded-lg border border-brand-200 p-4">
				<div>
					<div className="text-xs font-medium text-slate-600">
						Include National Health Insurance Scheme
					</div>
					<div className="text-xs text-slate-500">5% deduction</div>
				</div>
				<input
					type="checkbox"
					className="h-4 w-4 accent-brand-800"
					checked={includeNhis}
					onChange={(e) => setIncludeNhis(e.target.checked)}
				/>
			</div>

			<div className="mt-3 flex justify-between rounded-lg border border-brand-200 p-4">
				<div>
					<div className="text-xs font-medium text-slate-700">
						Include National Housing Fund
					</div>
					<div className="text-xs text-slate-500">2.5% deduction</div>
				</div>
				<input
					type="checkbox"
					className="h-4 w-4 accent-brand-800"
					checked={includeNhf}
					onChange={(e) => setIncludeNhf(e.target.checked)}
				/>
			</div>

			<CurrencyInput
				id="rentRelief"
				label="Rent Relief (20% of Annual Rent)"
				value={formatNumber(annualRent)}
				onChange={(v) => setAnnualRent(onlyNumbers(v))}
				containerClassName="my-3"
			/>

			<CurrencyInput
				id="otherDeductions"
				label="Other Deductions"
				value={formatNumber(otherDeductions)}
				onChange={(v) => setOtherDeductions(onlyNumbers(v))}
			/>

			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isCalculationValid}
			/>
		</TaxPageLayout>
	);
}

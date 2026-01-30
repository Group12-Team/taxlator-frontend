// src/pages/tax/PayePit.tsx
// -----------------------------------------------------------

// imports
// -----------------------------------------------------------
import { useMemo, useState } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { addHistory } from "../../state/history";
import type { PayePitCalculatePayload, PayeResult } from "../../api/types";
import { useAuth } from "../../state/useAuth";
import PayePitResultPanel from "./PayePitResultPanel";

// -----------------------------------------------------------
// Helpers Imports
// -----------------------------------------------------------
import { parseNumber, formatNumber } from "../../utils/numberInput";
import type { ApiResponse } from "../../api/types";
import TaxProceedButton from "../../components/ui/TaxProceedButton";
import CurrencyInput from "../../components/CurrencyInput";

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function PayePit() {
	const { authenticated } = useAuth();

	// form state
	// ---------------------------
	const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
	const [includeNhf, setIncludeNhf] = useState(false);
	const [includeNhis, setIncludeNhis] = useState(false);
	const [annualRent, setAnnualRent] = useState("");
	const [otherDeductions, setOtherDeductions] = useState("");

	// request state triad
	// ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<PayeResult | null>(null);

	// derived numeric values
	// ---------------------------
	const grossIncomeNumber = useMemo(
		() => parseNumber(grossAnnualIncome),
		[grossAnnualIncome],
	);
	const rentNumber = useMemo(() => parseNumber(annualRent), [annualRent]);
	const otherDeductionsNumber = useMemo(
		() => parseNumber(otherDeductions),
		[otherDeductions],
	);

	async function calculate() {
		setError("");

		if (grossIncomeNumber <= 0) {
			setError("Gross annual income must be greater than 0");
			return;
		}

		setBusy(true);

		try {
			const payload: PayePitCalculatePayload = {
				taxType: "PAYE/PIT" as const,
				grossIncome: grossIncomeNumber,
				pensionApplies: true,
				includeNhf,
				includeNhis,
				annualRent: rentNumber,
				otherDeductions: otherDeductionsNumber,
			};

			const { data } = await api.post<ApiResponse<PayeResult>>(
				ENDPOINTS.taxCalculate,
				payload,
			);

			// Typed success guard
			// ---------------------------
			if (!data.success) {
				setError(data.message || data.error || "Calculation failed");
				return;
			}

			// Fully typed result
			// ---------------------------
			setResult(data.data);

			// Log to history
			// ---------------------------
			addHistory({
				type: "PAYE/PIT",
				input: payload,
				result: data.data,
			});
		} catch (err: unknown) {
			const e = err as {
				response?: { data?: { message?: string; error?: string } };
				message?: string;
			};
			setError(
				e.response?.data?.message ||
					e.response?.data?.error ||
					e.message ||
					"PAYE/PIT calculation failed",
			);
		} finally {
			setBusy(false);
		}
	}

	return (
		<TaxPageLayout
			title="PAYE / PIT Calculator"
			subtitle="Calculate your personal income tax based on Nigerian Tax Law (PITA)"
			rightPanel={
				result ? (
					<PayePitResultPanel
						result={result}
						grossIncome={grossIncomeNumber}
						isAuthenticated={authenticated}
					/>
				) : null
			}
		>
			{error && (
				<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
					{error}
				</div>
			)}

			{/* Gross Annual Income */}
			<CurrencyInput
				id="grossAnnualIncome"
				label="Gross Annual Income"
				value={formatNumber(grossAnnualIncome)}
				onChange={(v) => setGrossAnnualIncome(v.replace(/,/g, ""))}
			/>

			{/* Pension */}
			<div className="mt-3 rounded-lg border p-4 flex items-center justify-between">
				<div>
					<div className="font-medium text-xs text-slate-600">
						Pension Contribution
					</div>
					<div className="text-xs text-slate-600 mt-1">
						8% deduction on basic salary
					</div>
				</div>
			</div>

			{/* NHIS */}
			<div className="mt-3 rounded-lg border p-4 flex items-start justify-between">
				<div>
					<div className="font-medium text-xs text-slate-600">
						Include National Health Insurance Scheme
					</div>
					<div className="text-xs text-slate-500">
						5% deduction on basic salary
					</div>
				</div>
				<input
					type="checkbox"
					className="h-4 w-4 mt-2 flex-shrink-0 accent-brand-800 cursor-pointer"
					checked={includeNhis}
					onChange={(e) => setIncludeNhis(e.target.checked)}
				/>
			</div>

			{/* NHF */}
			<div className="mt-3 mb-3 rounded-lg border p-4 flex items-start justify-between">
				<div>
					<div className="font-medium text-xs text-slate-700">
						Include National Housing Fund
					</div>
					<div className="text-xs text-slate-500">
						2.5% deduction on basic salary
					</div>
				</div>
				<input
					type="checkbox"
					className="h-4 w-4 mt-2 flex-shrink-0 accent-brand-800 cursor-pointer"
					checked={includeNhf}
					onChange={(e) => setIncludeNhf(e.target.checked)}
				/>
			</div>

			{/* Rent relief */}
			<CurrencyInput
				id="rentRelief"
				label={
					<>
						Rent Relief{" "}
						<span className="text-xs font-normal text-slate-500">
							(20% of Annual Rent)
						</span>
					</>
				}
				value={formatNumber(annualRent)}
				onChange={(v) => setAnnualRent(v.replace(/,/g, ""))}
				placeholder="Input Annual Rent"
				placeholderClassName="placeholder:text-xs placeholder:text-slate-400 "
			/>

			{/* Other deductions */}
			<CurrencyInput
				id="otherDeductions"
				label="Other Deductions"
				value={formatNumber(otherDeductions)}
				onChange={(v) => setOtherDeductions(v.replace(/,/g, ""))}
			/>

			{/* Proceed/calculate button */}
			<TaxProceedButton onClick={calculate} loading={busy} />
		</TaxPageLayout>
	);
}
// -----------------------------------------------------------
// -----------------------------------------------------------

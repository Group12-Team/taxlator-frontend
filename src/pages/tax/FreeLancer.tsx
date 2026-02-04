// src/pages/tax/FreeLancer.tsx
// -----------------------------------------------------------

// imports
// -----------------------------------------------------------

import { useMemo, useState } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { addHistory } from "../../state/history";
import type {
	FreelancerCalculatePayload,
	FreelancerResult,
} from "../../api/types";
import { useAuth } from "../../state/useAuth";
import FreelancerResultPanel from "./FreelancerResultPanel";

// -----------------------------------------------------------
// Helpers
// -----------------------------------------------------------

import { parseNumber, formatNumber } from "../../utils/numberInput";
import type { ApiResponse } from "../../api/types";
import TaxProceedButton from "../../components/ui/buttons/TaxProceedButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function FreeLancer() {
	const { authenticated } = useAuth();

	// form state
	// ---------------------------
	const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
	const [pensionContribution, setPensionContribution] = useState("");
	const [includeExpenses, setIncludeExpenses] = useState(false);
	const [totalBusinessExpenses, setTotalBusinessExpenses] = useState("");

	// request state
	// ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<FreelancerResult | null>(null);

	// derived numbers
	// ---------------------------
	const grossIncomeNumber = useMemo(
		() => parseNumber(grossAnnualIncome),
		[grossAnnualIncome],
	);

	const pensionContributionNumber = useMemo(
		() => parseNumber(pensionContribution),
		[pensionContribution],
	);

	const totalBusinessExpensesNumber = useMemo(
		() => parseNumber(totalBusinessExpenses),
		[totalBusinessExpenses],
	);

	async function calculate() {
		setError("");
		setBusy(true);

		try {
			const payload: FreelancerCalculatePayload = {
				taxType: "FREELANCER",
				grossIncome: grossIncomeNumber,
				pension: pensionContributionNumber,
				expenses: includeExpenses ? totalBusinessExpensesNumber : 0,
			};

			const { data } = await api.post<ApiResponse<FreelancerResult>>(
				ENDPOINTS.taxCalculate,
				payload,
			);

			if (!data.success) {
				setError(data.message || data.error || "Freelancer calculation failed");
				return;
			}

			setResult(data.data);

			addHistory({
				type: "FREELANCER",
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
					"Freelancer calculation failed",
			);
		} finally {
			setBusy(false);
		}
	}

	return (
		<TaxPageLayout
			title="Freelancer / Self-Employed Tax"
			subtitle="Calculate tax on your freelance or business income."
			rightPanel={
				result ? (
					<FreelancerResultPanel
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

			<CurrencyInput
				id="grossAnnualIncome"
				label="Gross Annual Income"
				value={formatNumber(grossAnnualIncome)}
				onChange={(v) => setGrossAnnualIncome(v.replace(/,/g, ""))}
			/>

			<CurrencyInput
				id="pensionContribution"
				label="Pension Contribution"
				value={formatNumber(pensionContribution)}
				onChange={(v) => setPensionContribution(v.replace(/,/g, ""))}
			/>

			<div className="mt-3 rounded-xl border p-4 bg-white">
				<div className="flex items-start justify-between gap-3">
					<div>
						<div className="font-medium text-xs text-slate-600">
							Include Business Expenses
						</div>
						<div className="text-xs text-slate-600 mt-1 mb-2">
							Deduct legitimate business expenses from your income
						</div>
					</div>

					<input
						type="checkbox"
						className="h-4 w-4 mt-2 accent-brand-800 cursor-pointer"
						checked={includeExpenses}
						onChange={(e) => setIncludeExpenses(e.target.checked)}
					/>
				</div>

				{includeExpenses && (
					<CurrencyInput
						id="businessExpenses"
						label="Total Business Expenses"
						value={formatNumber(totalBusinessExpenses)}
						onChange={(v) => setTotalBusinessExpenses(v.replace(/,/g, ""))}
						labelClassName="text-xs font-medium text-slate-400"
					/>
				)}
			</div>

			<TaxProceedButton onClick={calculate} loading={busy} />
		</TaxPageLayout>
	);
}
// -----------------------------------------------------------
// -----------------------------------------------------------

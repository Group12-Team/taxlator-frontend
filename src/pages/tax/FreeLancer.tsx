// src/pages/tax/FreeLancer.tsx

// -----------------------------------------------------------
import { useMemo, useState } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import type {
	FreelancerCalculatePayload,
	FreelancerResult,
} from "../../api/tax.types";
import { useAuth } from "../../state/useAuth";
import FreelancerResultPanel from "./FreelancerResultPanel";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import type { ApiResponse } from "../../api/api.types";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";

// -----------------------------------------------------------
export default function FreeLancer() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	// --------------------------- form state ---------------------------
	const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
	const [pensionContribution, setPensionContribution] = useState("");
	const [includeExpenses, setIncludeExpenses] = useState(false);
	const [totalBusinessExpenses, setTotalBusinessExpenses] = useState("");

	// --------------------------- request state ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<ApiResponse<FreelancerResult> | null>(
		null,
	);

	// --------------------------- derived numbers ---------------------------
	const grossAnnualIncomeNumber = useMemo(
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

	// --------------------------- validation ---------------------------
	const isCalculationValid = grossAnnualIncomeNumber > 0 && !busy;

	// --------------------------- calculation ---------------------------
	async function calculate() {
		setError("");
		setBusy(true);

		try {
			const payload: FreelancerCalculatePayload = {
				taxType: "FREELANCER",
				grossAnnualIncome: grossAnnualIncomeNumber,
				freelancerPensionContribution: pensionContributionNumber,
				totalBusinessExpenses: includeExpenses
					? totalBusinessExpensesNumber
					: 0,
			};

			const { data } = await api.post<ApiResponse<FreelancerResult>>(
				ENDPOINTS.taxCalculate("freelancer"),
				payload,
			);

			setResult(data); // store API response (success or failure)

			if (!data.success) {
				setError(data.message || data.error || "Freelancer calculation failed");
				return;
			}

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
						grossAnnualIncome={grossAnnualIncomeNumber}
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
				onChange={(v) => setGrossAnnualIncome(onlyNumbers(v))}
			/>

			<CurrencyInput
				id="pensionContribution"
				label="Pension Contribution"
				value={formatNumber(pensionContribution)}
				onChange={(v) => setPensionContribution(onlyNumbers(v))}
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
						onChange={(v) => setTotalBusinessExpenses(onlyNumbers(v))}
						labelClassName="text-xs font-medium text-slate-400"
					/>
				)}
			</div>

			{/* Proceed/calculate button */}
			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isCalculationValid}
			/>
		</TaxPageLayout>
	);
}

// ====================================
// src/pages/tax/FreeLancer.tsx
// ====================================

// ====================================
import { useMemo, useState } from "react";
import TaxPageLayout from "../../pages/tax/TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../hooks/useHistory";
import { useAuth } from "../../state/useAuth";
import FreelancerResultPanel from "./FreelancerResultPanel";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import type { ApiResponse } from "../../api/api.types";
import type { FreelancerResponse } from "../../types/tax/freelancer.types";
import { getErrorMessage } from "../../api/getErrorMessage";
import { isFreelancerCalculationValid } from "../../utils/calculateButtonValidation";

// ====================================

// ==================================== FREELANCER UI PAGE ====================================
export default function FreeLancer() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	// ==================================== form state
	const [grossAnnualIncome, setGrossAnnualIncome] = useState("");
	const [pensionContribution, setPensionContribution] = useState("");
	const [includeExpenses, setIncludeExpenses] = useState(false);
	const [totalBusinessExpenses, setTotalBusinessExpenses] = useState("");

	// ==================================== request state
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<FreelancerResponse | null>(null);

	// ==================================== derived numbers
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

	// ==================================== calculation
	async function calculate() {
		setError("");

		if (grossAnnualIncomeNumber <= 0) {
			setError("Gross annual income must be greater than 0");
			return;
		}

		setBusy(true);

		try {
			// ==================================== Payload construction
			const payload = {
				taxType: "FREELANCER",
				grossAnnualIncome: grossAnnualIncomeNumber,
				pensionContribution: pensionContributionNumber,
				totalBusinessExpenses: includeExpenses
					? totalBusinessExpensesNumber
					: 0,
			};

			// ==================================== API call
			const response = await api.post<ApiResponse<FreelancerResponse>>(
				ENDPOINTS.taxCalculate("freelancer"),
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
					type: "FREELANCER",
					input: payload,
					result: dto,
				});
			}
		} catch (err: unknown) {
			setError(getErrorMessage(err, "Freelancer calculation failed"));
		} finally {
			setBusy(false);
		}
	}

	// ==================================== Render
	return (
		<TaxPageLayout
			title="Freelancer / Self-Employed Tax"
			subtitle="Calculate tax on your freelance or business income."
			rightPanel={
				result ? (
					<FreelancerResultPanel
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
				id="grossAnnualIncome"
				label={
					<span>
						Gross Annual Income <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(grossAnnualIncome)}
				onChange={(v) => setGrossAnnualIncome(onlyNumbers(v))}
			/>

			<CurrencyInput
				id="pensionContribution"
				label="Pension Contribution"
				value={formatNumber(pensionContribution)}
				onChange={(v) => setPensionContribution(onlyNumbers(v))}
				containerClassName="my-3"
			/>

			<div className="mt-5 rounded-xl border p-4 bg-white">
				<div className="flex items-start justify-between gap-3">
					<div>
						<div className="font-medium text-xs text-slate-600">
							Include Business Expenses
						</div>
						<div className="text-xs text-slate-600 mt-1 mb-2">
							Deduct legitimate business expenses from your income
						</div>
					</div>

					{/*============================  TRIGGER ========================== */}
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

			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isFreelancerCalculationValid({
					grossAnnualIncomeNumber,
					busy,
				})}
			/>
		</TaxPageLayout>
	);
}

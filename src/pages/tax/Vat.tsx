// src/pages/tax/Vat.tsx

// -----------------------------------------------------------
import { useMemo, useState } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import { useAuth } from "../../state/useAuth";
import VatResultPanel from "./VatResultPanel";
import { Check } from "lucide-react";

// Helpers Imports
// -----------------------------------------------------------
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";

// types
// -----------------------------------------------------------
import type {
	VatCalculatePayload,
	VatCalculationType,
	VatTransactionType,
	ApiSuccess,
	ApiFail,
} from "../../api/types";
import type { HistoryResult } from "../../types/history.type";

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function Vat() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();
	// form state
	// ---------------------------
	const [transactionAmount, setTransactionAmount] = useState("");
	const [calculationType, setCalculationType] =
		useState<VatCalculationType>("add");
	const [transactionType, setTransactionType] = useState<VatTransactionType>(
		"Domestic sale/Purchase",
	);

	// request state triad
	// ---------------------------
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<HistoryResult | null>(null);

	// derived numeric values
	// ---------------------------
	const transactionAmountNumber = useMemo(
		() => parseNumber(transactionAmount),
		[transactionAmount],
	);

	// form validation, proceed button enabled
	// ---------------------------
	const isCalculationValid = transactionAmountNumber > 0 && !busy;

	// -----------------------------------------------------------
	async function calculate() {
		setError("");
		setBusy(true);

		try {
			if (
				!Number.isFinite(transactionAmountNumber) ||
				transactionAmountNumber <= 0
			) {
				setError("Transaction amount must be a valid number greater than 0.");
				return;
			}

			const payload: VatCalculatePayload = {
				transactionAmount: transactionAmountNumber,
				calculationType,
				transactionType,
			};

			const { data } = await api.post<ApiSuccess<unknown> | ApiFail>(
				ENDPOINTS.vatCalculate,
				payload,
			);

			// Typed success guard
			if (!data.success) {
				setError(data.message || data.error || "VAT calculation failed");
				return;
			}

			// Fully typed result
			const typedResult = data.data as HistoryResult;
			setResult(typedResult);

			// Log to history
			addHistory({
				type: "VAT",
				input: payload,
				result: typedResult,
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
					"VAT calculation failed",
			);
		} finally {
			setBusy(false);
		}
	}

	// -----------------------------------------------------------
	return (
		<TaxPageLayout
			title="VAT Calculation"
			subtitle="Quickly add or remove tax from your prices using the latest rates."
			rightPanel={
				result ? (
					<VatResultPanel
						result={result}
						amount={transactionAmountNumber}
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

			{/* Transaction Amount */}
			<CurrencyInput
				id="transactionAmount"
				label="Transaction Amount"
				value={formatNumber(transactionAmount)}
				onChange={(v) => setTransactionAmount(onlyNumbers(v))}
			/>

			{/* Add/Remove toggle */}
			<div className="mt-3 grid grid-cols-2 gap-4">
				<button
					type="button"
					onClick={() => setCalculationType("add")}
					className={`rounded-lg border py-2.5 text-sm font-semibold ${
						calculationType === "add"
							? "bg-brand-800 text-white border-brand-800"
							: "bg-white text-slate-900"
					}`}
				>
					+ Add VAT
				</button>

				<button
					type="button"
					onClick={() => setCalculationType("remove")}
					className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
						calculationType === "remove"
							? "bg-brand-800 text-white border-brand-800"
							: "bg-white text-slate-900"
					}`}
				>
					- Remove VAT
				</button>
			</div>

			{/* Transaction type */}
			<div className="mt-6">
				<div className="font-medium text-sm text-slate-800">
					Transaction type
				</div>

				<div className="mt-2 grid sm:grid-cols-2 gap-4">
					{(
						[
							"Domestic sale/Purchase",
							"Export/International",
							"Digital Services",
							"Exempt",
						] as VatTransactionType[]
					).map((t) => {
						const active = transactionType === t;
						const label =
							t === "Domestic sale/Purchase"
								? "Domestic sale/Purchase 7.5%"
								: t === "Digital Services"
									? "Digital Services 7.5%"
									: t === "Export/International"
										? "Export/International 0%"
										: "Exempt Items (no VAT)";

						return (
							<button
								key={t}
								type="button"
								onClick={() => setTransactionType(t)}
								className={`w-full rounded-lg border px-4 py-3 text-sm flex items-center justify-between gap-4 ${
									active ? "border-brand-800" : "border-slate-300"
								}`}
							>
								<span className="text-left flex-1 text-xs">{label}</span>

								<span
									className={`h-4 w-4 flex-shrink-0 rounded border grid place-items-center ${
										active
											? "bg-brand-800 border-brand-800 text-white"
											: "bg-white border-slate-400"
									}`}
								>
									{active && <Check size={12} strokeWidth={3} />}
								</span>
							</button>
						);
					})}
				</div>
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
// -----------------------------------------------------------
// -----------------------------------------------------------

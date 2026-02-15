// ====================================
// src/pages/tax/Vat.tsx
// ====================================

// ====================================
import { useMemo, useState } from "react";
import TaxPageLayout from "./TaxPageLayout";
import { api } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import { useHistory } from "../../state/history";
import { useAuth } from "../../state/useAuth";
import VatResultPanel from "./VatResultPanel";
import { Check } from "lucide-react";
import {
	parseNumber,
	formatNumber,
	onlyNumbers,
} from "../../utils/numberInput";
import CalculateButton from "../../components/ui/buttons/CalculateButton";
import CurrencyInput from "../../components/ui/inputs/CurrencyInput";
import { getErrorMessage } from "../../api/getErrorMessage";
import type { ApiResponse } from "../../api/api.types";
import type {
	VatResponse,
	VatCalculationType,
	VatTransactionType,
} from "../../types/vat/vat.types";
import { isVatCalculationValid } from "../../utils/calculateButtonValidation";
// import type { HistoryResult } from "../../types/history.type";
// ====================================

// ==================================== VAT UI PAGE =================================
export default function Vat() {
	const { authenticated } = useAuth();
	const { addHistory } = useHistory();

	// ==================================== Form state
	const [transactionAmount, setTransactionAmount] = useState("");
	const [calculationType, setCalculationType] =
		useState<VatCalculationType>("add");
	const [transactionType, setTransactionType] = useState<VatTransactionType>(
		"Domestic sale/Purchase",
	);

	// ==================================== Request state
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [result, setResult] = useState<VatResponse | null>(null);

	// ==================================== Derived numbers
	const transactionAmountNumber = useMemo(
		() => parseNumber(transactionAmount),
		[transactionAmount],
	);

	// ==================================== Calculation
	async function calculate() {
		setError("");

		if (transactionAmountNumber <= 0) {
			setError("Transaction amount must be greater than 0");
			return;
		}

		setBusy(true);

		try {
			const payload = {
				transactionAmount: transactionAmountNumber,
				calculationType,
				transactionType,
			};

			// ==================================== API call
			const response = await api.post<ApiResponse<VatResponse>>(
				ENDPOINTS.vatCalculate,
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
					type: "VAT",
					input: payload,
					result: dto,
				});
			}
		} catch (err: unknown) {
			setError(getErrorMessage(err, "VAT calculation failed"));
		} finally {
			setBusy(false);
		}
	}

	// ==================================== Render
	return (
		<TaxPageLayout
			title="VAT Calculation"
			subtitle="Quickly add or remove tax from your prices using the latest rates."
			rightPanel={
				result ? (
					<VatResultPanel
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

			{/* ======================= Transaction Amount =======================  */}
			<CurrencyInput
				id="transactionAmount"
				label={
					<span>
						Transaction Amount <span className="text-red-500">*</span>
					</span>
				}
				value={formatNumber(transactionAmount)}
				onChange={(v) => setTransactionAmount(onlyNumbers(v))}
			/>

			{/* ======================= Add/Remove toggle =======================  */}
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

			{/* ======================= Transaction type =======================  */}
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

			{/* ======================= Proceed/calculate button =======================  */}
			<CalculateButton
				onClick={calculate}
				loading={busy}
				enabled={isVatCalculationValid({
					transactionAmountNumber,
					busy,
				})}
			/>
		</TaxPageLayout>
	);
}

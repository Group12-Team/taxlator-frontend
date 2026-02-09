// src/pages/tax/VatResultPanel.tsx

// -----------------------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import type { VatResult } from "../../api/vat.types";
import type { ApiResponse } from "../../api/api.types";

type Props = {
	result: ApiResponse<VatResult>;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// ---------------------- VAT RESULT PANEL -----------------------
export default function VatResultPanel({
	result,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	// ---------- Handle API failure ----------
	if (!result.success) {
		return (
			<div className="bg-white rounded-2xl border shadow-soft p-3 text-center text-red-600">
				<p className="font-semibold">Failed to load VAT result</p>
				<p>{result.message ?? result.error ?? "Unknown error"}</p>
				<button
					onClick={() => navigate("/calculate")}
					className="mt-3 rounded bg-brand-800 text-white py-2 px-4 text-sm font-semibold"
				>
					Try Again
				</button>
			</div>
		);
	}

	const data = result.data;

	const vatRatePct = Math.round(data.vatRate * 1000) / 10;

	return (
		<div className="bg-white rounded-2xl border shadow-soft overflow-hidden">
			{/* HEADER */}
			<div className="p-3 text-center border-b">
				<div className="text-sm text-slate-600">VAT Result</div>
				<div className="mt-2 text-3xl font-extrabold text-brand-800">
					{formatCurrency(data.vatAmount)}
				</div>
				<div className="text-sm text-slate-600 mt-1">
					VAT Amount ({vatRatePct}%)
				</div>
			</div>

			{/* SUMMARY CARDS */}
			<div className="p-3 grid grid-cols-2 gap-2">
				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Amount (Excl. VAT)</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(data.transactionAmount)}
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Total (Incl. VAT)</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(data.totalAmount)}
					</div>
				</div>
			</div>

			{/* BREAKDOWN TOGGLE */}
			<div className="px-3">
				<button
					onClick={() => setOpen((v) => !v)}
					className="w-full flex justify-between items-center rounded-xl border px-3 py-3 text-sm font-semibold"
				>
					View VAT Breakdown
					<span>{open ? "▴" : "▾"}</span>
				</button>
			</div>

			{/* BREAKDOWN */}
			{open && (
				<div className="p-3 space-y-3 text-xs text-slate-700">
					<div className="flex justify-between">
						<span className="text-slate-600">Transaction Type</span>
						<span>{data.transactionType}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-600">Calculation Type</span>
						<span>{data.calculationType}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-600">Transaction Amount</span>
						<span>{formatCurrency(data.transactionAmount)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-slate-600">VAT ({vatRatePct}%)</span>
						<span>{formatCurrency(data.vatAmount)}</span>
					</div>

					<hr />

					<div className="flex justify-between font-semibold">
						<span>Total Amount (Incl. VAT)</span>
						<span>{formatCurrency(data.totalAmount)}</span>
					</div>
				</div>
			)}

			{/* ACTION */}
			<div className="p-3">
				<button
					onClick={() => navigate("/calculate")}
					className="w-full rounded bg-brand-800 text-white py-2.5 text-sm font-semibold"
				>
					Calculate Another Tax
				</button>

				{/* GUEST CTA */}
				{!isAuthenticated && <GuestCTA prefillEmail={prefillEmail} />}
			</div>
		</div>
	);
}

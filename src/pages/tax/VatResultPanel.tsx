// ====================================
// src/pages/tax/VatResultPanel.tsx
// ====================================

// ====================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import type { VatResponse } from "../../types/vat/vat.types";
import ResultPanelButton from "../../components/ui/buttons/ResultPanelButton";

// ====================================

// ==================================== CIT RESULT PANEL =================================
type Props = {
	backendResult: VatResponse;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// ====================================
export default function VatResultPanel({
	backendResult,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	if (!backendResult) return null;
	// ====================================

	const { summary, totals, progressive, taxType, country } = backendResult;

	// ==================================== RENDER ====================================
	return (
		<div className="w-full">
			{/* ====================== HEADER ===================== */}
			<div className="text-center pb-3">
				<div className="text-sm text-slate-600 flex justify-between items-center gap-2">
					{country.name}
					<span>Salaried - ({taxType})</span>
					<span className="text-[1.5rem] leading-none self-start">🇳🇬</span>
				</div>
				<div className="mt-1 text-3xl font-extrabold text-brand-800">
					{formatCurrency(summary.totalAmount)}
				</div>
				<div className="text-sm text-slate-600 mt-1">Vat Amount</div>
			</div>
			{/* ==================================================== */}

			<hr className="my-2 border-brand-200" />

			{/* ====================== SUMMARY ===================== */}
			<div className="pt-3 grid grid-cols-2 gap-2 mb-4">
				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Amount (Excl. VAT)</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(summary.baseAmount)}
					</div>
				</div>
				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 p-4 text-center">
					<div className="text-xs text-slate-600">Total (Incl. VAT)</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(summary.totalAmount)}
					</div>
				</div>
			</div>

			{/* ====================== BREAKDOWN TOGGLE ===================== */}
			<button
				onClick={() => setOpen((s) => !s)}
				className="w-full mt-5 flex justify-between items-center rounded-2xl bg-[#f0f7ff] border border-brand-200 p-4 text-sm font-semibold"
			>
				<span>View Tax Breakdown</span>
				<span className="text-xl">{open ? "▴" : "▾"}</span>
			</button>

			{/* ====================== BREAKDOWN ===================== */}
			{open && (
				<div className="w-full mt-4 rounded-2xl border border-brand-200 bg-[#f0f7ff] p-4">
					<div className="text-sm font-semibold text-slate-600 mb-4">
						Vat Calculation Breakdown
					</div>
					{/* ================================================================== */}

					<hr className="my-4 border-brand-200" />

					{/* ====================== STANDARD DEDUCTIONS ===================== */}
					<div className="flex justify-between text-xs font-medium mb-2">
						<span className="w-[60%]">Calculation Type</span>
						<span className="text-right tabular-nums">
							{progressive.calculationType}
						</span>
					</div>

					<div className="flex justify-between text-xs font-medium mb-2">
						<span>Transaction Type</span>
						<span>{progressive.transactionType}</span>
					</div>

					<div className="mb-4">
						<div className="flex justify-between text-xs font-light mb-2">
							<span className="w-[60%]">Vat Amount</span>
							<span className="text-right tabular-nums">
								{formatCurrency(summary.vatAmount)}
							</span>
						</div>

						<div className="flex justify-between text-xs font-light mb-2">
							<span className="w-[60%]">Vat Rate</span>
							<span className="text-right tabular-nums">
								{summary.vatRate}%
							</span>
						</div>
					</div>
					{/* ================================================================== */}

					<hr className="my-4 border-brand-200" />

					{/* ====================== CURRENT VAT BREAKDOWN ===================== */}
					<div className="mb-4">
						<div className="flex justify-between text-xs mt-2 font-medium">
							<span>Total With Vat</span>
							<span>{formatCurrency(totals.totalWithVat)}</span>
						</div>

						<div className="flex justify-between text-xs mt-2 font-medium">
							<span>Total Vat</span>
							<span>{formatCurrency(totals.totalVat)}</span>
						</div>
					</div>
					{/* ================================================================== */}
				</div>
			)}

			{/* ====================== END OF PANEL ===================== */}
			<div className="mt-6">
				<ResultPanelButton fullWidth onClick={() => navigate("/calculate")}>
					Calculate Another Tax
				</ResultPanelButton>

				{/*====================== GUEST CTA========================  */}
				{!isAuthenticated && <GuestCTA prefillEmail={prefillEmail} />}
			</div>
		</div>
	);
}

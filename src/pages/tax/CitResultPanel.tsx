// ====================================
// src/pages/tax/CitResultPanel.tsx
// ====================================

// ====================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CitResponse } from "../../types/tax/cit";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import ResultPanelButton from "../../components/ui/buttons/ResultPanelButton";
import { isMultinationalCompany } from "../../utils/companyType";
// ====================================

// ============================== CIT RESULT PANEL ==============================
type Props = {
	backendResult: CitResponse;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// ====================================
export default function CitResultPanel({
	backendResult,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	if (!backendResult) return null;
	// ====================================

	const { summary, progressive, breakdown, taxType, country } = backendResult;
	// ====================================

	const isMultinational = isMultinationalCompany(summary.companySize);
	// ====================================

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
					{formatCurrency(summary.totalAnnualTax)}
				</div>
				<div className="text-sm text-slate-600 mt-1">Total Annual Tax Due</div>
			</div>

			<hr className="my-2 border-brand-200" />

			{/* ====================== SUMMARY ===================== */}
			<div className="p-3 grid grid-cols-2 gap-3">
				<div className="rounded-2xl bg-slate-50 border py-4 px-3 text-center">
					<div className="text-xs text-slate-600">Taxable Profit</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(summary.taxableProfit)}
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 border py-4 px-3 text-center">
					<div className="text-xs text-slate-600">Net Profit</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(summary.netProfit)}
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
						Tax Calculation Breakdown
					</div>
					{/* ================================================================== */}

					<hr className="my-4 border-brand-200" />

					{/* ====================== STANDARD DEDUCTIONS ===================== */}
					<div className="mb-4">
						<div className="flex justify-between text-xs font-medium mb-2">
							<span className="w-[60%]">Company Type</span>
							<span className="text-right tabular-nums">
								{summary.companySize}
							</span>
						</div>

						<div className="flex justify-between text-xs font-light mb-2">
							<span className="w-[60%]">CIT Applied Rate</span>
							<span className="text-right tabular-nums">
								{(summary.appliedRate * 100).toFixed(0)}%
							</span>
						</div>

						<div className="flex justify-between text-xs font-light mb-2">
							<span className="w-[60%]">Taxable Profit</span>
							<span className="text-right tabular-nums">
								{formatCurrency(summary.taxableProfit)}
							</span>
						</div>

						<div className="flex justify-between text-xs font-light mb-2">
							<span>Final Tax Payable</span>
							<span>{formatCurrency(breakdown.finalTax)}</span>
						</div>
					</div>
					{/* ================================================================== */}

					{/* ====================== MULTINATIONAL COMPARISON ===================== */}
					{isMultinational && (
						<>
							<div className="mb-4">
								<div className="flex justify-between text-xs font-light mb-2">
									<span>Normal CIT (30%)</span>
									<span>{formatCurrency(breakdown.normalCIT)}</span>
								</div>

								<div className="flex justify-between text-xs font-light mb-2">
									<span>Minimum Tax (15%)</span>
									<span>{formatCurrency(breakdown.minimumTax)}</span>
								</div>
							</div>
							{/* ================================================================== */}

							<hr className="my-4 border-brand-200" />

							{/* ================================================================== */}
							<p className="text-center text-xs text-slate-500">
								Note: Final tax is the higher of 30% CIT or 15% minimum tax
							</p>
						</>
					)}
					{/* ================================================================== */}

					<hr className="my-4 border-brand-200" />

					{/* ====================== FULL TAX BANDS ===================== */}
					<div className="mb-4">
						<div className="w-[50%] text-sm font-medium mb-3">
							Progressive Tax Bands (Annual)
						</div>

						{progressive.referenceBands.map(
							(band: { label: string; rate: string }, i: number) => (
								<div
									key={i}
									className="flex justify-between text-xs font-light mb-2"
								>
									<span className="w-[55%] break-words leading-snug">
										{band.label}
									</span>
									<span className="w-[45%] text-right tabular-nums">
										{band.rate}
									</span>
								</div>
							),
						)}
					</div>
					{/* ================================================================== */}

					<hr className="my-4 border-brand-200" />

					{/* ====================== CURRENT TAX BREAKDOWN ===================== */}
					<div className="mb-4">
						<div className="flex justify-between text-xs mt-2 font-medium">
							<span>Total Annual Tax</span>
							<span>{formatCurrency(summary.totalAnnualTax)}</span>
						</div>

						<div className="flex justify-between text-xs mt-2 font-medium">
							<span>Monthly Tax</span>
							<span>{formatCurrency(summary.monthlyTax)}</span>
						</div>
					</div>
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

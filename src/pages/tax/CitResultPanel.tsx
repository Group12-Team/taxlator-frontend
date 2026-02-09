// src/pages/tax/CompanyResultPanel.tsx
// -----------------------------------------------------------

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CitResult } from "../../api/tax.types";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";

export type CompanyResultPanelProps = {
	result: CitResult;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

export default function CompanyResultPanel({
	result,
	isAuthenticated,
	prefillEmail = "",
}: CompanyResultPanelProps) {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const {
		companySize,
		taxableProfit,
		appliedRate,
		totalTax,
		netProfitAfterTax,
		minimumTaxApplied,
		effectiveTaxRate,
		computation,
	} = result;

	return (
		<div className="bg-white rounded-2xl border shadow-soft overflow-hidden">
			{/* HEADER */}
			<div className="p-3 text-center border-b">
				<div className="text-sm text-slate-600">Company Income Tax</div>
				<div className="mt-2 text-3xl font-extrabold text-brand-800">
					{formatCurrency(totalTax)}
				</div>
				<div className="text-sm text-slate-600 mt-1">Total Tax Due</div>
			</div>

			{/* SUMMARY */}
			<div className="p-3 grid grid-cols-2 gap-2">
				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Taxable Profit</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(taxableProfit)}
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Net Profit After Tax</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(netProfitAfterTax)}
					</div>
				</div>
			</div>

			{/* BREAKDOWN TOGGLE */}
			<div className="px-3">
				<button
					onClick={() => setOpen((v) => !v)}
					className="w-full flex justify-between items-center rounded-xl border px-3 py-3 text-sm font-semibold"
				>
					View Tax Breakdown
					<span>{open ? "▴" : "▾"}</span>
				</button>
			</div>

			{/* BREAKDOWN */}
			{open && (
				<div className="p-3 space-y-3 text-xs text-slate-700">
					<div className="flex justify-between">
						<span className="text-slate-600">Company Size</span>
						<span>{companySize}</span>
					</div>

					<div className="flex justify-between">
						<span className="text-slate-600">Applied Rate</span>
						<span>{(appliedRate * 100).toFixed(0)}%</span>
					</div>

					<div className="flex justify-between">
						<span className="text-slate-600">Effective Tax Rate</span>
						<span>{(effectiveTaxRate * 100).toFixed(2)}%</span>
					</div>

					<hr />

					{/* COMPUTATION */}
					<div className="space-y-1">
						{computation.map((band, i) => (
							<div key={i} className="flex justify-between">
								<span className="text-slate-600">
									{Math.round(band.rate * 100)}% of ₦
									{band.taxableAmount.toLocaleString()}
								</span>
								<span>{formatCurrency(band.tax)}</span>
							</div>
						))}
					</div>

					{minimumTaxApplied && (
						<div className="text-amber-600 font-semibold">
							Minimum Tax Applied
						</div>
					)}

					<hr />

					<div className="flex justify-between font-semibold">
						<span>Final Tax Payable</span>
						<span>{formatCurrency(totalTax)}</span>
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

				{!isAuthenticated && <GuestCTA prefillEmail={prefillEmail} />}
			</div>
		</div>
	);
}

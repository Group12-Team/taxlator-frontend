// src/pages/tax/FreelancerResultPanel.tsx

// -----------------------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import type { FreelancerResult } from "../../api/tax.types";
import type { ApiResponse } from "../../api/api.types";

type Props = {
	result: ApiResponse<FreelancerResult>;
	grossAnnualIncome: number;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// ------------------------------- FREELANCER RESULT PANEL -------------------------------
export default function FreelancerResultPanel({
	result,
	grossAnnualIncome,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	// ---------- handle API success / failure ----------
	if (!result.success) {
		return (
			<div className="bg-white rounded-2xl border shadow-soft p-3 text-center text-red-600">
				<p className="font-semibold">Failed to load freelancer tax result</p>
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

	const taxDue = data.totalTax;
	const annualGrossIncome = data.grossAnnualIncome ?? grossAnnualIncome;
	const netIncome = data.netIncome;
	const taxableIncome = data.taxableIncome;
	const breakdown = data.computation;

	return (
		<div className="bg-white rounded-2xl border shadow-soft overflow-hidden">
			{/* HEADER */}
			<div className="p-3 text-center border-b">
				<div className="text-sm text-slate-600">
					Freelancer / Self-Employed Result
				</div>
				<div className="mt-2 text-3xl font-extrabold text-brand-800">
					{formatCurrency(taxDue)}
				</div>
				<div className="text-sm text-slate-600 mt-1">Total Tax Due</div>
			</div>

			{/* SUMMARY */}
			<div className="p-3 grid grid-cols-2 gap-2">
				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Gross Income</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(annualGrossIncome)}
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 border py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Net Income</div>
					<div className="mt-1 font-semibold text-sm">
						{formatCurrency(netIncome)}
					</div>
				</div>
			</div>

			{/* BREAKDOWN */}
			<div className="px-3">
				<button
					onClick={() => setOpen((v) => !v)}
					className="w-full flex justify-between items-center rounded-xl border px-3 py-3 text-sm font-semibold"
				>
					View Tax Breakdown
					<span>{open ? "▴" : "▾"}</span>
				</button>
			</div>

			{open && (
				<div className="p-3 space-y-3 text-xs text-slate-700">
					<div className="flex justify-between">
						<span className="font-semibold">Taxable Income</span>
						<span className="font-semibold">
							{formatCurrency(taxableIncome)}
						</span>
					</div>

					<hr />

					{breakdown.map((b, i) => (
						<div key={i} className="flex justify-between">
							<span>{Math.round(b.rate * 100)}%</span>
							<span>{formatCurrency(b.tax)}</span>
						</div>
					))}

					<hr />

					<div className="flex justify-between font-semibold">
						<span>Monthly Tax</span>
						<span>{formatCurrency(taxDue / 12)}</span>
					</div>
				</div>
			)}

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

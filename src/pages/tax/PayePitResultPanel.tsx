// src/pages/tax/PayePitResultPanel.tsx

// -----------------------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import type { PayePitResult, TaxBand } from "../../api/tax.types";

type Props = {
	result: PayePitResult;
	grossAnnualIncome: number;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// ------------------------------- PAYE/PIT RESULT PANEL -------------------------------
export default function PayePitResultPanel({
	result,
	grossAnnualIncome,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-white rounded-2xl shadow-soft overflow-hidden">
			{/* HEADER */}
			<div className="p-6 text-center border-b">
				<p className="text-sm text-slate-500">Salaried (PAYE / PIT) Result</p>
				<p className="text-3xl font-bold text-brand-700 mt-1">
					{formatCurrency(result.totalTax)}
				</p>
				<p className="text-xs text-slate-500 mt-1">Total Tax Due</p>
			</div>

			{/* SUMMARY */}
			<div className="p-6 grid grid-cols-2 gap-4">
				<div className="rounded-2xl bg-slate-50 border py-4 px-3 text-center">
					<div className="text-xs text-slate-600">Gross Annual Income</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(grossAnnualIncome)}
					</div>
				</div>

				<div className="rounded-2xl bg-slate-50 border py-4 px-3 text-center">
					<div className="text-xs text-slate-600">Net Income</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(result.netIncome)}
					</div>
				</div>
			</div>

			{/* TOGGLE BUTTON */}
			<div className="px-6">
				<button
					onClick={() => setOpen((v) => !v)}
					className="w-full flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium hover:bg-slate-50"
				>
					View Tax Breakdown
					<span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
				</button>
			</div>

			{/* TAX BREAKDOWN */}
			{open && (
				<div className="p-6">
					<div className="bg-slate-50 border rounded-xl p-5 space-y-4">
						<h3 className="font-semibold text-brand-700">
							Tax Calculation Breakdown
						</h3>

						{/* DEDUCTIONS & TAXABLE INCOME */}
						<div className="space-y-1 text-sm">
							<div className="flex justify-between">
								<span>Total Deductions</span>
								<span>{formatCurrency(result.totalDeductions)}</span>
							</div>
							<div className="flex justify-between font-semibold">
								<span>Annual Taxable Income</span>
								<span>{formatCurrency(result.taxableIncome)}</span>
							</div>
						</div>

						{/* TAX BANDS */}
						<div>
							<p className="text-sm font-semibold mt-3 mb-1">
								Progressive Tax Bands (Annual)
							</p>
							<div className="space-y-1 text-sm text-slate-600">
								{result.computation.map((b: TaxBand, i: number) => (
									<div key={i} className="flex justify-between">
										<span>
											{Math.round(b.rate * 100)}% of ₦
											{b.taxableAmount.toLocaleString()}
										</span>
										<span>₦{b.tax.toLocaleString()}</span>
									</div>
								))}
							</div>
						</div>

						<hr />

						{/* TOTALS */}
						<div className="space-y-1 text-sm">
							<div className="flex justify-between font-semibold">
								<span>Total Annual Tax</span>
								<span>{formatCurrency(result.totalTax)}</span>
							</div>
							<div className="flex justify-between">
								<span>Monthly Tax</span>
								<span>{formatCurrency(result.totalTax / 12)}</span>
							</div>
						</div>
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

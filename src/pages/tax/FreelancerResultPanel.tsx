// src/pages/tax/FreelancerResultPanel.tsx
// -----------------------------------------------------------

// imports
// -----------------------------------------------------------
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import type { FreelancerResult } from "../../api/types";

// -----------------------------------------------------------
// Types
// -----------------------------------------------------------

type Props = {
	result: FreelancerResult;
	grossIncome: number;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function FreelancerResultPanel({
	result,
	grossIncome,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState(prefillEmail);

	const taxDue = result.totalTax;
	const annualGrossIncome = result.grossIncome ?? grossIncome;
	const netIncome = result.netIncome;
	const taxableIncome = result.taxableIncome;
	const breakdown = result.computation;

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
				{!isAuthenticated && (
					<div className="mt-4 rounded-xl border bg-slate-100 p-3">
						<div className="font-semibold text-sm">Save Your Calculations</div>
						<div className="text-xs text-slate-600 mt-1">
							Sign up to save and track your tax history.
						</div>

						<div className="mt-3 flex gap-2">
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="flex-1 rounded border px-2 py-1.5 text-sm"
								placeholder="Email"
								type="email"
							/>
							<Link
								to="/signup"
								state={{ email }}
								className="px-4 rounded bg-brand-800 text-white text-sm font-semibold grid place-items-center"
							>
								Sign Up
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
// -----------------------------------------------------------
// -----------------------------------------------------------

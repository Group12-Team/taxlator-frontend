import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import type { PayePitResponse, PayePitBand } from "../../types/payePit";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";

// Props interface
type Props = {
	backendResult: PayePitResponse;
	isAuthenticated: boolean;
	prefillEmail?: string;
};

export default function PayePitResultPanel({
	backendResult,
	isAuthenticated,
	prefillEmail = "",
}: Props) {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	if (!backendResult) return null;

	const { summary, standardDeductions, totals, progressive, taxType, country } =
		backendResult;

	const deductionLabels: Record<string, string> = {
		rentRelief: "Rent Relief",
		pension: "Pension Contribution",
		nhis: "National Health Insurance Scheme",
		nhf: "National Housing Fund",
		otherDeductions: "Other Deductions",
	};

	return (
		<div className="w-full">
			{/* ====================== HEADER ===================== */}
			<div className="text-center border-b border-brand-200 pb-3 mb-3">
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

			{/* ======================  SUMMARY ===================== */}
			<div className="pt-3 grid grid-cols-2 gap-2">
				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 py-4 px-2">
					<div className="text-xs text-slate-600 text-center">
						Gross Annual Income
					</div>
					<div className="mt-1 font-semibold text-center">
						{formatCurrency(summary.grossAnnualIncome)}
					</div>
				</div>

				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 p-4">
					<div className="text-xs text-slate-600 text-center">
						Net Annual Income
					</div>
					<div className="mt-1 font-semibold text-center">
						{formatCurrency(summary.netAnnualIncome)}
					</div>
				</div>
			</div>

			{/* ====================== BREAKDOWN TOGGLE ===================== */}
			<button
				onClick={() => setOpen((s) => !s)}
				className="mt-5 w-full flex justify-between rounded-2xl bg-[#f0f7ff] border border-brand-200 p-4 text-sm font-semibold"
			>
				<span>View Tax Breakdown</span>
				<span>{open ? "▴" : "▾"}</span>
			</button>

			{/* ====================== BREAKDOWN ===================== */}
			{open && (
				<div className="mt-4 rounded-2xl border border-brand-200 bg-[#f0f7ff] p-4">
					<div className="text-sm font-semibold text-slate-600">
						Tax Calculation Breakdown
					</div>
					<hr className="my-3 border-brand-200" />

					{/* ====================== STANDARD DEDUCTIONS ===================== */}
					{standardDeductions && Object.keys(standardDeductions).length > 0 && (
						<div className="border-b border-brand-200 bg-[#f0f7ff] py-4">
							<div className="text-sm font-semibold text-slate-600 mb-2">
								Deductions
							</div>
							{Object.entries(standardDeductions).map(([label, value]) => (
								<div
									key={label}
									className="flex justify-between text-xs font-light"
								>
									<span>{deductionLabels[label] || label}</span>
									<span>{formatCurrency(value)}</span>
								</div>
							))}
						</div>
					)}

					{/* ====================== TOTALS ===================== */}
					<div className="mt-2 border-b border-brand-200 bg-[#f0f7ff] py-4">
						<div className="flex justify-between text-xs font-semibold">
							<span>Total Deductions</span>
							<span>{formatCurrency(totals.totalDeductions)}</span>
						</div>
						<div className="flex justify-between text-xs mt-1 font-light">
							<span>Taxable Income</span>
							<span>{formatCurrency(totals.taxableIncome)}</span>
						</div>
					</div>

					{/* ====================== FULL TAX BANDS ===================== */}
					{progressive.fullBands && progressive.fullBands.length > 0 && (
						<div className="border-b border-brand-200 bg-[#f0f7ff] py-4">
							<div className="text-sm font-semibold text-slate-600 mb-2">
								Progressive Tax Bands (Annual)
							</div>
							{progressive.fullBands.map((band: PayePitBand, idx: number) => (
								<div
									key={idx}
									className="flex justify-between text-xs mt-1 font-light"
								>
									<span>
										{band.label} ({(band.rate * 100).toFixed(0)}%)
									</span>
									<span>
										{band.maxLimit !== undefined
											? formatCurrency(band.maxLimit)
											: "-"}
									</span>
								</div>
							))}
						</div>
					)}

					{/* ====================== CURRENT TAX BREAKDOWN ===================== */}
					<div className="border-b border-brand-200 bg-[#f0f7ff] py-4">
						<div className="text-sm font-semibold text-slate-600 mb-2">
							Your Tax Breakdown
						</div>
						{progressive.bands.map((band: PayePitBand, idx: number) => (
							<div key={idx} className="flex justify-between text-xs mt-1">
								<span>
									{band.label} ({band.rateFormatted})
								</span>
								<span>{formatCurrency(band.tax)}</span>
							</div>
						))}

						<hr className="my-3 border-brand-200" />

						<div className="flex justify-between text-xs font-semibold">
							<span>Total Annual Tax</span>
							<span>{formatCurrency(progressive.totalAnnualTax)}</span>
						</div>
						<div className="flex justify-between text-xs mt-1">
							<span>Monthly Tax</span>
							<span>{formatCurrency(progressive.monthlyTax)}</span>
						</div>
					</div>
				</div>
			)}

			{/* ====================== END OF PANEL ===================== */}
			<div className="">
				<button
					onClick={() => navigate("/calculate")}
					className="w-full rounded bg-brand-800 text-white py-2.5 text-sm font-semibold"
				>
					Calculate Another Tax
				</button>

				{/* ====================== GUEST CTA ===================== */}
				{!isAuthenticated && <GuestCTA prefillEmail={prefillEmail} />}
			</div>
		</div>
	);
}

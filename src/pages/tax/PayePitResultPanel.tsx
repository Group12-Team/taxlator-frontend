import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import type { PayePitResponse, PayePitBand } from "../../types/payePit";
import GuestCTA from "../../components/ui/resultPanel/GuestCTA";
import ResultPanelButton from "../../components/ui/buttons/ResultPanelButton";

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
			<div className="pt-3 grid grid-cols-2 gap-2 mb-4">
				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 py-4 px-2 text-center">
					<div className="text-xs text-slate-600">Gross Annual Income</div>
					<div className="mt-1 font-semibold">
						{formatCurrency(summary.grossAnnualIncome)}
					</div>
				</div>
				<div className="rounded-2xl bg-[#f0f7ff] border border-brand-200 p-4 text-center">
					<div className="text-xs text-slate-600">Net Annual Income</div>
					<div className="mt-1 font-semibold">
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
					<div className="text-sm font-semibold text-slate-600 mb-4">
						Tax Calculation Breakdown
					</div>

					<hr className="my-4 border-brand-200" />

					{/* ====================== STANDARD DEDUCTIONS ===================== */}
					{standardDeductions && Object.keys(standardDeductions).length > 0 && (
						<div className="mb-4">
							<div className="text-sm font-medium mb-3">Deductions</div>
							{Object.entries(standardDeductions).map(([label, value]) => (
								<div
									key={label}
									className="flex justify-between text-xs font-light mb-2"
								>
									<span className="w-[60%] break-words leading-snug">
										{deductionLabels[label] || label}
									</span>
									<span className="w-[50%] text-right tabular-nums">
										{formatCurrency(value)}
									</span>
								</div>
							))}
						</div>
					)}

					<hr className="my-4 border-brand-200" />

					{/* ====================== TOTALS ===================== */}
					<div className="mb-4">
						<div className="flex justify-between text-xs font-medium mb-2">
							<span className="w-[55%]">Total Deductions</span>
							<span className="text-right tabular-nums">
								{formatCurrency(totals.totalDeductions)}
							</span>
						</div>
						<div className="flex justify-between text-xs font-medium">
							<span className="w-[70%]">Taxable Income</span>
							<span className="text-right tabular-nums">
								{formatCurrency(totals.taxableIncome)}
							</span>
						</div>
					</div>

					<hr className="my-4 border-brand-200" />

					{/* ====================== FULL TAX BANDS ===================== */}
					{progressive.fullBands && progressive.fullBands.length > 0 && (
						<div className="mb-4">
							<div className="w-[55%] text-sm font-medium mb-3">
								Progressive Tax Bands (Annual)
							</div>
							{progressive.fullBands.map((band: PayePitBand, idx: number) => (
								<div
									key={idx}
									className="flex justify-between text-xs font-light mb-2"
								>
									<span className="w-[55%] break-words leading-snug">
										{band.label} ({(band.rate * 100).toFixed(0)}%)
									</span>
									<span className="w-[45%] text-right tabular-nums">
										{band.maxLimit !== undefined
											? formatCurrency(band.maxLimit)
											: "-"}
									</span>
								</div>
							))}
						</div>
					)}

					<hr className="my-4 border-brand-200" />

					{/* ====================== CURRENT TAX BREAKDOWN ===================== */}
					<div className="mb-4">
						<div className="text-sm font-semibold text-slate-600 mb-3">
							Your Tax Breakdown
						</div>

						{progressive.bands.map((band: PayePitBand, idx: number) => (
							<div
								key={idx}
								className="flex justify-between text-xs font-light mb-2"
							>
								<span className="w-[70%] break-words leading-snug">
									{band.label} ({band.rateFormatted})
								</span>
								<span className="text-right tabular-nums">
									{formatCurrency(band.tax)}
								</span>
							</div>
						))}

						<hr className="my-4 border-brand-200" />

						{/* ====================== CURRENT TAX BREAKDOWN ===================== */}
						<div className="flex justify-between text-xs font-medium mt-2">
							<span className="w-[70%]">Total Annual Tax</span>
							<span className="text-right tabular-nums">
								{formatCurrency(progressive.totalAnnualTax)}
							</span>
						</div>
						<div className="flex justify-between text-xs mt-2 font-medium">
							<span className="w-[70%]">Monthly Tax</span>
							<span className="text-right tabular-nums">
								{formatCurrency(progressive.monthlyTax)}
							</span>
						</div>
					</div>
				</div>
			)}

			{/* ====================== END OF PANEL ===================== */}
			<div className="mt-6">
				<ResultPanelButton fullWidth onClick={() => navigate("/calculate")}>
					Calculate Another Tax
				</ResultPanelButton>

				{!isAuthenticated && <GuestCTA prefillEmail={prefillEmail} />}
			</div>
		</div>
	);
}

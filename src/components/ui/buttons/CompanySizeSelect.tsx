// -----------------------------------------------------------
// src/components/ui/buttons/CompanySizeSelect.tsx
// -----------------------------------------------------------

// -----------------------------------------------------------
import { useState } from "react";
// -----------------------------------------------------------

// ------------------------------- TYPES --------------------------------
export type CompanySize = "Small" | "Other" | "Multinational";
// -----------------------------------------------------------

// ------------------------------- OPTIONS --------------------------------
const COMPANY_SIZE_OPTIONS: {
	value: CompanySize;
	label: string;
}[] = [
	{
		value: "Small",
		label: "Small Company (0%)",
	},
	{
		value: "Other",
		label: "Other Companies (30%)",
	},
	{
		value: "Multinational",
		label: "Multinational Company (30% vs 15% Min. Tax)",
	},
];

// ------------------------------- TYPES --------------------------------
type CompanySizeSelectProps = {
	value: CompanySize | "";
	onChange: (value: CompanySize) => void;
	containerClassName?: string;
};

// ------------------------------- COMPONENT --------------------------------
export default function CompanySizeSelect({
	value,
	onChange,
	containerClassName = "",
}: CompanySizeSelectProps) {
	const [open, setOpen] = useState(false);

	const selectedLabel = value
		? COMPANY_SIZE_OPTIONS.find((o) => o.value === value)?.label
		: "Select Size";

	return (
		<div
			className={`mt-5 rounded-xl border p-4 bg-white ${containerClassName}`}
		>
			<div className="mb-3">
				<div className="font-medium text-xs text-slate-600">Company Size</div>
				<div className="text-xs text-slate-600 mt-1 mb-4">
					Tax rate will be applied automatically based on company size
				</div>
			</div>

			{/*============================  TRIGGER ========================== */}
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="w-full flex items-center justify-between rounded border bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 text-left"
			>
				<span>{selectedLabel}</span>
				<span className="text-slate-600 text-xl">{open ? "▴" : "▾"}</span>
			</button>

			{/*============================  OPTIONS ========================== */}
			{open && (
				<div className="mt-3 overflow-hidden rounded border bg-slate-100">
					{COMPANY_SIZE_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => {
								onChange(option.value);
								setOpen(false);
							}}
							className="w-full border-b px-3 py-2 text-left text-sm last:border-b-0 hover:bg-slate-200"
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

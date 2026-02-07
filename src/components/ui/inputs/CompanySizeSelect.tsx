// src/components/ui/inputs/CompanySizeSelect.tsx
// -----------------------------------------------------------

// -----------------------------------------------------------
import { useState } from "react";
import type { CompanySize as ApiCompanySize } from "../../../api/types";

// --------------------------------------------
// Types
// --------------------------------------------
export type CompanySize = ApiCompanySize;

// --------------------------------------------
// Options (TYPED)
// --------------------------------------------
const COMPANY_SIZE_OPTIONS: {
	value: CompanySize;
	label: string;
}[] = [
	{
		value: "Small",
		label: "Small Company (0%)",
	},
	{
		value: "Medium",
		label: "Medium Companies (30%)",
	},
	{
		value: "Multinational",
		label: "Multinational Company (30% vs 15% Min. Tax)",
	},
];

// --------------------------------------------
// Props
// --------------------------------------------
type CompanySizeSelectProps = {
	value: CompanySize | "";
	onChange: (value: CompanySize) => void;
	containerClassName?: string;
};

// --------------------------------------------
// Component
// --------------------------------------------
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
			className={`rounded-lg border border-brand-200 p-4 my-3 ${containerClassName}`}
		>
			<div className="mb-3">
				<div className="font-medium text-sm text-slate-700">Company Size</div>
				<div className="text-xs text-slate-500 mb-5">
					Tax rate will be applied automatically based on company size
				</div>
			</div>

			{/* Trigger */}
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="w-full flex items-center justify-between rounded border bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 text-left"
			>
				<span>{selectedLabel}</span>
				<span className="text-slate-600">{open ? "▴" : "▾"}</span>
			</button>

			{/* Options */}
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

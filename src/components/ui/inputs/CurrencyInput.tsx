// src/components/ui/CurrencyInput.tsx
// -----------------------------------------------------------
// -----------------------------------------------------------

import type { ReactNode } from "react";

// -----------------------------------------------------------
// -----------------------------------------------------------

type CurrencyInputProps = {
	id: string;
	label: ReactNode;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;

	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	placeholderClassName?: string;
};

export default function CurrencyInput({
	id,
	label,
	value,
	onChange,
	placeholder = "0",
	containerClassName = "",
	labelClassName = "",
	inputClassName = "",
	placeholderClassName = "",
}: CurrencyInputProps) {
	return (
		<div className={`space-y-1 ${containerClassName}`}>
			<label
				htmlFor={id}
				className={`font-medium text-sm text-slate-800 ${labelClassName}`}
			>
				{label}
			</label>

			<div className="relative bg-slate-100 ">
				<span className="pointer-events-none absolute left-2 top-[1rem] -translate-y-[0.5rem] text-slate-900 text-[1.1rem]">
					₦
				</span>

				<input
					id={id}
					className={`
						w-full box-border rounded-lg border border-brand-200 pl-[1.4rem] pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200
						${inputClassName}
						${placeholderClassName}
					`}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					inputMode="numeric"
				/>
			</div>
		</div>
	);
}

// -----------------------------------------------------------
// -----------------------------------------------------------

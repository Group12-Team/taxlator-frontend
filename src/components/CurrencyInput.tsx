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

			<div className="relative">
				<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
					₦
				</span>

				<input
					id={id}
					className={`
						w-full box-border rounded border pl-8 pr-3 py-2 mb-1
						focus:outline-none focus:ring-2 focus:ring-brand-500
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

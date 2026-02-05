// src/components/ui/buttons/CalculateButton.tsx

// -----------------------------------------------------------
import React from "react";
import clsx from "clsx";

type FormButtonProps = {
	children: React.ReactNode;
	enabled: boolean;
	loading?: boolean;
	className?: string;
};

// -----------------------------------------------------------
export default function FormButton({
	children,
	enabled,
	loading = false,
	className,
}: FormButtonProps) {
	return (
		<button
			type="submit"
			disabled={!enabled || loading}
			className={clsx(
				"w-full rounded py-2.5 text-sm font-semibold transition-colors duration-200",
				"border",
				enabled
					? "bg-brand-800 text-white border-brand-800 hover:bg-brand-900"
					: "bg-white text-slate-400 border-slate-300 cursor-not-allowed",
				loading && "opacity-60",
				className,
			)}
		>
			{children}
		</button>
	);
}

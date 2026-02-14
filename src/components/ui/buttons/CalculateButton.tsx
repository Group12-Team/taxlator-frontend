// ====================================
// src/components/ui/buttons/CalculateButton.tsx
// ====================================

// ==================================== CALCULATE BUTTON COMPONENT ====================================
type CalculateButtonProps = {
	onClick: () => void;
	enabled: boolean;
	loading?: boolean;
	label?: string;
	loadingLabel?: string;
	className?: string;
};

// ====================================
export default function CalculateButton({
	onClick,
	enabled,
	loading = false,
	label = "Proceed",
	loadingLabel = "Calculating...",
	className = "",
}: CalculateButtonProps) {
	const isDisabled = !enabled || loading;

	// ==================================== Render
	return (
		<button
			onClick={onClick}
			disabled={isDisabled}
			className={`
				mt-6 w-full rounded py-2.5 text-sm font-semibold transition-colors
				${
					isDisabled
						? "bg-white text-slate-400 border border-slate-300 cursor-not-allowed"
						: "bg-brand-800 text-white hover:bg-brand-900"
				}
				${className}
			`}
		>
			{loading ? loadingLabel : label}
		</button>
	);
}

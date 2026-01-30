// src/components/ui/taxVatProceedBtn.tsx
// -----------------------------------------------------------

type TaxProceedButtonProps = {
	onClick: () => void;
	loading?: boolean;
	label?: string;
	loadingLabel?: string;
	className?: string;
};

// -----------------------------------------------------------
// -----------------------------------------------------------

export default function TaxProceedButton({
	onClick,
	loading = false,
	label = "Proceed",
	loadingLabel = "Calculating...",
	className = "",
}: TaxProceedButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={loading}
			className={`
				mt-6 w-full rounded 
				bg-brand-800 text-white 
				py-2.5 text-sm font-semibold 
				hover:bg-brand-900 
				disabled:opacity-60
				${className}
			`}
		>
			{loading ? loadingLabel : label}
		</button>
	);
}
// -----------------------------------------------------------
// -----------------------------------------------------------

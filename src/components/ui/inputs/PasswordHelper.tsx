// src/components/ui/inputs/PasswordHelper.tsx

// ----------------------------------------------
type PasswordHelperProps = {
	visible: boolean;
};

// ------------------------- Password Helper Component -------------------------
export default function PasswordHelper({ visible }: PasswordHelperProps) {
	if (!visible) return null;

	return (
		<p className="mt-1 text-[11px] leading-snug text-slate-500">
			Password must contain at least{" "}
			<span className="font-medium text-brand-500">1 uppercase</span>,{" "}
			<span className="font-medium text-brand-500">1 lowercase</span>,{" "}
			<span className="font-medium text-brand-500">1 number</span>, and{" "}
			<span className="font-medium text-brand-500">1 special character</span>.
		</p>
	);
}

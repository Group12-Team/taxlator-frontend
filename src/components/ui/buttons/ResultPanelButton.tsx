// src/components/ui/buttons/ResultPanelButton.tsx

// -----------------------------------------------------------
import React from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

// ----------------------------- RESULT PANEL BUTTON COMPONENT -----------------------------
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary";
	fullWidth?: boolean;
}

const ResultPanelButton: React.FC<ButtonProps> = ({
	children,
	className,
	variant = "primary",
	fullWidth = false,
	...props
}) => {
	const baseStyles =
		"rounded py-2.5 text-sm font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1";

	const variantStyles = clsx({
		"bg-brand-800 text-white hover:bg-brand-900 focus:ring-brand-500":
			variant === "primary",
		"bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-300":
			variant === "secondary",
	});

	const widthStyles = fullWidth ? "w-full" : "";

	return (
		<button
			className={clsx(baseStyles, variantStyles, widthStyles, className)}
			{...props}
		>
			{children}
		</button>
	);
};

export default ResultPanelButton;

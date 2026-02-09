// src/components/CalculateModal.tsx
import { useEffect, useRef } from "react";
import OptionCard from "../cards/OptionCard";
import calculateModalImages from "../../../assets/calculateModal/index";
import TinyFooter from "../../layouts/TinyFooter";

type CalculateModalProps = {
	open: boolean;
	onClose: () => void;
	onPick: (path: string) => void;
};

export default function CalculateModal({
	open,
	onClose,
	onPick,
}: CalculateModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open || !modalRef.current) return;

		const modal = modalRef.current;
		const focusableSelectors =
			'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
		const focusableEls =
			modal.querySelectorAll<HTMLElement>(focusableSelectors);
		const firstEl = focusableEls[0];
		const lastEl = focusableEls[focusableEls.length - 1];
		firstEl?.focus();

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				onClose();
				return;
			}
			if (e.key !== "Tab") return;

			if (e.shiftKey) {
				if (document.activeElement === firstEl) {
					e.preventDefault();
					lastEl?.focus();
				}
			} else {
				if (document.activeElement === lastEl) {
					e.preventDefault();
					firstEl?.focus();
				}
			}
		}

		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="absolute inset-0 grid place-items-center p-4">
				<div
					ref={modalRef}
					className="w-full max-w-xl rounded-2xl bg-slate-50 border shadow-soft overflow-hidden"
				>
					{/* HEADER */}
					<div className="w-full px-5 py-4 bg-white border-b flex items-center justify-between">
						<div className="w-full text-center">
							<div className="font-semibold text-brand-800 text-lg">
								Calculate Your Tax
							</div>
							<div className="text-xs text-slate-600">
								Select the type of tax you want to calculate
							</div>
						</div>
						<button
							onClick={onClose}
							className="w-9 h-9 rounded-full hover:bg-slate-100 grid place-items-center"
						>
							✕
						</button>
					</div>

					{/* OPTION CARDS */}
					<div className="p-5 grid sm:grid-cols-2 gap-3">
						<OptionCard
							title="PAYE / PIT"
							desc="Personal Income Tax calculator"
							image={calculateModalImages.PayePit}
							hoverImage={calculateModalImages.PayePitHover}
							onClick={() => onPick("/tax/payePit")}
						/>

						<OptionCard
							title="VAT"
							desc="Value Added Tax calculator"
							image={calculateModalImages.Vat}
							hoverImage={calculateModalImages.VatHover}
							bgClass="bg-white"
							onClick={() => onPick("/tax/vat")}
						/>

						<OptionCard
							title="Freelancer / Self-Employed"
							desc="Tax for freelancers and self-employed individuals"
							image={calculateModalImages.Freelancer}
							hoverImage={calculateModalImages.FreelancerHover}
							onClick={() => onPick("/tax/freelancer")}
						/>

						<OptionCard
							title="Company Income Tax"
							desc="Corporate tax calculator"
							image={calculateModalImages.Company}
							hoverImage={calculateModalImages.CompanyHover}
							onClick={() => onPick("/tax/cit")}
						/>
					</div>

					{/* FOOTER */}
					<TinyFooter />
				</div>
			</div>
		</div>
	);
}

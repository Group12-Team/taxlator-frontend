// src/components/CalculateModal.tsx
import { useEffect } from "react";
import OptionCard from "../components/ui/OptionCard";
import payPit from "../assets/payePit.png";
import vat from "../assets/vat.png";
import freelancer from "../assets/freelancer.png";
import company from "../assets/company.png";
import TinyFooter from "../components/ui/TinyFooter";

export default function CalculateModal({
	open,
	onClose,
	onPick,
}: {
	open: boolean;
	onClose: () => void;
	onPick: (path: string) => void;
}) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		if (open) window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="absolute inset-0 grid place-items-center p-4">
				<div className="w-full max-w-xl rounded-2xl bg-slate-50 border shadow-soft overflow-hidden">
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

					{/* 👇 OptionCards live INSIDE here */}
					<div className="p-5 grid sm:grid-cols-2 gap-3">
						<OptionCard
							title="PAYE / PIT"
							desc="Personal Income Tax calculator"
							image={payPit}
							onClick={() => onPick("/tax/paye-pit")}
						/>

						<OptionCard
							title="VAT"
							desc="Value Added Tax calculator"
							image={vat}
							onClick={() => onPick("/tax/vat")}
						/>

						<OptionCard
							title="Freelancer / Self-Employed"
							desc="Tax for freelancers and self-employed individuals"
							image={freelancer}
							onClick={() => onPick("/tax/freelancer")}
						/>

						<OptionCard
							title="Company Income Tax"
							desc="Corporate tax calculator"
							image={company}
							onClick={() => onPick("/tax/company")}
						/>
					</div>
					<TinyFooter />
				</div>
			</div>
		</div>
	);
}

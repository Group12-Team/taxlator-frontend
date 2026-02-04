// taxlator/src/pages/Calculate.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalculateModal from "../../components/ui/modals/CalculateModal";

// ----------------------------------------------
// ----------------------------------------------

export default function Calculate() {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	return (
		<div className="relative bg-slate-100 min-h-[70vh]">
			{/* Background content */}
			<div className="grid place-items-center px-4 py-10 min-h-[70vh]">
				<div className="max-w-xl w-full text-center">
					<div className="text-2xl font-semibold text-slate-900">
						Calculate Your Tax
					</div>

					<div className="text-sm text-slate-600 mt-2">
						Choose a tax type to continue.
					</div>

					<button
						onClick={() => setOpen(true)}
						className="mt-5 px-5 py-2.5 rounded bg-brand-800 text-white text-sm font-semibold hover:bg-brand-900"
					>
						Choose Tax Type
					</button>
				</div>
			</div>

			{/* Modal layer */}
			{open && (
				<CalculateModal
					open={open}
					onClose={() => {
						setOpen(false);
						navigate("/");
					}}
					onPick={(path) => {
						setOpen(false);
						navigate(path);
					}}
				/>
			)}
		</div>
	);
}

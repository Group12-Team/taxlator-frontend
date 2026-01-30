// taxlator/src/pages/Calculate.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";

import CalculateModal from "../components/CalculateModal";

// ----------------------------------------------
// animation configs
// ----------------------------------------------
const backgroundVariants = {
	normal: {
		filter: "blur(0px)",
		scale: 1,
	},
	blurred: {
		filter: "blur(6px)",
		scale: 0.98,
	},
};

const backgroundTransition = {
	duration: 0.25,
	ease: cubicBezier(0.4, 0.0, 0.2, 1),
};

const modalVariants = {
	hidden: {
		opacity: 0,
		scale: 0.9,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 10,
	},
};

const modalTransition = {
	duration: 0.3,
	ease: cubicBezier(0.4, 0.0, 0.2, 1),
};

// ----------------------------------------------
// ----------------------------------------------

export default function Calculate() {
	const [open, setOpen] = useState(true);
	const navigate = useNavigate();

	return (
		<div className="relative bg-slate-100 min-h-[70vh]">
			{/* Background content */}
			<motion.div
				variants={backgroundVariants}
				animate={open ? "blurred" : "normal"}
				transition={backgroundTransition}
				className="grid place-items-center px-4 py-10 min-h-[70vh]"
			>
				<div className="max-w-xl w-full text-center">
					<div className="text-2xl font-semibold text-slate-900">
						Calculate Your Tax
					</div>

					<div className="text-sm text-slate-600 mt-2">
						Choose a tax type to continue.
					</div>

					<motion.button
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.97 }}
						transition={{ type: "spring", stiffness: 400, damping: 20 }}
						onClick={() => setOpen(true)}
						className="mt-5 px-5 py-2.5 rounded bg-brand-800 text-white text-sm font-semibold hover:bg-brand-900"
					>
						Choose Tax Type
					</motion.button>
				</div>
			</motion.div>

			{/* Modal layer */}
			<AnimatePresence>
				{open && (
					<motion.div
						className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm"
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={modalVariants}
						transition={modalTransition}
					>
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
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
// ----------------------------------------------
// ----------------------------------------------

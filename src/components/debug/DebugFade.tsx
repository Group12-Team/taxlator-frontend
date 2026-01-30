// src/components/debug/DebugFade.tsx
// ----------------------------------------------

import { motion } from "framer-motion";

export default function DebugFade() {
	return (
		<div className="h-[200vh] bg-slate-100 px-4 py-32">
			{/* Spacer so you must scroll */}
			<div className="h-[60vh]" />

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{
					duration: 0.6,
					ease: "easeOut",
				}}
				viewport={{
					once: false,
					amount: 0.5,
				}}
				className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center shadow-lg"
			>
				<h2 className="text-xl font-semibold">Debug Fade</h2>
				<p className="mt-4 text-slate-600">
					This should fade in smoothly with NO movement.
				</p>
			</motion.div>

			{/* Spacer after */}
			<div className="h-[60vh]" />
		</div>
	);
}

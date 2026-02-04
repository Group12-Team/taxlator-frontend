// src/components/landing/Hero.tsx
// ----------------------------------------------

// Hero component for the Landing page
// ----------------------------------------------

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import taxlatorLanding from "../../assets/landingPage/taxlator-landing.jpg";
import MotionButton from "../ui/buttons/MotionButton";

// ----------------------------------------------
// ----------------------------------------------

export default function Hero() {
	return (
		<div className="max-w-6xl mx-auto px-4 py-10 mt-10 lg:mt-0">
			{/* Image */}
			<motion.div
				className="relative overflow-hidden border border-slate-200 aspect-[16/7]"
				initial={{ scale: 1.1, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<img
					src={taxlatorLanding}
					alt="Taxlator"
					className="absolute inset-0 w-full h-full object-cover object-bottom"
				/>
			</motion.div>

			{/* CTA */}
			<MotionButton className="mt-6 w-full">
				<Link
					to="/calculate"
					className="block w-full rounded-xl bg-brand-800 py-6 text-center text-lg font-bold text-white"
				>
					CALCULATE TAX
				</Link>
			</MotionButton>
		</div>
	);
}
// ----------------------------------------------
// ----------------------------------------------

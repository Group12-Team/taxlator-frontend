// src/components/landing/HowItWorks.tsx
// ----------------------------------------------

// How It Works component for the Landing page
// Fade-only scroll animation (no layout shift)
// ----------------------------------------------

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

// ----------------------------------------------
const steps = [
	{
		title: "Choose Your Tax Type",
		description:
			"Select from PAYE, Annual PIT, Freelancer, VAT, or Company Income Tax.",
	},
	{
		title: "Enter Your Income & Deductions",
		description: "Input your gross income and any eligible deductions.",
	},
	{
		title: "See Your Tax Breakdown Instantly",
		description: "Get instant results with detailed breakdowns.",
	},
];

// ----------------------------------------------
// ----------------------------------------------

export default function HowItWorks() {
	return (
		<div className="bg-slate-50 py-16">
			<div className="max-w-6xl mx-auto px-4">
				<SectionTitle
					title="How It Works?"
					subtitle="Just three steps to calculate your tax"
				/>

				<div className="mt-12 grid gap-8 md:grid-cols-3">
					{steps.map((step, i) => (
						<motion.div
							key={step.title}
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{
								duration: 0.5,
								ease: "easeOut",
							}}
							viewport={{
								amount: 0.2,
								once: false,
							}}
							className="rounded-2xl border border-brand-500 bg-white px-6 py-10 text-center"
						>
							<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-800 text-white">
								{i + 1}
							</div>

							<h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

							<p className="mt-4 text-sm text-slate-600">{step.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}

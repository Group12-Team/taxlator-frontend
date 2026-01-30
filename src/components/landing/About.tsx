// src/components/landing/About.tsx
// ----------------------------------------------

// About component for the Landing page
// ----------------------------------------------

import SectionTitle from "./SectionTitle";

// Icons
// ----------------------------------------------

import frameArrow from "../../assets/frameArrow.png";
import frameCarbon from "../../assets/frameCarbon.png";
import frameUser from "../../assets/fameUser.png";
import frameStars from "../../assets/frameStars.png";

const features = [
	{
		icon: frameArrow,
		title: "Accurate Calculations",
		description:
			"Powered by the latest tax rules, Taxlator ensures your results are correct and dependable.",
	},
	{
		icon: frameCarbon,
		title: "Instant Breakdown of Your Salary",
		description:
			"Get a clear, instant breakdown of taxes, deductions, and take-home pay.",
	},
	{
		icon: frameUser,
		title: "Perfect for Workers, Students & Businesses",
		description:
			"Whether you're employed or self-employed, Taxlator helps you stay financially informed.",
	},
	{
		icon: frameStars,
		title: "Simple, Beautiful & Easy to Use",
		description:
			"Designed to remove confusion and make tax calculations effortless.",
	},
];

// ----------------------------------------------
// ----------------------------------------------

export default function About() {
	return (
		<div id="about" className="bg-slate-50 py-10">
			<div className="max-w-6xl mx-auto px-4">
				<SectionTitle
					title="About"
					subtitle="Essential facts every Nigerian taxpayer should know about us"
				/>

				<div className="mt-10 grid gap-6 md:grid-cols-2">
					{features.map(({ icon, title, description }) => (
						<div
							key={title}
							className="flex items-center gap-5 rounded-2xl bg-white border border-brand-300 p-6"
						>
							{/* Icon */}
							<div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-800">
								<img
									src={icon}
									alt={title}
									className="w-7 h-7 object-contain"
								/>
							</div>

							{/* Text */}
							<div>
								<div className="font-semibold text-base text-slate-900">
									{title}
								</div>
								<p className="mt-2 text-sm text-slate-600 leading-relaxed">
									{description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
// ----------------------------------------------
// ----------------------------------------------

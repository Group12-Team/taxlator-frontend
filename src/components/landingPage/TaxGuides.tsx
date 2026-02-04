// src/components/landing/TaxGuides.tsx
// ----------------------------------------------

// Tax Guides component for the Landing page
// ----------------------------------------------

import SectionTitle from "./SectionTitle";

// Images
// ----------------------------------------------

import taxUpdate1 from "../../assets/landingPage/taxUpdate1.png";
import taxTipsUpdate from "../../assets/landingPage/taxTipsUpdate.png";
import companyIncomeTax from "../../assets/landingPage/companyIncomeTax.png";

const taxGuides = [
	{
		tag: "PAYE/PIT",
		title: "Understanding PAYE Tax Bands in Nigeria",
		description:
			"Learn how progressive tax rates from 7% to 24% apply to your income and what it means for your take-home pay.",
		image: taxUpdate1,
	},
	{
		tag: "Freelancer",
		title: "Tax Tips for Freelancers and Self-Employed",
		description:
			"Discover legitimate business expenses you can deduct and how to optimize your tax payments as a freelancer.",
		image: taxTipsUpdate,
	},
	{
		tag: "Company Income Tax",
		title: "Company Income Tax: What Business Owners Should Know",
		description:
			"A comprehensive guide to CIT rates, allowable deductions, and compliance requirements for Nigerian businesses.",
		image: companyIncomeTax,
	},
];

// ----------------------------------------------
// ----------------------------------------------

export default function TaxGuides() {
	return (
		<div id="guides" className="bg-slate-100 py-14">
			<div className="max-w-6xl mx-auto px-4">
				<SectionTitle
					title="Latest Tax Tips & Updates"
					subtitle="Stay informed with helpful tax guides and insights"
				/>

				<div className="mt-12 grid gap-8 md:grid-cols-3">
					{taxGuides.map(({ title, description, image, tag }) => (
						<div
							key={title}
							className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover:shadow-md transition"
						>
							{/* Image */}
							<div className="h-56 bg-slate-50 flex items-center justify-center">
								<img
									src={image}
									alt={title}
									className="max-h-full max-w-full object-contain"
								/>
							</div>

							{/* Content */}
							<div className="p-6">
								<span className="inline-block rounded-full bg-brand-100 text-brand-800 px-3 py-1 text-xs font-semibold mb-3">
									{tag}
								</span>

								<h3 className="text-lg font-semibold text-slate-900">
									{title}
								</h3>

								<p className="mt-3 text-sm text-slate-600 leading-relaxed">
									{description}
								</p>

								<div className="mt-5 text-sm font-semibold text-brand-800">
									Read More <span>→</span>
									<span className="ml-2 text-gray-500">(coming soon)</span>
								</div>
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

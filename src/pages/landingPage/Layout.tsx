// src/pages/Landing.tsx
import {
	Hero,
	HowItWorks,
	TaxGuides,
	About,
	CTA,
} from "../../components/landingPage";

export default function Landing() {
	return (
		<div className="bg-white min-h-screen w-full">
			<Hero />
			<HowItWorks />
			<TaxGuides />
			<About />
			<CTA />
		</div>
	);
}

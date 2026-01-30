// src/pages/Landing.tsx
// ----------------------------------------------

// Landing Page
// ----------------------------------------------

import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import TaxGuides from "../components/landing/TaxGuides";
import About from "../components/landing/About";
import CTA from "../components/landing/CTA";

// ----------------------------------------------
// ----------------------------------------------

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
// ----------------------------------------------
// ----------------------------------------------

// framer motion debugging only
// ----------------------------------------------
// import DebugFade from "../components/debug/DebugFade";
//
// export default function Home() {
// 	return <DebugFade />;
// }

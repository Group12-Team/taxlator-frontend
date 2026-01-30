// src/components/landing/CTA.tsx
// ----------------------------------------------

// CTA (Call to Action) component for the Landing page
// Lift + zoom button motion (no scroll, no layout shift)
// ----------------------------------------------

import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import MotionButton from "../../components/ui/MotionButton";

// ----------------------------------------------
// ----------------------------------------------

export default function CTA() {
	return (
		<div className="bg-slate-50 py-16">
			<div className="max-w-6xl mx-auto px-4">
				<div className="rounded-2xl bg-brand-800 px-6 py-14 text-center">
					<h2 className="text-2xl md:text-3xl font-semibold text-white">
						Ready to Get Started?
					</h2>

					<p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-white/90 leading-relaxed">
						Start calculating your taxes now. No signup required. Save your
						calculations by creating a free account (optional).
					</p>

					<div className="mt-8">
						<MotionButton>
							<Link
								to="/calculate"
								className="inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-800 hover:bg-white/90 transition"
							>
								Calculate Now
							</Link>
						</MotionButton>
					</div>
				</div>
			</div>
		</div>
	);
}

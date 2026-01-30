// src/components/landing/animations.ts
// ----------------------------------------------

// Animation configurations for Landing page
// Pure fade-in (no movement)
// ----------------------------------------------

import type { Variants } from "framer-motion";

// ----------------------------------------------
// Fade-in only (zero layout shift)
// ----------------------------------------------

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

// ----------------------------------------------
// Stagger container (safe with opacity-only)
// ----------------------------------------------

export const stagger: Variants = {
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

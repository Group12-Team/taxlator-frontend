// src/components/ui/MotionButton.tsx
// ----------------------------------------------

// Reusable Motion Button Component
// ----------------------------------------------

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// ----------------------------------------------
// Props type
// ----------------------------------------------

type MotionButtonProps = {
	children: ReactNode;
	className?: string;
};

// ----------------------------------------------
// ----------------------------------------------

export default function MotionButton({
	children,
	className,
}: MotionButtonProps) {
	return (
		<motion.div
			whileHover={{ scale: 1.06, y: -4 }}
			whileTap={{ scale: 0.96, y: 0 }}
			transition={{
				type: "spring",
				stiffness: 260,
				damping: 18,
			}}
			className={`inline-block ${className ?? ""}`}
		>
			{children}
		</motion.div>
	);
}
// ----------------------------------------------
// ----------------------------------------------

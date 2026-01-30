// src/hooks/useScrollDirection.ts
// ----------------------------------------------

// Hook to detect scroll direction (up or down)
// ----------------------------------------------

import { useEffect, useState } from "react";

// ----------------------------------------------
// ----------------------------------------------

export function useScrollDirection() {
	const [direction, setDirection] = useState<"up" | "down">("down");

	useEffect(() => {
		let lastY = window.scrollY;

		const onScroll = () => {
			const currentY = window.scrollY;
			setDirection(currentY > lastY ? "down" : "up");
			lastY = currentY;
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return direction;
}
// ----------------------------------------------
// ----------------------------------------------

// src/api/getErrorMessage.ts
// -----------------------------------------------------------

import type { ApiError } from "./apiError";

// ==================== ERROR MESSAGE EXTRACTOR ====================

export function getErrorMessage(err: unknown, fallback: string): string {
	const e = err as ApiError;

	return (
		e.response?.data?.message ||
		e.response?.data?.error ||
		e.message ||
		fallback
	);
}

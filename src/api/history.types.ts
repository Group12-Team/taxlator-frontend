// src/api/history.types.ts

// --------------------------------------------------
import type { HistoryItemDTO } from "../types/history.type";

/**
 * API response returned by GET /history
 * Mirrors backend pagination structure.
 */
export interface GetHistoryResponse {
	items: HistoryItemDTO[];
	nextCursor: string | null;
}

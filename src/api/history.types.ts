// src/api/history.types.ts

// --------------------------------------------------
import type { HistoryItemDTO } from "../types/history.type";

// -------------------------------- GET HISTORY RESPONSE --------------------------------
export interface GetHistoryResponse {
	items: HistoryItemDTO[];
	nextCursor: string | null;
}

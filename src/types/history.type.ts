// ======================================================
// HISTORY API CONTRACT
// Represents what backend /history returns.
// ======================================================

import type { PayePitResponse } from "../types/tax/payePit";
// later you add:
// import type { VatResponse } from "./tax/vat.types";
// import type { FreelancerResponse } from "./tax/freelancer.types";
// import type { CitResponse } from "./tax/cit.types";

export type HistoryType = "PAYE/PIT" | "VAT" | "FREELANCER" | "CIT";

export type HistoryResult = PayePitResponse;
// extend as you enable others

export interface HistoryItemDTO {
	_id: string;
	type: HistoryType;
	createdAt: string; 
	input: unknown;
	result: HistoryResult;
}

export interface HistoryListResponse {
	items: HistoryItemDTO[];
	nextCursor?: string | null;
}

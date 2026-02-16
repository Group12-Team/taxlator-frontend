// ====================================
// src/types/history.type.ts
// ====================================

// ====================================
import type { PayePitResponse } from "./tax/payePit.types";
import type { FreelancerResponse } from "./tax/freelancer.types";
import type { VatResponse } from "./vat/vat.types";
import type { CitResponse } from "./tax/cit.types";
// ====================================

// ------------------------------ HISTORY TYPE ------------------------------
export type HistoryType = "PAYE" | "VAT" | "FREELANCER" | "CIT";

// ------------------------------ RESULT MAP ------------------------------
export type HistoryResultMap = {
	PAYE: PayePitResponse;
	FREELANCER: FreelancerResponse;
	VAT: VatResponse;
	CIT: CitResponse;
};

// ------------------------------ HISTORY RESULT (UNION) ------------------------------
export type HistoryResult =
	| { type: "PAYE"; result: PayePitResponse }
	| { type: "FREELANCER"; result: FreelancerResponse }
	| { type: "VAT"; result: VatResponse }
	| { type: "CIT"; result: CitResponse };

// ------------------------------ HISTORY ITEM DTO ------------------------------
export interface HistoryItemDTO<T extends HistoryType = HistoryType> {
	_id: string;
	type: T;
	createdAt: string;
	input: unknown;
	result: HistoryResultMap[T];
}

// ------------------------------ HISTORY LIST RESPONSE ------------------------------
export interface HistoryListResponse {
	items: HistoryItemDTO[];
	nextCursor?: string | null;
}

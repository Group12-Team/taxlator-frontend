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

// ------------------------------ PUBLIC RESULT WRAPPER ------------------------------
export type PublicResult<T> = {
	readonly [K in keyof T]: T[K];
};

// ------------------------------ HISTORY RESULT (DISCRIMINATED UNION) ------------------------------
export type HistoryResult =
	| { type: "PAYE/PIT"; result: PublicResult<PayePitResponse> }
	| { type: "FREELANCER"; result: PublicResult<FreelancerResponse> }
	| { type: "VAT"; result: PublicResult<VatResponse> }
	| { type: "CIT"; result: PublicResult<CitResponse> };

// ------------------------------ HISTORY ITEM DTO ------------------------------
export interface HistoryItemDTO<T extends HistoryType = HistoryType> {
	_id: string;
	type: T;
	createdAt: string;

	// Inputs may vary per calculator — keep flexible
	input: unknown;

	// Result is already cleaned by DTO.toJSON() on the backend
	result: PublicResult<HistoryResultMap[T]>;
}

// ------------------------------ HISTORY LIST RESPONSE ------------------------------
export interface HistoryListResponse {
	items: HistoryItemDTO[];
	nextCursor?: string | null;
}

// src/state/history.ts
// --------------------------------------------------

import { api } from "../api/client";
import type { HistoryType, HistoryResult } from "../types/history.type";

interface AddHistoryPayload {
	type: HistoryType;
	input: unknown;
	result: HistoryResult;
}

export async function addHistory(payload: AddHistoryPayload) {
	try {
		await api.post("/history", payload);
	} catch {
		// silent fail – history should never break calculation UX
	}
}

// src/state/history.ts
// --------------------------------------------------

import { api } from "../api/client";
import { useAuth } from "./useAuth";
import type { HistoryResult } from "../types/history.type";

type AddHistoryPayload = {
	input: unknown;
} & HistoryResult;

/**
 * Automatically records calculation history for authenticated users.
 * Strongly typed so result must match the calculation type.
 */
export function useHistory() {
	const { authenticated } = useAuth();

	async function addHistory(payload: AddHistoryPayload) {
		if (!authenticated) return; // 

		try {
			await api.post("/history", payload);
		} catch {
			// History must NEVER break UX
		}
	}

	return { addHistory };
}

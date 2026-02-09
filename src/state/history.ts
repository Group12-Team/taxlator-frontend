// src/state/history.ts
// --------------------------------------------------

import { api } from "../api/client";
import { useAuth } from "./useAuth";
import type { HistoryType, HistoryResult } from "../types/history.type";

interface AddHistoryPayload {
	type: HistoryType;
	input: unknown;
	result: HistoryResult;
}

/**
 * Hooked version of addHistory that automatically uses the current user.
 * Skips if the user is not authenticated.
 */
export function useHistory() {
	const { authenticated } = useAuth();

	async function addHistory(payload: AddHistoryPayload) {
		if (!authenticated) return; // skip for public users

		try {
			await api.post("/history", payload);
		} catch {
			// silent fail – history should never break calculation UX
		}
	}

	return { addHistory };
}

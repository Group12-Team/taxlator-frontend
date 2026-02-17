// ====================================
// src/hooks/useHistory.ts
// ====================================

// ====================================
import { useState, useCallback, useRef } from "react";
import type { HistoryItemDTO, HistoryType } from "../types/history.type";
import { fetchHistory, clearHistory } from "../state/history";
import { api } from "../api/client";
// ====================================

// ====================== HELPER FUNCTION TO MAP HISTORY TYPE TO LABEL ======================
export function useHistory() {
	const [history, setHistory] = useState<HistoryItemDTO[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// ================= LOAD HISTORY =================

	const loadingRef = useRef(false);

	const loadHistory = useCallback(async (cursor?: string) => {
		if (loadingRef.current) return;

		loadingRef.current = true;
		setLoading(true);

		try {
			const data = await fetchHistory(cursor);
			setHistory((prev) => (cursor ? [...prev, ...data.items] : data.items));
			setNextCursor(data.nextCursor ?? null);
		} catch (err: unknown) {
			if (err instanceof Error) setError(err.message);
			else setError("Failed to load history");
		} finally {
			loadingRef.current = false;
			setLoading(false);
		}
	}, []);

	// ================= REFRESH HISTORY =================
	const refreshHistory = useCallback(() => loadHistory(), [loadHistory]);

	// ================= CLEAR ALL HISTORY =================
	const clearAllHistory = useCallback(async () => {
		try {
			await clearHistory();
			setHistory([]);
			setNextCursor(null);
		} catch (err: unknown) {
			if (err instanceof Error) setError(err.message);
			else setError("Failed to clear history");
		}
	}, []);

	// ================= ADD HISTORY =================
	const addHistory = useCallback(
		async ({
			type,
			input,
			result,
		}: {
			type: HistoryType;
			input: unknown;
			result: unknown;
		}) => {
			try {
				await api.post("/api/history", { type, input, result });
				await refreshHistory();
			} catch (err: unknown) {
				if (err instanceof Error) setError(err.message);
				else setError("Failed to log history");
			}
		},
		[refreshHistory],
	);

	return {
		history,
		nextCursor,
		loading,
		error,
		loadHistory,
		refreshHistory,
		clearAllHistory,
		addHistory,
	};
}

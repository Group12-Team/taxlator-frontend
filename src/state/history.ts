// ====================================
// src/state/history.ts
// ====================================

// ====================================
import { api } from "../api/client";
import type { HistoryListResponse } from "../types/history.type";
// ====================================

// ================= FETCH HISTORY =================
export async function fetchHistory(cursor?: string) {
	const url = cursor ? `/api/history?cursor=${cursor}` : "/api/history";
	const { data } = await api.get<HistoryListResponse>(url);
	return data;
}

// ================= CLEAR HISTORY =================
export async function clearHistory() {
	await api.delete("/api/history");
}

// ================= EXPORT CSV =================
export function exportHistoryCSV() {
	window.open(`${api.defaults.baseURL}/api/history/export/csv`, "_blank");
}

// ================= EXPORT PDF =================
export function exportHistoryPDF() {
	window.open(`${api.defaults.baseURL}/api/history/export/pdf`, "_blank");
}
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

// ================= DOWNLOAD HELPER =================
function downloadBlob(blob: Blob, filename: string) {
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(url);
}

// ================= EXPORT CSV =================
export async function exportHistoryCSV() {
	const response = await api.get("/api/history/export/csv", {
		responseType: "blob", // IMPORTANT
	});

	downloadBlob(response.data, "taxlator-history.csv");
}

// ================= EXPORT PDF =================
export async function exportHistoryPDF() {
	const response = await api.get("/api/history/export/pdf", {
		responseType: "blob", // IMPORTANT
	});

	downloadBlob(response.data, "taxlator-history.pdf");
}

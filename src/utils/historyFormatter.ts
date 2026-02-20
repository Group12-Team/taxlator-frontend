// ====================================
// src/utils/historyFormatter.ts
// ====================================

// ====================================
import { historyDisplayConfig } from "../config/historyDisplay.config";
import type { HistoryType } from "../types/history.type";
// ====================================

// ==================================== HISTORY DISPLAY FORMATTER HELPER ====================================
export function formatSection(
	type: HistoryType,
	sectionKey: string,
	data: Record<string, unknown>,
) {
	const config = historyDisplayConfig[type]?.[sectionKey];

	const entries = Object.entries(data);

	if (config?.order) {
		entries.sort(([a], [b]) => {
			const ai = config.order!.indexOf(a);
			const bi = config.order!.indexOf(b);
			return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
		});
	}

	return entries.map(([key, value]) => ({
		key,
		label: config?.labels?.[key] ?? autoLabel(key),
		value,
	}));
}

function autoLabel(key: string) {
	return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

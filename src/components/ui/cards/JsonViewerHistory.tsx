// ====================================
// src/components/ui/cards/JsonViewerHistory.tsx
// ====================================

// ====================================
import { formatSection } from "../../../utils/historyFormatter";
import type { HistoryType } from "../../../types/history.type";
// ====================================

// ====================================
type Props = {
	data: Record<string, unknown>;
	type: HistoryType;
	sectionKey: string;
};
// ====================================

// ==================================== HISTORY VALUE FORMATTER ====================================
function formatValue(value: unknown): string {
	if (value === null || value === undefined) return "—";

	if (typeof value === "boolean") return value ? "Yes" : "No";

	if (typeof value === "number") return String(value);

	if (typeof value === "string") return value;

	if (Array.isArray(value)) return value.join(", ");

	if (typeof value === "object") {
		// flatten nested DTO-safe objects
		return Object.values(value as Record<string, unknown>)
			.map((v) => formatValue(v))
			.join(" ");
	}

	return String(value);
}

// ==================================== JSON VIEWER ====================================
export default function JsonViewer({ data, type, sectionKey }: Props) {
	const rows = formatSection(type, sectionKey, data);

	return (
		<div className="flex flex-col">
			{rows.map(({ key, label, value }) => (
				<div
					key={key}
					className="flex justify-between text-sx md:text-sm font-medium border-b border-brand-200 py-1"
				>
					<span className="text-xs md:text-sm font-light">{label}</span>

					<span className="text-xs md:text-sm font-light text-right">
						{formatValue(value)}
					</span>
				</div>
			))}
		</div>
	);
}

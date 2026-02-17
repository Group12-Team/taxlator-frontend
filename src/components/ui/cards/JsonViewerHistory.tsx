// ====================================
// src/components/ui/cards/JsonViewerHistory.tsx
// ====================================

import type { JsonObject, JsonValue } from "../../../types/json";

type Props = {
	data: JsonObject;
};

// ==================================== VALUE FORMATTER ====================================
function formatValue(value: JsonValue): string {
	if (value === null) return "—";

	if (typeof value === "boolean") return value ? "Yes" : "No";

	if (typeof value === "number") {
		return new Intl.NumberFormat("en-NG").format(value);
	}

	if (typeof value === "string") return value;

	// Flatten nested objects instead of showing {}
	if (Array.isArray(value)) return value.join(", ");

	return Object.values(value).join(" ");
}

// ==================================== JSON VIEWER ====================================
export default function JsonViewer({ data }: Props) {
	return (
		<div className="flex flex-col">
			{Object.entries(data).map(([key, value]) => (
				<div
					key={key}
					className="flex justify-between text-sx md:text-sm font-medium border-b border-brand-200 py-1"
				>
					<span className="capitalize text-xs md:text-sm font-light">
						{key.replace(/([A-Z])/g, " $1")}
					</span>

					<span className="text-xs md:text-sm font-light text-right">
						{formatValue(value)}
					</span>
				</div>
			))}
		</div>
	);
}

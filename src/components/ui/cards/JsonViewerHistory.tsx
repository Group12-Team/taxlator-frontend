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
					className="flex justify-between border-b border-gray-100 py-1.5 last:border-none"
				>
					<span className="text-gray-500 capitalize">
						{key.replace(/([A-Z])/g, " $1")}
					</span>

					<span className="text-gray-900 font-medium text-right">
						{formatValue(value)}
					</span>
				</div>
			))}
		</div>
	);
}

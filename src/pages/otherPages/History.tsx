// ====================================
// src/pages/otherPages/History.tsx
// ====================================

import { useEffect, useRef } from "react";
import { useHistory } from "../../hooks/useHistory";
import { exportHistoryCSV, exportHistoryPDF } from "../../state/history";
import JsonViewer from "../../components/ui/cards/JsonViewerHistory";
import type { JsonObject } from "../../types/json";

// ==================================== TYPE GUARD ====================================
function isJsonObject(value: unknown): value is JsonObject {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

// ==================================== TYPE BADGE STYLING ====================================
function getTypeStyles(type: string) {
	switch (type.toUpperCase()) {
		case "VAT":
			return "text-blue-800 bg-blue-200 border-blue-200 p-3 border rounded-full";
		case "CIT":
			return "text-purple-800 bg-purple-200 border-purple-200 p-3 border rounded-full";
		case "PAYE":
			return "text-emerald-800 bg-emerald-200 border-emerald-200 p-3 border rounded-full";
		case "FREELANCE":
			return "text-amber-800 bg-amber-200 border-amber-200 p-3 border rounded-full";
		default:
			return "bg-gray-50 text-gray-700 border-gray-200";
	}
}

// ==================================== DATE FORMATTER ====================================
function formatDate(date: string) {
	return new Intl.DateTimeFormat("en-NG", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(new Date(date));
}

// ==================================== HISTORY PAGE COMPONENT ====================================
export default function HistoryPage() {
	const {
		history,
		nextCursor,
		loading,
		refreshHistory,
		clearAllHistory,
		loadHistory,
	} = useHistory();

	const didLoadRef = useRef(false);

	useEffect(() => {
		if (didLoadRef.current) return;
		didLoadRef.current = true;
		refreshHistory();
	}, [refreshHistory]);

	return (
		<div className="w-full min-w-0 bg-slate-100 rounded-2xl border py-7 px-5">
			{/* ===================== ACTION BUTTONS ===================== */}
			<div className="w-full max-w-3xl mx-auto flex gap-2 justify-end items-center">
				<button
					onClick={exportHistoryCSV}
					className="text-brand-700 bg-brand-50 text-xs md:text-sm font-medium px-3 py-2 rounded border border-brand-200 hover:bg-brand-100"
				>
					Export CSV
				</button>
				{/* ======================================================= */}

				<button
					onClick={exportHistoryPDF}
					className="text-brand-700 bg-brand-50 text-xs md:text-sm font-medium px-3 py-2 rounded border border-brand-200 hover:bg-brand-100"
				>
					Export PDF
				</button>
				{/* ======================================================= */}

				<button
					onClick={clearAllHistory}
					className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 rounded text-xs md:text-sm"
				>
					Clear All
				</button>
			</div>
			{/* ======================================================= */}

			{/*  ===================== HISTORY LIST  ===================== */}
			<div className="w-full max-w-3xl mx-auto my-8 space-y-10">
				{loading && history.length === 0 ? (
					<p className="text-brand-700 p-4">Loading...</p>
				) : (
					history.map((item) => (
						<div
							key={item._id}
							className="bg-brand-50 border border-brand-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
						>
							{/*  ===================== HEADER  ===================== */}
							<div className="flex justify-between items-center mb-5">
								<span
									className={`text-sx md:text-sm font-bold ${getTypeStyles(
										item.type,
									)}`}
								>
									{item.type}
								</span>

								<span className="text-sx md:text-sm font-medium text-brand-700">
									{formatDate(item.createdAt)}
								</span>
							</div>

							{/*  ===================== INPUT  ===================== */}
							<div className="mb-5">
								<p className="text-brand-700 text-sx md:text-sm font-medium mb-2">
									Input
								</p>
								{isJsonObject(item.input) && <JsonViewer data={item.input} />}
							</div>

							{/*  ===================== RESULT  ===================== */}
							<div>
								<p className="text-brand-700 text-sx md:text-sm font-medium mb-2">
									Result
								</p>

								{isJsonObject(item.result) && <JsonViewer data={item.result} />}
							</div>
						</div>
					))
				)}

				{nextCursor && (
					<button
						onClick={() => loadHistory(nextCursor)}
						className="btn btn-sm btn-outline mt-4"
						disabled={loading}
					>
						Load More
					</button>
				)}
			</div>
		</div>
	);
}

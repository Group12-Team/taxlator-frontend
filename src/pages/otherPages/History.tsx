// ===============================
// src/pages/otherPages/History.tsx
// ===============================

// ===============================
import { useEffect, useState, useCallback } from "react";
import { api, API_BASE } from "../../api/client";
import type { HistoryItemDTO, HistoryType } from "../../types/history.type";
import type { GetHistoryResponse } from "../../api/history.types";
import { useAuth } from "../../state/useAuth";
// ===============================

// =============================== HELPER FUNCTION ===============================
function typeLabel(t: HistoryType) {
	switch (t) {
		case "PAYE":
			return "PAYE / PIT";
		case "VAT":
			return "VAT";
		case "FREELANCER":
			return "Freelancer";
		case "CIT":
			return "Company Income Tax";
		default:
			return t;
	}
}

// =============================== HISTORY PAGE COMPONENT ===============================
export default function History() {
	const { authenticated } = useAuth();

	const [items, setItems] = useState<HistoryItemDTO[]>([]);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [nextCursor, setNextCursor] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const fetchHistory = useCallback(
		async (cursor?: string | null) => {
			if (!authenticated || loading) return;

			setLoading(true);
			try {
				const res = await api.get<GetHistoryResponse>("/api/history", {
					params: { limit: 10, cursor },
				});

				const newItems = res.data.items;

				setItems((prev) => [...prev, ...newItems]);
				setNextCursor(res.data.nextCursor);
			} finally {
				setLoading(false);
			}
		},
		[authenticated, loading],
	);

	useEffect(() => {
		if (!authenticated) return;

		setItems([]);
		setSelectedId(null);
		setNextCursor(null);
		fetchHistory(null);
	}, [authenticated, fetchHistory]);

	const selected = items.find((x) => x._id === selectedId) ?? null;

	const clearAll = async () => {
		if (!authenticated) return;
		await api.delete("/api/history");
		setItems([]);
		setSelectedId(null);
		setNextCursor(null);
	};

	return (
		<div className="bg-slate-100 min-h-[80vh] px-4 py-8">
			<div className="max-w-6xl mx-auto">
				{/*=========================== HEADER =========================== */}
				<div className="flex items-start justify-between gap-3 flex-col sm:flex-row">
					<div>
						<div className="text-xl font-semibold text-slate-900">History</div>
						<div className="text-sm text-slate-600 mt-1">
							{authenticated
								? "Saved calculations for your account."
								: "Sign in to view history."}
						</div>
					</div>

					{authenticated && (
						<div className="flex gap-2">
							<button
								onClick={() =>
									window.open(`${API_BASE}/history/export/csv`, "_blank")
								}
								className="px-3 py-2 rounded border text-sm bg-white hover:bg-slate-50"
							>
								Export CSV
							</button>

							<button
								onClick={() =>
									window.open(`${API_BASE}/history/export/pdf`, "_blank")
								}
								className="px-3 py-2 rounded border text-sm bg-white hover:bg-slate-50"
							>
								Export PDF
							</button>

							<button
								onClick={clearAll}
								className="px-3 py-2 rounded border text-sm bg-white hover:bg-slate-50"
							>
								Clear History
							</button>
						</div>
					)}
				</div>

				{/* =========================== CONTENT =========================== */}
				{authenticated && (
					<div className="mt-6 grid lg:grid-cols-2 gap-4">
						{/*=========================== LIST =========================== */}
						<div className="bg-white border rounded-2xl shadow-soft overflow-hidden">
							<div className="px-4 py-3 border-b font-semibold text-sm">
								Recent Calculations
							</div>

							{items.length === 0 ? (
								<div className="p-4 text-sm text-slate-600">
									No history yet.
								</div>
							) : (
								<div className="divide-y">
									{items.map((it) => (
										<button
											key={it._id}
											onClick={() => setSelectedId(it._id)}
											className={`w-full text-left p-4 hover:bg-slate-50 ${
												selectedId === it._id ? "bg-slate-50" : ""
											}`}
										>
											<div className="flex items-center justify-between gap-3">
												<div className="text-sm font-semibold">
													{typeLabel(it.type)}
												</div>
												<div className="text-xs text-slate-500">
													{new Date(it.createdAt).toLocaleString()}
												</div>
											</div>
										</button>
									))}

									{nextCursor && (
										<button
											onClick={() => fetchHistory(nextCursor)}
											disabled={loading}
											className="w-full py-3 text-sm text-brand-800 hover:bg-slate-50 disabled:opacity-50"
										>
											{loading ? "Loading..." : "Load more"}
										</button>
									)}
								</div>
							)}
						</div>

						{/* =========================== DETAILS =========================== */}
						<div className="bg-white border rounded-2xl shadow-soft overflow-hidden">
							<div className="px-4 py-3 border-b font-semibold text-sm">
								Details
							</div>

							{!selected ? (
								<div className="p-4 text-sm text-slate-600">
									Select an item to view details.
								</div>
							) : (
								<div className="p-4">
									<div className="text-sm font-semibold">
										{typeLabel(selected.type)}
									</div>

									<div className="text-xs text-slate-500 mt-1">
										{new Date(selected.createdAt).toLocaleString()}
									</div>

									<div className="mt-4">
										<div className="text-xs font-semibold text-slate-700">
											Input
										</div>
										<pre className="mt-1 text-xs bg-slate-50 border rounded p-3 overflow-auto">
											{JSON.stringify(selected.input, null, 2)}
										</pre>
									</div>

									<div className="mt-4">
										<div className="text-xs font-semibold text-slate-700">
											Result
										</div>
										<pre className="mt-1 text-xs bg-slate-50 border rounded p-3 overflow-auto">
											{JSON.stringify(selected.result, null, 2)}
										</pre>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

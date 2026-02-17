// ====================================
// src/pages/otherPages/History.tsx
// ====================================

// ====================================
import { useEffect, useRef } from "react";
import { useHistory } from "../../hooks/useHistory";
import { exportHistoryCSV, exportHistoryPDF } from "../../state/history";
// ====================================

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

	// ✅ Prevent React 18 StrictMode double execution
	const didLoadRef = useRef(false);

	useEffect(() => {
		if (didLoadRef.current) return;
		didLoadRef.current = true;

		refreshHistory();
	}, [refreshHistory]);

	// ==================================== RENDER ====================================
	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Your History</h2>

			<div className="flex gap-2 mb-4">
				<button onClick={exportHistoryCSV} className="btn btn-sm btn-primary">
					Export CSV
				</button>

				<button onClick={exportHistoryPDF} className="btn btn-sm btn-secondary">
					Export PDF
				</button>

				<button onClick={clearAllHistory} className="btn btn-sm btn-danger">
					Clear All
				</button>
			</div>

			{loading && history.length === 0 ? (
				<p>Loading...</p>
			) : (
				<ul className="space-y-2">
					{history.map((item) => (
						<li key={item._id} className="border p-2 rounded">
							<p>
								<strong>Type:</strong> {item.type}
							</p>

							<p>
								<strong>Date:</strong>{" "}
								{new Date(item.createdAt).toLocaleString()}
							</p>

							<p>
								<strong>Input:</strong> {JSON.stringify(item.input)}
							</p>

							<p>
								<strong>Result:</strong> {JSON.stringify(item.result)}
							</p>
						</li>
					))}
				</ul>
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
	);
}

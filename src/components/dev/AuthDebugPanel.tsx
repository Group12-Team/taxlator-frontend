

import { useAuth } from "../../state/useAuth";

export default function AuthDebugPanel() {
	const { user, authenticated, loading, refresh, logout } = useAuth();

	// Only render in development
	if (!import.meta.env.DEV) return null;

	return (
		<div className="fixed bottom-4 right-4 w-80 rounded-xl border bg-white shadow-lg text-xs z-50">
			<div className="px-3 py-2 border-b font-semibold bg-slate-50">
				🔐 Auth Debug (Dev Only)
			</div>

			<div className="p-3 space-y-2">
				<div>
					<span className="font-semibold">Loading:</span>{" "}
					{loading ? "true" : "false"}
				</div>

				<div>
					<span className="font-semibold">Authenticated:</span>{" "}
					{authenticated ? "true" : "false"}
				</div>

				<div>
					<span className="font-semibold">User:</span>
					<pre className="bg-slate-100 p-2 rounded mt-1 overflow-auto">
						{user ? JSON.stringify(user, null, 2) : "null"}
					</pre>
				</div>

				<div className="flex gap-2">
					<button
						onClick={refresh}
						className="flex-1 py-1.5 rounded bg-brand-800 text-white hover:bg-brand-900"
					>
						Force Refresh
					</button>
					<button
						onClick={logout}
						className="flex-1 py-1.5 rounded border text-brand-800 hover:bg-slate-50"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

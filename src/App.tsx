// src/App.tsx
// ----------------------------------------------

// DEV DEBUGGING PANEL (REMOVE IN PRODUCTION)
import AuthDebugPanel from "./components/dev/AuthDebugPanel";

// ----------------------------------------------
import Shell from "./components/layouts/Shell";
import { useAuth } from "./state/useAuth";
import AppRoutes from "./routes";

// ----------------------------------------------
// ----------------------------------------------

export default function App() {
	const { loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-slate-600">
				Loading…
			</div>
		);
	}

	return (
		<Shell>
			<AppRoutes />
			<AuthDebugPanel /> {/* DEV ONLY */}
		</Shell>
	);
}
// ----------------------------------------------
// ----------------------------------------------

// ===============================
// src/App.tsx
// ===============================

// ===============================
import Shell from "./components/layouts/Shell";
import { useAuth } from "./state/useAuth";
import AppRoutes from "./routes";
// ===============================

// =============================== APP COMPONENT ===============================
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
		</Shell>
	);
}

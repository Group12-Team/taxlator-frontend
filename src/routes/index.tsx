// ===============================
// src/routes/index.tsx
// ===============================

// ===============================
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PublicRoutes from "./public.routes";
import AuthRoutes from "./auth.routes";
import TaxRoutes from "./tax.routes";
import ProtectedRoutes from "./protected.routes";
// ===============================

// ----------------------------------------------


// =============================== APP ROUTES COMPONENT ===============================
export default function AppRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				{PublicRoutes}
				{AuthRoutes}
				{TaxRoutes}
				{ProtectedRoutes}

				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</AnimatePresence>
	);
}
// ----------------------------------------------


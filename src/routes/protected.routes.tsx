// ===============================
// src/routes/protected.routes.tsx
// ===============================

// ===============================
import { lazy } from "react";
import { Route } from "react-router-dom";
import RequireAuth from "../state/RequireAuth";
// ===============================

// =============================== LAZY LOAD PROTECTED PAGES ===============================
const History = lazy(() => import("../pages/otherPages/History"));

// =============================== PROTECTED ROUTES ===============================
const ProtectedRoutes = [
	<Route
		key="/history"
		path="/history"
		element={
			<RequireAuth>
				<History />
			</RequireAuth>
		}
	/>,
];
// ===============================

export default ProtectedRoutes;

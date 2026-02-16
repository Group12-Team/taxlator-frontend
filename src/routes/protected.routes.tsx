// ===============================
// src/routes/protected.routes.tsx
// ===============================

// ===============================
import { Route } from "react-router-dom";
import RequireAuth from "../state/RequireAuth";
import History from "../pages/otherPages/History";
// ===============================

// =============================== PROTECTED ROUTES ===============================
export default (
	<>
		<Route
			path="/history"
			element={
				<RequireAuth>
					<History />
				</RequireAuth>
			}
		/>
	</>
);

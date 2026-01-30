// src/routes/protected.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------

import { Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import History from "../pages/History";

// ----------------------------------------------
// ----------------------------------------------

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
// ----------------------------------------------
// ----------------------------------------------

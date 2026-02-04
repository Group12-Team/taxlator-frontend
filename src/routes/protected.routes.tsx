// src/routes/protected.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------

import { Route } from "react-router-dom";
import RequireAuth from "../state/RequireAuth";
import History from "../pages/otherPages/History";

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

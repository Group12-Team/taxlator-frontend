// src/routes/auth.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------
import { Route } from "react-router-dom";

import SignIn from "../pages/otherPages/SignIn";
import SignUp from "../pages/otherPages/SignUp";
import VerifyEmail from "../pages/otherPages/verifyEmail";

// ----------------------------------------------
// ----------------------------------------------

export default (
	<>
		<Route path="/signin" element={<SignIn />} />
		<Route path="/signup" element={<SignUp />} />
		<Route path="/verify-email" element={<VerifyEmail />} />
	</>
);
// ----------------------------------------------
// ----------------------------------------------

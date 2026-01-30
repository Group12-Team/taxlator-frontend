// src/routes/public.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------
import { Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Calculate from "../pages/Calculate";
import About from "../pages/About";
import TaxGuides from "../pages/TaxGuides";
import Privacy_Policy from "../pages/Privacy_Policy";
import Terms_Conditions from "../pages/Terms_Conditions";

// ----------------------------------------------
// ----------------------------------------------

export default (
	<>
		<Route path="/" element={<Landing />} />
		<Route path="/calculate" element={<Calculate />} />
		<Route path="/taxguide" element={<TaxGuides />} />
		<Route path="/about" element={<About />} />
		<Route path="/privacy_policy" element={<Privacy_Policy />} />
		<Route path="/terms_conditions" element={<Terms_Conditions />} />
	</>
);
// ----------------------------------------------
// ----------------------------------------------

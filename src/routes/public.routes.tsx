// src/routes/public.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------
import { Route } from "react-router-dom";

import Layout from "../pages/landingPage/Layout";
import Calculate from "../pages/otherPages/Calculate";
import About from "../pages/otherPages/About";
import TaxGuides from "../pages/otherPages/TaxGuides";
import Privacy_Policy from "../pages/otherPages/Privacy_Policy";
import Terms_Conditions from "../pages/otherPages/Terms_Conditions";

// ----------------------------------------------
// ----------------------------------------------

export default (
	<>
		<Route path="/" element={<Layout />} />
		<Route path="/calculate" element={<Calculate />} />
		<Route path="/taxguide" element={<TaxGuides />} />
		<Route path="/about" element={<About />} />
		<Route path="/privacy_policy" element={<Privacy_Policy />} />
		<Route path="/terms_conditions" element={<Terms_Conditions />} />
	</>
);
// ----------------------------------------------
// ----------------------------------------------

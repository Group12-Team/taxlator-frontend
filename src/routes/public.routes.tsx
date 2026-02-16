// ===============================
// src/routes/public.routes.tsx
// ===============================

// ===============================
import { lazy } from "react";
import { Route } from "react-router-dom";
// ===============================

// Lazy-load page components
// ===============================
const Layout = lazy(() => import("../pages/landingPage/Layout"));
const Calculate = lazy(() => import("../pages/otherPages/Calculate"));
const About = lazy(() => import("../pages/otherPages/About"));
const TaxGuides = lazy(() => import("../pages/otherPages/TaxGuides"));
const Privacy_Policy = lazy(() => import("../pages/otherPages/Privacy_Policy"));
const Terms_Conditions = lazy(
	() => import("../pages/otherPages/Terms_Conditions"),
);
// ===============================

// =============================== PUBLIC ROUTES ===============================
const PublicRoutes = [
	<Route key="/" path="/" element={<Layout />} />,
	<Route key="/calculate" path="/calculate" element={<Calculate />} />,
	<Route key="/taxguide" path="/taxguide" element={<TaxGuides />} />,
	<Route key="/about" path="/about" element={<About />} />,
	<Route
		key="/privacy_policy"
		path="/privacy_policy"
		element={<Privacy_Policy />}
	/>,
	<Route
		key="/terms_conditions"
		path="/terms_conditions"
		element={<Terms_Conditions />}
	/>,
];

export default PublicRoutes;

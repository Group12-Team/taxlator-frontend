// ===============================
// src/routes/tax.routes.tsx
// ===============================

// ===============================
import { lazy } from "react";
import { Route } from "react-router-dom";
// ===============================

// =============================== LAZY LOAD TAX PAGES ===============================
const PayePit = lazy(() => import("../pages/tax/PayePit"));
const Vat = lazy(() => import("../pages/vat/Vat"));
const Freelancer = lazy(() => import("../pages/tax/FreeLancer"));
const CIT = lazy(() => import("../pages/tax/Cit"));

// =============================== TAX ROUTES ===============================
const TaxRoutes = [
	<Route key="/tax/payePit" path="/tax/payePit" element={<PayePit />} />,
	<Route key="/tax/vat" path="/tax/vat" element={<Vat />} />,
	<Route
		key="/tax/freelancer"
		path="/tax/freelancer"
		element={<Freelancer />}
	/>,
	<Route key="/tax/cit" path="/tax/cit" element={<CIT />} />,
];
// ===============================

export default TaxRoutes;

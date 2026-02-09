// src/routes/tax.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------

import { Route } from "react-router-dom";
import PayePit from "../pages/tax/PayePit";
import Vat from "../pages/tax/Vat";
import Freelancer from "../pages/tax/FreeLancer";
import CIT from "../pages/tax/Cit";

// ----------------------------------------------
// ----------------------------------------------

export default (
	<>
		<Route path="/tax/payePit" element={<PayePit />} />
		<Route path="/tax/vat" element={<Vat />} />
		<Route path="/tax/freelancer" element={<Freelancer />} />
		<Route path="/tax/cit" element={<CIT />} />
	</>
);
// ----------------------------------------------
// ----------------------------------------------

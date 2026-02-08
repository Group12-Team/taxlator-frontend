// src/routes/tax.routes.tsx
// ----------------------------------------------

// imports
// ----------------------------------------------

import { Route } from "react-router-dom";
import PayePit from "../pages/tax/PayePit";
import Vat from "../pages/tax/Vat";
import Freelancer from "../pages/tax/FreeLancer";
import Company from "../pages/tax/Company";

// ----------------------------------------------
// ----------------------------------------------

export default (
	<>
		<Route path="/tax/paye-pit" element={<PayePit />} />
		<Route path="/tax/vat" element={<Vat />} />
		<Route path="/tax/freelancer" element={<Freelancer />} />
		<Route path="/tax/company" element={<Company />} />
	</>
);
// ----------------------------------------------
// ----------------------------------------------

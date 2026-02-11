// src/components/ui/resultPanel/GuestCTA.tsx

// -----------------------------------------------------------
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/client";
import { ENDPOINTS } from "../../../api/endpoints";

type Props = {
	prefillEmail?: string;
};

// -------------------------- GUEST CTA COMPONENT --------------------------
export default function GuestCTA({ prefillEmail = "" }: Props) {
	const [email, setEmail] = useState(prefillEmail);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleProceed() {
		if (!email) {
			setError("Please enter your email");
			return;
		}

		setBusy(true);
		setError("");

		try {
			const { data } = await api.get<{ success: boolean; exists: boolean }>(
				ENDPOINTS.checkEmail,
				{ params: { email } },
			);

			if (data.exists) {
				navigate("/signin", { state: { email } });
			} else {
				navigate("/signup", { state: { email } });
			}
		} catch (err: unknown) {
			console.error(err);
			if (err instanceof Error) {
				setError(err.message || "Failed to check email. Try again.");
			} else {
				setError("Failed to check email. Try again.");
			}
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="w-full mt-4 rounded-xl border bg-[#f0f7ff] py-8 px-4">
			<div className="font-semibold text-sm">Save Your Calculations</div>
			<div className="text-xs text-slate-800 mt-1">
				Sign up to save and track your tax history.
			</div>

			<div className="mt-6 flex gap-2">
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="flex-1 rounded border px-2 py-1.5 text-sm"
					placeholder="Email"
					type="email"
				/>
				<button
					onClick={handleProceed}
					disabled={busy}
					aria-busy={busy}
					className="w-28 px-4 rounded bg-brand-800 text-white text-sm font-semibold relative"
				>
					<span
						className={busy ? "opacity-0" : "opacity-100"}
						aria-hidden={busy}
					>
						Continue
					</span>

					{busy && (
						<span
							className="absolute inset-0 grid place-items-center"
							aria-hidden={!busy}
						>
							Checking...
						</span>
					)}
				</button>
			</div>

			{error && <div className="text-xs text-red-600 mt-2">{error}</div>}
		</div>
	);
}

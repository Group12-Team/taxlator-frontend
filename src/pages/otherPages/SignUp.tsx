// src/pages/SignUp.tsx
// ----------------------------------------------
// Sign Up Page
// ----------------------------------------------

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/useAuth";
import axios from "axios";
import MotionButton from "../../components/ui/buttons/MotionButton";
import inputStyles from "../../components/ui/inputs/InputStyles";
import FormButton from "../../components/ui/buttons/FormButton";

// ----------------------------------------------

export default function SignUp() {
	const { signup } = useAuth();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [agree, setAgree] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	// --------------------------- FORM VALIDATION FOR SIGN UP BUTTON ---------------------------
	const hasNames = firstName.trim().length > 0 && lastName.trim().length > 0;

	const hasValidPassword = password.length >= 8 && password === confirmPassword;

	const isFormValid =
		hasNames && email.trim().length > 0 && hasValidPassword && agree && !busy;

	// ----------------------------------------------------------------------
	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!agree) {
			setError("You must agree to the Terms and Privacy Policy");
			return;
		}

		setBusy(true);

		try {
			await signup({ firstName, lastName, email, password });
			navigate("/verify-email", { state: { email } });
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || "Signup failed");
			} else {
				setError("Signup failed");
			}
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="bg-slate-200 min-h-[80vh] w-full flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-md bg-white rounded-2xl border shadow-soft overflow-hidden">
				<div className="p-6 text-center">
					<div className="w-12 h-12 mx-auto rounded bg-brand-700 text-white grid place-items-center font-bold">
						T
					</div>
					<div className="mt-3 text-lg font-semibold">Sign Up</div>
					<div className="text-xs text-slate-500">
						Create your free Taxlator account
					</div>
				</div>

				{/* SIGN-UP FORM */}
				<form className="p-5 overflow-x-hidden" onSubmit={onSubmit}>
					{error && (
						<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
							{error}
						</div>
					)}

					{/* FIRST NAME */}
					<label className="text-xs font-semibold text-slate-700 mb-1 block">
						First Name
					</label>
					<input
						className={inputStyles.inputBase}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="Enter your first name"
						required
					/>

					{/* LAST NAME */}
					<label className="text-xs font-semibold text-slate-700 mt-4 mb-1 block">
						Last Name
					</label>
					<input
						className={inputStyles.inputBase}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Enter your last name"
						required
					/>

					{/* EMAIL */}
					<label className="text-xs font-semibold text-slate-700 mt-4 mb-1 block">
						Email Address
					</label>
					<input
						type="email"
						className={inputStyles.inputBase}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email address"
						required
					/>

					{/* PASSWORD */}
					<label className="text-xs font-semibold text-slate-700 mt-4 mb-1 block">
						Password
					</label>
					<div className="relative mt-1">
						<input
							type={showPassword ? "text" : "password"}
							className={inputStyles.inputBase}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword((p) => !p)}
							className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
						>
							{showPassword ? "🙈" : "👁"}
						</button>
					</div>

					{/* CONFIRM PASSWORD */}
					<label className="text-xs font-semibold text-slate-700 mt-4 mb-1 block">
						Confirm Password
					</label>
					<div className="relative mt-1">
						<input
							type={showConfirmPassword ? "text" : "password"}
							className={inputStyles.inputBase}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="Confirm your password"
							required
						/>
						<button
							type="button"
							onClick={() => setShowConfirmPassword((p) => !p)}
							className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
						>
							{showConfirmPassword ? "🙈" : "👁"}
						</button>
					</div>

					{/* TERMS AND CONDITIONS / PRIVACY POLICY */}
					<div className="mt-2 flex items-start gap-2 text-xs">
						<input
							type="checkbox"
							checked={agree}
							onChange={(e) => setAgree(e.target.checked)}
							className="mt-0.5 h-3.5 w-3.5"
						/>
						<p className="text-slate-500 text-center leading-relaxed">
							By clicking, you agree to our{" "}
							<Link
								to="/Terms_Conditions"
								className="text-brand-400 hover:text-black font-medium"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								to="/Privacy_Policy"
								className="text-brand-400 hover:text-black font-medium"
							>
								Privacy Policy
							</Link>
						</p>
					</div>

					{/* SIGN-UP BUTTON */}
					<MotionButton className="mt-7 w-full">
						<FormButton enabled={isFormValid} loading={busy}>
							{busy ? "Creating..." : "Sign Up"}
						</FormButton>
					</MotionButton>

					<div className="mt-4 text-xs text-slate-600 text-center">
						Already have an account?{" "}
						<Link to="/signin" className="text-brand-800 font-semibold">
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

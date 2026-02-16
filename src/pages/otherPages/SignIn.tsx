// ====================================
// src/pages/otherPages/SignIn.tsx
// ====================================

// ====================================
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../state/useAuth";
import { ENDPOINTS } from "../../api/endpoints";
import MotionButton from "../../components/ui/buttons/MotionButton";
import inputStyles from "../../components/ui/inputs/InputStyles";
import FormButton from "../../components/ui/buttons/FormButton";
import { api } from "../../api/client";
import { AxiosError } from "axios";
import { setToken, extractToken } from "../../api/client";
// ====================================

// ====================================
type SigninResponse = {
	success?: boolean;
	message?: string;
};

// ==================================== SIGN IN COMPONENT  ====================================
export default function SignIn() {
	const { user, refresh } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Redirect if already signed in
	useEffect(() => {
		if (user) navigate("/dashboard", { replace: true });
	}, [user, navigate]);

	// Pre-fill email if passed from previous page
	const initialEmail = (location.state as { email?: string })?.email ?? "";
	const [email, setEmail] = useState(initialEmail);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");

	// Form validity
	const isFormValid =
		email.trim().length > 0 && password.trim().length >= 8 && !busy;

	//  ==================================== Form submission  ====================================
	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setBusy(true);

		try {
			const { data } = await api.post<SigninResponse>(
				ENDPOINTS.signin,
				{ email, password },
				{ withCredentials: true },
			);

			if (!data.success) {
				setError(data.message || "Signin failed");
				return;
			}

			//  ==================================== Extract token and set it for future requests
			const token = extractToken(data);
			if (token) setToken(token);

			//  ==================================== refresh user context and redirect
			await refresh();
			navigate("/dashboard", { replace: true });
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				setError(err.response?.data?.message || "Signin failed");
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Signin failed");
			}
		} finally {
			setBusy(false);
		}
	};

	// ==================================== RENDER ====================================
	return (
		<div className="bg-slate-200 min-h-[80vh] w-full flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-md bg-white rounded-2xl border shadow-soft overflow-hidden">
				<div className="p-6 text-center">
					<div className="w-12 h-12 mx-auto rounded bg-brand-700 text-white grid place-items-center font-bold">
						T
					</div>
					<div className="mt-3 text-lg font-semibold">Welcome back!</div>
					<div className="text-xs text-slate-500">Sign in to your account</div>
				</div>

				<form className="p-5" onSubmit={onSubmit}>
					{/* Error message */}
					{error && (
						<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
							{error}
						</div>
					)}

					{/* Email input */}
					<label className="text-xs font-semibold text-slate-700 mb-1 block">
						Email
					</label>
					<input
						className={inputStyles.inputBase}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
						type="email"
					/>

					{/* Password input with toggle */}
					<label className="text-xs font-semibold text-slate-700 mt-4 mb-1 block">
						Password
					</label>
					<div className="relative mt-1">
						<input
							className={inputStyles.inputBase}
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? "🙈" : "👁"}
						</button>
					</div>

					{/* Remember me + forgot password */}
					<div className="mt-2 flex items-center justify-between text-xs">
						<label className="flex items-center gap-2 cursor-pointer text-slate-600">
							<input
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								className="mt-0.5 h-3.5 w-3.5"
							/>
							<span className="text-slate-500 text-center leading-relaxed">
								Remember me
							</span>
						</label>

						<Link
							to="/forgot-password"
							className="text-slate-500 text-center leading-relaxed hover:text-brand-700 font-medium"
						>
							Forgot password?
						</Link>
					</div>

					{/* Submit button */}
					<MotionButton className="mt-7 w-full">
						<FormButton enabled={isFormValid} loading={busy}>
							{busy ? "Signing in..." : "Sign In"}
						</FormButton>
					</MotionButton>

					{/* Sign up link */}
					<div className="mt-4 text-xs text-slate-600 text-center">
						Don&apos;t have an account?{" "}
						<Link
							className="text-brand-800 font-semibold hover:text-brand-900"
							to="/signup"
						>
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

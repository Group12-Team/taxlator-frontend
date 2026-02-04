// src/pages/SignIn.tsx
// ----------------------------------------------

// Sign In Page
// ----------------------------------------------

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../state/useAuth";
import axios from "axios";
import MotionButton from "../../components/ui/buttons/MotionButton";

//  types
// ----------------------------------------------

type SigninResponse = {
	success?: boolean;
	message?: string;
	token?: string;
};

// ----------------------------------------------
// ----------------------------------------------

export default function SignIn() {
	const { signin } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setBusy(true);

		try {
			// ✅ capture response so we can store token
			const data = (await signin({ email, password })) as SigninResponse;

			// ✅ store JWT based on "Remember me"
			if (data?.token) {
				if (rememberMe) {
					localStorage.setItem("token", data.token);
				} else {
					sessionStorage.setItem("token", data.token);
				}
			}

			navigate("/calculate");
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message ?? "Signin failed");
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("Signin failed");
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
					<div className="mt-3 text-lg font-semibold">Welcome back!</div>
					<div className="text-xs text-slate-500">Sign in to your account</div>
				</div>

				{/* SIGN-IN FORM */}
				<form className="p-5" onSubmit={onSubmit}>
					{error && (
						<div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
							{error}
						</div>
					)}

					{/* EMAIL INPUT */}
					<label className="text-xs font-semibold text-slate-700">Email</label>
					<input
						className="w-full box-border rounded border px-3 py-2 pr-12 text-base
             			placeholder:text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
					/>

					{/* PASSWORD INPUT */}
					<label className="text-xs font-semibold text-slate-700 mt-4 block">
						Password
					</label>

					<div className="relative mt-1">
						<input
							className="w-full box-border rounded border px-3 py-2 pr-12 text-base sm:text-sm placeholder:text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0"
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
							required
						/>

						{/* SHOW PASSWORD */}
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? "🙈" : "👁"}
						</button>
					</div>

					{/* REMEMBER ME / FORGOT PASSWORD */}
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

					{/* SIGN-IN BUTTON */}
					<MotionButton className="mt-6 w-full">
						<button
							disabled={busy}
							className="mt-5 w-full rounded bg-brand-800 text-white py-2.5 text-sm font-semibold hover:bg-brand-900 disabled:opacity-60"
						>
							{busy ? "Signing in..." : "Sign In"}
						</button>
					</MotionButton>

					{/* SIGN-UP NO ACCOUNT */}
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
// ----------------------------------------------
// ----------------------------------------------

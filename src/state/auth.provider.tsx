// ====================================
// src/state/auth.provider.tsx
// ====================================

// ====================================
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { AuthCtx } from "./auth.context";
import type { AuthContextValue } from "./auth.context";
import type { User, SignUpPayload, SignInPayload } from "../api/auth.types";
// ====================================

// ==================================== AUTH PROVIDER COMPONENT ====================================
export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);

	// ==================================== REFRESH USER DATA FUNCTION ====================================
	const refresh = useCallback(async () => {
		setRefreshing(true);
		try {
			const { data } = await api.get(ENDPOINTS.me, {
				withCredentials: true,
			});
			setUser(data.user ?? null);
		} catch {
			setUser(null);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const value = useMemo<AuthContextValue>(() => {
		const authenticated = Boolean(user);

		return {
			user,
			loading: loading || refreshing,
			authenticated,

			async signup(payload: SignUpPayload) {
				const { data } = await api.post(ENDPOINTS.signup, payload, {
					withCredentials: true,
				});
				return data;
			},

			async signin(payload: SignInPayload) {
				const { data } = await api.post(ENDPOINTS.signin, payload, {
					withCredentials: true,
				});
				await refresh();
				return data;
			},

			async verifyEmail(payload: { email: string; code: string }) {
				const { data } = await api.post(ENDPOINTS.verifyEmail, payload, {
					withCredentials: true,
				});
				await refresh();
				return data;
			},

			async sendVerificationCode(payload: { email: string }) {
				const { data } = await api.post(
					ENDPOINTS.sendVerificationCode,
					payload,
					{ withCredentials: true },
				);
				return data;
			},

			// ============================ SIGNOUT / LOGOUT ============================
			async signout() {
				try {
					// Clear backend cookie
					await api.post(ENDPOINTS.signout, {}, { withCredentials: true });
				} catch (err) {
					console.warn("Signout request failed:", err);
				} finally {
					// Clear frontend state & token
					setUser(null);
					localStorage.removeItem("taxlator_token");

					// Force page reload to fully reset state
					window.location.href = "/signin";
				}
			},

			logout() {
				// Local-only logout if needed
				setUser(null);
				localStorage.removeItem("taxlator_token");
				window.location.href = "/signin";
			},

			refresh,
		};
	}, [user, loading, refreshing, refresh]);

	return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

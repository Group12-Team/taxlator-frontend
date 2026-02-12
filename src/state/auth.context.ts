// src/state/auth.context.ts

// ----------------------------------------------
import { createContext } from "react";
import type { SignInPayload, SignUpPayload, User } from "../api/auth.types";
import type { AnyJson } from "../api/api.types";

// ------------------------------ AUTH CONTEXT TYPE --------------------------------
export type AuthContextValue = {
	user: User | null;
	loading: boolean;
	authenticated: boolean;

	signin: (payload: SignInPayload) => Promise<AnyJson>;
	signup: (payload: SignUpPayload) => Promise<AnyJson>;
	verifyEmail: (payload: { email: string; code: string }) => Promise<AnyJson>;
	sendVerificationCode: (payload: { email: string }) => Promise<AnyJson>;
	signout: () => Promise<void>;
	logout: () => void;

	refresh: () => Promise<void>;
};

// ------------------------------ AUTH CONTEXT --------------------------------
export const AuthCtx = createContext<AuthContextValue | null>(null);

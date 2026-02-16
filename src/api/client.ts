// ===============================
// src/api/client.ts
// ===============================


// ===============================
import axios from "axios";
import type { AnyJson } from "../api/api.types";
// ===============================


// =============================== API BASE CONFIGURATION ===============================
export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE) {
	throw new Error("❌ VITE_API_BASE_URL is not defined");
}

// Log once so we know which environment is active
console.log("✅ Using API_BASE =", API_BASE);

// =============================== TOKEN STORAGE ===============================
const TOKEN_KEY = "taxlator_token";

// =============================== TOKEN HELPERS ===============================

export function getToken(): string | null {
	return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
}

export function extractToken(data: AnyJson): string | null {
	const token = (data as { token?: string })?.token;
	return typeof token === "string" && token.length > 10 ? token : null;
}

// =============================== AXIOS INSTANCE ===============================
export const api = axios.create({
	baseURL: API_BASE, 
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

// =============================== AUTH INTERCEPTOR ===============================
api.interceptors.request.use((config) => {
	const token = getToken();

	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	// =============================== DEBUG LOGGING ===============================
	if (config.url) {
		console.log(
			"API request:",
			config.method?.toUpperCase(),
			`${API_BASE}${config.url}`,
			"payload:",
			config.data || config.params || {},
		);
	}

	return config;
});

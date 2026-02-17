// ===============================
// src/api/client.ts
// ===============================

import axios from "axios";
import type { AnyJson } from "../api/api.types";

// =============================== API BASE CONFIGURATION ===============================
export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE) {
	throw new Error("❌ VITE_API_BASE_URL is not defined");
}

console.log("✅ Using API_BASE =", API_BASE);

// =============================== AXIOS INSTANCE ===============================
export const api = axios.create({
	baseURL: API_BASE,
	headers: { "Content-Type": "application/json" },
	withCredentials: true, // ✅ send HttpOnly cookies automatically
});

// =============================== REQUEST LOGGING ===============================
api.interceptors.request.use((config) => {
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

// =============================== OPTIONAL TOKEN EXTRACTION ===============================
// Only needed if backend ever returns a token in JSON for non-cookie scenarios
export function extractToken(data: AnyJson): string | null {
	const token = (data as { token?: string })?.token;
	return typeof token === "string" && token.length > 10 ? token : null;
}

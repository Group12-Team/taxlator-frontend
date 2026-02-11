// taxlator/src/api/client.ts

// -------------------------------
import axios from "axios";
import type { AnyJson } from "../api/api.types";

// -------------------------------- AXIOS CLIENT SETUP --------------------------------
// Use environment variable from .env files, fallback to production URL
// export const API_BASE =
// 	import.meta.env.VITE_API_BASE_URL ||
// 	"https://group12-taxlator-api.onrender.com";

export const API_BASE = "https://group12-taxlator-api.onrender.com";

// Log the API base to verify environment
console.log("Using API_BASE =", API_BASE);

const TOKEN_KEY = "taxlator_token";

// ------------------- TOKEN HELPERS -------------------
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

// ------------------- AXIOS INSTANCE -------------------
export const api = axios.create({
	baseURL: API_BASE,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
});

// ✅ Automatically attach token to every request
api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers = config.headers ?? {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	// Optional: log full request URL + payload for debugging
	if (config.url) {
		console.log(
			"API request:",
			config.method?.toUpperCase(),
			API_BASE + config.url,
			"payload:",
			config.data || config.params || {},
		);
	}

	return config;
});

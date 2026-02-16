// ===============================
// src/vite.config.ts
// ===============================

// ===============================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// ===============================

// =============================== VITE CONFIGURATION ===============================
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id: string) {
					if (id.includes("node_modules")) {
						return "vendor";
					}

					if (id.includes("src/routes")) {
						return "routes";
					}
				},
			},
		},
	},
});

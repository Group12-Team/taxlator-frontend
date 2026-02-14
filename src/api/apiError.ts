// src/api/apiError.ts
// -----------------------------------------------------------

// ==================== API ERROR INTERFACE ====================

export interface ApiError {
	response?: {
		data?: {
			message?: string;
			error?: string;
		};
	};
	message?: string;
}

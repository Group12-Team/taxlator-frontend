// ====================================
// src/types/baseTax.ts
// ====================================

// ==================== BASE TAX RESPONSE ====================
export interface BaseTaxResponse {
	taxType: string;
	country: { name: string; code: string };
}

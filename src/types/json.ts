// ====================================
// src/types/json.ts
// ====================================

// ====================================
// Generic JSON type (safe replacement for `any`)
// ====================================

export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonObject
	| JsonValue[];

export interface JsonObject {
	[key: string]: JsonValue;
}


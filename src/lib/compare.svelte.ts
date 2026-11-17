// Compare up to 3 homes side by side — shared reactive state, persisted
// to localStorage. Browser-only: guarded for prerender.
import { properties } from '#lib/data/site';

const KEY = 'havenly-compare';
export const MAX_COMPARE = 3;

export const compared = $state<string[]>([]);

let loaded = false;

export function initCompare(): void {
	if (loaded || typeof window === 'undefined') return;
	loaded = true;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (raw) {
			const parsed: unknown = JSON.parse(raw);
			if (Array.isArray(parsed)) {
				for (const slug of parsed) {
					if (typeof slug === 'string' && properties.some((p) => p.slug === slug)) {
						compared.push(slug);
					}
				}
			}
		}
	} catch {
		// Corrupt storage — start empty, never crash the page.
	}
}

function persist(): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(compared));
	} catch {
		// Storage full or blocked — the in-memory list still works.
	}
}

export function isCompared(slug: string): boolean {
	return compared.includes(slug);
}

/** Returns false when the tray is already full (max 3). */
export function toggleCompare(slug: string): boolean {
	const i = compared.indexOf(slug);
	if (i >= 0) {
		compared.splice(i, 1);
		persist();
		return true;
	}
	if (compared.length >= MAX_COMPARE) return false;
	compared.push(slug);
	persist();
	return true;
}

export function removeCompare(slug: string): void {
	const i = compared.indexOf(slug);
	if (i >= 0) {
		compared.splice(i, 1);
		persist();
	}
}

// Saved homes — shared reactive state, persisted to localStorage.
// Lives in a .svelte.ts module so every component sees the same state.
// Browser-only: guarded for prerender (no window on the server).
const KEY = 'havenly-saved';

export const saved = $state<string[]>([]);

let loaded = false;

export function initSaved(): void {
	if (loaded || typeof window === 'undefined') return;
	loaded = true;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (raw) {
			const parsed: unknown = JSON.parse(raw);
			if (Array.isArray(parsed)) {
				for (const slug of parsed) if (typeof slug === 'string') saved.push(slug);
			}
		}
	} catch {
		// Corrupt storage — start empty, never crash the page.
	}
}

function persist(): void {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(saved));
	} catch {
		// Storage full or blocked — the in-memory list still works.
	}
}

export function isSaved(slug: string): boolean {
	return saved.includes(slug);
}

export function toggleSaved(slug: string): void {
	const i = saved.indexOf(slug);
	if (i >= 0) saved.splice(i, 1);
	else saved.push(slug);
	persist();
}

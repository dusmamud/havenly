<script lang="ts">
	import { goto } from '$app/navigation';
	import { locations, propertyTypes } from '#lib/data/site';

	interface Props {
		location?: string;
		type?: string;
		price?: string;
		onchange?: (filters: { location: string; type: string; price: string }) => void;
		navigateOnSearch?: boolean;
	}

	const { location = 'any', type = 'any', price = 'any', onchange, navigateOnSearch = false }: Props = $props();

	let loc = $state(location);
	let typ = $state(type);
	let prc = $state(price);

	// Keep in sync when the parent resets filters (e.g. from URL params).
	$effect(() => {
		loc = location;
		typ = type;
		prc = price;
	});

	function emit() {
		onchange?.({ location: loc, type: typ, price: prc });
	}

	function search(event: SubmitEvent) {
		event.preventDefault();
		emit();
		if (navigateOnSearch) {
			const q = new URLSearchParams();
			if (loc !== 'any') q.set('location', loc);
			if (typ !== 'any') q.set('type', typ);
			if (prc !== 'any') q.set('price', prc);
			const qs = q.toString();
			goto('/properties' + (qs ? `?${qs}` : ''));
		}
	}

	const priceOptions = [
		{ value: 'any', label: 'Any price' },
		{ value: 'under300', label: 'Under $300,000' },
		{ value: '300-500', label: '$300,000 – $500,000' },
		{ value: 'over500', label: 'Over $500,000' }
	];
</script>

<form
	onsubmit={search}
	class="grid gap-3 rounded-3xl bg-white p-3 shadow-[0_12px_40px_rgba(15,42,31,0.14)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-center lg:rounded-full lg:py-2 lg:pr-2 lg:pl-6"
	role="search"
	aria-label="Search properties"
>
	<label class="flex items-center gap-3 rounded-2xl px-3 py-2 lg:rounded-none lg:px-0">
		<span class="text-pine" aria-hidden="true">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
		</span>
		<span class="flex min-w-0 flex-col">
			<span class="text-xs font-semibold text-pine">Location</span>
			<select
				bind:value={loc}
				onchange={emit}
				aria-label="Location"
				class="w-full min-w-0 cursor-pointer bg-transparent text-sm text-muted focus:outline-none"
			>
				<option value="any">Any location</option>
				{#each locations as l (l)}<option value={l}>{l}</option>{/each}
			</select>
		</span>
	</label>

	<label class="flex items-center gap-3 rounded-2xl px-3 py-2 lg:rounded-none lg:border-l lg:border-[#efe7d8] lg:px-5 lg:py-1">
		<span class="text-pine" aria-hidden="true">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
		</span>
		<span class="flex min-w-0 flex-col">
			<span class="text-xs font-semibold text-pine">Property Type</span>
			<select
				bind:value={typ}
				onchange={emit}
				aria-label="Property type"
				class="w-full min-w-0 cursor-pointer bg-transparent text-sm text-muted focus:outline-none"
			>
				<option value="any">Any type</option>
				{#each propertyTypes as t (t)}<option value={t}>{t}</option>{/each}
			</select>
		</span>
	</label>

	<label class="flex items-center gap-3 rounded-2xl px-3 py-2 lg:rounded-none lg:border-l lg:border-[#efe7d8] lg:px-5 lg:py-1">
		<span class="text-pine" aria-hidden="true">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 11 3H4v7l9.6 10.4a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8z" /><circle cx="7.5" cy="7.5" r="1" fill="currentColor" /></svg>
		</span>
		<span class="flex min-w-0 flex-col">
			<span class="text-xs font-semibold text-pine">Price Range</span>
			<select
				bind:value={prc}
				onchange={emit}
				aria-label="Price range"
				class="w-full min-w-0 cursor-pointer bg-transparent text-sm text-muted focus:outline-none"
			>
				{#each priceOptions as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
			</select>
		</span>
	</label>

	<button
		type="submit"
		class="flex items-center justify-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft sm:col-span-2 lg:col-span-1"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
		Search
	</button>
</form>

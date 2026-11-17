<script lang="ts">
	import { page } from '$app/state';
	import SearchBar from '#lib/components/SearchBar.svelte';
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { properties } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let location = $state('any');
	let type = $state('any');
	let price = $state('any');
	let initialised = $state(false);

	// Read the query string once, in the browser only — never during prerender.
	$effect(() => {
		if (initialised) return;
		initialised = true;
		const q = page.url.searchParams;
		const l = q.get('location');
		const t = q.get('type');
		const p = q.get('price');
		if (l) location = l;
		if (t) type = t;
		if (p) price = p;
	});

	function matchesPrice(p: number, pr: string): boolean {
		if (pr === 'under300') return p < 300000;
		if (pr === '300-500') return p >= 300000 && p <= 500000;
		if (pr === 'over500') return p > 500000;
		return true;
	}

	const filtered = $derived(
		properties.filter(
			(p) =>
				(location === 'any' || p.city === location) &&
				(type === 'any' || p.type === type) &&
				matchesPrice(p.price, price)
		)
	);
	const hasFilter = $derived(location !== 'any' || type !== 'any' || price !== 'any');

	const itemListJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Properties for sale — Havenly',
		itemListElement: properties.map((p, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `https://havenlly.pages.dev/properties/${p.slug}`,
			name: p.title
		}))
	});
</script>

<svelte:head>
	<title>Properties for Sale | Havenly</title>
	<meta
		name="description"
		content="Browse villas, apartments and family homes for sale in Casablanca, Rabat, Marrakech and Agadir. Filter by location, type and price."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${itemListJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Our Properties</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Find a Home You’ll Love
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Every Havenly listing is visited, checked and photographed by our own team — no
			outdated photos, no hidden surprises. Filter below to narrow the search.
		</p>
	</div>

	<div class="mt-8">
		<SearchBar
			{location}
			{type}
			{price}
			onchange={(f) => {
				location = f.location;
				type = f.type;
				price = f.price;
			}}
		/>
	</div>

	<div class="mt-8 flex flex-wrap items-center justify-between gap-3">
		<p class="text-sm text-muted" role="status">
			Showing <strong class="font-semibold text-pine">{filtered.length}</strong> of {properties.length} properties
		</p>
		{#if hasFilter}
			<button
				type="button"
				onclick={() => {
					location = 'any';
					type = 'any';
					price = 'any';
				}}
				class="rounded-full border border-[#e9e1d0] bg-white px-4 py-2 text-sm font-medium text-pine transition-colors hover:bg-cream-deep"
			>
				Clear filters ✕
			</button>
		{/if}
	</div>

	{#if filtered.length > 0}
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as p (p.slug)}
				<PropertyCard property={p} />
			{/each}
		</div>
	{:else}
		<div class="mt-6 rounded-3xl bg-white p-10 text-center">
			<p class="font-display text-2xl font-semibold text-pine">No homes match those filters yet</p>
			<p class="mx-auto mt-3 max-w-md text-muted">
				Try a wider price range, a different city, or clear the filters to see every home we
				have for sale.
			</p>
			<button
				type="button"
				onclick={() => {
					location = 'any';
					type = 'any';
					price = 'any';
				}}
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Clear all filters
			</button>
		</div>
	{/if}
</section>

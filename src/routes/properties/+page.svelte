<script lang="ts">
	import { page } from '$app/state';
	import SearchBar from '#lib/components/SearchBar.svelte';
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { properties } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let location = $state('any');
	let type = $state('any');
	let price = $state('any');
	let beds = $state('any');
	let sort = $state('newest');
	let view = $state<'grid' | 'list'>('grid');
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
				(beds === 'any' || p.beds >= Number(beds)) &&
				matchesPrice(p.price, price)
		)
	);
	const sorted = $derived.by(() => {
		const list = [...filtered];
		if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
		else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
		else if (sort === 'area') list.sort((a, b) => b.area - a.area);
		// 'newest' keeps the curated order.
		return list;
	});
	const hasFilter = $derived(location !== 'any' || type !== 'any' || price !== 'any' || beds !== 'any');

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
			Showing <strong class="font-semibold text-pine">{sorted.length}</strong> of {properties.length} properties
		</p>
		<div class="flex flex-wrap items-center gap-2">
			<label for="beds-filter" class="text-sm font-medium text-pine">Beds</label>
			<select
				id="beds-filter"
				bind:value={beds}
				class="rounded-full border border-[#e9e1d0] bg-white px-3 py-2 text-sm text-pine focus:border-pine focus:outline-none"
			>
				<option value="any">Any</option>
				<option value="2">2+</option>
				<option value="3">3+</option>
				<option value="4">4+</option>
				<option value="5">5+</option>
			</select>
			<label for="sort" class="text-sm font-medium text-pine">Sort</label>
			<select
				id="sort"
				bind:value={sort}
				class="rounded-full border border-[#e9e1d0] bg-white px-3 py-2 text-sm text-pine focus:border-pine focus:outline-none"
			>
				<option value="newest">Newest</option>
				<option value="price-asc">Price: low to high</option>
				<option value="price-desc">Price: high to low</option>
				<option value="area">Largest area</option>
			</select>
			<div class="flex overflow-hidden rounded-full border border-[#e9e1d0] bg-white" role="group" aria-label="Layout">
				<button
					type="button"
					onclick={() => (view = 'grid')}
					aria-pressed={view === 'grid'}
					class="px-4 py-2 text-sm font-semibold transition-colors {view === 'grid'
						? 'bg-pine text-white'
						: 'text-pine hover:bg-cream-deep'}"
				>
					Grid
				</button>
				<button
					type="button"
					onclick={() => (view = 'list')}
					aria-pressed={view === 'list'}
					class="px-4 py-2 text-sm font-semibold transition-colors {view === 'list'
						? 'bg-pine text-white'
						: 'text-pine hover:bg-cream-deep'}"
				>
					List
				</button>
			</div>
		</div>
		{#if hasFilter}
			<button
				type="button"
				onclick={() => {
					location = 'any';
					type = 'any';
					price = 'any';
					beds = 'any';
				}}
				class="rounded-full border border-[#e9e1d0] bg-white px-4 py-2 text-sm font-medium text-pine transition-colors hover:bg-cream-deep"
			>
				Clear filters ✕
			</button>
		{/if}
	</div>

	{#if sorted.length > 0}
		<div class={view === 'grid' ? 'mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'mt-6 grid gap-5'}>
			{#each sorted as p (p.slug)}
				<PropertyCard property={p} variant={view} />
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
					beds = 'any';
				}}
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Clear all filters
			</button>
		</div>
	{/if}
</section>

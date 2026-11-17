<script lang="ts">
	import { cities, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	const itemListJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Areas we cover — Havenly',
		itemListElement: cities.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			url: `https://havenlly.pages.dev/areas/${c.slug}`,
			name: c.name
		}))
	});
</script>

<svelte:head>
	<title>Areas We Cover | Havenly</title>
	<meta
		name="description"
		content="Homes for sale in Casablanca, Rabat, Marrakech, Agadir and Tangier — local guides, average prices and listings in every city Havenly covers."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${itemListJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Neighbourhood Guides</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Areas We Cover
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			We live in the neighbourhoods we sell. Here is an honest look at each city — what it
			feels like, what homes cost, and what is on the market right now.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
		{#each cities as city, i (city.slug)}
			<a
				href="/areas/{city.slug}"
				class="reveal group relative block overflow-hidden rounded-3xl {i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}"
				use:reveal
				data-reveal-delay={(i % 3) * 100}
				aria-label="Guide to homes in {city.name}"
			>
				<img
					src={city.image}
					alt="{city.name}, Morocco"
					width="1600"
					height="1067"
					loading="lazy"
					class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
				/>
				<div
					class="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,31,0)_45%,rgba(15,42,31,0.82)_100%)]"
					aria-hidden="true"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-5">
					<h2 class="font-display text-2xl font-semibold text-white">{city.name}</h2>
					<p class="mt-1 text-sm text-white/85">{city.tagline}</p>
					<p class="mt-2 text-sm font-semibold text-white">
						{city.homes > 0
							? `${city.homes} ${city.homes === 1 ? 'home' : 'homes'} · from ${formatPrice(city.avgPrice)}`
							: 'New listings coming soon'}
						<span class="ml-1 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
					</p>
				</div>
			</a>
		{/each}
	</div>
</section>

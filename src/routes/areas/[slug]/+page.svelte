<script lang="ts">
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { site, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
	import Picture from '#lib/components/Picture.svelte';

	const { data } = $props();
	const city = $derived(data.city);
	const listings = $derived(data.listings);
	// City + ItemList schema for the listings on this page (JSON-LD only).
	const areaJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'City',
			name: city.name,
			description: city.description,
			image: `https://havenlly.pages.dev${city.image}`,
			url: `https://havenlly.pages.dev/areas/${city.slug}`
		})
	);
	const areaListJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: `Homes in ${city.name} — Havenly`,
			itemListElement: listings.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: p.title,
				url: `https://havenlly.pages.dev/properties/${p.slug}`
			}))
		})
	);
	const avg = $derived(
		listings.length > 0
			? Math.round(listings.reduce((s, p) => s + p.price, 0) / listings.length)
			: city.avgPrice
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${areaJsonLd}</script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${areaListJsonLd}</script>`}
	<title>Homes in {city.name} | Havenly</title>
	<meta name="description" content={city.description} />
	<meta property="og:title" content="Homes in {city.name} | Havenly" />
	<meta property="og:description" content={city.description} />
	<meta property="og:image" content="https://havenlly.pages.dev{city.image}" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-pine">Home</a>
		<span aria-hidden="true"> / </span>
		<a href="/areas" class="hover:text-pine">Areas</a>
		<span aria-hidden="true"> / </span>
		<span class="text-pine" aria-current="page">{city.name}</span>
	</nav>

	<div class="relative mt-6 overflow-hidden rounded-[2rem]">
		<Picture
			src={city.image}
			alt="{city.name}, Morocco"
			width={1600}
			height={1067}
			fetchpriority="high"
			loading="eager"
			sizes="(max-width: 1280px) 100vw, 1280px"
			widths={[400, 800, 1200]}
			class="aspect-[21/9] w-full object-cover"
		/>
		<div
			class="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,42,31,0.78)_0%,rgba(15,42,31,0.35)_55%,rgba(15,42,31,0)_100%)]"
			aria-hidden="true"
		></div>
		<div class="absolute inset-x-0 bottom-0 p-6 sm:p-10">
			<h1 class="font-display text-4xl font-semibold text-white sm:text-6xl">{city.name}</h1>
			<p class="mt-2 max-w-lg text-base text-white/90">{city.tagline}</p>
		</div>
	</div>

	<div class="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
		<div class="reveal" use:reveal>
			<h2 class="font-display text-3xl font-semibold text-pine">About {city.name}</h2>
			<p class="mt-4 text-base leading-relaxed text-muted">{city.description}</p>

			<h2 class="mt-10 font-display text-2xl font-semibold text-pine">Good to know</h2>
			<ul class="mt-4 grid gap-3 sm:grid-cols-2">
				{#each city.highlights as h (h)}
					<li class="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm text-ink/85">
						<span
							class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine text-[11px] text-white"
							aria-hidden="true"
						>
							✓
						</span>
						{h}
					</li>
				{/each}
			</ul>
		</div>

		<aside class="reveal space-y-5" use:reveal>
			<div class="rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
				<h2 class="font-display text-xl font-semibold text-pine">{city.name} at a glance</h2>
				<dl class="mt-4 space-y-3 text-sm">
					<div class="flex items-center justify-between border-b border-[#efe7d8] pb-3">
						<dt class="text-muted">Homes for sale</dt>
						<dd class="font-semibold text-pine">{listings.length}</dd>
					</div>
					<div class="flex items-center justify-between border-b border-[#efe7d8] pb-3">
						<dt class="text-muted">Average price</dt>
						<dd class="font-semibold text-pine">{formatPrice(avg)}</dd>
					</div>
					<div class="flex items-center justify-between">
						<dt class="text-muted">Property types</dt>
						<dd class="font-semibold text-pine">
							{[...new Set(listings.map((p) => p.type))].join(', ') || '—'}
						</dd>
					</div>
				</dl>
			</div>
			<div class="rounded-3xl bg-pine p-6 text-white">
				<h2 class="font-display text-xl font-semibold">Thinking of {city.name}?</h2>
				<p class="mt-2 text-sm leading-relaxed text-white/75">
					Tell {site.agent.name} what you are looking for — she will send a shortlist within
					one working day.
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
				>
					Ask about {city.name} →
				</a>
			</div>
		</aside>
	</div>

	<section class="mt-16">
		<h2 class="font-display text-3xl font-semibold text-pine">Homes for sale in {city.name}</h2>
		{#if listings.length > 0}
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each listings as p (p.slug)}
					<PropertyCard property={p} />
				{/each}
			</div>
		{:else}
			<div class="mt-6 rounded-3xl bg-white p-10 text-center">
				<p class="font-display text-2xl font-semibold text-pine">No homes listed here yet</p>
				<p class="mx-auto mt-3 max-w-md text-muted">
					Our {city.name} listings are coming soon. Leave your details and we will tell you
					the moment a home matches.
				</p>
				<a
					href="/contact"
					class="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Get notified →
				</a>
			</div>
		{/if}
		<p class="mt-8 text-center">
			<a
				href="/areas"
				class="text-sm font-semibold text-pine underline decoration-2 underline-offset-4"
			>
				← Back to all areas
			</a>
		</p>
	</section>
</section>

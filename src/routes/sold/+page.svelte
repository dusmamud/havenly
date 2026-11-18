<script lang="ts">
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { properties, soldHomes, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
	import Picture from '#lib/components/Picture.svelte';

	const sold = $derived(
		soldHomes
			.map((s) => ({ ...s, property: properties.find((p) => p.slug === s.slug) }))
			.filter((s) => s.property !== undefined)
	);
</script>

<svelte:head>
	<title>Recently Sold | Havenly</title>
	<meta
		name="description"
		content="Homes Havenly recently sold — final prices and days on market. Proof that honest pricing and good photography move homes."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Recently sold by Havenly","itemListElement":[{"@type":"ListItem","position":1,"url":"https://havenlly.pages.dev/properties/modern-villa-casablanca","name":"Modern Villa in Casablanca \u2014 sold $435,000"},{"@type":"ListItem","position":2,"url":"https://havenlly.pages.dev/properties/luxury-apartment","name":"Luxury Apartment \u2014 sold $272,000"},{"@type":"ListItem","position":3,"url":"https://havenlly.pages.dev/properties/garden-townhouse-marrakech","name":"Garden Townhouse in Marrakech \u2014 sold $388,000"}]}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Results</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Recently sold
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Homes we have recently helped buy and sell — with the final price and how long each one
			took. We publish results because honest pricing is the fastest way to a sale.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each sold as s, i (s.slug)}
			<article
				class="reveal group relative overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.07)]"
				use:reveal
				data-reveal-delay={i * 120}
			>
				<a href="/properties/{s.slug}" class="block" aria-label="{s.property!.title} — sold for {formatPrice(s.soldPrice)}">
					<div class="relative overflow-hidden">
						<Picture
							src={s.property!.image}
							alt="{s.property!.title} in {s.property!.location}"
							width={1920}
							height={1280}
							sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
							widths={[400, 800, 1200, 1600]}
							class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
						/>
						<span class="absolute top-4 right-4 rounded-full bg-pine px-3 py-1 text-xs font-semibold text-white shadow-sm">
							Sold · {s.soldDate}
						</span>
					</div>
					<div class="p-5">
						<h2 class="font-display text-xl leading-snug font-semibold text-pine">{s.property!.title}</h2>
						<p class="mt-1 text-sm text-muted">{s.property!.location}</p>
						<div class="mt-4 flex items-center justify-between gap-3 border-t border-[#efe7d8] pt-4">
							<div>
								<p class="text-xs tracking-wide text-muted uppercase">Sold for</p>
								<p class="font-display text-2xl font-semibold text-pine">{formatPrice(s.soldPrice)}</p>
							</div>
							<p class="text-right text-sm text-muted">
								{s.daysOnMarket} days<br />on the market
							</p>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</div>

	<div class="reveal mt-12 rounded-[2rem] bg-pine px-6 py-12 text-center sm:px-12" use:reveal>
		<h2 class="font-display text-3xl font-semibold text-white sm:text-4xl">Thinking of selling?</h2>
		<p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/75">
			Get a free valuation based on recent sales on your street — photography, staging advice
			and viewings included, with the commission agreed in writing before we start.
		</p>
		<a
			href="/valuation"
			class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
		>
			Value my home →
		</a>
	</div>
</section>

<script lang="ts">
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { properties } from '#lib/data/site';
	import { saved } from '#lib/saved.svelte';
	import { reveal } from '#lib/reveal';

	const savedProperties = $derived(
		saved.map((slug) => properties.find((p) => p.slug === slug)).filter((p) => p !== undefined)
	);
</script>

<svelte:head>
	<title>Saved Homes | Havenly</title>
	<meta
		name="description"
		content="Your saved homes on Havenly — the villas, apartments and family homes you liked, kept in one place."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Saved Homes","url":"https://havenlly.pages.dev/saved","description":"Homes saved by the visitor on Havenly."}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Your Shortlist</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">Saved Homes</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Homes you tapped the heart on are kept here, on this device, until you remove them.
			Ready for a closer look? Book a tour from any listing.
		</p>
	</div>

	{#if savedProperties.length > 0}
		<p class="mt-8 text-sm text-muted" role="status">
			<strong class="font-semibold text-pine">{savedProperties.length}</strong>
			{savedProperties.length === 1 ? 'home' : 'homes'} saved
		</p>
		<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each savedProperties as p (p.slug)}
				<PropertyCard property={p} />
			{/each}
		</div>
	{:else}
		<div class="mt-8 rounded-3xl bg-white p-10 text-center">
			<p class="font-display text-2xl font-semibold text-pine">Nothing saved yet</p>
			<p class="mx-auto mt-3 max-w-md text-muted">
				Tap the heart on any home to keep it here. Your shortlist stays on this device —
				no account needed.
			</p>
			<a
				href="/properties"
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Browse properties →
			</a>
		</div>
	{/if}
</section>

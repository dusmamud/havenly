<script lang="ts">
	import { properties, formatPrice } from '#lib/data/site';
	import { compared, removeCompare, MAX_COMPARE } from '#lib/compare.svelte';
	import { reveal } from '#lib/reveal';
	import Picture from '#lib/components/Picture.svelte';

	const chosen = $derived(
		compared.map((slug) => properties.find((p) => p.slug === slug)).filter((p) => p !== undefined)
	);

	const rows: { label: string; value: (p: (typeof properties)[number]) => string }[] = [
		{ label: 'Price', value: (p) => formatPrice(p.price) },
		{ label: 'Price per m²', value: (p) => formatPrice(Math.round(p.price / p.area)) },
		{ label: 'Type', value: (p) => p.type },
		{ label: 'City', value: (p) => p.city },
		{ label: 'Location', value: (p) => p.location },
		{ label: 'Bedrooms', value: (p) => String(p.beds) },
		{ label: 'Bathrooms', value: (p) => String(p.baths) },
		{ label: 'Living area', value: (p) => `${p.area} m²` },
		{ label: 'Status', value: (p) => p.status }
	];
</script>

<svelte:head>
	<title>Compare Homes | Havenly</title>
	<meta
		name="description"
		content="Compare up to three homes side by side — price, price per m², bedrooms, bathrooms and area — and see which one wins."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Compare Homes","url":"https://havenlly.pages.dev/compare","description":"Compare up to three homes side by side."}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Tools · Compare</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Compare homes, side by side
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Add up to {MAX_COMPARE} homes from any listing — tap the compare button on a property
			card — and see the numbers next to each other. Your comparison stays on this device.
		</p>
	</div>

	{#if chosen.length === 0}
		<div class="mt-10 rounded-3xl bg-white p-10 text-center">
			<p class="font-display text-2xl font-semibold text-pine">Nothing to compare yet</p>
			<p class="mx-auto mt-3 max-w-md text-muted">
				Browse the listings and tap the compare button on any home (next to the heart). Come
				back here to see them side by side.
			</p>
			<a
				href="/properties"
				class="mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Browse properties →
			</a>
		</div>
	{:else}
		<p class="mt-8 text-sm text-muted" role="status">
			<strong class="font-semibold text-pine">{chosen.length}</strong> of {MAX_COMPARE} homes in
			comparison
		</p>
		<div class="mt-6 overflow-x-auto rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
			<table class="w-full min-w-[560px] border-collapse text-left">
				<thead>
					<tr class="align-top">
						<th scope="col" class="w-36 p-5 text-sm font-semibold text-muted">Home</th>
						{#each chosen as p (p.slug)}
							<th scope="col" class="min-w-48 p-5">
								<Picture
									src={p.image}
									alt={p.title}
									width={1920}
									height={1280}
									sizes="192px"
									widths={[400]}
									class="aspect-[16/10] w-full rounded-2xl object-cover"
								/>
								<a href="/properties/{p.slug}" class="mt-3 block font-display text-lg leading-snug font-semibold text-pine hover:underline">
									{p.title}
								</a>
								<button
									type="button"
									onclick={() => removeCompare(p.slug)}
									class="mt-1 text-xs font-medium text-muted underline underline-offset-2 hover:text-pine"
								>
									Remove from comparison
								</button>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row, i (row.label)}
						<tr class={i % 2 === 0 ? 'bg-cream/60' : ''}>
							<th scope="row" class="p-5 text-sm font-semibold text-muted">{row.label}</th>
							{#each chosen as p (p.slug)}
								<td class="p-5 text-[15px] font-medium text-pine">{row.value(p)}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="mt-6 flex flex-wrap gap-3">
			{#each chosen as p (p.slug)}
				<a
					href="/properties/{p.slug}"
					class="rounded-full border border-[#e9e1d0] bg-white px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
				>
					Book a tour — {p.title}
				</a>
			{/each}
		</div>
	{/if}
</section>

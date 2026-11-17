<script lang="ts">
	import type { Property } from '#lib/data/site';
	import { formatPrice } from '#lib/data/site';
	import { isSaved, toggleSaved } from '#lib/saved.svelte';
	import { isCompared, toggleCompare, MAX_COMPARE } from '#lib/compare.svelte';

	interface Props {
		property: Property;
		variant?: 'grid' | 'list';
	}
	const { property, variant = 'grid' }: Props = $props();
	const isList = $derived(variant === 'list');
	const savedState = $derived(isSaved(property.slug));
	const comparedState = $derived(isCompared(property.slug));
	let compareFull = $state(false);

	function onCompare() {
		compareFull = false;
		if (!toggleCompare(property.slug) && !comparedState) compareFull = true;
	}
</script>

<article
	class="group relative w-full overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.07)] transition-shadow duration-300 hover:shadow-[0_20px_44px_rgba(15,42,31,0.16)] {isList
		? 'sm:flex'
		: ''}"
>
	<!-- Save heart + compare — sit above the photo, outside the card link. -->
	<div class="absolute top-4 left-4 z-10 flex gap-2">
		<button
			type="button"
			onclick={() => toggleSaved(property.slug)}
			aria-pressed={savedState}
			aria-label={savedState ? `Remove ${property.title} from saved homes` : `Save ${property.title}`}
			class="flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors {savedState
				? 'bg-pine text-white'
				: 'bg-white/95 text-pine hover:bg-white'}"
		>
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill={savedState ? 'currentColor' : 'none'}
				stroke="currentColor"
				stroke-width="1.8"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 4-4 7.2-9 11.2z" />
			</svg>
		</button>
		<button
			type="button"
			onclick={onCompare}
			aria-pressed={comparedState}
			aria-label={comparedState
				? `Remove ${property.title} from comparison`
				: `Add ${property.title} to comparison`}
			title={comparedState ? 'Remove from comparison' : 'Add to comparison (max 3)'}
			class="flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition-colors {comparedState
				? 'bg-pine text-white'
				: 'bg-white/95 text-pine hover:bg-white'}"
		>
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M7 4v13" /><path d="M7 20h.01" /><path d="M17 4v7" /><path d="M17 14h.01" /><path d="M4 8h6" /><path d="M14 14h6" />
			</svg>
		</button>
	</div>
	{#if compareFull}
		<p class="absolute top-[4.25rem] left-4 z-10 rounded-full bg-pine px-3 py-1.5 text-xs font-semibold text-white shadow" role="status">
			Compare holds {MAX_COMPARE} homes — remove one first. <a href="/compare" class="underline">View comparison</a>
		</p>
	{/if}

	<a href="/properties/{property.slug}" class="block {isList ? 'sm:flex sm:flex-1' : ''}" aria-label="{property.title} — {formatPrice(property.price)}">
		<div class="relative overflow-hidden {isList ? 'sm:w-72 shrink-0 lg:w-80' : ''}">
			<img
				src={property.image}
				alt="{property.title} in {property.location}"
				width="1920"
				height="1280"
				loading="lazy"
				class="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] {isList
					? 'aspect-[16/10] sm:aspect-auto sm:h-full'
					: 'aspect-[16/10]'}"
			/>
			<span class="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-pine shadow-sm">
				{property.status}
			</span>
		</div>
		<div class="p-5 {isList ? 'sm:flex sm:flex-1 sm:flex-col sm:justify-center' : ''}">
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0">
					<h3 class="font-display text-xl leading-snug font-semibold text-pine">{property.title}</h3>
					<p class="mt-1 truncate text-sm text-muted">{property.location}</p>
				</div>
			</div>
			{#if isList}
				<p class="mt-2 hidden text-sm leading-relaxed text-muted [display:-webkit-box] sm:[-webkit-line-clamp:2] sm:[-webkit-box-orient:vertical] sm:overflow-hidden">
					{property.description}
				</p>
			{/if}
			<div class="mt-4 flex items-center justify-between gap-2 border-t border-[#efe7d8] pt-4">
				<p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
					<span class="inline-flex items-center gap-1">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
						{property.beds} Beds
					</span>
					<span class="inline-flex items-center gap-1">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6z" /><path d="M6 12V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6" /></svg>
						{property.baths} Baths
					</span>
					<span class="inline-flex items-center gap-1">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M4 12h16M12 4v16" /></svg>
						{property.area} m²
					</span>
				</p>
				<span class="flex items-center gap-2">
					<span class="font-display text-xl font-semibold whitespace-nowrap text-pine">{formatPrice(property.price)}</span>
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine text-sm text-white transition-all duration-300 group-hover:bg-pine-soft"
						aria-hidden="true"
					>
						<span class="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
					</span>
				</span>
			</div>
		</div>
	</a>
</article>

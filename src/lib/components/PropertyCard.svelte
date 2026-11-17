<script lang="ts">
	import type { Property } from '#lib/data/site';
	import { formatPrice } from '#lib/data/site';

	interface Props {
		property: Property;
	}
	const { property }: Props = $props();
</script>

<article class="group w-full overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
	<a href="/properties/{property.slug}" class="block" aria-label="{property.title} — {formatPrice(property.price)}">
		<div class="relative overflow-hidden">
			<img
				src={property.image}
				alt="{property.title} in {property.location}"
				width="1920"
				height="1280"
				loading="lazy"
				class="aspect-[16/10] w-full object-cover"
			/>
			<span class="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-pine shadow-sm">
				{property.status}
			</span>
		</div>
		<div class="p-5">
			<div class="flex items-start justify-between gap-3">
				<div class="min-w-0">
					<h3 class="font-display text-xl leading-snug font-semibold text-pine">{property.title}</h3>
					<p class="mt-1 truncate text-sm text-muted">{property.location}</p>
				</div>
			</div>
			<div class="mt-4 flex items-center justify-between gap-2 border-t border-[#efe7d8] pt-4">
				<p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
					<span class="inline-flex items-center gap-1">
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
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
					<span class="text-base font-bold whitespace-nowrap text-pine">{formatPrice(property.price)}</span>
					<span class="flex h-8 w-8 items-center justify-center rounded-full bg-pine text-sm text-white transition-colors group-hover:bg-pine-soft" aria-hidden="true">→</span>
				</span>
			</div>
		</div>
	</a>
</article>

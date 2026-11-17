<script lang="ts">
	// Clean schematic floor plan, drawn as SVG from the home's bedrooms and
	// bathrooms — no extra images, always crisp at any size.
	interface Props {
		beds: number;
		baths: number;
		area: number;
	}
	const { beds, baths, area }: Props = $props();

	const bedrooms = $derived(Math.max(1, Math.min(beds, 5)));
	const bathrooms = $derived(Math.max(1, Math.min(baths, 3)));
</script>

<div class="rounded-3xl bg-white p-6 sm:p-8">
	<div class="flex flex-wrap items-baseline justify-between gap-3">
		<h3 class="font-display text-2xl font-semibold text-pine">Floor plan</h3>
		<p class="text-sm text-muted">Indicative layout · {area} m² · {bedrooms} bed / {bathrooms} bath</p>
	</div>
	<svg
		viewBox="0 0 640 420"
		role="img"
		aria-label="Indicative floor plan with living room, kitchen, {bedrooms} bedrooms and {bathrooms} bathrooms"
		class="mt-5 w-full"
	>
		<rect x="10" y="10" width="620" height="400" rx="8" fill="#f7f2ea" stroke="#0f2a1f" stroke-width="3" />
		<!-- Living room -->
		<rect x="10" y="10" width="300" height="200" fill="#efe7d8" stroke="#0f2a1f" stroke-width="2" />
		<text x="160" y="105" text-anchor="middle" font-size="17" font-weight="600" fill="#0f2a1f">Living room</text>
		<text x="160" y="128" text-anchor="middle" font-size="12" fill="#5d6b64">open plan · garden view</text>
		<!-- Kitchen -->
		<rect x="310" y="10" width="180" height="200" fill="#ffffff" stroke="#0f2a1f" stroke-width="2" />
		<text x="400" y="105" text-anchor="middle" font-size="17" font-weight="600" fill="#0f2a1f">Kitchen</text>
		<text x="400" y="128" text-anchor="middle" font-size="12" fill="#5d6b64">chef’s kitchen</text>
		<!-- Bath 1 -->
		<rect x="490" y="10" width="140" height="100" fill="#ffffff" stroke="#0f2a1f" stroke-width="2" />
		<text x="560" y="62" text-anchor="middle" font-size="15" font-weight="600" fill="#0f2a1f">Bath 1</text>
		<!-- Hall / entrance -->
		<rect x="490" y="110" width="140" height="100" fill="#f7f2ea" stroke="#0f2a1f" stroke-width="2" />
		<text x="560" y="162" text-anchor="middle" font-size="15" font-weight="600" fill="#0f2a1f">Entrance</text>
		<!-- Bedrooms -->
		{#each Array.from({ length: bedrooms }, (_, i) => i) as i (i)}
			{@const x = 10 + i * (620 / bedrooms)}
			{@const w = 620 / bedrooms}
			<rect x={x} y="210" width={w} height="140" fill={i === 0 ? '#efe7d8' : '#ffffff'} stroke="#0f2a1f" stroke-width="2" />
			<text x={x + w / 2} y="272" text-anchor="middle" font-size="16" font-weight="600" fill="#0f2a1f">
				Bedroom {i + 1}
			</text>
			<text x={x + w / 2} y="294" text-anchor="middle" font-size="12" fill="#5d6b64">
				{i === 0 ? 'primary suite' : 'double room'}
			</text>
		{/each}
		<!-- Terrace strip -->
		<rect x="10" y="350" width={bathrooms > 1 ? 480 : 620} height="60" fill="#efe7d8" stroke="#0f2a1f" stroke-width="2" />
		<text x={bathrooms > 1 ? 250 : 320} y="386" text-anchor="middle" font-size="15" font-weight="600" fill="#0f2a1f">
			Terrace & garden
		</text>
		{#if bathrooms > 1}
			<rect x="490" y="350" width="140" height="60" fill="#ffffff" stroke="#0f2a1f" stroke-width="2" />
			<text x="560" y="386" text-anchor="middle" font-size="14" font-weight="600" fill="#0f2a1f">Bath 2</text>
		{/if}
		<!-- Door swings -->
		<line x1="310" y1="120" x2="310" y2="160" stroke="#c9a96a" stroke-width="3" />
		<line x1="490" y1="160" x2="490" y2="200" stroke="#c9a96a" stroke-width="3" />
	</svg>
	<p class="mt-4 text-xs leading-relaxed text-muted">
		Schematic only — not to scale. The full measured plan is available from your advisor
		before you make an offer.
	</p>
</div>

<script lang="ts">
	// Stylised neighbourhood map — schematic SVG, not a live map tile.
	// Streets, a park and the pin for the home, plus the nearby list.
	interface Nearby {
		name: string;
		kind: string;
		distance: string;
	}
	interface Props {
		nearby: Nearby[];
		location: string;
	}
	const { nearby, location }: Props = $props();

	const kindColor: Record<string, string> = {
		School: '#c9a96a',
		Hospital: '#b3554d',
		'Metro & tram': '#0f2a1f',
		Leisure: '#1d4436'
	};
</script>

<div class="rounded-3xl bg-white p-6 sm:p-8">
	<h3 class="font-display text-2xl font-semibold text-pine">Map & nearby</h3>
	<p class="mt-2 text-sm leading-relaxed text-muted">
		{location} — schematic map. Distances are approximate, measured from the front door.
	</p>
	<svg viewBox="0 0 640 300" role="img" aria-label="Schematic map of the neighbourhood around the home" class="mt-5 w-full rounded-2xl">
		<rect width="640" height="300" fill="#efe7d8" />
		<!-- Park -->
		<rect x="30" y="30" width="150" height="90" rx="10" fill="#dce8d6" />
		<text x="105" y="80" text-anchor="middle" font-size="13" font-weight="600" fill="#1d4436">Park</text>
		<!-- Streets -->
		<path d="M0 150 H640 M220 0 V300 M420 0 V300" stroke="#ffffff" stroke-width="16" />
		<path d="M0 150 H640 M220 0 V300 M420 0 V300" stroke="#d8cdb6" stroke-width="1.5" stroke-dasharray="10 8" />
		<path d="M0 240 H640" stroke="#ffffff" stroke-width="10" />
		<!-- Blocks -->
		<rect x="250" y="170" width="140" height="50" rx="6" fill="#f7f2ea" stroke="#d8cdb6" />
		<rect x="450" y="40" width="150" height="80" rx="6" fill="#f7f2ea" stroke="#d8cdb6" />
		<rect x="250" y="40" width="140" height="80" rx="6" fill="#f7f2ea" stroke="#d8cdb6" />
		<!-- Home pin -->
		<g transform="translate(320 195)">
			<circle r="26" fill="#0f2a1f" opacity="0.12" />
			<path d="M0-18 C-10-18 -16-10 -16-2 C-16 8 0 18 0 18 C0 18 16 8 16-2 C16-10 10-18 0-18 Z" fill="#0f2a1f" />
			<circle r="5" fill="#ffffff" />
		</g>
		<text x="320" y="245" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2a1f">This home</text>
		<!-- Nearby pins -->
		<g transform="translate(105 185)">
			<circle r="7" fill="#c9a96a" stroke="#ffffff" stroke-width="2" />
		</g>
		<text x="105" y="205" text-anchor="middle" font-size="12" fill="#5d6b64">School</text>
		<g transform="translate(525 80)">
			<circle r="7" fill="#b3554d" stroke="#ffffff" stroke-width="2" />
		</g>
		<text x="525" y="100" text-anchor="middle" font-size="12" fill="#5d6b64">Hospital</text>
		<g transform="translate(490 275)">
			<circle r="7" fill="#0f2a1f" stroke="#ffffff" stroke-width="2" />
		</g>
		<text x="490" y="292" text-anchor="middle" font-size="12" fill="#5d6b64">Tram</text>
	</svg>
	<ul class="mt-5 grid gap-3 sm:grid-cols-2">
		{#each nearby as n (n.name)}
			<li class="flex items-start gap-3 rounded-2xl bg-cream px-4 py-3">
				<span
					class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
					style="background-color: {kindColor[n.kind] ?? '#0f2a1f'}"
					aria-hidden="true"
				>
					{n.kind.charAt(0)}
				</span>
				<div class="min-w-0">
					<p class="text-sm font-semibold text-pine">{n.name}</p>
					<p class="text-xs text-muted">{n.kind} · {n.distance}</p>
				</div>
			</li>
		{/each}
	</ul>
</div>

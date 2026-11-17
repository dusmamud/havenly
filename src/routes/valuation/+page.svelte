<script lang="ts">
	import { cities, propertyTypes, type PropertyType } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let city = $state('Casablanca');
	let type: PropertyType = $state('Apartment');
	let beds = $state(3);
	let area = $state(150);
	let condition = $state('good');
	let estimated = $state(false);

	const basePerSqm: Record<string, number> = {
		Casablanca: 1400,
		Rabat: 1650,
		Marrakech: 2100,
		Agadir: 1420,
		Tangier: 1550
	};
	const typeMult: Record<PropertyType, number> = {
		Villa: 1.15,
		Apartment: 1.0,
		House: 1.1,
		Townhouse: 1.05,
		Penthouse: 1.25
	};
	const conditionMult: Record<string, number> = { excellent: 1.1, good: 1.0, needsWork: 0.85 };

	const estimate = $derived(
		Math.round(
			(basePerSqm[city] ?? 1400) * area * (typeMult[type] ?? 1) * (conditionMult[condition] ?? 1)
		)
	);
	const low = $derived(Math.round(estimate * 0.93));
	const high = $derived(Math.round(estimate * 1.07));

	function fmt(n: number): string {
		return '$' + n.toLocaleString('en-US');
	}
</script>

<svelte:head>
	<title>Home Valuation — What Is My Home Worth? | Havenly</title>
	<meta
		name="description"
		content="Get an instant estimate of your home's value in Morocco — city, type, bedrooms and size. Free, no sign-up, and a real advisor follows up with a proper valuation."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Home Valuation","url":"https://havenlly.pages.dev/valuation","description":"Free estimated value range for a home in Morocco."}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Tools · Home Valuation</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			What is your home worth?
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			A quick estimate based on recent sales of similar homes. For a precise figure, one of
			our advisors visits, photographs and values your home properly — free, and with no
			obligation to list with us.
		</p>
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
		<div class="reveal rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)] sm:p-8" use:reveal>
			<form
				class="space-y-6"
				onsubmit={(e) => {
					e.preventDefault();
					estimated = true;
				}}
			>
				<div class="grid gap-6 sm:grid-cols-2">
					<div>
						<label for="val-city" class="text-sm font-semibold text-pine">City</label>
						<select
							id="val-city"
							bind:value={city}
							class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
						>
							{#each cities as c (c.slug)}
								<option value={c.name}>{c.name}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="val-type" class="text-sm font-semibold text-pine">Property type</label>
						<select
							id="val-type"
							bind:value={type}
							class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
						>
							{#each propertyTypes as t (t)}
								<option value={t}>{t}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="val-beds" class="text-sm font-semibold text-pine">Bedrooms</label>
						<select
							id="val-beds"
							bind:value={beds}
							class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
						>
							{#each [1, 2, 3, 4, 5, 6] as b (b)}
								<option value={b}>{b} {b === 1 ? 'bedroom' : 'bedrooms'}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="val-area" class="text-sm font-semibold text-pine">Living area (m²)</label>
						<input
							id="val-area"
							type="number"
							min="30"
							max="2000"
							bind:value={area}
							class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
						/>
					</div>
				</div>
				<div>
					<span class="text-sm font-semibold text-pine">Condition</span>
					<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Condition">
						{#each [{ v: 'excellent', l: 'Excellent — recently renovated' }, { v: 'good', l: 'Good — well kept' }, { v: 'needsWork', l: 'Needs work' }] as opt (opt.v)}
							<button
								type="button"
								onclick={() => (condition = opt.v)}
								aria-pressed={condition === opt.v}
								class="rounded-full border px-4 py-2 text-sm font-medium transition-colors {condition === opt.v
									? 'border-pine bg-pine text-white'
									: 'border-[#e9e1d0] bg-white text-pine hover:bg-cream-deep'}"
							>
								{opt.l}
							</button>
						{/each}
					</div>
				</div>
				<button
					type="submit"
					class="w-full rounded-full bg-pine py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Get my estimate →
				</button>
			</form>
		</div>

		<div class="space-y-5">
			{#if estimated}
				<div class="reveal rounded-3xl bg-pine p-6 text-white sm:p-8" use:reveal>
					<p class="text-sm tracking-wide text-white/70 uppercase">Estimated value</p>
					<p class="mt-2 font-display text-5xl font-semibold">{fmt(low)} – {fmt(high)}</p>
					<p class="mt-3 text-sm leading-relaxed text-white/75">
						Based on {fmt(estimate)} for a {beds}-bedroom {type.toLowerCase()} of {area} m² in
						{city}, in {condition === 'excellent'
							? 'excellent'
							: condition === 'good'
								? 'good'
								: 'needing work'} condition. Real prices depend on the street, the light,
						the view and the finish — which is why a visit matters.
					</p>
				</div>
			{:else}
				<div class="rounded-3xl bg-pine p-6 text-white sm:p-8">
					<p class="text-sm tracking-wide text-white/70 uppercase">Your estimate will appear here</p>
					<p class="mt-3 text-sm leading-relaxed text-white/75">
						Fill in the details on the left and press “Get my estimate”. The figure is a
						starting point, not a promise — the market moves street by street.
					</p>
				</div>
			{/if}
			<div class="rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
				<h2 class="font-display text-xl font-semibold text-pine">Want the real number?</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					A Havenly advisor visits, measures, photographs and compares your home with recent
					sales on your street — free, and with a written report you keep either way.
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Book a free valuation →
				</a>
			</div>
		</div>
	</div>
</section>

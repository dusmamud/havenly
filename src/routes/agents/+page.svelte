<script lang="ts">
	import { agents } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Our Agents | Havenly</title>
	<meta
		name="description"
		content="Meet the Havenly team — senior property advisors across Casablanca, Rabat, Marrakech, Agadir and Tangier. One advisor from first call to keys in hand."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Havenly agents","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Person","name":"Yasmine El Fassi","jobTitle":"Senior Property Advisor","url":"https://havenlly.pages.dev/agents"}},{"@type":"ListItem","position":2,"item":{"@type":"Person","name":"Omar Benjelloun","jobTitle":"Buyer's Agent","url":"https://havenlly.pages.dev/agents"}},{"@type":"ListItem","position":3,"item":{"@type":"Person","name":"Sofia Marchetti","jobTitle":"Sales & Investment Advisor","url":"https://havenlly.pages.dev/agents"}}]}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Our Team</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			People who know your street
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Three advisors, five cities, one rule: if a home is not right for you, we say so — even
			if it costs us a sale. You keep the same advisor from the first call to the day you get
			the keys.
		</p>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-3">
		{#each agents as a, i (a.name)}
			<article
				class="reveal overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.07)]"
				use:reveal
				data-reveal-delay={i * 120}
			>
				<img
					src={a.image}
					alt="Portrait of {a.name}"
					width="800"
					height="800"
					loading="lazy"
					class="aspect-square w-full object-cover object-top"
				/>
				<div class="p-6">
					<h2 class="font-display text-2xl font-semibold text-pine">{a.name}</h2>
					<p class="mt-1 text-sm font-semibold text-gold">{a.role}</p>
					<p class="mt-3 text-[15px] leading-relaxed text-muted">{a.bio}</p>
					<dl class="mt-5 space-y-2 text-sm">
						<div class="flex justify-between gap-3">
							<dt class="text-muted">Areas</dt>
							<dd class="text-right font-medium text-pine">{a.areas.join(', ')}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-muted">Languages</dt>
							<dd class="text-right font-medium text-pine">{a.languages.join(', ')}</dd>
						</div>
						<div class="flex justify-between gap-3">
							<dt class="text-muted">Deals closed</dt>
							<dd class="text-right font-medium text-pine">{a.deals}</dd>
						</div>
					</dl>
					<div class="mt-5 flex flex-wrap gap-2">
						<a
							href="tel:{a.phone}"
							class="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
						>
							Call {a.name.split(' ')[0]}
						</a>
						<a
							href="mailto:{a.email}"
							class="rounded-full border border-[#e9e1d0] px-4 py-2 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
						>
							Email
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

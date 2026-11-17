<script lang="ts">
	import { reveal } from '#lib/reveal';

	const tools = [
		{
			href: '/tools/mortgage-calculator',
			name: 'Mortgage Calculator',
			body: 'Work out your monthly payment (EMI) from price, down payment, rate and term — with the split between principal and interest.',
			cta: 'Calculate my payment'
		},
		{
			href: '/valuation',
			name: 'Home Valuation',
			body: 'Get an instant estimate of what your home is worth, based on recent sales of similar homes in your city.',
			cta: 'Value my home'
		},
		{
			href: '/compare',
			name: 'Compare Homes',
			body: 'Put up to three homes side by side — price, bedrooms, bathrooms, area and type — and see which one wins.',
			cta: 'Compare homes'
		},
		{
			href: '/saved',
			name: 'Saved Homes',
			body: 'The homes you liked, kept in one place on this device. No account needed — tap the heart on any listing.',
			cta: 'View saved homes'
		}
	];
</script>

<svelte:head>
	<title>Tools for Buyers & Sellers | Havenly</title>
	<meta
		name="description"
		content="Free property tools from Havenly — mortgage calculator, home valuation, side-by-side comparison and your saved homes."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Havenly tools","itemListElement":[{"@type":"ListItem","position":1,"url":"https://havenlly.pages.dev/tools/mortgage-calculator","name":"Mortgage Calculator"},{"@type":"ListItem","position":2,"url":"https://havenlly.pages.dev/valuation","name":"Home Valuation"},{"@type":"ListItem","position":3,"url":"https://havenlly.pages.dev/compare","name":"Compare Homes"},{"@type":"ListItem","position":4,"url":"https://havenlly.pages.dev/saved","name":"Saved Homes"}]}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Tools</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Tools that make buying simpler
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Free, instant, and private — every tool runs in your browser. No sign-up, nothing sent
			or stored.
		</p>
	</div>

	<div class="mt-10 grid gap-5 sm:grid-cols-2">
		{#each tools as t, i (t.href)}
			<a
				href={t.href}
				class="reveal group block rounded-3xl bg-white p-7 shadow-[0_2px_16px_rgba(15,42,31,0.07)] transition-shadow duration-300 hover:shadow-[0_20px_44px_rgba(15,42,31,0.16)]"
				use:reveal
				data-reveal-delay={(i % 2) * 120}
			>
				<h2 class="font-display text-2xl font-semibold text-pine">{t.name}</h2>
				<p class="mt-3 text-[15px] leading-relaxed text-muted">{t.body}</p>
				<p class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine">
					{t.cta}
					<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
				</p>
			</a>
		{/each}
	</div>
</section>

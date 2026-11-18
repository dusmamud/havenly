<script lang="ts">
	import { site, stats, values } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>About Havenly | More Than Just Real Estate</title>
	<meta
		name="description"
		content="Havenly is a Moroccan real estate agency built on honest advice and local knowledge. Meet the team behind 120+ happy homeowners."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
		<div class="reveal" use:reveal>
			<span class="eyebrow">About Havenly</span>
			<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
				More Than Just Real Estate
			</h1>
			<p class="mt-5 max-w-lg text-base leading-relaxed text-muted">
				Havenly began with a simple frustration: buying a home in Morocco felt harder than it
				needed to be. Listings were outdated, prices were unclear, and buyers were left to
				figure out the notaire, the mortgage and the paperwork alone. We decided to build the
				agency we wished had existed — one that visits every home it lists, quotes honest
				prices, and stays with you from the first viewing to the day you get the keys.
			</p>
			<p class="mt-4 max-w-lg text-base leading-relaxed text-muted">
				Today our small team works across Casablanca, Rabat, Marrakech, Agadir and Tangier.
				We are deliberately small: every client works with one advisor who knows their file,
				their budget and their must-haves — and who will tell them the truth about a property,
				including when to walk away.
			</p>
		</div>
		<div class="reveal" use:reveal>
			<Picture
				src="/images/interior-living.jpg"
				alt="Bright modern living room with floor-to-ceiling windows and a beige sofa"
				width={1920}
				height={1280}
				sizes="(max-width: 1024px) 100vw, 620px"
				widths={[400, 800, 1200]}
				class="aspect-[4/3] w-full rounded-[2rem] object-cover"
			/>
		</div>
	</div>

	<div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each stats as s (s.label)}
			<div class="reveal rounded-3xl bg-white p-6 text-center" use:reveal>
				<p class="font-display text-4xl font-semibold text-pine">{s.value}</p>
				<p class="mt-2 text-sm text-muted">{s.label}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-16 font-display text-3xl font-semibold text-pine sm:text-4xl">What we believe</h2>
	<div class="mt-8 grid gap-5 md:grid-cols-3">
		{#each values as v (v.title)}
			<article class="reveal rounded-3xl bg-white p-7" use:reveal>
				<h3 class="font-display text-xl font-semibold text-pine">{v.title}</h3>
				<p class="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
			</article>
		{/each}
	</div>

	<div class="mt-16 overflow-hidden rounded-[2rem] bg-pine px-6 py-12 text-center text-white sm:px-12">
		<h2 class="mx-auto max-w-xl font-display text-3xl leading-snug font-semibold sm:text-4xl">
			Looking for your next home?
		</h2>
		<p class="mx-auto mt-4 max-w-lg text-white/75">
			Tell us what you are looking for, and {site.agent.name} will send you a shortlist that
			actually fits — within one working day.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3">
			<a href="/properties" class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-pine">
				Browse Properties <span aria-hidden="true">→</span>
			</a>
			<a href="/contact" class="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3.5 text-sm font-semibold text-white">
				Contact us
			</a>
		</div>
	</div>
</section>

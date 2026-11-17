<script lang="ts">
	import { faqs } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let openIndex = $state(0);

	const faqJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});
</script>

<svelte:head>
	<title>Frequently Asked Questions | Havenly</title>
	<meta
		name="description"
		content="Buying, selling, mortgages, viewings and fees — answers to the questions Havenly clients ask most."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${faqJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
	<div class="reveal text-center" use:reveal>
		<span class="eyebrow">FAQ</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Questions, Answered
		</h1>
		<p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
			The things buyers and sellers ask us most. Anything else — just
			<a href="/contact" class="font-semibold text-pine underline underline-offset-4">ask us directly</a>.
		</p>
	</div>

	<div class="mt-10 space-y-3">
		{#each faqs as f, i (f.q)}
			<div class="reveal overflow-hidden rounded-2xl bg-white" use:reveal>
				<button
					type="button"
					onclick={() => (openIndex = openIndex === i ? -1 : i)}
					aria-expanded={openIndex === i}
					aria-controls="faq-panel-{i}"
					class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
				>
					<span class="font-semibold text-pine">{f.q}</span>
					<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-deep text-pine" aria-hidden="true">
						{openIndex === i ? '−' : '+'}
					</span>
				</button>
				{#if openIndex === i}
					<p id="faq-panel-{i}" class="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

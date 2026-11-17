<script lang="ts">
	import { testimonials } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	const aggregateJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'RealEstateAgent',
		name: 'Havenly',
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '5',
			reviewCount: String(testimonials.length),
			bestRating: '5'
		},
		review: testimonials.map((t) => ({
			'@type': 'Review',
			author: { '@type': 'Person', name: t.name },
			reviewRating: { '@type': 'Rating', ratingValue: String(t.rating), bestRating: '5' },
			reviewBody: t.quote
		}))
	});
</script>

<svelte:head>
	<title>What Our Clients Say | Havenly Testimonials</title>
	<meta
		name="description"
		content="Real stories from happy Havenly homeowners in Casablanca, Rabat, Marrakech, Agadir and Tangier."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${aggregateJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Testimonials</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			What Our Clients Say
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Real stories from happy homeowners. Every review below is from a client who bought or
			sold with Havenly — and every one of them rated us five stars.
		</p>
		<p class="mt-3 text-sm font-semibold text-pine" aria-label="Average rating 5 out of 5 stars">
			<span class="text-lg tracking-wide text-gold" aria-hidden="true">★★★★★</span> 5.0 average
			from {testimonials.length} reviews
		</p>
	</div>

	<div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each testimonials as t (t.name)}
			<figure class="reveal rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.06)]" use:reveal>
				<span class="font-display text-4xl leading-none text-gold" aria-hidden="true">“</span>
				<blockquote class="mt-1 text-[15px] leading-relaxed text-ink/85">“{t.quote}”</blockquote>
				<figcaption class="mt-5 flex items-center gap-3">
					<img src={t.avatar} alt="Portrait of {t.name}" width="1600" height="1600" loading="lazy" class="h-11 w-11 rounded-full object-cover" />
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-pine">{t.name}</p>
						<p class="text-xs text-muted">{t.city}</p>
						<p class="mt-0.5 text-sm tracking-wide text-gold" aria-label="Rated {t.rating} out of 5 stars">★★★★★</p>
					</div>
				</figcaption>
			</figure>
		{/each}
	</div>

	<div class="mt-14 rounded-[2rem] bg-pine px-6 py-10 text-center text-white sm:px-12">
		<h2 class="font-display text-3xl font-semibold">Ready to write your own story?</h2>
		<p class="mx-auto mt-3 max-w-lg text-white/75">
			Browse our homes for sale, or book a free call and tell us what you are looking for.
		</p>
		<a href="/properties" class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-pine">
			Browse Properties <span aria-hidden="true">→</span>
		</a>
	</div>
</section>

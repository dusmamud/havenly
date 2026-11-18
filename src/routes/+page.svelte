<script lang="ts">
	import SearchBar from '#lib/components/SearchBar.svelte';
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import StatsBand from '#lib/components/StatsBand.svelte';
	import TourModal from '#lib/components/TourModal.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { properties, testimonials, site, cities, cityStats, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let location = $state('any');
	let type = $state('any');
	let price = $state('any');
	let tourOpen = $state(false);

	function matchesPrice(p: number, pr: string): boolean {
		if (pr === 'under300') return p < 300000;
		if (pr === '300-500') return p >= 300000 && p <= 500000;
		if (pr === 'over500') return p > 500000;
		return true;
	}

	const filtered = $derived(
		properties.filter(
			(p) =>
				(location === 'any' || p.city === location) &&
				(type === 'any' || p.type === type) &&
				matchesPrice(p.price, price)
		)
	);
	const featured = $derived(filtered.length > 0 ? filtered : properties.filter((p) => p.featured));
	const hasFilter = $derived(location !== 'any' || type !== 'any' || price !== 'any');

	let rowEl: HTMLDivElement | undefined = $state();

	function scrollRow(dir: 1 | -1) {
		const el = rowEl;
		if (!el) return;
		el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' });
	}

	const agentJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'RealEstateAgent',
		name: 'Havenly',
		url: site.url + '/',
		image: site.url + '/images/og/og-default.png',
		telephone: site.phone,
		email: site.email,
		priceRange: '$280,000 - $780,000',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '12 Boulevard d’Anfa',
			addressLocality: 'Casablanca',
			addressCountry: 'MA'
		},
		areaServed: ['Casablanca', 'Rabat', 'Marrakech', 'Agadir', 'Tangier']
	});
</script>

<svelte:head>
	<!-- Preload the LCP hero image (WebP set the <picture> will pick). -->
	<link
		rel="preload"
		as="image"
		imagesrcset="/images/hero-villa-400.webp 400w, /images/hero-villa-800.webp 800w, /images/hero-villa-1200.webp 1200w, /images/hero-villa-1600.webp 1600w"
		imagesizes="100vw"
		fetchpriority="high"
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${agentJsonLd}</script>`}
</svelte:head>

<!-- Hero — villa on the right, bright sky on the left, dark ink serif
     headline on the sky itself (no black overlay, ever). -->
<section class="mx-auto max-w-7xl px-3 pt-4 sm:px-6 lg:px-8">
	<div class="relative overflow-hidden rounded-[2rem] bg-cream-deep">
		<Picture
			src="/images/hero-villa.jpg"
			alt="Modern villa at dusk with a swimming pool and palm trees, open sky on the left"
			width={1920}
			height={960}
			fetchpriority="high"
			loading="eager"
			sizes="100vw"
			widths={[400, 800, 1200, 1600]}
			class="kenburns absolute inset-0 h-full w-full object-cover object-[68%_center]"
		/>
		<!-- Soft light wash from the left so the dark headline always reads —
		     cream fading out, never a dark overlay. -->
		<div
			class="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,242,234,0.94)_0%,rgba(247,242,234,0.72)_30%,rgba(247,242,234,0.28)_55%,rgba(247,242,234,0)_75%)]"
			aria-hidden="true"
		></div>
		<div class="relative flex min-h-[540px] flex-col justify-center px-5 py-16 sm:min-h-[600px] sm:px-10 lg:px-14">
			<span
				class="hero-anim inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-pine uppercase shadow-sm"
				style="animation-delay: 60ms"
			>
				<span class="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true"></span>
				Find Your Dream Home
			</span>
			<h1
				class="hero-anim mt-5 max-w-xl font-display text-5xl leading-[1.05] font-semibold text-pine sm:text-6xl lg:text-7xl"
				style="animation-delay: 180ms"
			>
				Discover Your<br />Perfect Home
			</h1>
			<p
				class="hero-anim mt-5 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg"
				style="animation-delay: 300ms"
			>
				Modern properties. Prime locations.<br />A better way to find your next home.
			</p>
			<div class="hero-anim mt-8 flex flex-wrap items-center gap-4" style="animation-delay: 420ms">
				<a
					href="/properties"
					class="group inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Browse Properties
					<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
				</a>
				<button
					type="button"
					onclick={() => (tourOpen = true)}
					class="group inline-flex items-center gap-3 text-sm font-semibold text-pine"
				>
					<span
						class="flex h-11 w-11 items-center justify-center rounded-full border border-pine/40 bg-white/50 transition-colors group-hover:bg-white/80"
						aria-hidden="true"
					>
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5z" /></svg>
					</span>
					Watch Tour
				</button>
			</div>
		</div>
	</div>

	<TourModal open={tourOpen} onclose={() => (tourOpen = false)} />

	<!-- Search bar overlapping the hero -->
	<div class="relative z-10 -mt-9 px-1 sm:px-6 lg:px-12">
		<SearchBar
			navigateOnSearch
			onchange={(f) => {
				location = f.location;
				type = f.type;
				price = f.price;
			}}
		/>
		{#if hasFilter}
			<p class="mt-3 text-center text-sm text-muted" role="status">
				{filtered.length} {filtered.length === 1 ? 'home matches' : 'homes match'} your search below — or press Search to see them all.
			</p>
		{/if}
	</div>
</section>

<!-- Cities marquee -->
<div class="marquee overflow-hidden border-y border-[#e9e1d0]/70 bg-cream-deep/60 py-4">
	<p class="sr-only">Cities we cover: Casablanca, Rabat, Marrakech, Agadir, Tangier.</p>
	<div class="marquee-track flex w-max" aria-hidden="true">
		{#each [0, 1] as half (half)}
			<div class="flex items-center gap-8 pr-8">
				{#each cities as city (city.slug)}
					<span class="flex items-center gap-8 font-display text-2xl whitespace-nowrap text-pine/75 italic">
						{city.name} <span class="text-lg text-gold not-italic" aria-hidden="true">◆</span>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<!-- About -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
	<div class="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr_0.85fr] lg:gap-12">
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
		<div class="reveal" use:reveal>
			<span class="eyebrow">About Havenly</span>
			<h2 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-[2.75rem]">
				More Than Just<br />Real Estate
			</h2>
			<p class="mt-5 max-w-lg text-base leading-relaxed text-muted">
				We’re here to make your property journey simple, smooth and successful. With years of
				experience and a passion for real estate, we help you find more than a house — a place
				to call home.
			</p>
			<a
				href="/about"
				class="group mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Learn More
				<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
			</a>
		</div>
		<div class="reveal flex flex-col gap-7" use:reveal>
			<div class="flex items-start gap-4">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-deep text-pine" aria-hidden="true">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
				</span>
				<div>
					<h3 class="font-semibold text-pine">Trusted Agency</h3>
					<p class="mt-1 text-sm leading-relaxed text-muted">Your satisfaction is our priority.</p>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-deep text-pine" aria-hidden="true">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" /><path d="m9 12 2 2 4-4" /></svg>
				</span>
				<div>
					<h3 class="font-semibold text-pine">Secure Transactions</h3>
					<p class="mt-1 text-sm leading-relaxed text-muted">Buy and sell with confidence.</p>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream-deep text-pine" aria-hidden="true">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M19 19a3 3 0 0 1-3 3h-2" /></svg>
				</span>
				<div>
					<h3 class="font-semibold text-pine">Dedicated Support</h3>
					<p class="mt-1 text-sm leading-relaxed text-muted">We’re here for you, always.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Featured Properties -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
	<div class="reveal" use:reveal>
		<div class="flex items-end justify-between gap-4">
			<div>
				<span class="eyebrow">Our Properties</span>
				<h2 class="mt-4 font-display text-4xl font-semibold text-pine sm:text-[2.75rem]">Featured Properties</h2>
				<p class="mt-3 max-w-lg text-base text-muted">
					{hasFilter
						? 'Homes matching your search — change the filters above to see more.'
						: 'Explore our handpicked selection of premium properties.'}
				</p>
			</div>
			<div class="hidden shrink-0 gap-2 sm:flex lg:hidden">
				<button
					type="button"
					aria-label="Previous properties"
					onclick={() => scrollRow(-1)}
					class="flex h-11 w-11 items-center justify-center rounded-full border border-[#e9e1d0] bg-white text-pine transition-colors hover:bg-cream-deep"
				>
					<span aria-hidden="true">←</span>
				</button>
				<button
					type="button"
					aria-label="Next properties"
					onclick={() => scrollRow(1)}
					class="flex h-11 w-11 items-center justify-center rounded-full border border-[#e9e1d0] bg-white text-pine transition-colors hover:bg-cream-deep"
				>
					<span aria-hidden="true">→</span>
				</button>
			</div>
		</div>
	</div>

	<div
		bind:this={rowEl}
		class="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:pb-0"
	>
		{#each featured as p (p.slug)}
			<div class="flex w-full shrink-0 snap-start sm:w-[calc(50%-0.625rem)] lg:w-auto">
				<PropertyCard property={p} />
			</div>
		{/each}
	</div>
	{#if featured.length === 0}
		<p class="mt-6 rounded-2xl bg-white p-6 text-center text-muted" role="status">
			No homes match those filters yet — try a wider price range or a different city.
		</p>
	{/if}
	<div class="mt-6 text-center">
		<a
			href="/properties"
			class="group inline-flex items-center gap-2 text-sm font-semibold text-pine underline decoration-2 underline-offset-4"
		>
			View all {properties.length} properties
			<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
		</a>
	</div>
</section>

<!-- Stats band -->
<StatsBand />

<!-- Explore by City -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
	<div class="reveal flex flex-wrap items-end justify-between gap-4" use:reveal>
		<div>
			<span class="eyebrow">Where We Work</span>
			<h2 class="mt-4 font-display text-4xl font-semibold text-pine sm:text-[2.75rem]">Explore by City</h2>
			<p class="mt-3 max-w-lg text-base text-muted">
				Five cities, one team that knows every street. Start where you want to live.
			</p>
		</div>
		<a
			href="/areas"
			class="group inline-flex items-center gap-2 rounded-full border border-[#e9e1d0] bg-white px-5 py-3 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
		>
			All areas
			<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
		</a>
	</div>
	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
		{#each cities as city, i (city.slug)}
			{@const s = cityStats(city.slug)}
			<a
				href="/areas/{city.slug}"
				class="reveal group relative block overflow-hidden rounded-3xl {i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}"
				use:reveal
				data-reveal-delay={(i % 3) * 100}
				aria-label="Explore homes in {city.name}"
			>
				<Picture
					src={city.image}
					alt="{city.name}, Morocco"
					width={1600}
					height={1067}
					sizes="(max-width: 1024px) 100vw, 620px"
					widths={[400, 800, 1200]}
					class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:aspect-[16/11]"
				/>
				<div
					class="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,31,0)_45%,rgba(15,42,31,0.82)_100%)]"
					aria-hidden="true"
				></div>
				<div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
					<div>
						<h3 class="font-display text-2xl font-semibold text-white">{city.name}</h3>
						<p class="mt-1 text-sm text-white/85">
							{s.count > 0 && s.fromPrice !== null ? `${s.count} ${s.count === 1 ? 'home' : 'homes'} · from ${formatPrice(s.fromPrice)}` : 'New listings coming soon'}
						</p>
					</div>
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-pine transition-transform duration-300 group-hover:translate-x-1"
						aria-hidden="true"
					>
						→
					</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- How It Works -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
	<div class="reveal text-center" use:reveal>
		<span class="eyebrow">How It Works</span>
		<h2 class="mt-4 font-display text-4xl font-semibold text-pine sm:text-[2.75rem]">
			Three steps to your front door
		</h2>
		<p class="mx-auto mt-3 max-w-lg text-base text-muted">
			No jargon, no pressure — just a clear path from first search to moving day.
		</p>
	</div>
	<div class="relative mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
		<div class="absolute top-8 right-[16%] left-[16%] hidden border-t-2 border-dashed border-[#d8cdb6] md:block" aria-hidden="true"></div>
		{#each [{ n: '01', title: 'Search & shortlist', body: 'Tell us your budget and must-haves. We send a shortlist that actually fits — every home visited and checked by our own team first.' }, { n: '02', title: 'Visit, in person or by video', body: 'Walk through your favourites with your advisor, or join a live video tour from anywhere in the world. Ask anything — we answer plainly.' }, { n: '03', title: 'Move in, paperwork handled', body: 'We negotiate, guide you through the compromis and the final deed with the notaire, and hand over the keys. Then we check in after you settle.' }] as step, i (step.n)}
			<div class="reveal relative text-center" use:reveal data-reveal-delay={i * 140}>
				<span
					class="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pine font-display text-xl font-semibold text-white shadow-[0_8px_24px_rgba(15,42,31,0.25)]"
				>
					{step.n}
				</span>
				<h3 class="mt-5 font-display text-2xl font-semibold text-pine">{step.title}</h3>
				<p class="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-muted">{step.body}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Testimonials -->
<section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
	<div class="reveal" use:reveal>
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<span class="eyebrow">Testimonials</span>
				<h2 class="mt-4 font-display text-4xl font-semibold text-pine sm:text-[2.75rem]">What Our Clients Say</h2>
				<p class="mt-3 text-base text-muted">Real stories from happy homeowners.</p>
			</div>
			<a
				href="/testimonials"
				class="group inline-flex items-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
			>
				Read More Reviews
				<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
			</a>
		</div>
	</div>
	<div class="mt-8 grid gap-5 md:grid-cols-3">
		{#each testimonials.slice(0, 3) as t (t.name)}
			<figure class="reveal rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.06)]" use:reveal>
				<span class="font-display text-4xl leading-none text-gold" aria-hidden="true">“</span>
				<blockquote class="mt-1 text-[15px] leading-relaxed text-ink/85">“{t.quote}”</blockquote>
				<figcaption class="mt-5 flex items-center gap-3">
					<Picture src={t.avatar} alt="Portrait of {t.name}" width={1600} height={1600} sizes="44px" widths={[192]} class="h-11 w-11 rounded-full object-cover" />
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-pine">{t.name}</p>
						<p class="text-xs text-muted">{t.city}</p>
						<p class="mt-0.5 text-sm tracking-wide text-gold" aria-label="Rated {t.rating} out of 5 stars">★★★★★</p>
					</div>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<!-- CTA banner -->
<section class="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
	<div class="reveal relative overflow-hidden rounded-[2rem] bg-pine px-6 py-14 text-center sm:px-12" use:reveal>
		<span class="eyebrow bg-white/10 text-white/85">Ready When You Are</span>
		<h2 class="mx-auto mt-5 max-w-2xl font-display text-4xl leading-tight font-semibold text-white sm:text-5xl">
			Ready to find your home?
		</h2>
		<p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
			Tell us what you are looking for and we will send a shortlist within one working day —
			homes we have visited ourselves, priced honestly.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
			<a
				href="/properties"
				class="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
			>
				Browse Properties
				<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
			</a>
			<a
				href="tel:{site.phone}"
				class="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
			>
				Call {site.phoneDisplay}
			</a>
		</div>
	</div>
</section>

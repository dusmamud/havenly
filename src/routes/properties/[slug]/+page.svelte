<script lang="ts">
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import { site, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	const { data } = $props();
	const property = $derived(data.property);
	const others = $derived(data.others);

	let galleryIndex = $state(0);
	let name = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('10:00');
	let booked = $state(false);
	let formError = $state('');

	const today = new Date().toISOString().slice(0, 10);

	function bookTour(event: SubmitEvent) {
		event.preventDefault();
		formError = '';
		if (name.trim().length < 2) {
			formError = 'Please enter your full name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			formError = 'Please enter a valid email address.';
			return;
		}
		if (!date) {
			formError = 'Please choose a date for your tour.';
			return;
		}
		booked = true;
	}

	const productJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: property.title,
			description: property.description,
			image: `https://havenlly.pages.dev${property.image}`,
			offers: {
				'@type': 'Offer',
				price: property.price,
				priceCurrency: 'USD',
				availability: 'https://schema.org/InStock',
				url: `https://havenlly.pages.dev/properties/${property.slug}`
			},
			brand: { '@type': 'Brand', name: 'Havenly' }
		})
	);
	const breadcrumbJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://havenlly.pages.dev/' },
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Properties',
					item: 'https://havenlly.pages.dev/properties'
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: property.title,
					item: `https://havenlly.pages.dev/properties/${property.slug}`
				}
			]
		})
	);
</script>

<svelte:head>
	<title>{property.title} — {formatPrice(property.price)} | Havenly</title>
	<meta name="description" content={property.description} />
	<meta property="og:type" content="product" />
	<meta property="og:title" content="{property.title} — {formatPrice(property.price)} | Havenly" />
	<meta property="og:description" content={property.description} />
	<meta property="og:image" content="https://havenlly.pages.dev{property.image}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${productJsonLd}</script>`}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${breadcrumbJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-pine">Home</a>
		<span aria-hidden="true"> / </span>
		<a href="/properties" class="hover:text-pine">Properties</a>
		<span aria-hidden="true"> / </span>
		<span class="text-pine" aria-current="page">{property.title}</span>
	</nav>

	<div class="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
		<div>
			<div class="overflow-hidden rounded-[2rem]">
				<img
					src={property.gallery[galleryIndex]}
					alt="{property.title} — photo {galleryIndex + 1} of {property.gallery.length}"
					width="1920"
					height="1280"
					fetchpriority="high"
					class="aspect-[16/10] w-full object-cover"
				/>
			</div>
			<div class="mt-3 flex gap-3">
				{#each property.gallery as img, i (img)}
					<button
						type="button"
						onclick={() => (galleryIndex = i)}
						aria-label="Show photo {i + 1}"
						aria-pressed={galleryIndex === i}
						class="overflow-hidden rounded-xl ring-2 transition-all {galleryIndex === i
							? 'ring-pine'
							: 'opacity-70 ring-transparent hover:opacity-100'}"
					>
						<img src={img} alt="" width="1920" height="1280" loading="lazy" class="h-16 w-24 object-cover sm:h-20 sm:w-32" />
					</button>
				{/each}
			</div>

			<div class="reveal mt-8" use:reveal>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div>
						<span class="eyebrow">{property.type} · {property.status}</span>
						<h1 class="mt-3 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
							{property.title}
						</h1>
						<p class="mt-2 text-muted">{property.location}</p>
					</div>
					<p class="font-display text-3xl font-semibold text-pine sm:text-4xl">{formatPrice(property.price)}</p>
				</div>

				<div class="mt-6 grid grid-cols-3 gap-3">
					<div class="rounded-2xl bg-white p-4 text-center">
						<p class="text-2xl font-bold text-pine">{property.beds}</p>
						<p class="mt-1 text-xs tracking-wide text-muted uppercase">Bedrooms</p>
					</div>
					<div class="rounded-2xl bg-white p-4 text-center">
						<p class="text-2xl font-bold text-pine">{property.baths}</p>
						<p class="mt-1 text-xs tracking-wide text-muted uppercase">Bathrooms</p>
					</div>
					<div class="rounded-2xl bg-white p-4 text-center">
						<p class="text-2xl font-bold text-pine">{property.area}</p>
						<p class="mt-1 text-xs tracking-wide text-muted uppercase">m² Living area</p>
					</div>
				</div>

				<h2 class="mt-10 font-display text-2xl font-semibold text-pine">About this home</h2>
				<p class="mt-3 text-base leading-relaxed text-muted">{property.description}</p>

				<h2 class="mt-10 font-display text-2xl font-semibold text-pine">Features</h2>
				<ul class="mt-4 grid gap-3 sm:grid-cols-2">
					{#each property.features as f (f)}
						<li class="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm text-ink/85">
							<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine text-[11px] text-white" aria-hidden="true">✓</span>
							{f}
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<aside class="space-y-5">
			<div class="reveal rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)]" use:reveal>
				{#if booked}
					<div role="status">
						<p class="font-display text-2xl font-semibold text-pine">Tour booked — see you soon!</p>
						<p class="mt-3 text-sm leading-relaxed text-muted">
							Thank you, {name}. Your private tour of <strong class="text-pine">{property.title}</strong>
							is requested for <strong class="text-pine">{date}</strong> at
							<strong class="text-pine">{time}</strong>. {site.agent.name} will confirm by email at
							<strong class="text-pine">{email}</strong> within one working day.
						</p>
						<p class="mt-3 text-sm text-muted">
							This is a demo booking — no email was sent and no payment was taken.
						</p>
						<button
							type="button"
							onclick={() => (booked = false)}
							class="mt-5 rounded-full border border-[#e9e1d0] px-5 py-2.5 text-sm font-medium text-pine hover:bg-cream-deep"
						>
							Book another time
						</button>
					</div>
				{:else}
					<h2 class="font-display text-2xl font-semibold text-pine">Book a private tour</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						See this home in person, or on a live video call — free, with no obligation.
					</p>
					<form class="mt-5 space-y-3" onsubmit={bookTour} novalidate>
						<div>
							<label for="tour-name" class="text-xs font-semibold tracking-wide text-pine uppercase">Full name</label>
							<input
								id="tour-name"
								type="text"
								bind:value={name}
								placeholder="Your name"
								autocomplete="name"
								class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
							/>
						</div>
						<div>
							<label for="tour-email" class="text-xs font-semibold tracking-wide text-pine uppercase">Email</label>
							<input
								id="tour-email"
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								autocomplete="email"
								class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
							/>
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label for="tour-date" class="text-xs font-semibold tracking-wide text-pine uppercase">Date</label>
								<input
									id="tour-date"
									type="date"
									bind:value={date}
									min={today}
									class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
								/>
							</div>
							<div>
								<label for="tour-time" class="text-xs font-semibold tracking-wide text-pine uppercase">Time</label>
								<select
									id="tour-time"
									bind:value={time}
									class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"
								>
									<option value="10:00">10:00</option>
									<option value="12:00">12:00</option>
									<option value="15:00">15:00</option>
									<option value="17:00">17:00</option>
								</select>
							</div>
						</div>
						{#if formError}<p class="text-sm text-red-700" role="alert">{formError}</p>{/if}
						<button
							type="submit"
							class="w-full rounded-full bg-pine py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
						>
							Book my tour →
						</button>
						<p class="text-center text-xs text-muted">Demo form — nothing is sent or stored.</p>
					</form>
				{/if}
			</div>

			<div class="rounded-3xl bg-pine p-6 text-white">
				<h2 class="font-display text-xl font-semibold">Your advisor</h2>
				<p class="mt-3 text-lg font-semibold">{site.agent.name}</p>
				<p class="text-sm text-white/70">{site.agent.role} · {site.agent.experience}</p>
				<div class="mt-4 space-y-2 text-sm">
					<p>
						<a class="text-white underline underline-offset-4" href="tel:{site.agent.phone}">{site.agent.phone}</a>
					</p>
					<p>
						<a class="text-white underline underline-offset-4" href="mailto:{site.agent.email}">{site.agent.email}</a>
					</p>
				</div>
				<a
					href="/contact"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
				>
					Ask a question →
				</a>
			</div>
		</aside>
	</div>

	{#if others.length > 0}
		<section class="mt-16">
			<h2 class="font-display text-3xl font-semibold text-pine">You may also like</h2>
			<div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each others as p (p.slug)}
					<PropertyCard property={p} />
				{/each}
			</div>
		</section>
	{/if}
</section>

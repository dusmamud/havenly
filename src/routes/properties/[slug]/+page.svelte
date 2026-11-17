<script lang="ts">
	import PropertyCard from '#lib/components/PropertyCard.svelte';
	import FloorPlan from '#lib/components/FloorPlan.svelte';
	import NearbyMap from '#lib/components/NearbyMap.svelte';
	import TourModal from '#lib/components/TourModal.svelte';
	import { site, formatPrice } from '#lib/data/site';
	import { isSaved, toggleSaved } from '#lib/saved.svelte';
	import { isCompared, toggleCompare, MAX_COMPARE } from '#lib/compare.svelte';
	import { reveal } from '#lib/reveal';

	const { data } = $props();
	const property = $derived(data.property);
	const others = $derived(data.others);

	let galleryIndex = $state(0);
	let lightboxOpen = $state(false);
	let tourOpen = $state(false);
	let shared = $state(false);
	let compareFull = $state(false);
	let name = $state('');
	let email = $state('');
	let date = $state('');
	let time = $state('10:00');
	let booked = $state(false);
	let formError = $state('');

	const today = new Date().toISOString().slice(0, 10);
	const savedState = $derived(isSaved(property.slug));
	const comparedState = $derived(isCompared(property.slug));

	// Indicative monthly payment: 20% down, 5.5% over 20 years.
	const emi = $derived.by(() => {
		const loan = property.price * 0.8;
		const r = 0.055 / 12;
		const n = 240;
		const f = Math.pow(1 + r, n);
		return (loan * r * f) / (f - 1);
	});

	function onCompare() {
		compareFull = false;
		if (!toggleCompare(property.slug) && !comparedState) compareFull = true;
	}

	async function share() {
		const url = `https://havenlly.pages.dev/properties/${property.slug}`;
		try {
			if (navigator.share) {
				await navigator.share({ title: property.title, url });
				return;
			}
			throw new Error('no share api');
		} catch {
			try {
				await navigator.clipboard.writeText(url);
				shared = true;
				setTimeout(() => (shared = false), 2500);
			} catch {
				// Clipboard unavailable — nothing to do.
			}
		}
	}

	function onLightboxKey(e: KeyboardEvent) {
		if (e.key === 'Escape') lightboxOpen = false;
		if (e.key === 'ArrowRight') galleryIndex = (galleryIndex + 1) % property.gallery.length;
		if (e.key === 'ArrowLeft')
			galleryIndex = (galleryIndex - 1 + property.gallery.length) % property.gallery.length;
	}

	$effect(() => {
		if (!lightboxOpen) return;
		document.addEventListener('keydown', onLightboxKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onLightboxKey);
			document.body.style.overflow = '';
		};
	});

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
			<button
				type="button"
				onclick={() => (lightboxOpen = true)}
				aria-label="Open photo gallery — {property.gallery.length} photos"
				class="block w-full cursor-zoom-in overflow-hidden rounded-[2rem]"
			>
				<img
					src={property.gallery[galleryIndex]}
					alt="{property.title} — photo {galleryIndex + 1} of {property.gallery.length}"
					width="1920"
					height="1280"
					fetchpriority="high"
					class="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
				/>
			</button>
			{#if lightboxOpen}
				<div
					class="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-pine/95 p-4"
					role="dialog"
					aria-modal="true"
					aria-label="Photo gallery — {property.title}"
				>
					<button
						type="button"
						class="absolute inset-0 cursor-default"
						aria-label="Close gallery"
						onclick={() => (lightboxOpen = false)}
					></button>
					<div class="relative w-full max-w-5xl">
						<div class="flex items-center justify-between gap-4 pb-3">
							<p class="text-sm font-semibold text-white">
								{galleryIndex + 1} / {property.gallery.length} · {property.title}
							</p>
							<button
								type="button"
								onclick={() => (lightboxOpen = false)}
								aria-label="Close gallery"
								class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
							</button>
						</div>
						<img
							src={property.gallery[galleryIndex]}
							alt="{property.title} — photo {galleryIndex + 1} of {property.gallery.length}"
							width="1920"
							height="1280"
							class="aspect-[16/10] w-full rounded-2xl object-cover"
						/>
						<button
							type="button"
							aria-label="Previous photo"
							onclick={() => (galleryIndex = (galleryIndex - 1 + property.gallery.length) % property.gallery.length)}
							class="absolute top-1/2 left-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-pine shadow-lg"
						>
							←
						</button>
						<button
							type="button"
							aria-label="Next photo"
							onclick={() => (galleryIndex = (galleryIndex + 1) % property.gallery.length)}
							class="absolute top-1/2 right-3 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-pine shadow-lg"
						>
							→
						</button>
					</div>
				</div>
			{/if}
			<div class="mt-3 flex flex-wrap gap-3">
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
				<button
					type="button"
					onclick={() => (tourOpen = true)}
					class="flex items-center gap-2.5 rounded-xl bg-pine px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					<span class="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] text-pine" aria-hidden="true">▶</span>
					Watch video tour
				</button>
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

				<div class="mt-6 flex flex-wrap items-center gap-2.5">
					<button
						type="button"
						onclick={() => toggleSaved(property.slug)}
						aria-pressed={savedState}
						class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors {savedState
							? 'border-pine bg-pine text-white'
							: 'border-[#e9e1d0] bg-white text-pine hover:bg-cream-deep'}"
					>
						<span aria-hidden="true">{savedState ? '♥' : '♡'}</span>
						{savedState ? 'Saved' : 'Save this home'}
					</button>
					<button
						type="button"
						onclick={onCompare}
						aria-pressed={comparedState}
						class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors {comparedState
							? 'border-pine bg-pine text-white'
							: 'border-[#e9e1d0] bg-white text-pine hover:bg-cream-deep'}"
					>
						{comparedState ? '✓ In compare' : 'Compare'}
					</button>
					<button
						type="button"
						onclick={share}
						class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d0] bg-white px-4 py-2 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
					>
						{shared ? '✓ Link copied' : 'Share'}
					</button>
					<button
						type="button"
						onclick={() => window.print()}
						class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d0] bg-white px-4 py-2 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
					>
						Print
					</button>
					{#if compareFull}
						<p class="w-full text-sm text-red-700" role="alert">
							Compare holds 3 homes — <a href="/compare" class="underline">open compare</a> to remove one.
						</p>
					{/if}
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

				<div class="reveal mt-10" use:reveal>
					<FloorPlan beds={property.beds} baths={property.baths} area={property.area} />
				</div>
				<div class="reveal mt-6" use:reveal>
					<NearbyMap nearby={property.nearby} location={property.location} />
				</div>
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

			<div class="space-y-5 lg:sticky lg:top-28">
			<div class="rounded-3xl bg-pine p-6 text-white">
				<h2 class="font-display text-xl font-semibold">Your advisor</h2>
				<div class="mt-4 flex items-center gap-3">
					<img
						src="/images/agent-yasmine.jpg"
						alt={site.agent.name}
						width="800"
						height="800"
						loading="lazy"
						class="h-14 w-14 rounded-full object-cover ring-2 ring-white/30"
					/>
					<div>
						<p class="text-base leading-tight font-semibold">{site.agent.name}</p>
						<p class="text-sm text-white/70">{site.agent.role} · {site.agent.experience}</p>
					</div>
				</div>
				<div class="mt-5 grid grid-cols-2 gap-2">
					<a
						href="tel:{site.agent.phone.replaceAll(' ', '')}"
						class="rounded-full bg-white py-2.5 text-center text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
					>
						Call
					</a>
					<a
						href="https://wa.me/919876543210?text={encodeURIComponent(
							`Hi, I'm interested in the ${property.title} (${formatPrice(property.price)}).`
						)}"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-[#1d4436] py-2.5 text-center text-sm font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-[#27604a]"
					>
						WhatsApp
					</a>
				</div>
				<p class="mt-4 text-sm text-white/70">
					<a class="text-white underline underline-offset-4" href="mailto:{site.agent.email}">{site.agent.email}</a>
					· replies within one working day
				</p>
				<a
					href="/contact"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-pine transition-colors hover:bg-cream-deep"
				>
					Ask a question →
				</a>
			</div>

			<div class="rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
				<h2 class="font-display text-xl font-semibold text-pine">What would it cost monthly?</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					Indicative payment with 20% down, 5.5% over 20 years.
				</p>
				<p class="mt-4 font-display text-3xl font-semibold text-pine">
					{formatPrice(Math.round(emi))}
					<span class="text-base font-normal text-muted">/ month</span>
				</p>
				<a
					href="/tools/mortgage-calculator?price={property.price}"
					class="mt-4 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Run my numbers →
				</a>
			</div>
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

<TourModal open={tourOpen} onclose={() => (tourOpen = false)} />

<div class="fixed inset-x-0 bottom-0 z-40 border-t border-[#e9e1d0] bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
	<div class="mx-auto grid max-w-lg grid-cols-3 gap-2">
		<a
			href="tel:{site.agent.phone.replaceAll(' ', '')}"
			class="rounded-full bg-pine py-3 text-center text-sm font-semibold text-white"
		>
			Call
		</a>
		<a
			href="https://wa.me/919876543210?text={encodeURIComponent(
				`Hi, I'm interested in the ${property.title}.`
			)}"
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-full bg-[#1d4436] py-3 text-center text-sm font-semibold text-white"
		>
			WhatsApp
		</a>
		<button
			type="button"
			onclick={() => toggleSaved(property.slug)}
			aria-pressed={savedState}
			class="rounded-full border border-pine py-3 text-sm font-semibold {savedState
				? 'bg-pine text-white'
				: 'bg-white text-pine'}"
		>
			{savedState ? '♥ Saved' : '♡ Save'}
		</button>
	</div>
</div>

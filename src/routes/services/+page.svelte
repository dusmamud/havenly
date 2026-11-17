<script lang="ts">
	import { reveal } from '#lib/reveal';

	const services = [
		{
			id: 'buy',
			name: 'Buy a Home',
			tag: 'For buyers',
			body: 'Shortlists that fit your budget, viewings with an advisor who tells you the truth about each home, offers backed by comparable sales, and guidance through the compromis and the final deed with the notaire.',
			points: ['Pre-approval help with banks', 'Private viewings + live video tours', 'Offer negotiation on evidence', 'Notaire + paperwork handled'],
			cta: { href: '/properties', label: 'Browse homes for sale' }
		},
		{
			id: 'sell',
			name: 'Sell Your Home',
			tag: 'For sellers',
			body: 'A free valuation based on recent sales on your street, professional photography, staging advice, and viewings handled for you. Commission agreed in writing before we start — no hidden fees, ever.',
			points: ['Free written valuation', 'Photography + staging advice', 'Listings + viewings managed', 'Results published openly'],
			cta: { href: '/valuation', label: 'Value my home' }
		},
		{
			id: 'rent',
			name: 'Rent & Relocate',
			tag: 'For tenants',
			body: 'Moving to Morocco for work or for a season? We find rentals that match your budget and your commute, arrange viewings, and read the lease with you before you sign — in plain language.',
			points: ['Long-term + seasonal rentals', 'Lease checked before signing', 'Furnished options available', 'Settling-in help on arrival'],
			cta: { href: '/contact', label: 'Tell us what you need' }
		},
		{
			id: 'invest',
			name: 'Invest',
			tag: 'For investors',
			body: 'Yields, occupancy and growth corridors — the honest numbers, not the brochure’s. We show you actual rental figures for the building, comparable sales, and the costs nobody mentions.',
			points: ['Real rental figures, not brochures', 'Yield + occupancy analysis', 'Short-term vs long-term advice', 'Portfolio reviews'],
			cta: { href: '/blog/moroccan-real-estate-investment-2026', label: 'Read the 2026 investment guide' }
		}
	];
</script>

<svelte:head>
	<title>Services — Buy, Sell, Rent & Invest | Havenly</title>
	<meta
		name="description"
		content="Havenly services: buying a home, selling with a free valuation, renting and relocating, and honest property investment advice across Morocco."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">{"@context":"https://schema.org","@type":"ItemList","name":"Havenly services","itemListElement":[{"@type":"ListItem","position":1,"item":{"@type":"Service","name":"Buy a Home","url":"https://havenlly.pages.dev/services#buy"}},{"@type":"ListItem","position":2,"item":{"@type":"Service","name":"Sell Your Home","url":"https://havenlly.pages.dev/services#sell"}},{"@type":"ListItem","position":3,"item":{"@type":"Service","name":"Rent & Relocate","url":"https://havenlly.pages.dev/services#rent"}},{"@type":"ListItem","position":4,"item":{"@type":"Service","name":"Invest","url":"https://havenlly.pages.dev/services#invest"}}]}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">What We Do</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Buy, sell, rent, invest — one team
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Whatever side of the move you are on, the work is the same: honest advice, real numbers,
			and one advisor from first call to keys in hand.
		</p>
	</div>

	<div class="mt-10 grid gap-5 lg:grid-cols-2">
		{#each services as s, i (s.id)}
			<article
				id={s.id}
				class="reveal scroll-mt-28 rounded-3xl bg-white p-7 shadow-[0_2px_16px_rgba(15,42,31,0.07)] sm:p-8"
				use:reveal
				data-reveal-delay={(i % 2) * 120}
			>
				<span class="eyebrow">{s.tag}</span>
				<h2 class="mt-4 font-display text-3xl font-semibold text-pine">{s.name}</h2>
				<p class="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
				<ul class="mt-5 grid gap-2.5 sm:grid-cols-2">
					{#each s.points as pt (pt)}
						<li class="flex items-start gap-2 text-sm text-ink/85">
							<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pine text-[11px] text-white" aria-hidden="true">✓</span>
							{pt}
						</li>
					{/each}
				</ul>
				<a
					href={s.cta.href}
					class="group mt-6 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					{s.cta.label}
					<span class="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
				</a>
			</article>
		{/each}
	</div>
</section>

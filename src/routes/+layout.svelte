<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import { page } from '$app/state';
	import { site } from '#lib/data/site';
	import { initSaved } from '#lib/saved.svelte';
	import { initCompare } from '#lib/compare.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Load saved homes + comparison tray from localStorage once, browser-only.
	$effect(() => {
		initSaved();
		initCompare();
	});

	// Per-section OG card, chosen from the current route.
	const ogMap: [RegExp, string][] = [
		[/^\/properties/, 'og-properties.png'],
		[/^\/about/, 'og-about.png'],
		[/^\/blog/, 'og-blog.png'],
		[/^\/testimonials/, 'og-about.png'],
		[/^\/tools/, 'og-tools.png'],
		[/^\/valuation/, 'og-valuation.png'],
		[/^\/agents/, 'og-agents.png'],
		[/^\/compare/, 'og-compare.png'],
		[/^\/sold/, 'og-sold.png'],
		[/^\/services/, 'og-services.png'],
		[/^\/areas/, 'og-areas.png']
	];
	const ogFile = $derived(ogMap.find(([re]) => re.test(page.url.pathname))?.[1] ?? 'og-default.png');
	const ogUrl = $derived(`${site.url}/images/og/${ogFile}`);
	const canonical = $derived(`${site.url}${page.url.pathname}`);
	const websiteJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: 'Havenly',
			url: site.url + '/',
			inLanguage: 'en',
			description:
				'Modern properties. Prime locations. A better way to find your next home in Morocco.'
		})
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href="/fonts/playfair-display-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/inter-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
	<title>Havenly — Discover Your Perfect Home | Modern Properties in Morocco</title>
	<meta
		name="description"
		content="Modern properties. Prime locations. A better way to find your next home. Browse villas, apartments and family homes across Casablanca, Rabat, Marrakech and Agadir."
	/>
	<meta property="og:title" content="Havenly — Discover Your Perfect Home" />
	<meta
		property="og:description"
		content="Modern properties. Prime locations. A better way to find your next home in Morocco."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Havenly" />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Havenly — Discover Your Perfect Home" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Havenly — Discover Your Perfect Home" />
	<meta
		name="twitter:description"
		content="Modern properties. Prime locations. A better way to find your next home in Morocco."
	/>
	<meta name="twitter:image" content={ogUrl} />
	<link rel="canonical" href={canonical} />
	<meta name="theme-color" content="#0f2a1f" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${websiteJsonLd}</script>`}
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
>
	Skip to content
</a>
<Header />
<main id="main-content">{@render children()}</main>
<Footer />

<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data/site';
	import { saved } from '#lib/saved.svelte';

	let menuOpen = $state(false);
	let scrolled = $state(false);
	let toolsOpen = $state(false);
	const pathname = $derived(page.url.pathname);
	const savedCount = $derived(saved.length);
	const toolsActive = $derived(
		pathname.startsWith('/tools') ||
			pathname === '/valuation' ||
			pathname === '/compare' ||
			pathname === '/saved'
	);

	const toolLinks = [
		{ href: '/tools/mortgage-calculator', label: 'Mortgage Calculator' },
		{ href: '/valuation', label: 'Home Valuation' },
		{ href: '/compare', label: 'Compare Homes' },
		{ href: '/saved', label: 'Saved Homes' }
	];

	// Header gains a soft shadow once the page scrolls — with cleanup.
	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/properties', label: 'Properties' },
		{ href: '/areas', label: 'Areas' },
		{ href: '/about', label: 'About' },
		{ href: '/testimonials', label: 'Testimonials' },
		{ href: '/blog', label: 'Blog' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}
</script>

<header
	class="sticky top-0 z-50 border-b border-[#e9e1d0]/70 bg-[#f7f2ea]/90 backdrop-blur transition-shadow duration-300 {scrolled
		? 'shadow-[0_6px_28px_rgba(15,42,31,0.10)]'
		: ''}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
		<a href="/" class="flex items-center gap-2" aria-label="Havenly — home">
			<span class="flex h-9 w-9 items-center justify-center rounded-full bg-pine text-white" aria-hidden="true">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
			</span>
			<span class="font-display text-2xl font-semibold tracking-tight text-pine">Havenly</span>
		</a>

		<nav class="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-[15px] font-medium transition-colors {isActive(link.href)
						? 'text-pine underline decoration-2 underline-offset-8'
						: 'text-ink/75 hover:text-pine'}"
					aria-current={isActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
			<div class="relative">
				<button
					type="button"
					class="flex items-center gap-1 text-[15px] font-medium transition-colors {toolsActive
						? 'text-pine underline decoration-2 underline-offset-8'
						: 'text-ink/75 hover:text-pine'}"
					aria-expanded={toolsOpen}
					aria-haspopup="true"
					onclick={() => (toolsOpen = !toolsOpen)}
				>
					Tools
					<span class="text-xs transition-transform duration-200 {toolsOpen ? 'rotate-180' : ''}" aria-hidden="true">▾</span>
				</button>
				{#if toolsOpen}
					<button
						type="button"
						class="fixed inset-0 z-10 cursor-default"
						aria-label="Close tools menu"
						onclick={() => (toolsOpen = false)}
					></button>
					<div
						class="absolute top-full right-0 z-20 mt-3 w-60 overflow-hidden rounded-2xl border border-[#e9e1d0] bg-white shadow-[0_16px_40px_rgba(15,42,31,0.16)]"
						role="menu"
					>
						{#each toolLinks as t (t.href)}
							<a
								href={t.href}
								role="menuitem"
								class="block px-5 py-3 text-sm font-medium text-ink/80 transition-colors hover:bg-cream hover:text-pine"
								onclick={() => (toolsOpen = false)}
							>
								{t.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</nav>

		<div class="flex items-center gap-2">
			<a
				href="/saved"
				class="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#e9e1d0] bg-white text-pine transition-colors hover:bg-cream-deep"
				aria-label="Saved homes{savedCount > 0 ? `, ${savedCount} saved` : ''}"
			>
				<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M12 20.5C7 16.5 3 13.3 3 9.3 3 6.4 5.2 4.5 7.7 4.5c1.7 0 3.3.9 4.3 2.4 1-1.5 2.6-2.4 4.3-2.4 2.5 0 4.7 1.9 4.7 4.8 0 4-4 7.2-9 11.2z" />
				</svg>
				{#if savedCount > 0}
					<span
						class="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pine px-1 text-[11px] font-bold text-white"
						aria-hidden="true"
					>
						{savedCount}
					</span>
				{/if}
			</a>
			<a
				href="/properties"
				class="hidden items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft sm:inline-flex"
			>
				Browse Properties
				<span aria-hidden="true">→</span>
			</a>
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center rounded-full border border-[#e9e1d0] bg-white text-pine lg:hidden"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
				{:else}
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
				{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="border-t border-[#e9e1d0] bg-[#f7f2ea] px-4 py-3 lg:hidden" aria-label="Mobile navigation">
			<ul class="flex flex-col">
				{#each links as link (link.href)}
					<li>
						<a
							href={link.href}
							class="block rounded-lg px-3 py-3 text-base font-medium {isActive(link.href)
								? 'bg-cream-deep text-pine'
								: 'text-ink/80'}"
							onclick={() => (menuOpen = false)}
						>
							{link.label}
						</a>
					</li>
				{/each}
				{#each toolLinks as t (t.href)}
					<li>
						<a
							href={t.href}
							class="block rounded-lg px-3 py-3 text-base font-medium text-ink/80"
							onclick={() => (menuOpen = false)}
						>
							{t.label}
						</a>
					</li>
				{/each}
				<li class="pt-2">
					<a
						href="/saved"
						class="flex items-center justify-center gap-2 rounded-full border border-[#e9e1d0] bg-white px-5 py-3 text-sm font-semibold text-pine"
						onclick={() => (menuOpen = false)}
					>
						Saved homes{#if savedCount > 0} ({savedCount}){/if}
					</a>
				</li>
				<li class="pt-2">
					<a
						href="/properties"
						class="flex items-center justify-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white"
						onclick={() => (menuOpen = false)}
					>
						Browse Properties <span aria-hidden="true">→</span>
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>

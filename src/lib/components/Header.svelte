<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/data/site';

	let menuOpen = $state(false);
	const pathname = $derived(page.url.pathname);

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/properties', label: 'Properties' },
		{ href: '/about', label: 'About' },
		{ href: '/testimonials', label: 'Testimonials' },
		{ href: '/blog', label: 'Blog' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}
</script>

<header class="sticky top-0 z-50 border-b border-[#e9e1d0]/70 bg-[#f7f2ea]/90 backdrop-blur">
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
		</nav>

		<div class="flex items-center gap-2">
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

<script lang="ts">
	import { site, propertyTypes } from '#lib/data/site';

	let email = $state('');
	let subscribed = $state(false);
	let error = $state('');

	function subscribe(event: SubmitEvent) {
		event.preventDefault();
		error = '';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		subscribed = true;
	}
</script>

<footer class="bg-pine text-white">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
			<div>
				<a href="/" class="flex items-center gap-2" aria-label="Havenly — home">
					<span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" aria-hidden="true">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
					</span>
					<span class="font-display text-2xl font-semibold tracking-tight">Havenly</span>
				</a>
				<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}</p>
				<div class="mt-5 flex gap-2">
					<a href={site.socials.instagram} aria-label="Instagram" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
						<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>
					</a>
					<a href={site.socials.facebook} aria-label="Facebook" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
						<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1.3 1.4-1.3H17V2.5h-2.6C11.7 2.5 11 4.3 11 6.6v1.9H8.5V12H11v9.5h3V12h2.6l.4-3.5H14z" /></svg>
					</a>
					<a href={site.socials.youtube} aria-label="YouTube" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" /></svg>
					</a>
					<a href={site.socials.linkedin} aria-label="LinkedIn" class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.8H3.2V21h3.3V8.8zM4.8 3.5a1.9 1.9 0 1 0 0 3.9 1.9 1.9 0 0 0 0-3.9zM21 13.4c0-3.2-1.7-5-4.4-5-1.8 0-2.9.9-3.5 1.9V8.8H9.8V21h3.3v-6.4c0-1.6.8-2.5 2.1-2.5 1.2 0 1.9.8 1.9 2.5V21H21v-7.6z" /></svg>
					</a>
				</div>
			</div>

			<nav aria-label="Quick links">
				<h2 class="text-sm font-semibold tracking-wide text-white/90 uppercase">Quick Links</h2>
				<ul class="mt-4 space-y-2.5 text-sm text-white/70">
					<li><a class="hover:text-white" href="/">Home</a></li>
					<li><a class="hover:text-white" href="/properties">Properties</a></li>
					<li><a class="hover:text-white" href="/areas">Areas</a></li>
					<li><a class="hover:text-white" href="/tools">Tools</a></li>
					<li><a class="hover:text-white" href="/agents">Our Agents</a></li>
					<li><a class="hover:text-white" href="/sold">Sold Homes</a></li>
					<li><a class="hover:text-white" href="/services">Services</a></li>
					<li><a class="hover:text-white" href="/about">About</a></li>
					<li><a class="hover:text-white" href="/testimonials">Testimonials</a></li>
					<li><a class="hover:text-white" href="/blog">Blog</a></li>
					<li><a class="hover:text-white" href="/contact">Contact</a></li>
					<li><a class="hover:text-white" href="/faq">FAQ</a></li>
				</ul>
			</nav>

			<nav aria-label="Property types">
				<h2 class="text-sm font-semibold tracking-wide text-white/90 uppercase">Property Types</h2>
				<ul class="mt-4 space-y-2.5 text-sm text-white/70">
					{#each propertyTypes as type (type)}
						<li><a class="hover:text-white" href="/properties?type={type}">{type === 'House' ? 'Houses' : type + 's'}</a></li>
					{/each}
					<li><a class="hover:text-white" href="/properties">Land</a></li>
					<li><a class="hover:text-white" href="/properties">Commercial</a></li>
				</ul>
			</nav>

			<div>
				<h2 class="text-sm font-semibold tracking-wide text-white/90 uppercase">Subscribe to Our Newsletter</h2>
				<p class="mt-4 text-sm leading-relaxed text-white/70">Get the latest properties and real estate tips.</p>
				{#if subscribed}
					<p class="mt-4 rounded-xl bg-white/10 px-4 py-3 text-sm text-white" role="status">
						Thank you — you are subscribed. Fresh listings will land in your inbox.
					</p>
				{:else}
					<form class="mt-4" onsubmit={subscribe} novalidate>
						<label class="sr-only" for="newsletter-email">Your email address</label>
						<div class="flex items-center gap-2 rounded-full bg-white/10 p-1.5 pl-4 focus-within:ring-2 focus-within:ring-white/60">
							<input
								id="newsletter-email"
								type="email"
								bind:value={email}
								placeholder="Your email address"
								class="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
							/>
							<button
								type="submit"
								aria-label="Subscribe"
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f2ea] text-pine transition-colors hover:bg-white"
							>
								<span aria-hidden="true">→</span>
							</button>
						</div>
						{#if error}<p class="mt-2 text-sm text-[#f2c94c]" role="alert">{error}</p>{/if}
					</form>
				{/if}
			</div>
		</div>

		<div class="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row">
			<p>© 2026 Havenly. All rights reserved.</p>
			<p class="flex gap-5">
				<a class="hover:text-white" href="/privacy">Privacy Policy</a>
				<a class="hover:text-white" href="/terms">Terms of Service</a>
			</p>
		</div>
	</div>
</footer>

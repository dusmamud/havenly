<script lang="ts">
	import { site } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Terms of Service | Havenly</title>
	<meta name="description" content="The terms that apply when you use the Havenly website and services." />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
	<div class="reveal" use:reveal>
		<span class="eyebrow">Legal</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">Terms of Service</h1>
		<p class="mt-3 text-sm text-muted">Last updated: 17 November 2026</p>
	</div>
	<div class="mt-8 space-y-6 text-base leading-relaxed text-muted">
		<p>
			By using the Havenly website you agree to these terms. If you do not agree, please do
			not use the site.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Listings</h2>
		<p>
			Property details, prices and availability are shown in good faith and checked by our
			team, but they can change. A listing on this website is an invitation to enquire — it
			is not a binding offer, and the final terms of any sale are those agreed in writing
			and signed before a notaire.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Photographs and content</h2>
		<p>
			Photographs on this site are of the properties listed, or representative images used
			for illustration. Text, images and design on this site belong to Havenly unless stated
			otherwise; please do not copy them without permission.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Forms and bookings</h2>
		<p>
			The contact and tour-booking forms are for genuine enquiries. A tour request is a
			request, not a confirmed appointment, until we confirm it with you directly.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Liability</h2>
		<p>
			We work carefully, but the website is provided “as is”. We are not liable for losses
			arising from decisions made using information on this site; for any purchase, always
			rely on the advice of your notaire and your own checks.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Contact</h2>
		<p>
			Questions about these terms? Email
			<a class="font-semibold text-pine underline underline-offset-4" href="mailto:{site.email}">{site.email}</a>.
		</p>
	</div>
</section>

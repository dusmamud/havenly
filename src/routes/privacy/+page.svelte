<script lang="ts">
	import { site } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Privacy Policy | Havenly</title>
	<meta name="description" content="How Havenly collects, uses and protects your personal information." />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
	<div class="reveal" use:reveal>
		<span class="eyebrow">Legal</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">Privacy Policy</h1>
		<p class="mt-3 text-sm text-muted">Last updated: 17 November 2026</p>
	</div>
	<div class="mt-8 space-y-6 text-base leading-relaxed text-muted">
		<p>
			Havenly (“we”, “us”) operates this website to help you find a home in Morocco. This
			policy explains what personal information we collect when you use the site, and what we
			do with it.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">What we collect</h2>
		<p>
			When you use the contact form, the tour-booking form or the newsletter form, we collect
			the details you type in — typically your name, email address and any message you write.
			We do not collect payment details on this website, and we do not sell your personal
			information to anyone.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">How we use it</h2>
		<p>
			We use your details only to reply to you, to arrange viewings and tours, and — if you
			subscribed — to send you property updates. You can ask us to stop sending the
			newsletter at any time, and we will do so.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Cookies and analytics</h2>
		<p>
			This site does not use advertising cookies. If analytics are added in the future, this
			policy will be updated and the change will be noted here.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Your rights</h2>
		<p>
			You can ask us at any time for a copy of the personal information we hold about you,
			ask us to correct it, or ask us to delete it. Write to
			<a class="font-semibold text-pine underline underline-offset-4" href="mailto:{site.email}">{site.email}</a>
			and we will respond within a reasonable time.
		</p>
		<h2 class="font-display text-2xl font-semibold text-pine">Contact</h2>
		<p>
			Questions about this policy? Email
			<a class="font-semibold text-pine underline underline-offset-4" href="mailto:{site.email}">{site.email}</a>.
		</p>
	</div>
</section>

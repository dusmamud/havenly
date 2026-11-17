<script lang="ts">
	import { site } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let interest = $state('Buying a home');
	let message = $state('');
	let sent = $state(false);
	let errors = $state<{ name?: string; email?: string; message?: string }>({});

	function submit(event: SubmitEvent) {
		event.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
			errors.email = 'Please enter a valid email address.';
		if (message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
		if (Object.keys(errors).length > 0) return;
		sent = true;
	}
</script>

<svelte:head>
	<title>Contact Havenly | Talk to a Property Advisor</title>
	<meta
		name="description"
		content="Ask Havenly about buying, selling or investing in Moroccan property. We reply personally, usually within one working day."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
		<div class="reveal" use:reveal>
			<span class="eyebrow">Contact</span>
			<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
				Let’s Find Your<br />Next Home Together
			</h1>
			<p class="mt-5 max-w-md text-base leading-relaxed text-muted">
				Tell us what you are looking for — or just ask a question. A real person from our
				team replies, usually within one working day.
			</p>
			<div class="mt-8 space-y-4 text-sm">
				<p class="flex items-start gap-3">
					<span class="mt-0.5 text-pine" aria-hidden="true">✉</span>
					<span><strong class="font-semibold text-pine">Email</strong><br /><a class="text-muted underline underline-offset-4" href="mailto:{site.email}">{site.email}</a></span>
				</p>
				<p class="flex items-start gap-3">
					<span class="mt-0.5 text-pine" aria-hidden="true">☎</span>
					<span><strong class="font-semibold text-pine">Phone</strong><br /><a class="text-muted underline underline-offset-4" href="tel:{site.phone}">{site.phone}</a></span>
				</p>
				<p class="flex items-start gap-3">
					<span class="mt-0.5 text-pine" aria-hidden="true">⌂</span>
					<span><strong class="font-semibold text-pine">Office</strong><br /><span class="text-muted">{site.address}</span></span>
				</p>
				<p class="flex items-start gap-3">
					<span class="mt-0.5 text-pine" aria-hidden="true">◷</span>
					<span><strong class="font-semibold text-pine">Hours</strong><br /><span class="text-muted">Monday – Saturday, 9:00 – 18:00</span></span>
				</p>
			</div>
		</div>

		<div class="reveal rounded-[2rem] bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)] sm:p-8" use:reveal>
			{#if sent}
				<div role="status" class="py-6 text-center">
					<span class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pine text-2xl text-white" aria-hidden="true">✓</span>
					<h2 class="mt-5 font-display text-2xl font-semibold text-pine">Message received — thank you, {name.split(' ')[0]}!</h2>
					<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
						We will reply to <strong class="text-pine">{email}</strong> within one working day.
						This is a demo form — no message was sent and nothing was stored.
					</p>
					<button
						type="button"
						onclick={() => {
							sent = false;
							name = '';
							email = '';
							phone = '';
							message = '';
						}}
						class="mt-6 rounded-full border border-[#e9e1d0] px-5 py-2.5 text-sm font-medium text-pine hover:bg-cream-deep"
					>
						Send another message
					</button>
				</div>
			{:else}
				<form onsubmit={submit} novalidate class="space-y-4">
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label for="name" class="text-xs font-semibold tracking-wide text-pine uppercase">Full name *</label>
							<input id="name" type="text" bind:value={name} autocomplete="name" placeholder="Your name" class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none" />
							{#if errors.name}<p class="mt-1.5 text-sm text-red-700" role="alert">{errors.name}</p>{/if}
						</div>
						<div>
							<label for="email" class="text-xs font-semibold tracking-wide text-pine uppercase">Email *</label>
							<input id="email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none" />
							{#if errors.email}<p class="mt-1.5 text-sm text-red-700" role="alert">{errors.email}</p>{/if}
						</div>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<div>
							<label for="phone" class="text-xs font-semibold tracking-wide text-pine uppercase">Phone (optional)</label>
							<input id="phone" type="tel" bind:value={phone} autocomplete="tel" placeholder="+212 …" class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none" />
						</div>
						<div>
							<label for="interest" class="text-xs font-semibold tracking-wide text-pine uppercase">I’m interested in</label>
							<select id="interest" bind:value={interest} class="mt-1.5 w-full rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none">
								<option>Buying a home</option>
								<option>Selling my home</option>
								<option>Investing in property</option>
								<option>Renting</option>
								<option>Something else</option>
							</select>
						</div>
					</div>
					<div>
						<label for="message" class="text-xs font-semibold tracking-wide text-pine uppercase">Your message *</label>
						<textarea id="message" bind:value={message} rows="5" placeholder="Tell us about the home you are looking for — budget, city, must-haves…" class="mt-1.5 w-full resize-y rounded-xl border border-[#e9e1d0] bg-[#fbf8f1] px-4 py-3 text-sm focus:border-pine focus:outline-none"></textarea>
						{#if errors.message}<p class="mt-1.5 text-sm text-red-700" role="alert">{errors.message}</p>{/if}
					</div>
					<button type="submit" class="w-full rounded-full bg-pine py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft">
						Send message →
					</button>
					<p class="text-center text-xs text-muted">Demo form — nothing is sent or stored.</p>
				</form>
			{/if}
		</div>
	</div>
</section>

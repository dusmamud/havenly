<script lang="ts">
	import { page } from '$app/state';
	import { properties, formatPrice } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	let price = $state(450000);
	let downPayment = $state(90000);
	let rate = $state(5.5);
	let years = $state(20);
	let initialised = $state(false);

	// Accept ?price= from a listing's "Run my numbers" link (browser only).
	$effect(() => {
		if (initialised) return;
		initialised = true;
		const p = Number(page.url.searchParams.get('price'));
		if (Number.isFinite(p) && p >= 100000 && p <= 1000000) {
			price = p;
			downPayment = Math.round(p * 0.2);
		}
	});

	const loan = $derived(Math.max(0, price - downPayment));
	const monthlyRate = $derived(rate / 100 / 12);
	const months = $derived(years * 12);
	const emi = $derived.by(() => {
		if (loan <= 0) return 0;
		const r = monthlyRate;
		if (r === 0) return loan / months;
		const f = Math.pow(1 + r, months);
		return (loan * r * f) / (f - 1);
	});
	const totalPaid = $derived(emi * months);
	const totalInterest = $derived(Math.max(0, totalPaid - loan));
	const interestShare = $derived(totalPaid > 0 ? Math.round((totalInterest / totalPaid) * 100) : 0);

	function fmt(n: number): string {
		return '$' + Math.round(n).toLocaleString('en-US');
	}

	const howToJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'How to calculate your mortgage payment',
		description:
			'Work out your monthly mortgage payment (EMI) from the home price, down payment, interest rate and loan term.',
		step: [
			{ '@type': 'HowToStep', name: 'Enter the home price', text: 'Start with the price of the home you want to buy.' },
			{ '@type': 'HowToStep', name: 'Subtract your down payment', text: 'The loan amount is the price minus what you pay upfront.' },
			{ '@type': 'HowToStep', name: 'Set the rate and term', text: 'Enter the annual interest rate and the loan term in years.' },
			{ '@type': 'HowToStep', name: 'Read your monthly payment', text: 'The calculator shows your monthly EMI, total interest and total amount paid.' }
		]
	});
</script>

<svelte:head>
	<title>Mortgage Calculator | Havenly</title>
	<meta
		name="description"
		content="Work out your monthly mortgage payment (EMI) in seconds — home price, down payment, interest rate and term. Free, no sign-up, nothing stored."
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${howToJsonLd}</script>`}
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Tools · Mortgage Calculator</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			What will your monthly payment be?
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			Move the sliders and see your monthly payment (EMI) update instantly. Everything runs
			in your browser — nothing is sent or stored.
		</p>
	</div>

	<div class="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
		<div class="reveal rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)] sm:p-8" use:reveal>
			<div class="space-y-7">
				<div>
					<div class="flex items-baseline justify-between gap-3">
						<label for="calc-price" class="text-sm font-semibold text-pine">Home price</label>
						<span class="font-display text-2xl font-semibold text-pine">{fmt(price)}</span>
					</div>
					<input
						id="calc-price"
						type="range"
						min="100000"
						max="1000000"
						step="5000"
						bind:value={price}
						class="mt-3 w-full accent-[#0f2a1f]"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>$100,000</span><span>$1,000,000</span></div>
				</div>
				<div>
					<div class="flex items-baseline justify-between gap-3">
						<label for="calc-down" class="text-sm font-semibold text-pine">Down payment</label>
						<span class="font-display text-2xl font-semibold text-pine">
							{fmt(downPayment)} <span class="text-base text-muted">({Math.round((downPayment / price) * 100)}%)</span>
						</span>
					</div>
					<input
						id="calc-down"
						type="range"
						min="0"
						max={Math.round(price * 0.5)}
						step="5000"
						bind:value={downPayment}
						class="mt-3 w-full accent-[#0f2a1f]"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>$0</span><span>50% of price</span></div>
				</div>
				<div>
					<div class="flex items-baseline justify-between gap-3">
						<label for="calc-rate" class="text-sm font-semibold text-pine">Interest rate</label>
						<span class="font-display text-2xl font-semibold text-pine">{rate.toFixed(2)}%</span>
					</div>
					<input
						id="calc-rate"
						type="range"
						min="2"
						max="12"
						step="0.1"
						bind:value={rate}
						class="mt-3 w-full accent-[#0f2a1f]"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>2%</span><span>12%</span></div>
				</div>
				<div>
					<div class="flex items-baseline justify-between gap-3">
						<label for="calc-years" class="text-sm font-semibold text-pine">Loan term</label>
						<span class="font-display text-2xl font-semibold text-pine">{years} years</span>
					</div>
					<input
						id="calc-years"
						type="range"
						min="5"
						max="30"
						step="1"
						bind:value={years}
						class="mt-3 w-full accent-[#0f2a1f]"
					/>
					<div class="mt-1 flex justify-between text-xs text-muted"><span>5 years</span><span>30 years</span></div>
				</div>
			</div>
			<p class="mt-7 text-xs leading-relaxed text-muted">
				Illustrative only — your bank’s rate, fees and insurance will change the real figure.
				Moroccan banks typically lend up to 80% of the value for a primary residence.
			</p>
		</div>

		<div class="space-y-5">
			<div class="reveal rounded-3xl bg-pine p-6 text-white sm:p-8" use:reveal>
				<p class="text-sm tracking-wide text-white/70 uppercase">Monthly payment (EMI)</p>
				<p class="mt-2 font-display text-5xl font-semibold">{fmt(emi)}<span class="text-2xl text-white/70"> /mo</span></p>
				<div class="mt-6 space-y-3 text-sm">
					<div class="flex justify-between border-b border-white/15 pb-3">
						<span class="text-white/70">Loan amount</span><span class="font-semibold">{fmt(loan)}</span>
					</div>
					<div class="flex justify-between border-b border-white/15 pb-3">
						<span class="text-white/70">Total interest</span><span class="font-semibold">{fmt(totalInterest)}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-white/70">Total you pay</span><span class="font-semibold">{fmt(totalPaid)}</span>
					</div>
				</div>
				<div class="mt-6" aria-hidden="true">
					<div class="flex h-3 overflow-hidden rounded-full bg-white/15">
						<div class="h-full bg-white" style="width: {100 - interestShare}%"></div>
						<div class="h-full bg-gold" style="width: {interestShare}%"></div>
					</div>
					<div class="mt-2 flex justify-between text-xs text-white/70">
						<span>Principal {100 - interestShare}%</span><span>Interest {interestShare}%</span>
					</div>
				</div>
			</div>
			<div class="rounded-3xl bg-white p-6 shadow-[0_2px_16px_rgba(15,42,31,0.07)]">
				<h2 class="font-display text-xl font-semibold text-pine">Try it on a real home</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					See the payment for one of our current listings, or ask us to run the numbers with
					a bank quote.
				</p>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each properties.slice(0, 3) as p (p.slug)}
						<button
							type="button"
							onclick={() => {
								price = p.price;
								downPayment = Math.round(p.price * 0.2);
							}}
							class="rounded-full border border-[#e9e1d0] px-4 py-2 text-sm font-medium text-pine transition-colors hover:bg-cream-deep"
						>
							{p.title} · {formatPrice(p.price)}
						</button>
					{/each}
				</div>
				<a
					href="/contact"
					class="mt-5 inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-soft"
				>
					Talk to an advisor →
				</a>
			</div>
		</div>
	</div>
</section>

<script lang="ts">
	import { page } from '$app/state';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Page not found');
</script>

<svelte:head>
	<title>{status === 404 ? 'Page Not Found' : 'Something Went Wrong'} | Havenly</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
	<span class="font-display text-7xl font-semibold text-pine" aria-hidden="true">{status}</span>
	<h1 class="mt-4 font-display text-3xl font-semibold text-pine sm:text-4xl">
		{status === 404 ? 'This home doesn’t exist — yet' : 'Something went wrong'}
	</h1>
	<p class="mx-auto mt-4 max-w-md text-muted">
		{#if status === 404}
			The page you are looking for has moved, or the address was typed wrong. The home you
			want is probably still out there — let’s go and find it.
		{:else}
			{message} — please try again, or head back home.
		{/if}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a href="/" class="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3.5 text-sm font-semibold text-white">
			Back to home <span aria-hidden="true">→</span>
		</a>
		<a href="/properties" class="inline-flex items-center gap-2 rounded-full border border-[#e9e1d0] bg-white px-6 py-3.5 text-sm font-semibold text-pine">
			Browse properties
		</a>
	</div>
</section>

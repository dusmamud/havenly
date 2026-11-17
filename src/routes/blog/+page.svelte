<script lang="ts">
	import { posts } from '#lib/data/site';
	import { reveal } from '#lib/reveal';
</script>

<svelte:head>
	<title>Havenly Blog — Real Estate Guides &amp; Tips</title>
	<meta
		name="description"
		content="Practical guides to buying, selling and investing in Moroccan real estate — written by the Havenly team."
	/>
</svelte:head>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<div class="reveal max-w-2xl" use:reveal>
		<span class="eyebrow">Blog</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			Guides for Buyers, Sellers &amp; Investors
		</h1>
		<p class="mt-4 text-base leading-relaxed text-muted">
			No jargon, no hype — just what we tell our own clients, written down. Start with the
			guides below, or ask us anything on the contact page.
		</p>
	</div>

	<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each posts as post (post.slug)}
			<article class="reveal flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_16px_rgba(15,42,31,0.06)]" use:reveal>
				<a href="/blog/{post.slug}" class="block">
					<img
						src={post.image}
						alt={post.title}
						width="1920"
						height="1280"
						loading="lazy"
						class="aspect-[16/10] w-full object-cover"
					/>
				</a>
				<div class="flex flex-1 flex-col p-6">
					<p class="text-xs font-semibold tracking-wide text-gold uppercase">
						{post.category} · {post.readTime}
					</p>
					<h2 class="mt-2 font-display text-[1.4rem] leading-snug font-semibold text-pine">
						<a href="/blog/{post.slug}" class="hover:underline">{post.title}</a>
					</h2>
					<p class="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
					<div class="mt-5 flex items-center justify-between border-t border-[#efe7d8] pt-4">
						<time datetime={post.date} class="text-xs text-muted">
							{new Date(post.date + 'T00:00:00').toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</time>
						<a href="/blog/{post.slug}" class="text-sm font-semibold text-pine">
							Read article <span aria-hidden="true">→</span>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

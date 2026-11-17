<script lang="ts">
	import { site } from '#lib/data/site';

	const { data } = $props();
	const post = $derived(data.post);
	const others = $derived(data.others);

	const wordCount = $derived(post.body.join(' ').split(/\s+/).length);
	const dateLabel = $derived(
		new Date(post.date + 'T00:00:00').toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	const blogJsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.excerpt,
			image: `https://havenlly.pages.dev${post.image}`,
			datePublished: post.date,
			wordCount,
			author: { '@type': 'Organization', name: 'Havenly', url: site.url + '/' },
			publisher: { '@type': 'Organization', name: 'Havenly', url: site.url + '/' },
			mainEntityOfPage: `https://havenlly.pages.dev/blog/${post.slug}`
		})
	);
</script>

<svelte:head>
	<title>{post.title} | Havenly Blog</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{post.title} | Havenly Blog" />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content="https://havenlly.pages.dev{post.image}" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${blogJsonLd}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
	<nav aria-label="Breadcrumb" class="text-sm text-muted">
		<a href="/" class="hover:text-pine">Home</a>
		<span aria-hidden="true"> / </span>
		<a href="/blog" class="hover:text-pine">Blog</a>
		<span aria-hidden="true"> / </span>
		<span class="text-pine" aria-current="page">{post.category}</span>
	</nav>

	<header class="mt-6">
		<span class="eyebrow">{post.category}</span>
		<h1 class="mt-4 font-display text-4xl leading-tight font-semibold text-pine sm:text-5xl">
			{post.title}
		</h1>
		<p class="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
		<p class="mt-5 text-sm text-muted">
			By <strong class="font-semibold text-pine">Havenly Team</strong> · <time datetime={post.date}>{dateLabel}</time> · {post.readTime} · {wordCount} words
		</p>
	</header>

	<img
		src={post.image}
		alt={post.title}
		width="1920"
		height="1280"
		fetchpriority="high"
		class="mt-8 aspect-[16/10] w-full rounded-[2rem] object-cover"
	/>

	<div class="mt-10 space-y-5 text-[17px] leading-relaxed text-ink/90">
		<p class="border-l-4 border-gold pl-5 font-display text-xl leading-relaxed text-pine italic">
			{post.body[0]}
		</p>
		{#each post.body.slice(1) as paragraph (paragraph.slice(0, 40))}
			<p>{paragraph}</p>
		{/each}
	</div>

	<footer class="mt-12 rounded-3xl bg-pine px-6 py-8 text-white sm:px-8">
		<h2 class="font-display text-2xl font-semibold">Have a question about this topic?</h2>
		<p class="mt-2 text-sm leading-relaxed text-white/75">
			Our team answers every message personally — usually within one working day.
		</p>
		<a href="/contact" class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-pine">
			Contact Havenly <span aria-hidden="true">→</span>
		</a>
	</footer>

	{#if others.length > 0}
		<section class="mt-14">
			<h2 class="font-display text-2xl font-semibold text-pine">More from the blog</h2>
			<div class="mt-5 grid gap-5 sm:grid-cols-2">
				{#each others as o (o.slug)}
					<article class="overflow-hidden rounded-3xl bg-white">
						<a href="/blog/{o.slug}" class="block">
							<img src={o.image} alt={o.title} width="1920" height="1280" loading="lazy" class="aspect-[16/10] w-full object-cover" />
						</a>
						<div class="p-5">
							<p class="text-xs font-semibold tracking-wide text-gold uppercase">{o.category} · {o.readTime}</p>
							<h3 class="mt-2 font-display text-lg leading-snug font-semibold text-pine">
								<a href="/blog/{o.slug}" class="hover:underline">{o.title}</a>
							</h3>
						</div>
					</article>
				{/each}
			</div>
		</section>
	{/if}
</article>

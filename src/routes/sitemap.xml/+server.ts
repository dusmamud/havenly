import { properties, posts } from '#lib/data/site';

export const prerender = true;

const base = 'https://havenlly.pages.dev';
const staticPages = [
	'',
	'/properties',
	'/about',
	'/testimonials',
	'/blog',
	'/contact',
	'/faq',
	'/privacy',
	'/terms'
];

export function GET() {
	const urls = [
		...staticPages,
		...properties.map((p) => `/properties/${p.slug}`),
		...posts.map((p) => `/blog/${p.slug}`)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `  <url><loc>${base}${u}</loc></url>`)
		.join('\n')}\n</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}

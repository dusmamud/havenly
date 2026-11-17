import { error } from '@sveltejs/kit';
import { properties } from '#lib/data/site';
import type { PageLoad, EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => properties.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const property = properties.find((p) => p.slug === params.slug);
	if (!property) error(404, 'Property not found');
	return {
		property,
		others: properties.filter((p) => p.slug !== params.slug).slice(0, 3)
	};
};

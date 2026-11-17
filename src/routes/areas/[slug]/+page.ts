import { cities, properties } from '#lib/data/site';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export function entries() {
	return cities.map((c) => ({ slug: c.slug }));
}

export const load: PageLoad = ({ params }) => {
	const city = cities.find((c) => c.slug === params.slug);
	if (!city) error(404, 'Area not found');
	return {
		city,
		listings: properties.filter((p) => p.city === city.name)
	};
};

// Havenly — ALL mock/placeholder values live in this one file.
// Nothing is scattered across pages. Replace values here before launch.
export const site = {
	name: 'Havenly',
	tagline: 'Building better tomorrows, one home at a time.',
	domain: 'havenlly.pages.dev',
	url: 'https://havenlly.pages.dev',
	email: 'hello@havenlly.pages.dev', // placeholder — replace with the real inbox
	phone: '+91 98765 43210', // placeholder — replace with the real number
	phoneDisplay: '+91 98765 43210',
	address: '12 Boulevard d’Anfa, Casablanca, Morocco', // placeholder
	agent: {
		name: 'Yasmine El Fassi',
		role: 'Senior Property Advisor',
		phone: '+91 98765 43210',
		email: 'hello@havenlly.pages.dev',
		experience: '12 years helping families find home in Morocco'
	},
	socials: { instagram: '#', facebook: '#', youtube: '#', linkedin: '#' } // placeholders — real URLs not shared yet
};

export type PropertyType = 'Villa' | 'Apartment' | 'House' | 'Townhouse' | 'Penthouse';

export interface Property {
	slug: string;
	title: string;
	location: string;
	city: string;
	type: PropertyType;
	price: number;
	beds: number;
	baths: number;
	area: number; // m²
	image: string;
	gallery: string[];
	featured: boolean;
	status: 'For Sale';
	description: string;
	features: string[];
	nearby: { name: string; kind: string; distance: string }[];
}

export const properties: Property[] = [
	{
		slug: 'modern-villa-casablanca',
		title: 'Modern Villa in Casablanca',
		location: 'Anfa, Casablanca',
		city: 'Casablanca',
		type: 'Villa',
		price: 450000,
		beds: 4,
		baths: 3,
		area: 320,
		image: '/images/prop-villa-casablanca.jpg',
		gallery: ['/images/prop-villa-casablanca.jpg', '/images/interior-living.jpg', '/images/hero-villa.jpg'],
		featured: true,
		status: 'For Sale',
		description:
			'A light-filled modern villa in the heart of Anfa, minutes from the Corniche. Floor-to-ceiling glass opens onto a private pool and garden terrace, while the open-plan living space, chef’s kitchen and four calm bedrooms make it a home that works as well for quiet mornings as it does for long family evenings.',
		features: [
			'Private swimming pool',
			'Floor-to-ceiling glass walls',
			'Open-plan chef’s kitchen',
			'Landscaped garden terrace',
			'Double garage',
			'Smart-home lighting and security'
		],
		nearby: [
			{ name: 'International School of Casablanca', kind: 'School', distance: '1.2 km' },
			{ name: 'Clinique Badr', kind: 'Hospital', distance: '2.1 km' },
			{ name: 'Tramway — Anfa Park station', kind: 'Metro & tram', distance: '800 m' },
			{ name: 'Corniche beach', kind: 'Leisure', distance: '1.8 km' }
		]
	},
	{
		slug: 'luxury-apartment',
		title: 'Luxury Apartment',
		location: 'Maârif, Casablanca',
		city: 'Casablanca',
		type: 'Apartment',
		price: 280000,
		beds: 3,
		baths: 2,
		area: 150,
		image: '/images/prop-luxury-apartment.jpg',
		gallery: ['/images/prop-luxury-apartment.jpg', '/images/interior-living.jpg', '/images/blog-staging.jpg'],
		featured: true,
		status: 'For Sale',
		description:
			'A refined three-bedroom apartment in Maârif, one of Casablanca’s most walkable neighbourhoods. High ceilings, a sunlit living room and a calm primary suite sit above cafés, parks and the tram — city living with room to breathe, and a building with a concierge, gym and secure parking.',
		features: [
			'Concierge and secure parking',
			'Building gym',
			'Sunlit open-plan living room',
			'Primary suite with dressing room',
			'Balcony with city views',
			'Walking distance to the tram'
		],
		nearby: [
			{ name: 'Lycée Lyautey', kind: 'School', distance: '900 m' },
			{ name: 'Clinique Maârif', kind: 'Hospital', distance: '1.4 km' },
			{ name: 'Tramway — Place de la Ligue Arabe', kind: 'Metro & tram', distance: '400 m' },
			{ name: 'Parc de la Ligue Arabe', kind: 'Leisure', distance: '600 m' }
		]
	},
	{
		slug: 'family-home',
		title: 'Family Home',
		location: 'Souissi, Rabat',
		city: 'Rabat',
		type: 'House',
		price: 620000,
		beds: 5,
		baths: 4,
		area: 420,
		image: '/images/prop-family-home.jpg',
		gallery: ['/images/prop-family-home.jpg', '/images/interior-living.jpg', '/images/blog-buying-guide.jpg'],
		featured: true,
		status: 'For Sale',
		description:
			'A generous five-bedroom family home on a quiet, tree-lined street in Souissi. Two living rooms, a garden made for long lunches, and a first floor designed around the bedrooms give everyone space of their own — while the capital’s best schools and the Agdal station are a short drive away.',
		features: [
			'Two living rooms',
			'Private garden with mature trees',
			'Five bedrooms, four bathrooms',
			'Home office nook',
			'Double garage and storage',
			'Close to international schools'
		],
		nearby: [
			{ name: 'Rabat American School', kind: 'School', distance: '1.6 km' },
			{ name: 'Hôpital Militaire Mohammed V', kind: 'Hospital', distance: '2.4 km' },
			{ name: 'Gare Agdal (high-speed rail)', kind: 'Metro & tram', distance: '1.1 km' },
			{ name: 'Jardin d’Essais Botaniques', kind: 'Leisure', distance: '1.9 km' }
		]
	},
	{
		slug: 'seaside-villa-agadir',
		title: 'Seaside Villa in Agadir',
		location: 'Founty, Agadir',
		city: 'Agadir',
		type: 'Villa',
		price: 540000,
		beds: 4,
		baths: 3,
		area: 380,
		image: '/images/prop-seaside-agadir.jpg',
		gallery: ['/images/prop-seaside-agadir.jpg', '/images/hero-villa.jpg', '/images/interior-living.jpg'],
		featured: false,
		status: 'For Sale',
		description:
			'A white seaside villa in Founty with the ocean never far from view. The terrace runs the width of the house, the infinity pool catches the afternoon sun, and the interiors stay cool and calm — a home built for slow mornings, long summers and weekends that feel like holidays.',
		features: [
			'Infinity pool with ocean views',
			'Full-width sun terrace',
			'Four en-suite-style bedrooms',
			'Outdoor kitchen and dining',
			'Five minutes from the beach',
			'Air conditioning throughout'
		],
		nearby: [
			{ name: 'École Française d’Agadir', kind: 'School', distance: '2.0 km' },
			{ name: 'Clinique Al Manar', kind: 'Hospital', distance: '2.8 km' },
			{ name: 'Agadir Marina', kind: 'Leisure', distance: '1.5 km' },
			{ name: 'Plage d’Agadir', kind: 'Leisure', distance: '800 m' }
		]
	},
	{
		slug: 'penthouse-rabat',
		title: 'Penthouse in Rabat',
		location: 'Agdal, Rabat',
		city: 'Rabat',
		type: 'Penthouse',
		price: 780000,
		beds: 3,
		baths: 3,
		area: 210,
		image: '/images/prop-penthouse-rabat.jpg',
		gallery: ['/images/prop-penthouse-rabat.jpg', '/images/interior-living.jpg', '/images/blog-investing.jpg'],
		featured: false,
		status: 'For Sale',
		description:
			'A top-floor penthouse above Agdal with a rooftop terrace made for golden-hour evenings. Inside, three bedrooms, a sculptural living space and a kitchen built for hosting; outside, the skyline of the capital. Private lift access, two parking spaces and a building that takes care of everything else.',
		features: [
			'Private rooftop terrace',
			'Panoramic city views',
			'Private lift access',
			'Two secure parking spaces',
			'Three bedrooms, three bathrooms',
			'Building gym and concierge'
		],
		nearby: [
			{ name: 'Université Mohammed V', kind: 'School', distance: '1.3 km' },
			{ name: 'CHU Ibn Sina', kind: 'Hospital', distance: '2.2 km' },
			{ name: 'Tramway — Agdal station', kind: 'Metro & tram', distance: '500 m' },
			{ name: 'Médina & Kasbah des Oudayas', kind: 'Leisure', distance: '2.6 km' }
		]
	},
	{
		slug: 'garden-townhouse-marrakech',
		title: 'Garden Townhouse in Marrakech',
		location: 'Guéliz, Marrakech',
		city: 'Marrakech',
		type: 'Townhouse',
		price: 395000,
		beds: 3,
		baths: 2,
		area: 185,
		image: '/images/prop-townhouse-marrakech.jpg',
		gallery: ['/images/prop-townhouse-marrakech.jpg', '/images/blog-staging.jpg', '/images/interior-living.jpg'],
		featured: false,
		status: 'For Sale',
		description:
			'A warm garden townhouse in Guéliz, the Marrakech neighbourhood where cafés, galleries and the medina are all within reach. Terracotta walls, wooden shutters and a small olive-tree garden give it the soul of the city, while the bright, modern interior keeps daily life easy.',
		features: [
			'Private garden with olive tree',
			'Terracotta and cedar finishes',
			'Three bedrooms, two bathrooms',
			'Rooftop terrace',
			'Walking distance to cafés and galleries',
			'Furnished kitchen included'
		],
		nearby: [
			{ name: 'École Majorelle', kind: 'School', distance: '700 m' },
			{ name: 'Clinique du Sud', kind: 'Hospital', distance: '1.8 km' },
			{ name: 'Gare de Marrakech', kind: 'Metro & tram', distance: '2.0 km' },
			{ name: 'Jardin Majorelle', kind: 'Leisure', distance: '1.1 km' }
		]
	}
];

export interface Testimonial {
	name: string;
	city: string;
	quote: string;
	avatar: string;
	rating: number;
}

export const testimonials: Testimonial[] = [
	{
		name: 'Sarah El Mansouri',
		city: 'Casablanca',
		quote: 'Havenly made the entire process smooth and stress-free. Highly recommended!',
		avatar: '/images/avatar-sarah.jpg',
		rating: 5
	},
	{
		name: 'Karim Benali',
		city: 'Rabat',
		quote: 'Professional, responsive and truly dedicated. We found our dream home.',
		avatar: '/images/avatar-karim.jpg',
		rating: 5
	},
	{
		name: 'Fatima Zahra',
		city: 'Marrakech',
		quote: 'An exceptional experience from start to finish.',
		avatar: '/images/avatar-fatima.jpg',
		rating: 5
	},
	{
		name: 'Omar Haddad',
		city: 'Tangier',
		quote: 'They showed us homes that actually matched our budget — no wasted viewings, no pressure. We signed within a month.',
		avatar: '/images/avatar-karim.jpg',
		rating: 5
	},
	{
		name: 'Leila Bennis',
		city: 'Casablanca',
		quote: 'As a first-time buyer I had a hundred questions. Every one was answered patiently, in plain language, the same day.',
		avatar: '/images/avatar-sarah.jpg',
		rating: 5
	},
	{
		name: 'Youssef Amrani',
		city: 'Agadir',
		quote: 'We bought from abroad and Havenly handled the viewings, the paperwork and the handover. It felt effortless.',
		avatar: '/images/avatar-karim.jpg',
		rating: 5
	}
];

export interface Post {
	slug: string;
	title: string;
	excerpt: string;
	image: string;
	date: string;
	readTime: string;
	category: string;
	body: string[];
}

export const posts: Post[] = [
	{
		slug: 'first-time-buyers-guide-morocco',
		title: 'A First-Time Buyer’s Guide to Buying a Home in Morocco',
		excerpt:
			'From setting a realistic budget to signing the final deed — everything a first-time buyer needs to know before making an offer.',
		image: '/images/blog-buying-guide.jpg',
		date: '2026-11-10',
		readTime: '6 min read',
		category: 'Buying',
		body: [
			'Buying your first home is one of the biggest decisions you will ever make, and in Morocco it comes with its own rhythms: the notaire, the compromis de vente, the land registry, and a market where the asking price is very often only the start of the conversation. The good news is that none of it is mysterious once you know the order of things. This guide walks through the whole journey, step by step, so you can move with confidence instead of guesswork.',
			'Start with money, not listings. Before you fall in love with a villa, sit down and work out what you can truly afford. As a rough guide, your monthly housing costs — mortgage, charges and insurance — should stay below a third of your household income. Get a mortgage pre-approval early: Moroccan banks typically lend up to 80 percent of the property value for a primary residence, and knowing your ceiling stops you wasting weekends on homes that were never in reach. Remember to budget for the extras too — notaire fees, registration and agency commission usually add around 6 to 7 percent on top of the price.',
			'Next, define what you actually need. Three bedrooms or four? A garden, or a terrace? How far are you willing to commute? Write the list down and split it into must-haves and nice-to-haves, because the perfect home rarely exists and the list keeps you honest when a beautiful kitchen tries to distract you from a 45-minute commute. Neighbourhood matters as much as the house itself: visit at different times of day, check the light, the noise, the parking and the walk to shops, schools and transport.',
			'When you find a home you like, look past the staging. Check the plumbing and the electrics, look for damp on walls and ceilings, and ask how old the roof, the boiler and the windows are. A second viewing at a different time of day is never a waste — it is how you catch the afternoon sun (or the lack of it). If anything feels off, a quick inspection by a professional costs little compared with the price of a hidden problem.',
			'The offer is where a good agent earns their fee. In Morocco, offers are usually made in writing and negotiated through the agent, and the first price is rarely the last. A realistic offer is one backed by evidence: recent sales of similar homes in the same neighbourhood, the condition of the property, and how long it has been on the market. Lowballing a fairly priced home usually just loses it to someone else.',
			'Once an offer is accepted, the compromis de vente is signed and a deposit — typically 10 percent — is paid, usually held by the notaire. This contract locks in the price, the timeline and the conditions, such as the sale depending on your mortgage being approved. The notaire then checks the title, the land registry and any debts attached to the property. This stage takes a few weeks; use the time to finalise your mortgage, arrange insurance and plan the move.',
			'Finally comes the acte de vente, the final deed signed before the notaire, when the balance is paid and the keys change hands. After that, the notaire registers you as the new owner. Keep every document — the compromis, the deed, the mortgage papers and all receipts — in one folder, digital and paper. And give yourself a small celebration: you have just done something most people only dream about, and you did it properly.',
			'If you take one thing from this guide, let it be this: the buyers who have the calmest experience are not the ones with the biggest budget, but the ones who prepared first. Get your financing in order, know your must-haves, view with your eyes open, and work with an agent who will tell you the truth about a property — including when to walk away. That is exactly how we work at Havenly, and it is why so many of our first-time buyers come back years later, this time to buy their second home.'
		]
	},
	{
		slug: 'moroccan-real-estate-investment-2026',
		title: 'Is Moroccan Real Estate a Good Investment in 2026?',
		excerpt:
			'Yields, growth corridors and the risks nobody mentions — an honest look at buying property in Morocco as an investment.',
		image: '/images/blog-investing.jpg',
		date: '2026-11-03',
		readTime: '7 min read',
		category: 'Investing',
		body: [
			'Morocco keeps appearing on international property lists, and for understandable reasons: a growing economy, major infrastructure projects, a tourism sector that has roared back, and prices that still look modest next to southern Europe. But a good holiday destination is not automatically a good investment. The honest answer to whether Moroccan real estate is worth your money in 2026 is: yes, in the right places and with the right expectations — and no, if you buy on a brochure promise alone.',
			'Start with the numbers that matter. Gross rental yields in Casablanca and Rabat typically sit between 4 and 6 percent for well-located apartments, higher for short-term rentals in Marrakech and Agadir, where nightly rates can be strong but occupancy is seasonal. Capital growth has been steadier than spectacular: the most sought-after districts have appreciated consistently, while new developments on the outskirts have often stayed flat. The pattern is familiar everywhere — location and scarcity do the heavy lifting, not the building itself.',
			'The growth corridors are worth knowing. The high-speed rail extensions, the new stadiums and the run-up to the 2030 World Cup are pouring investment into transport and hospitality around Casablanca, Rabat and Marrakech. Tangier keeps growing on the back of its port and free zones. These are real tailwinds, but they are also widely known, which means the easy gains in those areas are already priced in. The edge now is in specific streets and buildings, not whole cities.',
			'Then there is the rental question: long-term or short-term? A long-term tenant gives you predictable income and far less work, and Morocco’s rental demand in the big cities is solid, driven by professionals and students. Short-term letting can earn more per night, but it also means cleaning, management, empty weeks in the low season and rules that vary by building and by city. Many first-time investors underestimate the management cost and overestimate the occupancy. Our rule of thumb: if the numbers only work at 80 percent occupancy, they do not work.',
			'Costs are the part most guides skip. Beyond the purchase price, budget roughly 6 to 7 percent for notaire fees, registration and agency commission. Owning costs include the taxe d’habitation and taxe de services communaux, building charges, insurance and maintenance — and in an older building, the occasional large repair. On the income side, rental income is taxable, and the rules differ for residents and non-residents, so take proper tax advice before you buy, not after.',
			'The risks are manageable but real. Liquidity is lower than in London or Paris: a good property in a good area sells, but it can take months, not weeks. Currency matters if your income is in dirhams and your mortgage is in euros, or the other way round. And title matters enormously — always buy through a notaire who verifies the land registry, and be wary of anything sold off-plan without a solid developer track record.',
			'So who should invest? If you want a home you will also use, a rental that covers most of its costs, and a long horizon of seven to ten years, Morocco remains genuinely attractive. If you want a quick flip or a guaranteed yield, look elsewhere — the market rewards patience, not speculation. Buy in a place you would be happy to hold, at a price the local rental market can support, with a buffer for the unexpected. That combination has worked for our investor clients for years, through good seasons and bad.',
			'If you are considering a purchase, talk to an agent who will show you the actual rental figures for the building, not the brochure’s. Ask for comparable sales, ask about charges and occupancy, and walk the neighbourhood at night. The best investment decision is usually the least exciting one: a well-located, well-built home, bought at a fair price, held for the long term.'
		]
	},
	{
		slug: 'stage-your-home-to-sell-faster',
		title: 'How to Stage Your Home to Sell Faster — and for More',
		excerpt:
			'Buyers decide in the first minute. Here is how to make that minute work for you, room by room, without spending a fortune.',
		image: '/images/blog-staging.jpg',
		date: '2026-10-27',
		readTime: '6 min read',
		category: 'Selling',
		body: [
			'Most buyers decide how they feel about a home within the first minute of walking in — long before they have counted the bedrooms or checked the boiler. That first minute is decided by light, space and smell, not by square metres. Staging is simply the craft of making those three things work for you, and it is one of the highest-return investments a seller can make: well-presented homes sell faster and, very often, for more.',
			'Start by editing, not decorating. Remove a third of what is in every room: the extra chairs, the crowded shelves, the pile of shoes by the door. Buyers need to see the space, not your storage, and a room that breathes photographs far better than a room that is full. Box up personal items — family photos, collections, the fridge magnets — so that visitors can imagine their own life in the rooms instead of feeling like guests in yours.',
			'Then clean like a hotel is about to inspect you. Deep-clean the kitchen and bathrooms until the grout, the taps and the glass shine; these are the two rooms buyers judge hardest. Fix the small things that whisper neglect: a dripping tap, a squeaky door, a cracked tile, a scuffed wall. None of them is expensive, and together they quietly tell a buyer that the house has been loved — or that it has not.',
			'Light is your best free tool. Open every curtain, clean every window inside and out, and replace dim bulbs with warm, bright ones. A dark room feels small and tired; a bright room feels generous. If a room still feels gloomy, a mirror opposite a window doubles the light, and a pale throw or cushion can lift a heavy sofa. In the evening, lamps beat a single harsh ceiling light every time.',
			'Now think about the flow of a viewing. The entrance sets the tone: a clear hallway, a mirror, a small plant, and nowhere for clutter to hide. In the living room, arrange furniture around a single focal point and leave clear paths — buyers should glide through, not squeeze past. The kitchen table should be set simply, a bowl of lemons or a vase of flowers, nothing more. Bedrooms should feel calm: fresh linen, made beds, clear surfaces, and a single book or plant on the nightstand.',
			'The outside matters just as much. Sweep the path, trim the plants, and make the front door look cared for — a fresh coat of paint on a tired door is one of the cheapest upgrades in selling. A balcony or terrace should have two chairs and a small table, not a drying rack and a bicycle. Buyers photograph the outside first, and it is the image they remember when they compare homes later.',
			'Photography is where staging pays off twice. Most buyers meet your home first as a thumbnail on a phone, and a bright, uncluttered photo earns the click that leads to a viewing. Tidy every surface before the photographer arrives, turn all the lights on, and shoot on a sunny day if you can. If the light is poor, a good agent will reschedule rather than publish grey photos — it is worth the wait.',
			'Finally, know when to stop. Staging is not renovation: repainting a whole house or replacing a kitchen rarely pays back at sale time. The rule is simple — spend on what every buyer sees in the first minute, and leave the rest. A weekend of editing, cleaning and light, a few fresh flowers, and a home that smells of nothing at all will do more for your price than a month of building work. And if you would like a second pair of eyes, our team walks through every Havenly listing with exactly this checklist before the first photo is taken.'
		]
	}
];

export interface Faq {
	q: string;
	a: string;
}

export const faqs: Faq[] = [
	{
		q: 'How does buying a home with Havenly work?',
		a: 'It starts with a conversation: your budget, your must-haves and your timeline. We shortlist homes that genuinely fit, arrange viewings, help you make and negotiate an offer, and guide you through the compromis de vente and the final deed with the notaire. You always know what happens next, because we tell you before it happens.'
	},
	{
		q: 'What fees should I expect when buying in Morocco?',
		a: 'On top of the purchase price, budget around 6 to 7 percent for notaire fees, land-registry registration and agency commission. We give you a full written breakdown before you make an offer, so there are no surprises at signing.'
	},
	{
		q: 'Can I get a mortgage as a non-resident?',
		a: 'Yes. Moroccan banks lend to non-residents, usually up to 60 to 70 percent of the property value, and up to 80 percent for residents buying a primary home. We can introduce you to banks we work with and help you prepare the file — proof of income, bank statements and ID are the usual starting point.'
	},
	{
		q: 'Do you organise private viewings and video tours?',
		a: 'Yes, both. You can book a private viewing or a live video tour through the form on any property page, and we will confirm within one working day. If you are buying from abroad, video tours with a live walkthrough are a normal part of how we work.'
	},
	{
		q: 'How long does a purchase usually take?',
		a: 'From an accepted offer to the final deed, most purchases take six to ten weeks. The notaire’s checks on the title and the land registry take up most of that time, and a mortgage approval can add a week or two. Cash purchases are usually faster.'
	},
	{
		q: 'Can Havenly help me sell my home?',
		a: 'Yes. We start with a free valuation based on recent sales of comparable homes, then handle photography, staging advice, listings and viewings. Our commission and exactly what it covers are agreed in writing before we start — no hidden fees, ever.'
	},
	{
		q: 'Which cities and areas do you cover?',
		a: 'Our home ground is Casablanca, Rabat, Marrakech, Agadir and Tangier, and the neighbourhoods around them. If you are looking elsewhere in Morocco, tell us anyway — if we cannot help directly, we will point you to someone we trust.'
	},
	{
		q: 'What documents do I need to buy?',
		a: 'For the purchase itself you will need valid ID or a passport, proof of address, and your financing documents if you are taking a mortgage. The notaire will tell you exactly what is needed for your situation, and we will help you gather it all before signing day.'
	}
];

export const locations = ['Casablanca', 'Rabat', 'Marrakech', 'Agadir'];
export const propertyTypes: PropertyType[] = ['Villa', 'Apartment', 'House', 'Townhouse', 'Penthouse'];

// City guides — images generated for the Explore by City section.
export interface City {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	homes: number;
	avgPrice: number;
	image: string;
	highlights: string[];
}

export const cities: City[] = [
	{
		slug: 'casablanca',
		name: 'Casablanca',
		tagline: 'The economic capital — ocean air, Art Deco streets, serious value.',
		description:
			'Morocco’s largest city and its economic engine. Anfa and Maârif offer modern apartments and villas minutes from the Corniche, while the old medina and the Hassan II Mosque give the city its soul. Strong rental demand from professionals keeps well-located homes working hard.',
		homes: 2,
		avgPrice: 365000,
		image: '/images/city-casablanca.jpg',
		highlights: ['Corniche beachfront', 'Tramway + Casa-Voyageurs station', 'International schools', 'Hassan II Mosque']
	},
	{
		slug: 'rabat',
		name: 'Rabat',
		tagline: 'The calm capital — leafy avenues, embassies and family streets.',
		description:
			'The capital trades Casablanca’s rush for gardens, wide boulevards and a slower pace. Souissi and Agdal are the addresses families ask for: quiet streets, international schools, and the Agdal station linking you to the whole country by high-speed rail.',
		homes: 2,
		avgPrice: 700000,
		image: '/images/city-rabat.jpg',
		highlights: ['Agdal high-speed rail', 'International schools', 'Kasbah des Oudayas', 'Green, walkable districts']
	},
	{
		slug: 'marrakech',
		name: 'Marrakech',
		tagline: 'The red city — medina magic, riads and desert light.',
		description:
			'Marrakech is where buyers come for the light. Guéliz offers modern townhouses and apartments near cafés and galleries; the medina hides riads behind unassuming doors. Short-term rental demand is the strongest in the country — and so is the competition for the best streets.',
		homes: 1,
		avgPrice: 395000,
		image: '/images/city-marrakech.jpg',
		highlights: ['Jemaa el-Fnaa + medina', 'Strong short-term rental market', 'Guéliz galleries and cafés', 'Atlas mountain views']
	},
	{
		slug: 'agadir',
		name: 'Agadir',
		tagline: 'Sun, surf and a 10 km beach — the resort city that keeps growing.',
		description:
			'Built for the sun, Agadir pairs a long sandy bay with modern neighbourhoods like Founty. Seaside villas and apartments here draw both holiday buyers and long-stay renters, and the new marina and promenade keep the city moving forward.',
		homes: 1,
		avgPrice: 540000,
		image: '/images/city-agadir.jpg',
		highlights: ['10 km sandy beach', 'Marina and promenade', 'Founty villas', '300 days of sun a year']
	},
	{
		slug: 'tangier',
		name: 'Tangier',
		tagline: 'Where two seas meet — the port city on the rise.',
		description:
			'Tangier looks to Europe across the strait, and its port, free zones and new districts have made it one of Morocco’s fastest-moving markets. The old town and the bay give it character; the new developments give it room to grow.',
		homes: 0,
		avgPrice: 420000,
		image: '/images/city-tangier.jpg',
		highlights: ['Tanger Med port', 'Strait of Gibraltar views', 'Historic medina', 'New business districts']
	}
];

/** Listing stats per city, derived from `properties` — counts and "from" prices must never be hardcoded, or cards drift from the real listings. */
export function cityStats(slug: string): { count: number; fromPrice: number | null } {
	const city = cities.find((c) => c.slug === slug);
	const list = city ? properties.filter((p) => p.city === city.name) : [];
	return {
		count: list.length,
		fromPrice: list.length > 0 ? Math.min(...list.map((p) => p.price)) : null
	};
}

// Mock figures for the About page — replace with real numbers before launch.
export const stats = [
	{ value: '120+', label: 'Homes matched' },
	{ value: '12', label: 'Years of experience' },
	{ value: '98%', label: 'Happy homeowners' },
	{ value: '5', label: 'Cities covered' }
];

export const values = [
	{
		title: 'Honest advice, always',
		body: 'If a home is not right for you, we say so — even if it costs us a sale. A buyer who trusts us comes back, and brings their friends.'
	},
	{
		title: 'Local knowledge',
		body: 'We live in the neighbourhoods we sell. We know the streets, the schools, the light at 6pm — the things a listing never tells you.'
	},
	{
		title: 'From first viewing to final deed',
		body: 'One advisor from the first call to the day you get the keys, including the notaire, the mortgage and the paperwork in between.'
	}
];

// Team — mock advisors, photos generated. Replace with real people before launch.
export interface Agent {
	name: string;
	role: string;
	bio: string;
	phone: string;
	email: string;
	image: string;
	areas: string[];
	languages: string[];
	deals: number;
}

export const agents: Agent[] = [
	{
		name: 'Yasmine El Fassi',
		role: 'Senior Property Advisor',
		bio: 'Twelve years matching families with homes across Casablanca and Rabat. Yasmine leads every Havenly purchase from first call to final deed — and she will tell you plainly when a home is not right for you.',
		phone: '+91 98765 43210',
		email: 'hello@havenlly.pages.dev',
		image: '/images/agent-yasmine.jpg',
		areas: ['Casablanca', 'Rabat'],
		languages: ['English', 'French', 'Arabic'],
		deals: 68
	},
	{
		name: 'Omar Benjelloun',
		role: 'Buyer’s Agent',
		bio: 'Omar knows Agadir and Tangier street by street. He specialises in first-time buyers and families relocating to Morocco — shortlists that fit the budget, viewings that respect your time, and offers backed by real comparable sales.',
		phone: '+91 98765 43211',
		email: 'omar@havenlly.pages.dev',
		image: '/images/agent-omar.jpg',
		areas: ['Agadir', 'Tangier'],
		languages: ['English', 'French', 'Arabic'],
		deals: 41
	},
	{
		name: 'Sofia Marchetti',
		role: 'Sales & Investment Advisor',
		bio: 'Sofia advises buyers who also want their home to work as an investment — rental yields, occupancy, and the neighbourhoods where demand keeps growing. She covers Marrakech and the short-term rental market end to end.',
		phone: '+91 98765 43212',
		email: 'sofia@havenlly.pages.dev',
		image: '/images/agent-sofia.jpg',
		areas: ['Marrakech', 'Casablanca'],
		languages: ['English', 'French', 'Italian'],
		deals: 37
	}
];

// Recently sold — mock results (same homes as the listings, with sold prices).
export interface SoldHome {
	slug: string;
	soldPrice: number;
	soldDate: string;
	daysOnMarket: number;
}

export const soldHomes: SoldHome[] = [
	{ slug: 'modern-villa-casablanca', soldPrice: 435000, soldDate: 'September 2026', daysOnMarket: 24 },
	{ slug: 'luxury-apartment', soldPrice: 272000, soldDate: 'August 2026', daysOnMarket: 18 },
	{ slug: 'garden-townhouse-marrakech', soldPrice: 388000, soldDate: 'October 2026', daysOnMarket: 31 }
];

export function formatPrice(n: number): string {
	return '$' + n.toLocaleString('en-US');
}

export function priceRangeLabel(price: number): string {
	if (price < 300000) return 'Under $300,000';
	if (price <= 500000) return '$300,000 – $500,000';
	return 'Over $500,000';
}

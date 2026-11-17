// Playwright check: every route at 390px and 1440px — horizontal overflow,
// console errors, failed requests, broken images. Screenshots to .screenshots/.
// Run against `npm run preview` on port 4173.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const BASE = 'http://127.0.0.1:4173';
const routes = [
	'/',
	'/properties',
	'/properties/modern-villa-casablanca',
	'/properties/luxury-apartment',
	'/properties/family-home',
	'/properties/seaside-villa-agadir',
	'/properties/penthouse-rabat',
	'/properties/garden-townhouse-marrakech',
	'/about',
	'/testimonials',
	'/saved',
	'/areas',
	'/areas/casablanca',
	'/areas/rabat',
	'/areas/marrakech',
	'/areas/agadir',
	'/areas/tangier',
	'/tools',
	'/tools/mortgage-calculator',
	'/valuation',
	'/agents',
	'/compare',
	'/sold',
	'/services',
	'/blog',
	'/blog/first-time-buyers-guide-morocco',
	'/blog/moroccan-real-estate-investment-2026',
	'/blog/stage-your-home-to-sell-faster',
	'/contact',
	'/faq',
	'/privacy',
	'/terms'
];
const viewports = [
	{ name: 'mobile', width: 390, height: 844 },
	{ name: 'desktop', width: 1440, height: 900 }
].filter((vp) => !process.env.VP || process.env.VP === vp.name);
const out = '.screenshots';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
	executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1187/chrome-linux/chrome',
	args: ['--no-sandbox']
});
let failures = 0;
const summary = [];

async function checkPage(page, route, vpName) {
	const errors = [];
	const failedReqs = [];
	page.on('console', (m) => {
		if (m.type() === 'error') errors.push(m.text());
	});
	page.on('pageerror', (e) => errors.push(String(e)));
	page.on('requestfailed', (r) => failedReqs.push(r.url() + ' :: ' + (r.failure()?.errorText || '')));
	page.on('response', (r) => {
		if (r.status() >= 400) failedReqs.push(r.url() + ' :: HTTP ' + r.status());
	});
	const res = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
	await page.waitForTimeout(1200);
	for (let i = 0; i < 10; i++) {
		await page.mouse.wheel(0, 700);
		await page.waitForTimeout(200);
	}
	// Horizontal scrollers (e.g. the home featured-properties row) hide
	// lazy images until swiped — bring the row into the viewport first
	// (a row scrolled past the viewport never triggers lazy loads),
	// then scroll it to the end so those images load before the
	// broken-image check, like a real user swiping the row.
	// Keep the row scrolled while waiting for the images; scrolling it back
	// first makes the browser deprioritise them again.
	await page.evaluate(() => {
		document.querySelectorAll('.overflow-x-auto').forEach((el) => {
			el.scrollIntoView({ block: 'center' });
			el.scrollLeft = el.scrollWidth;
		});
	});
	await page.waitForTimeout(1500);
	try {
		await page.waitForFunction(() => [...document.images].every((im) => im.complete), null, {
			timeout: 15000
		});
	} catch {
		/* report whatever is still incomplete below */
	}
	await page.evaluate(() => {
		document.querySelectorAll('.overflow-x-auto').forEach((el) => {
			el.scrollLeft = 0;
		});
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(600);
	const metrics = await page.evaluate(() => {
		const broken = [...document.images]
			.filter((i) => !i.complete || i.naturalWidth === 0)
			.map((i) => i.getAttribute('src'));
		// Reveal audit: after scrolling the whole page, no .reveal-hidden
		// element may remain inside the viewport — it would be stuck invisible.
		const stuckHidden = [...document.querySelectorAll('.reveal-hidden')].filter((el) => {
			const r = el.getBoundingClientRect();
			return r.bottom > 0 && r.top < window.innerHeight;
		}).length;
		return {
			scrollW: document.documentElement.scrollWidth,
			clientW: document.documentElement.clientWidth,
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
			broken,
			h1: document.querySelectorAll('h1').length,
			title: document.title,
			stuckHidden
		};
	});
	const status = res?.status() ?? 0;
	const bad =
		status !== 200 ||
		metrics.overflow > 0 ||
		errors.length ||
		failedReqs.length ||
		metrics.broken.length ||
		metrics.stuckHidden > 0;
	if (bad) failures++;
	summary.push({
		route,
		vp: vpName,
		status,
		overflow: metrics.overflow,
		consoleErrors: errors.length,
		failedReqs: failedReqs.length,
		brokenImgs: metrics.broken.length,
		stuckHidden: metrics.stuckHidden,
		h1: metrics.h1
	});
	if (bad)
		console.log(
			'FAIL',
			route,
			vpName,
			JSON.stringify({
				status,
				overflow: metrics.overflow,
				errors,
				failedReqs,
				broken: metrics.broken,
				stuckHidden: metrics.stuckHidden
			})
		);
	return metrics;
}

for (const vp of viewports) {
	for (const route of routes) {
		const slug = route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '');
		const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
		await checkPage(page, route, vp.name);
		await page.screenshot({ path: `${out}/${slug}-${vp.name}.png` });
		if (route === '/') await page.screenshot({ path: `${out}/${slug}-${vp.name}-full.png`, fullPage: true });
		await page.close();
	}
}

// Filter interaction checks (desktop): query params must filter the grid.
const fpage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const [url, expected] of [
	['/properties?location=Rabat', 2],
	['/properties?type=Villa', 2],
	['/properties?price=under300', 1]
]) {
	await fpage.goto(BASE + url, { waitUntil: 'networkidle', timeout: 30000 });
	await fpage.waitForTimeout(1000);
	const count = await fpage.evaluate(() => document.querySelectorAll('article').length);
	const ok = count === expected;
	if (!ok) failures++;
	console.log(ok ? 'FILTER OK' : 'FILTER FAIL', url, 'cards:', count, 'expected:', expected);
	summary.push({ route: url, vp: 'filter', status: 200, overflow: 0, consoleErrors: 0, failedReqs: 0, brokenImgs: 0, h1: 1 });
}
await fpage.close();

// 404 check
const page404 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const r404 = await page404.goto(BASE + '/definitely-not-a-page', { waitUntil: 'networkidle' });
console.log('404 status:', r404?.status());
await page404.screenshot({ path: `${out}/404-desktop.png` });
await page404.close();
await browser.close();
console.log(`\nChecked ${summary.length} route/viewport combos, failures: ${failures}`);
console.log(JSON.stringify(summary, null, 1));

import { chromium } from 'playwright-core';
const BASE = 'http://127.0.0.1:4173';
const browser = await chromium.launch({
	executablePath: process.env.HOME + '/.cache/ms-playwright/chromium-1187/chrome-linux/chrome'
});
const page = await browser.newPage({ viewport: { width: 1919, height: 998 } });
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(String(e)));

// 1. Hero first paint: headline must be dark + fully opaque immediately.
await page.goto(BASE + '/', { waitUntil: 'commit' });
await page.waitForTimeout(150);
const hero = await page.evaluate(() => {
  const h = document.querySelector('h1');
  const cs = getComputedStyle(h);
  const r = h.getBoundingClientRect();
  return { color: cs.color, opacity: cs.opacity, top: r.top, text: h.textContent.trim() };
});
console.log('HERO first-paint:', JSON.stringify(hero));

// 2. City cards text
const cards = await page.evaluate(() => [...document.querySelectorAll('a[href^="/areas/"] p')].map(p => p.textContent.trim()).slice(0, 8));
console.log('CITY cards:', JSON.stringify(cards));

// 3. Detail page: scroll through, EMI box must become visible; advisor email not clipped.
await page.goto(BASE + '/properties/modern-villa-casablanca', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
const emi = await page.evaluate(async () => {
  const el = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('cost monthly'));
  if (!el) return { found: false };
  // scroll in steps like a user would
  for (let y = 0; y <= document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 120));
    const r = el.getBoundingClientRect();
    if (r.top >= 0 && r.bottom <= window.innerHeight) {
      const advisor = [...document.querySelectorAll('h2')].find(h => h.textContent.includes('Your advisor'));
      const ar = advisor.getBoundingClientRect();
      return { found: true, visibleAtScroll: y, emiTop: Math.round(r.top), advisorTop: Math.round(ar.top), advisorVisible: ar.top >= 0 };
    }
  }
  const r = el.getBoundingClientRect();
  return { found: true, visibleAtScroll: null, emiTop: Math.round(r.top) };
});
console.log('EMI:', JSON.stringify(emi));
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('detail overflow px:', overflow, '| console errors:', errors.length, JSON.stringify(errors.slice(0, 3)));
await browser.close();

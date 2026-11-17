// Subtle scroll reveal. Content stays VISIBLE by default — the hidden
// state is only applied by JS, only to elements below the fold, and only
// when the user has not asked for reduced motion. If JS fails or the
// observer never fires, nothing is ever hidden.
//
// Optional stagger: set data-reveal-delay="120" (ms) on the element.
export function reveal(node: HTMLElement) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!('IntersectionObserver' in window)) return;

	const delay = Number(node.dataset.revealDelay ?? 0);
	if (delay > 0) node.style.transitionDelay = `${delay}ms`;

	const rect = node.getBoundingClientRect();
	if (rect.top >= window.innerHeight) {
		node.classList.add('reveal-hidden');
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.remove('reveal-hidden');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.08 }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
}

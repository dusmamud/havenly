<script lang="ts">
	// Animated number — counts up when scrolled into view, once.
	// Reduced motion: shows the final value immediately, no animation.
	interface Props {
		value: number;
		suffix?: string;
		label: string;
		duration?: number;
	}
	const { value, suffix = '', label, duration = 1500 }: Props = $props();

	let shown = $state(0);
	let el: HTMLSpanElement | undefined = $state();
	let started = $state(false);

	$effect(() => {
		const node = el;
		if (!node) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = value;
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && !started) {
					started = true;
					const t0 = performance.now();
					const tick = (t: number) => {
						const p = Math.min(1, (t - t0) / duration);
						const eased = 1 - Math.pow(1 - p, 3);
						shown = Math.round(value * eased);
						if (p < 1) requestAnimationFrame(tick);
					};
					requestAnimationFrame(tick);
					io.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(node);
		return () => io.disconnect();
	});
</script>

<div class="text-center">
	<p class="font-display text-5xl font-semibold text-white sm:text-6xl">
		<span bind:this={el}>{shown}</span><span class="text-gold">{suffix}</span>
	</p>
	<p class="mt-2 text-sm tracking-wide text-white/70 uppercase">{label}</p>
</div>

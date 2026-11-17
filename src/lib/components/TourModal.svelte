<script lang="ts">
	// Cinematic tour modal — plays the generated villa video; if the video
	// file is ever missing, falls back to a photo slideshow of the hero images.
	interface Props {
		open: boolean;
		onclose: () => void;
	}
	const { open, onclose }: Props = $props();

	const slides = ['/images/hero-villa.jpg', '/images/prop-villa-casablanca.jpg', '/images/interior-living.jpg'];
	let slide = $state(0);
	let videoFailed = $state(false);
	let videoEl: HTMLVideoElement | undefined = $state();

	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onclose();
			if (e.key === 'ArrowRight') slide = (slide + 1) % slides.length;
			if (e.key === 'ArrowLeft') slide = (slide - 1 + slides.length) % slides.length;
		};
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
			videoEl?.pause();
		};
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-[70] flex items-center justify-center bg-pine/90 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-label="Video tour of the Modern Villa in Casablanca"
	>
		<button
			type="button"
			class="absolute inset-0 cursor-default"
			aria-label="Close tour"
			onclick={onclose}
		></button>
		<div class="relative w-full max-w-4xl">
			<div class="flex items-center justify-between gap-4 pb-3">
				<p class="font-display text-xl font-semibold text-white">A tour of the Modern Villa, Casablanca</p>
				<button
					type="button"
					onclick={onclose}
					aria-label="Close tour"
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
				</button>
			</div>
			{#if !videoFailed}
				<video
					bind:this={videoEl}
					src="/videos/villa-tour.mp4"
					poster="/images/hero-villa.jpg"
					controls
					autoplay
					playsinline
					class="aspect-video w-full rounded-2xl bg-black object-cover"
					onerror={() => (videoFailed = true)}
				>
					<track kind="captions" src="/videos/villa-tour.vtt" srclang="en" label="English" />
					Your browser does not support video.
				</video>
			{:else}
				<div class="relative overflow-hidden rounded-2xl">
					<img
						src={slides[slide]}
						alt="Tour photo {slide + 1} of {slides.length}"
						width="1920"
						height="960"
						class="aspect-video w-full object-cover"
					/>
					<button
						type="button"
						aria-label="Previous photo"
						onclick={() => (slide = (slide - 1 + slides.length) % slides.length)}
						class="absolute top-1/2 left-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-pine"
					>
						←
					</button>
					<button
						type="button"
						aria-label="Next photo"
						onclick={() => (slide = (slide + 1) % slides.length)}
						class="absolute top-1/2 right-3 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-pine"
					>
						→
					</button>
					<p class="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-pine/80 px-3 py-1 text-xs font-semibold text-white">
						{slide + 1} / {slides.length}
					</p>
				</div>
			{/if}
			<p class="pt-3 text-center text-sm text-white/70">
				Filmed at dusk at the Modern Villa in Casablanca — { '$450,000' }. Book a private tour
				from the listing page.
			</p>
		</div>
	</div>
{/if}

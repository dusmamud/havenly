<script lang="ts">
	import Counter from '#lib/components/Counter.svelte';
	import { stats } from '#lib/data/site';
	import { reveal } from '#lib/reveal';

	// stats are strings like "120+" / "98%" — split into number + suffix.
	function parseStat(s: string): { value: number; suffix: string } {
		const m = s.match(/^(\d+)(.*)$/);
		return { value: m ? Number(m[1]) : 0, suffix: m ? m[2] : '' };
	}
</script>

<section class="mx-auto max-w-7xl px-3 pb-4 sm:px-6 lg:px-8">
	<div class="reveal rounded-[2rem] bg-pine px-6 py-12 sm:px-10 lg:py-14" use:reveal>
		<p class="text-center text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
			Havenly in numbers
		</p>
		<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
			{#each stats as s, i (s.label)}
				<div data-reveal-delay={i * 120} use:reveal>
					<Counter value={parseStat(s.value).value} suffix={parseStat(s.value).suffix} label={s.label} />
				</div>
			{/each}
		</div>
	</div>
</section>

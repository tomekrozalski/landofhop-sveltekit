<script lang="ts">
	export let innerHeight: number;
	export let xScale: any;

	const xScaleTicks: string[] = xScale.domain();
	const yearTicks = xScaleTicks.filter(
		(value, index) => index === 0 || value.split('-')[1] === '01'
	);
</script>

<g>
	{#each xScaleTicks as tick}
		<g style="transform: translate({xScale(tick) + xScale.bandwidth() / 2}px, {innerHeight}px)">
			<line y2="5" />
			<text y="25" text-anchor="middle">{tick.split('-')[1]}</text>
		</g>
	{/each}
	{#each yearTicks as tick}
		<g style="transform: translate({xScale(tick)}px, {innerHeight + 22}px)">
			<text y="25">{tick.split('-')[0]} →</text>
		</g>
	{/each}
</g>

<style>
	line {
		stroke: var(--color-black);
	}

	text {
		font: var(--font-weight-light) 1.2rem / 1 var(--font-primary);
	}
</style>

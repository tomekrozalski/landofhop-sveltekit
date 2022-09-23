<script lang="ts">
	export let innerHeight: number;
	export let innerWidth: number;
	export let label: string;
	export let xScale: any;
	export let xScaleTicks: string[];
	export let unit: string = '';
</script>

<g>
	<text x={innerWidth} y={innerHeight + 65} text-anchor="end" class="label">{label}</text>
	{#each xScaleTicks as tick}
		<g style="transform: translate({xScale(tick)}px, {innerHeight}px)">
			<line y2="5" />
			<text y="25" text-anchor="middle">{tick}{unit}</text>
		</g>
	{/each}
</g>

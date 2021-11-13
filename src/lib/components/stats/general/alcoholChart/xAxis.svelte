<script lang="ts">
	import { translate } from 'svelte-intl';

	export let innerHeight: number;
	export let innerWidth: number;
	export let xScale: any;

	const xScaleTicks = xScale.domain().filter((d) => !(+d % 1));
</script>

<g>
	<text x={innerWidth} y={innerHeight + 65} text-anchor="end" class="label">
		{$translate('statsGeneral.alcohol.alcohol')}
	</text>
	{#each xScaleTicks as tick}
		<g style="transform: translate({xScale(tick)}px, {innerHeight}px)">
			<line y2="5" />
			<text y="25" text-anchor="middle">{tick}%</text>
		</g>
	{/each}
</g>

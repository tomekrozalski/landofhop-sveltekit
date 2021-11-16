<script lang="ts">
	import { translate } from 'svelte-intl';

	export let innerWidth: number;
	export let yScale: any;
</script>

<g>
	<text x="0" y="-60" style="transform: rotate(-90deg)" text-anchor="end" class="label">
		{$translate('stats.general.alcohol.numberOfBeverages')}
	</text>
	{#each yScale.ticks() as tick, index}
		<g style="transform: translate(0, {yScale(tick)}px)">
			<line x2={innerWidth} class:light={index > 0} />
			{#if index !== 0}
				<text x="-15" y="-5" text-anchor="end">{tick}</text>
			{/if}
		</g>
	{/each}
</g>

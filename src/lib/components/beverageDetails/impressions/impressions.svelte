<script lang="ts">
	import { translate } from 'svelte-intl';
	import isNumber from 'lodash/isNumber.js';
	import type { Details } from '$lib/utils/types/Beverage/Details';

	export let details: Details;
	const { bitterness, clarity, color, fullness, hoppyness, power, sweetness } = details;
</script>

{#if bitterness || fullness || hoppyness || power || sweetness}
	<div>
		{#if bitterness || fullness || hoppyness || power || sweetness}
			<dl>
				{#if bitterness}
					<dt>
						{$translate('beverage.impressions.bitterness')}
					</dt>
					<dd>
						{#if isNumber(bitterness.label)}
							<progress max="100" value={bitterness.label}>
								{bitterness.label}%
							</progress>
						{/if}
						{#if isNumber(bitterness.producer)}
							<progress max="100" value={bitterness.producer}>
								{bitterness.producer}%
							</progress>
						{/if}
					</dd>
				{/if}
				{#if sweetness}
					<dt>
						{$translate('beverage.impressions.sweetness')}
					</dt>
					<dd>
						{#if isNumber(sweetness.label)}
							<progress max="100" value={sweetness.label}>
								{sweetness.label}%
							</progress>
						{/if}
						{#if isNumber(sweetness.producer)}
							<progress max="100" value={sweetness.producer}>
								{sweetness.producer}%
							</progress>
						{/if}
					</dd>
				{/if}
				{#if fullness}
					<dt>
						{$translate('beverage.impressions.fullness')}
					</dt>
					<dd>
						{#if isNumber(fullness.label)}
							<progress max="100" value={fullness.label}>
								{fullness.label}%
							</progress>
						{/if}
						{#if isNumber(fullness.producer)}
							<progress max="100" value={fullness.producer}>
								{fullness.producer}%
							</progress>
						{/if}
					</dd>
				{/if}
				{#if power}
					<dt>
						{$translate('beverage.impressions.power')}
					</dt>
					<dd>
						{#if isNumber(power.label)}
							<progress max="100" value={power.label}>
								{power.label}%
							</progress>
						{/if}
						{#if isNumber(power.producer)}
							<progress max="100" value={power.producer}>
								{power.producer}%
							</progress>
						{/if}
					</dd>
				{/if}
				{#if hoppyness}
					<dt>
						{$translate('beverage.impressions.hoppyness')}
					</dt>
					<dd>
						{#if isNumber(hoppyness.label)}
							<progress max="100" value={hoppyness.label}>
								{hoppyness.label}%
							</progress>
						{/if}
						{#if isNumber(hoppyness.producer)}
							<progress max="100" value={hoppyness.producer}>
								{hoppyness.producer}%
							</progress>
						{/if}
					</dd>
				{/if}
			</dl>
		{/if}
		{#if clarity || color}
			<dl>
				{#if color}
					<dt>
						{$translate('beverage.impressions.color')}
					</dt>
					<dd>{color.editorial}</dd>
				{/if}
				{#if clarity}
					<dt>
						{$translate('beverage.impressions.clarity')}
					</dt>
					<dd>
						{#if isNumber(clarity.editorial)}
							<progress max="100" value={clarity.editorial}>
								{clarity.editorial}%
							</progress>
						{/if}
					</dd>
				{/if}
			</dl>
		{/if}
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	dl {
		flex-basis: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	dt {
		flex-basis: 40%;
		padding-right: 0.7rem;
		text-align: right;
	}

	dt::first-letter {
		text-transform: uppercase;
	}

	dd {
		flex-basis: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	dd::after {
		display: block;
		content: '';
	}

	progress {
		display: block;
		height: 0.3rem;
		width: 100%;
		border: 0;
		background-color: var(--color-grey-4);
	}

	progress + progress {
		margin-top: 0.2rem;
	}

	progress[value]::-webkit-progress-value,
	progress[value]::-moz-progress-bar {
		background-color: var(--color-success);
		border-radius: 2px;
	}

	progress.producer[value]::-webkit-progress-value,
	progress.producer[value]::-moz-progress-bar {
		background-color: var(--color-producer);
	}

	@media (--lg) {
		dl {
			flex-basis: 50%;
		}
	}
</style>

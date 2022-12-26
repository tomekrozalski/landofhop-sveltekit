<script lang="ts">
	import MarkLanguage from '$lib/atoms/MarkLanguage.svelte';
	import type { FormattedPlaceData } from '../../types.d';

	export let formattedPlaces: FormattedPlaceData[];
	export let selectedPlace: string | null;
	export let selectPlace: (value: string) => void;
	export let unselectPlace: () => void;
</script>

<ul>
	{#each formattedPlaces as { city, shortId }}
		<li
			class:selected={selectedPlace === shortId}
			on:mouseenter={() => selectPlace(shortId)}
			on:mouseleave={unselectPlace}
		>
			<MarkLanguage label tag="span" name={city} />
		</li>
	{/each}
</ul>

<style>
	li {
		padding: 0 0.8rem;
		cursor: pointer;
		position: relative;
	}

	li.selected::after {
		content: '';
		width: 100%;
		height: 35%;
		background-color: var(--color-white);
		transition: background-color var(--transition-default);
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: -1;
	}

	li.selected::after {
		background-color: var(--color-brand-5);
	}
</style>

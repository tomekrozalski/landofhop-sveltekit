<script lang="ts">
	import { translate } from 'svelte-intl';

	export let hidden: string[];
	export let language: string;
	export let type: 'hide' | 'show';

	function addToHidden() {
		hidden = [...hidden, language];
	}

	function removeFromHidden() {
		hidden = hidden.filter((value) => value !== language);
	}
</script>

<button on:click={type === 'hide' ? addToHidden : removeFromHidden} type="button">
	{$translate(`dashboard.ingredients.${type}Content`)}
</button>

<style>
	button {
		grid-column: 2/3;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--color-grey-5);
		color: var(--color-grey-2);
		transition: background-color var(--transition-default), color var(--transition-default);
	}

	button:hover {
		background-color: var(--color-black);
		color: var(--color-white);
	}
</style>

<script lang="ts">
	import { translate } from 'svelte-intl';
	import authentication from '$lib/utils/stores/authentication';
	import UpdatePlace from '$lib/templates/modals/UpdatePlace/UpdatePlace.svelte';

	export let shortId: string;
	let updatePlaceShortId: string | null = null;
</script>

<svelte:head>
	<title>{$translate('places.title')}</title>
</svelte:head>

{#if $authentication.isLoggedIn}
	<button
		on:click={() => {
			updatePlaceShortId = shortId;
		}}
	>
		{$translate('places.edit')}
	</button>
	{#if updatePlaceShortId}
		<UpdatePlace close={() => (updatePlaceShortId = null)} shortId={updatePlaceShortId} />
	{/if}
{/if}

<style>
	button {
		padding: 0.2rem 1rem;
		background-color: var(--color-brand-8);
		translate: background-color var(--transition-default);
		color: var(--color-white);
	}

	button:hover {
		background-color: var(--color-brand-10);
	}
</style>

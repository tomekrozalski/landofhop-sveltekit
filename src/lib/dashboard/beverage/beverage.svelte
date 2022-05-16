<script lang="ts">
	import { getContext } from 'svelte';
	import { onDestroy, onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';

	import Spinner from '$lib/elements/spinners/fullScreen.svelte';
	import ProgressList from '$lib/dashboard/elements/progressList/progressList.svelte';
	import Navigation from '$lib/dashboard/elements/navigation.svelte';
	import { page } from '$lib/dashboard/utils/stores';
	import Label from './label/label.svelte';
	import Producer from './producer/producer.svelte';
	import Editorial from './editorial/editorial.svelte';

	const type = getContext('formType');

	onMount(() => {
		if (!$session.isLoggedIn) {
			goto('/', { replaceState: true });
		}
	});

	onDestroy(() => {
		page.set('label');
	});
</script>

{#if $session.isLoggedIn}
	<article>
		{#if type === 'add'}
			<h1>{$translate('dashboard.beverage.addNewBeverage')}</h1>
		{/if}
		{#if type === 'update'}
			<h1>{$translate('dashboard.beverage.updateBeverage')}</h1>
			<Navigation />
		{/if}
		<ProgressList />
		<Label isActive={$page === 'label'} />
		<Producer isActive={$page === 'producer'} />
		<Editorial isActive={$page === 'editorial'} />
	</article>
{:else}
	<Spinner />
{/if}

<style>
	article :global(header) {
		margin-bottom: 2.5rem;
	}
	article :global(header h2) {
		margin-bottom: 0;
	}

	article :global(header p) {
		text-align: right;
		font-size: 1.4rem;
		color: var(--color-grey-1);
	}

	article :global(h3) {
		margin-top: 2rem;
		font: var(--font-weight-regular) 1.6rem / 1 var(--font-primary);
		position: relative;
	}

	article :global(h3::after) {
		display: block;
		height: 1px;
		width: 100%;
		content: '';
		background: var(--color-grey-3);
		position: absolute;
		top: 50%;
		z-index: -1;
	}

	article :global(h3 span) {
		margin-left: 4rem;
		padding: 0 2rem;
		background: var(--color-white);
	}
</style>

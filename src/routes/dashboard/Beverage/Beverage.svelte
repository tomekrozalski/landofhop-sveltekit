<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import { translate, translations } from 'svelte-intl';
	import formsDictionary from '$lib/utils/dictionary/form.json';
	import Navigation from '$Beverage/Navigation.svelte';
	import ProgressList from '$Beverage/ProgressList/ProgressList.svelte';
	import { page } from '$Beverage/utils/stores';
	import Label from '$Beverage/Label/Label.svelte';
	import Producer from '$Beverage/Producer/Producer.svelte';
	import Editorial from '$Beverage/Editorial/Editorial.svelte';
	import labelsDictionary from '$Beverage/utils/dictionary/labels.json';
	import dictionary from '$Beverage/utils/dictionary/dictionary.json';

	translations.update(dictionary);
	translations.update(labelsDictionary);
	translations.update(formsDictionary);

	const type = getContext('formType');

	onDestroy(() => {
		page.set('label');
	});
</script>

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

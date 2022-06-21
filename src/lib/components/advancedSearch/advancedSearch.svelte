<script lang="ts">
	import { onMount } from 'svelte';
	import { translate } from 'svelte-intl';
	import Spinner from '$lib/elements/spinners/fullScreen.svelte';
	import navigation from '$lib/utils/stores/navigation';
	import type AdvancedSearchData from './AdvancedSearchData.type';
	import Form from './form.svelte';
	import Results from './results.svelte';

	let mounted = false;
	let initialValues: AdvancedSearchData = {
		brands: null,
		ingredientTags: null,
		name: null,
		page: null,
		styleTags: null
	};

	onMount(async () => {
		navigation.closeSearchBar();

		const params = new URLSearchParams(location.search);
		initialValues.brands = params.get('brands')?.split(',') ?? null;
		initialValues.ingredientTags = params.get('ingredientTags')?.split(',') ?? null;
		initialValues.name = params.get('name') ?? null;
		initialValues.page = params.get('page') ? Number(params.get('page')) : null;
		initialValues.styleTags = params.get('styleTags')?.split(',') ?? null;

		mounted = true;
	});
</script>

<h1>{$translate('advancedSearch.title')}</h1>
{#if mounted}
	<Form {initialValues} />
	<Results data={initialValues} />
{:else}
	<Spinner />
{/if}

<style>
	h1 {
		padding-top: 4rem;
	}
</style>

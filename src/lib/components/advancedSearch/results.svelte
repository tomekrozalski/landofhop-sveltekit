<script lang="ts">
	import type AdvancedSearchData from './AdvancedSearchData.type';

	export let data: AdvancedSearchData;

	function updateData() {
		const params = new URLSearchParams(location.search);

		data.brands = params.get('brands')?.split(',') ?? null;
		data.ingredientTags = params.get('ingredientTags')?.split(',') ?? null;
		data.name = params.get('name') ?? null;
		data.styleTags = params.get('styleTags')?.split(',') ?? null;
	}
</script>

<svelte:window on:popstate={updateData} />

<div>{JSON.stringify(data)}</div>

<script lang="ts">
	import { translations, translate } from 'svelte-intl';
	import { onMount } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import advancedSearchDictionary from '$lib/utils/dictionary/screens/advancedSearch.json';
	import navigation from '$lib/utils/stores/navigation';
	import Grid from '$lib/elements/form/grid.svelte';
	import StyleTags from '$lib/elements/form/fields/styleTags.svelte';

	const formData = createForm({
		initialValues: { styleTags: null },
		// validationSchema: getValidationSchema($translate),
		onSubmit: () => {
			console.log('onSubmit');
		}
	});

	translations.update(advancedSearchDictionary);

	onMount(navigation.closeSearchBar);
</script>

<svelte:head>
	<title>{$translate('advancedSearch.title')}</title>
</svelte:head>

<article>
	<h1>{$translate('advancedSearch.title')}</h1>

	<Grid isOptional>
		<StyleTags formName="test" {formData} labelId="Filtruj po stylu piwa" />
	</Grid>
</article>

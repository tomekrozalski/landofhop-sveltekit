<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import pushState from '$lib/utils/helpers/pushState';
	import Button from '$lib/atoms/forms/Button/Button.svelte';
	import ButtonWrapper from '$lib/atoms/forms/ButtonWrapper.svelte';
	import Grid from '$lib/atoms/forms/Grid.svelte';
	import Brands from '$lib/molecules/forms/fields/Brands.svelte';
	import IngredientTags from '$lib/molecules/forms/fields/IngredientTags.svelte';
	import Name from '$lib/molecules/forms/fields/Name.svelte';
	import StyleTags from '$lib/molecules/forms/fields/StyleTags.svelte';
	import type AdvancedSearchData from './AdvancedSearchData.type';
	import { getValidationSchema } from './validationSchema';

	export let initialValues: AdvancedSearchData;
	let formName = 'advancedSearch';

	const formData = createForm({
		initialValues,
		validationSchema: getValidationSchema($translate),
		onSubmit: (values) => {
			const params = new URLSearchParams(location.search);

			for (const [key, value] of Object.entries(values)) {
				if (value) {
					params.set(key, value as string);
				} else {
					params.delete(key);
				}
			}

			pushState(params);
		}
	});
</script>

<form on:submit={formData.handleSubmit} novalidate>
	<Grid isOptional>
		<StyleTags {formName} {formData} labelId="advancedSearch.label.styleTag" />
	</Grid>
	<Grid isOptional>
		<IngredientTags {formName} {formData} labelId="advancedSearch.label.ingredientTag" />
	</Grid>
	<Grid isOptional>
		<Brands {formName} {formData} labelId="advancedSearch.label.brand" />
	</Grid>
	<Grid isOptional>
		<Name {formName} {formData} labelId="advancedSearch.label.name" withStatusIndicator />
	</Grid>
	<ButtonWrapper>
		<Button type="submit">
			{$translate('advancedSearch.button.search')}
		</Button>
	</ButtonWrapper>
</form>

<style>
	form {
		max-width: var(--size-container-max-width);
		margin: 0 auto;
		padding: 1rem;
	}
</style>

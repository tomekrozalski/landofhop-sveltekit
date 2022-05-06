<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';
	import Button from '$lib/elements/form/button.svelte';
	import ButtonWrapper from '$lib/elements/form/buttonWrapper.svelte';
	import Grid from '$lib/elements/form/grid.svelte';
	import StyleTags from '$lib/elements/form/fields/styleTags.svelte';
	import { getValidationSchema } from './validationSchema';

	const formData = createForm({
		initialValues: { styleTags: null },
		validationSchema: getValidationSchema($translate),
		onSubmit: (values) => {
			console.log('onSubmit', values);
		}
	});
</script>

<article>
	<h1>{$translate('advancedSearch.title')}</h1>
	<form on:submit={formData.handleSubmit} novalidate>
		<Grid isOptional>
			<StyleTags formName="test" {formData} labelId="advancedSearch.label.styleTag" />
		</Grid>
		<ButtonWrapper>
			<Button type="submit">
				{$translate('advancedSearch.button.search')}
			</Button>
		</ButtonWrapper>
	</form>
</article>

<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import { producerStore } from '$lib/dashboard/utils/stores';
	import { page } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import { onSubmit } from './onSubmit';
	import { getValidationSchema } from './validationSchema';

	export let isActive: boolean;
	const formName = 'producer';
	const formData = createForm({
		initialValues: $producerStore,
		validationSchema: getValidationSchema($translate),
		onSubmit
	});
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.producerInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.producerInfo.description')}</p>
		</header>
		<Grid columns={2}>
			<Series {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button handleClick={() => page.set('label')} isSecondary>
				{$translate('dashboard.button.moveBack')}
			</Button>
			<Button type="submit">
				{$translate('dashboard.button.moveOn')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}

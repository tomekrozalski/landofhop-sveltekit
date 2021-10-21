<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import { labelStore } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Brand from '$lib/dashboard/fields/brand.svelte';
	import Container from '$lib/dashboard/fields/container.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import { onSubmit } from './onSubmit';
	import { getValidationSchema } from './validationSchema';

	export let isActive: boolean;
	const formName = 'label';
	const formData = createForm({
		initialValues: $labelStore,
		validationSchema: getValidationSchema($translate),
		onSubmit
	});
</script>

{#if isActive}
	<form on:submit={formData.handleSubmit} novalidate>
		<header>
			<h2>{$translate('dashboard.beverage.labelInfo.title')}</h2>
			<p>{$translate('dashboard.beverage.labelInfo.description')}</p>
		</header>
		<Grid>
			<Badge {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
		<Grid columns={2}>
			<Name {formName} {formData} />
		</Grid>
		<Grid columns={2}>
			<Series {formName} {formData} />
		</Grid>
		<Grid>
			<Brand {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
		</Grid>
		<Grid columns={3}>
			<Container {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button type="submit">
				{$translate('dashboard.button.moveOn')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}

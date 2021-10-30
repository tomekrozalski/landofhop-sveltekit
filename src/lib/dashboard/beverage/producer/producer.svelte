<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import { producerStore } from '$lib/dashboard/utils/stores';
	import { page } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Alcohol from '$lib/dashboard/fields/alcohol.svelte';
	import Bitterness from '$lib/dashboard/fields/bitterness.svelte';
	import Contract from '$lib/dashboard/fields/contract.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import Extract from '$lib/dashboard/fields/extract.svelte';
	import Fermentation from '$lib/dashboard/fields/fermentation.svelte';
	import Filtration from '$lib/dashboard/fields/filtration.svelte';
	import Fullness from '$lib/dashboard/fields/fullness.svelte';
	import Hoppyness from '$lib/dashboard/fields/hoppyness.svelte';
	import Pasteurization from '$lib/dashboard/fields/pasteurization.svelte';
	import Place from '$lib/dashboard/fields/place.svelte';
	import Power from '$lib/dashboard/fields/power.svelte';
	import Price from '$lib/dashboard/fields/price.svelte';
	import Remark from '$lib/dashboard/fields/remark.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import StyleBeverage from '$lib/dashboard/fields/style.svelte';
	import Sweetness from '$lib/dashboard/fields/sweetness.svelte';
	import Tale from '$lib/dashboard/fields/tale.svelte';
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
		<h3><span>{$translate('dashboard.beverage.brandInfo')}</span></h3>
		<Grid columns={2}>
			<Series {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Cooperation {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Contract {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Place {formName} {formData} />
		</Grid>
		<Grid columns={2}>
			<Remark {formName} {formData} />
		</Grid>
		<Grid>
			<Tale {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.brewingInfo')}</span></h3>
		<Grid isOptional>
			<Fermentation {formName} {formData} />
		</Grid>
		<Grid columns={2}>
			<StyleBeverage {formName} {formData} />
		</Grid>
		<Grid columns={3} isOptional>
			<Extract {formName} {formData} />
		</Grid>
		<Grid columns={3} isOptional>
			<Alcohol {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Filtration {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Pasteurization {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.impressionsInfo')}</span></h3>
		<Grid isOptional>
			<Bitterness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Sweetness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Fullness {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Power {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Hoppyness {formName} {formData} />
		</Grid>
		<!-- <Temperature {formName} {formData} /> -->
		<h3><span>{$translate('dashboard.beverage.otherInfo')}</span></h3>
		<Grid columns={3}>
			<Price {formName} {formData} />
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

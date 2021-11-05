<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	import { labelStore } from '$lib/dashboard/utils/stores';
	import Grid from '$lib/dashboard/elements/grid.svelte';
	import ButtonWrapper from '$lib/dashboard/elements/buttonWrapper.svelte';
	import Button from '$lib/elements/form/button.svelte';
	import Aged from '$lib/dashboard/fields/aged/aged.svelte';
	import Alcohol from '$lib/dashboard/fields/alcohol.svelte';
	import Badge from '$lib/dashboard/fields/badge.svelte';
	import Barcode from '$lib/dashboard/fields/barcode.svelte';
	import Bitterness from '$lib/dashboard/fields/bitterness.svelte';
	import Brand from '$lib/dashboard/fields/brand.svelte';
	import Container from '$lib/dashboard/fields/container.svelte';
	import Contract from '$lib/dashboard/fields/contract.svelte';
	import Cooperation from '$lib/dashboard/fields/cooperation.svelte';
	import ExpirationDate from '$lib/dashboard/fields/expirationDate.svelte';
	import Extract from '$lib/dashboard/fields/extract.svelte';
	import Fermentation from '$lib/dashboard/fields/fermentation.svelte';
	import Filtration from '$lib/dashboard/fields/filtration.svelte';
	import Fullness from '$lib/dashboard/fields/fullness.svelte';
	import Hoppyness from '$lib/dashboard/fields/hoppyness.svelte';
	import HopRate from '$lib/dashboard/fields/hopRate.svelte';
	import Ingredients from '$lib/dashboard/fields/ingredients/ingredients.svelte';
	import Name from '$lib/dashboard/fields/name.svelte';
	import Nitrogen from '$lib/dashboard/fields/nitrogen.svelte';
	import Pasteurization from '$lib/dashboard/fields/pasteurization.svelte';
	import Place from '$lib/dashboard/fields/place.svelte';
	import Power from '$lib/dashboard/fields/power.svelte';
	import Price from '$lib/dashboard/fields/price.svelte';
	import Remark from '$lib/dashboard/fields/remark.svelte';
	import Series from '$lib/dashboard/fields/series.svelte';
	import StyleBeverage from '$lib/dashboard/fields/style.svelte';
	import Sweetness from '$lib/dashboard/fields/sweetness.svelte';
	import Tale from '$lib/dashboard/fields/tale.svelte';
	import Temperature from '$lib/dashboard/fields/temperature.svelte';
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
		<Grid isOptional>
			<Barcode {formName} {formData} />
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
		<Grid>
			<Aged {formName} {formData} />
		</Grid>
		<!-- <DryHopped {formName} {formData} /> -->
		<Grid columns={2} isOptional>
			<HopRate {formName} {formData} />
		</Grid>
		<Grid isOptional>
			<Nitrogen {formName} {formData} />
		</Grid>
		<Grid columns={2} isOptional>
			<ExpirationDate {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.ingredientsInfo')}</span></h3>
		<Grid>
			<Ingredients {formName} {formData} />
		</Grid>
		<!-- <IngredientTags form="label" /> -->
		<!-- <SmokedMalt form="label" /> -->
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
		<Grid columns={3} isOptional>
			<Temperature {formName} {formData} />
		</Grid>
		<h3><span>{$translate('dashboard.beverage.otherInfo')}</span></h3>
		<Grid columns={3}>
			<Container {formName} {formData} />
		</Grid>
		<Grid columns={3}>
			<Price {formName} {formData} />
		</Grid>
		<ButtonWrapper>
			<Button type="submit">
				{$translate('dashboard.button.moveOn')}
			</Button>
		</ButtonWrapper>
	</form>
{/if}

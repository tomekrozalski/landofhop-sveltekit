<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	// Common elements
	import Button from '$lib/elements/form/Button.svelte';
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Grid from '$lib/elements/form/Grid.svelte';
	import IngredientTags from '$lib/elements/form/fields/IngredientTags.svelte';

	// Dashboard elements
	import { labelStore } from '$lib/dashboard/utils/stores';
	import Aged from '$lib/dashboard/fields/Aged/Aged.svelte';
	import Alcohol from '$lib/dashboard/fields/Alcohol.svelte';
	import Badge from '$lib/dashboard/fields/Badge.svelte';
	import Barcode from '$lib/dashboard/fields/Barcode.svelte';
	import Bitterness from '$lib/dashboard/fields/Bitterness.svelte';
	import Brand from '$lib/dashboard/fields/Brand.svelte';
	import Container from '$lib/dashboard/fields/Container.svelte';
	import Contract from '$lib/dashboard/fields/Contract.svelte';
	import Cooperation from '$lib/dashboard/fields/Cooperation.svelte';
	import DryHopped from '$lib/dashboard/fields/DryHopped.svelte';
	import ExpirationDate from '$lib/dashboard/fields/ExpirationDate.svelte';
	import Extract from '$lib/dashboard/fields/Extract.svelte';
	import Fermentation from '$lib/dashboard/fields/Fermentation.svelte';
	import Filtration from '$lib/dashboard/fields/Filtration.svelte';
	import Fullness from '$lib/dashboard/fields/Fullness.svelte';
	import Hoppyness from '$lib/dashboard/fields/Hoppyness.svelte';
	import HopRate from '$lib/dashboard/fields/HopRate.svelte';
	import Ingredients from '$lib/dashboard/fields/Ingredients/Ingredients.svelte';
	import Name from '$lib/dashboard/fields/Name.svelte';
	import Nitrogen from '$lib/dashboard/fields/Nitrogen.svelte';
	import Pasteurization from '$lib/dashboard/fields/Pasteurization.svelte';
	import Place from '$lib/dashboard/fields/Place.svelte';
	import Power from '$lib/dashboard/fields/Power.svelte';
	import Price from '$lib/dashboard/fields/Price.svelte';
	import Remark from '$lib/dashboard/fields/Remark.svelte';
	import Series from '$lib/dashboard/fields/Series.svelte';
	import SmokedMalt from '$lib/dashboard/fields/SmokedMalt.svelte';
	import StyleBeverage from '$lib/dashboard/fields/Style.svelte';
	import Sweetness from '$lib/dashboard/fields/Sweetness.svelte';
	import Tale from '$lib/dashboard/fields/Tale.svelte';
	import Temperature from '$lib/dashboard/fields/Temperature.svelte';
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
		<Grid isOptional>
			<DryHopped {formName} {formData} />
		</Grid>
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
		<Grid isOptional>
			<IngredientTags {formName} {formData} labelId="dashboard.label.ingredientTags" admin />
		</Grid>
		<Grid isOptional>
			<SmokedMalt {formName} {formData} />
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

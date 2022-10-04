<script lang="ts">
	import { translate } from 'svelte-intl';
	import { createForm } from 'svelte-forms-lib';

	// Common elements
	import ButtonWrapper from '$lib/elements/form/ButtonWrapper.svelte';
	import Button from '$lib/elements/form/Button.svelte';
	import Grid from '$lib/elements/form/Grid.svelte';
	import IngredientTags from '$lib/elements/form/fields/IngredientTags.svelte';

	// Dashboard elements
	import { producerStore } from '../stores';
	import { page } from '../stores';
	import Aged from '$lib/elements/form/fields/Aged/Aged.svelte';
	import Alcohol from '$lib/elements/form/fields/Alcohol.svelte';
	import Bitterness from '$lib/elements/form/fields/Bitterness.svelte';
	import Contract from '$lib/elements/form/fields/Contract.svelte';
	import Cooperation from '$lib/elements/form/fields/Cooperation.svelte';
	import DryHopped from '$lib/elements/form/fields/DryHopped.svelte';
	import ExpirationDate from '$lib/elements/form/fields/ExpirationDate.svelte';
	import Extract from '$lib/elements/form/fields/Extract.svelte';
	import Fermentation from '$lib/elements/form/fields/Fermentation.svelte';
	import Filtration from '$lib/elements/form/fields/Filtration.svelte';
	import Fullness from '$lib/elements/form/fields/Fullness.svelte';
	import Hoppyness from '$lib/elements/form/fields/Hoppyness.svelte';
	import HopRate from '$lib/elements/form/fields/HopRate.svelte';
	import Ingredients from '$lib/elements/form/fields/Ingredients/Ingredients.svelte';
	import Nitrogen from '$lib/elements/form/fields/Nitrogen.svelte';
	import Pasteurization from '$lib/elements/form/fields/Pasteurization.svelte';
	import Place from '$lib/elements/form/fields/Place.svelte';
	import Power from '$lib/elements/form/fields/Power.svelte';
	import Price from '$lib/elements/form/fields/Price.svelte';
	import Remark from '$lib/elements/form/fields/Remark.svelte';
	import Series from '$lib/elements/form/fields/Series.svelte';
	import SmokedMalt from '$lib/elements/form/fields/SmokedMalt.svelte';
	import StyleBeverage from '$lib/elements/form/fields/Style.svelte';
	import Sweetness from '$lib/elements/form/fields/Sweetness.svelte';
	import Tale from '$lib/elements/form/fields/Tale.svelte';
	import Temperature from '$lib/elements/form/fields/Temperature.svelte';
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
			<IngredientTags {formName} {formData} labelId="dashboard.label.ingredientTags" />
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
